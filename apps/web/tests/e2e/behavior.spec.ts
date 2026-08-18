import { test, expect, type Locator, type Page } from '@playwright/test';

const CARD = '[data-testid="car-card"]';

const prices = (page: Page) =>
  page.locator(CARD).evaluateAll((els) => els.map((e) => Number(e.getAttribute('data-price'))));
const statuses = (page: Page) =>
  page.locator(CARD).evaluateAll((els) => els.map((e) => e.getAttribute('data-status')));

const desktopOnly = (name: string) =>
  test.skip(name !== 'desktop', 'Uses the desktop sidebar/toolbar');

// Block the Google Maps embed so the `load` event isn't held up by a 3rd party.
test.beforeEach(async ({ page }) => {
  await page.route(/google\.com\/maps|maps\.google/, (r) => r.abort());
});

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
  // The sliding thumb animation can swallow a click, so retry until selected.
  await expect(async () => {
    await soldTab.click();
    await expect(soldTab).toHaveClass(/ant-segmented-item-selected/, { timeout: 1500 });
  }).toPass({ timeout: 8000 });
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

  // Empty submit → validation error (retry to avoid a pre-hydration click).
  await expect(async () => {
    await modal.getByRole('button', { name: 'Gửi yêu cầu' }).click();
    await expect(modal.getByText('Vui lòng nhập họ tên')).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 8000 });

  await modal.getByPlaceholder('Nguyễn Văn A').fill('Nguyễn Văn A');
  await modal.getByPlaceholder('09xxxxxxxx').fill('0912345678');
  await modal.getByRole('button', { name: 'Gửi yêu cầu' }).click();

  await expect(page.getByText(/Đã gửi yêu cầu/)).toBeVisible();
});

// ─────────────────────────── Contact form ───────────────────────────

test('Contact form: validates required fields then submits', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'load' });

  const form = page.locator('form');
  const submit = form.getByRole('button', { name: 'Gửi yêu cầu' });
  // Retry the empty submit until the (client-validated) error appears — guards
  // against clicking before the form has hydrated.
  await expect(async () => {
    await submit.click();
    await expect(page.getByText('Vui lòng nhập họ tên')).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 8000 });

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

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '123456';

const ADMIN_USER = {
  id: 'user-admin',
  email: ADMIN_EMAIL,
  name: 'Vũ Bách Admin',
  role: 'ADMIN',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

/**
 * Stub the NestJS auth API so these tests stay hermetic (Playwright only boots
 * the web server). Login succeeds only for the seeded admin credentials.
 */
async function mockAuthApi(page: import('@playwright/test').Page) {
  await page.route('**/api/auth/login', async (route) => {
    const body = route.request().postDataJSON() as {
      email?: string;
      password?: string;
    };
    if (body?.email === ADMIN_EMAIL && body?.password === ADMIN_PASSWORD) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            accessToken: 'test-access-token',
            refreshToken: 'test-refresh-token',
            user: ADMIN_USER,
          },
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Invalid email or password',
          statusCode: 401,
        }),
      });
    }
  });

  await page.route('**/api/auth/logout', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: { revoked: true } }),
    }),
  );

  await page.route('**/api/auth/me', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: ADMIN_USER }),
    }),
  );
}

test('Admin: unauthenticated /admin redirects to login, correct password unlocks dashboard', async ({ page }) => {
  await mockAuthApi(page);
  await page.goto('/admin', { waitUntil: 'load' });

  // The guard bounces an unauthenticated visitor to the dedicated login page.
  await expect(page).toHaveURL(/\/login\?redirect=%2Fadmin|\/login\?redirect=\/admin/);

  await page.getByPlaceholder('Email').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Mật khẩu').fill('wrong-pass');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.getByText('Email hoặc mật khẩu không đúng')).toBeVisible();

  await page.getByPlaceholder('Mật khẩu').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  // Successful admin login returns to /admin and shows the dashboard.
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole('heading', { name: 'Quản lý xe' })).toBeVisible();

  // Logout sends the admin back to the login page.
  await page.getByRole('button', { name: 'Đăng xuất' }).click();
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Quản trị viên' })).toBeVisible();
});

test('Admin: delete a car removes it from the table', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await mockAuthApi(page);
  await page.goto('/login', { waitUntil: 'load' });
  await page.getByPlaceholder('Email').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Mật khẩu').fill(ADMIN_PASSWORD);
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

// ─────────────────────────── Admin car form (create / edit) ───────────────────────────

/** Log in as the seeded admin (works whether /admin gates inline or redirects to /login). */
async function loginAsAdmin(page: Page) {
  await mockAuthApi(page);
  await page.goto('/admin', { waitUntil: 'load' });
  await page.getByPlaceholder('Email').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Mật khẩu').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await expect(page.getByRole('heading', { name: 'Quản lý xe' })).toBeVisible();
}

const totalCarsCell = (page: Page) =>
  page.locator('text=Tổng số xe').locator('..').locator('p').first();

/** Open the antd Select inside the form item with `itemLabel` and pick `optionText`. */
async function pickSelectOption(
  page: Page,
  modal: Locator,
  itemLabel: string,
  optionText: string,
) {
  await modal
    .locator('.ant-form-item')
    .filter({ hasText: itemLabel })
    .locator('.ant-select')
    .first()
    .click();
  await page
    .locator('.ant-select-dropdown:visible .ant-select-item-option')
    .filter({ hasText: optionText })
    .first()
    .click();
}

test('Admin: create a car adds it to the table and updates stats', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await loginAsAdmin(page);

  const before = Number((await totalCarsCell(page).innerText()).trim());

  await page.getByRole('button', { name: 'Thêm xe mới' }).click();
  const modal = page.locator('.ant-modal-content');
  await expect(modal.getByText('Thêm xe mới')).toBeVisible();

  await pickSelectOption(page, modal, 'Hãng xe', 'Toyota');
  await modal.getByPlaceholder('VD: Camry 2.5Q').fill('Corolla Cross Test');
  await modal.getByPlaceholder('2024').fill('2024');
  await modal.getByPlaceholder('559000000').fill('800000000');
  await modal.getByPlaceholder('15000').fill('12000');
  await modal.getByPlaceholder('Trắng').fill('Đỏ');
  await modal
    .getByPlaceholder('Mô tả chi tiết về xe...')
    .fill('Xe test tự động, đầy đủ tiện nghi.');

  await modal.getByRole('button', { name: 'Thêm xe', exact: true }).click();
  await expect(page.getByText('Đã thêm xe mới')).toBeVisible();
  await expect(page.getByText('Corolla Cross Test')).toBeVisible();

  await expect(async () => {
    const after = Number((await totalCarsCell(page).innerText()).trim());
    expect(after).toBe(before + 1);
  }).toPass({ timeout: 4000 });
});

test('Admin: car form blocks submit and flags required fields when empty', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await loginAsAdmin(page);

  await page.getByRole('button', { name: 'Thêm xe mới' }).click();
  const modal = page.locator('.ant-modal-content');
  await modal.getByRole('button', { name: 'Thêm xe', exact: true }).click();

  // brand/model/year/price/mileage/color/description are all required.
  await expect(modal.getByText('Bắt buộc').first()).toBeVisible();
  expect(await modal.getByText('Bắt buộc').count()).toBeGreaterThanOrEqual(5);
  // Submit was blocked → the create modal is still open.
  await expect(modal.getByText('Thêm xe mới')).toBeVisible();
});

test('Admin: edit a car updates the row', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await loginAsAdmin(page);

  // First action button in a row is Edit.
  await page.locator('.ant-table-row').first().getByRole('button').first().click();
  const modal = page.locator('.ant-modal-content');
  await expect(modal.getByText('Chỉnh sửa xe')).toBeVisible();

  await modal.getByPlaceholder('VD: Camry 2.5Q').fill('Đã Đổi Tên');
  await modal.getByRole('button', { name: 'Lưu thay đổi' }).click();
  await expect(page.getByText('Đã cập nhật xe')).toBeVisible();
  await expect(page.getByText('Đã Đổi Tên')).toBeVisible();
});

test('Admin: cancelling the form makes no change', async ({ page }, info) => {
  desktopOnly(info.project.name);
  await loginAsAdmin(page);

  const before = Number((await totalCarsCell(page).innerText()).trim());
  await page.getByRole('button', { name: 'Thêm xe mới' }).click();
  const modal = page.locator('.ant-modal-content');
  await modal.getByPlaceholder('VD: Camry 2.5Q').fill('Không lưu xe này');
  await modal.getByRole('button', { name: 'Huỷ' }).click();

  await expect(page.getByText('Không lưu xe này')).toHaveCount(0);
  expect(Number((await totalCarsCell(page).innerText()).trim())).toBe(before);
});
