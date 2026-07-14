const { test, expect } = require("@playwright/test");
const { attachPageGuards, waitForAlpine } = require("./helpers");

test("Landing theme toggle persists across reloads", async ({ page }) => {
  const guards = await attachPageGuards(page);

  await page.goto("/");
  await page.evaluate(() => window.localStorage.removeItem("theme"));
  await page.reload();
  await waitForAlpine(page);

  const root = page.locator("html");
  const toggle = page.getByRole("button", { name: "Cambiar tema" }).first();

  await expect(root).toHaveAttribute("data-theme", "light");
  await toggle.click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#282A36");
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("theme"))).toBe("dark");

  await page.reload();
  await waitForAlpine(page);
  await expect(root).toHaveAttribute("data-theme", "dark");

  await toggle.click();
  await expect(root).toHaveAttribute("data-theme", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#EAEAE1");
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem("theme"))).toBe("light");

  await guards.assertHealthyContext();
});
