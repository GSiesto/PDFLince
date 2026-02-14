import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We'll use the existing logo as a test image
const logoPath = path.resolve(__dirname, '../../public/images/stickers/pdflince_logo_processed.webp');

test('Images to PDF Workflow', async ({ page }) => {
    test.setTimeout(120_000);

    // 1. Visit Images to PDF Page directly
    await page.goto('/crear-pdf-desde-imagenes', { timeout: 60_000 });

    // 2. Verify we are on the correct tool
    await expect(page.getByRole('heading', { name: 'Reúne JPG o PNG en un PDF profesional' })).toBeVisible();

    // 3. Upload Images (Multiple copies for merging)
    const fileInput = page.locator('input[type="file"]');
    // Upload 2 images
    await fileInput.setInputFiles([logoPath, logoPath]);

    // 4. Verify Files Appear
    await expect(page.getByText('pdflince_logo_processed.webp').first()).toBeVisible();

    // 5. Configure Options (Default is A4, Contain, etc.)
    await expect(page.getByText('Diseño de página')).toBeVisible();

    // 6. Process
    const downloadPromise = page.waitForEvent('download');
    // Button text for 2 images is "Crear PDF con 2 imágenes"
    await page.getByRole('button', { name: 'Crear PDF con 2 imágenes' }).click();
    const download = await downloadPromise;

    // 7. Verification
    expect(download.suggestedFilename()).toMatch(/imagenes_a_pdf_PDFLince\.pdf$/);

    const downloadPath = path.join(__dirname, 'downloaded-images-to-pdf.pdf');
    await download.saveAs(downloadPath);

    // Verify PDF has 2 pages
    const pdfBuffer = fs.readFileSync(downloadPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    expect(pdfDoc.getPageCount()).toBe(2);

    // Cleanup download
    fs.unlinkSync(downloadPath);
});
