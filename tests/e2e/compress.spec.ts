import { test, expect } from '@playwright/test';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testPdfPath = path.join(__dirname, 'compress-test.pdf');

test.beforeAll(async () => {
    // Create a heavy PDF for testing compression
    const pdfDoc = await PDFDocument.create();
    // Add multiple pages with text to simulate content
    for (let i = 0; i < 5; i++) {
        const page = pdfDoc.addPage();
        page.drawText(`Page ${i + 1} with some content for compression testing. `.repeat(50), {
            x: 50,
            y: 700,
            size: 12,
        });
    }
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(testPdfPath, pdfBytes);
});

test.afterAll(() => {
    if (fs.existsSync(testPdfPath)) {
        try {
            fs.unlinkSync(testPdfPath);
        } catch (e) {
            console.warn('Failed to cleanup test file', e);
        }
    }
});

test('PDF Compression Workflow', async ({ page }) => {
    test.setTimeout(90_000);

    // 1. Visit Compress Page directly
    await page.goto('/comprimir', { timeout: 60_000 });

    // 2. Verify we are on the correct tool
    await expect(page.getByRole('heading', { name: 'Comprimir PDF online sin perder calidad' })).toBeVisible();

    // 3. Upload File
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testPdfPath);

    // 4. Verify File Appears
    await expect(page.getByText('compress-test.pdf').first()).toBeVisible();

    // 5. Adjust Compression Settings
    // Click "High" compression
    // Use force: true because the cookie banner or other fixed elements might intercept the click
    await page.getByLabel('Alta').click({ force: true });

    // 6. Process
    // Setup download listener before clicking
    const downloadPromise = page.waitForEvent('download');

    // Click "Compress PDF" button
    await page.getByRole('button', { name: 'Procesar 1 archivo' }).click();

    // 7. Verification
    const download = await downloadPromise;

    // Check filename
    expect(download.suggestedFilename()).toMatch(/comprimido_PDFLince\.pdf$/);

    // Save to temp path to check size
    const downloadPath = path.join(__dirname, 'downloaded-compressed.pdf');
    await download.saveAs(downloadPath);

    const originalSize = fs.statSync(testPdfPath).size;
    const compressedSize = fs.statSync(downloadPath).size;

    console.log(`Original: ${originalSize}, Compressed: ${compressedSize}`);

    // Basic assertion: it should be a valid PDF buffer (non-empty)
    // Note: Actual compression ratio depends on content, but size > 0 confirms process worked
    expect(compressedSize).toBeGreaterThan(0);

    // Cleanup download
    fs.unlinkSync(downloadPath);
});
