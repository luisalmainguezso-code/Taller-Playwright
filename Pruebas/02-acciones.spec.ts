import { test } from '@playwright/test';

test('Punto 2: Interacción y múltiples acciones', async ({ page }) => {
  
  // Acción 1: goto() - Navegación a la URL
  await page.goto('http://localhost:3000/signin');

  // Acción 2: fill() - Inserta el texto directamente en el DOM (rápido)
  await page.getByLabel('Username').fill('jJuanMain');

  // Acción 3: pressSequentially() - Simula la pulsación tecla a tecla (eventos keydown/keyup)
  await page.getByLabel('Password').pressSequentially('31032025');

  // Acción 4: check() - Interacción para marcar una casilla de verificación
  // Buscamos el input tipo checkbox dentro del componente 'remember me'
  await page.locator('input[name="remember"]').check();

  // Acción 5: click() - Presionar un elemento accionable
  await page.getByRole('button', { name: 'Sign In' }).click();

  // (No colocamos aserciones aquí porque el enfoque es solo la acción de Playwright interactuando)
});