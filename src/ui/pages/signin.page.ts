import { Locator } from "@playwright/test";
import { SalesPortal } from "./Customers/sales-portal-page";
import { ICredentials } from "ui/types/signin.types";

export class SignPage extends SalesPortal {
    readonly emailInput = this.page.locator("#emailinput")
    readonly passwordInput = this.page.locator("#passwordinput")
    readonly loginButton = this.page.getByRole("button", {name: "Login"})
    uniqElement = this.loginButton

    async fillCredentials({email, password}: ICredentials) {
        email && await this.emailInput.fill(email)
        password && await this.passwordInput.fill(password)
    }

    async clickLogin() {
        await this.loginButton.click()
    }

}