import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://esti.patbird.me/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/esti - effortless estimations/)
})

test('create session button', async ({ page }) => {
  await page.goto('https://esti.patbird.me/')

  // Click the Create session button.
  await page.getByRole('link', { name: 'Create session' }).click()

  // Expects the URL to be /new
  await page.waitForURL('https://esti.patbird.me/new');
})
