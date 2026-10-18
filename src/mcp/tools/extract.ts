import { z } from 'zod';
import { extractPages, getPDFPageCount } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';
import { parseAndValidatePageNumbers } from '../utils/page-range';

export const extractSchema = {
  filePath: z.string().describe('Path to the source PDF file'),
  outputPath: z.string().describe('Destination path where the extracted PDF will be saved'),
  pages: z
    .union([z.string(), z.array(z.number())])
    .describe('Pages to extract. Can be a range string (e.g. "1-3, 5, 8-10") or an array of numbers (e.g. [1, 2, 3])'),
  preserveMetadata: z
    .boolean()
    .default(true)
    .optional()
    .describe('Whether to retain document metadata (title, author, etc) in the extracted PDF'),
};

export async function handleExtract(args: {
  filePath: string;
  outputPath: string;
  pages: string | number[];
  preserveMetadata?: boolean;
}) {
  const { data, resolvedPath, size: originalSize } = await readPdfFile(args.filePath);
  const totalPages = await getPDFPageCount(data);

  const selectedPages = parseAndValidatePageNumbers(args.pages, totalPages);

  const extractedBytes = await extractPages(data, selectedPages, {
    preserveMetadata: args.preserveMetadata ?? true,
  });
  const { resolvedPath: savedPath, size: newSize } = await writePdfFile(args.outputPath, extractedBytes);

  const result = {
    success: true,
    message: `Extracted ${selectedPages.length} pages (${selectedPages.join(', ')}) from ${totalPages}-page document`,
    sourceFile: resolvedPath,
    originalSize: formatBytes(originalSize),
    outputPath: savedPath,
    outputSize: formatBytes(newSize),
    extractedPages: selectedPages,
    totalPagesInResult: selectedPages.length,
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
