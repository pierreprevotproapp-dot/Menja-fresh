// Menja Fresh — push recipe CONTENT corrections (English source columns) into Supabase.
//
// SAFETY:
//  • Only patches the columns you list per recipe in recipe_fixes.json
//    (e.g. base_ingredients, dressing, steps). Nothing else is touched.
//  • Service-role key via env var — never stored in this file or committed.
//
// USAGE (PowerShell):
//   $env:SUPABASE_SERVICE_KEY = "eyJ...service_role..."
//   node apply_fixes.js
// USAGE (bash):
//   SUPABASE_SERVICE_KEY="eyJ..." node apply_fixes.js

const fs = require('fs');
const path = require('path');
const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_KEY;

if (!KEY) { console.error('❌ Set SUPABASE_SERVICE_KEY first (Supabase → Project Settings → API → service_role).'); process.exit(1); }

const file = path.join(__dirname, 'recipe_fixes.json');
if (!fs.existsSync(file)) { console.error('❌ recipe_fixes.json not found.'); process.exit(1); }

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const ids = Object.keys(data);
console.log(`Applying content fixes for ${ids.length} recipe(s)…`);

(async () => {
  let ok = 0, fail = 0;
  for (const id of ids) {
    const url = `${SUPA_URL}/rest/v1/recipes?id=eq.${encodeURIComponent(id)}`;
    try {
      const r = await fetch(url, {
        method: 'PATCH',
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'return=representation' },
        body: JSON.stringify(data[id]),
      });
      const body = await r.json();
      if (r.status >= 200 && r.status < 300 && Array.isArray(body) && body.length === 1) { ok++; console.log(`  ✓ ${id} (${Object.keys(data[id]).join(', ')})`); }
      else { fail++; console.log(`  ✗ ${id} — status ${r.status} ${JSON.stringify(body).slice(0, 160)}`); }
    } catch (e) { fail++; console.log(`  ✗ ${id} — ${e.message}`); }
  }
  console.log(`\nDone. ${ok} updated, ${fail} failed.`);
})();
