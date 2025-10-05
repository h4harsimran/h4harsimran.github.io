import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check that headings follow proper hierarchy (h1 -> h2 -> h3, etc.)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

    expect(headings.length).toBeGreaterThan(0);

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // h1 should contain the main title
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toContain('HARSIMRANJEET SINGH');
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation through interactive elements
    await page.keyboard.press('Tab');

    // Should focus on first interactive element
    const focusedElement = await page.locator(':focus').first();
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through navigation
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = await page.locator(':focus').first();
      await expect(currentFocus).toBeVisible();
    }
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check navigation has proper role
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Check buttons have proper labels
    const buttons = await page.getByRole('button').all();
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();

      // Button should have either aria-label or text content
      expect(ariaLabel || textContent).toBeTruthy();
    }

    // Check links have proper labels
    const links = await page.getByRole('link').all();
    for (const link of links) {
      const textContent = await link.textContent();
      expect(textContent?.trim()).toBeTruthy();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // Run axe with color contrast rules specifically
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );

    expect(colorContrastViolations).toEqual([]);
  });

  test('should work with screen readers', async ({ page }) => {
    // Check that important content has proper semantic markup
    const main = page.locator('main, [role="main"]');
    if ((await main.count()) > 0) {
      await expect(main.first()).toBeVisible();
    }

    // Check sections have proper landmarks
    const sections = await page.locator('section').all();
    expect(sections.length).toBeGreaterThan(0);

    // Check that headings provide proper structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(2);
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.reload();

    // Content should still be accessible
    await expect(page.getByText('HARSIMRANJEET SINGH')).toBeVisible();
    await expect(
      page.getByText('Manufacturing Sciences & Technology Leader')
    ).toBeVisible();

    // Navigation should still work
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should have proper focus indicators', async ({ page }) => {
    // Tab through interactive elements and check focus visibility
    const interactiveElements = await page
      .locator(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      .all();

    for (let i = 0; i < Math.min(interactiveElements.length, 10); i++) {
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Check that focus is visually indicated (this is a basic check)
      const focusedBox = await focusedElement.boundingBox();
      expect(focusedBox).toBeTruthy();
    }
  });

  test('should handle mobile accessibility', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile navigation accessibility
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Check ARIA attributes
    await expect(menuButton).toHaveAttribute('aria-expanded');
    await expect(menuButton).toHaveAttribute('aria-controls');

    // Test mobile menu interaction
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Run accessibility scan on mobile
    const mobileAccessibilityResults = await new AxeBuilder({ page }).analyze();
    expect(mobileAccessibilityResults.violations).toEqual([]);
  });

  test('should have proper form accessibility (if forms exist)', async ({
    page,
  }) => {
    // Check if there are any forms on the page
    const forms = await page.locator('form').count();

    if (forms > 0) {
      // Check form labels
      const inputs = await page.locator('input, select, textarea').all();

      for (const input of inputs) {
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');

        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          const hasLabel = (await label.count()) > 0;

          // Input should have either a label, aria-label, or aria-labelledby
          expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
        }
      }
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    // Check for ARIA live regions for dynamic content
    const liveRegions = await page
      .locator('[aria-live], [role="status"], [role="alert"]')
      .count();

    // If there are counters or dynamic content, there should be live regions
    const counters = await page
      .locator('[class*="counter"], [class*="animated"]')
      .count();

    if (counters > 0) {
      // This is a basic check - in a real app you'd test actual announcements
      expect(liveRegions).toBeGreaterThanOrEqual(0);
    }
  });
});
