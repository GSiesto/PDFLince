import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, 'split-test.pdf');

test.beforeAll(async () => {
    // Create a 5-page PDF
    const pdfDoc = await PDFDocument.create();
    for (let i = 1; i <= 5; i++) {
        const page = pdfDoc.addPage();
        page.drawText(`Page ${i}`);
    }
    fs.writeFileSync(testFile, await pdfDoc.save());
});

test.afterAll(() => {
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
});

test('PDF Split Workflow', async ({ page }) => {
    test.setTimeout(90_000);

    // 1. Visit Split Page directly
    await page.goto('/dividir', { timeout: 60_000 });

    // 2. Verify we are on the correct tool
    await expect(page.getByRole('heading', { name: 'Dividir PDF por páginas o segmentos' })).toBeVisible();

    // 3. Upload File
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    // 4. Verify File Appears
    await expect(page.getByText('split-test.pdf')).toBeVisible();

    // 5. Configure Split Options
    // Default is "All pages to individual files" (Split mode)
    // Let's verify we can change pages per file to 2
    const pagesInput = page.getByLabel('Páginas por archivo');
    await pagesInput.fill('2');

    // 6. Process
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Procesar 1 archivo' }).click();
    const download = await downloadPromise;

    // 7. Verification
    // Split downloads individual PDFs. The first part should be named based on the original.
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);

    const downloadPath = path.join(__dirname, 'downloaded-split-part.pdf');
    await download.saveAs(downloadPath);

    // Verify the first part has the expected number of pages (2 pages per file)
    const partBuffer = fs.readFileSync(downloadPath);
    const partDoc = await PDFDocument.load(partBuffer);
    expect(partDoc.getPageCount()).toBe(2);

    // Cleanup
    fs.unlinkSync(downloadPath);
});
