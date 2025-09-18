// scraper.js
// A simple Puppeteer web scraper example

const puppeteer = require("puppeteer");

async function scrapeQuotes() {
  // Launch browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to demo site
  await page.goto("http://quotes.toscrape.com/");

  // Extract data
  const quotes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".quote")).map((quote) => ({
      text: quote.querySelector(".text").innerText,
      author: quote.querySelector(".author").innerText,
      tags: Array.from(quote.querySelectorAll(".tags .tag")).map(
        (tag) => tag.innerText
      ),
    }));
  });

  console.log(quotes);

  await browser.close();
}

scrapeQuotes();
