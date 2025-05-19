import { apiConfig } from "config/api-config";
import { COUNTRIES } from "ui/data/customers/countries";
import { expect, test } from "ui/fixtures/bussinesSteps";
import { customersSortField, sortDirection } from "ui/types/api.types";
import { convertToDateAndTime } from "utils/date";

test.describe("[UI] [Customers] [Details]", async () => {
  const customer = {
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
    _id: "67da8789d006ba3d475eed7c",
  };

  const fields: customersSortField[] = [
    "createdOn",
    "email",
    "name",
    "country",
  ];
  const directions: sortDirection[] = ["desc", "asc"];

  fields.forEach((field) => {
    directions.forEach((direction) => {
      test(`Should display correct sorting ${field} field and ${direction} direction`, async ({
        customerDetailsPage,
        customerPage,
        loginLocalUser,
        mock,
        page,
      }) => {
        await mock.customers({
          Customers: [
            {
              ...customer,
            },
          ],
          IsSuccess: true,
          ErrorMessage: null,
          sorting: {
            sortField: field,
            sortOrder: direction,
          },
        });
        await loginLocalUser();
        await customerPage.open();
        await customerPage.waitForOpened();
        await expect(customerPage.table).toHaveScreenshot();
      });
    });
  });

  test("should send correct query clicking on CreatedOn header", async ({
    customerPage,
    loginLocalUser,
    page,
  }) => {
    await loginLocalUser();
    await customerPage.open();
    await customerPage.waitForOpened();
    const [request] = await Promise.all([
      page.waitForRequest((request) =>
        request.url().includes(apiConfig.ENDPOINTS.CUSTOMERS)
      ),
      customerPage.clickTableHeader("createdOn"),
    ]);
    expect(request.url()).toBe(
      `${apiConfig.BASE_URL}/${apiConfig.ENDPOINTS.CUSTOMERS}?sortField=createdOn&sortOrder=asc`
    );
  });
});
