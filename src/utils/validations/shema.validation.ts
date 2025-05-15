import { expect } from "@playwright/test";
import Ajv from "ajv";
export function validateShema(expectedSchema: object, body: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(expectedSchema);
  const isValid = validate(body);
  if (!isValid) {
    console.log("Data is not valid according to the schema");
    console.log(validate.errors);
    expect(validate.errors, "Should not have schema errors").toMatchObject([])

  }
  expect(isValid, "Actual data does not math expected").toBe(true);
  
}
