import { expect, test } from "../../../ui/fixtures/controllers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "ui/data/customers/generate-customer";
import _ from "lodash";
import { validateShema } from "utils/validations/shema.validation";
import { customerSchema } from "ui/data/shemas/customers/customer.shema";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "ui/data/customers/statusCodes";
import { validateResponse } from "utils/validations/responseValidation";

test.describe("[API] [Customers] [POST]", async () => {
  let id = "";
  let token = "";
  test.skip("Create customer with smoke data", async ({ request, customerController }) => {
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
    token = headers["authorization"];
    const body = await loginResponse.json();
    const expectedUser = {
      username: "vad",
      firstName: "Vadzim",
      lastName: "Khomich",
    };
    // status
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    // token
    expect.soft(token).toBeTruthy();
    // json shema

    // response
    expect.soft(body.User).toMatchObject(expectedUser);
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);

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
    id = bodyCustomer.Customer._id;
    expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);
    validateShema(customerSchema, bodyCustomer);
    expect
      .soft({ ...customerData })
      .toMatchObject(_.omit(bodyCustomer.Customer, "_id", "createdOn"));
    expect.soft(bodyCustomer.ErrorMessage).toBe(null);
    expect.soft(bodyCustomer.IsSuccess).toBe(true);

    const response = await request.delete(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test("Create customer with smoke data and controller", async ({
    request, customerController
  }) => {
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
    token = headers["authorization"];
    const body = await loginResponse.json();
    const expectedUser = {
      username: "vad",
      firstName: "Vadzim",
      lastName: "Khomich",
    };
    // status
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    // token
    expect.soft(token).toBeTruthy();
    // json shema

    // response
    expect.soft(body.User).toMatchObject(expectedUser);
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);

    const customerData = generateCustomerData();
    const customerResponse = await customerController.create(customerData, token);
    id = customerResponse.body.Customer._id;

    validateShema(customerSchema, customerResponse.body);
    expect
      .soft({ ...customerData })
      .toMatchObject(
        _.omit(customerResponse.body.Customer, "_id", "createdOn")
      );
    validateResponse(customerResponse, STATUS_CODES.CREATED, true, null)
  });

  test.afterEach(async ({customerController}) => {
    if (!id) return;
    const response = await customerController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});
