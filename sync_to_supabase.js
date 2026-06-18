#!/usr/bin/env node
// sync_to_supabase.js
// Pushes ALL recipes (recipes_backup.json) + ALL translations (recipes_i18n.json) to Supabase.
// Safe to re-run — upserts on id, i18n is patched after each recipe row is confirmed.
//
// USAGE (bash / Mac / Linux):
//   SUPABASE_SERVICE_KEY="eyJ..." node sync_to_supabase.js
//
// USAGE (PowerShell / Windows):
//   $env:SUPABASE_SERVICE_KEY = "eyJ..."
//   node sync_to_supabase.js

'use strict';
const fs = require('fs');

const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_KEY;

if (!KEY) {
  console.error('❌  Set SUPABASE_SERVICE_KEY first (Supabase → Project Settings → API → service_role).');
  process.exit(1);
}

const recipes = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n    = JSON.parse(fs.readFileSync('recipes_i18n.json',   'utf8'));

console.log(`\n▶  Syncing ${recipes.length} recipes + translations to Supabase…\n`);

(async () => {
  // ── Step 1: upsert all recipe rows ────────────────────────────────────────
  console.log('── Step 1: recipes ──────────────────────────────────');
  let recOk = 0, recFail = 0;

  // Supabase REST has a payload limit — push in batches of 20
  const BATCH = 20;
  for (let i = 0; i < recipes.length; i += BATCH) {
    const batch = recipes.slice(i, i + BATCH);
    const r = await fetch(`${SUPA_URL}/rest/v1/recipes`, {
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(batch),
    });
    const body = await r.json();
    if (r.status >= 200 && r.status < 300 && Array.isArray(body)) {
      body.forEach(x => { console.log(`  ✓ ${x.id}`); recOk++; });
    } else {
      console.log(`  ✗ batch ${i}–${i + BATCH}: status ${r.status}`, JSON.stringify(body).slice(0, 200));
      recFail += batch.length;
    }
  }
  console.log(`\n  ${recOk} upserted, ${recFail} failed.\n`);

  // ── Step 2: patch i18n column for every recipe ────────────────────────────
  console.log('── Step 2: translations ─────────────────────────────');
  let i18nOk = 0, i18nFail = 0;

  for (const [id, entry] of Object.entries(i18n)) {
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
        body: JSON.stringify({ i18n: entry }),
      });
      const body = await r.json();
      if (r.status >= 200 && r.status < 300 && Array.isArray(body) && body.length === 1) {
        console.log(`  ✓ ${id}`); i18nOk++;
      } else {
        console.log(`  ✗ ${id} — status ${r.status} ${JSON.stringify(body).slice(0, 160)}`); i18nFail++;
      }
    } catch (e) {
      console.log(`  ✗ ${id} — ${e.message}`); i18nFail++;
    }
  }
  console.log(`\n  ${i18nOk} updated, ${i18nFail} failed.\n`);

  // ── Summary ───────────────────────────────────────────────────────────────
  const allOk = recFail === 0 && i18nFail === 0;
  console.log('═'.repeat(50));
  if (allOk) {
    console.log(` ✅  All ${recipes.length} recipes + ${i18nOk} translations synced.`);
  } else {
    console.log(` ⚠️   Done with errors — check output above.`);
  }
  console.log('═'.repeat(50) + '\n');
  process.exit(allOk ? 0 : 1);
})();
