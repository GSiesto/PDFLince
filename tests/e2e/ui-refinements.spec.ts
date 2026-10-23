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

        // 1. Navigate to English compress page
        await page.goto('/compress');

        // 2. Upload 2 files
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles([testPdfPath1, testPdfPath2]);

        // 3. Verify files are listed (use getByTitle to avoid strict mode)
        await expect(page.getByTitle('ui-test-1.pdf')).toBeVisible();
        await expect(page.getByTitle('ui-test-2.pdf')).toBeVisible();

        // 4. Verify "Clear all" button is visible
        // Two buttons share this label (file list + results); grab the first one
        const clearAllButton = page.getByRole('button', { name: /Clear all/i }).first();
        await expect(clearAllButton).toBeVisible();

        // 5. Process 2 files — click the process button
        const processButton = page.getByRole('button', { name: /Process 2 files/i });
        await processButton.click();

        // 6. Wait for compression to finish — look for "Total Savings"
        await expect(page.getByText('Total Savings')).toBeVisible({ timeout: 60_000 });

        // 7. Verify Total Savings summary card elements
        // The card shows "X files optimized" 
        await expect(page.getByText(/files optimized/i)).toBeVisible();
        // And "saved in total"
        await expect(page.getByText(/saved in total/i)).toBeVisible();

        // 8. Close the ProcessingStatusDialog modal (it overlays the page)
        // Press Escape to dismiss — avoids strict mode with multiple Close buttons
        await page.keyboard.press('Escape');
        
        // Wait for the dialog to fully unmount to avoid intercepting clicks
        await expect(page.getByRole('dialog')).not.toBeVisible();

        // 9. Clear All — reset the file list
        await clearAllButton.click();

        // 9. Verify list is empty
        await expect(page.getByTitle('ui-test-1.pdf')).not.toBeVisible();
        // Check for empty state (upload prompt)
        await expect(page.getByText(/Click to select/i)).toBeVisible();
    });
});
