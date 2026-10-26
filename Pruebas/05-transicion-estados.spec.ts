import { test, expect } from '@playwright/test';

test.describe('Punto 5: Transición de Estados', () => {

  test('TC1: Transición Válida (Pendiente -> Pagada)', async ({ page }) => {
    // 1. Iniciar sesión con el usuario que DEBE pagar la solicitud
    await page.goto('http://localhost:3000/signin');
    await page.getByLabel('Username').fill('jJuanMain'); 
    await page.getByLabel('Password').fill('31032025');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Navegar a la pestaña "Mine" (Mis transacciones)
    await page.locator('[data-test="nav-personal-tab"]').click();

    // 3. Buscar una transacción que esté en estado "Pending" y darle clic
    // (Asumimos que la base de datos de prueba (seed) tiene transacciones pendientes)
    const pendingTransaction = page.locator('li').filter({ hasText: 'requested' }).first();
    await pendingTransaction.click();

    // 4. Acción: Aceptar/Pagar la solicitud (Transición de estado)
    const acceptButton = page.locator('[data-test="transaction-accept-request-ObHeKhutn"]');
    await expect(acceptButton).toBeVisible();
    await acceptButton.click();

    // 5. Aserción (Guarda/Estado final): Verificar que el estado cambió
    // En la RWA el estado pagado suele mostrarse en un badge o ya no muestra el botón
    await expect(acceptButton).toBeHidden();
    // Podrías asertar el mensaje de éxito si la RWA lo muestra:
    // await expect(page.locator('text=Transaction Paid')).toBeVisible();
  });

  test('TC2: Transición Inválida (Intentar pagar una transacción ya Pagada)', async ({ page }) => {
    // 1. Iniciar sesión
    await page.goto('http://localhost:3000/signin');
    await page.getByLabel('Username').fill('jJuanMain');
    await page.getByLabel('Password').fill('31032025');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.locator('[data-test="nav-personal-tab"]').click();

    // 2. Buscar una transacción que YA esté procesada/pagada
    // SOLUCIÓN: Buscamos un ítem de transacción que NO tenga el texto 'pending'
    const completedTransaction = page.locator('[data-test^="transaction-item-"]')
      .filter({ hasNotText: 'pending' })
      .first();
    
    await completedTransaction.click();

    // 3. Aserción: Verificar que el botón de "Aceptar Solicitud" NO existe
    // Esto comprueba que la transición "Pagada -> Pagada" está bloqueada por la interfaz
    const acceptButton = page.locator('[data-test="transaction-accept-request"]');
    await expect(acceptButton).toBeHidden();
  });

});