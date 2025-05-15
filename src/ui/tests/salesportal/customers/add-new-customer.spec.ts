import test, { expect } from "@playwright/test";
import { HomePage } from "../../../pages/home-page";
import { CustomerPage } from "../../../pages/Customers/customers";
import { AddNewCustomerPage } from "ui/pages/Customers/add-new-customer";
import { COUNTRIES } from "ui/data/customers/countries";
import { NOTIFICATIONS } from "ui/data/customers/notifications";
import { generateCustomerData } from "ui/data/customers/generate-customer";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Create customer with smoke data", async ({ page }) => {
    const homePage = new HomePage(page);
    const customerPage = new CustomerPage(page);
    const addCustomerPage = new AddNewCustomerPage(page);
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/");
    await page.locator("#emailinput").fill("vad");
    await page.locator("#passwordinput").fill("1q2w3e4r5t");
    await page.getByRole("button", { name: "Login" }).click();

    await homePage.waitForOpened();
    await homePage.customerButton.click();
    await customerPage.waitForOpened();
    await customerPage.addCustomer();
    const dataUser = generateCustomerData()
    await addCustomerPage.fillInput(dataUser);
    await addCustomerPage.clickSaveNewCustomer();
    await addCustomerPage.waitForOpened();
    await addCustomerPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
  });
});




