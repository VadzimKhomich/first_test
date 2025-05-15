import { expect, Locator } from "@playwright/test";
import { SalesPortal } from "ui/pages/Customers/sales-portal-page";
import { Modal } from "./modal.page";

export class FilterModal extends Modal {
  readonly uniqElement = this.page.locator("div[role='dialog']");
  readonly title = this.uniqElement.locator(".modal-title");
  readonly applyButton = this.uniqElement.getByRole("button", {
    name: "Apply",
  });
  readonly clearFiltersButton = this.uniqElement.getByRole("button", {
    name: "Clear Filters",
  });
  readonly closeButton = this.uniqElement.locator('button[aria-label="Close"]');
  readonly checkbox = (name: string) =>
    this.uniqElement.locator(`input[value="${name}"]`);

  async checkFilters(...value: string[]) {
    for (const v of value) {
      await this.checkbox(v).check();
    }
  }

  async clickApply() {
    await this.applyButton.click();
  }
  async clickClearFilters() {
    await this.clearFiltersButton.click();
  }

  async clickClose() {
    await this.closeButton.click();
    await expect(this.uniqElement).not.toBeVisible();
  }

}
