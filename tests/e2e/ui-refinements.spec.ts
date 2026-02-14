import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

const testPdfPath1 = path.join(process.cwd(), 'ui-test-1.pdf');
const testPdfPath2 = path.join(process.cwd(), 'ui-test-2.pdf');

test.beforeAll(async () => {
    // Create first PDF
    const pdfDoc1 = await PDFDocument.create();
    const page1 = pdfDoc1.addPage();
    page1.drawText('Test File 1 Content');
    fs.writeFileSync(testPdfPath1, await pdfDoc1.save());

    // Create second PDF
    const pdfDoc2 = await PDFDocument.create();
    const page2 = pdfDoc2.addPage();
    page2.drawText('Test File 2 Content');
    fs.writeFileSync(testPdfPath2, await pdfDoc2.save());
});

test.afterAll(() => {
    if (fs.existsSync(testPdfPath1)) fs.unlinkSync(testPdfPath1);
    if (fs.existsSync(testPdfPath2)) fs.unlinkSync(testPdfPath2);
});

test.describe('UI Refinements', () => {
    test('should show Total Savings summary and support Clear All', async ({ page }) => {
        test.setTimeout(120_000);

        // 1. Navigate to Spanish compress page (matches other working tests)
        await page.goto('/comprimir');

        // 2. Upload 2 files
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles([testPdfPath1, testPdfPath2]);

        // 3. Verify files are listed (use getByTitle to avoid strict mode)
        await expect(page.getByTitle('ui-test-1.pdf')).toBeVisible();
        await expect(page.getByTitle('ui-test-2.pdf')).toBeVisible();

        // 4. Verify "Limpiar todo" (Clear All) button is visible
        // Two buttons share this label (file list + results); grab the first one
        const clearAllButton = page.getByRole('button', { name: /Limpiar todo/i }).first();
        await expect(clearAllButton).toBeVisible();

        // 5. Process 2 files — click the process button
        const processButton = page.getByRole('button', { name: /Procesar 2 archivos/i });
        await processButton.click();

        // 6. Wait for compression to finish — look for "Ahorro total" (Total Savings)
        await expect(page.getByText('Ahorro total')).toBeVisible({ timeout: 60_000 });

        // 7. Verify Total Savings summary card elements
        // The card shows "X archivos optimizados" 
        await expect(page.getByText(/archivos optimizados/i)).toBeVisible();
        // And "ahorrados en total"
        await expect(page.getByText(/ahorrados en total/i)).toBeVisible();

        // 8. Close the ProcessingStatusDialog modal (it overlays the page)
        // Press Escape to dismiss — avoids strict mode with 2 "Cerrar" buttons
        await page.keyboard.press('Escape');

        // 9. Clear All — reset the file list
        await clearAllButton.click();

        // 9. Verify list is empty
        await expect(page.getByTitle('ui-test-1.pdf')).not.toBeVisible();
        // Check for empty state (upload prompt)
        await expect(page.getByText(/Haz clic para seleccionar/i)).toBeVisible();
    });
});
