// Upload a local image file to Supabase Storage and set it as a recipe's photo.
//
// USAGE (PowerShell):
//   $env:SUPABASE_SERVICE_KEY="eyJ...service_role..."
//   node upload_image.js <recipe-id> "C:\path\to\photo.png"
//
// Example:
//   node upload_image.js beetroot-feta-tart "C:\Users\niggej\Pictures\beetroot.png"
const fs = require('fs');
const path = require('path');
const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const BUCKET = 'recipe-photos';
const KEY = process.env.SUPABASE_SERVICE_KEY;

const id = process.argv[2];
const file = process.argv[3];
if (!KEY) { console.error('❌ Set SUPABASE_SERVICE_KEY first.'); process.exit(1); }
if (!id || !file) { console.error('❌ Usage: node upload_image.js <recipe-id> "<path-to-image>"'); process.exit(1); }
if (!fs.existsSync(file)) { console.error('❌ File not found: ' + file); process.exit(1); }

const ext = (path.extname(file) || '.png').toLowerCase();
const ctype = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'image/png';
const objectPath = `${id}-${Date.now()}${ext}`;
const buf = fs.readFileSync(file);
const hdr = { apikey: KEY, Authorization: 'Bearer ' + KEY };

(async () => {
  // 1) ensure a public bucket exists (ignore "already exists")
  try {
    const b = await fetch(`${SUPA_URL}/storage/v1/bucket`, {
      method: 'POST', headers: { ...hdr, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
    });
    if (b.ok) console.log(`  • created public bucket "${BUCKET}"`);
  } catch (e) {}

  // 2) upload the file
  const up = await fetch(`${SUPA_URL}/storage/v1/object/${BUCKET}/${objectPath}`, {
    method: 'POST', headers: { ...hdr, 'Content-Type': ctype, 'x-upsert': 'true' }, body: buf,
  });
  if (!up.ok) { console.error('❌ Upload failed:', up.status, (await up.text()).slice(0, 200)); process.exit(1); }

  const publicUrl = `${SUPA_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`;
  console.log('  • uploaded →', publicUrl);

  // 3) set the recipe's image_url
  const pr = await fetch(`${SUPA_URL}/rest/v1/recipes?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH', headers: { ...hdr, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify({ image_url: publicUrl }),
  });
  const body = await pr.json();
  if (pr.ok && Array.isArray(body) && body.length === 1) console.log(`✅ Done — ${id} now uses your photo.`);
  else console.error('❌ Could not set image_url:', pr.status, JSON.stringify(body).slice(0, 200));
})();
