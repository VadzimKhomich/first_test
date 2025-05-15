import { Locator, Page } from "@playwright/test";
import { SalesPortal } from "./sales-portal-page";
import { ICustomer, ICustomerInTable } from "ui/types/cusomer-types";
import { COUNTRIES } from "ui/data/customers/countries";
import { FilterModal } from "../modals/customers/filter-modal";
import { DeleteCustomersModal } from "../modals/customers/delete.modal";

export class CustomerPage extends SalesPortal {
  readonly deleteCUstomerModal = new DeleteCustomersModal(this.page)
  addCustomerButton = this.page.getByRole("button", { name: "+ Add Customer" });
  uniqElement = this.addCustomerButton;
  readonly searchInput = this.page.locator("input[type='search']")
  readonly searchButton = this.page.locator("#search-customer")
  readonly chipButton = this.page.locator(".chip")
  readonly searchChipButton = this.page.locator('div[data-chip-customers="search"]')

  


  readonly filterModal = new FilterModal(this.page)
  readonly tableRow = this.page.locator("#table-customers tbody tr");
  readonly tableHeader = this.page.locator("#table-customers th div");
  readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });
  readonly filterButton = this.page.getByRole("button", { name: "Filter" });

  readonly tableRowByEmail = (email: string) =>
    this.tableRow.filter({ has: this.page.getByText(email) });

  readonly emailCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(1)");
  readonly nameCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(2)");
  readonly countryCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(3)");
  readonly createdOnCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(4)");
  readonly editButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Delete");

  readonly emptyTableRow = this.page.locator("td.fs-italic")

  async addCustomer() {
    await this.addCustomerButton.click();
  }

  async clickDeleteCustomer(customerEmail: string) {
    await this.deleteButton(customerEmail).click();
  }

  async clickFilter() {
    this.filterButton.click();
  }

  async clickActionButton(
    customerEmail: string,
    action: "edit" | "details" | "delete"
  ) {
    const buttons = {
      edit: this.editButton(customerEmail),
      delete: this.deleteButton(customerEmail),
      details: this.detailsButton(customerEmail),
    };

    await buttons[action].click();
  }

  async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
    //variant1
    // return {
    //   email: await this.emailCell(email).textContent(),
    //   name: await this.nameCell(email).textContent(),
    //   country: await this.countryCell(email).textContent(),
    //   createdOn: await this.createdOnCell(email).textContent()
    // }

    //variant2
    // const [email, name, country, createdOn] = await Promise.all([
    //   this.emailCell(customerEmail).textContent(),
    //   this.nameCell(customerEmail).textContent(),
    //   this.countryCell(customerEmail).textContent(),
    //   this.createdOnCell(customerEmail).textContent(),
    // ]);
    // return { email, name, country, createdOn };

    //variant3
    const [email, name, country] = await this.tableRowByEmail(customerEmail)
      .locator("td")
      .allInnerTexts();
    return { email, name, country: country as COUNTRIES };
  }

  async getTableData() {
    const tableData: Array<ICustomerInTable> = [];
    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country] = await row.locator("td").allInnerTexts();
      tableData.push({ email, name, country: country as COUNTRIES });
    }
    return tableData;
  }

  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value))
  }

  async clickSearch() {
    await this.searchButton.click()
  }

  async search(value: string | number) {
    await this.fillSearch(value)
    await this.clickSearch()
    await this.waitForOpened()
  }
}
