import { test, expect } from '@playwright/test';

test.describe('Managing instruments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('Should allow a Guitar to be added', async ({ page }) => {
    const button = page.getByRole('button', {
      name: 'Add Guitar',
    });
    await button.click();
    const guitar = page.getByRole('listitem', {
      name: 'Guitar (id: 2)',
    });
    await expect(guitar).toBeVisible();
  });

  test('Should allow a Guitar to be removed', async ({ page }) => {
    const guitar = page.getByRole('listitem', {
      name: 'Guitar (id: 0)',
    });
    const button = guitar.getByRole('button', {
      name: 'Remove',
    });
    await button.click();
    await expect(guitar).not.toBeVisible();
  });

  test('Should allow a Piano to be added', async ({ page }) => {
    const button = page.getByRole('button', {
      name: 'Add Piano',
    });
    await button.click();
    const piano = page.getByRole('listitem', {
      name: 'Piano (id: 2)',
    });
    await expect(piano).toBeVisible();
  });

  test('Should allow a Piano to be removed', async ({ page }) => {
    const piano = page.getByRole('listitem', {
      name: 'Piano (id: 1)',
    });
    const button = piano.getByRole('button', {
      name: 'Remove',
    });
    await button.click();
    await expect(piano).not.toBeVisible();
  });
});
