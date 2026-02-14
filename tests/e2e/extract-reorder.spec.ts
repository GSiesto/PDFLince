import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, 'extract-reorder-test.pdf');

test.beforeAll(async () => {
    // Create a 5-page PDF
    const pdfDoc = await PDFDocument.create();
    for (let i = 1; i <= 5; i++) {
        pdfDoc.addPage().drawText(`Page ${i}`);
    }
    fs.writeFileSync(testFile, await pdfDoc.save());
});

test.afterAll(() => {
    if (fs.existsSync(testFile)) {
        try {
            fs.unlinkSync(testFile);
        } catch (e) { }
    }
});

test('PDF Page Extraction Workflow', async ({ page }) => {
    test.setTimeout(120_000);

    // 1. Visit Extract Page
    await page.goto('/extraer', { timeout: 60_000 });

    // 2. Upload File
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    // 3. Selection
    // Wait for the thumbnails to load. Label from dictionary is "Pág. X"
    await expect(page.getByText('Pág. 1').first()).toBeVisible({ timeout: 20_000 });

    // Click on page 1 and page 3
    await page.getByText('Pág. 1').first().click();
    await page.getByText('Pág. 3').first().click();

    // Wait for the process button to be enabled (state update might take a moment)
    const processButton = page.getByRole('button', { name: 'Extraer 2 páginas' });
    await expect(processButton).toBeEnabled({ timeout: 20_000 });

    // 4. Process
    const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
    await processButton.click();
    const download = await downloadPromise;

    // 5. Verification
    expect(download.suggestedFilename()).toMatch(/extraido_PDFLince\.pdf$/);
    const downloadPath = path.join(__dirname, 'downloaded-extracted.pdf');
    await download.saveAs(downloadPath);

    const pdfBuffer = fs.readFileSync(downloadPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    expect(pdfDoc.getPageCount()).toBe(2);

    fs.unlinkSync(downloadPath);
});

test('PDF Page Reordering Workflow', async ({ page }) => {
    test.setTimeout(120_000);

    // 1. Visit Reorder Page
    await page.goto('/reordenar', { timeout: 60_000 });

    // 2. Upload File
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    // 3. Verify Page Selector / Orderer Loaded. Label is "Original: Pág. 1"
    const firstPage = page.getByText('Original: Pág. 1').first();
    await expect(firstPage).toBeVisible({ timeout: 30_000 });

    // Wait for the process button to be enabled (thumbnails might take a moment)
    const processButton = page.getByRole('button', { name: 'Guardar nueva ordenación' });
    await expect(processButton).toBeEnabled({ timeout: 30_000 });

    // 4. Process
    const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
    await processButton.click();
    const download = await downloadPromise;

    // 5. Verification
    expect(download.suggestedFilename()).toMatch(/reordenado_PDFLince\.pdf$/);

    // Clean up
    const downloadPath = path.join(__dirname, 'downloaded-reordered.pdf');
    await download.saveAs(downloadPath);

    const pdfBuffer = fs.readFileSync(downloadPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    expect(pdfDoc.getPageCount()).toBe(5);

    fs.unlinkSync(downloadPath);
});
