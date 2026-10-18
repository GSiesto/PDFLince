import * as path from 'node:path';
import JSZip from 'jszip';
import { z } from 'zod';
import {
  extractPages,
  getPDFPageCount,
  getPDFPageDimensions,
} from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';
import { parseAndValidatePageNumbers } from '../utils/page-range';
import { renderSinglePagePdfToImage } from '../utils/image-adapter';

export const pdfToImagesSchema = {
  filePath: z.string().describe('Path to the source PDF file to convert into images'),
  outputDirectory: z
    .string()
    .describe('Directory where the rendered page images (and optional ZIP archive) will be saved'),
  format: z
    .enum(['png', 'jpeg'])
    .default('png')
    .optional()
    .describe('Output image format: png (lossless) or jpeg (smaller file size). Default: png'),
  quality: z
    .number()
    .min(0.1)
    .max(1.0)
    .default(0.9)
    .optional()
    .describe('JPEG quality from 0.1 to 1.0 when format is jpeg (default: 0.9)'),
  dpi: z
    .number()
    .int()
    .min(36)
    .max(600)
    .default(144)
    .optional()
    .describe('Render resolution in DPI (UI presets: 72 for screen, 144 for standard, 300 for print; default: 144)'),
  pages: z
    .union([z.string(), z.array(z.number())])
    .optional()
    .describe('Pages to render (e.g. "1-3, 5", [1, 2, 3], or "all"). Defaults to all pages'),
  bundleAsZip: z
    .boolean()
    .default(false)
    .optional()
    .describe('Whether to also bundle all exported images into a .zip archive in outputDirectory'),
  outputPrefix: z
    .string()
    .optional()
    .describe('Custom file name prefix for the exported image files (defaults to source filename without extension)'),
};

export async function handlePdfToImages(args: {
  filePath: string;
  outputDirectory: string;
  format?: 'png' | 'jpeg';
  quality?: number;
  dpi?: number;
  pages?: string | number[];
  bundleAsZip?: boolean;
  outputPrefix?: string;
}) {
  const { data, resolvedPath } = await readPdfFile(args.filePath);
  const totalPages = await getPDFPageCount(data);
  const targetPages = parseAndValidatePageNumbers(args.pages ?? 'all', totalPages);

  const format = args.format ?? 'png';
  const quality = args.quality ?? 0.9;
  const dpi = args.dpi ?? 144;
  const ext = format === 'jpeg' ? 'jpg' : 'png';

  const sanitizedPrefix = args.outputPrefix ? path.basename(args.outputPrefix) : '';
  const baseName =
    sanitizedPrefix || path.basename(resolvedPath, path.extname(resolvedPath));

  const padDigits = Math.max(2, String(totalPages).length);
  const generatedImages: Array<{
    pageNumber: number;
    fileName: string;
    path: string;
    width: number;
    height: number;
    size: string;
  }> = [];

  const zip = args.bundleAsZip ? new JSZip() : null;

  for (const pageNum of targetPages) {
    const singlePagePdf = await extractPages(data, [pageNum], { preserveMetadata: false });
    const dims = await getPDFPageDimensions(data, pageNum);
    const rendered = await renderSinglePagePdfToImage(singlePagePdf, dims.width, dims.height, {
      dpi,
      format,
      quality,
    });

    const pageStr = String(pageNum).padStart(padDigits, '0');
    const fileName = `${baseName}_page_${pageStr}.${ext}`;
    const targetPath = path.join(args.outputDirectory, fileName);
    const { resolvedPath: savedPath, size } = await writePdfFile(targetPath, rendered.bytes);

    if (zip) {
      zip.file(fileName, rendered.bytes);
    }

    generatedImages.push({
      pageNumber: pageNum,
      fileName,
      path: savedPath,
      width: rendered.width,
      height: rendered.height,
      size: formatBytes(size),
    });
  }

  let zipArchive: { fileName: string; path: string; size: string } | undefined;
  if (zip) {
    const zipBytes = await zip.generateAsync({ type: 'uint8array' });
    const zipFileName = `${baseName}_${ext}.zip`;
    const zipTargetPath = path.join(args.outputDirectory, zipFileName);
    const { resolvedPath: savedZipPath, size: zipSize } = await writePdfFile(zipTargetPath, zipBytes);
    zipArchive = {
      fileName: zipFileName,
      path: savedZipPath,
      size: formatBytes(zipSize),
    };
  }

  const result = {
    success: true,
    message: `Rendered ${generatedImages.length} page(s) from ${resolvedPath} as ${format.toUpperCase()} at ${dpi} DPI`,
    sourceFile: resolvedPath,
    totalPagesInDocument: totalPages,
    renderedPagesCount: generatedImages.length,
    format,
    dpi,
    ...(format === 'jpeg' ? { quality } : {}),
    generatedImages,
    ...(zipArchive ? { zipArchive } : {}),
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
