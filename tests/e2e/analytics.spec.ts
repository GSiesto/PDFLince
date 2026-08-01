import { test, expect } from '@playwright/test';

test.describe('Google Analytics Opt-In', () => {
    test('Google Analytics scripts are not loaded by default before opt-in', async ({ page }) => {
        const gaRequests: string[] = [];
        page.on('request', request => {
            if (request.url().includes('googletagmanager.com')) {
                gaRequests.push(request.url());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Check that no request was made to Google Tag Manager
        expect(gaRequests.length).toBe(0);

        // Check window.gtag is undefined before consent
        const isGtagDefined = await page.evaluate(() => typeof (window as unknown as { gtag?: unknown }).gtag !== 'undefined');
        expect(isGtagDefined).toBe(false);

        // Check initial localStorage is null
        const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
        expect(consent).toBeNull();
    });

    test('Google Analytics gets enabled when opt-in consent is given', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Locate and click the accept button in the Cookie Banner
        const acceptButton = page.locator('button').filter({ hasText: /aceptar|accept/i }).first();
        await expect(acceptButton).toBeVisible();
        await acceptButton.click();

        // Verify cookie_consent is set to 'true' in localStorage
        const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
        expect(consent).toBe('true');

        // Verify that the GA script tag (#ga-loader) is dynamically inserted into the DOM
        await expect(page.locator('#ga-loader')).toBeAttached();
    });

    test('Google Analytics respects existing opt-in consent on page load', async ({ page }) => {
        // Pre-set cookie consent to 'true'
        await page.addInitScript(() => {
            localStorage.setItem('cookie_consent', 'true');
        });

        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
        expect(consent).toBe('true');

        await expect(page.locator('#ga-loader')).toBeAttached();
    });
});

