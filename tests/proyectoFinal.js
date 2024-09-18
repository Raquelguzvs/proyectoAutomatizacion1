const {test, expect} = require("@playwright/test");
onst { test, expect } = require('@playwright/test');

test('Login válido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await.page.locator("#user-name");
    const barraPassword = await.page.locator("#password");
    barraUsername.fill("standard_user");
    barraPassword.fill("secret_sauce");
    await page.click("#login-button")

});

test('Login inválido', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const barraUsername = await.page.locator("#user-name");
    const barraPassword = await.page.locator("#password");
    barraUsername.fill("standard_user");
    barraPassword.fill("secret_sauco");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});