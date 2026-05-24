import { chromium } from "playwright-core";

async function getLocalBrowser() {
  const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  return await chromium.launch({ executablePath, headless: true });
}

(async () => {
  try {
    const browser = await getLocalBrowser();
    const context = await browser.newContext({
      recordVideo: {
        dir: "C:\\Users\\bnxth\\.gemini\\antigravity\\brain\\9fb0d178-98ab-41f1-9046-8fa69366c760",
        size: { width: 414, height: 896 },
      },
      viewport: { width: 414, height: 896 }, // Mobile size
    });
    const page = await context.newPage();
    page.on("console", (msg) => console.log("PAGE LOG:", msg.type(), msg.text()));
    page.on("pageerror", (error) => console.log("PAGE ERROR:", error.message));

    console.log("Navigating to top page...");
    await page.goto("http://localhost:3001", { waitUntil: "networkidle" });

    console.log("Clicking random session...");
    await page.click("text=ランダム演習");
    await page.waitForTimeout(1000);

    console.log("Selecting a choice...");
    // Just click the first choice
    await page.click("text=A");

    console.log("Waiting for explanation to appear...");
    await page.waitForTimeout(1000); // Give it time to read

    console.log("Scrolling down to simulate reading...");
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);

    console.log("Clicking next question...");
    await page.click("text=次の問題へ");

    // Wait for view transition to finish
    await page.waitForTimeout(1500);

    console.log("Done.");
    await context.close();
    await browser.close();
  } catch (e) {
    console.error("Script error:", e);
  }
})();
