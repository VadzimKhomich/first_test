import { Locator } from "@playwright/test";
import { SalesPortal } from "ui/pages/Customers/sales-portal-page";
import { ICustomer } from "ui/types/cusomer-types";
import { DeleteCustomersModal } from "./delete.modal";

export class EditCustomerPage extends SalesPortal {
  //Modals
  deleteCUstomerModal = new DeleteCustomersModal(this.page)
  //inputs
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
  saveChangesButton = this.page.getByRole("button", { name: "Save Changes" });
  deleteCustomerButton = this.page.getByRole("button", {
    name: "Delete Customer",
  });
  uniqElement = this.saveChangesButton;
  //Errors
  emailError = this.page.locator("#error-inputEmail");
  nameError = this.page.locator("#error-inputName");
  cityError = this.page.locator("#error-inputCity");
  houseError = this.page.locator("#error-inputHouse");
  phoneError = this.page.locator("#error-inputPhone");
  streetError = this.page.locator("#error-inputStreet");
  flatError = this.page.locator("#error-inputFlat");
  noteError = this.page.locator("#error-textareaNotes");

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

  async clickSaveChanges() {
    await this.saveChangesButton.click();
  }

  async clickDeleteCustomer() {
    await this.deleteCustomerButton.click();
  }

  async getInputValues() {
    const [email, name, city, house, phone, street, flat, note] =
      await Promise.all([
        this.emailInput.inputValue(),
        this.nameInput.inputValue(),
        this.cityInput.inputValue(),
        this.houseInput.inputValue(),
        this.phoneInput.inputValue(),
        this.streetInput.inputValue(),
        this.flatInput.inputValue(),
        this.notesInput.inputValue(),
      ]);

    return { email, name, city, house, phone, street, flat, note };
  }

  async getFormErrors() {
    return {
      email: (await this.emailError.isVisible())
        ? await this.emailError.innerText()
        : null,
      name: (await this.nameError.isVisible())
        ? await this.nameError.innerText()
        : null,
      city: (await this.cityError.isVisible())
        ? await this.cityError.innerText()
        : null,
      house: (await this.houseError.isVisible())
        ? await this.houseError.innerText()
        : null,
      phone: (await this.phoneError.isVisible())
        ? await this.phoneError.innerText()
        : null,
      street: (await this.streetError.isVisible())
        ? await this.streetError.innerText()
        : null,
      flat: (await this.flatError.isVisible())
        ? await this.flatError.innerText()
        : null,
      note: (await this.noteError.isVisible())
        ? await this.noteError.innerText()
        : null,
    };
  }
}
