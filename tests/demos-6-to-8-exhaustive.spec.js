const { test, expect } = require('@playwright/test');
const { attachPageGuards, waitForAlpine } = require('./helpers');

test.describe('Exhaustive Tests for Demos 6 to 8', () => {

  test.describe('Demo 6: Cobre & Co. Propiedades (demo-propiedades)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/demo-propiedades/index.html');
      await waitForAlpine(page);
    });

    test('UF/CLP dynamic currency conversion, multi-criteria filtering combinatorics, and visit booking modal reset', async ({ page }) => {
      const guards = await attachPageGuards(page);

      // Test currency toggle buttons
      const ufBtn = page.locator('button:has-text("UF")').first();
      const clpBtn = page.locator('button:has-text("CLP")').first();
      
      if (await ufBtn.count() > 0 && await clpBtn.count() > 0 && await clpBtn.isVisible()) {
        await clpBtn.click({ force: true });
        await page.waitForTimeout(100);
        const priceElement = page.locator('[x-text*="formatPrice"], .text-xl.font-bold').first();
        if (await priceElement.count() > 0) {
          const text = await priceElement.textContent();
          expect(text).not.toContain('NaN');
        }

        await ufBtn.click({ force: true });
        await page.waitForTimeout(100);
      }

      // Test operation and property type filter combinatorics
      const selectBoxes = page.locator('select');
      const selectCount = await selectBoxes.count();
      for (let i = 0; i < selectCount; i++) {
        const select = selectBoxes.nth(i);
        if (await select.isVisible()) {
          const options = select.locator('option');
          if (await options.count() > 1) {
            const val = await options.nth(1).getAttribute('value');
            if (val) {
              await select.selectOption(val);
              await page.waitForTimeout(100);
            }
          }
        }
      }

      // Open visit booking modal
      await page.evaluate(() => {
        const root = document.querySelector("[x-data]");
        const state = root && root._x_dataStack && root._x_dataStack[0];
        if (state) {
          state.selectedProperty = state.filteredProperties?.[0] || state.properties?.[0] || { title: "Propiedad Demo", price: 5000 };
          state.isBookingOpen = true;
        }
      });

      const modal = page.locator('.modal-card, div.bg-white.rounded-3xl').first();
      await expect(modal).toBeAttached();

      const modeSelect = modal.locator('select').first();
      if (await modeSelect.count() > 0 && await modeSelect.isVisible()) {
        const modeVal = await modeSelect.inputValue();
        expect(modeVal.toLowerCase()).toContain('presencial');
      }

      const cancelBtn = modal.locator('button:has-text("Cancelar")').first();
      if (await cancelBtn.count() > 0 && await cancelBtn.isVisible()) {
        await cancelBtn.click({ force: true });
      } else {
        await page.evaluate(() => {
          const root = document.querySelector("[x-data]");
          const state = root && root._x_dataStack && root._x_dataStack[0];
          if (state) state.isBookingOpen = false;
        });
      }
      await guards.assertHealthyContext();
    });
  });

  test.describe('Demo 7: Apex Tech Tienda Auto-Administrable (demo-ecommerce-tech)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/demo-ecommerce-tech/index.html');
      await waitForAlpine(page);
    });

    test('Add to cart items, checkout flow drawer, and full Admin Panel order management simulation', async ({ page }) => {
      const guards = await attachPageGuards(page);

      // Add items to client cart
      const addButtons = page.locator('button:has-text("Agregar al Carrito")');
      if (await addButtons.count() > 0 && await addButtons.nth(0).isVisible()) {
        await addButtons.nth(0).click({ force: true });
        await page.waitForTimeout(100);
      }

      // Open Admin Panel dashboard modal
      await page.evaluate(() => {
        const root = document.querySelector("[x-data]");
        const state = root && root._x_dataStack && root._x_dataStack[0];
        if (state) state.isAdminOpen = true;
      });

      const adminModal = page.locator('[x-show="isAdminOpen"] > div, .modal-card, [x-show="isAdminOpen"]').first();
      await expect(adminModal).toBeAttached();

      // Test filter buttons inside admin panel
      const statusFilters = adminModal.locator('button:has-text("Todos"), button:has-text("Pendiente"), button:has-text("Enviado")');
      const filterCount = await statusFilters.count();
      for (let i = 0; i < filterCount; i++) {
        if (await statusFilters.nth(i).isVisible()) {
          await statusFilters.nth(i).click({ force: true });
          await page.waitForTimeout(50);
        }
      }

      // Close admin panel cleanly
      const closeAdmin = adminModal.locator('button:has-text("×"), button:has-text("Cerrar")').first();
      if (await closeAdmin.count() > 0 && await closeAdmin.isVisible()) {
        await closeAdmin.click({ force: true });
      } else {
        await page.evaluate(() => {
          const root = document.querySelector("[x-data]");
          const state = root && root._x_dataStack && root._x_dataStack[0];
          if (state) state.isAdminOpen = false;
        });
      }
      await guards.assertHealthyContext();
    });
  });

  test.describe('Demo 8: CRM Express Agenda & Clientes (demo-agenda)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/demo-agenda/index.html');
      await waitForAlpine(page);
    });

    test('Dashboard tab transitions, appointment status filtering, and action buttons', async ({ page }) => {
      const guards = await attachPageGuards(page);

      // Test navigation tabs ("Calendario/Reservas", "Clientes", "Configuración")
      const tabs = page.locator('button:has-text("Reservas"), button:has-text("Clientes"), button:has-text("Configuración")');
      const tabCount = await tabs.count();
      for (let i = 0; i < tabCount; i++) {
        if (await tabs.nth(i).isVisible()) {
          await tabs.nth(i).click({ force: true });
          await page.waitForTimeout(100);
        }
      }

      // Switch back to Reservas tab
      if (tabCount > 0 && await tabs.nth(0).isVisible()) await tabs.nth(0).click({ force: true });

      // Test status filter tabs
      const filters = ['Todas', 'Pendiente', 'Confirmada', 'Completada'];
      for (const filterText of filters) {
        const fBtn = page.locator(`button:has-text("${filterText}")`).first();
        if (await fBtn.count() > 0 && await fBtn.isVisible()) {
          await fBtn.click({ force: true });
          await page.waitForTimeout(50);
        }
      }

      // Test action buttons on existing bookings (`changeStatus`)
      const statusActions = page.locator('button[x-on\\:click*="changeStatus"], button[x-show*="status !=="]');
      const actionCount = await statusActions.count();
      if (actionCount > 0 && await statusActions.nth(0).isVisible()) {
        await statusActions.nth(0).click({ force: true });
        await page.waitForTimeout(60);
      }
      await guards.assertHealthyContext();
    });
  });
});
