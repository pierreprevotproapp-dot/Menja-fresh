#!/usr/bin/env node
// fix_dressing_completeness.js
// 1. Adds balsamic vinegar to the Loaded Avocado Toast caramelisation step
//    so the title "Caramelise the onion" is culinarily justified.
// 2. Ensures every dressing/sauce ingredient appears in at least one step chip
//    across all affected recipes (adds the missing chip to the correct step).
// Run: node fix_dressing_completeness.js

'use strict';
const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n    = JSON.parse(fs.readFileSync('recipes_i18n.json',   'utf8'));

// ── Helper ────────────────────────────────────────────────────────────────
function addChip(recipe, i18nEntry, stepIdx, enChip, translations) {
  const step = recipe.steps[stepIdx];
  if (!step.ings) step.ings = [];
  step.ings.push(enChip);

  ['es', 'fr', 'de'].forEach(lang => {
    const langStep = i18nEntry?.[lang]?.steps?.[stepIdx];
    if (!langStep) return;
    if (!langStep.ings) langStep.ings = [];
    langStep.ings.push(translations[lang]);
  });
  console.log(`  + "${enChip}" → step ${stepIdx + 1}`);
}

const report = [];

// ════════════════════════════════════════════════════════════════════════════
// FIX 1 — Loaded Avocado Toast: add balsamic vinegar for caramelisation
// ════════════════════════════════════════════════════════════════════════════
{
  const r = recipes.find(x => x.id === 'loaded-avocado-toast-eggs');
  const e = i18n['loaded-avocado-toast-eggs'];

  // 1a. Add "Balsamic vinegar" to base_ingredients (EN + i18n)
  r.base_ingredients.push('Balsamic vinegar');
  e.es.base.push('Vinagre balsámico');
  e.fr.base.push('Vinaigre balsamique');
  e.de.base.push('Balsamicoessig');

  // 1b. Update EN step 1 text to mention balsamic
  r.steps[0].text = r.steps[0].text
    .replace(
      'cook in olive oil over low heat for 8–10 minutes, stirring occasionally until soft and golden.',
      'cook in olive oil over low heat for 5 minutes, add a splash of balsamic vinegar and continue cooking for 3–5 minutes, stirring, until golden and caramelised.'
    );

  // 1c. Update i18n step 1 texts
  e.de.steps[0].text = e.de.steps[0].text
    .replace(
      'in Olivenöl bei niedriger Hitze 8–10 Minuten unter gelegentlichem Rühren weich und goldbraun braten.',
      'in Olivenöl bei niedriger Hitze 5 Minuten anbraten, einen Spritzer Balsamicoessig hinzufügen und weitere 3–5 Minuten karamellisieren, bis sie goldbraun und süßlich sind.'
    );
  e.es.steps[0].text = e.es.steps[0].text
    .replace(
      'en aceite de oliva a fuego bajo 8–10 minutos, removiendo de vez en cuando, hasta que esté blanda y dorada.',
      'en aceite de oliva a fuego bajo 5 minutos, añade un chorrito de vinagre balsámico y continúa 3–5 minutos removiendo hasta que estén doradas y caramelizadas.'
    );
  e.fr.steps[0].text = e.fr.steps[0].text
    .replace(
      'à l\'huile d\'olive à feu doux 8–10 minutes, en remuant, jusqu\'à ce qu\'il soit tendre et doré.',
      'à l\'huile d\'olive à feu doux 5 minutes, ajouter un trait de vinaigre balsamique et poursuivre 3–5 minutes en remuant jusqu\'à dorure et caramélisation.'
    );

  report.push('[loaded-avocado-toast-eggs] Added balsamic vinegar to base + updated step 1 text (EN/DE/ES/FR)');
  console.log('✓ loaded-avocado-toast-eggs — balsamic vinegar added');
}

// ════════════════════════════════════════════════════════════════════════════
// FIX 2 — Missing dressing chips: add to correct step + i18n
// ════════════════════════════════════════════════════════════════════════════

const DRESSING_CHIP_FIXES = [
  {
    id: 'blueberry-chia-overnight-oats',
    stepIdx: 0, // Mix the oats — text says "lemon zest"
    en:  '🍋 Lemon zest · ½ tsp',
    es:  '🍋 Ralladura de limón · ½ cdta',
    fr:  '🍋 Zeste de citron · ½ c. à c.',
    de:  '🍋 Zitronenschale · ½ TL',
  },
  {
    id: 'roasted-cauliflower-tahini-harissa',
    stepIdx: 4, // Plate & finish — where dressing is drizzled
    en:  '🫒 Olive oil · 3 tbsp',
    es:  '🫒 Aceite de oliva · 3 cdas',
    fr:  '🫒 Huile d\'olive · 3 c. à s.',
    de:  '🫒 Olivenöl · 3 EL',
  },
  {
    id: 'smashed-potatoes-truffle-mayo',
    stepIdx: 1, // Smash & season — "drizzle with olive oil"
    en:  '🫒 Olive oil · 3 tbsp',
    es:  '🫒 Aceite de oliva · 3 cdas',
    fr:  '🫒 Huile d\'olive · 3 c. à s.',
    de:  '🫒 Olivenöl · 3 EL',
  },
  {
    id: 'pasta-roasted-tomato-basil',
    stepIdx: 0, // Roast the tomatoes — olive oil used for roasting
    en:  '🫒 Olive oil · 4 tbsp',
    es:  '🫒 Aceite de oliva · 4 cdas',
    fr:  '🫒 Huile d\'olive · 4 c. à s.',
    de:  '🫒 Olivenöl · 4 EL',
  },
  {
    id: 'burrata-asparagus-peas',
    stepIdx: 1, // Make the dressing — "Whisk olive oil, lemon juice"
    en:  '🫒 Olive oil · 3 tbsp',
    es:  '🫒 Aceite de oliva · 3 cdas',
    fr:  '🫒 Huile d\'olive · 3 c. à s.',
    de:  '🫒 Olivenöl · 3 EL',
  },
  {
    id: 'chicken-halloumi-mediterranean-salad',
    stepIdx: 2, // Prepare the salad — "dressing with lemon juice"
    en:  '🍋 Lemon · 1 pc',
    es:  '🍋 Limón · 1 ud',
    fr:  '🍋 Citron · 1 pc',
    de:  '🍋 Zitrone · 1 St.',
  },
  {
    id: 'carrot-cake-pancakes',
    stepIdx: 4, // Serve with yogurt & berries — maple syrup drizzle
    en:  '🍯 Maple syrup · 2 tbsp',
    es:  '🍯 Sirope de arce · 2 cdas',
    fr:  '🍯 Sirop d\'érable · 2 c. à s.',
    de:  '🍯 Ahornsirup · 2 EL',
  },
  {
    id: 'warm-farro-salad-roasted-veg-feta',
    stepIdx: 3, // Make the dressing & combine — "Whisk lemon juice"
    en:  '🍋 Lemon · 1 pc',
    es:  '🍋 Limón · 1 ud',
    fr:  '🍋 Citron · 1 pc',
    de:  '🍋 Zitrone · 1 St.',
  },
  {
    id: 'apple-pie-pecan-oat-bowl',
    stepIdx: 2, // Build & serve — toppings include maple syrup + almond butter
    en:  '🍯 Maple syrup · 2 tbsp',
    es:  '🍯 Sirope de arce · 2 cdas',
    fr:  '🍯 Sirop d\'érable · 2 c. à s.',
    de:  '🍯 Ahornsirup · 2 EL',
  },
  {
    id: 'apple-pie-pecan-oat-bowl',
    stepIdx: 2, // Build & serve — almond butter drizzle
    en:  '🥜 Almond butter · 2 tbsp',
    es:  '🥜 Crema de almendras · 2 cdas',
    fr:  '🥜 Purée d\'amande · 2 c. à s.',
    de:  '🥜 Mandelmus · 2 EL',
  },
];

DRESSING_CHIP_FIXES.forEach(fix => {
  const r = recipes.find(x => x.id === fix.id);
  const e = i18n[fix.id];
  if (!r || !e) { console.log('⚠️  Not found:', fix.id); return; }

  console.log('✓ ' + fix.id);
  addChip(r, e, fix.stepIdx, fix.en, { es: fix.es, fr: fix.fr, de: fix.de });
  report.push(`[${fix.id}] step ${fix.stepIdx + 1}: added "${fix.en}"`);
});

// ── Save ──────────────────────────────────────────────────────────────────
fs.writeFileSync('recipes_backup.json', JSON.stringify(recipes, null, 2));
fs.writeFileSync('recipes_i18n.json',   JSON.stringify(i18n, null, 2));

console.log('\n=== Summary ===');
report.forEach(l => console.log(' ', l));
console.log('\n✅ recipes_backup.json and recipes_i18n.json updated.');
