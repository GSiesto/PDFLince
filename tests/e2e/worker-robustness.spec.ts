import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testPdfPath = path.join(__dirname, 'worker-robustness.pdf');

test.beforeAll(async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('Worker Robustness Test', { x: 50, y: 700, size: 24 });
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(testPdfPath, pdfBytes);
});

test.afterAll(() => {
    if (fs.existsSync(testPdfPath)) {
        try { fs.unlinkSync(testPdfPath); } catch { /* ignore */ }
    }
});

test.describe('Worker Robustness & Rendering', () => {
    test('should process PDF-to-Images without worker crashes', async ({ page }) => {
        // 1. Collect console errors throughout the test
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                const text = msg.text();
                if (text.includes('ERR_BLOCKED_BY_CLIENT')) return;
                if (text.includes('favicon')) return;
                consoleErrors.push(text);
            }
        });

        // 2. Navigate to PDF-to-Images page (route group (es) is invisible in URL)
        await page.goto('/convertir-pdf-a-imagenes');
        await expect(page.locator('h1')).toBeVisible();

        // 3. Upload a test PDF
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(testPdfPath);

        // 4. Wait for the file to be accepted and the process button to appear
        //    Button text for pdfToImages single file: "Exportar imágenes"
        const processBtn = page.getByRole('button', { name: /Exportar imágenes/i });
        await expect(processBtn).toBeVisible({ timeout: 10000 });

        // 5. Click process
        await processBtn.click();

        // 6. Wait for the success dialog (or error dialog) to appear
        //    Success dialog shows "Descargar de nuevo" button
        //    Error dialog shows "Reintentar" button
        //    We wait for either, with generous timeout for worker processing
        const successIndicator = page.getByRole('button', { name: /Descargar de nuevo/i });
        const errorIndicator = page.getByText(/error/i).first();

        await expect(successIndicator.or(errorIndicator)).toBeVisible({ timeout: 30000 });

        // 7. Assert NO critical worker errors occurred
        const criticalErrors = consoleErrors.filter(
            (err) =>
                err.includes('Cannot read properties of undefined') ||
                err.includes('window is not defined') ||
                err.includes('document is not defined') ||
                err.includes('[WorkerClient] Error')
        );

        expect(
            criticalErrors,
            `Critical worker errors detected:\n${criticalErrors.join('\n')}`
        ).toHaveLength(0);

        // 8. Verify success (download button visible means processing completed)
        await expect(successIndicator).toBeVisible();
    });
});
