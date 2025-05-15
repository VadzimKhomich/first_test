import { faker } from "@faker-js/faker";
import { ICustomer } from "ui/types/cusomer-types";
import { COUNTRIES } from "./countries";
import { getRandromEnumValue } from "utils/enum.utils";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: `safddsxxfdfsdxxfj${Date.now()}@gmail.com`,
    name: `test ${faker.string.alpha(35)}`,
    country: getRandromEnumValue(COUNTRIES),
    city: `city ${faker.string.alpha(15)}`,
    street: `street ${faker.string.alpha(10)}`,
    house: faker.number.int(999),
    flat: faker.number.int(999),
    phone: `+${faker.number.int({min: 1000000000, max: 9999999999})}`,
    note: `Notes ${faker.string.alpha(244)}`,
    ...params
  };
}
