import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import { PDFDocument, rgb } from 'pdf-lib';
import { parseAndValidatePageNumbers } from '../../src/mcp/utils/page-range';
import { handleInspect } from '../../src/mcp/tools/inspect';
import { handleMerge } from '../../src/mcp/tools/merge';
import { handleSplit } from '../../src/mcp/tools/split';
import { handleExtract } from '../../src/mcp/tools/extract';
import { handleRotate } from '../../src/mcp/tools/rotate';
import { handleCrop } from '../../src/mcp/tools/crop';
import { handleCompress } from '../../src/mcp/tools/compress';
import { handleReorder } from '../../src/mcp/tools/reorder';
import { handlePdfToImages } from '../../src/mcp/tools/pdf-to-images';
import { handleImagesToPdf } from '../../src/mcp/tools/images-to-pdf';
import { getPDFPageCount } from '../../src/lib/pdf-operations';

describe('PDFLince MCP Server Utilities and Tools', () => {
  let tempDir: string;
  let testPdfPath1: string;
  let testPdfPath2: string;
  let testImagePath: string;

  beforeAll(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pdflince-mcp-test-'));

    // Create Sample PDF 1 (3 pages)
    const doc1 = await PDFDocument.create();
    doc1.setTitle('Contract Document');
    doc1.setAuthor('PDFLince Lynx');
    for (let i = 1; i <= 3; i++) {
      const page = doc1.addPage([400, 600]);
      page.drawText(`Page ${i}`, { x: 50, y: 550, size: 24, color: rgb(0, 0, 0) });
    }
    testPdfPath1 = path.join(tempDir, 'sample1.pdf');
    await fs.writeFile(testPdfPath1, await doc1.save());

    // Create Sample PDF 2 (2 pages)
    const doc2 = await PDFDocument.create();
    doc2.setTitle('Appendix');
    for (let i = 1; i <= 2; i++) {
      const page = doc2.addPage([400, 600]);
      page.drawText(`Appendix Page ${i}`, { x: 50, y: 550, size: 24, color: rgb(0, 0, 0) });
    }
    testPdfPath2 = path.join(tempDir, 'sample2.pdf');
    await fs.writeFile(testPdfPath2, await doc2.save());

    // Create Sample PNG image (1x1 pixel)
    testImagePath = path.join(tempDir, 'pixel.png');
    const pngBuffer = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082', 'hex');
    await fs.writeFile(testImagePath, pngBuffer);
  });

  afterAll(async () => {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup error
    }
  });

  describe('Page Range Parser', () => {
    it('parses range strings correctly', () => {
      expect(parseAndValidatePageNumbers('1-3, 5', 5)).toEqual([1, 2, 3, 5]);
      expect(parseAndValidatePageNumbers('2', 5)).toEqual([2]);
    });

    it('handles "all" and undefined', () => {
      expect(parseAndValidatePageNumbers('all', 3)).toEqual([1, 2, 3]);
      expect(parseAndValidatePageNumbers(undefined, 3)).toEqual([1, 2, 3]);
    });

    it('parses arrays of numbers', () => {
      expect(parseAndValidatePageNumbers([1, 3], 3)).toEqual([1, 3]);
    });

    it('throws error for out-of-bounds pages', () => {
      expect(() => parseAndValidatePageNumbers('4', 3)).toThrow();
      expect(() => parseAndValidatePageNumbers('0', 3)).toThrow();
    });
  });

  describe('pdflince_inspect', () => {
    it('inspects page count, dimensions, and metadata', async () => {
      const res = await handleInspect({ filePath: testPdfPath1 });
      const parsed = JSON.parse(res.content[0].text);

      expect(parsed.totalPages).toBe(3);
      expect(parsed.metadata.title).toBe('Contract Document');
      expect(parsed.metadata.author).toBe('PDFLince Lynx');
      expect(parsed.pagesSummary.length).toBe(3);
      expect(parsed.pagesSummary[0].width).toBe(400);
      expect(parsed.pagesSummary[0].height).toBe(600);
    });
  });

  describe('pdflince_merge', () => {
    it('merges multiple PDFs into one document', async () => {
      const outputPath = path.join(tempDir, 'merged.pdf');
      const res = await handleMerge({
        filePaths: [testPdfPath1, testPdfPath2],
        outputPath,
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.totalPages).toBe(5);

      const savedBytes = await fs.readFile(outputPath);
      const verifyCount = await getPDFPageCount(savedBytes);
      expect(verifyCount).toBe(5);

      const mergedDoc = await PDFDocument.load(savedBytes, { updateMetadata: false });
      expect(mergedDoc.getProducer()).toBe('PDFLince (https://pdflince.com)');
      expect(mergedDoc.getCreator()).toBe('PDFLince');
    });
  });

  describe('pdflince_split', () => {
    it('splits a PDF into 1-page chunks and optional ZIP archive', async () => {
      const splitDir = path.join(tempDir, 'split-output');
      const res = await handleSplit({
        filePath: testPdfPath1,
        outputDirectory: splitDir,
        pagesPerFile: 1,
        bundleAsZip: true,
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.generatedFiles.length).toBe(3);
      expect(parsed.zipArchive).toBeDefined();

      for (const item of parsed.generatedFiles) {
        const fileBytes = await fs.readFile(item.path);
        const count = await getPDFPageCount(fileBytes);
        expect(count).toBe(1);
      }

      const zipStat = await fs.stat(parsed.zipArchive.path);
      expect(zipStat.size).toBeGreaterThan(0);
    });
  });

  describe('pdflince_extract', () => {
    it('extracts specific pages into a new PDF', async () => {
      const outputPath = path.join(tempDir, 'extracted.pdf');
      const res = await handleExtract({
        filePath: testPdfPath1,
        outputPath,
        pages: '1, 3',
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.extractedPages).toEqual([1, 3]);

      const fileBytes = await fs.readFile(outputPath);
      const count = await getPDFPageCount(fileBytes);
      expect(count).toBe(2);
    });
  });

  describe('pdflince_rotate', () => {
    it('rotates selected pages', async () => {
      const outputPath = path.join(tempDir, 'rotated.pdf');
      const res = await handleRotate({
        filePath: testPdfPath1,
        outputPath,
        rotationDegrees: 90,
        pages: '2',
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.degrees).toBe(90);

      const fileBytes = await fs.readFile(outputPath);
      const doc = await PDFDocument.load(fileBytes);
      expect(doc.getPage(1).getRotation().angle).toBe(90);
      expect(doc.getPage(0).getRotation().angle).toBe(0);
    });
  });

  describe('pdflince_crop', () => {
    it('crops margins from pages', async () => {
      const outputPath = path.join(tempDir, 'cropped.pdf');
      const res = await handleCrop({
        filePath: testPdfPath1,
        outputPath,
        margins: { top: 20, bottom: 20, left: 15, right: 15 },
        pages: '1',
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);

      const fileBytes = await fs.readFile(outputPath);
      const count = await getPDFPageCount(fileBytes);
      expect(count).toBe(3);
    });
  });

  describe('pdflince_compress', () => {
    it('compresses a PDF file using UI presets and returns metrics', async () => {
      const outputPath = path.join(tempDir, 'compressed.pdf');
      const res = await handleCompress({
        filePath: testPdfPath1,
        outputPath,
        compressionLevel: 'high',
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.compressedSizeBytes).toBeGreaterThan(0);
      expect(parsed.appliedOptions.compressionLevel).toBe('high');
      expect(parsed.appliedOptions.downscaleImages).toBe(true);
      expect(parsed.appliedOptions.downscaleImagesDpi).toBe(72);
      expect(parsed.appliedOptions.stripAnnotations).toBe(true);
      expect(parsed.appliedOptions.preserveMetadata).toBe(false);
      expect(parsed.processingTimeMs).toBeGreaterThanOrEqual(0);

      const fileBytes = await fs.readFile(outputPath);
      const count = await getPDFPageCount(fileBytes);
      expect(count).toBe(3);
    });
  });

  describe('pdflince_reorder', () => {
    it('reorders pages according to specified array', async () => {
      const outputPath = path.join(tempDir, 'reordered.pdf');
      const res = await handleReorder({
        filePath: testPdfPath1,
        outputPath,
        pageOrder: [3, 1, 2],
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.newSequence).toEqual([3, 1, 2]);

      const fileBytes = await fs.readFile(outputPath);
      const count = await getPDFPageCount(fileBytes);
      expect(count).toBe(3);
    });
  });

  describe('pdflince_pdf_to_images', () => {
    it('renders selected PDF pages into PNG images and bundles a ZIP', async () => {
      const imagesDir = path.join(tempDir, 'pdf-to-images-output');
      const res = await handlePdfToImages({
        filePath: testPdfPath1,
        outputDirectory: imagesDir,
        format: 'png',
        dpi: 72,
        pages: '1-2',
        bundleAsZip: true,
        outputPrefix: 'contract_render',
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.renderedPagesCount).toBe(2);
      expect(parsed.generatedImages.length).toBe(2);
      expect(parsed.generatedImages[0].width).toBe(400);
      expect(parsed.generatedImages[0].height).toBe(600);
      expect(parsed.zipArchive).toBeDefined();

      for (const img of parsed.generatedImages) {
        const stat = await fs.stat(img.path);
        expect(stat.size).toBeGreaterThan(0);
      }
    });
  });

  describe('pdflince_images_to_pdf', () => {
    it('converts an image into a formatted PDF', async () => {
      const outputPath = path.join(tempDir, 'image-doc.pdf');
      const res = await handleImagesToPdf({
        imagePaths: [testImagePath],
        outputPath,
        imageFit: 'contain',
        pageSize: 'a4',
      });

      const parsed = JSON.parse(res.content[0].text);
      expect(parsed.success).toBe(true);
      expect(parsed.totalPages).toBe(1);

      const fileBytes = await fs.readFile(outputPath);
      const count = await getPDFPageCount(fileBytes);
      expect(count).toBe(1);

      const doc = await PDFDocument.load(fileBytes, { updateMetadata: false });
      expect(doc.getProducer()).toBe('PDFLince (https://pdflince.com)');
    });

    it('rejects unsupported image formats with a descriptive error', async () => {
      const outputPath = path.join(tempDir, 'invalid-image-doc.pdf');
      await expect(
        handleImagesToPdf({
          imagePaths: [testPdfPath1],
          outputPath,
        })
      ).rejects.toThrow('Unsupported image format');
    });
  });
});
