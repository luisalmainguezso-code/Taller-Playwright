import { test, expect } from '@playwright/test';

// 1. Definimos la Tabla de Decisión como un arreglo de objetos (Reglas)
const decisionTable = [
  // Regla 1: Todo correcto -> Botones habilitados
  { amount: '50', note: 'Cena', expectedEnabled: true, testName: 'Monto y nota válidos' },
  // Regla 2: Falta monto -> Botones deshabilitados
  { amount: '', note: 'Cena', expectedEnabled: false, testName: 'Monto vacío' },
  // Regla 3: Falta nota -> Botones deshabilitados
  { amount: '50', note: '', expectedEnabled: false, testName: 'Nota vacía' },
  // Regla 4: Todo vacío -> Botones deshabilitados
  { amount: '', note: '', expectedEnabled: false, testName: 'Monto y nota vacíos' },
];

test.describe('Punto 4: Tabla de Decisión - Nueva Transacción', () => {

  // Pre-condición: Iniciar sesión y llegar al formulario de transacción antes de cada prueba
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/signin');
    await page.getByLabel('Username').fill('jJuanMain');
    await page.getByLabel('Password').fill('31032025');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Clic en "New Transaction"
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    // Seleccionar el primer usuario de la lista
    await page.locator('[data-test^="user-list-item-"]').first().click();
  });

  // 2. Ejecutamos la prueba iterando sobre la tabla de decisión
  for (const record of decisionTable) {
    test(`Regla: ${record.testName}`, async ({ page }) => {
      
      // SOLUCIÓN: Agregar ' input' al final del localizador
      if (record.amount) {
        await page.locator('[data-test="transaction-create-amount-input"] input').fill(record.amount);
      }
      
      if (record.note) {
        await page.locator('[data-test="transaction-create-description-input"] input').fill(record.note);
      }

      const payButton = page.locator('[data-test="transaction-create-submit-payment"]');

      if (record.expectedEnabled) {
        await expect(payButton).toBeEnabled();
      } else {
        await expect(payButton).toBeDisabled();
      }
    });
  }
});