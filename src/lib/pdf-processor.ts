import * as PDFOps from './pdf-operations';
import { pdfWorkerClient } from './worker-client';

// Re-export types from pdf-operations
export type PDFProcessingMode = PDFOps.PDFProcessingMode;
export type PDFProcessingOptions = PDFOps.PDFProcessingOptions;
export type ProcessingResult = PDFOps.ProcessingResult;
export type PdfToImagesArchiveResult = PDFOps.PdfToImagesArchiveResult;


/**
 * Compress a PDF file using the Web Worker
 */
export async function compressPDFFile(file: File, options: PDFProcessingOptions = {}): Promise<ProcessingResult> {
  try {
    const result = await pdfWorkerClient.run('compress', [file], options) as ProcessingResult;
    return result;
  } catch (error) {
    console.warn('Worker compression failed, falling back to main thread', error);
    return PDFOps.compressPDF(file, options);
  }
}

/**
 * Central dispatcher for core operations
 */
export function processPDF(
  mode: 'compress',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<ProcessingResult>;
export function processPDF(
  mode: 'merge',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<Blob>;
export function processPDF(
  mode: 'split',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<Blob[]>;
export function processPDF(
  mode: 'extract',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<Blob>;
export function processPDF(
  mode: 'crop',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<Blob>;

export function processPDF(
  mode: 'reorder',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<Blob>;
export function processPDF(
  mode: 'pdfToImages',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<PdfToImagesArchiveResult>;
export function processPDF(
  mode: 'imagesToPdf',
  files: [File, ...File[]],
  options: PDFProcessingOptions
): Promise<Blob>;
export function processPDF(
  mode: PDFProcessingMode,
  files: File[],
  options: PDFProcessingOptions
): Promise<ProcessingResult | Blob | Blob[] | PdfToImagesArchiveResult> {
  if (files.length === 0) {
    throw new Error('No files provided');
  }

  switch (mode) {
    case 'compress':
      return compressPDFFile(files[0] as File, options);
    case 'merge':
      return mergePDFsAsBlob(files, options);
    case 'split':
      return splitPDFAsBlobs(files[0] as File, options);
    case 'extract': {
      if (!options.pagesToExtract || options.pagesToExtract.length === 0) {
        throw new Error('No pages selected');
      }
      return extractPagesAsBlob(files[0] as File, options.pagesToExtract, options);
    }

    case 'crop': {
      if (!options.pagesToCrop || options.pagesToCrop.length === 0) {
        throw new Error('No pages selected');
      }
      return cropPagesAsBlob(files[0] as File, options.pagesToCrop, options);
    }
    case 'reorder': {
      if (!options.pageOrder || options.pageOrder.length === 0) {
        throw new Error('No page order provided');
      }
      return reorderViaExtract(files[0] as File, options.pageOrder, options);
    }
    case 'pdfToImages':
      return pdfWorkerClient.run('pdfToImages', [files[0] as File], options) as Promise<PdfToImagesArchiveResult>;
    case 'imagesToPdf':
      return convertImagesToPdfAsBlob(files, options);
    default:
      throw new Error('Unsupported mode');
  }
}

/**
 * Merge PDFs and return as Blob (via worker)
 */
export async function mergePDFsAsBlob(files: File[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = await pdfWorkerClient.run('merge', files, options) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker merge failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.mergePDFs(files, options);
    return createPdfBlob(pdfBytes);
  }
}

/**
 * Split PDF and return as array of Blobs (via worker)
 */
export async function splitPDFAsBlobs(file: File, options: PDFProcessingOptions): Promise<Blob[]> {
  try {
    const pdfBytesArray: Uint8Array[] = await pdfWorkerClient.run('split', [file], options) as Uint8Array[];
    return pdfBytesArray.map(createPdfBlob);
  } catch (error) {
    console.warn('Worker split failed, falling back to main thread', error);
    const pdfBytesArray = await PDFOps.splitPDF(file, options);
    return pdfBytesArray.map(createPdfBlob);
  }
}

/**
 * Extract pages and return as Blob (via worker)
 */
export async function extractPagesAsBlob(file: File, pageNumbers: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = await pdfWorkerClient.run('extract', [file], { ...options, pagesToExtract: pageNumbers }) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker extract failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.extractPages(file, pageNumbers, options);
    return createPdfBlob(pdfBytes);
  }
}

export async function cropPagesAsBlob(file: File, pageNumbers: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = await pdfWorkerClient.run('crop', [file], {
      ...options,
      pagesToCrop: pageNumbers,
    }) as Uint8Array;

    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker crop failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.cropPages(file, pageNumbers, options);
    return createPdfBlob(pdfBytes);
  }
}

/**
 * Reorder pages and return as Blob (via worker)
 */
async function reorderViaExtract(file: File, order: number[], options: PDFProcessingOptions): Promise<Blob> {
  try {
    const pdfBytes = await pdfWorkerClient.run('reorder', [file], { ...options, pageOrder: order }) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker reorder failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.reorderPages(file, order, options);
    return createPdfBlob(pdfBytes);
  }
}

async function convertImagesToPdfAsBlob(files: File[], options: PDFProcessingOptions): Promise<Blob> {
  if (files.length === 0) {
    throw new Error('No images provided');
  }

  try {
    const pdfBytes = await pdfWorkerClient.run('imagesToPdf', files, options) as Uint8Array;
    return createPdfBlob(pdfBytes);
  } catch (error) {
    console.warn('Worker imagesToPdf failed, falling back to main thread', error);
    const pdfBytes = await PDFOps.convertImagesToPdf(files, options);
    return createPdfBlob(pdfBytes);
  }
}

export function createPdfBlob(bytes: Uint8Array): Blob {
  if (bytes.buffer instanceof ArrayBuffer) {
    const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    return new Blob([arrayBuffer], { type: 'application/pdf' });
  }

  const arrayBuffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(arrayBuffer).set(bytes);
  return new Blob([arrayBuffer], { type: 'application/pdf' });
}

/**
 * Get PDF page count (delegated to worker for consistency)
 */
export async function getPdfPageCount(file: File): Promise<number> {
  try {
    return await pdfWorkerClient.run('pageCount', [file]) as number;
  } catch {
    return PDFOps.getPDFPageCount(file);
  }
}

export async function getPdfPageDimensions(file: File, pageNumber: number): Promise<{ width: number; height: number }> {
  return PDFOps.getPDFPageDimensions(file, pageNumber);
}

export async function renderPdfThumbnail(file: File, pageNumber: number, targetWidth?: number): Promise<string> {
  return PDFOps.renderPDFThumbnail(file, pageNumber, targetWidth);
}
