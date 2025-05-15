import { expect, Locator, Page } from "@playwright/test";
import { SALES_PORTAL_URL } from "config/environment";
import { NOTIFICATIONS } from "ui/data/customers/notifications";

export abstract class SalesPortal {
  spinner: Locator;
  notification: Locator;
  abstract uniqElement: Locator;
  constructor(protected page: Page) {
    this.spinner = this.page.locator(".spinner-border");
    this.notification = this.page.locator(".toast-body")
  }
  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  async waitForOpened() {
    await expect(this.uniqElement).toBeVisible();
    await this.waitForSpinner();
  }

  async waitForNotification(text: NOTIFICATIONS) {
    await expect(this.notification.last()).toHaveText(text);
  }

  async openPortal() {
    this.page.goto(SALES_PORTAL_URL);
  }


}
