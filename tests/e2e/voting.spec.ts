import { expect, test } from '@playwright/test'
import { deleteUser, joinSession } from './fixtures'

test.describe('join and remove user from session', () => {
  test.afterEach(async ({ page }) => {
    await deleteUser({ page })
  })

  joinSession('voting', async ({ page }) => {
    await page.getByRole('button', { name: '40' }).click()
    await page.getByRole('button', { name: 'REVEAL' }).click()

    await expect(page.getByTestId('average-vote')).toBeVisible()
    await expect(page.getByTestId('average-vote')).toContainText('40.0 Average 40 based on')
    await expect(page.getByText('Click \'Reset\' to begin a new')).toBeVisible()
    await page.getByRole('button', { name: 'RESET' }).click()
  })
})
