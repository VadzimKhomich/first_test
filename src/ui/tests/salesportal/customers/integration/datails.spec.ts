import { apiConfig } from "config/api-config";
import { COUNTRIES } from "ui/data/customers/countries";
import { expect, test } from "ui/fixtures/bussinesSteps";
import { convertToDateAndTime } from "utils/date";

test.describe("[UI] [Customers] [Details]", async () => {
  test("Should display valid customer dtat", async ({
    customerDetailsPage,
    homePage,
    customerPage,
    loginLocalUser,
    mock,
    page,
  }) => {
    const expected = {
      email: "1742374793031Romaine.Keebler28@hotmail.com",
      name: "ArYdNbUxEbYkMhmgWBEpReOQmZgyXwkbtoy",
      country: "Great Britain" as COUNTRIES,
      city: "City pObKNUjAiTPtkDH",
      street: "Street u2oqBYeHT40t4PmZQcsCcjPicx5OJc8dh",
      house: 137,
      flat: 4568,
      phone: "+81463758682",
      createdOn: "2025-03-19T08:59:53.000Z",
      notes:
        "Notes afFPIXktpgJmYDrebRDqmJMCAfYveKuDpnmsNsjGVvjpQrrWsxZmkGXEbMPLoqNTGeTKwmOCWizzbgelFiXWusXqsUBSDjEsgllBIlePrgLZFBCFujkNpeUmuugrfXghQUcILcYTcfdzpOUcSTmFYANqyHBgDPXrmXqLYMOdItNfZWkrOztNsdDIuhsZFFXSAgyjbHYPKbdjuMuzsdfRxVvDVJiLfwMRUgAgxFoCzZjckRTpCcNl",
    };
    const id = "67da8789d006ba3d475eed7c";

    // await page.route(
    //   apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
    //   async (route) => {
    //     await route.fulfill({
    //       status: 200,
    //       contentType: "application/json",
    //       body: JSON.stringify({
    //         Customer: {
    //           _id: id,
    //           ...expected,
    //         },
    //         IsSuccess: true,
    //         ErrorMessage: null,
    //       }),
    //     });
    //   }
    // );

    // await page.route(/\/api\/customers(\?.*)?$/, async (route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: "application/json",
    //     body: JSON.stringify({
    //       Customers: [{
    //         _id: id,
    //         ...expected,
    //       }],
    //       IsSuccess: true,
    //       ErrorMessage: null,
    //       sorting: {
    //         sortField: "createdOn",
    //         sortOrder: "desc",
    //       },
    //     }),
    //   });
    // });
    // await mock.customers({
    //   Customers: [
    //     {
    //       _id: id,
    //       ...expected,
    //     },
    //   ],
    //   IsSuccess: true,
    //   ErrorMessage: null,
    //   sorting: {
    //     sortField: "createdOn",
    //     sortOrder: "desc",
    //   },
    // });

    await mock.customerDetailsbody({
      Customer: {
        _id: id,
        ...expected,
      },
      IsSuccess: true,
      ErrorMessage: null,
    });
    await loginLocalUser();
    // await homePage.clickModuleButton("Customers");
    // await customerPage.waitForOpened();
    // await customerPage.clickActionButton(
    //   "1742374793031Romaine.Keebler28@hotmail.com",
    //   "details"
    // );
    await customerDetailsPage.open(id)
    await customerDetailsPage.waitForOpened();
    const actual = await customerDetailsPage.getDetails();
    expect.soft(actual).toEqual({
      ...expected,
      createdOn: convertToDateAndTime(expected.createdOn),
    });
  });
});
