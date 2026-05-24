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

    // Let's create a session, answer a question, and interrupt
    console.log("Clicking random session...");
    await page.click("text=ランダム演習");
    await page.waitForURL(/\/session\/.*/);

    // Wait for question to load
    await page.waitForTimeout(1000);

    // Click choice A
    console.log("Clicking choice A...");
    await page.click("text=A");
    await page.waitForTimeout(500);

    // Click Next
    console.log("Clicking next question...");
    await page.click("text=次の問題へ");
    await page.waitForTimeout(1000);

    // Click X to interrupt
    console.log("Interrupting session...");
    await page.click("header button"); // The X button

    // Click OK on the custom confirmation dialog
    console.log("Accepting confirmation dialog...");
    await page.click("text=OK");

    await page.waitForURL("http://localhost:3000/");
    await page.waitForTimeout(1000);

    // Dump localstorage
    const ls = await page.evaluate(() => localStorage.getItem("jlt-sessions"));
    console.log("LOCALSTORAGE:", ls);

    // Click Resume Session
    console.log("Clicking resume session...");
    await page.click("text=中断した演習を再開");
    await page.waitForURL(/\/session\/.*/);
    await page.waitForTimeout(1000);

    console.log("Taking screenshot of resumed session...");
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
