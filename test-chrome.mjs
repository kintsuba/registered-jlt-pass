import { chromium } from "playwright-core";

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

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    console.log("Done");
    await browser.close();
  } catch (e) {
    console.error("Script error:", e);
  }
})();
