import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { inspectSchema, handleInspect } from './tools/inspect';
import { mergeSchema, handleMerge } from './tools/merge';
import { splitSchema, handleSplit } from './tools/split';
import { extractSchema, handleExtract } from './tools/extract';
import { rotateSchema, handleRotate } from './tools/rotate';
import { cropSchema, handleCrop } from './tools/crop';
import { compressSchema, handleCompress } from './tools/compress';
import { reorderSchema, handleReorder } from './tools/reorder';
import { pdfToImagesSchema, handlePdfToImages } from './tools/pdf-to-images';
import { imagesToPdfSchema, handleImagesToPdf } from './tools/images-to-pdf';
import { ensureNodeImageAdapterRegistered } from './utils/image-adapter';

/**
 * Creates and initializes the PDFLince MCP server instance with all tools registered.
 */
export function createPdfLinceMcpServer(): McpServer {
  ensureNodeImageAdapterRegistered();

  const server = new McpServer({
    name: 'pdflince',
    version: '1.0.0',
  });

  // Helper to wrap handlers with graceful error formatting
  const safeHandler = <T>(
    handler: (args: T) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
  ) => {
    return async (args: T) => {
      try {
        return await handler(args);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          isError: true,
          content: [
            {
              type: 'text' as const,
              text: `PDFLince Error: ${message}`,
            },
          ],
        };
      }
    };
  };

  // 1. Inspect
  server.registerTool(
    'pdflince_inspect',
    {
      description:
        'Inspects a local PDF file. Returns total page count, dimensions, orientation, and document metadata (author, title, etc).',
      inputSchema: inspectSchema,
    },
    safeHandler(handleInspect)
  );

  // 2. Merge
  server.registerTool(
    'pdflince_merge',
    {
      description:
        'Merges two or more local PDF files into a single destination PDF file. Can optionally insert divider pages and apply custom metadata.',
      inputSchema: mergeSchema,
    },
    safeHandler(handleMerge)
  );

  // 3. Split
  server.registerTool(
    'pdflince_split',
    {
      description:
        'Splits a local PDF into multiple files based on page count per file (default 1 page per file), with optional ZIP bundling.',
      inputSchema: splitSchema,
    },
    safeHandler(handleSplit)
  );

  // 4. Extract
  server.registerTool(
    'pdflince_extract',
    {
      description:
        'Extracts specific pages from a local PDF into a new PDF file. Accepts page numbers as an array or a range string (e.g. "1-3, 5, 8").',
      inputSchema: extractSchema,
    },
    safeHandler(handleExtract)
  );

  // 5. Reorder
  server.registerTool(
    'pdflince_reorder',
    {
      description:
        'Reorders the pages of a local PDF according to a specified sequence of 1-indexed page numbers (e.g. [3, 1, 2]).',
      inputSchema: reorderSchema,
    },
    safeHandler(handleReorder)
  );

  // 6. Rotate
  server.registerTool(
    'pdflince_rotate',
    {
      description:
        'Rotates pages in a local PDF by a specified angle (90, 180, 270, -90, -180, -270 degrees). Can rotate all pages or specific pages.',
      inputSchema: rotateSchema,
    },
    safeHandler(handleRotate)
  );

  // 7. Crop
  server.registerTool(
    'pdflince_crop',
    {
      description:
        'Trims margins (top, bottom, left, right in points) from pages in a local PDF.',
      inputSchema: cropSchema,
    },
    safeHandler(handleCrop)
  );

  // 8. Compress
  server.registerTool(
    'pdflince_compress',
    {
      description:
        'Compresses a local PDF using UI-matching compression presets (low, medium, high), embedded image downscaling (150/72 DPI), structural object stream optimization, annotation stripping, and metadata removal.',
      inputSchema: compressSchema,
    },
    safeHandler(handleCompress)
  );

  // 9. PDF to Images
  server.registerTool(
    'pdflince_pdf_to_images',
    {
      description:
        'Renders pages of a local PDF file into PNG or JPEG images at a configurable DPI (72, 144, 300) and quality, with optional ZIP bundling.',
      inputSchema: pdfToImagesSchema,
    },
    safeHandler(handlePdfToImages)
  );

  // 10. Images to PDF
  server.registerTool(
    'pdflince_images_to_pdf',
    {
      description:
        'Converts local image files (PNG, JPG/JPEG, WebP, TIFF) into a formatted PDF document with customizable fit, page size, orientation, margins, and background color.',
      inputSchema: imagesToPdfSchema,
    },
    safeHandler(handleImagesToPdf)
  );

  return server;
}
