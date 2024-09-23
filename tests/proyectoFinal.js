const {test, expect} = require("@playwright/test");

test('TC001: Login válido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const loginButton = await page.locator("#login-button");
    barraUsername.click();
    barraUsername.fill("standard_user");
    barraPassword.click();
    barraPassword.fill("secret_sauce");
    loginButton.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test('TC002: Login inválido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const error = await page.locator("#login_button_container > div > form > div.error-message-container.error > h3");
    const loginButton = await page.locator("#login-button");
    barraUsername.click();
    barraUsername.fill("standard_user");
    barraPassword.click();
    barraPassword.fill("secret_sauco");
    loginButton.click();
    await expect(error).toContainText("Epic sadface: Username and password do not match any user in this service");
});

test('TC003: Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const loginButton = await page.locator("#login-button");
    const menu = await page.locator("#react-burger-menu-btn");
    const botonLogout = await page.locator ("#logout_sidebar_link");
    barraUsername.click();
    barraUsername.fill("standard_user");
    barraPassword.click();
    barraPassword.fill("secret_sauce");
    loginButton.click();
    menu.click();
    botonLogout.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
});

test('TC004: Añadir al carrito 1', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const backpackAdd = await page.locator("#add-to-cart-sauce-labs-backpack");
    const carrito = await page.locator("#shopping_cart_container > a > span");
    const loginButton = await page.locator("#login-button");
    barraUsername.click();
    barraUsername.fill("standard_user");
    barraPassword.click();
    barraPassword.fill("secret_sauce");
    loginButton.click();
    backpackAdd.click();
    await expect(carrito).toContainText("1");
});

test('TC005: Añadir al carrito 2', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const backpack = await page.locator("#item_4_title_link > div");
    const carrito = await page.locator("#shopping_cart_container > a > span");
    const loginButton = await page.locator("#login-button");
    const addBackpack = await page.locator("#add-to-cart");
    barraUsername.click();
    barraUsername.fill("standard_user");
    barraPassword.click();
    barraPassword.fill("secret_sauce");
    loginButton.click();
    backpack.click();
    addBackpack.click();
    await expect(carrito).toContainText("1");
});

test('TC006: Eliminar del carrito', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    const backpackAdd = await page.locator("#add-to-cart-sauce-labs-backpack");
    const carrito = await page.locator("#shopping_cart_container > a > span");
    const loginButton = await page.locator("#login-button");
    const removeBackpack = await page.locator("#remove-sauce-labs-backpack");
    barraUsername.click();
    barraUsername.fill("standard_user");
    barraPassword.click();
    barraPassword.fill("secret_sauce");
    loginButton.click();
    backpackAdd.click();
    removeBackpack.click();
    await expect(carrito).toContainText(""); *******************************
});

test('TC007: Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    barraUsername.fill("standard_user");
    barraPassword.fill("secret_sauce");
    await page.click("#login-button")
    const addBackpack = await page.locator("#add-to-cart-sauce-labs-backpack");
    addBackpack.click();
    const carrito = await page.locator("#shopping_cart_container > a");
    carrito.click();
    const checkout = await page.locator("#checkout");
    checkout.click();
    const firstName = await page.locator("#first-name");
    firstName.fill("Raquel");
    const lastName = await page.locator("#last-name");
    lastName.fill("Guzman");
    const zip = await page.locator("#postal-code");
    zip.fill("10901");
    const continueButton = await page.locator("#continue");
    continueButton.click();
    const finish = await page.locator("#finish");
    finish.click();
    const chekoutComplete = await page.locator("#checkout_complete_container > h2");
    await expect(chekoutComplete).toContainText("Thank you for your order!");
});

test('TC008: Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await page.locator("#user-name");
    const barraPassword = await page.locator("#password");
    barraUsername.fill("standard_user");
    barraPassword.fill("secret_sauce");
    await page.click("#login-button")
    const addBackpack = await page.locator("#add-to-cart-sauce-labs-backpack");
    addBackpack.click();
    const carrito = await page.locator("#shopping_cart_container > a");
    carrito.click();
    const checkout = await page.locator("#checkout");
    checkout.click();
    const firstName = await page.locator("#first-name");
    firstName.fill("Raquel");
    const lastName = await page.locator("#last-name");
    lastName.fill("Guzman");
    const zip = await page.locator("#postal-code");
    zip.fill("10901");
    const continueButton = await page.locator("#continue");
    continueButton.click();
    const total = await page.locator("#checkout_summary_container > div > div.summary_info > div.summary_total_label");
    await expect(total).toContainText("Total: $32.39");p
});