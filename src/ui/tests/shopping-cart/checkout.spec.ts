import test, { expect, Page } from "@playwright/test";

test.describe("[UI] [Demo Shopping Cart] [E2E]", () => {
  test("Successfylly checkout", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
    //card container selector "div.card"
    //button selector "//div[@class="card-body"][./h5[text()="Product 1"]]//button"
    await getAddToCardButton("Product 1", page).click();
    await getAddToCardButton("Product 3", page).click();
    await getAddToCardButton("Product 5", page).click();

    const [price1, price3, price5] = await Promise.all([
      getProductPrice("Product 1", page),
      getProductPrice("Product 3", page),
      getProductPrice("Product 5", page),
    ]);
    const total = price1 + price3 + price5
    await expect(page.locator("#badge-number")).toHaveText("3")
    await page.getByRole('button', {name: "Shopping Cart"}).click()
    await expect(page.locator("#total-price")).toHaveText(`$${total}.00`)


  });
});

function getAddToCardButton(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({ has: page.getByText(productName, { exact: true }) })
    .getByRole("button", { name: "Add to card" });
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({ has: page.getByText(productName, { exact: true }) })
    .locator("span");
}

async function getProductPrice(
  productName: string,
  page: Page
): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  const price = priceText.replace("$", "");
  return +price;
}
