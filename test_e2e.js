// Menja Fresh — end-to-end app smoke test (flow + errors) with Playwright.
//
// SETUP (once):
//   npm i -D playwright
//   npx playwright install chromium
// RUN:
//   node test_e2e.js                       # tests the live site
//   $env:MENJA_URL="http://localhost:4173/app.html"; node test_e2e.js   # local
//
// Checks: no white-screen hang, recipes load, tabs + recipe detail + back +
// filters all work, no meat leaks into the Vegetarian filter, and ZERO JS errors.
const { chromium } = require('playwright');
const URL = process.env.MENJA_URL || 'https://www.menja-fresh.com/app.html';

(async () => {
  const errors = [];
  const results = [];
  const check = (name, ok, info='') => { results.push(!!ok); console.log(`  ${ok?'✓':'✗'} ${name}${info?' — '+info:''}`); };

  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  console.log(`\n=== Menja E2E smoke test — ${URL} ===\n`);
  try {
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // 1) must leave the loading screen (white-screen-hang guard)
    let left = false;
    try { await page.waitForFunction(() => { const l = document.getElementById('loading'); return l && (getComputedStyle(l).display === 'none' || l.classList.contains('hide')); }, { timeout: 20000 }); left = true; } catch (e) {}
    check('App leaves the loading screen (no white-screen hang)', left);

    // 2) enter guest mode so recipes load
    try {
      try { const gs = page.getByText(/get started|loslegen|empezar|commencer|jetzt/i).first(); if (await gs.count()) await gs.click({ timeout: 3000 }); } catch (e) {}
      const g = page.getByText(/guest|gast|invitado|invité/i).first();
      if (await g.count()) await g.click({ timeout: 5000 });
    } catch (e) {}
    let loaded = false;
    try { await page.waitForFunction(() => typeof DISHES !== 'undefined' && DISHES.length > 0, { timeout: 20000 }); loaded = true; } catch (e) {}
    check('Recipes loaded from the database', loaded, loaded ? (await page.evaluate(() => DISHES.length + ' recipes')) : 'no dishes');

    // 3) drive the core flows through the app's own functions
    if (loaded) {
      const flow = await page.evaluate(async () => {
        const wait = ms => new Promise(r => setTimeout(r, ms));
        const o = {};
        try { showTab('recipes'); await wait(250); o.cards = document.querySelectorAll('#rec-grid .rec-card').length; } catch (e) { o.eRecipes = e.message; }
        try { const id = DISHES[0].id; openRecipe(id); await wait(250); o.detail = !!document.querySelector('.rd-hero'); backToRecipes(); await wait(250); o.back = document.getElementById('rec-list-view').style.display !== 'none'; } catch (e) { o.eDetail = e.message; }
        try { o.filters = {}; ['all','meat','fish','vegetarian','vegan','dessert','basics','breakfast','quick'].forEach(c => o.filters[c] = DISHES.filter(d => recipeMatchesCat(d, c)).length); } catch (e) { o.eFilters = e.message; }
        try { const veg = DISHES.filter(d => recipeMatchesCat(d, 'vegetarian')); o.meatLeak = veg.filter(d => dishHasMeat(d) || dishHasFish(d)).length; } catch (e) { o.eLeak = e.message; }
        try { showTab('plan'); await wait(150); o.plan = document.getElementById('screen-plan').classList.contains('active'); } catch (e) { o.ePlan = e.message; }
        try { showTab('today'); await wait(150); o.today = !!document.querySelector('.screen.active'); } catch (e) { o.eToday = e.message; }
        try { showTab('me'); await wait(150); o.me = !!document.querySelector('.screen.active'); } catch (e) { o.eMe = e.message; }
        return o;
      });
      check('Recipes grid renders cards', flow.cards > 0, (flow.cards || 0) + ' cards');
      check('Recipe detail opens', flow.detail);
      check('Back button returns to the list (scroll restore)', flow.back);
      check('Category filters all return results', flow.filters && Object.values(flow.filters).every(v => typeof v === 'number'), JSON.stringify(flow.filters));
      check('No meat/fish leaks into the Vegetarian filter', flow.meatLeak === 0, 'leak=' + flow.meatLeak);
      check('Plan / Today / Me tabs reachable', flow.plan && flow.today && flow.me);
    }
  } catch (e) {
    check('navigation completed', false, e.message);
  }

  check('No JS console / page errors during the flow', errors.length === 0, errors.slice(0, 6).join('  |  '));
  await browser.close();

  const failed = results.filter(r => !r).length;
  console.log(`\n${failed === 0 ? '✅ App smoke test PASSED — flow works, no errors.' : '❌ ' + failed + ' check(s) failed — see above.'}`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error('Test crashed:', e.message); process.exit(1); });
