import { expect, test } from "../../../fixtures/bussinesSteps";
import { EMPTY_TABLE_ROW, NOTIFICATIONS } from "ui/data/customers/notifications";
import { generateCustomerData } from "ui/data/customers/generate-customer";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should delete customer on Edit Customer Page", async ({
    loginLocalUser,
    homePage,
    customerPage,
    addCustomersPage,
    editCustomerPage,
  }) => {
    await loginLocalUser();

    await homePage.waitForOpened();
    await homePage.customerButton.click();
    await customerPage.waitForOpened();
    await customerPage.addCustomer();
    const dataUser = generateCustomerData();
    await addCustomersPage.fillInput(dataUser);
    await addCustomersPage.clickSaveNewCustomer();
    await addCustomersPage.waitForOpened();
    await addCustomersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customerPage.clickActionButton(dataUser.email, "edit");
    await editCustomerPage.waitForOpened()
    await editCustomerPage.clickDeleteCustomer()
    await editCustomerPage.deleteCUstomerModal.waitForOpened()
    await editCustomerPage.deleteCUstomerModal.clickDelete()
    await editCustomerPage.deleteCUstomerModal.waitForClosed()
    await addCustomersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customerPage.tableRowByEmail(dataUser.email)).not.toBeVisible()
    await customerPage.search(dataUser.email)
    await expect(customerPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW)
    
  });

  test("Should delete customer on Customer Page", async ({
    loginLocalUser,
    homePage,
    customerPage,
    addCustomersPage,
    editCustomerPage,
  }) => {
    await loginLocalUser();

    await homePage.waitForOpened();
    await homePage.customerButton.click();
    await customerPage.waitForOpened();
    await customerPage.addCustomer();
    const dataUser = generateCustomerData();
    await addCustomersPage.fillInput(dataUser);
    await addCustomersPage.clickSaveNewCustomer();
    await addCustomersPage.waitForOpened();
    await addCustomersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customerPage.clickActionButton(dataUser.email, "delete");
    await customerPage.deleteCUstomerModal.waitForOpened()
    await customerPage.deleteCUstomerModal.clickDelete()
    await customerPage.deleteCUstomerModal.waitForClosed()
    await addCustomersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customerPage.tableRowByEmail(dataUser.email)).not.toBeVisible()
    await customerPage.search(dataUser.email)
    await expect(customerPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW)
  });
});
