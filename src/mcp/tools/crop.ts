import { z } from 'zod';
import { cropPages, getPDFPageCount } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';
import { parseAndValidatePageNumbers } from '../utils/page-range';

export const cropSchema = {
  filePath: z.string().describe('Path to the PDF file to crop'),
  outputPath: z.string().describe('Destination path where the cropped PDF will be saved'),
  margins: z
    .object({
      top: z.number().nonnegative().default(0).describe('Margin to trim from the top (points)'),
      bottom: z.number().nonnegative().default(0).describe('Margin to trim from the bottom (points)'),
      left: z.number().nonnegative().default(0).describe('Margin to trim from the left (points)'),
      right: z.number().nonnegative().default(0).describe('Margin to trim from the right (points)'),
    })
    .describe('Margin values in points to crop from each page edge'),
  pages: z
    .union([z.string(), z.array(z.number())])
    .optional()
    .describe('Pages to crop (e.g. "1-2" or [1, 2] or "all"). If omitted, all pages are cropped'),
  preserveMetadata: z
    .boolean()
    .default(true)
    .optional()
    .describe('Whether to retain document metadata in the cropped PDF'),
};

export async function handleCrop(args: {
  filePath: string;
  outputPath: string;
  margins: { top: number; bottom: number; left: number; right: number };
  pages?: string | number[];
  preserveMetadata?: boolean;
}) {
  const { data, resolvedPath } = await readPdfFile(args.filePath);
  const totalPages = await getPDFPageCount(data);

  const targetPages = parseAndValidatePageNumbers(args.pages ?? 'all', totalPages);

  const croppedBytes = await cropPages(data, targetPages, {
    cropMargins: args.margins,
    preserveMetadata: args.preserveMetadata ?? true,
  });

  const { resolvedPath: savedPath, size: newSize } = await writePdfFile(args.outputPath, croppedBytes);

  const result = {
    success: true,
    message: `Successfully cropped ${targetPages.length} pages in ${resolvedPath}`,
    sourceFile: resolvedPath,
    outputPath: savedPath,
    outputSize: formatBytes(newSize),
    croppedPages: targetPages,
    appliedMargins: args.margins,
    totalPages,
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
