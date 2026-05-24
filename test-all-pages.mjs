import { chromium } from "playwright-core";
import fs from "fs";

async function run() {
  const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const browser = await chromium.launch({ executablePath, headless: true });

  const pages = [
    { url: "/", name: "top" },
    { url: "/categories", name: "categories" },
    { url: "/records", name: "records" },
    { url: "/settings", name: "settings" },
  ];

  let hasErrors = false;

  for (const { url, name } of pages) {
    console.log(`\nTesting ${url} ...`);
    const page = await browser.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        console.log(`[CONSOLE ${msg.type().toUpperCase()} on ${name}]`, msg.text());
        if (msg.type() === "error" && !msg.text().includes("favicon.ico")) {
          hasErrors = true;
        }
      }
    });

    page.on("pageerror", (error) => {
      console.error(`[PAGE ERROR on ${name}]`, error.message);
      hasErrors = true;
    });

    try {
      await page.goto(`http://localhost:3001${url}`, { waitUntil: "networkidle", timeout: 15000 });
      await page.waitForTimeout(2000); // Wait for dynamic rendering
      const artifactPath = `C:\\Users\\bnxth\\.gemini\\antigravity\\brain\\5e360a12-acf4-47e6-a237-aff99df6bf0d\\screenshot-${name}.png`;
      await page.screenshot({ path: artifactPath, fullPage: true });
      console.log(`Saved screenshot to ${artifactPath}`);
    } catch (e) {
      console.error(`Failed to load ${url}:`, e.message);
      hasErrors = true;
    }
    await page.close();
  }

  await browser.close();

  if (hasErrors) {
    console.log("\nFinished with errors.");
    process.exit(1);
  } else {
    console.log("\nFinished successfully.");
  }
}

run();
