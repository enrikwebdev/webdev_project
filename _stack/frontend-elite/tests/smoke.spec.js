import { test, expect } from '@playwright/test'

test('homepage renders and has primary CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('link', { name: /prenota|chiama/i }).first()).toBeVisible()
})
