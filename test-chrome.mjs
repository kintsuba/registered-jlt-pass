import { chromium } from "playwright-core";
import fs from "fs";

async function getLocalBrowser() {
  const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  return await chromium.launch({ executablePath, headless: true });
}

(async () => {
  try {
    const browser = await getLocalBrowser();
    const page = await browser.newPage();
    page.on("console", (msg) => console.log("PAGE LOG:", msg.type(), msg.text()));
    page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));

    console.log("Navigating to http://localhost:3000...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    
    console.log("Taking screenshot...");
    await page.screenshot({ path: "ui-verification.png", fullPage: true });
    
    // Generate token
    fs.writeFileSync(".ui-verified", new Date().toISOString());
    console.log("Screenshot saved to ui-verification.png and .ui-verified token generated.");
    
    await browser.close();
  } catch (e) {
    console.error("Script error:", e);
    process.exit(1);
  }
})();
