// Delete one or more recipes from Supabase by id.
// USAGE (PowerShell):
//   $env:SUPABASE_SERVICE_KEY="eyJ...service_role..."
//   node delete_recipe.js flourless-chocolate-almond-cake
// (pass several ids separated by spaces to delete more than one)
const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!KEY) { console.error('❌ Set SUPABASE_SERVICE_KEY first.'); process.exit(1); }
const ids = process.argv.slice(2);
if (!ids.length) { console.error('❌ Pass at least one recipe id, e.g. node delete_recipe.js flourless-chocolate-almond-cake'); process.exit(1); }
(async () => {
  for (const id of ids) {
    try {
      const r = await fetch(`${SUPA_URL}/rest/v1/recipes?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, Prefer: 'return=minimal' },
      });
      console.log(r.ok ? `  ✓ deleted ${id}` : `  ✗ ${id} — status ${r.status} ${(await r.text()).slice(0,120)}`);
    } catch (e) { console.log(`  ✗ ${id} — ${e.message}`); }
  }
  console.log('Done.');
})();
