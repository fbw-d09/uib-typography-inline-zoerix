const puppeteer = require("puppeteer");
const path = require("path");

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) { }
  done();
});

describe("Format Dates", () => {
  it("Dates on Page should have superscripted ending", async () => {
    const dates = await page.$$("sup");
    expect(dates.length).toBeGreaterThan(3);
  });
});
describe('Font', () => {
  it("Dates in the paragraph with the class 'note' should be bold", async () => {
    const note = await page.$eval(".note *", (el) => getComputedStyle(el).fontWeight);
    expect(note).toBe("700");
  });
});
describe('Font style', () => {
  it("The paragraph with the class '.holidays' should be italicized.", async () => {
    const isItalic = await page.$eval(".holidays", (el) => getComputedStyle(el).fontStyle);
    expect(isItalic).toBe("italic");
  });
});
describe('External source', () => {
  it("Footer must contain a `<cite>` tag with wikepedia as source", async () => {
    const cite = await page.$eval("footer cite", (el) => el.innerHTML);
    expect(cite).toMatch(/wikipedia/i)
  });
});