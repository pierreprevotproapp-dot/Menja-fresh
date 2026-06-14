// Menja Fresh — fal.ai image generator for recipes WITHOUT a photo.
// For each recipe missing image_url, it generates an image from the stored
// image_prompt via fal.ai and saves the resulting fal.media URL.
//
// SAFETY: keys come from env vars only — never hard-coded or committed.
//
// SETUP: get a fal key at https://fal.ai/dashboard/keys
//
// USAGE (PowerShell) — recommended: write straight to the live DB
//   $env:FAL_KEY = "fal-..."
//   $env:SUPABASE_SERVICE_KEY = "eyJ...service_role..."
//   node generate_images.js --db
//
// USAGE — fill the local new_recipes.json instead (before pushing)
//   $env:FAL_KEY = "fal-..."
//   node generate_images.js
//
// Options:
//   --db                operate on Supabase (query missing, PATCH image_url)
//   --limit N           only do the first N (handy for a test run)
//   FAL_MODEL env       default fal-ai/flux/schnell (fast/cheap).
//                       For higher quality: FAL_MODEL="fal-ai/flux/dev"
const fs = require('fs');

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) { console.error('❌ Set FAL_KEY first (https://fal.ai/dashboard/keys).'); process.exit(1); }
const MODEL = process.env.FAL_MODEL || 'fal-ai/flux/schnell';
const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const DB_MODE = process.argv.includes('--db');
const li = process.argv.indexOf('--limit');
const LIMIT = li >= 0 ? parseInt(process.argv[li + 1], 10) : Infinity;

const STYLE = ', professional food photography, natural daylight, fresh and appetising, shallow depth of field, high detail';

async function genImage(prompt) {
  const body = { prompt: prompt + STYLE, image_size: 'landscape_4_3', num_images: 1 };
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const r = await fetch(`https://fal.run/${MODEL}`, {
        method: 'POST',
        headers: { Authorization: 'Key ' + FAL_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error('fal ' + r.status + ' ' + (await r.text()).slice(0, 160));
      const d = await r.json();
      const url = d.images && d.images[0] && d.images[0].url;
      if (!url) throw new Error('no image url in response');
      return url;
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise(res => setTimeout(res, 1500)); // brief retry
    }
  }
}

(async () => {
  if (DB_MODE) {
    if (!SERVICE_KEY) { console.error('❌ --db needs SUPABASE_SERVICE_KEY.'); process.exit(1); }
    const hdr = { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY };
    const all = await (await fetch(`${SUPA_URL}/rest/v1/recipes?select=id,image_url,image_prompt&limit=1000`, { headers: hdr })).json();
    const todo = all.filter(r => !r.image_url && r.image_prompt).slice(0, LIMIT);
    console.log(`DB: ${todo.length} recipe(s) missing a photo. Model: ${MODEL}`);
    let ok = 0;
    for (const r of todo) {
      try {
        const url = await genImage(r.image_prompt);
        const pr = await fetch(`${SUPA_URL}/rest/v1/recipes?id=eq.${encodeURIComponent(r.id)}`, {
          method: 'PATCH',
          headers: { ...hdr, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ image_url: url }),
        });
        if (pr.ok) { ok++; console.log(`  ✓ ${r.id}`); }
        else console.log(`  ✗ ${r.id} — patch ${pr.status} ${(await pr.text()).slice(0,120)}`);
      } catch (e) { console.log(`  ✗ ${r.id} — ${e.message}`); }
    }
    console.log(`\nDone. ${ok}/${todo.length} images generated & saved to the DB.`);
    return;
  }

  // local mode: fill new_recipes.json (then run apply_new_recipes.js to push)
  const nr = JSON.parse(fs.readFileSync('new_recipes.json', 'utf8'));
  const todo = nr.filter(r => !r.image_url && r.image_prompt).slice(0, LIMIT);
  console.log(`new_recipes.json: ${todo.length} recipe(s) missing a photo. Model: ${MODEL}`);
  let ok = 0;
  for (const r of todo) {
    try {
      const url = await genImage(r.image_prompt);
      r.image_url = url; ok++;
      fs.writeFileSync('new_recipes.json', JSON.stringify(nr, null, 2)); // save incrementally
      console.log(`  ✓ ${r.id} → ${url}`);
    } catch (e) { console.log(`  ✗ ${r.id} — ${e.message}`); }
  }
  console.log(`\nDone. ${ok}/${todo.length} done. Run "node apply_new_recipes.js" to push them.`);
})();
