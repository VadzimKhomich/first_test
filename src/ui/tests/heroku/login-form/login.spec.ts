import test, { expect } from "@playwright/test";

test.describe("[UI] [Demo login form] Registeration", () => {
  test("Succesfully registered witn min valid data", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
    await page.locator("#userNameOnRegister").fill("Ab!");
    await page.locator("#passwordOnRegister").fill("123Asdfg");
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(
      "Successfully registered! Please, click Back to return on login page"
    );
  });
});

interface RegistrationForm {
  testName: string;
  userName: string;
  password: string;
  message: string;
}

const registrationValidTest: RegistrationForm[] = [
  {
    testName: "Succesfully registered witn max valid data",
    userName: "Ab!rrrwddsdfssdf",
    password: "123Asdfgdsfssdf",
    message:
      "Successfully registered! Please, click Back to return on login page",
  },
  {
    testName: "Succesfully registered witn min valid data",
    userName: "Ab!r",
    password: "123Asdfg",
    message:
      "Successfully registered! Please, click Back to return on login page",
  },
];

// test.describe("[UI] [Demo LOgin Form] [Registartion] Positive scenarios", () => {
//   registrationValidTest.forEach(({ testName, userName, password, message }) => {
//     test(testName, async ({ page }) => {
//       await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
//       await page.locator("#registerOnLogin").click();
//       await page.locator("#userNameOnRegister").fill(userName);
//       await page.locator("#passwordOnRegister").fill(password);
//       await page.locator("#register").click();
//       await expect(page.locator("#errorMessageOnRegister")).toHaveText(
//        message
//       );
//       const localStorageData = await page.evaluate((userName: string) => {
//        return window.localStorage.getItem(userName)
//       }, userName)
//       expect(localStorageData).toBeTruthy()
//       const user = JSON.parse(localStorageData!)
//       expect(user).toMatchObject({
//         name: userName + "1",
//         password: password
//       })
//     });
//   });
// });


test.describe("[UI] [Demo LOgin Form] [Registartion] Positive scenarios", () => {
    registrationValidTest.forEach(({ testName, userName, password, message }) => {
      test(testName, async ({ page }) => {
        await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
        await page.locator("#registerOnLogin").click();
        const form = page.locator(".registerForm")
        await form.locator("#userNameOnRegister").fill(userName);
        await form.locator("#passwordOnRegister").fill(password);
        await form.locator("#register").click();
        await expect(page.locator("#errorMessageOnRegister")).toHaveText(
         message
        );
        const localStorageData = await page.evaluate((userName: string) => {
         return window.localStorage.getItem(userName)
        }, userName)
        expect(localStorageData).toBeTruthy()
        const user = JSON.parse(localStorageData!)
        expect(user).toMatchObject({
          name: userName + "1",
          password: password
        })
      });
    });
  });