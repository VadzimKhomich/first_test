import { test as base } from "../fixtures/mock.fixture";
import { AddNewCustomerPage } from "ui/pages/Customers/add-new-customer";
import { CustomerDetailsPage } from "ui/pages/Customers/customer.details";
import { CustomerPage } from "ui/pages/Customers/customers";
import { HomePage } from "ui/pages/home-page";
import { EditCustomerPage } from "ui/pages/modals/customers/edit-customer.page";
import { SideMenuComponent } from "ui/pages/side-menu";
import { SignPage } from "ui/pages/signin.page";

interface ISalesPortalPages {
  homePage: HomePage;
  addCustomersPage: AddNewCustomerPage;
  customerPage: CustomerPage;
  signInPage: SignPage;
  editCustomerPage: EditCustomerPage;
  sideBar: SideMenuComponent;
  customerDetailsPage: CustomerDetailsPage, 
}

export const test = base.extend<ISalesPortalPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  customerPage: async ({ page }, use) => {
    await use(new CustomerPage(page));
  },

  addCustomersPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignPage(page));
  },
  editCustomerPage: async ({ page }, use) => {
    await use(new EditCustomerPage(page));
  },
  sideBar: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },

  customerDetailsPage: async ({ page }, use) => {
    await use(new CustomerDetailsPage(page));
  },
});

export { expect } from "@playwright/test";
