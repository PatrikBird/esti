import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/esti - effortless estimations/)
})

test('create session button', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Create session' }).click()

  await page.waitForURL('/new')
})

test('join session button', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Join session' }).click()

  await page.waitForURL('/join')
})
