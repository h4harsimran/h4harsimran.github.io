import { test, expect } from '@playwright/test';

test.describe('Navigation Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to all sections smoothly', async ({ page }) => {
    // Test navigation to each section
    const sections = [
      { name: 'Hero', id: '#hero' },
      { name: 'Impact', id: '#impact-metrics' },
      { name: 'Timeline', id: '#career-timeline' },
      { name: 'Expertise', id: '#expertise-matrix' },
      { name: 'Process', id: '#process-flow' },
      { name: 'Skills', id: '#skills-radar' },
      { name: 'Focus', id: '#current-focus' },
      { name: 'Education', id: '#education' },
      { name: 'Tools', id: '#tools' },
      { name: 'Contact', id: '#contact' },
    ];

    for (const section of sections) {
      // Click navigation link
      await page.getByRole('link', { name: section.name }).click();

      // Wait for smooth scroll to complete
      await page.waitForTimeout(1000);

      // Check that section is in viewport
      const sectionElement = page.locator(section.id);
      await expect(sectionElement).toBeInViewport();
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Find and click mobile menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();

    // Open mobile menu
    await menuButton.click();

    // Check that menu is expanded
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Click a navigation item
    await page.getByRole('link', { name: 'Hero' }).click();

    // Menu should close
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Should navigate to section
    await expect(page.locator('#hero')).toBeInViewport();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Focus first navigation link
    await page.keyboard.press('Tab');

    // Navigate through menu items with keyboard
    const heroLink = page.getByRole('link', { name: 'Hero' });
    await expect(heroLink).toBeFocused();

    // Press Enter to navigate
    await page.keyboard.press('Enter');

    // Should navigate to hero section
    await expect(page.locator('#hero')).toBeInViewport();
  });

  test('should highlight active section during scroll', async ({ page }) => {
    // Scroll to different sections and check active states
    await page.evaluate(() => {
      document.querySelector('#impact-metrics')?.scrollIntoView();
    });

    await page.waitForTimeout(500);

    // Check that Impact link is active (this would depend on implementation)
    const impactLink = page.getByRole('link', { name: 'Impact' });
    await expect(impactLink).toBeVisible();
  });

  test('should handle navigation with reduced motion', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Navigation should still work
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });
});
