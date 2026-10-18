import { z } from 'zod';
import { rotatePages, getPDFPageCount } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';
import { parseAndValidatePageNumbers } from '../utils/page-range';

export const rotateSchema = {
  filePath: z.string().describe('Path to the source PDF file'),
  outputPath: z.string().describe('Destination path where the rotated PDF will be saved'),
  rotationDegrees: z
    .union([
      z.literal(90),
      z.literal(180),
      z.literal(270),
      z.literal(-90),
      z.literal(-180),
      z.literal(-270),
    ])
    .default(90)
    .describe('Degrees to rotate clockwise (90, 180, 270) or counter-clockwise (-90, -180, -270)'),
  pages: z
    .union([z.string(), z.array(z.number())])
    .optional()
    .describe('Pages to rotate (e.g. "1, 3" or [1, 3] or "all"). If omitted, all pages are rotated'),
  preserveMetadata: z
    .boolean()
    .default(true)
    .optional()
    .describe('Whether to retain document metadata in the rotated PDF'),
};

export async function handleRotate(args: {
  filePath: string;
  outputPath: string;
  rotationDegrees?: 90 | 180 | 270 | -90 | -180 | -270;
  pages?: string | number[];
  preserveMetadata?: boolean;
}) {
  const { data, resolvedPath } = await readPdfFile(args.filePath);
  const totalPages = await getPDFPageCount(data);
  const degrees = args.rotationDegrees ?? 90;

  const targetPages = parseAndValidatePageNumbers(args.pages ?? 'all', totalPages);

  const rotatedBytes = await rotatePages(data, targetPages, degrees, {
    preserveMetadata: args.preserveMetadata ?? true,
  });
  const { resolvedPath: savedPath, size: newSize } = await writePdfFile(args.outputPath, rotatedBytes);

  const result = {
    success: true,
    message: `Rotated ${targetPages.length} pages by ${degrees}° in ${resolvedPath}`,
    sourceFile: resolvedPath,
    outputPath: savedPath,
    outputSize: formatBytes(newSize),
    rotatedPages: targetPages,
    degrees,
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
