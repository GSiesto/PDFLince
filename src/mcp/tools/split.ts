import * as path from 'node:path';
import JSZip from 'jszip';
import { z } from 'zod';
import { splitPDF, getPDFPageCount } from '../../lib/pdf-operations';
import { readPdfFile, writePdfFile, formatBytes } from '../utils/fs';

export const splitSchema = {
  filePath: z.string().describe('Path to the PDF file to split'),
  outputDirectory: z.string().describe('Directory where the split PDF chunks will be saved'),
  pagesPerFile: z
    .number()
    .int()
    .positive()
    .default(1)
    .describe('Number of pages per split file (default: 1, which extracts every page)'),
  outputPrefix: z
    .string()
    .optional()
    .describe('Custom file name prefix for the generated chunks (defaults to original filename without extension)'),
  preserveMetadata: z
    .boolean()
    .default(true)
    .optional()
    .describe('Whether to retain document metadata (title, author, etc) in the split PDF files'),
  bundleAsZip: z
    .boolean()
    .default(false)
    .optional()
    .describe('Whether to also bundle all split PDF files into a .zip archive in outputDirectory'),
};

export async function handleSplit(args: {
  filePath: string;
  outputDirectory: string;
  pagesPerFile?: number;
  outputPrefix?: string;
  preserveMetadata?: boolean;
  bundleAsZip?: boolean;
}) {
  const { data, resolvedPath } = await readPdfFile(args.filePath);
  const totalPages = await getPDFPageCount(data);
  const pagesPerFile = args.pagesPerFile ?? 1;
  const preserveMetadata = args.preserveMetadata ?? true;

  const chunks = await splitPDF(data, { pagesPerFile, preserveMetadata });

  const sanitizedPrefix = args.outputPrefix ? path.basename(args.outputPrefix) : '';
  const baseName =
    sanitizedPrefix ||
    path.basename(resolvedPath, path.extname(resolvedPath));

  const padDigits = Math.max(2, String(chunks.length).length);
  const generatedFiles: Array<{ fileName: string; path: string; size: string }> = [];
  const zip = args.bundleAsZip ? new JSZip() : null;

  for (let i = 0; i < chunks.length; i++) {
    const chunkData = chunks[i];
    const chunkNum = String(i + 1).padStart(padDigits, '0');
    const fileName = `${baseName}_part_${chunkNum}.pdf`;
    const targetPath = path.join(args.outputDirectory, fileName);
    const { resolvedPath: savedPath, size } = await writePdfFile(targetPath, chunkData);

    if (zip) {
      zip.file(fileName, chunkData);
    }

    generatedFiles.push({
      fileName,
      path: savedPath,
      size: formatBytes(size),
    });
  }

  let zipArchive: { fileName: string; path: string; size: string } | undefined;
  if (zip) {
    const zipBytes = await zip.generateAsync({ type: 'uint8array' });
    const zipFileName = `${baseName}_split.zip`;
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
    message: `Split ${totalPages}-page PDF into ${chunks.length} files (${pagesPerFile} pages per file)`,
    sourceFile: resolvedPath,
    totalPages,
    pagesPerFile,
    generatedFiles,
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
