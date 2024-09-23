import {test, expect} from '@playwright/test';

test('TC001: Login válido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const loginButton = await page.locator("#login-button");
    await barraUsername.click();
    await barraUsername.fill("standard_user");
    await barraPassword.click();
    await barraPassword.fill("secret_sauce");
    await loginButton.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test('TC002: Login inválido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const error = await page.locator("#login_button_container > div > form > div.error-message-container.error > h3");
    const loginButton = await page.locator("#login-button");
    await barraUsername.click();
    await barraUsername.fill("standard_user");
    await barraPassword.click();
    await barraPassword.fill("secret_sauco");
    await loginButton.click();
    await expect(error).toContainText("Epic sadface: Username and password do not match any user in this service");
});

test('TC003: Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = page.locator("#user-name");
    await barraUsername.fill("standard_user");
    const barraPassword = page.locator("#password");
    await barraPassword.fill("secret_sauce");
    const loginButton = page.locator("#login-button");
    await loginButton.click();
    await page.waitForTimeout(3000);
    const menu = page.locator("#react-burger-menu-btn");
    await menu.click();
    const botonLogout = page.locator("#logout_sidebar_link");
    await botonLogout.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test('TC004: Añadir al carrito 1', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const backpackAdd = await page.locator("#add-to-cart-sauce-labs-backpack");
    const carrito = await page.locator("#shopping_cart_container > a > span");
    const loginButton = await page.locator("#login-button");
    await barraUsername.click();
    await barraUsername.fill("standard_user");
    await barraPassword.click();
    await barraPassword.fill("secret_sauce");
    await loginButton.click();
    await backpackAdd.click();
    await expect(carrito).toContainText("1");
});

test('TC005: Añadir al carrito 2', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = page.locator("#user-name");
    await barraUsername.fill("standard_user");
    const barraPassword = page.locator("#password");
    await barraPassword.fill("secret_sauce");
    const loginButton = page.locator("#login-button");
    await loginButton.click();
    const backpack = await page.locator("#item_4_title_link");
    await backpack.click();
    const addBackpack = await page.locator("#add-to-cart");
    await addBackpack.click();
    const carrito = await page.locator("#shopping_cart_container > a > span");
    await expect(carrito).toContainText("1");
});


test('TC006: Eliminar del carrito', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    barraUsername.fill("standard_user");
    const barraPassword = await page.locator("#password");
    barraPassword.fill("secret_sauce");
    const loginButton = page.locator("#login-button");
    loginButton.click();
    const backpackAdd = await page.locator("#add-to-cart-sauce-labs-backpack");
    await backpackAdd.click();
    const removeBackpack = await page.locator("#remove-sauce-labs-backpack");
    await removeBackpack.click();
    const carrito = await page.locator("#shopping_cart_container > a > span");
    await expect(carrito).toBeHidden();
});


test('TC007: Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    await barraUsername.fill("standard_user");
    await barraPassword.fill("secret_sauce");
    await page.click("#login-button")
    const addBackpack = await page.locator("#add-to-cart-sauce-labs-backpack");
    await addBackpack.click();
    const carrito = await page.locator("#shopping_cart_container > a");
    await carrito.click();
    const checkout = await page.locator("#checkout");
    await checkout.click();
    const firstName = await page.locator("#first-name");
    await firstName.fill("Raquel");
    const lastName = await page.locator("#last-name");
    await lastName.fill("Guzman");
    const zip = await page.locator("#postal-code");
    await zip.fill("10901");
    const continueButton = await page.locator("#continue");
    await continueButton.click();
    const finish = await page.locator("#finish");
    await finish.click();
    const chekoutComplete = await page.locator("#checkout_complete_container > h2");
    await expect(chekoutComplete).toContainText("Thank you for your order!");
});

test('TC008: Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    await barraUsername.fill("standard_user");
    await barraPassword.fill("secret_sauce");
    await page.click("#login-button")
    const addBackpack = await page.locator("#add-to-cart-sauce-labs-backpack");
    await addBackpack.click();
    const carrito = await page.locator("#shopping_cart_container > a");
    await carrito.click();
    const checkout = await page.locator("#checkout");
    await checkout.click();
    const firstName = await page.locator("#first-name");
    await firstName.fill("Raquel");
    const lastName = await page.locator("#last-name");
    await lastName.fill("Guzman");
    const zip = await page.locator("#postal-code");
    await zip.fill("10901");
    const continueButton = await page.locator("#continue");
    await continueButton.click();
    const total = await page.locator("#checkout_summary_container > div > div.summary_info > div.summary_total_label");
    await expect(total).toContainText("Total: $32.39");

});