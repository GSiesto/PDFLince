import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, 'crop-test.pdf');

test.beforeAll(async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 600]);
    page.drawText('Crop Test Page', {
        x: 40,
        y: 540,
        size: 20,
    });

    fs.writeFileSync(testFile, await pdfDoc.save());
});

test.afterAll(() => {
    if (fs.existsSync(testFile)) {
        try {
            fs.unlinkSync(testFile);
        } catch (e) { }
    }
});

test('PDF Manual Crop Workflow', async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto('/recortar', { timeout: 60_000 });

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    const thumbnailCards = page.locator('.grid.grid-cols-2.sm\\:grid-cols-3.md\\:grid-cols-4.lg\\:grid-cols-5 > div');
    await expect(thumbnailCards.first()).toBeVisible({ timeout: 20_000 });
    await thumbnailCards.first().click();

    await page.locator('label').filter({ hasText: 'Seleccion manual' }).click();
    await expect(page.getByText('Seleccion manual de recorte')).toBeVisible({ timeout: 30_000 });

    const manualPreview = page.locator('div.touch-none.select-none').last();
    await expect(manualPreview).toBeVisible({ timeout: 30_000 });

    const bounds = await manualPreview.boundingBox();
    expect(bounds).not.toBeNull();

    if (!bounds) {
        throw new Error('Manual crop preview bounds were not available');
    }

    await page.mouse.move(bounds.x + bounds.width * 0.25, bounds.y + bounds.height * 0.25);
    await page.mouse.down();
    await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height * 0.75, { steps: 12 });
    await page.mouse.up();

    const processButton = page.getByRole('button', { name: /^Recortar \d+ pagina/ });
    await expect(processButton).toBeEnabled({ timeout: 20_000 });

    const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
    await processButton.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/recortado_PDFLince\.pdf$/);

    const downloadPath = path.join(__dirname, 'downloaded-cropped.pdf');
    await download.saveAs(downloadPath);

    const pdfBuffer = fs.readFileSync(downloadPath);
    const croppedPdf = await PDFDocument.load(pdfBuffer);
    const croppedPage = croppedPdf.getPage(0);
    const mediaBox = croppedPage.getMediaBox();

    expect(croppedPdf.getPageCount()).toBe(1);
    expect(mediaBox.width).toBeLessThan(400);
    expect(mediaBox.width).toBeGreaterThan(250);
    expect(mediaBox.height).toBeLessThan(600);
    expect(mediaBox.height).toBeGreaterThan(350);

    fs.unlinkSync(downloadPath);
});
