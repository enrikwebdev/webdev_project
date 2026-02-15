import { test, expect } from '@playwright/test'

test('homepage renders and has primary CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('link', { name: /prenota|chiama/i }).first()).toBeVisible()
})

test('mobile has no horizontal overflow and sections are reachable', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('/')

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(hasOverflow).toBeFalsy()

  await page.getByRole('button', { name: /prenota/i }).first().click()
  await expect(page.getByRole('heading', { name: /blocca il tuo appuntamento/i })).toBeVisible()

  await context.close()
})
