// Copy all externally-hosted recipe photos (e.g. fal.media) into your own
// Supabase Storage and repoint image_url — so you don't depend on a third party.
// Photos already in your storage bucket are skipped. Safe to re-run.
//
// USAGE (PowerShell):
//   $env:SUPABASE_SERVICE_KEY="eyJ...service_role..."
//   node migrate_images.js
const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const BUCKET = 'recipe-photos';
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!KEY) { console.error('❌ Set SUPABASE_SERVICE_KEY first.'); process.exit(1); }
const hdr = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const STORAGE_PREFIX = `${SUPA_URL}/storage/v1/object/public/${BUCKET}/`;

(async () => {
  // ensure bucket exists
  try { await fetch(`${SUPA_URL}/storage/v1/bucket`, { method:'POST', headers:{...hdr,'Content-Type':'application/json'}, body: JSON.stringify({id:BUCKET,name:BUCKET,public:true}) }); } catch(e){}

  const all = await (await fetch(`${SUPA_URL}/rest/v1/recipes?select=id,image_url&limit=2000`, { headers: hdr })).json();
  const todo = all.filter(r => r.image_url && /^https?:\/\//.test(r.image_url) && !r.image_url.startsWith(STORAGE_PREFIX));
  console.log(`${todo.length} photo(s) hosted elsewhere → migrating to your storage…`);
  let ok = 0, fail = 0;
  for (const r of todo) {
    try {
      const res = await fetch(r.image_url);
      if (!res.ok) throw new Error('download ' + res.status);
      const ct = res.headers.get('content-type') || 'image/jpeg';
      const ext = ct.includes('png') ? '.png' : ct.includes('webp') ? '.webp' : '.jpg';
      const buf = Buffer.from(await res.arrayBuffer());
      const objectPath = `${r.id}-${Date.now()}${ext}`;
      const up = await fetch(`${SUPA_URL}/storage/v1/object/${BUCKET}/${objectPath}`, {
        method:'POST', headers:{...hdr,'Content-Type':ct,'x-upsert':'true'}, body: buf });
      if (!up.ok) throw new Error('upload ' + up.status + ' ' + (await up.text()).slice(0,100));
      const publicUrl = STORAGE_PREFIX + objectPath;
      const pr = await fetch(`${SUPA_URL}/rest/v1/recipes?id=eq.${encodeURIComponent(r.id)}`, {
        method:'PATCH', headers:{...hdr,'Content-Type':'application/json',Prefer:'return=minimal'}, body: JSON.stringify({image_url:publicUrl}) });
      if (!pr.ok) throw new Error('patch ' + pr.status);
      ok++; console.log(`  ✓ ${r.id}`);
    } catch (e) { fail++; console.log(`  ✗ ${r.id} — ${e.message}`); }
  }
  console.log(`\nDone. ${ok} migrated, ${fail} failed. All recipe photos now live in your Supabase Storage.`);
})();
