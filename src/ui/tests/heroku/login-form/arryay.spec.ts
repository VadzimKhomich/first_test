import test, { expect } from "@playwright/test";

test.describe("[UI] [Heroku] [Links", async () => {
  test("array links", async function ({ page }) {
    await page.goto("https://the-internet.herokuapp.com/");
    const links = await page.locator("a").all();
    // const linksWithText = links.filter(async (link) => {
    //     const linkText = await link.innerText()
    //     console.log(link)
    //     return linkText.trim()
    const linksArray = await Promise.all(links.map((el) => el.innerText()))
    console.log(linksArray)
  });
});
