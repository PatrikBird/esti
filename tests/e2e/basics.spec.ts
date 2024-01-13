import { expect, test } from '@playwright/test'
import { deleteUser, joinSession } from './fixtures'

test.describe('join and remove user from session', () => {
  test.afterEach(async ({ page }) => {
    await deleteUser({ page })
  })

  joinSession('reveal/reset buttons are visible', async ({ page }) => {
    expect(page.url()).toContain('/session/1111111111111')
    await expect(page.getByRole('button', { name: 'REVEAL' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'RESET' })).toBeVisible()
  })
})

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
