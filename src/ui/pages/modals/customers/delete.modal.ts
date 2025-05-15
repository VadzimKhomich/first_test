import { expect, test } from "../../../fixtures/pages.fixture";
import { Modal } from "./modal.page";

export class DeleteCustomersModal extends Modal {
  readonly modalContainer = this.page.locator("div[role='dialog']");
  readonly deleteButton = this.modalContainer.getByRole("button", {
    name: "Yes, Delete",
  });
  readonly cancelButton = this.modalContainer.getByRole("button", {
    name: "Cancel",
  });
  readonly title = this.modalContainer.locator(".modal-title");
  readonly closeButton = this.modalContainer.locator(
    'button[aria-label="Close"]'
  );
  uniqElement = this.deleteButton;

   async clickClose() {
      await this.closeButton.click();
      await this.waitForClosed()
    }

    async clickDelete() {
        await this.deleteButton.click()
    }

    async clickCancel() {
        await this.cancelButton.click()
    }
}
