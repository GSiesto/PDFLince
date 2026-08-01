import { test, expect } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getTestPdfPath = (workerIndex: number) => path.join(__dirname, `smoke-test-${workerIndex}.pdf`);

// Setup: Create a real PDF file for testing per worker
test.beforeAll(async ({}, testInfo) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('This is a test PDF for PDFLince smoke tests.', {
        x: 50,
        y: 700,
        size: 24,
    });
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(getTestPdfPath(testInfo.workerIndex), pdfBytes);
});

// Teardown: Remove the test PDF per worker
test.afterAll(({}, testInfo) => {
    const testPdfPath = getTestPdfPath(testInfo.workerIndex);
    if (fs.existsSync(testPdfPath)) {
        try {
            fs.unlinkSync(testPdfPath);
        } catch (e) {
            console.warn('Failed to delete test file', e);
        }
    }
});


test.describe('PDFLince Smoke Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Default locale is English, served at root
        await page.goto('/');
    });

    test('Homepage loads correctly', async ({ page }) => {
        await expect(page).toHaveTitle(/PDFLince/i);
        // Check for main headline or key text
        await expect(page.locator('h1')).toBeVisible();
        // "Local processing" is in the tagline/badges
        await expect(page.getByText(/Local processing/i).first()).toBeVisible();
    });

    test('Can upload a PDF and see processing options', async ({ page }, testInfo) => {
        // Find file input (it might be hidden for styling)
        const fileInput = page.locator('input[type="file"]');

        // Upload the generated PDF
        const testPdfPath = getTestPdfPath(testInfo.workerIndex);
        await fileInput.setInputFiles(testPdfPath);

        // Verify file appears in the list
        await expect(page.getByText(path.basename(testPdfPath))).toBeVisible();

        // Verify default mode (Merge PDFs) tab is active or visible
        await expect(page.getByRole('button', { name: 'Merge PDFs', exact: true })).toBeVisible();
        await expect(page.getByText(/Choose an operation/i)).toBeVisible();
    });

    // Note: Full processing test requires checking downloads, which is more complex.
    // This smoke test verifies the critical path: Load -> Upload -> UI Update.
});
