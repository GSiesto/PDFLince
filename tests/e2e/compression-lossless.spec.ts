import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const losslessPdfPath = path.join(__dirname, 'lossless-image-test.pdf');
const downloadPath = path.join(__dirname, 'downloaded-lossless.pdf');

test.afterAll(() => {
    [losslessPdfPath, downloadPath].forEach(p => {
        if (fs.existsSync(p)) {
            try { fs.unlinkSync(p); } catch (e) { }
        }
    });
});

test('Lossless (FlateDecode) PDF Compression Verification', async ({ page }) => {
    test.setTimeout(180_000);

    // 1. Visit the app
    await page.goto('/comprimir');

    // 2. Generate a high-res PNG in the browser
    console.log('Generating high-res PNG in browser...');
    const pngBase64 = await page.evaluate(async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1500;
        canvas.height = 1500;
        const ctx = canvas.getContext('2d')!;

        // Draw noise to make it hard to compress losslessly
        const imgData = ctx.createImageData(1500, 1500);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = Math.random() * 255;
            imgData.data[i + 1] = Math.random() * 255;
            imgData.data[i + 2] = Math.random() * 255;
            imgData.data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);

        const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/png'));
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

    // 3. Create PDF in Node with this PNG image (will use FlateDecode)
    console.log('Creating PDF with lossless image...');
    const imageBytes = Buffer.from(pngBase64, 'base64');
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedPng(new Uint8Array(imageBytes));

    const pageObj = pdfDoc.addPage([595, 842]);
    pageObj.drawImage(image, {
        x: 50,
        y: 100,
        width: 500,
        height: 500,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(losslessPdfPath, pdfBytes);

    const originalSize = fs.statSync(losslessPdfPath).size;
    console.log(`Generated Lossless PDF Size: ${(originalSize / 1024).toFixed(1)} KB`);

    // 4. Upload to the app
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(losslessPdfPath);

    // 5. Select "Alta" (72 DPI)
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

    // We expect DRASTIC savings (>70%) because conversion to JPEG and downscaling
    expect(savings).toBeGreaterThan(50);
});
