import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { File as NodeFile } from 'node:buffer';
import { z } from 'zod';
import { convertImagesToPdf, getPDFPageCount } from '../../lib/pdf-operations';
import { assertFileExists, writePdfFile, formatBytes } from '../utils/fs';
import { ensureNodeImageAdapterRegistered } from '../utils/image-adapter';

const FileConstructor = typeof File !== 'undefined' ? File : NodeFile;

export const imagesToPdfSchema = {
  imagePaths: z
    .array(z.string())
    .min(1, 'At least one image path must be provided')
    .describe('List of image file paths (PNG, JPEG/JPG, WebP, TIFF/TIF) to convert into a PDF'),
  outputPath: z
    .string()
    .describe('Destination file path where the generated PDF will be saved'),
  imageFit: z
    .enum(['contain', 'cover'])
    .default('contain')
    .optional()
    .describe('How the image should fit on the page: contain (preserves aspect ratio) or cover (fills entire page)'),
  pageSize: z
    .enum(['auto', 'a4', 'letter'])
    .default('auto')
    .optional()
    .describe('Page size: auto (matches image dimensions), a4, or letter'),
  pageOrientation: z
    .enum(['auto', 'portrait', 'landscape'])
    .default('auto')
    .optional()
    .describe('Page orientation: auto (calculated from image dimensions), portrait, or landscape'),
  pageMarginPoints: z
    .number()
    .nonnegative()
    .default(18)
    .optional()
    .describe('Page margin in points (default: 18 pt)'),
  backgroundColor: z
    .string()
    .default('#ffffff')
    .optional()
    .describe('Background color in hex format (e.g. #ffffff)'),
};

const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.tif']);

const MIME_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.tiff': 'image/tiff',
  '.tif': 'image/tiff',
};

export async function handleImagesToPdf(args: {
  imagePaths: string[];
  outputPath: string;
  imageFit?: 'contain' | 'cover';
  pageSize?: 'auto' | 'a4' | 'letter';
  pageOrientation?: 'auto' | 'portrait' | 'landscape';
  pageMarginPoints?: number;
  backgroundColor?: string;
}) {
  ensureNodeImageAdapterRegistered();

  const fileObjects: File[] = [];
  const processedImages: Array<{ path: string; name: string; size: string }> = [];

  for (const imgPath of args.imagePaths) {
    const resolved = await assertFileExists(imgPath);
    const ext = path.extname(resolved).toLowerCase();
    if (!SUPPORTED_IMAGE_EXTENSIONS.has(ext)) {
      throw new Error(
        `Unsupported image format "${ext || 'unknown'}" for file "${imgPath}". Supported formats are PNG (.png), JPEG (.jpg, .jpeg), WebP (.webp), and TIFF (.tiff, .tif).`
      );
    }
    const buffer = await fs.readFile(resolved);
    const mime = MIME_BY_EXT[ext] ?? 'application/octet-stream';
    const baseName = path.basename(resolved);

    const fileObj = new FileConstructor([new Uint8Array(buffer)], baseName, { type: mime }) as unknown as File;
    fileObjects.push(fileObj);

    processedImages.push({
      path: resolved,
      name: baseName,
      size: formatBytes(buffer.byteLength),
    });
  }

  const pdfBytes = await convertImagesToPdf(fileObjects, {
    imageFit: args.imageFit ?? 'contain',
    pageSize: args.pageSize ?? 'auto',
    pageOrientation: args.pageOrientation ?? 'auto',
    pageMarginPoints: args.pageMarginPoints ?? 18,
    backgroundColor: args.backgroundColor ?? '#ffffff',
  });

  const { resolvedPath: savedPath, size: newSize } = await writePdfFile(args.outputPath, pdfBytes);
  const totalPages = await getPDFPageCount(pdfBytes);

  const result = {
    success: true,
    message: `Converted ${args.imagePaths.length} images into a ${totalPages}-page PDF document`,
    outputPath: savedPath,
    outputSize: formatBytes(newSize),
    totalPages,
    sourceImages: processedImages,
    layout: {
      fit: args.imageFit ?? 'contain',
      size: args.pageSize ?? 'auto',
      orientation: args.pageOrientation ?? 'auto',
      margin: args.pageMarginPoints ?? 18,
      backgroundColor: args.backgroundColor ?? '#ffffff',
    },
  };

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
