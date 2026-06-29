const { test, chromium } = require('@playwright/test');

test.setTimeout(120000);

test('Rewards Category Navigation Test', async () => {

  const browser = await chromium.launch({
    headless: false,
    executablePath: "C:\\Users\\DELL\\AppData\\Local\\Santa\\Application\\santa.exe"
  });

  const context = await browser.newContext();

  await context.addCookies([
    {
      name: 'clid',
      value: '8da91acc7b09930',
      domain: 'rewards.santabrowser.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();

  await page.goto('https://rewards.santabrowser.com', {
    waitUntil: 'networkidle',
  });

  // ===========================
  // Common Click Function
  // ===========================

  async function clickElement(locator, name) {

    console.log(`Clicking ${name}`);

    await locator.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await locator.scrollIntoViewIfNeeded();

    await locator.click({
      force: true
    });

    console.log(`${name} clicked`);

    await page.waitForTimeout(2000);
  }

  // ===========================
  // Locators
  // ===========================

  const social = page.locator("//div[@class='mt-2 w-full text-center']//span[text()='Social']");
  const videos = page.locator("//div[@class='mt-2 w-full text-center']//span[text()='Videos']");
  const spaces = page.locator("//div[@class='mt-2 w-full text-center']//span[text()='Spaces']");
  const usage = page.locator("//div[@class='mt-2 w-full text-center']//span[text()='Usage']");
  const surveys = page.locator("//div[@class='mt-2 w-full text-center']//span[text()='Surveys']");

  const home = page.locator("//nav[@class='flex-1 pr-1']//span[text()='Home']");

  // ===========================
  // Test Flow
  // ===========================

  await clickElement(social, "Social");
  await clickElement(home, "Home");

  await clickElement(videos, "Videos");
  await clickElement(home, "Home");

  await clickElement(spaces, "Spaces");
  await clickElement(home, "Home");

  await clickElement(usage, "Usage");
  await clickElement(home, "Home");

  await clickElement(surveys, "Surveys");
  await clickElement(home, "Home");

  console.log("Rewards Category Navigation completed successfully.");

  await browser.close();

});