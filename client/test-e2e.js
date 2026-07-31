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
  const page = await browser.newPage();
  
  try {
    console.log('1. Go to student register');
    await page.goto('http://localhost:5173/student/login');
    // Click register toggle
    await clickByText(page, 'button', 'Register here');
    await sleep(500);
    
    console.log('2. Register new student');
    const newEmail = `student${Date.now()}@srmist.edu.in`;
    await page.type('input[placeholder="John Doe"]', 'Test Student');
    await page.type('input[placeholder="student@srmist.edu.in"]', newEmail);
    await page.type('input[type="password"]', 'password123');
    await clickByText(page, 'button', 'Register');
    await sleep(1500);
    
    // Log out so we can test wrong password
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:5173/student/login');
    await sleep(500);

    console.log('3. Test wrong password');
    await page.type('input[placeholder="student@srmist.edu.in"]', newEmail);
    await page.type('input[type="password"]', 'wrongpassword');
    await clickByText(page, 'button', 'Login');
    await sleep(1000);
    if (page.url().includes('/student') && !page.url().includes('login')) throw new Error('Logged in with wrong password!');

    console.log('4. Log in correctly & Order from Zinger');
    await page.evaluate(() => document.querySelector('input[type="password"]').value = '');
    await page.type('input[type="password"]', 'password123');
    await clickByText(page, 'button', 'Login');
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
    await sleep(1000);

    // Go to Zinger menu
    await clickByText(page, 'h3', 'Zinger');
    await sleep(1000);

    // Add 2 items
    const addButtons = await page.$$('button');
    let added = 0;
    for (const el of addButtons) {
      const text = await page.evaluate(e => e.textContent, el);
      if (text.includes('Add')) {
        await el.click();
        added++;
        if (added >= 2) break;
      }
    }
    await sleep(500);

    // Go to cart
    await clickByText(page, 'button', 'View Cart');
    await sleep(1000);

    // Checkout
    await clickByText(page, 'button', 'Proceed to Checkout');
    await sleep(1000);
    await clickByText(page, 'button', 'Pay');
    await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
    await sleep(2000);
    
    await page.screenshot({ path: 'C:/Users/manha/.gemini/antigravity/brain/84993c24-b4ed-4c65-b14b-558831fdf74e/student-order.png' });
    console.log('Student order screenshot saved');

    console.log('5. Vendor login & check order');
    const vendorPage = await browser.newPage();
    await vendorPage.goto('http://localhost:5173/vendor/login');
    await vendorPage.type('input[placeholder="vendor_id"]', 'zinger');
    await vendorPage.type('input[type="password"]', 'zinger123');
    await clickByText(vendorPage, 'button', 'Access Dashboard');
    await vendorPage.waitForNavigation({ timeout: 5000 }).catch(() => {});
    
    await sleep(1000);
    await vendorPage.screenshot({ path: 'C:/Users/manha/.gemini/antigravity/brain/84993c24-b4ed-4c65-b14b-558831fdf74e/vendor-dashboard.png' });
    console.log('Vendor dashboard screenshot saved');

    console.log('6. Test Vendor wrong password');
    await vendorPage.evaluate(() => localStorage.clear());
    await vendorPage.goto('http://localhost:5173/vendor/login');
    await vendorPage.type('input[placeholder="vendor_id"]', 'zinger');
    await vendorPage.type('input[type="password"]', 'wrongpass');
    await clickByText(vendorPage, 'button', 'Access Dashboard');
    await sleep(1000);
    if (vendorPage.url().includes('dashboard') || !vendorPage.url().includes('login')) throw new Error('Vendor logged in with wrong password!');

    console.log('7. Vendor advances order status');
    await vendorPage.evaluate(() => document.querySelector('input[type="password"]').value = '');
    await vendorPage.type('input[type="password"]', 'zinger123');
    await clickByText(vendorPage, 'button', 'Access Dashboard');
    await vendorPage.waitForNavigation({ timeout: 5000 }).catch(() => {});
    await sleep(1000);
    
    // Click "Preparing" or "Ready"
    const vendorBtns = await vendorPage.$$('button');
    for (const el of vendorBtns) {
      const text = await vendorPage.evaluate(e => e.textContent, el);
      if (text.includes('Preparing') || text.includes('Ready')) {
        await el.click();
        break;
      }
    }
    await sleep(1000);

    console.log('8. Verify student status poll update');
    await page.bringToFront();
    await sleep(5000);
    await page.screenshot({ path: 'C:/Users/manha/.gemini/antigravity/brain/84993c24-b4ed-4c65-b14b-558831fdf74e/student-status-updated.png' });
    console.log('Student status updated screenshot saved');

    console.log('9. Admin analytics');
    const adminPage = await browser.newPage();
    await adminPage.goto('http://localhost:5173/admin/login');
    await adminPage.type('input[placeholder="Admin ID"]', 'admin');
    await adminPage.type('input[type="password"]', 'admin123');
    await clickByText(adminPage, 'button', 'Secure Login');
    await adminPage.waitForNavigation({ timeout: 5000 }).catch(() => {});
    await adminPage.goto('http://localhost:5173/admin/analytics');
    await sleep(1000);
    await adminPage.screenshot({ path: 'C:/Users/manha/.gemini/antigravity/brain/84993c24-b4ed-4c65-b14b-558831fdf74e/admin-analytics.png' });
    console.log('Admin screenshot saved');

    console.log('SUCCESS!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await browser.close();
  }
})();
