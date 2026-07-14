const { test, expect } = require("@playwright/test");
const { attachPageGuards, waitForAlpine } = require("./helpers");

const viewports = [
  { name: "mobile-compact", width: 360, height: 640 },
  { name: "mobile-tall", width: 390, height: 844 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "desktop-short", width: 1280, height: 720 },
  { name: "desktop-standard", width: 1440, height: 900 },
];

test("Plan Profesional checkout modal stays scrollable across viewport sizes", async ({ page }) => {
  const guards = await attachPageGuards(page);
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/demo-plan-profesional/index.html#catalogo");
    await waitForAlpine(page);

    await page.evaluate(() => {
      const state = document.body._x_dataStack[0];
      state.cart = [state.servicesItems[0], state.servicesItems[1], state.servicesItems[2]];
      state.isCheckoutOpen = true;
      state.isCartOpen = false;
    });

    const modal = page.locator(".modal-content");
    const modalBody = page.locator(".modal-body");
    await expect(modal).toBeVisible();
    await expect(modalBody).toBeVisible();

    const metrics = await page.evaluate(() => {
      const modalNode = document.querySelector(".modal-content");
      const bodyNode = document.querySelector(".modal-body");
      const submitNode = [...document.querySelectorAll("button")].find((button) => button.textContent.trim() === "Enviar a WhatsApp");
      const cancelNode = [...document.querySelectorAll("button")].find((button) => button.textContent.trim() === "Cancelar");
      const modalRect = modalNode.getBoundingClientRect();
      const bodyRect = bodyNode.getBoundingClientRect();
      const submitRect = submitNode.getBoundingClientRect();
      const cancelRect = cancelNode.getBoundingClientRect();
      return {
        modalTop: modalRect.top,
        modalBottom: modalRect.bottom,
        modalViewportHeight: window.innerHeight,
        bodyOverflowY: window.getComputedStyle(bodyNode).overflowY,
        bodyClientHeight: bodyNode.clientHeight,
        bodyScrollHeight: bodyNode.scrollHeight,
        bodyTop: bodyRect.top,
        bodyBottom: bodyRect.bottom,
        submitBottom: submitRect.bottom,
        cancelBottom: cancelRect.bottom,
        viewportHeight: window.innerHeight,
      };
    });

    expect(["auto", "scroll"]).toContain(metrics.bodyOverflowY);
    expect(metrics.modalTop, viewport.name).toBeGreaterThanOrEqual(0);
    expect(metrics.modalBottom, viewport.name).toBeLessThanOrEqual(metrics.modalViewportHeight);
    expect(metrics.submitBottom, `${viewport.name} submit`).toBeLessThanOrEqual(metrics.viewportHeight);
    expect(metrics.cancelBottom, `${viewport.name} cancel`).toBeLessThanOrEqual(metrics.viewportHeight);

    if (metrics.bodyScrollHeight > metrics.bodyClientHeight) {
      await modalBody.evaluate((node) => {
        node.scrollTop = node.scrollHeight;
      });
    }

    await expect(page.getByRole("button", { name: "Enviar a WhatsApp" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancelar" })).toBeVisible();

    await guards.assertHealthyContext();
  }
});
