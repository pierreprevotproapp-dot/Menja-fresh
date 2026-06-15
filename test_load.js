// Menja Fresh — production load smoke test.
// Run:  node test_load.js
// Catches the exact things that cause the "green logo → white screen" hang:
//   1. app.html must load (200)
//   2. /supabase-client.js must load (200) — a 404 here = infinite hang
//   3. the white-screen guards must be deployed in app.html
//   4. the Supabase REST API must be reachable with the anon key
const BASE = process.env.MENJA_URL || 'https://www.menja-fresh.com';
const SUPA = 'https://ekuynkjtcvpiueollznp.supabase.co';

async function head(url){
  try{ const r = await fetch(url, { redirect:'follow' }); return { ok:r.ok, status:r.status, text: await r.text() }; }
  catch(e){ return { ok:false, status:0, err:e.message, text:'' }; }
}

(async () => {
  let pass = 0, fail = 0;
  const ok = (name, cond, detail='') => { (cond?pass++:fail++); console.log(`  ${cond?'✓':'✗'} ${name}${detail?'  — '+detail:''}`); };

  console.log(`\n=== Menja load smoke test — ${BASE} ===\n`);

  const app = await head(`${BASE}/app.html`);
  ok('app.html loads (200)', app.status===200, `status ${app.status}`);
  ok('white-screen guards present (bootWithoutSupabase)', app.text.includes('bootWithoutSupabase'));
  ok('watchdog present', app.text.includes('Watchdog'));
  ok('CDN fallback present', app.text.includes('cdn.jsdelivr.net/npm/@supabase/supabase-js'));

  const lib = await head(`${BASE}/supabase-client.js`);
  ok('supabase-client.js loads (200) — 404 here = the hang', lib.status===200, `status ${lib.status}`);
  ok('supabase-client.js defines the library', /createClient/.test(lib.text), `${Math.round((lib.text.length||0)/1024)}kb`);

  // anon key read (mirrors what the app does on boot)
  const anonMatch = app.text.match(/const SUPA_KEY='(eyJ[^']+)'/);
  const ANON = anonMatch && anonMatch[1];
  if (ANON) {
    const api = await head(`${SUPA}/rest/v1/recipes?select=id&limit=1`);
    // fetch without headers will 401; do a proper authed check:
    try{
      const r = await fetch(`${SUPA}/rest/v1/recipes?select=id&limit=1`, { headers:{ apikey:ANON, Authorization:'Bearer '+ANON } });
      ok('Supabase REST reachable + recipes readable', r.ok, `status ${r.status}`);
    }catch(e){ ok('Supabase REST reachable', false, e.message); }
  } else {
    ok('found anon key in app.html', false);
  }

  console.log(`\n${fail===0?'✅ All load checks passed — start path is healthy.':'❌ '+fail+' check(s) failed — investigate before users hit a white screen.'}`);
  process.exit(fail?1:0);
})();
