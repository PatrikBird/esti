import { expect, test } from '@playwright/test'

test.describe('join and remove user from session', () => {
  test.afterEach(async ({ page }) => {
    const userID = await page.evaluate(() => localStorage.getItem('userID'))
    expect(userID).toBeTruthy()
    const container = page.getByTestId(userID)
    await container.getByRole('button', { name: 'Delete User' }).click()
    await expect(page.getByRole('heading', { name: 'User not found' })).toBeVisible()
  })

  test('joining dummy session', async ({ page }) => {
    await page.goto('/join')

    await page.getByLabel('Session ID').click()
    await page.getByLabel('Session ID').fill('1111111111111')
    await page.getByLabel('Name').click()
    await page.getByLabel('Name').fill('botTest')
    await page.getByRole('button', { name: 'Join session' }).click()
    await page.waitForURL('**/session/1111111111111')

    expect(page.url()).toContain('/session/1111111111111')
    await expect(page.getByRole('button', { name: 'REVEAL' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'RESET' })).toBeVisible()
  })

  test('voting', async ({ page }) => {
    await page.goto('/join')

    await page.getByLabel('Session ID').click()
    await page.getByLabel('Session ID').fill('1111111111111')
    await page.getByLabel('Name').click()
    await page.getByLabel('Name').fill('botTest')
    await page.getByRole('button', { name: 'Join session' }).click()
    await page.waitForURL('**/session/1111111111111')

    await page.getByRole('button', { name: '40' }).click()
    await page.getByRole('button', { name: 'REVEAL' }).click()

    await expect(page.getByTestId('average-vote')).toBeVisible()
    await expect(page.getByTestId('average-vote')).toContainText('40.0 Average 40 based on')
    await expect(page.getByText('Click \'Reset\' to begin a new')).toBeVisible()
    await page.getByRole('button', { name: 'RESET' }).click()
  })
})
