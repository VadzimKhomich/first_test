import {expect, test} from "../../../fixtures/bussinesSteps"

test.describe("[UI] [Csustomer] [Search]", async () => {
    test("Should search for existing customer by email", async ({loginLocalUser, homePage, customerPage}) => {
        await loginLocalUser()
        await homePage.clickModuleButton("Customers")
        await customerPage.waitForOpened()
        const expected ={
            email: "Vita_test@domain.com",
            name: "TestVitaUPDATE nNpZlwUdVsd",
            country: "Great Britain"
        }
        await customerPage.search("Vita_test@domain.com")
        await expect.soft(customerPage.tableRow).toHaveCount(1)
        const actual = await customerPage.getCustomerData(expected.email)
        expect.soft(actual).toMatchObject(expected)
        await expect.soft(customerPage.searchChipButton).toHaveText(expected.email)
    
    })
})