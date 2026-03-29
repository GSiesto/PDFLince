import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, degrees } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, 'rotate-test.pdf');

test.beforeAll(async () => {
    const pdfDoc = await PDFDocument.create();

    for (let i = 1; i <= 3; i++) {
        const pdfPage = pdfDoc.addPage([400, 600]);
        pdfPage.drawText(`Rotate Test Page ${i}`, {
            x: 40,
            y: 540,
            size: 20,
        });
        pdfPage.setRotation(degrees(0));
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

test('PDF Rotate Workflow', async ({ page }) => {
    test.setTimeout(120_000);

    await page.goto('/girar', { timeout: 60_000 });

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    const thumbnailCards = page.locator('.grid.grid-cols-2.sm\\:grid-cols-3.md\\:grid-cols-4.lg\\:grid-cols-5 > div');
    await expect(thumbnailCards.first()).toBeVisible({ timeout: 20_000 });
    await expect(thumbnailCards).toHaveCount(3);

    await page.getByRole('button', { name: 'Girar 180 grados' }).click();

    const pageOneCard = thumbnailCards.nth(0);
    const pageTwoCard = thumbnailCards.nth(1);
    const pageOneThumbnail = pageOneCard.locator('img').first();
    const pageTwoThumbnail = pageTwoCard.locator('img').first();

    await pageOneCard.click();
    await expect(pageOneThumbnail).toHaveAttribute('style', /rotate\(180deg\)/);

    await pageTwoCard.click();
    await expect(pageOneThumbnail).toHaveAttribute('style', /rotate\(180deg\)/);
    await expect(pageTwoThumbnail).toHaveAttribute('style', /rotate\(180deg\)/);

    const processButton = page.getByRole('button', { name: /Girar 2/ });
    await expect(processButton).toBeEnabled({ timeout: 20_000 });

    const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
    await processButton.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/rotado_PDFLince\.pdf$/);

    const downloadPath = path.join(__dirname, 'downloaded-rotated.pdf');
    await download.saveAs(downloadPath);

    const pdfBuffer = fs.readFileSync(downloadPath);
    const rotatedPdf = await PDFDocument.load(pdfBuffer);

    expect(rotatedPdf.getPageCount()).toBe(3);
    expect(rotatedPdf.getPage(0).getRotation().angle).toBe(180);
    expect(rotatedPdf.getPage(1).getRotation().angle).toBe(180);
    expect(rotatedPdf.getPage(2).getRotation().angle).toBe(0);

    fs.unlinkSync(downloadPath);
});
