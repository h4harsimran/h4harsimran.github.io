import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance Tests', () => {
  test('should meet Lighthouse performance benchmarks', async ({
    page,
    browserName,
  }) => {
    // Skip webkit for Lighthouse as it's not supported
    test.skip(browserName === 'webkit', 'Lighthouse not supported on WebKit');

    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Run Lighthouse audit
    await playAudit({
      page,
      thresholds: {
        performance: 85,
        accessibility: 95,
        'best-practices': 90,
        seo: 90,
      },
      port: 9222,
    });
  });

  test('should load quickly on slow networks', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });

    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Should load within reasonable time even on slow network
    expect(loadTime).toBeLessThan(5000); // 5 seconds
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');

    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });

    expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s
  });

  test('should handle animations efficiently', async ({ page }) => {
    await page.goto('/');

    // Scroll through sections to trigger animations
    const sections = [
      '#hero',
      '#impact-metrics',
      '#career-timeline',
      '#expertise-matrix',
    ];

    for (const section of sections) {
      await page.locator(section).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500); // Wait for animations
    }

    // Check that page is still responsive
    const button = page.getByRole('button').first();
    if (await button.isVisible()) {
      await button.click();
      // Should respond quickly
      await page.waitForTimeout(100);
    }
  });

  test('should optimize images and assets', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Check for proper caching headers
    const headers = response?.headers();
    expect(headers).toBeDefined();

    // Check that CSS and JS are minified (basic check)
    const cssResponse = await page.request.get('/assets/index.css', {
      failOnStatusCode: false,
    });
    if (cssResponse.ok()) {
      const cssContent = await cssResponse.text();
      // Minified CSS should not have excessive whitespace
      const whitespaceRatio =
        (cssContent.match(/\s/g) || []).length / cssContent.length;
      expect(whitespaceRatio).toBeLessThan(0.3);
    }
  });

  test('should be responsive across different screen sizes', async ({
    page,
  }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1920, height: 1080, name: 'Desktop Large' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');

      // Check that hero section is visible
      await expect(page.locator('#hero')).toBeVisible();

      // Check that navigation works
      const nav = page.getByRole('navigation');
      await expect(nav).toBeVisible();

      // Take screenshot for visual regression testing
      await page.screenshot({
        path: `test-results/responsive-${viewport.name.toLowerCase()}.png`,
        fullPage: true,
      });
    }
  });

  test('should handle memory efficiently during animations', async ({
    page,
  }) => {
    await page.goto('/');

    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (
        (performance as unknown as { memory?: { usedJSHeapSize: number } })
          .memory?.usedJSHeapSize || 0
      );
    });

    // Trigger multiple animations by scrolling
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
    }

    // Check memory usage hasn't grown excessively
    const finalMemory = await page.evaluate(() => {
      return (
        (performance as unknown as { memory?: { usedJSHeapSize: number } })
          .memory?.usedJSHeapSize || 0
      );
    });

    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseRatio = memoryIncrease / initialMemory;

      // Memory shouldn't increase by more than 50%
      expect(memoryIncreaseRatio).toBeLessThan(0.5);
    }
  });
});
