import { expect, test } from '@playwright/test'
import { deleteUser, getUserContainer, joinSession } from './fixtures'

test.describe('join and remove user from session', () => {
  test.afterEach(async ({ page }) => {
    await deleteUser({ page })
  })

  joinSession('toggling user mode works both ways', async ({ page }) => {
    const container = await getUserContainer({ page })

    await expect(container.getByRole('button', { name: 'Move User to Observer' })).toBeVisible()
    await container.getByRole('button', { name: 'Move User to Observer' }).click()

    await expect(page.getByRole('button', { name: 'Move User to Voter' })).toBeVisible()
    await container.getByRole('button', { name: 'Move User to Voter' }).click()

    await expect(container.getByRole('button', { name: 'Move User to Observer' })).toBeVisible()
  })
})
