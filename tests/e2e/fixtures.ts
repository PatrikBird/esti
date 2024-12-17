import type { Page } from '@playwright/test'
import { test as baseTest, expect } from '@playwright/test'

export async function getUserContainer({ page }: { page: Page }) {
  const userID = await page.evaluate(() => localStorage.getItem('userID'))
  expect(userID).toBeTruthy()
  const container = page.getByTestId(userID)
  return container
}

export const joinSession = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto('/join')
    await page.getByLabel('Session ID').click()
    await page.getByLabel('Session ID').fill('1111111111111')
    await page.getByLabel('Name').click()
    await page.getByLabel('Name').fill('botTest')
    await page.getByRole('button', { name: 'Join session' }).click()
    await page.waitForURL('**/session/1111111111111')
    await use(page)
  },
})

export async function deleteUser({ page }: { page: Page }) {
  const userID = await page.evaluate(() => localStorage.getItem('userID'))
  expect(userID).toBeTruthy()
  const container = page.getByTestId(userID)
  await container.getByRole('button', { name: 'Delete User' }).click()
  await expect(page.getByRole('heading', { name: 'User not found' })).toBeVisible()
}
