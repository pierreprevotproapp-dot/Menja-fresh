// Menja Fresh — audit: do the step icons (step.ings chips) match each recipe's
// ingredient list? Finds steps that show an ingredient chip whose name isn't in
// the recipe's ingredients / base / dressing (like Greek Lemon Rice step 6
// showing Mint & Parsley that aren't listed above).
//
// HOW TO RUN: open menja-fresh.com → F12 → Console → paste this whole file → Enter.
// It reads the live database (anon key, read-only) and prints every mismatch,
// plus a JSON blob at the end you can copy back so the fixes can be generated.

(async () => {
  const SUPA = 'https://ekuynkjtcvpiueollznp.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdXlua2p0Y3ZwaXVlb2xsem5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODExNTUsImV4cCI6MjA5NTQ1NzE1NX0.rOdHlfIyu6tjzhmexXs25maNVkckCmck-UEhSgM0rEY';

  const res = await fetch(SUPA + '/rest/v1/recipes?select=*', { headers: { apikey: KEY, Authorization: 'Bearer ' + KEY } });
  const recipes = await res.json();
  if (!Array.isArray(recipes)) { console.error('Could not load recipes:', recipes); return; }
  console.log('Loaded', recipes.length, 'recipes. Auditing step icons vs ingredient lists…');

  // name from a chip like "🍚 Brown rice · 160g"  ->  "brown rice"
  const norm = s => (s == null ? '' : String(s)).toLowerCase()
    .replace(/[·|].*$/, '')             // drop the amount after · or |
    .replace(/\([^)]*\)/g, '')          // drop parenthetical notes
    .replace(/[^a-zà-ÿ0-9\s-]/gi, ' ')  // strip emoji/symbols/punctuation
    .replace(/\s+/g, ' ').trim();

  const chipName = chip => norm(String(chip).split('·')[0]);

  // Prep-form words ("sliced chicken") and pantry staples ("salt") shouldn't count
  // as mismatches — only genuinely-absent ingredients (mint, parsley, soy sauce).
  const STOP = new Set(['sliced','grated','mixed','frozen','roasted','smashed','chopped','cooked','ground','fresh','diced','minced','baby','baked','warm','cold','extra','virgin','ripe','dried','tinned','canned','whole','light','low','free','range','small','large','plain','the','and','with','into','for']);
  const STAPLE = new Set(['salt','pepper','water','oil','olive','seasoning','pinch']);
  const words = nm => nm.split(' ').filter(w => w.length >= 3 && !STOP.has(w));
  // chip is fine if any of its content words appears among the recipe's ingredient words
  const inList = (name, knownWords) => {
    const ws = words(name);
    if (!ws.length) return true;                 // only prep/stop words → ignore
    if (ws.every(w => STAPLE.has(w))) return true; // pure staple (salt/pepper/oil)
    return ws.some(w => knownWords.has(w));
  };

  const LANGS = ['base', 'de', 'fr', 'es'];
  const findings = [];

  for (const r of recipes) {
    const i18n = r.i18n || {};
    for (const L of LANGS) {
      const src = L === 'base'
        ? { ings: r.ingredients, base: r.base_ingredients, dressing: r.dressing, steps: r.steps }
        : { ings: (i18n[L] || {}).ingredients, base: (i18n[L] || {}).base, dressing: (i18n[L] || {}).dressing, steps: (i18n[L] || {}).steps };
      if (!Array.isArray(src.steps) || !src.steps.length) continue;

      // build the set of known ingredient WORDS for this recipe+language
      const knownWords = new Set();
      const addWords = x => words(norm(typeof x === 'string' ? x : (x && x.name))).forEach(w => knownWords.add(w));
      (src.ings || []).forEach(addWords);
      (src.base || []).forEach(addWords);
      (src.dressing || []).forEach(addWords);

      src.steps.forEach((st, si) => {
        const chips = (st && st.ings) || [];
        if (!Array.isArray(chips)) return;
        chips.forEach(chip => {
          const nm = chipName(chip);
          if (nm && !inList(nm, knownWords)) {
            findings.push({ id: r.id, title: r.title, lang: L, step: si + 1, chip: String(chip), missing: nm });
          }
        });
      });
    }
  }

  console.log('\n===== MISMATCHES: step icon not in the ingredient list =====');
  if (!findings.length) console.log('None 🎉 — every step icon matches an ingredient.');
  else {
    console.table(findings.map(f => ({ recipe: f.id, lang: f.lang, step: f.step, chip: f.chip })));
    // group by recipe for a quick overview
    const byRecipe = {};
    findings.forEach(f => { (byRecipe[f.id] = byRecipe[f.id] || new Set()).add(f.missing); });
    console.log('\nAffected recipes:', Object.keys(byRecipe).length);
    Object.entries(byRecipe).forEach(([id, set]) => console.log('  ' + id + ' → missing: ' + [...set].join(', ')));
  }

  console.log('\n===== COPY EVERYTHING BELOW THIS LINE AND SEND IT BACK =====');
  console.log(JSON.stringify(findings, null, 0));
  window.__menjaAudit = findings;
})();
