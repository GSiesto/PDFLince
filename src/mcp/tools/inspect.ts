import { z } from 'zod';
import { PDFDocument } from 'pdf-lib';
import { readPdfFile, formatBytes } from '../utils/fs';

export const inspectSchema = {
  filePath: z.string().describe('Absolute or relative path to the PDF file to inspect'),
};

export async function handleInspect(args: { filePath: string }) {
  const { data, resolvedPath, size } = await readPdfFile(args.filePath);
  const pdfDoc = await PDFDocument.load(data, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  const pageCount = pdfDoc.getPageCount();

  // Inspect page dimensions and orientation for initial pages (up to 10 for conciseness)
  const samplePagesCount = Math.min(pageCount, 10);
  const pagesSummary = [];

  for (let i = 0; i < samplePagesCount; i++) {
    const page = pdfDoc.getPage(i);
    const mediaBox = page.getMediaBox();
    const rotation = page.getRotation().angle;
    const isRotated = ((rotation % 360) + 360) % 360 === 90 || ((rotation % 360) + 360) % 360 === 270;
    const width = Math.round(isRotated ? mediaBox.height : mediaBox.width);
    const height = Math.round(isRotated ? mediaBox.width : mediaBox.height);
    const orientation = width > height ? 'landscape' : width < height ? 'portrait' : 'square';

    pagesSummary.push({
      page: i + 1,
      width,
      height,
      rotation,
      orientation,
    });
  }

  const metadata = {
    title: pdfDoc.getTitle() || undefined,
    author: pdfDoc.getAuthor() || undefined,
    subject: pdfDoc.getSubject() || undefined,
    creator: pdfDoc.getCreator() || undefined,
    producer: pdfDoc.getProducer() || undefined,
    creationDate: pdfDoc.getCreationDate()?.toISOString() || undefined,
    modificationDate: pdfDoc.getModificationDate()?.toISOString() || undefined,
  };

  const result = {
    filePath: resolvedPath,
    fileSize: formatBytes(size),
    fileSizeBytes: size,
    totalPages: pageCount,
    metadata,
    pagesSummary,
    truncatedPages: pageCount > samplePagesCount ? pageCount - samplePagesCount : 0,
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
