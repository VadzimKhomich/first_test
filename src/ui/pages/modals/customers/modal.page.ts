import { expect } from "@playwright/test";
import { SalesPortal } from "ui/pages/Customers/sales-portal-page"

export abstract class Modal extends SalesPortal {
    async waitForClosed() {
        await expect(this.uniqElement).not.toBeVisible();
      }
}