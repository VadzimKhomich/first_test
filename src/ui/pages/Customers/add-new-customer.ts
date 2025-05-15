import { Locator, Page } from "@playwright/test";
import { ICustomer } from "ui/types/cusomer-types";
import { SalesPortal } from "./sales-portal-page";

export class AddNewCustomerPage extends SalesPortal {
  emailInput = this.page.locator("#inputEmail");
  nameInput = this.page.locator("#inputName");
  countryuInput = this.page.locator("#inputCountry");
  cityInput = this.page.locator("#inputCity");
  streetInput = this.page.locator("#inputStreet");
  houseInput = this.page.locator("#inputHouse");
  flatInput = this.page.locator("#inputFlat");
  phoneInput = this.page.locator("#inputPhone");
  notesInput = this.page.locator("#textareaNotes");
  saveNewCustomer = this.page.locator("#save-new-customer");
  uniqElement = this.page.getByText("Customers List ", { exact: true })
 

  async fillInput(customer: Partial<ICustomer>) {
    customer.email && (await this.emailInput.fill(customer.email));
    customer.name && (await this.nameInput.fill(customer.name));
    customer.country &&
      (await this.countryuInput.selectOption(customer.country));
    customer.city && (await this.cityInput.fill(customer.city));
    customer.street && (await this.streetInput.fill(customer.street));
    customer.house && (await this.houseInput.fill(customer.house.toString()));
    customer.flat && (await this.flatInput.fill(customer.flat.toString()));
    customer.phone && (await this.phoneInput.fill(customer.phone));
    customer.note && (await this.notesInput.fill(customer.note));
  }

  async clickSaveNewCustomer() {
    this.saveNewCustomer.click();
  }
}
