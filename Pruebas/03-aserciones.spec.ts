import { test, expect } from '@playwright/test';

test('Punto 3: Aserciones tras ejecutar un flujo', async ({ page }) => {
  // --- PRECONDICIÓN (El flujo del paso anterior) ---
  await page.goto('http://localhost:3000/signin');
  await page.getByLabel('Username').fill('jJuanMain');
  await page.getByLabel('Password').fill('31032025');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // --- ASERCIONES ---

  // 1. Aserción Genérica (Navegación): Verificar que la URL cambió al dashboard principal
  await expect(page).toHaveURL('http://localhost:3000/');

  // 2. Aserción de Estado: Verificar que el botón de "New" transacción esté visible en el header
  const newTransactionBtn = page.locator('[data-test="nav-top-new-transaction"]');
  await expect(newTransactionBtn).toBeVisible();

  // 3. Aserción de Contenido: Verificar que el nombre de usuario aparece en el menú lateral
  const sidenavUsername = page.locator('[data-test="sidenav-username"]');
  await expect(sidenavUsername).toContainText('@jJuanMain');

  // 4. Aserción de Estado (Oculto): Verificar que el formulario de login ya NO está en la pantalla
  const signInForm = page.locator('form');
  await expect(signInForm).toBeHidden();
});