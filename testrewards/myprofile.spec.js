const { test, chromium } = require('@playwright/test');

test.setTimeout(120000);

// ===============================================
// CONFIG
// ===============================================

const REWARDS_URL = "https://rewards.santabrowser.com";
const CLID = "8da91acc7b09930";

// ===============================================
// LOCATORS
// ===============================================

const PROFILE_BUTTON =
"(//button[@aria-label='Open profile overview'])[2]";

const EDIT_USERNAME =
"[aria-label='Edit username']";

const SAVE_BUTTON =
"//button[text()='Save']";

const CLOSE_BUTTON =
"//button[@aria-label='Close']";

// ===============================================
// CLICK FUNCTION
// ===============================================

async function clickElement(page, locator, name) {

    console.log(`Clicking ${name}`);

    const element = page.locator(locator).first();

    await element.waitFor({
        state: "visible",
        timeout: 20000
    });

    await element.scrollIntoViewIfNeeded();

    await element.click({ force: true });

    console.log(`${name} clicked`);

    await page.waitForTimeout(2000);
}

// ===============================================
// TEST
// ===============================================

test('Profile Save Test', async () => {

    const browser = await chromium.launch({
        headless: false,
        executablePath: "C:\\Users\\DELL\\AppData\\Local\\Santa\\Application\\santa.exe"
    });

    const context = await browser.newContext();

    await context.addCookies([
        {
            name: "clid",
            value: CLID,
            domain: "rewards.santabrowser.com",
            path: "/"
        }
    ]);

    const page = await context.newPage();

    // Open Rewards Page
    await page.goto(REWARDS_URL, {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(5000);

    // Click Profile
    await clickElement(page, PROFILE_BUTTON, "Profile");

    // Click Edit Username
    await clickElement(page, EDIT_USERNAME, "Edit Username");

    // Click Save
    await clickElement(page, SAVE_BUTTON, "Save");

    // Wait
    await page.waitForTimeout(3000);

    // Close
    await clickElement(page, CLOSE_BUTTON, "Close");

    console.log("Profile Save Test Completed Successfully.");

    await browser.close();
});