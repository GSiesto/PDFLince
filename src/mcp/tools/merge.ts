import { z } from 'zod';
import { mergePDFs, getPDFPageCount } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';

export const mergeSchema = {
  filePaths: z
    .array(z.string())
    .min(2, 'At least 2 PDF files are required to merge')
    .describe('List of file paths of PDFs to merge in order'),
  outputPath: z
    .string()
    .describe('Destination file path where the merged PDF will be saved'),
  addPageDividers: z
    .boolean()
    .optional()
    .describe('Whether to insert blank divider pages between merged documents'),
  metadata: z
    .object({
      title: z.string().optional().describe('Title of the merged document'),
      author: z.string().optional().describe('Author of the merged document'),
      subject: z.string().optional().describe('Subject of the merged document'),
      keywords: z.string().optional().describe('Keywords for the merged document'),
    })
    .optional()
    .describe('Custom metadata to apply to the merged document'),
};

export async function handleMerge(args: {
  filePaths: string[];
  outputPath: string;
  addPageDividers?: boolean;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
  };
}) {
  const buffers: Uint8Array[] = [];
  const filesInfo: Array<{ path: string; size: string; pages: number }> = [];

  for (const fp of args.filePaths) {
    const { data, resolvedPath, size } = await readPdfFile(fp);
    const pages = await getPDFPageCount(data);
    buffers.push(data);
    filesInfo.push({
      path: resolvedPath,
      size: formatBytes(size),
      pages,
    });
  }

  const mergedBytes = await mergePDFs(buffers, {
    addPageDividers: args.addPageDividers ?? false,
    metadata: args.metadata,
  });

  const { resolvedPath, size } = await writePdfFile(args.outputPath, mergedBytes);
  const totalMergedPages = await getPDFPageCount(mergedBytes);

  const result = {
    success: true,
    message: `Successfully merged ${args.filePaths.length} PDFs into ${resolvedPath}`,
    outputPath: resolvedPath,
    outputSize: formatBytes(size),
    outputSizeBytes: size,
    totalPages: totalMergedPages,
    sourceFiles: filesInfo,
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
