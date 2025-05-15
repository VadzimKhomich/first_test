const expected = [
  {
    "Last Name": "Smith",
    "First Name": "John",
    Email: "jsmith@gmail.com",
    Due: "$50.00",
    "Web Site": "http://www.jsmith.com",
  },
  {
    "Last Name": "Bach",
    "First Name": "Frank",
    Email: "fbach@yahoo.com",
    Due: "$51.00",
    "Web Site": "http://www.frank.com",
  },
  {
    "Last Name": "Doe",
    "First Name": "Jason",
    Email: "jdoe@hotmail.com",
    Due: "$100.00",
    "Web Site": "http://www.jdoe.com",
  },
  {
    "Last Name": "Conway",
    "First Name": "Tim",
    Email: "tconway@earthlink.net",
    Due: "$50.00",
    "Web Site": "http://www.timconway.com",
  },
];

import test, { expect } from "@playwright/test";

test.describe("[UI][Heroku][table]", async () => {
  test("table  1", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    const table1 = page.locator("#table1");
    const headers = await table1.locator("thead th").allInnerTexts();
    console.log(headers);
    headers.pop();

    const rows = await table1.locator("tbody tr").all();
    console.log(rows);

    const data = await Promise.all(
      rows.map(async (row) => {
        const cellText = await row.locator("td").allInnerTexts();
        cellText.pop();

        return cellText.reduce((acc, cell, index) => {
          acc[headers[index]] = cell;
          return acc;
        }, {} as Record<string, string>);
      })
    );
    expect(data.length, `Number of rows actual tables to be expected`).toBe(
      expected.length
    );
    data.forEach((row, index) => {
      expect.soft(row).toMatchObject(expected[index]);
    });
  });

  test("some test", async ({ page }) => {
    await page.goto("https://www.sports.ru/");
    const table = page.locator(".gadget-table");
    const headers = await table.locator("tbody th").allInnerTexts();
    const rows = await table.locator("tbody tr").all();
    console.log(headers)
    console.log(rows);

    const data = await Promise.all(
      rows.map(async (row) => {
        const rowsElement = await row.locator("td").allInnerTexts();

        return rowsElement.reduce((acc, el, index) => {
          acc[headers[index]] = el
          return acc
        }, {} as Record<string, string>)
      })
    );
    console.log(data);
  });
});
