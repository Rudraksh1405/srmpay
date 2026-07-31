import puppeteer from 'puppeteer';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const clickByText = async (page, selector, text) => {
  const elements = await page.$$(selector);
  for (const el of elements) {
    const elText = await page.evaluate(e => e.textContent, el);
    if (elText.includes(text)) {
      await el.click();
      return;
    }
  }
  throw new Error(`Element ${selector} with text "${text}" not found`);
};

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  try {
    console.log('9. Admin analytics');
    const adminPage = await browser.newPage();
    await adminPage.goto('http://localhost:5173/admin/login');
    // In AdminLogin, the placeholder is "admin"
    await adminPage.type('input[type="text"]', 'admin');
    await adminPage.type('input[type="password"]', 'admin123');
    await clickByText(adminPage, 'button', 'Secure Login');
    await adminPage.waitForNavigation({ timeout: 5000 }).catch(() => {});
    await adminPage.goto('http://localhost:5173/admin/analytics');
    await sleep(2000);
    await adminPage.screenshot({ path: 'C:/Users/manha/.gemini/antigravity/brain/84993c24-b4ed-4c65-b14b-558831fdf74e/admin-analytics.png' });
    console.log('Admin screenshot saved');

    console.log('SUCCESS!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
})();
