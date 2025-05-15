import {expect, test} from "../../../fixtures/bussinesSteps"

test.describe("[UI] [Customers] [Edit]", async() => {
    test("Edit customer with smoke data", async ({loginLocalUser, homePage, customerPage, editCustomerPage}) => {
        await loginLocalUser()
        await homePage.clickModuleButton("Customers")
        await customerPage.waitForOpened()
        await customerPage.clickActionButton("julytest@gmail.com", 'edit')
        await editCustomerPage.waitForOpened()
        await editCustomerPage.fillInput({
            email: "dsdsd",
            // city: "@!#",
            // flat: 11111111111111111111111,
            // house: 11111111111111111111111111111,
            // name: "123!@#",
            // note: "<>",
            // phone: "123",
            // street: "123!@#"
        })
        const errors = await editCustomerPage.getFormErrors()
        console.log(errors)



    })
})