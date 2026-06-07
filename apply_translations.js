// Menja Fresh — push recipe translations into Supabase (i18n column only).
//
// SAFETY:
//  • Only writes the new `i18n` column. Never touches title/subtitle/ingredients/steps.
//  • Reads your service-role key from an env var — it is NEVER stored in this file or committed.
//  • Run recipes_i18n_setup.sql in Supabase first (adds the i18n column).
//
// USAGE (PowerShell):
//   $env:SUPABASE_SERVICE_KEY = "eyJ...your service_role key..."
//   node apply_translations.js
//
// USAGE (bash):
//   SUPABASE_SERVICE_KEY="eyJ..." node apply_translations.js
//
// It reads recipes_i18n.json: { "<recipe-id>": { es:{...}, fr:{...}, de:{...} }, ... }

const fs = require('fs');
const path = require('path');

const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_KEY;

if (!KEY) {
  console.error('❌ Set SUPABASE_SERVICE_KEY first (Supabase → Project Settings → API → service_role).');
  process.exit(1);
}

const file = path.join(__dirname, 'recipes_i18n.json');
if (!fs.existsSync(file)) {
  console.error('❌ recipes_i18n.json not found. Nothing to apply yet.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const ids = Object.keys(data);
console.log(`Applying translations for ${ids.length} recipe(s)…`);

(async () => {
  let ok = 0, fail = 0;
  for (const id of ids) {
    const url = `${SUPA_URL}/rest/v1/recipes?id=eq.${encodeURIComponent(id)}`;
    try {
      const r = await fetch(url, {
        method: 'PATCH',
        headers: {
          apikey: KEY,
          Authorization: 'Bearer ' + KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ i18n: data[id] }),
      });
      const body = await r.json();
      if (r.status >= 200 && r.status < 300 && Array.isArray(body) && body.length === 1) {
        ok++; console.log(`  ✓ ${id}`);
      } else {
        fail++; console.log(`  ✗ ${id} — status ${r.status} ${JSON.stringify(body).slice(0, 160)}`);
      }
    } catch (e) {
      fail++; console.log(`  ✗ ${id} — ${e.message}`);
    }
  }
  console.log(`\nDone. ${ok} updated, ${fail} failed.`);
})();
