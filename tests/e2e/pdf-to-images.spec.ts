import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFile = path.join(__dirname, 'pdf-to-images-test.pdf');

test.beforeAll(async () => {
    // Create a 2-page PDF
    const pdfDoc = await PDFDocument.create();
    pdfDoc.addPage().drawText('Page 1');
    pdfDoc.addPage().drawText('Page 2');
    fs.writeFileSync(testFile, await pdfDoc.save());
});

test.afterAll(() => {
    if (fs.existsSync(testFile)) {
        try {
            fs.unlinkSync(testFile);
        } catch (e) {
            console.warn('Failed to delete test file', e);
        }
    }
});

test('PDF to Images Workflow', async ({ page }) => {
    test.setTimeout(120_000);

    // 1. Visit PDF to Images Page directly
    await page.goto('/convertir-pdf-a-imagenes', { timeout: 60_000 });

    // 2. Verify we are on the correct tool
    await expect(page.getByRole('heading', { name: 'Convierte páginas PDF en PNG o JPEG' })).toBeVisible();

    // 3. Upload File
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testFile);

    // 4. Verify File Appears
    await expect(page.getByText('pdf-to-images-test.pdf').first()).toBeVisible();

    // 5. Configure Options (Default is PNG + ZIP)
    // We can verify the toggle text or state if needed. 
    // In our component, OptionToggle uses a label.
    await expect(page.getByText('Agrupar imágenes en un ZIP')).toBeVisible();

    // 6. Process
    const downloadPromise = page.waitForEvent('download');
    // Using handle with specific name from dictionary
    await page.getByRole('button', { name: 'Exportar imágenes' }).click();
    const download = await downloadPromise;

    // 7. Verification
    expect(download.suggestedFilename()).toMatch(/\.zip$/);

    const downloadPath = path.join(__dirname, 'downloaded-images.zip');
    await download.saveAs(downloadPath);

    // Verify ZIP contents (should have 2 images)
    const zipData = fs.readFileSync(downloadPath);
    const zip = await JSZip.loadAsync(zipData);
    const filesInZip = Object.keys(zip.files).filter(name => !zip.files[name].dir);

    console.log('Files in zip:', filesInZip);
    // Should have 2 images (one per page)
    expect(filesInZip.length).toBe(2);
    expect(filesInZip[0].toLowerCase()).toMatch(/\.png$/);

    // Cleanup download
    fs.unlinkSync(downloadPath);
});
