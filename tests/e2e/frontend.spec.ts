import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';

/** Rectangle intersection helper for overlap detection. */
function intersects(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
): boolean {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

/** Measure Largest Contentful Paint (ms) after the page settles. */
async function measureLCP(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        let value = 0;
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            value = entries[entries.length - 1].startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
        } catch {
          /* not supported */
        }
        setTimeout(() => resolve(value), 2500);
      }),
  );
}

/** Attach collectors for real JS errors (pageerror) and console errors. */
function collectErrors(page: Page) {
  const jsErrors: string[] = [];
  const consoleErrors: string[] = [];
  page.on('pageerror', (err) => jsErrors.push(err.message));
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    // Ignore expected network failures from mock/remote images.
    if (/Failed to load resource|net::ERR|status of 4\d\d|status of 5\d\d/i.test(text)) return;
    if (/downloadable font|preloaded using link preload/i.test(text)) return;
    consoleErrors.push(text);
  });
  return { jsErrors, consoleErrors };
}

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/cars', name: 'cars' },
  { path: '/cars/toyota-camry-25q-2025-car-01', name: 'detail' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/contact', name: 'contact' },
  { path: '/favorites', name: 'favorites' },
];

for (const route of ROUTES) {
  test(`page "${route.name}" loads cleanly, no JS errors, LCP measured`, async ({ page }, testInfo) => {
    const { jsErrors, consoleErrors } = collectErrors(page);

    const response = await page.goto(route.path, { waitUntil: 'load' });
    expect(response?.status(), `HTTP status for ${route.path}`).toBeLessThan(400);

    // Header should render on every page.
    await expect(page.getByRole('banner')).toBeVisible();

    const lcp = await measureLCP(page);
    console.log(`[LCP] ${route.name} (${testInfo.project.name}): ${Math.round(lcp)}ms`);

    // No uncaught JS exceptions on any page.
    expect(jsErrors, `JS errors on ${route.path}: ${jsErrors.join(' | ')}`).toHaveLength(0);
    expect(
      consoleErrors,
      `Console errors on ${route.path}: ${consoleErrors.join(' | ')}`,
    ).toHaveLength(0);

    // LCP budget: lenient because the hero pulls a remote image over the network.
    expect(lcp, `LCP too high on ${route.path}`).toBeLessThan(6000);
  });
}

test('QuickView modal: close button and favorite button do not overlap', async ({ page }) => {
  await page.goto('/cars', { waitUntil: 'load' });

  const firstCard = page.locator('a[href^="/cars/"]').first();
  await firstCard.scrollIntoViewIfNeeded();
  await firstCard.hover();

  const quickView = page.getByRole('button', { name: 'Xem nhanh' }).first();
  await quickView.click();

  const modal = page.locator('.ant-modal-content');
  await expect(modal).toBeVisible();

  const closeBtn = page.locator('.ant-modal-close');
  const favBtn = modal.getByRole('button', { name: /yêu thích/i });
  await expect(closeBtn).toBeVisible();
  await expect(favBtn).toBeVisible();

  const closeBox = await closeBtn.boundingBox();
  const favBox = await favBtn.boundingBox();
  expect(closeBox).not.toBeNull();
  expect(favBox).not.toBeNull();
  expect(
    intersects(closeBox!, favBox!),
    'Modal close (X) overlaps the favorite (heart) button',
  ).toBe(false);
});

test('Favorite toggle persists to the favorites page', async ({ page }) => {
  await page.goto('/cars', { waitUntil: 'load' });

  // A visible favorites link must exist in the header (desktop or mobile).
  await expect(page.locator('header a[href="/favorites"]:visible').first()).toBeVisible();

  const heart = page
    .locator('a[href^="/cars/"]')
    .first()
    .getByRole('button', { name: /yêu thích/i });
  await heart.click();

  // Favorite persists (localStorage) and shows on the favorites page after reload.
  await page.goto('/favorites', { waitUntil: 'load' });
  await expect(page.getByText('Chưa có xe yêu thích')).toHaveCount(0);
  await expect(page.locator('a[href^="/cars/"]').first()).toBeVisible();
});

test('Mobile: hamburger opens the navigation drawer', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile-only navigation');
  await page.goto('/', { waitUntil: 'load' });

  await page.getByRole('button', { name: 'Mở menu' }).click();
  const drawer = page.locator('.ant-drawer-content');
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('link', { name: 'Xe đang bán', exact: true })).toBeVisible();
});

test('Search filters the car grid', async ({ page }) => {
  await page.goto('/cars', { waitUntil: 'load' });

  const cards = page.locator('a[href^="/cars/"]');
  await expect(cards.first()).toBeVisible();

  await page.getByPlaceholder(/Tìm theo hãng/i).fill('Toyota');
  // Debounced re-render; wait for the grid to reflect the filter.
  await expect(async () => {
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    const texts = await cards.allInnerTexts();
    expect(texts.every((t) => /Toyota/i.test(t))).toBe(true);
  }).toPass({ timeout: 5000 });
});
