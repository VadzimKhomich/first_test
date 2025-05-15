import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import _ from "lodash";
import { generateCustomerData } from "ui/data/customers/generate-customer";
import { STATUS_CODES } from "ui/data/customers/statusCodes";
import { customerSchema } from "ui/data/shemas/customers/customer.shema";
import { validateShema } from "utils/validations/shema.validation";

test.describe("[API] [Customers] [Update]", async () => {
  test("Update customer with smoke data", async ({ request }) => {
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
    //create customer
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
    //update
    const updateCustomerData = generateCustomerData();
    const updateCustomerResponse = await request.put(
      apiConfig.BASE_URL +
        apiConfig.ENDPOINTS.CUSTOMER_BY_ID(bodyCustomer.Customer._id),
      {
        data: updateCustomerData,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const body = await updateCustomerResponse.json();
    validateShema(customerSchema, bodyCustomer);
    expect.soft(updateCustomerResponse.status()).toBe(STATUS_CODES.OK);
    expect
      .soft({ ...updateCustomerData })
      .toMatchObject(_.omit(body.Customer, "_id", "createdOn"));
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);

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
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });
});
