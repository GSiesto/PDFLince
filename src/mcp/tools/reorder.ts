import { z } from 'zod';
import { reorderPages, getPDFPageCount } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';

export const reorderSchema = {
  filePath: z.string().describe('Path to the source PDF file'),
  outputPath: z.string().describe('Destination path where the reordered PDF will be saved'),
  pageOrder: z
    .array(z.number().int().positive())
    .min(1, 'At least one page number must be specified in the order')
    .describe('Desired page order as an array of 1-indexed page numbers (e.g. [3, 1, 2])'),
  preserveMetadata: z
    .boolean()
    .default(true)
    .optional()
    .describe('Whether to retain document metadata in the reordered PDF'),
};

export async function handleReorder(args: {
  filePath: string;
  outputPath: string;
  pageOrder: number[];
  preserveMetadata?: boolean;
}) {
  const { data, resolvedPath, size: originalSize } = await readPdfFile(args.filePath);
  const totalPages = await getPDFPageCount(data);

  // Validate bounds
  for (const pageNum of args.pageOrder) {
    if (pageNum < 1 || pageNum > totalPages) {
      throw new Error(`Page ${pageNum} in pageOrder is out of bounds (document has ${totalPages} pages)`);
    }
  }

  const reorderedBytes = await reorderPages(data, args.pageOrder, {
    preserveMetadata: args.preserveMetadata ?? true,
  });

  const { resolvedPath: savedPath, size: newSize } = await writePdfFile(args.outputPath, reorderedBytes);

  const result = {
    success: true,
    message: `Reordered document into ${args.pageOrder.length} pages (${args.pageOrder.join(', ')})`,
    sourceFile: resolvedPath,
    originalSize: formatBytes(originalSize),
    outputPath: savedPath,
    outputSize: formatBytes(newSize),
    newSequence: args.pageOrder,
    totalPagesInResult: args.pageOrder.length,
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
