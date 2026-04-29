const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

test('Complete purchase flow successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://www.saucedemo.com/');

  // Login
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);

  // Add products
  await inventoryPage.addItem('Sauce Labs Backpack');
  await inventoryPage.addItem('Sauce Labs Bike Light');

  // Cart
  await inventoryPage.goToCart();
  await expect(page.locator('.cart_item')).toHaveCount(2);

  // Checkout
  await cartPage.checkout();
  await checkoutPage.fillInfo('John', 'Tester', '10110');

  // Verify pricing
  await expect(page.locator('.summary_total_label')).toBeVisible();

  // Complete order
  await checkoutPage.finishOrder();
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');

  // Logout
  await page.goto('https://www.saucedemo.com/inventory.html');
  await inventoryPage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
