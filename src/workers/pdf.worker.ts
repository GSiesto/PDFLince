import {
    compressPDF,
    mergePDFs,
    splitPDF,
    extractPages,
    cropPages,
    reorderPages,
    getPDFPageCount,
    convertPdfToImages,
    convertImagesToPdf,
    ProcessingResult,
    PdfToImagesArchiveResult,
} from '../lib/pdf-operations';

// Polyfill document for PDF.js in worker environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof self !== 'undefined') {
    // Polyfill window
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(self as any).window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (self as any).window = self;
    }
    // Polyfill document
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(self as any).document) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (self as any).document = {
            createElement: (tagName: string) => {
                if (tagName === 'canvas') {
                    // Return OffscreenCanvas if available
                    if (typeof OffscreenCanvas !== 'undefined') {
                        return new OffscreenCanvas(1, 1);
                    }
                    throw new Error('OffscreenCanvas not supported in this worker');
                }
                // Return dummy object for other elements
                return {
                    getContext: () => null,
                    style: {},
                };
            },
            head: { appendChild: () => { } },
            body: { appendChild: () => { } },
            baseURI: self.location.href,
        };
    }
}

// Note: rendering functions now use OffscreenCanvas in the worker.

self.onmessage = async (e: MessageEvent) => {
    const { id, mode, files, options } = e.data;

    try {
        let result: unknown;

        switch (mode) {
            case 'compress':
                result = await compressPDF(files[0], options);
                break;
            case 'merge':
                result = await mergePDFs(files, options);
                break;
            case 'split':
                result = await splitPDF(files[0], options);
                break;
            case 'extract':
                result = await extractPages(files[0], options.pagesToExtract, options);
                break;
            case 'crop':
                result = await cropPages(files[0], options.pagesToCrop ?? [], options);
                break;
            case 'reorder':
                result = await reorderPages(files[0], options.pageOrder, options);
                break;
            case 'pageCount':
                result = await getPDFPageCount(files[0]);
                break;
            case 'pdfToImages':
                result = await convertPdfToImages(files[0], options);
                break;
            case 'imagesToPdf':
                result = await convertImagesToPdf(files, options);
                break;
            default:
                throw new Error(`Unsupported mode in worker: ${mode}`);
        }

        // Implement Transferable objects (ArrayBuffers) for zero-copy performance
        const transfer: Transferable[] = [];

        if (result instanceof Uint8Array) {
            transfer.push(result.buffer);
        } else if (result && typeof result === 'object' && 'data' in result && (result as ProcessingResult).data instanceof Uint8Array) {
            transfer.push((result as ProcessingResult).data.buffer);
        } else if (result && typeof result === 'object' && 'kind' in result && (result as PdfToImagesArchiveResult).kind === 'zip') {
            // ZIP blob from convertPdfToImages 
            // Handling blobs is fine, but if we have the underlying buffer we'd transfer it.
            // JSZip returns a Blob, which is already efficient to clone.
        } else if (result && typeof result === 'object' && 'kind' in result && (result as PdfToImagesArchiveResult).kind === 'files') {
            // Result from pdfToImages when bundleAsZip is false
            const res = result as PdfToImagesArchiveResult & { kind: 'files' };
            res.files.forEach((f) => {
                if (f.blob instanceof Blob) { /* efficient cloning */ }
            });
        } else if (Array.isArray(result)) {
            // For split mode (array of Uint8Array)
            result.forEach(item => {
                if (item instanceof Uint8Array) {
                    transfer.push(item.buffer);
                }
            });
        }

        (self as unknown as Worker).postMessage({ id, success: true, result }, transfer);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        (self as unknown as Worker).postMessage({ id, success: false, error: errorMessage || 'Worker error' });
    }
};
