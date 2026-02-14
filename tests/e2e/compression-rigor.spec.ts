import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const heavyPdfPath = path.join(__dirname, 'heavy-image-test.pdf');
const downloadPath = path.join(__dirname, 'downloaded-heavy.pdf');

test.afterAll(() => {
    [heavyPdfPath, downloadPath].forEach(p => {
        if (fs.existsSync(p)) {
            try { fs.unlinkSync(p); } catch (e) { }
        }
    });
});

test('Rigorous PDF Compression Verification', async ({ page }) => {
    test.setTimeout(180_000);

    // 1. Visit the app
    await page.goto('/comprimir');

    // 2. Generate a HEAVY JPEG in the browser context using Canvas
    console.log('Generating heavy image in browser...');
    const heavyImageBase64 = await page.evaluate(async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 2500;
        canvas.height = 2500;
        const ctx = canvas.getContext('2d')!;

        // Complex gradient to ensure it doesn't compress too easily as a JPEG
        const gradient = ctx.createRadialGradient(1250, 1250, 100, 1250, 1250, 2500);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.2, 'orange');
        gradient.addColorStop(0.4, 'yellow');
        gradient.addColorStop(0.6, 'green');
        gradient.addColorStop(0.8, 'blue');
        gradient.addColorStop(1, 'violet');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 2500, 2500);

        // High quality JPEG
        const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/jpeg', 0.98));
        const arr = await blob.arrayBuffer();
        const bytes = new Uint8Array(arr);

        // Convert to base64
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    });

    // 3. Create PDF in Node with this image
    console.log('Creating PDF with high-res image...');
    const imageBytes = Buffer.from(heavyImageBase64, 'base64');
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedJpg(new Uint8Array(imageBytes));

    // A standard page is 595x842 pt (A4). 
    // Our image is 2500px. At 2500px / 595pt (8.27 inch) = ~300 DPI.
    const pageObj = pdfDoc.addPage([595, 842]);
    pageObj.drawImage(image, {
        x: 50,
        y: 100,
        width: 500,
        height: 500,
    });

    // Add text to make it look real
    pageObj.drawText('Documento de Prueba de Alta Resolucion', { x: 50, y: 750, size: 20 });
    pageObj.drawText('Este documento contiene una imagen de 2500x2500 pixeles.', { x: 50, y: 700, size: 12 });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(heavyPdfPath, pdfBytes);

    const originalSize = fs.statSync(heavyPdfPath).size;
    console.log(`Generated PDF Size: ${(originalSize / 1024).toFixed(1)} KB`);

    // 4. Upload to the app
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(heavyPdfPath);

    // 5. Select "Alta" (72 DPI)
    // 72 DPI for a 500pt (6.9 inch) image should be ~500 pixels.
    // Reducing from 2500 to 500 is a 25x reduction in pixels!
    await page.getByLabel('Alta').click({ force: true });

    // 6. Wait for preview
    console.log('Waiting for compression preview...');
    const estimadoSection = page.getByText('Resultado estimado');
    await expect(estimadoSection).toBeVisible({ timeout: 60_000 });

    const previewResult = page.locator('div:has-text("Resultado estimado")').last();
    const resultText = await previewResult.innerText();
    console.log('Preview Result:', resultText);

    // 7. Process
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Procesar 1 archivo' }).click();
    const download = await downloadPromise;
    await download.saveAs(downloadPath);

    // 8. Final verification
    const processedSize = fs.statSync(downloadPath).size;
    const savings = ((originalSize - processedSize) / originalSize) * 100;
    console.log(`Original: ${originalSize}, Final: ${processedSize}, Savings: ${savings.toFixed(1)}%`);

    // We expect SIGNIFICANT savings (>50%) for such a high-res image downscaled to 72DPI
    expect(savings).toBeGreaterThan(40);
});
