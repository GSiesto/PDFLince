import { test, expect } from '@playwright/test';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFileA = path.join(__dirname, 'merge-a.pdf');
const testFileB = path.join(__dirname, 'merge-b.pdf');

test.beforeAll(async () => {
    // Create File A (1 page)
    const docA = await PDFDocument.create();
    docA.addPage().drawText('Document A - Page 1');
    fs.writeFileSync(testFileA, await docA.save());

    // Create File B (2 pages)
    const docB = await PDFDocument.create();
    docB.addPage().drawText('Document B - Page 1');
    docB.addPage().drawText('Document B - Page 2');
    fs.writeFileSync(testFileB, await docB.save());
});

test.afterAll(() => {
    if (fs.existsSync(testFileA)) fs.unlinkSync(testFileA);
    if (fs.existsSync(testFileB)) fs.unlinkSync(testFileB);
});

test('PDF Merge Workflow', async ({ page }) => {
    test.setTimeout(90_000);

    // 1. Visit Merge Page directly
    await page.goto('/unir', { timeout: 60_000 });

    // Verify correct operation
    await expect(page.getByRole('heading', { name: 'Unir PDF online rápido y seguro' })).toBeVisible();

    // 2. Upload Files
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([testFileA, testFileB]);

    // 3. Verify Files Appear
    await expect(page.getByText('merge-a.pdf')).toBeVisible();
    await expect(page.getByText('merge-b.pdf')).toBeVisible();

    // 4. Process
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Procesar 2 archivos' }).click();
    const download = await downloadPromise;

    // 5. Verification
    expect(download.suggestedFilename()).toMatch(/unido_PDFLince\.pdf$/);

    // Verify page count of result
    const downloadPath = path.join(__dirname, 'downloaded-merged.pdf');
    await download.saveAs(downloadPath);

    const mergedBuffer = fs.readFileSync(downloadPath);
    const mergedDoc = await PDFDocument.load(mergedBuffer);

    // Should have 1 + 2 = 3 pages
    expect(mergedDoc.getPageCount()).toBe(3);

    // Cleanup
    fs.unlinkSync(downloadPath);
});
