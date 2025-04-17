import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('Should render', async ({ page }) => {
    await expect(page).toHaveTitle('Music');
  });
});
