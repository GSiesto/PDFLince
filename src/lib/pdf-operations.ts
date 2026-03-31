/**
 * PDF Operations using PDF-lib
 * Clean abstraction layer for PDF processing operations
 */

import {
  PDFDict,
  PDFDocument,
  PDFName,
  PDFRawStream,
  PDFRef,
  PDFArray,
  PDFNumber,
  rgb,
} from 'pdf-lib';

// Type definitions
export type PDFProcessingMode =
  | 'compress'
  | 'merge'
  | 'split'
  | 'extract'
  | 'crop'
  | 'reorder'
  | 'pdfToImages'
  | 'imagesToPdf'
  | 'pageCount';

export type PDFProcessingOptions = {
  // General options
  compressionLevel?: 'low' | 'medium' | 'high';
  outputFormat?: 'pdf';
  pageRange?: string; // e.g. "1-5,8,11-13"
  metadata?: Record<string, string>;
  password?: string;
  pagesToExtract?: number[];
  pagesToCrop?: number[];
  pageOrder?: number[];

  pagesToRotate?: number[];
  rotationDegrees?: 90 | 180 | 270 | -90 | -180 | -270;
  cropMargins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  cropInputMode?: 'margins' | 'manual';

>>>>>>> cbfe13c (Feat: add crop PDF function)
  bundleAsZip?: boolean;

  // Compression options
  preserveMetadata?: boolean;
  stripAnnotations?: boolean;
  downscaleImages?: boolean;
  downscaleImagesDpi?: number;
  imageQuality?: number;

  // Merge options
  bookmarkHandling?: 'merge' | 'first' | 'none';
  addPageDividers?: boolean;

  // Split options
  splitMode?: 'pageCount' | 'bookmarks' | 'pageNumbers';
  pagesPerFile?: number;
  splitPoints?: string;
  outputNamePattern?: string;

  // Extract options
  maintainOriginalSize?: boolean;

  // Image conversion options
  imageOutputFormat?: 'png' | 'jpeg';
  imageOutputQuality?: number;
  imageRenderDpi?: number;
  imageBaseName?: string;
  imageFit?: 'contain' | 'cover';
  pageSize?: 'auto' | 'a4' | 'letter';
  pageOrientation?: 'auto' | 'portrait' | 'landscape';
  pageMarginPoints?: number;
  backgroundColor?: string;
};

export type ProcessingResult = {
  data: Uint8Array;
  originalSize: number;
  processedSize: number;
  compressionRatio: number;
  processingTimeMs: number;
  isSimulated?: boolean;
  universalOptimizedCount?: number;
};

export type PdfToImagesArchiveResult =
  | {
    kind: 'zip';
    blob: Blob;
    imageCount: number;
    format: 'png' | 'jpeg';
    suggestedName: string;
  }
  | {
    kind: 'files';
    files: Array<{ blob: Blob; name: string }>;
    imageCount: number;
    format: 'png' | 'jpeg';
    suggestedName?: string;
  };

type PageLayout = {
  pageWidth: number;
  pageHeight: number;
  margin: number;
};

/**
 * Compress a PDF file
 */
export async function compressPDF(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PDFProcessingOptions = {}
): Promise<ProcessingResult> {
  const startTime = performance.now();

  try {
    const arrayBuffer = fileOrData instanceof File
      ? await fileOrData.arrayBuffer()
      : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: options.preserveMetadata !== false
    });

    // Get compression level
    const compressionLevel = options.compressionLevel || 'medium';

    const shouldRemoveMetadata = options.preserveMetadata === false;
    const shouldStripAnnotations = options.stripAnnotations === true;
    const shouldDownscaleImages = options.downscaleImages === true;
    const targetDpi = options.downscaleImagesDpi ?? 150;
    const imageQuality = options.imageQuality ?? 0.82; // Default JPEG quality

    let optimizationStats = { universalOptimizedCount: 0 };

    if (shouldRemoveMetadata || shouldStripAnnotations || shouldDownscaleImages) {
      optimizationStats = await applyCompressionEnhancements(pdfDoc, {
        removeMetadata: shouldRemoveMetadata,
        stripAnnotations: shouldStripAnnotations,
        downscaleImages: shouldDownscaleImages,
        targetDpi,
        imageQuality,
      });
    }

    // Save with optimization
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true, // Compress object streams
      addDefaultPage: false,
      objectsPerTick: compressionLevel === 'high' ? 500 : 50,
    });

    const endTime = performance.now();

    return {
      data: pdfBytes,
      originalSize: arrayBuffer.byteLength,
      processedSize: pdfBytes.length,
      compressionRatio: pdfBytes.length / arrayBuffer.byteLength,
      processingTimeMs: endTime - startTime,
      universalOptimizedCount: optimizationStats.universalOptimizedCount,
    };
  } catch (error) {
    console.error('Error compressing PDF:', error);
    throw new Error(`Failed to compress PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}

type CompressionEnhancementPlan = {
  removeMetadata: boolean;
  stripAnnotations: boolean;
  downscaleImages: boolean;
  targetDpi: number;
  imageQuality: number;
};

async function applyCompressionEnhancements(pdfDoc: PDFDocument, plan: CompressionEnhancementPlan) {
  let universalOptimizedCount = 0;

  if (plan.removeMetadata) {
    removeDocumentMetadata(pdfDoc);
  }

  if (plan.stripAnnotations) {
    stripPageAnnotations(pdfDoc);
  }

  if (plan.downscaleImages) {
    universalOptimizedCount = await downscaleDocumentImages(pdfDoc, plan.targetDpi, plan.imageQuality);
  }

  return { universalOptimizedCount };
}

function removeDocumentMetadata(pdfDoc: PDFDocument) {
  const metadataKey = PDFName.of('Metadata');
  const context = pdfDoc.context;

  const infoEntry = context.trailerInfo.Info;
  if (infoEntry instanceof PDFRef) {
    const infoDict = context.lookupMaybe(infoEntry, PDFDict);
    if (infoDict) {
      infoDict.keys().forEach(key => infoDict.delete(key));
    }
    context.delete(infoEntry);
  } else if (infoEntry instanceof PDFDict) {
    infoEntry.keys().forEach(key => infoEntry.delete(key));
    const ref = context.getObjectRef(infoEntry);
    if (ref) {
      context.delete(ref);
    }
  }
  context.trailerInfo.Info = undefined;

  const metadataEntry = pdfDoc.catalog.get(metadataKey);
  if (metadataEntry) {
    if (metadataEntry instanceof PDFRef) {
      context.delete(metadataEntry);
    }
    pdfDoc.catalog.delete(metadataKey);
  }
}

function stripPageAnnotations(pdfDoc: PDFDocument) {
  const pages = pdfDoc.getPages();
  const annotsKey = PDFName.of('Annots');

  pages.forEach(page => {
    page.node.delete(annotsKey);
  });
}

/**
 * Decompress FlateDecode/Zlib bytes using browser's DecompressionStream.
 */
async function decompressFlate(bytes: Uint8Array): Promise<Uint8Array | null> {
  if (typeof DecompressionStream === 'undefined') return null;
  try {
    const ds = new DecompressionStream('deflate');
    const writer = ds.writable.getWriter();
    writer.write(bytes as unknown as BufferSource);
    writer.close();
    const output = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(output);
  } catch {
    return null;
  }
}

/**
 * Undo PNG predictors (None, Sub, Up, Average, Paeth) for FlateDecode streams.
 * Handles the standard PDF predictor types 10-15.
 */
function unfilterPng(bytes: Uint8Array, width: number, height: number, bpp: number): Uint8Array {
  const rowSize = width * bpp + 1;
  const result = new Uint8Array(width * height * bpp);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    if (rowStart + rowSize > bytes.length) break;

    const filter = bytes[rowStart];
    const rawRowStart = y * width * bpp;

    for (let x = 0; x < width * bpp; x++) {
      const currentByte = bytes[rowStart + 1 + x];
      const left = x >= bpp ? result[rawRowStart + x - bpp] : 0;
      const up = y > 0 ? result[rawRowStart - width * bpp + x] : 0;
      const upLeft = (y > 0 && x >= bpp) ? result[rawRowStart - width * bpp + x - bpp] : 0;

      let val = 0;
      switch (filter) {
        case 0: val = currentByte; break;
        case 1: val = (currentByte + left) % 256; break;
        case 2: val = (currentByte + up) % 256; break;
        case 3: val = (currentByte + Math.floor((left + up) / 2)) % 256; break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          const pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : upLeft);
          val = (currentByte + pr) % 256;
          break;
        }
        default: val = currentByte; break;
      }
      result[rawRowStart + x] = val;
    }
  }
  return result;
}

// Main image downscaling logic
async function downscaleImage(
  bytes: Uint8Array,
  targetDpi: number,
  quality: number,
  rawParams?: { width: number; height: number; colorSpace: string }
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  const hasDocument = typeof document !== 'undefined';
  const hasOffscreen = typeof OffscreenCanvas !== 'undefined';

  if (!hasDocument && !hasOffscreen) return null;

  let width = 0;
  let height = 0;
  let source: ImageBitmap | HTMLImageElement | ImageData | null = null;

  try {
    if (rawParams) {
      const { width: w, height: h, colorSpace } = rawParams;
      width = w;
      height = h;

      let rgba: Uint8ClampedArray;
      if (colorSpace === 'DeviceRGB') {
        rgba = new Uint8ClampedArray(w * h * 4);
        for (let i = 0; i < w * h; i++) {
          rgba[i * 4] = bytes[i * 3];
          rgba[i * 4 + 1] = bytes[i * 3 + 1];
          rgba[i * 4 + 2] = bytes[i * 3 + 2];
          rgba[i * 4 + 3] = 255;
        }
      } else if (colorSpace === 'DeviceGray') {
        rgba = new Uint8ClampedArray(w * h * 4);
        for (let i = 0; i < w * h; i++) {
          const g = bytes[i];
          rgba[i * 4] = g;
          rgba[i * 4 + 1] = g;
          rgba[i * 4 + 2] = g;
          rgba[i * 4 + 3] = 255;
        }
      } else {
        return null; // Unsupported raw color space (like CMYK/Indexed) for now
      }
      source = new ImageData(rgba as unknown as Uint8ClampedArray<ArrayBuffer>, w, h);
    } else {
      const blob = new Blob([bytes as BlobPart], { type: 'image/jpeg' });
      if (typeof createImageBitmap === 'function') {
        const bitmap = await createImageBitmap(blob);
        width = bitmap.width;
        height = bitmap.height;
        source = bitmap;
      } else if (hasDocument) {
        const img = await loadImageFromBlob(blob);
        width = img.width;
        height = img.height;
        source = img;
      }
    }
  } catch {
    return null;
  }

  if (!source) return null;

  const maxDimension = Math.max(width, height);
  const targetPixels = Math.round(targetDpi * 8.27);

  // High-res FlateDecode images should ALWAYS be converted to JPEG regardless of DPI
  if (!rawParams && (maxDimension <= targetPixels * 1.05 || targetPixels <= 0)) {
    if (source instanceof ImageBitmap) source.close();
    return null;
  }

  const scale = targetPixels <= 0 ? 1 : Math.min(1, targetPixels / maxDimension);
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));

  let resultBlob: Blob | null = null;

  if (hasOffscreen) {
    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (source instanceof ImageData) {
      if (width === targetWidth && height === targetHeight) {
        ctx.putImageData(source, 0, 0);
      } else {
        const tempCanvas = new OffscreenCanvas(width, height);
        tempCanvas.getContext('2d')!.putImageData(source, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
      }
    } else {
      ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
    }
    resultBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
  } else if (hasDocument) {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (source instanceof ImageData) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCanvas.getContext('2d')!.putImageData(source, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
    } else {
      ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
    }
    resultBlob = await new Promise<Blob | null>(resolve =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
  }

  if (source instanceof ImageBitmap) source.close();
  if (!resultBlob) return null;

  return {
    bytes: new Uint8Array(await resultBlob.arrayBuffer()),
    width: targetWidth,
    height: targetHeight
  };
}

async function downscaleDocumentImages(pdfDoc: PDFDocument, targetDpi: number, quality: number) {
  let universalOptimizedCount = 0;
  const processedImages = new Map<string, { bytes: Uint8Array; width: number; height: number }>();
  const allObjects = pdfDoc.context.enumerateIndirectObjects();

  for (const [ref, object] of allObjects) {
    if (!(object instanceof PDFRawStream)) continue;

    const subtype = object.dict.get(PDFName.of("Subtype"));
    if (subtype !== PDFName.of("Image")) continue;

    const filter = object.dict.get(PDFName.of("Filter"));
    const isDCT = filter === PDFName.of("DCTDecode") ||
      (filter instanceof PDFArray && filter.asArray().some(f => f === PDFName.of("DCTDecode")));
    const isFlate = filter === PDFName.of("FlateDecode") ||
      (filter instanceof PDFArray && filter.asArray().some(f => f === PDFName.of("FlateDecode")));

    if (!isDCT && !isFlate) continue;

    let imageBytes = object.contents;
    let rawParams: { width: number; height: number; colorSpace: string } | undefined;

    if (isFlate) {
      const decompressed = await decompressFlate(imageBytes);
      if (!decompressed) continue;

      const w = object.dict.get(PDFName.of('Width'));
      const h = object.dict.get(PDFName.of('Height'));
      const cs = object.dict.get(PDFName.of('ColorSpace'));
      const bpc = object.dict.get(PDFName.of('BitsPerComponent'));
      const params = object.dict.get(PDFName.of('DecodeParms'));

      if (w instanceof PDFNumber && h instanceof PDFNumber && bpc instanceof PDFNumber && bpc.asNumber() === 8) {
        const width = w.asNumber();
        const height = h.asNumber();
        const colorSpace = cs instanceof PDFName ? cs.asString().replace(/^\//, '') : 'DeviceRGB';
        const bpp = colorSpace === 'DeviceRGB' ? 3 : 1;

        let predictor = 1;
        if (params instanceof PDFDict) {
          const p = params.get(PDFName.of('Predictor'));
          if (p instanceof PDFNumber) predictor = p.asNumber();
        }

        if (predictor >= 10) {
          imageBytes = unfilterPng(decompressed, width, height, bpp);
        } else if (predictor > 1) {
          continue; // Unsupported predictor (e.g. LZW)
        } else {
          imageBytes = decompressed;
        }

        rawParams = { width, height, colorSpace };
      } else {
        continue; // Unsupported bpc or missing dimensions
      }
    }

    const hash = hashBytes(imageBytes);
    const cached = processedImages.get(hash);

    if (cached) {
      // PDFRawStream.contents is readonly, so we must replace the object in the context
      const newStream = PDFRawStream.of(object.dict, cached.bytes);
      newStream.dict.set(PDFName.of("Length"), pdfDoc.context.obj(cached.bytes.length));
      newStream.dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      newStream.dict.set(PDFName.of("Width"), pdfDoc.context.obj(cached.width));
      newStream.dict.set(PDFName.of("Height"), pdfDoc.context.obj(cached.height));
      newStream.dict.delete(PDFName.of('DecodeParms'));

      // Assign the new stream to the existing reference
      pdfDoc.context.assign(ref, newStream);

      // If the original was not DCT (JPEG), we count this as a universal optimization (format conversion)
      if (!isDCT) {
        universalOptimizedCount++;
      }
      continue;
    }

    const result = await downscaleImage(imageBytes, targetDpi, quality, rawParams);
    if (result) {
      // PDFRawStream.contents is readonly, so we must replace the object in the context
      const newStream = PDFRawStream.of(object.dict, result.bytes);
      newStream.dict.set(PDFName.of("Length"), pdfDoc.context.obj(result.bytes.length));
      newStream.dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
      newStream.dict.set(PDFName.of("Width"), pdfDoc.context.obj(result.width));
      newStream.dict.set(PDFName.of("Height"), pdfDoc.context.obj(result.height));
      newStream.dict.delete(PDFName.of('DecodeParms'));

      // Assign the new stream to the existing reference
      pdfDoc.context.assign(ref, newStream);
      processedImages.set(hash, result);

      // If the original was not DCT (JPEG), we count this as a universal optimization (format conversion)
      if (!isDCT) {
        universalOptimizedCount++;
      }
    }
  }

  return universalOptimizedCount;
}

function hashBytes(bytes: Uint8Array): string {
  let hash = 0;
  for (let i = 0; i < bytes.length; i++) {
    hash = (hash << 5) - hash + bytes[i];
    hash |= 0;
  }
  return hash.toString(36);
}

function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = 'async';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (event) => {
      URL.revokeObjectURL(url);
      reject(event instanceof ErrorEvent ? event.error : new Error('Failed to load image'));
    };
    img.src = url;
  });
}

const yieldToMain = () => new Promise(resolve => setTimeout(resolve, 0));

export async function mergePDFs(
  filesOrData: (File | ArrayBuffer | Uint8Array)[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (filesOrData.length === 0) throw new Error('No files to merge');
    if (filesOrData.length === 1) {
      const data = filesOrData[0];
      return data instanceof File ? new Uint8Array(await data.arrayBuffer()) : new Uint8Array(data);
    }

    const mergedPdf = await PDFDocument.create();
    for (let i = 0; i < filesOrData.length; i++) {
      await yieldToMain();
      const input = filesOrData[i];
      const arrayBuffer = input instanceof File ? await input.arrayBuffer() : input;
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));

      if (options.addPageDividers && i < filesOrData.length - 1) {
        const dividerPage = mergedPdf.addPage();
        const { width, height } = dividerPage.getSize();
        dividerPage.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });
      }
    }

    if (options.metadata) {
      if (options.metadata.title) mergedPdf.setTitle(options.metadata.title);
      if (options.metadata.author) mergedPdf.setAuthor(options.metadata.author);
      if (options.metadata.subject) mergedPdf.setSubject(options.metadata.subject);
      if (options.metadata.keywords) mergedPdf.setKeywords([options.metadata.keywords]);
    }

    return mergedPdf.save({ useObjectStreams: true });
  } catch (error) {
    console.error('Error merging PDFs:', error);
    throw new Error(`Failed to merge PDFs: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function splitPDF(
  fileOrData: File | ArrayBuffer | Uint8Array,
  options: PDFProcessingOptions = {}
): Promise<Uint8Array[]> {
  try {
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const pagesPerFile = options.pagesPerFile || 1;
    const results: Uint8Array[] = [];

    for (let i = 0; i < pageCount; i += pagesPerFile) {
      await yieldToMain();
      const newPdf = await PDFDocument.create();
      const endPage = Math.min(i + pagesPerFile, pageCount);
      const pageIndices = Array.from({ length: endPage - i }, (_, idx) => i + idx);
      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));
      results.push(await newPdf.save({ useObjectStreams: true }));
    }
    return results;
  } catch (error) {
    console.error('Error splitting PDF:', error);
    throw new Error(`Failed to split PDF: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function extractPages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumbers: number[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (pageNumbers.length === 0) throw new Error('No pages to extract');
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const validPageIndices = pageNumbers.map(num => num - 1).filter(idx => idx >= 0 && idx < pageCount).sort((a, b) => a - b);
    if (validPageIndices.length === 0) throw new Error('No valid page numbers provided');

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, validPageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    if (options.preserveMetadata !== false) {
      const title = pdfDoc.getTitle();
      const author = pdfDoc.getAuthor();
      const subject = pdfDoc.getSubject();
      if (title) newPdf.setTitle(title);
      if (author) newPdf.setAuthor(author);
      if (subject) newPdf.setSubject(subject);
    }

    return newPdf.save({ useObjectStreams: true });
  } catch (error) {
    console.error('Error extracting pages:', error);
    throw new Error(`Failed to extract pages: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function reorderPages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  newOrder: number[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (newOrder.length === 0) throw new Error('No page order provided');
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageCount = pdfDoc.getPageCount();
    const validPageIndices = newOrder.map(num => num - 1).filter(idx => idx >= 0 && idx < pageCount);
    if (validPageIndices.length === 0) throw new Error('No valid page numbers in order');

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdfDoc, validPageIndices);
    copiedPages.forEach((page) => newPdf.addPage(page));

    if (options.preserveMetadata !== false) {
      const title = pdfDoc.getTitle();
      const author = pdfDoc.getAuthor();
      const subject = pdfDoc.getSubject();
      if (title) newPdf.setTitle(title);
      if (author) newPdf.setAuthor(author);
      if (subject) newPdf.setSubject(subject);
    }

    return newPdf.save({ useObjectStreams: true });
  } catch (error) {
    console.error('Error reordering pages:', error);
    throw new Error(`Failed to reorder pages: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function cropPages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumbers: number[],
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (pageNumbers.length === 0) {
      throw new Error('No pages to crop');
    }

    const margins = options.cropMargins;
    if (!margins) {
      throw new Error('No crop margins provided');
    }

    const left = Math.max(0, margins.left ?? 0);
    const right = Math.max(0, margins.right ?? 0);
    const top = Math.max(0, margins.top ?? 0);
    const bottom = Math.max(0, margins.bottom ?? 0);

    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: options.preserveMetadata !== false,
    });

    const pageCount = pdfDoc.getPageCount();
    const validPageIndices = [...new Set(
      pageNumbers
        .map(num => num - 1)
        .filter(idx => idx >= 0 && idx < pageCount)
    )];

    if (validPageIndices.length === 0) {
      throw new Error('No valid page numbers provided');
    }

    for (const pageIndex of validPageIndices) {
      const page = pdfDoc.getPage(pageIndex);
      const mediaBox = page.getMediaBox();
      const nextWidth = mediaBox.width - left - right;
      const nextHeight = mediaBox.height - top - bottom;

      if (nextWidth <= 0 || nextHeight <= 0) {
        throw new Error(`Crop margins exceed page bounds on page ${pageIndex + 1}`);
      }

      const nextX = mediaBox.x + left;
      const nextY = mediaBox.y + bottom;

      page.setMediaBox(nextX, nextY, nextWidth, nextHeight);
      page.setCropBox(nextX, nextY, nextWidth, nextHeight);
      page.setBleedBox(nextX, nextY, nextWidth, nextHeight);
      page.setTrimBox(nextX, nextY, nextWidth, nextHeight);
      page.setArtBox(nextX, nextY, nextWidth, nextHeight);
    }

    if (options.metadata) {
      if (options.metadata.title) pdfDoc.setTitle(options.metadata.title);
      if (options.metadata.author) pdfDoc.setAuthor(options.metadata.author);
      if (options.metadata.subject) pdfDoc.setSubject(options.metadata.subject);
      if (options.metadata.keywords) {
        pdfDoc.setKeywords([options.metadata.keywords]);
      }
    }

    return pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
  } catch (error) {
    console.error('Error cropping pages:', error);
    throw new Error(
      `Failed to crop pages: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export async function rotatePages(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumbers: number[],
  rotationDegrees: 90 | 180 | 270 | -90 | -180 | -270 = 90,
  options: PDFProcessingOptions = {}
): Promise<Uint8Array> {
  try {
    if (pageNumbers.length === 0) {
      throw new Error('No pages to rotate');
    }

    const arrayBuffer =
      fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;

    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: options.preserveMetadata !== false,
    });

    const pageCount = pdfDoc.getPageCount();

    const validPageIndices = [...new Set(
      pageNumbers
        .map((num) => num - 1)
        .filter((idx) => idx >= 0 && idx < pageCount)
    )];

    if (validPageIndices.length === 0) {
      throw new Error('No valid page numbers provided');
    }

    for (const pageIndex of validPageIndices) {
      const page = pdfDoc.getPage(pageIndex);
      const currentRotation = page.getRotation().angle;
      const nextRotation = normalizeRotation(currentRotation + rotationDegrees);
      page.setRotation(degrees(nextRotation));
    }

    if (options.metadata) {
      if (options.metadata.title) pdfDoc.setTitle(options.metadata.title);
      if (options.metadata.author) pdfDoc.setAuthor(options.metadata.author);
      if (options.metadata.subject) pdfDoc.setSubject(options.metadata.subject);
      if (options.metadata.keywords) {
        pdfDoc.setKeywords([options.metadata.keywords]);
      }
    }

    return pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });
  } catch (error) {
    console.error('Error rotating pages:', error);
    throw new Error(
      `Failed to rotate pages: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

function normalizeRotation(angle: number): 0 | 90 | 180 | 270 {
  const normalized = ((angle % 360) + 360) % 360;

  if (normalized === 0) return 0;
  if (normalized === 90) return 90;
  if (normalized === 180) return 180;
  if (normalized === 270) return 270;

  throw new Error(`Invalid rotation angle: ${angle}`);
}

>>>>>>> cbfe13c (Feat: add crop PDF function)
export async function getPDFPageCount(fileOrData: File | ArrayBuffer | Uint8Array): Promise<number> {
  try {
    const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error('Error getting page count:', error);
    return 0;
  }
}

export async function getPDFPageDimensions(
  fileOrData: File | ArrayBuffer | Uint8Array,
  pageNumber: number
): Promise<{ width: number; height: number }> {
  const arrayBuffer = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();
  const pageIndex = Math.min(Math.max(pageNumber - 1, 0), Math.max(pageCount - 1, 0));
  const page = pdfDoc.getPage(pageIndex);
  const mediaBox = page.getMediaBox();
  return { width: mediaBox.width, height: mediaBox.height };
}

const FALLBACK_THUMBNAIL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

/** Minimal interface for pdfjs-dist PDFDocumentProxy (avoids importing full pdfjs types) */
interface PdfjsDocument {
  numPages: number;
  getPage(pageNumber: number): Promise<PdfjsPage>;
}

interface PdfjsPage {
  getViewport(params: { scale: number }): { width: number; height: number };
  render(params: { canvasContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D; viewport: { width: number; height: number } }): { promise: Promise<void> };
  cleanup(): void;
}

type PdfJsModule = typeof import('pdfjs-dist/legacy/build/pdf');
let pdfjsLibPromise: Promise<PdfJsModule> | null = null;
const pdfDocumentCache = new WeakMap<File, Promise<PdfjsDocument>>();
const thumbnailCache = new WeakMap<File, Map<string, string>>();

const PAGE_SIZE_MAP: Record<'a4' | 'letter', { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

async function getPdfJsLib(): Promise<PdfJsModule> {
  if (typeof window === 'undefined') throw new Error('PDF.js can only be used in the browser');
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import('pdfjs-dist/legacy/build/pdf').then((module) => {
      if (!module.GlobalWorkerOptions.workerSrc) {
        module.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }
      return module;
    });
  }
  return pdfjsLibPromise;
}

async function getCachedPdfDocument(fileOrData: File | ArrayBuffer | Uint8Array): Promise<PdfjsDocument> {
  const isFile = fileOrData instanceof File;
  let docPromise = isFile ? pdfDocumentCache.get(fileOrData) : null;
  if (!docPromise) {
    docPromise = (async () => {
      const pdfjsLib = await getPdfJsLib();
      const data = fileOrData instanceof File ? await fileOrData.arrayBuffer() : fileOrData;
      // Use absolute URLs for CMap/font loading
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : self.location.origin;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isInWorker = typeof (globalThis as any).importScripts === 'function';
      const loadingTask = pdfjsLib.getDocument({
        data,
        cMapUrl: `${baseUrl}/cmaps/`,
        cMapPacked: true,
        standardFontDataUrl: `${baseUrl}/standard_fonts/`,
        // In worker: disable @font-face (CSS not available) → forces path-based glyph rendering
        disableFontFace: isInWorker,
        // In worker: fetch CMaps/fonts from our context (has polyfills), not pdf.js's nested worker
        useWorkerFetch: !isInWorker,
      });
      return loadingTask.promise as unknown as PdfjsDocument;
    })();
    if (isFile) pdfDocumentCache.set(fileOrData, docPromise);
  }
  return docPromise;
}

function getThumbnailCache(file: File): Map<string, string> {
  let cache = thumbnailCache.get(file);
  if (!cache) {
    cache = new Map<string, string>();
    thumbnailCache.set(file, cache);
  }
  return cache;
}

function sanitizeFileBaseName(raw: string): string {
  const normalised = raw.trim().replace(/[^\p{L}\p{N}\-_. ]/gu, '-').replace(/\s+/g, '-');
  const cleaned = normalised.replace(/-+/g, '-').replace(/^-|-$/g, '');
  return cleaned.length > 0 ? cleaned.toLowerCase() : 'pdflince';
}

function stripExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex <= 0 ? fileName : fileName.slice(0, dotIndex);
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function parseBackgroundColor(color?: string) {
  const fallback = rgb(1, 1, 1);
  if (!color) return fallback;
  const hexMatch = color.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hexMatch) return fallback;
  let hex = hexMatch[1];
  if (hex.length === 3) hex = hex.split('').map(char => char + char).join('');
  const intVal = parseInt(hex, 16);
  return rgb(((intVal >> 16) & 0xff) / 255, ((intVal >> 8) & 0xff) / 255, (intVal & 0xff) / 255);
}

async function normalizeImageForPdf(fileOrData: File | ArrayBuffer | Uint8Array): Promise<{ bytes: Uint8Array; format: 'png' | 'jpeg' }> {
  const data = fileOrData instanceof File ? fileOrData : new Blob([fileOrData as BlobPart]);
  if (fileOrData instanceof File) {
    const lowerName = fileOrData.name.toLowerCase();
    const mime = (fileOrData.type || '').toLowerCase();
    if (mime === 'image/png' || lowerName.endsWith('.png')) return { bytes: new Uint8Array(await fileOrData.arrayBuffer()), format: 'png' };
    if (mime === 'image/jpeg' || mime === 'image/jpg' || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) return { bytes: new Uint8Array(await fileOrData.arrayBuffer()), format: 'jpeg' };
  }
  const hasDocument = typeof document !== 'undefined';
  let resultBuffer: ArrayBuffer;
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(data);
    const w = bitmap.width, h = bitmap.height;
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(w, h);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
    } else {
      throw new Error('Canvas support required for image processing');
    }
    const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();
    const blob = (canvas instanceof OffscreenCanvas) ? await canvas.convertToBlob({ type: 'image/png' }) : await new Promise<Blob>(r => (canvas as HTMLCanvasElement).toBlob(b => r(b!), 'image/png'));
    resultBuffer = await blob.arrayBuffer();
  } else {
    if (!hasDocument) throw new Error('Image rendering requires a browser environment');
    const img = await loadImageFromBlob(data);
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    canvas.getContext('2d')!.drawImage(img, 0, 0);
    const blob = await new Promise<Blob>(r => canvas.toBlob(b => r(b!), 'image/png'));
    resultBuffer = await blob.arrayBuffer();
  }
  return { bytes: new Uint8Array(resultBuffer as ArrayBuffer), format: 'png' };
}

function resolvePageLayout(imageWidth: number, imageHeight: number, options: PDFProcessingOptions, fallbackMargin: number): PageLayout {
  const sizeOption = options.pageSize ?? 'auto';
  if (sizeOption === 'auto') return { pageWidth: imageWidth, pageHeight: imageHeight, margin: 0 };
  const base = PAGE_SIZE_MAP[sizeOption];
  if (!base) return { pageWidth: imageWidth, pageHeight: imageHeight, margin: 0 };
  const useLandscape = (options.pageOrientation ?? 'auto') === 'landscape' || ((options.pageOrientation ?? 'auto') === 'auto' && imageWidth > imageHeight);
  return { pageWidth: useLandscape ? base.height : base.width, pageHeight: useLandscape ? base.width : base.height, margin: Math.max(0, fallbackMargin) };
}

export async function convertImagesToPdf(files: File[], options: PDFProcessingOptions = {}): Promise<Uint8Array> {
  if (files.length === 0) throw new Error('No images provided');
  const pdfDoc = await PDFDocument.create();
  const defaultMargin = clamp(options.pageMarginPoints ?? 18, 0, 144);
  const background = parseBackgroundColor(options.backgroundColor);
  for (const file of files) {
    await yieldToMain();
    const normalised = await normalizeImageForPdf(file);
    const image = normalised.format === 'png' ? await pdfDoc.embedPng(normalised.bytes) : await pdfDoc.embedJpg(normalised.bytes);
    const layout = resolvePageLayout(image.size().width, image.size().height, options, defaultMargin);
    const page = pdfDoc.addPage([layout.pageWidth, layout.pageHeight]);
    page.drawRectangle({ x: 0, y: 0, width: layout.pageWidth, height: layout.pageHeight, color: background });
    const availW = Math.max(layout.pageWidth - layout.margin * 2, 0);
    const availH = Math.max(layout.pageHeight - layout.margin * 2, 0);
    const sf = (options.imageFit === 'cover') ? Math.max(availW / image.size().width, availH / image.size().height) : Math.min(availW / image.size().width, availH / image.size().height);
    page.drawImage(image, { x: (layout.pageWidth - image.size().width * sf) / 2, y: (layout.pageHeight - image.size().height * sf) / 2, width: image.size().width * sf, height: image.size().height * sf });
  }
  return pdfDoc.save({ useObjectStreams: true });
}

// Canvas factory for PDF.js in worker environment
const workerCanvasFactory = {
  create: function (width: number, height: number) {
    if (width <= 0 || height <= 0) throw new Error('Invalid canvas size');
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(width, height);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas'); // SAFE
      canvas.width = width;
      canvas.height = height;
    } else {
      throw new Error('Canvas not supported');
    }
    const context = canvas.getContext('2d');
    return { canvas, context };
  },
  reset: function (canvasAndContext: { canvas: HTMLCanvasElement | OffscreenCanvas; context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D }, width: number, height: number) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },
  destroy: function (canvasAndContext: { canvas: HTMLCanvasElement | OffscreenCanvas | null; context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null }) {
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};


export async function convertPdfToImages(fileOrData: File | ArrayBuffer | Uint8Array, options: PDFProcessingOptions = {}): Promise<PdfToImagesArchiveResult> {
  const doc = await getCachedPdfDocument(fileOrData);
  const scale = (options.imageRenderDpi ?? 144) / 72;
  const extension = (options.imageOutputFormat ?? 'png') === 'png' ? 'png' : 'jpg';
  const entries: Array<{ name: string; blob: Blob }> = [];
  const base = sanitizeFileBaseName(options.imageBaseName ?? (fileOrData instanceof File ? stripExtension(fileOrData.name) : 'pdflince'));
  for (let i = 1; i <= doc.numPages; i++) {
    await yieldToMain();
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale });
    const w = Math.ceil(vp.width);
    const h = Math.ceil(vp.height);
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(w, h);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
    } else {
      throw new Error('Canvas support required for PDF processing');
    }
    const ctx = canvas.getContext('2d', { alpha: false })! as CanvasRenderingContext2D;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport: vp,
      canvasFactory: workerCanvasFactory,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).promise;
    const blob = (canvas instanceof OffscreenCanvas) ? await canvas.convertToBlob({ type: `image/${extension === 'jpg' ? 'jpeg' : 'png'}`, quality: options.imageOutputQuality }) : await new Promise<Blob>(r => (canvas as HTMLCanvasElement).toBlob(b => r(b!), `image/${extension === 'jpg' ? 'jpeg' : 'png'}`, options.imageOutputQuality));
    entries.push({ name: `${base}_${String(i).padStart(String(doc.numPages).length, '0')}.${extension}`, blob });
    page.cleanup();
  }
  if (options.bundleAsZip === false) return { kind: 'files', files: entries, imageCount: entries.length, format: options.imageOutputFormat ?? 'png' };
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  entries.forEach(e => zip.file(e.name, e.blob));
  return { kind: 'zip', blob: await zip.generateAsync({ type: 'blob' }), imageCount: entries.length, format: options.imageOutputFormat ?? 'png', suggestedName: `${base}_${extension}.zip` };
}

export async function renderPDFThumbnail(file: File, pageNumber: number, targetWidth = 160): Promise<string> {
  const cache = getThumbnailCache(file);
  const resolvedTargetWidth = Math.max(1, Math.round(targetWidth));
  const cacheKey = `${pageNumber}_${resolvedTargetWidth}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  try {
    const doc = await getCachedPdfDocument(file);
    const page = await doc.getPage(pageNumber);
    const viewportAtScaleOne = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: resolvedTargetWidth / viewportAtScaleOne.width });
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(vp.width, vp.height);
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = vp.width; canvas.height = vp.height;
    } else {
      return FALLBACK_THUMBNAIL;
    }
    canvas.width = vp.width; canvas.height = vp.height;
    const ctx = canvas.getContext('2d')! as CanvasRenderingContext2D;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport: vp,
      canvasFactory: workerCanvasFactory
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any).promise;

    // Convert to Data URL (OffscreenCanvas needs hack or FileReader)
    let url: string;
    if (canvas instanceof OffscreenCanvas) {
      const blob = await canvas.convertToBlob({ type: 'image/png' });
      url = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } else {
      url = (canvas as HTMLCanvasElement).toDataURL('image/png');
    }

    cache.set(cacheKey, url);
    page.cleanup();
    return url;
  } catch {
    return FALLBACK_THUMBNAIL;
  }
}
