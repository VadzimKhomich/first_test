import {
  SALES_PORTAL_URL,
  USER_LOGIN,
  USER_PASSWORD,
} from "config/environment";
import { test as base } from "../fixtures/pages.fixture";

interface IBusunnesSteps {
  loginLocalUser(): Promise<void>;
}

export const test = base.extend<IBusunnesSteps>({
  loginLocalUser: async ({ page, homePage, signInPage }, use) => {
    await use(async () => {
      await signInPage.openPortal();
      await signInPage.fillCredentials({
        email: USER_LOGIN,
        password: USER_PASSWORD,
      });
      await signInPage.clickLogin();

      await homePage.waitForOpened();
    });
  },
});

export { expect } from "@playwright/test";
