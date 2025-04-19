import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] Dropdown", async () => {
 test.beforeEach(async ({ page }) => {
     //arrange
     await page.goto("https://the-internet.herokuapp.com/");
     const loginLink = page.locator('[href="/dropdown"]');
     await loginLink.click();
   });

   test("Should select option 1", async ({page}) => {
    const dropdown = page.locator("#dropdown")
    await (dropdown).selectOption('Option 1')
    await expect(dropdown).toHaveValue('1')
   })

   test("Should select option 2", async ({page}) => {
    const dropdown = page.locator("#dropdown")
    await (dropdown).selectOption("2")
    await expect(dropdown).toHaveValue('2')
   })
});
