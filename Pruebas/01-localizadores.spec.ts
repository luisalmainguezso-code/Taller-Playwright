import { test, expect } from '@playwright/test';

test('Punto 1: Uso de Localizadores recomendados', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');

  // 1. Localizador por Etiqueta (getByLabel): Ideal para campos de formulario (inputs).
  const usernameInput = page.getByLabel('Username');
  const passwordInput = page.getByLabel('Password');

  // 2. Localizador por Rol (getByRole): Ideal para botones, enlaces y accesibilidad.
  const signInButton = page.getByRole('button', { name: 'Sign In' });
  const signUpLink = page.getByRole('link', { name: 'Sign Up' });

  // 3. Localizador CSS por atributo (Locator genérico): 
  // La app RWA usa 'data-test' en lugar de 'data-testid' por defecto.
  const rememberMeCheckbox = page.locator('[data-test="signin-remember-me"]');

  // Hacemos una aserción simple solo para comprobar que los localizadores funcionan
  await expect(usernameInput).toBeVisible();
  await expect(signInButton).toBeVisible();
});