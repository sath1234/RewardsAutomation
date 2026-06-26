const { test, chromium } = require('@playwright/test');

test.setTimeout(120000);

// ==================================================
// CONFIG
// ==================================================

const REWARDS_URL = "https://rewards.santabrowser.com";

// ==================================================
// XPATHS
// ==================================================

const MY_REWARDS_CATEGORY =
"(//*[@class='group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 text-foreground/80 hover:bg-accent/50 hover:text-foreground'])[3]";

const TRANSACTION_HISTORY =
"(//*[@class='inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-accent hover:text-accent-foreground px-3 h-7 rounded-full text-xs whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background opacity-80'])[1]";

const QUEST_CATEGORY =
"(//*[@class='inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-accent hover:text-accent-foreground px-3 h-7 rounded-full text-xs whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background opacity-80'])[2]";

const EVENT_AWARDS =
"//div[@class='inline-flex w-max gap-2 whitespace-nowrap md:gap-0 md:rounded-full md:border md:p-1 md:bg-white/70 md:dark:bg-white/10']/button[text()='Event Awards']";

const CLICKS =
"//div[@class='flex items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible min-w-0 flex-1']/button[text()='Clicks']";

const IMPRESSIONS =
"//div[@class='flex items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible min-w-0 flex-1']/button[text()='Impressions']";

const MISC =
"//div[@class='flex items-center gap-2 overflow-x-auto pb-1 flex-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible min-w-0 flex-1']/button[text()='Misc']";

const QUEST_COMPLETIONS =
"//div[@class='inline-flex w-max gap-2 whitespace-nowrap md:gap-0 md:rounded-full md:border md:p-1 md:bg-white/70 md:dark:bg-white/10']/button[text()='Quest Completions']";

const REFERRAL_REWARDS =
"//div[@class='inline-flex w-max gap-2 whitespace-nowrap md:gap-0 md:rounded-full md:border md:p-1 md:bg-white/70 md:dark:bg-white/10']/button[text()='Referral Rewards']";

const PLAYWALL_HISTORY =
"//div[@class='inline-flex w-max gap-2 whitespace-nowrap md:gap-0 md:rounded-full md:border']/button[text()='Playwall history']";

const CASHBACK_HISTORY =
"//div[@class='inline-flex w-max gap-2 whitespace-nowrap md:gap-0 md:rounded-full md:border']/button[text()='Cashback history']";

// ==================================================
// COMMON CLICK FUNCTION
// ==================================================

async function clickElement(page, xpath, name) {
    console.log(`Clicking ${name}`);

    const locator = page.locator(xpath).first();

    await locator.waitFor({
        state: "visible",
        timeout: 15000
    });

    await locator.scrollIntoViewIfNeeded();

    await locator.click({
        force: true
    });

    await page.waitForTimeout(2000);

    console.log(`${name} clicked`);
}

// ==================================================
// TEST
// ==================================================

test('My Rewards Categories Test', async () => {

    const browser = await chromium.launch({
        headless: false,
        executablePath: "C:\\Users\\DELL\\AppData\\Local\\Santa\\Application\\santa.exe"
    });

    const context = await browser.newContext();

    await context.addCookies([
        {
            name: "clid",
            value: "8da91acc7b09930",
            domain: "rewards.santabrowser.com",
            path: "/"
        }
    ]);

    const page = await context.newPage();

    await page.goto(REWARDS_URL, {
        waitUntil: "domcontentloaded"
    });

    await page.waitForTimeout(5000);

    await clickElement(page, MY_REWARDS_CATEGORY, "My Rewards");

    await clickElement(page, TRANSACTION_HISTORY, "Transaction History");

    await clickElement(page, QUEST_CATEGORY, "Quest Category");

    await clickElement(page, EVENT_AWARDS, "Event Awards");

    await clickElement(page, CLICKS, "Clicks");

    await clickElement(page, IMPRESSIONS, "Impressions");

    await clickElement(page, MISC, "Misc");

    await clickElement(page, QUEST_COMPLETIONS, "Quest Completions");

    await clickElement(page, REFERRAL_REWARDS, "Referral Rewards");

    await clickElement(page, PLAYWALL_HISTORY, "Playwall History");

    await clickElement(page, CASHBACK_HISTORY, "Cashback History");

    console.log("All categories clicked successfully.");

    await page.screenshot({
        path: "rewards_categories.png",
        fullPage: true
    });

    await browser.close();
});