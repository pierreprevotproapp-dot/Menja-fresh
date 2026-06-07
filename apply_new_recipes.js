// Menja Fresh — insert NEW recipes into Supabase (idempotent upsert on id).
//
// SAFETY:
//  • Upserts whole recipe rows from new_recipes.json (keyed by id). Safe to re-run.
//  • Service-role key via env var — never stored here or committed.
//
// USAGE (PowerShell):
//   $env:SUPABASE_SERVICE_KEY = "eyJ...service_role..."
//   node apply_new_recipes.js
// USAGE (bash):
//   SUPABASE_SERVICE_KEY="eyJ..." node apply_new_recipes.js

const fs = require('fs');
const path = require('path');
const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_KEY;

if (!KEY) { console.error('❌ Set SUPABASE_SERVICE_KEY first (Supabase → Project Settings → API → service_role).'); process.exit(1); }

const file = path.join(__dirname, 'new_recipes.json');
if (!fs.existsSync(file)) { console.error('❌ new_recipes.json not found.'); process.exit(1); }

const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
console.log(`Upserting ${rows.length} new recipe(s)…`);

(async () => {
  const url = `${SUPA_URL}/rest/v1/recipes`;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(rows),
    });
    const body = await r.json();
    if (r.status >= 200 && r.status < 300 && Array.isArray(body)) {
      body.forEach(x => console.log(`  ✓ ${x.id}`));
      console.log(`\nDone. ${body.length} upserted.`);
    } else {
      console.log(`  ✗ status ${r.status} ${JSON.stringify(body).slice(0, 300)}`);
    }
  } catch (e) { console.log('  ✗ ' + e.message); }
})();
