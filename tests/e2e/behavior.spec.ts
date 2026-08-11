import { test, expect, type Page } from '@playwright/test';

const CARD = '[data-testid="car-card"]';

const prices = (page: Page) =>
  page.locator(CARD).evaluateAll((els) => els.map((e) => Number(e.getAttribute('data-price'))));
const statuses = (page: Page) =>
  page.locator(CARD).evaluateAll((els) => els.map((e) => e.getAttribute('data-status')));

const desktopOnly = (name: string) =>
  test.skip(name !== 'desktop', 'Uses the desktop sidebar/toolbar');

// ─────────────────────────── Filtering / sorting ───────────────────────────

test('URL query pre-filters the grid by brand', async ({ page }) => {
  await page.goto('/cars?brand=Toyota', { waitUntil: 'load' });
  await expect(page.locator(CARD).first()).toBeVisible();
  // The brand filter is applied client-side after hydration; wait for it to settle.
  await expect(async () => {
    const texts = await page.locator(CARD).allInnerTexts();
    expect(texts.length).toBeGreaterThan(0);
    expect(texts.every((t) => /Toyota/i.test(t))).toBe(true);
  }).toPass({ timeout: 5000 });
});

test('Status filter shows only sold cars', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await page.goto('/cars', { waitUntil: 'load' });

  const soldTab = page.locator('aside .ant-segmented-item').filter({ hasText: 'Đã bán' });
  await soldTab.click();
  await expect(soldTab).toHaveClass(/ant-segmented-item-selected/);
  await expect(async () => {
    const s = await statuses(page);
    expect(s.length).toBeGreaterThan(0);
    expect(s.every((x) => x === 'sold')).toBe(true);
  }).toPass({ timeout: 6000 });
});

test('Sort by price ascending orders the grid', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await page.goto('/cars', { waitUntil: 'load' });

  const sortSelect = page.locator('.ant-select').filter({ hasText: 'Mới nhất' });
  await sortSelect.scrollIntoViewIfNeeded();
  await sortSelect.click();
  const option = page.locator('.ant-select-item-option').filter({ hasText: 'Giá thấp' });
  await expect(option).toBeVisible();
  await option.click();
  // Confirm the sort was applied before reading the grid.
  await expect(page.locator('.ant-select-selection-item').filter({ hasText: 'Giá thấp' })).toBeVisible();

  await expect(async () => {
    const p = await prices(page);
    expect(p.length).toBeGreaterThan(1);
    const sorted = [...p].sort((a, b) => a - b);
    expect(p).toEqual(sorted);
  }).toPass({ timeout: 4000 });
});

test('Pagination moves to a different set of cars', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await page.goto('/cars', { waitUntil: 'load' });

  const firstBefore = await page.locator(CARD).first().getAttribute('href');
  const page2 = page.locator('.ant-pagination-item-2');
  await page2.scrollIntoViewIfNeeded();
  await page2.click();
  await expect(page2).toHaveClass(/ant-pagination-item-active/);
  await expect(page.locator(CARD).first()).not.toHaveAttribute('href', firstBefore ?? '');
});

test('Header highlights only the matching cars link', async ({ page }, info) => {
  desktopOnly(info.project.name);
  const nav = page.locator('header nav');

  // Match the standalone `text-brand` (active) but not `hover:text-brand` (idle).
  const activeClass = /(?<!hover:)text-brand/;

  await page.goto('/cars', { waitUntil: 'load' });
  await expect(nav.getByRole('link', { name: 'Xe đang bán', exact: true })).toHaveClass(activeClass);
  await expect(nav.getByRole('link', { name: 'Xe đã bán', exact: true })).not.toHaveClass(
    activeClass,
  );

  await page.goto('/cars?status=sold', { waitUntil: 'load' });
  await expect(nav.getByRole('link', { name: 'Xe đã bán', exact: true })).toHaveClass(activeClass);
  await expect(nav.getByRole('link', { name: 'Xe đang bán', exact: true })).not.toHaveClass(
    activeClass,
  );
});

// ─────────────────────────── Detail interactions ───────────────────────────

test('Gallery thumbnail switches the active image', async ({ page }) => {
  await page.goto('/cars/mazda-3-deluxe-2024-car-06', { waitUntil: 'load' });

  const thumb2 = page.getByRole('button', { name: 'Ảnh thu nhỏ 2' });
  await expect(thumb2).toBeVisible();
  // Not active initially, becomes active (brand border) after click.
  await expect(thumb2).not.toHaveClass(/border-brand/);
  await thumb2.click();
  await expect(thumb2).toHaveClass(/border-brand/);
  // Counter reflects the switch (works regardless of remote image load).
  await expect(page.getByText('2/2')).toBeVisible();
});

test('Test-drive form: validates then submits successfully', async ({ page }) => {
  await page.goto('/cars/toyota-camry-25q-2025-car-01', { waitUntil: 'load' });

  await page.getByRole('button', { name: 'Lái thử' }).click();
  const modal = page.locator('.ant-modal-content');
  await expect(modal).toBeVisible();

  // Empty submit → validation error.
  await modal.getByRole('button', { name: 'Gửi yêu cầu' }).click();
  await expect(modal.getByText('Vui lòng nhập họ tên')).toBeVisible();

  await modal.getByPlaceholder('Nguyễn Văn A').fill('Nguyễn Văn A');
  await modal.getByPlaceholder('09xxxxxxxx').fill('0912345678');
  await modal.getByRole('button', { name: 'Gửi yêu cầu' }).click();

  await expect(page.getByText(/Đã gửi yêu cầu/)).toBeVisible();
});

// ─────────────────────────── Contact form ───────────────────────────

test('Contact form: validates required fields then submits', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'load' });

  const form = page.locator('form');
  await form.getByRole('button', { name: 'Gửi yêu cầu' }).click();
  await expect(page.getByText('Vui lòng nhập họ tên')).toBeVisible();

  await form.getByPlaceholder('Nguyễn Văn A').fill('Trần B');
  await form.getByPlaceholder('09xxxxxxxx').fill('0987654321');
  await form.getByPlaceholder(/Bạn cần chúng tôi hỗ trợ/).fill('Tôi muốn xem xe Camry.');
  await form.getByRole('button', { name: 'Gửi yêu cầu' }).click();

  await expect(page.getByText(/Cảm ơn bạn/)).toBeVisible();
});

// ─────────────────────────── Quick view → detail ───────────────────────────

test('Quick view opens and navigates to the detail page', async ({ page }) => {
  await page.goto('/cars', { waitUntil: 'load' });
  const firstCard = page.locator(CARD).first();
  const href = await firstCard.getAttribute('href');
  await firstCard.hover();
  await page.getByRole('button', { name: 'Xem nhanh' }).first().click();

  const modal = page.locator('.ant-modal-content');
  await expect(modal).toBeVisible();
  await modal.getByRole('link', { name: 'Xem chi tiết' }).click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
});

// ─────────────────────────── Favorites add / remove ───────────────────────────

test('Favorites: add two cars, then remove one', async ({ page }) => {
  await page.goto('/cars', { waitUntil: 'load' });

  // dispatchEvent fires the button's onClick directly — avoids coordinate hit-
  // testing, which is unreliable while the card runs its hover translate/scale.
  const cards = page.locator(CARD);
  await cards.nth(0).getByRole('button', { name: /yêu thích/i }).dispatchEvent('click');
  await cards.nth(1).getByRole('button', { name: /yêu thích/i }).dispatchEvent('click');

  await page.goto('/favorites', { waitUntil: 'load' });
  await expect(page.locator(CARD)).toHaveCount(2);

  // Un-favorite one from the favorites page → list shrinks to 1.
  await page.locator(CARD).first().getByRole('button', { name: /yêu thích/i }).dispatchEvent('click');
  await expect(page.locator(CARD)).toHaveCount(1);
});

// ─────────────────────────── Admin auth ───────────────────────────

test('Admin: wrong password blocked, correct password unlocks dashboard', async ({ page }) => {
  await page.goto('/admin', { waitUntil: 'load' });

  await page.getByPlaceholder('Mật khẩu').fill('wrong-pass');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.getByText('Mật khẩu không đúng')).toBeVisible();

  await page.getByPlaceholder('Mật khẩu').fill('admin123');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  await expect(page.getByRole('heading', { name: 'Quản lý xe' })).toBeVisible();

  // Logout returns to the gate.
  await page.getByRole('button', { name: 'Đăng xuất' }).click();
  await expect(page.getByRole('heading', { name: 'Quản trị viên' })).toBeVisible();
});

test('Admin: delete a car removes it from the table', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await page.goto('/admin', { waitUntil: 'load' });
  await page.getByPlaceholder('Mật khẩu').fill('admin123');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.getByRole('heading', { name: 'Quản lý xe' })).toBeVisible();

  const totalCell = page.locator('text=Tổng số xe').locator('..').locator('p').first();
  const before = Number((await totalCell.innerText()).trim());

  await page.locator('.ant-table-row').first().getByRole('button').last().click();
  await page.getByRole('button', { name: 'Xoá', exact: true }).click();
  await expect(page.getByText('Đã xoá xe')).toBeVisible();

  await expect(async () => {
    const after = Number((await totalCell.innerText()).trim());
    expect(after).toBe(before - 1);
  }).toPass({ timeout: 4000 });
});
