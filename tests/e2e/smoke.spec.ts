import { test, expect } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testPdfPath = path.join(__dirname, 'smoke-test.pdf');

// Setup: Create a real PDF file for testing
test.beforeAll(async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText('This is a test PDF for PDFLince smoke tests.', {
        x: 50,
        y: 700,
        size: 24,
    });
    const pdfBytes = await pdfDoc.save();
    // Ensure directory exists if needed, though this runs in existing tests/e2e
    fs.writeFileSync(testPdfPath, pdfBytes);
});

// Teardown: Remove the test PDF
test.afterAll(() => {
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
        // Default locale is Spanish, served at root
        await page.goto('/');
    });

    test('Homepage loads correctly', async ({ page }) => {
        await expect(page).toHaveTitle(/PDFLince/i);
        // Check for main headline or key text
        await expect(page.locator('h1')).toBeVisible();
        // "Procesamiento local" is in the tagline/badges
        await expect(page.getByText('Procesamiento local').first()).toBeVisible();
    });

    test('Can upload a PDF and see processing options', async ({ page }) => {
        // Find file input (it might be hidden for styling)
        const fileInput = page.locator('input[type="file"]');

        // Upload the generated PDF
        await fileInput.setInputFiles(testPdfPath);

        // Verify file appears in the list
        await expect(page.getByText('smoke-test.pdf')).toBeVisible();

        // Verify default mode (Unir PDFs) tab is active or visible
        await expect(page.getByRole('button', { name: 'Unir PDFs', exact: true })).toBeVisible();
        await expect(page.getByText(/Selecciona una operaci/i)).toBeVisible();
    });

    // Note: Full processing test requires checking downloads, which is more complex.
    // This smoke test verifies the critical path: Load -> Upload -> UI Update.
});
