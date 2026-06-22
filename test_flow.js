/**
 * Menja Fresh — automated app flow tests (jsdom).
 * Runs the real app code in a headless DOM, stubbing Supabase/network, and
 * exercises every major user flow end-to-end.  `npm test`.
 */
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const APP_HTML = fs.readFileSync('app.html', 'utf-8');

// Hook script exposes the app's lexically-scoped (let/const) globals so tests
// can read internal state.  Injected just before </body>, after the app script.
const HOOK = '<script>window.__t={' +
  'getState:function(){return state;},' +
  'setDishes:function(d){DISHES=d;},' +
  'getDishes:function(){return DISHES;},' +
  'getLang:function(){return lang;},' +
  'getTR:function(){return TR;},' +
  'getMealTypes:function(){return MEAL_TYPES;},' +
  'setLikedLimitBypass:function(){},' +
  'setGuest:function(v){isGuest=v;}' +
  '};</' + 'script>';

// ── fake dish catalogue (varied tags / plants / nutrition) ──────────────
function fakeDishes() {
  const mk = (id, title, emoji, tags, ings, nut) => ({
    id, title, _title: title, emoji,
    tags, meal: ['main course'], servings: 2,
    ingredients: ings.map(([name, em, amt]) => ({ name, emoji: em, amount: amt })),
    nutrition: nut, prep: 10, cook: 15, photo: '',
    base: [], steps: [],
  });
  return [
    mk(1, 'Salmon Spinach Bowl', '🐟', ['Fish','Quick'],
       [['salmon','🐟','200g'],['spinach','🥬','100g'],['quinoa','🌾','80g'],['lemon','🍋','1 pc']],
       {kcal:520,protein:38,carbs:40,fat:22,fiber:7}),
    mk(2, 'Chickpea Tomato Stew', '🥘', ['Vegan','Mediterranean'],
       [['chickpeas','🫘','200g'],['tomato','🍅','150g'],['onion','🧅','1 pc'],['garlic','🧄','2 clove']],
       {kcal:430,protein:18,carbs:60,fat:12,fiber:14}),
    mk(3, 'Chicken Broccoli Rice', '🍗', ['Meat'],
       [['chicken','🍗','200g'],['broccoli','🥦','150g'],['rice','🍚','80g'],['carrot','🥕','1 pc']],
       {kcal:560,protein:42,carbs:55,fat:14,fiber:6}),
    mk(4, 'Lentil Kale Curry', '🍛', ['Vegan'],
       [['lentils','🫘','120g'],['kale','🥬','80g'],['coconut','🥥','100ml'],['ginger','🫚','1 pc']],
       {kcal:480,protein:22,carbs:58,fat:16,fiber:15}),
    mk(5, 'Beef Pepper Pasta', '🍝', ['Meat','Pasta'],
       [['beef','🥩','180g'],['pepper','🫑','100g'],['pasta','🍝','100g'],['basil','🌿','5g']],
       {kcal:640,protein:36,carbs:70,fat:24,fiber:5}),
    mk(6, 'Tofu Mushroom Stir-fry', '🍲', ['Vegan','Asian'],
       [['tofu','🧈','150g'],['mushroom','🍄','120g'],['pepper','🫑','80g'],['soy sauce','🍶','1 tbsp']],
       {kcal:390,protein:24,carbs:30,fat:18,fiber:8}),
    mk(7, 'Cod Potato Bake', '🐟', ['Fish'],
       [['cod','🐟','200g'],['potato','🥔','200g'],['leek','🧅','1 pc'],['dill','🌿','5g']],
       {kcal:450,protein:34,carbs:48,fat:10,fiber:6}),
    mk(8, 'Halloumi Quinoa Salad', '🥗', ['Vegetarian','Salad'],
       [['halloumi','🧀','100g'],['quinoa','🌾','80g'],['cucumber','🥒','100g'],['mint','🌿','5g']],
       {kcal:470,protein:23,carbs:42,fat:22,fiber:7}),
  ];
}

// ── boot a fresh app instance ───────────────────────────────────────────
function boot() {
  const store = {};
  const ls = {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
    clear: () => { for (const k in store) delete store[k]; },
  };
  const fakeSb = {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      getSession: async () => ({ data: { session: null } }),
      getUser: async () => ({ data: { user: null } }),
      signOut: async () => ({}),
    },
    from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }), upsert: async () => ({}) }),
  };
  const vc = new VirtualConsole();
  const errors = [];
  vc.on('jsdomError', e => errors.push('jsdomError: ' + (e.detail && e.detail.message || e.message || e)));

  const dom = new JSDOM(APP_HTML.replace('</body>', HOOK + '</body>'), {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.supabase = { createClient: () => fakeSb };
      Object.defineProperty(window, 'localStorage', { value: ls, configurable: true });
      window.scrollTo = () => {};
      window.alert = () => {};
      window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
      window.fetch = async () => ({ ok: false, json: async () => [], text: async () => '' });
    },
  });
  return { dom, window: dom.window, store, errors };
}

function withApp(fn) {
  return new Promise(resolve => {
    const ctx = boot();
    setTimeout(async () => {
      const errs = [];
      const assert = (cond, msg) => { if (!cond) errs.push('  ✗ ' + msg); else PASS.push(msg); };
      try { await fn(ctx.window, ctx.window.__t, assert, ctx); }
      catch (e) { errs.push('  ✗ THREW: ' + (e.stack || e)); }
      resolve(errs);
    }, 250);
  });
}

const PASS = [];
const SUITES = [];
function suite(name, fn) { SUITES.push({ name, fn }); }

// helper: bring a guest into the app with dishes loaded
function enterGuest(w, __t) {
  __t.setDishes(fakeDishes());
  w.showApp({ id: 'guest', email: '', user_metadata: { first_name: 'Julia', avatar: '👤', plan: 'guest' } });
}

// ════════════════════════════════════════════════════════════════════════
// SUITE 1 — Onboarding (new user) — the white-page regression
// ════════════════════════════════════════════════════════════════════════
suite('Onboarding: new user → app visible', async (w, __t, assert) => {
  w.showWelcome();
  const app = w.document.getElementById('app');
  assert(app.style.display === 'none', 'app hidden on welcome');
  w.welcomeGetStarted();
  const nameInput = w.document.getElementById('setup-name-input');
  assert(!!nameInput, 'onboarding step-1 rendered');
  if (nameInput) nameInput.value = 'Julia';
  let g = 0;
  // Walk through all setup steps until we reach the final one
  while (g++ < 40) {
    if (!w.document.getElementById('setup-done-btn')) break;
    const bg = w.document.getElementById('setup-bg');
    const isLastStep = !bg || !bg.classList.contains('open') ||
      w.document.querySelector('#setup-bg.open .setup-done') === null;
    if (!bg || !bg.classList.contains('open')) break;
    // Check if this is the last step by calling setupNext and seeing if setup closes
    w.setupNext(true);
    const bgAfter = w.document.getElementById('setup-bg');
    if (!bgAfter || !bgAfter.classList.contains('open')) {
      // finishSetup was triggered — await it directly since setupNext doesn't
      await w.finishSetup(false);
      break;
    }
  }
  // Allow async finishSetup (recipe loading) to complete
  await new Promise(r => setTimeout(r, 20));
  assert(app.style.display === 'block', 'app VISIBLE after onboarding (no white page)');
  assert(w.document.getElementById('screen-plan').classList.contains('active'), 'Plan tab active');
  assert(__t.getState().setupDone === true, 'setupDone flag set');
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 2 — Returning user
// ════════════════════════════════════════════════════════════════════════
suite('Returning user → lands on Plan/Today', (w, __t, assert) => {
  enterGuest(w, __t);
  const app = w.document.getElementById('app');
  assert(app.style.display === 'block', 'app visible for returning user');
  const active = w.document.querySelector('.screen.active');
  assert(!!active && /screen-(plan|today)/.test(active.id), 'lands on Plan or Today: ' + (active && active.id));
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 3 — Discover / swipe
// ════════════════════════════════════════════════════════════════════════
suite('Discover: like / dislike + guest limit', (w, __t, assert) => {
  enterGuest(w, __t);
  const st = __t.getState();
  st.liked = []; st.disliked = [];
  w.showTab('discover');
  w.swipeCard('right');
  assert(st.liked.length === 1, 'like adds to state.liked');
  w.swipeCard('left');
  assert(st.disliked.length === 1, 'dislike adds to state.disliked');
  // guest like limit is 4 — keep liking, must cap at 4
  for (let i = 0; i < 10; i++) w.swipeCard('right');
  assert(st.liked.length <= 4, 'guest like limit enforced (≤4), got ' + st.liked.length);
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 4 — Planning: generateWeek fills the plan
// ════════════════════════════════════════════════════════════════════════
suite('Planning: generateWeek populates plan', (w, __t, assert) => {
  enterGuest(w, __t);
  const st = __t.getState();
  st.plan = {}; st.skippedDays = {};
  w.generateWeek(new Set([0, 1, 2, 3, 4]));   // cook Mon–Fri
  assert(w.weekPlacedCount() === 5, 'generateWeek placed 5 dinners, got ' + w.weekPlacedCount());
  assert(w.countPlaced() >= 5, 'countPlaced reflects plan');
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 5 — Tab navigation never throws / activates right screen
// ════════════════════════════════════════════════════════════════════════
suite('Navigation: every tab renders', (w, __t, assert) => {
  enterGuest(w, __t);
  const tabs = ['plan', 'discover', 'shopping', 'recipes', 'today', 'family', 'fridge'];
  tabs.forEach(tab => {
    let ok = true;
    try { w.showTab(tab); } catch (e) { ok = false; }
    const scr = w.document.getElementById('screen-' + tab);
    assert(ok && scr && scr.classList.contains('active'), 'tab "' + tab + '" active without error');
  });
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 6 — Shopping list builds from the plan
// ════════════════════════════════════════════════════════════════════════
suite('Shopping: list builds from planned meals', (w, __t, assert) => {
  enterGuest(w, __t);
  const st = __t.getState();
  st.plan = {}; st.skippedDays = {}; st.shoppingFrom = '';
  w.generateWeek(new Set([0, 1, 2]));
  w.rebuildShopping();
  const items = Object.keys(st.shopping || {});
  assert(items.length > 0, 'shopping list has items, got ' + items.length);
  w.showTab('shopping');
  assert(w.document.getElementById('screen-shopping').classList.contains('active'), 'shopping tab renders');
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 7 — Macros sum correctly for a planned day
// ════════════════════════════════════════════════════════════════════════
suite('Macros: dayMacros sums nutrition', (w, __t, assert) => {
  enterGuest(w, __t);
  const st = __t.getState();
  st.plan = {}; st.skippedDays = {};
  w.generateWeek(new Set([0, 1, 2, 3, 4, 5, 6]));   // every day
  const dates = w.getDateRange();
  const key = w.dateKey(dates[0]);
  const m = w.dayMacros(key);
  assert(m && m.kcal > 0 && m.protein > 0, 'dayMacros returns positive kcal+protein');
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 8 — Microbiome counts distinct plants
// ════════════════════════════════════════════════════════════════════════
suite('Microbiome: counts distinct plants this week', (w, __t, assert) => {
  enterGuest(w, __t);
  const st = __t.getState();
  st.plan = {}; st.skippedDays = {};
  w.generateWeek(new Set([0, 1, 2, 3, 4, 5, 6]));
  const data = w.microbiomeData();
  assert(data && data.target === 30, 'microbiome target is 30');
  assert(data && data.count > 0, 'distinct plants counted, got ' + (data && data.count));
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 9 — Language switching works in all 4 languages
// ════════════════════════════════════════════════════════════════════════
suite('i18n: switch en/de/fr/es without error', (w, __t, assert) => {
  enterGuest(w, __t);
  ['de', 'fr', 'es', 'en'].forEach(code => {
    let ok = true;
    try { w.setLang(code, true); } catch (e) { ok = false; }
    assert(ok && __t.getLang() === code, 'setLang("' + code + '") applied');
  });
  w.setLang('de', true);
  assert(w.t('navToday') === 'Heute', 'German nav label correct (Heute)');
  w.setLang('en', true);
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 10 — i18n completeness: no missing keys across languages
// ════════════════════════════════════════════════════════════════════════
suite('i18n: all EN keys present in de/fr/es', (w, __t, assert) => {
  const TR = __t.getTR();
  const enKeys = Object.keys(TR.en);
  ['de', 'fr', 'es'].forEach(code => {
    const missing = enKeys.filter(k => !(k in TR[code]));
    assert(missing.length === 0, code + ' missing ' + missing.length + ' keys' + (missing.length ? ': ' + missing.slice(0, 8).join(', ') : ''));
  });
  // and reverse: no orphan keys that only exist in a translation
  ['de', 'fr', 'es'].forEach(code => {
    const orphan = Object.keys(TR[code]).filter(k => !(k in TR.en));
    assert(orphan.length === 0, code + ' has ' + orphan.length + ' orphan keys' + (orphan.length ? ': ' + orphan.slice(0, 8).join(', ') : ''));
  });
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 11 — Settings edit re-opens setup mid-flow
// ════════════════════════════════════════════════════════════════════════
suite('Settings: edit preferences opens setup', (w, __t, assert) => {
  enterGuest(w, __t);
  let ok = true;
  try { w.openSetup(false); } catch (e) { ok = false; }
  const bg = w.document.getElementById('setup-bg');
  assert(ok && bg && bg.classList.contains('open'), 'openSetup(false) opens editor');
  // close it cleanly
  try { w.closeSetup(); } catch (e) {}
});

// ════════════════════════════════════════════════════════════════════════
// SUITE 12 — Persistence: guest state survives a reload
// ════════════════════════════════════════════════════════════════════════
suite('Persistence: guest state saved to localStorage', (w, __t, assert, ctx) => {
  enterGuest(w, __t);
  const st = __t.getState();
  st.userName = 'Julia';
  st.plan = {}; st.skippedDays = {};
  w.generateWeek(new Set([0, 1, 2]));
  w.save();
  const raw = ctx.store['menja_state'];
  assert(!!raw, 'menja_state written to localStorage');
  if (raw) {
    const parsed = JSON.parse(raw);
    assert(parsed.userName === 'Julia', 'userName persisted');
    assert(parsed.plan && Object.keys(parsed.plan).length > 0, 'plan persisted');
  }
});

// ── runner ──────────────────────────────────────────────────────────────
(async () => {
  let failed = 0;
  console.log('\n🧪 Menja Fresh — full app flow tests\n' + '═'.repeat(50));
  for (const s of SUITES) {
    const before = PASS.length;
    const errs = await withApp(s.fn);
    if (errs.length) {
      failed++;
      console.log('\n❌ ' + s.name);
      errs.forEach(e => console.log(e));
    } else {
      console.log('\n✅ ' + s.name + '  (' + (PASS.length - before) + ' checks)');
    }
  }
  console.log('\n' + '═'.repeat(50));
  console.log(failed === 0
    ? '✅ ALL ' + SUITES.length + ' SUITES PASSED (' + PASS.length + ' checks)'
    : '❌ ' + failed + '/' + SUITES.length + ' SUITES FAILED');
  process.exit(failed === 0 ? 0 : 1);
})();
