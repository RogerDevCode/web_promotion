const { test, expect } = require('@playwright/test');
const { attachPageGuards } = require('./helpers');

test.describe('Exhaustive Tests for Demos 12 to 14 (Propuestas Comerciales)', () => {

  test.describe('Demo 12: Propuesta Empezar Simple (demo-propuesta-empezar-simple)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/demo-propuesta-empezar-simple/index.html');
    });

    test('Section navigation links and return to landing behavior', async ({ page }) => {
      const guards = await attachPageGuards(page);
      await expect(page.locator('h1')).toBeAttached();
      await expect(page.locator('h1')).toContainText('La web como vitrina que da ganas de comprar.');

      // Check section anchors
      const anchors = ['#propuesta', '#beneficios', '#inversion', '#contacto'];
      for (const href of anchors) {
        const link = page.locator(`a[href="${href}"]`).first();
        if (await link.count() > 0 && await link.isVisible()) {
          await link.click({ force: true });
          await expect(page).toHaveURL(new RegExp(`${href}$`));
        }
      }

      // Check return link (`../index.html#demos`)
      const returnLink = page.locator('a[href="../index.html#demos"]').first();
      await expect(returnLink).toBeAttached();
      await guards.assertHealthyContext();
    });
  });

  test.describe('Demo 13: Propuesta Atención Ordenada (demo-propuesta-atencion-ordenada)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/demo-propuesta-atencion-ordenada/index.html');
    });

    test('Interactive tab-panel switcher data binding (`agenda`, `catalogo`, `servicio`) across rapid clicks', async ({ page }) => {
      const guards = await attachPageGuards(page);
      await expect(page.locator('h1')).toBeAttached();

      // Test each tab button (`.tab-button`)
      const tabButtons = page.locator('.tab-button');
      const count = await tabButtons.count();
      expect(count).toBe(3);

      const expectedLabels = ['Agenda guiada', 'Catálogo con intención', 'Servicios filtrados'];
      
      for (let i = 0; i < count; i++) {
        const btn = tabButtons.nth(i);
        if (await btn.isVisible()) {
          await btn.click({ force: true });
          await page.waitForTimeout(100);

          // Verify active class assigned to button
          await expect(btn).toHaveClass(/active/);

          // Verify DOM targets `#tabLabel`, `#tabTitle`, `#tabText`, `#tabImage` updated cleanly
          const labelText = await page.locator('#tabLabel').textContent();
          expect(labelText?.trim()).toBe(expectedLabels[i]);

          const titleText = await page.locator('#tabTitle').textContent();
          expect(titleText?.length).toBeGreaterThan(5);

          const imgSrc = await page.locator('#tabImage').getAttribute('src');
          expect(imgSrc).toContain('../demo-');
        }
      }

      // Stress test rapid combinatorial toggling
      for (let i = 0; i < 6; i++) {
        if (await tabButtons.nth(i % 3).isVisible()) {
          await tabButtons.nth(i % 3).click({ force: true });
          await page.waitForTimeout(30);
        }
      }
      
      const finalTitle = await page.locator('#tabTitle').textContent();
      expect(finalTitle?.length).toBeGreaterThan(5);
      await guards.assertHealthyContext();
    });
  });

  test.describe('Demo 14: Propuesta Impacto Comercial (demo-propuesta-impacto-comercial)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/demo-propuesta-impacto-comercial/index.html');
    });

    test('Interactive client range slider real-time binding and boundary verification', async ({ page }) => {
      const guards = await attachPageGuards(page);
      await expect(page.locator('h1')).toBeAttached();

      const rangeInput = page.locator('#clients');
      const countSpan = page.locator('#clientCount');
      
      if (await rangeInput.count() > 0 && await countSpan.count() > 0 && await rangeInput.isVisible()) {
        const maxAttr = await rangeInput.getAttribute('max') || '12';
        const minAttr = await rangeInput.getAttribute('min') || '1';
        
        // Test boundary values within [1, 12] range
        const testValues = [minAttr, '4', '8', maxAttr];
        for (const val of testValues) {
          await rangeInput.fill(val, { force: true });
          await rangeInput.dispatchEvent('input');
          await page.waitForTimeout(50);
          const spanText = await countSpan.textContent();
          expect(spanText?.trim()).toBe(val);
        }
      }

      // Verify return to landing link
      const returnLink = page.locator('a[href="../index.html#demos"]').first();
      await expect(returnLink).toBeAttached();
      await guards.assertHealthyContext();
    });
  });
});
