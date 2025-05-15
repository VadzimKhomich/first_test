import { Locator, Page } from "@playwright/test";
import { ModulNameTypes } from "../types/home-page";
import { SalesPortal } from "./Customers/sales-portal-page";

export class HomePage extends SalesPortal {
  customerButton = this.page.getByRole("link", { name: "Customers" });
  ordersButton = this.page.getByRole("link", { name: "Orders" });
  productsButton = this.page.getByRole("link", { name: "Products" });
  uniqElement = this.page.locator(".welcome-text");

  async clickModuleButton(moduleName: ModulNameTypes) {
    const moduleNames: Record<ModulNameTypes, Locator> = {
        Customers: this.customerButton,
        Orders: this.ordersButton,
        Products: this.productsButton,
    }
    await moduleNames[moduleName].click()
}
}

