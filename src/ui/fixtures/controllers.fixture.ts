import {test as base} from "@playwright/test"
import { CustomersController } from "controllers/customers.controller"

interface ISalesPortalControllers {
    customerController: CustomersController
}


export const test = base.extend<ISalesPortalControllers>({
    customerController: async({}, use) => {
        await use(new CustomersController())
    }
})

export { expect } from "@playwright/test";