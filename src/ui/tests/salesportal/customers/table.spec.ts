// import test, { expect } from "@playwright/test";
// import {test, expect} from "ui/fixtures/pages.fixture"
import {test, expect} from "ui/fixtures/bussinesSteps"
import _ from "lodash";
import { HomePage } from "../../../pages/home-page";
import { CustomerPage } from "../../../pages/Customers/customers";
import { AddNewCustomerPage } from "ui/pages/Customers/add-new-customer";
import { COUNTRIES } from "ui/data/customers/countries";
import { NOTIFICATIONS } from "ui/data/customers/notifications";
import { generateCustomerData } from "ui/data/customers/generate-customer";
import { beforeEach } from "node:test";
import { FilterModal } from "ui/pages/modals/customers/filter-modal";
import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "config/environment";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should check created customer in table", async ({ page, customerPage, homePage, addCustomersPage, loginLocalUser }) => {
    //Preconditions
    // await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/");
    // await page.locator("#emailinput").fill("vad");
    // await page.locator("#passwordinput").fill("1q2w3e4r5t");
    // await page.getByRole("button", { name: "Login" }).click();

    // await homePage.waitForOpened();
    await loginLocalUser()
    await homePage.customerButton.click();
    await customerPage.waitForOpened();
    await customerPage.addCustomer();
    const dataUser = generateCustomerData();
    await addCustomersPage.fillInput(dataUser);
    await addCustomersPage.clickSaveNewCustomer();
    await addCustomersPage.waitForOpened();
    await addCustomersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    //Act
    await customerPage.waitForOpened();
    await expect(customerPage.tableRowByEmail(dataUser.email)).toBeVisible();
    //Assert
    // await expect.soft(customerPage.emailCell(dataUser.email)).toHaveText(dataUser.email)
    // await expect.soft(customerPage.nameCell(dataUser.email)).toHaveText(dataUser.name)
    // await expect.soft(customerPage.countryCell(dataUser.email)).toHaveText(dataUser.country)

    const actualCustomerData = await customerPage.getCustomerData(
      dataUser.email
    );
    expect(actualCustomerData).toEqual(
      _.pick(dataUser, ["email", "name", "country"])
    );
    await customerPage.clickActionButton(dataUser.email, "delete");
  });

  test("Should check filtered by country table", async ({ page }) => {
    const homePage = new HomePage(page);
    const customerPage = new CustomerPage(page);
    const addCustomerPage = new AddNewCustomerPage(page);
   
    await page.goto(SALES_PORTAL_URL);
    await page.locator("#emailinput").fill(USER_LOGIN);
    await page.locator("#passwordinput").fill(USER_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customerPage.waitForOpened();
    await customerPage.clickFilter();
    await customerPage.filterModal.waitForOpened();
    const countriesToCheck = ["USA", "Belarus", "Germany"];
    await customerPage.filterModal.checkFilters(...countriesToCheck);
    await customerPage. filterModal.clickApply();
    await customerPage.filterModal.waitForClosed();
    await customerPage.waitForOpened();
    const actualTableData = await customerPage.getTableData();
    expect(
      actualTableData.every((row) => countriesToCheck.includes(row.country)),
      `Expect table to contain only cystomers from ${countriesToCheck}`
    ).toBe(true);
  });
});
