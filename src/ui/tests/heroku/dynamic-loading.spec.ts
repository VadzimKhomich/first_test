import test, { expect } from "@playwright/test";
import { TIMEOUT } from "dns";

test.describe("[UI], [Heroku] Dynamic Loading", () => {
  test("Open page", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    const dynamicLoadingLInk = page.getByRole("link", {
      name: "Dynamic Loading",
    });
    await dynamicLoadingLInk.click();
    await page.pause();
  });

  test("Get by text", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    const dynamicLoadingLInk = page.getByText("Form Authentication", {
      exact: true,
    });
    await dynamicLoadingLInk.click();
    await page.getByRole("button", { name: " Login" }).click();
    await page.pause();
  });

  test("Get by lable", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    const dynamicLoadingLInk = page.getByText("Form Authentication", {
      exact: true,
    });
    await dynamicLoadingLInk.click();
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    await page.pause();
  });

  test("Get by placegolder", async ({ page }) => {
    //precondition (arrange)
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    await page.getByPlaceholder("Enter a valid email address").fill("first");
    await page.getByPlaceholder("Enter password").fill("second");
    await page.getByRole("button", { name: "Login" }).click();
    await page.pause();
  });

  test("Click start with auto-waiting", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    const dynamicLoadingLInk = page.getByRole("link", {
      name: "Dynamic Loading",
    });
    await dynamicLoadingLInk.click();
    await page
      .getByRole("link", { name: "Example 1: Element on page that is hidden" })
      .click();
    await page.getByRole("button", { name: "Start" }).click();
    const element = page.getByRole("heading", { name: "Hello world" });
    // const message = await page.getByRole("heading", {name: "Hello world"}).innerText()
    // expect(message).toBe("Hello World!")
    await expect(element).toBeVisible({ timeout: 20000 });
    await expect(element).toHaveText("Hello World!");
  });

  test("Click start with explicit ewaiting", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    const dynamicLoadingLInk = page.getByRole("link", {
      name: "Dynamic Loading",
    });
    await dynamicLoadingLInk.click();
    await page
      .getByRole("link", { name: "Example 1: Element on page that is hidden" })
      .click();
    await page.getByRole("button", { name: "Start" }).click();
    // const element = page.getByRole("heading", { name: "Hello world" });
    const element = page.locator("#finish h4");
    // const message = await page.getByRole("heading", {name: "Hello world"}).innerText()
    // expect(message).toBe("Hello World!")
    // await expect(element).toBeVisible({timeout: 20000});
    // await expect(element).toHaveText("Hello World!");
    await element.waitFor({ state: "visible", timeout: 20000 });
    const message = await element.innerText();
    expect(message).toBe("Hello World!");
    await expect(element).toHaveText("Hello World!");
  });

  test("Click start with Timeout", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    // const loginlink = page.locator('href="/dynamic_loading"')
    const dynamicLoadingLInk = page.getByRole("link", {
      name: "Dynamic Loading",
    });
    await dynamicLoadingLInk.click();
    await page
      .getByRole("link", { name: "Example 1: Element on page that is hidden" })
      .click();
    await page.getByRole("button", { name: "Start" }).click();
    // const element = page.getByRole("heading", { name: "Hello world" });
    const element = page.locator("#finish h4");
    // const message = await page.getByRole("heading", {name: "Hello world"}).innerText()
    // expect(message).toBe("Hello World!")
    // await expect(element).toBeVisible({timeout: 20000});
    // await expect(element).toHaveText("Hello World!");
    await page.waitForTimeout(20000);

    await expect(element).toHaveText("Hello World!");
  });

  test("custom wait", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls")
    await page.locator("#checkbox-example > button").click()
    
    await page.waitForFunction(() => {
      const checkbox = document.querySelector('input[label="blah"]')
      const buttonText = document.querySelector("#checkbox-example > button")?.textContent
      const message = document.querySelector("#checkbox-example > #message")?.textContent

      return !checkbox && buttonText === "Add" && message === "It's gone!"
    }, '', {
      timeout: 20000
    })
  });

  test.only("custom wai44", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com")
    const header = page.getByRole("heading", {name: "Welcome to the-internet"})
    await expect(header).toHaveScreenshot()
    
  });

});
