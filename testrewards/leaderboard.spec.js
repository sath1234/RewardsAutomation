const { test, chromium, expect } = require('@playwright/test');

test.setTimeout(120000);

// ================= CONFIG =================
const REWARDS_URL = "https://rewards.santabrowser.com";
const CLID = "8da91acc7b09930";

// ================= LOCATORS =================
const RANK = "//nav[@class='flex-1 pr-1']//span[text()='Rank']";

const WEEKLY_BTN = "//button[normalize-space()='weekly' or normalize-space()='Weekly']";
const MONTHLY_BTN = "//button[normalize-space()='monthly' or normalize-space()='Monthly']";
const YEARLY_BTN = "//button[normalize-space()='yearly' or normalize-space()='Yearly']";
const ALL_BTN = "//button[normalize-space()='all' or normalize-space()='All']";

// ================= API ENDPOINTS =================
const BASE_API = `https://api.santabrowser.com/quests/bff/v1/leaderboard/${CLID}`;

const API = {
    weekly: `${BASE_API}?period=weekly`,
    monthly: `${BASE_API}?period=monthly`,
    yearly: `${BASE_API}?period=yearly`,
    all: `${BASE_API}?period=all`
};

// ================= SAFE CLICK =================
async function safeClick(page, xpath, name) {
    const locator = page.locator(xpath).first();

    await locator.waitFor({
        state: "visible",
        timeout: 30000
    });

    await locator.scrollIntoViewIfNeeded();
    await locator.click({ force: true });

    console.log(`Clicked: ${name}`);

    await page.waitForTimeout(1500);
}

// ================= API CALL =================
async function fetchLeaderboard(period) {
    try {
        const res = await fetch(API[period]);
        const json = await res.json();

        console.log(`\n📡 ${period.toUpperCase()} API RESPONSE:`);
        console.log(json);

        return json;

    } catch (err) {
        console.log(`❌ API Error (${period}):`, err);
        return null;
    }
}

// ================= VALIDATION =================
function validateResponse(data, period) {
    expect(data).not.toBeNull();

    console.log(`\n✅ VALIDATION FOR ${period.toUpperCase()}`);

    if (data?.period) {
        console.log("Period:", data.period);
    }

    if (data?.ready !== undefined) {
        console.log("Ready:", data.ready);
    }

    console.log("Leaderboard entries:", Array.isArray(data?.data) ? data.data.length : "N/A");
}

// ================= TEST =================
test('Rank Leaderboard UI + API Flow', async () => {

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

    // ================= OPEN APP =================
    await page.goto(REWARDS_URL, {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(5000);

    // ================= UI FLOW =================
    await safeClick(page, RANK, "Rank");

    await safeClick(page, WEEKLY_BTN, "Weekly UI");
    const weeklyData = await fetchLeaderboard("weekly");
    validateResponse(weeklyData, "weekly");

    await safeClick(page, MONTHLY_BTN, "Monthly UI");
    const monthlyData = await fetchLeaderboard("monthly");
    validateResponse(monthlyData, "monthly");

    await safeClick(page, YEARLY_BTN, "Yearly UI");
    const yearlyData = await fetchLeaderboard("yearly");
    validateResponse(yearlyData, "yearly");

    await safeClick(page, ALL_BTN, "All UI");
    const allData = await fetchLeaderboard("all");
    validateResponse(allData, "all");

    // ================= SCREENSHOT =================
    await page.screenshot({
        path: "rank_leaderboard_full_flow.png",
        fullPage: true
    });

    console.log("\n🎉 Rank + Leaderboard API validation completed");

    await browser.close();
});