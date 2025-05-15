import { Locator, Page } from "@playwright/test";
import { SideMenuType } from "ui/types/side-menu";

export class SideMenuComponent {
  readonly salesPortalButton: Locator;
  readonly userDropDown: Locator;
  readonly signOutButton: Locator;
  constructor(protected page: Page) {
    this.salesPortalButton = this.page.locator("sapn.fs-4");
    this.userDropDown = this.page.locator("#dropdownUser1");
    this.signOutButton = this.page.locator("#signOut")
  }
  readonly menuItem = (itemName: SideMenuType) =>
    this.page.locator(`a[name=${itemName}]`);

  async clickMenuItem(itemName: SideMenuType) {
    await this.menuItem(itemName).click()
  }

  async openUserDropdown() {
    await this.userDropDown.click()
  }

  async clickSignOut() {
    this.signOutButton.click()
  }
}
