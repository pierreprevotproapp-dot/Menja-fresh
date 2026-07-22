// Menja Fresh — export ALL recipes from the live database to a JSON file.
// Gives a fresh, authoritative backup (the repo's recipes_backup.json is stale).
//
// HOW TO RUN: open menja-fresh.com → F12 → Console → paste this whole file → Enter.
// A file "recipes_backup.json" downloads. Put it in the repo root (replacing the
// old one) and commit — then the recipe audit + fixes can run against real data.

(async () => {
  const SUPA = 'https://ekuynkjtcvpiueollznp.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdXlua2p0Y3ZwaXVlb2xsem5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODExNTUsImV4cCI6MjA5NTQ1NzE1NX0.rOdHlfIyu6tjzhmexXs25maNVkckCmck-UEhSgM0rEY';

  const res = await fetch(SUPA + '/rest/v1/recipes?select=*&order=id', { headers: { apikey: KEY, Authorization: 'Bearer ' + KEY } });
  const recipes = await res.json();
  if (!Array.isArray(recipes)) { console.error('Could not load recipes:', recipes); return; }

  const blob = new Blob([JSON.stringify(recipes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'recipes_backup.json';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  console.log('✅ Exported', recipes.length, 'recipes → recipes_backup.json (check your Downloads).');
})();
