const { test, chromium } = require('@playwright/test');

test.setTimeout(120000);

// ================= CONFIG =================
const REWARDS_URL = "https://rewards.santabrowser.com";
const CLID = "8da91acc7b09930";

// ================= LOCATORS =================
const REFERRAL_INPUT =
"//aside[@class='hidden lg:flex lg:flex-col lg:gap-4']//input[@placeholder='Have a referral code?']";

const APPLY_BUTTON =
"//button[text()='Apply']";

// ================= DATA =================
const SEARCH_NAMES = [
    "Balaji",
    "Sathya",
    "Esther Shajitha",
    "Mahesh",
    "Dhanesh"
];

// ================= HELPER =================
async function click(page, xpath, name) {
    const el = page.locator(xpath).first();

    await el.waitFor({
        state: "visible",
        timeout: 30000
    });

    await el.scrollIntoViewIfNeeded();
    await el.click({ force: true });

    console.log("Clicked:", name);
}

// ================= TEST =================
test('Referral Search with CLID', async () => {

    const browser = await chromium.launch({
        headless: false,
        executablePath: "C:\\Users\\DELL\\AppData\\Local\\Santa\\Application\\santa.exe"
    });

    const context = await browser.newContext();

    // ================= ADD CLID COOKIE =================
    await context.addCookies([
        {
            name: "clid",
            value: CLID,
            domain: "rewards.santabrowser.com",
            path: "/"
        }
    ]);

    const page = await context.newPage();

    // Open site
    await page.goto(REWARDS_URL, {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(5000);

    // Loop referral names
    for (const name of SEARCH_NAMES) {

        console.log(`\n🔍 Searching: ${name}`);

        const input = page.locator(REFERRAL_INPUT).first();

        await input.waitFor({
            state: "visible",
            timeout: 30000
        });

        await input.fill("");
        await page.waitForTimeout(500);

        await input.fill(name);

        console.log("Typed:", name);

        await click(page, APPLY_BUTTON, "Apply");

        await page.waitForTimeout(3000);
    }

    await page.screenshot({
        path: "referral_search_clid.png",
        fullPage: true
    });

    console.log("📸 Done");

    await browser.close();
});