import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";

import { generateCustomerData } from "ui/data/customers/generate-customer";
import { STATUS_CODES } from "ui/data/customers/statusCodes";

test.describe("[API] [Customer] [Delete]", () => {
  test("Should delete customer", async ({ request }) => {
    //login
    const loginResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
      {
        data: { username: USER_LOGIN, password: USER_PASSWORD },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const headers = loginResponse.headers();
    const token = headers["authorization"];
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    //create
    const customerData = generateCustomerData();
    const customerResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS,
      {
        data: customerData,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const bodyCustomer = await customerResponse.json();
    expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);
    //Delete
    const response = await request.delete(
      apiConfig.BASE_URL +
        apiConfig.ENDPOINTS.CUSTOMER_BY_ID(bodyCustomer.Customer._id),
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const deletedBody = await response.text();
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    expect.soft(deletedBody).toBe("")
  });
});
