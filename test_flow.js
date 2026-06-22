const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const html = fs.readFileSync('app.html', 'utf-8');

// ---- stubs ----
const store = {};
const localStorageStub = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; },
  clear: () => { for (const k in store) delete store[k]; },
};

// Fake supabase client: no session, no-op auth
const fakeSb = {
  auth: {
    onAuthStateChange: (cb) => { fakeSb._cb = cb; return { data: { subscription: { unsubscribe(){} } } }; },
    getSession: async () => ({ data: { session: null } }),
    getUser: async () => ({ data: { user: null } }),
    signOut: async () => ({}),
  },
  from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }), upsert: async () => ({}) }),
};
const supabaseGlobal = { createClient: () => fakeSb };

const vc = new VirtualConsole();
const logs = [];
vc.on('error', e => logs.push('JSDOM-ERROR: ' + e));
vc.on('jsdomError', e => logs.push('JSDOM-ERROR: ' + (e.detail || e.message || e)));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole: vc,
  resources: undefined, // don't fetch external <script src>
  beforeParse(window) {
    window.supabase = supabaseGlobal;
    Object.defineProperty(window, 'localStorage', { value: localStorageStub, configurable: true });
    window.scrollTo = () => {};
    window.matchMedia = () => ({ matches: false, addListener(){}, removeListener(){} });
    // fetch stub (recipes load)
    window.fetch = async () => ({ ok: false, json: async () => ([]), text: async () => '' });
  },
});

const { window } = dom;

function run() {
  const errs = [];
  const w = window;

  // Give scripts a tick to define everything
  function assert(cond, msg) { if (!cond) errs.push('FAIL: ' + msg); else console.log('ok: ' + msg); }

  // The boot retries initSupabase via setTimeout; our supabase global is present
  // so init() should run synchronously-ish. Drive it manually to be safe.
  assert(typeof w.init === 'function', 'init() defined');
  assert(typeof w.finishSetup === 'function', 'finishSetup() defined');
  assert(typeof w.welcomeGetStarted === 'function', 'welcomeGetStarted() defined');
  assert(typeof w.showApp === 'function', 'showApp() defined');

  // Simulate a brand-new user: no session → welcome screen
  try { w.showWelcome(); } catch(e){ errs.push('showWelcome threw: '+e); }
  const appEl = w.document.getElementById('app');
  assert(appEl.style.display === 'none', 'app hidden on welcome screen');

  // User taps "Loslegen"
  try { w.welcomeGetStarted(); } catch(e){ errs.push('welcomeGetStarted threw: '+e.stack||e); }

  // Drive onboarding entirely through the real UI handlers so internal
  // (let-scoped) state is exercised the same way a user would.
  // Type a name into the step-1 input, then advance through every step.
  const nameInput = w.document.getElementById('setup-name-input');
  assert(!!nameInput, 'name input rendered');
  if (nameInput) { nameInput.value = 'Julia'; }

  // Click through to the end by calling setupNext repeatedly (skip-safe)
  let guard = 0;
  try {
    while (guard++ < 40) {
      const doneBtn = w.document.getElementById('setup-done-btn');
      if (!doneBtn) break;
      w.setupNext(true); // skip-allowed advance
      const bg = w.document.getElementById('setup-bg');
      if (!bg || !bg.classList.contains('open')) break; // setup closed → finished
    }
  } catch(e){ errs.push('stepping through setup threw: '+(e.stack||e)); }

  // THE BUG CHECK: after onboarding the app must be visible, not a blank page
  assert(appEl.style.display === 'block', 'app VISIBLE after onboarding (no white page)');

  // The plan screen should be the active screen
  const planScreen = w.document.getElementById('screen-plan');
  assert(planScreen && planScreen.classList.contains('active'), 'Plan tab is active after onboarding');

  // Setup overlay should be closed
  const setupBg = w.document.getElementById('setup-bg');
  assert(setupBg && !setupBg.classList.contains('open'), 'setup overlay closed');

  // week-pick modal should open shortly (showApp schedules it at 400ms)
  return new Promise(res => {
    setTimeout(() => {
      const wp = w.document.getElementById('weekpick-bg');
      assert(wp && wp.classList.contains('open'), 'week-pick modal opens after onboarding');
      res(errs);
    }, 700);
  });
}

// ---- Scenario 2: returning user signs in with an existing plan ----
function runReturning() {
  const errs = [];
  const w = window;
  function assert(cond, msg) { if (!cond) errs.push('FAIL(returning): ' + msg); else console.log('ok: ' + msg); }

  // Simulate a returning user with a completed setup + a meal planned today.
  // We can't write let-scoped `state` from outside, so we exercise the public
  // showApp() entry with a signed-in user object and verify the app shell shows.
  try {
    w.showApp({ id: 'u1', email: 'julia@example.com', user_metadata: { first_name: 'Julia', avatar: '🥗' } });
  } catch(e){ errs.push('showApp(returning) threw: '+(e.stack||e)); }

  const appEl = w.document.getElementById('app');
  assert(appEl.style.display === 'block', 'app VISIBLE for returning user');

  // Some tab must be active (plan or today) — never a blank screen
  const active = w.document.querySelector('.screen.active');
  assert(!!active, 'a screen is active for returning user (no blank page)');
  assert(active && (active.id === 'screen-plan' || active.id === 'screen-today'),
    'returning user lands on Plan or Today (' + (active && active.id) + ')');

  return errs;
}

setTimeout(() => {
  run().then(errs => {
    const errs2 = runReturning();
    const all = errs.concat(errs2);
    console.log('\n--- JSDOM console errors ---');
    logs.slice(0,20).forEach(l => console.log(l));
    console.log('\n--- RESULT ---');
    if (all.length) { all.forEach(e => console.log(e)); console.log('\n❌ FLOW TEST FAILED'); process.exit(1); }
    else { console.log('✅ FLOW TEST PASSED (onboarding + returning-user)'); process.exit(0); }
  });
}, 300);
