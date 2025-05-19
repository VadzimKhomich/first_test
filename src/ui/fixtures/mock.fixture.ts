import { Page, test as base } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "ui/data/customers/statusCodes";
import { ICustomerResponse, ICUstomersResponse } from "ui/types/cusomer-types";

class Mock {
  constructor(private page: Page) {}
  async customers(
    body: ICUstomersResponse,
    statusCode: STATUS_CODES = STATUS_CODES.OK
  ) {
    this.page.route(/\/api\/customers(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }

  async customerDetailsbody(
    body: ICustomerResponse,
    statusCode: STATUS_CODES = STATUS_CODES.OK
  ) {
    this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(body.Customer._id), async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }
}

export interface ISortingMockOptions {
  sortField: string;
  sortDir: string;
}

interface MockFixture {
    mock: Mock
}

export const test = base.extend<MockFixture>({
    mock: async({page}, use) => {
        await use(new Mock(page))
    }
})

export { expect } from "@playwright/test";