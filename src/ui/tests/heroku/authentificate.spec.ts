import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] Authentification", () => {
  const validCadentials = {
    userName: "tomsmith",
    password: "SuperSecretPassword!",
  };
  test.beforeEach(async ({ page }) => {
    //arrange
    await page.goto("https://the-internet.herokuapp.com/");
    const loginLink = page.locator('[href="/login"]');
    await loginLink.click();
  });

  test("Shoud authentificate with valid cadentials", async ({ page }) => {
    //act
    await page.locator("#username").fill(validCadentials.userName);
    await page.locator("#password").fill(validCadentials.password);
    await page.locator('button[type="submit"]').click();
    //assert
    const notification = page.locator("div[data-alert]");
    await expect(notification).toContainText("You logged into a secure area!");
  });

  test("Authentification check secure page", async ({ page }) => {
    await page.locator("#username").fill(validCadentials.userName);
    await page.locator("#password").fill(validCadentials.password);
    await page.locator('button[type="submit"]').click();

    //action
    const notification = page.locator("div[data-alert]");
    const pageTitle = page.locator("h2");
    const pageDescription = page.locator("h4.subheader");
    const logOutButton = page.locator('a[href="/logout"]');

    await expect(notification).toHaveText(" You logged into a secure area!\n×");
    await expect(pageTitle).toHaveText(" Secure Area");
    await expect(pageDescription).toHaveText(
      "Welcome to the Secure Area. When you are done click logout below."
    );
    await expect(logOutButton).toBeVisible();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/secure");
  });

  test("Should NOT authentificate with invalid name", async ({ page }) => {
    await page.locator("#username").fill(validCadentials.userName + "123");
    await page.locator("#password").fill(validCadentials.password);
    await page.locator('button[type="submit"]').click();

    const notification = page.locator("#flash");
    await expect(notification).toHaveText(" Your username is invalid!\n×");
  });

  test("Should NOT authentificate with invalid password", async ({ page }) => {
    await page.locator("#username").fill(validCadentials.userName);
    await page.locator("#password").fill(validCadentials.password + "123");
    await page.locator('button[type="submit"]').click();

    const notification = page.locator("#flash");
    await expect(notification).toHaveText(" Your password is invalid!\n×");
  });
});
