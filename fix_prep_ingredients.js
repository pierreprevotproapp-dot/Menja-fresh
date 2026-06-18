#!/usr/bin/env node
// fix_prep_ingredients.js
// Finds all recipe ingredients that are never referenced in any step's ingredient chips,
// and adds the missing chip to the most appropriate step.
// Also writes matching translations into recipes_i18n.json.
// Run: node fix_prep_ingredients.js

'use strict';
const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n   = JSON.parse(fs.readFileSync('recipes_i18n.json',   'utf8'));

// ── Unit translation tables ────────────────────────────────────────────────
const UNIT_TRANS = {
  es: {
    'pc':'ud','pcs':'uds','tbsp':'cdas','tsp':'cdta',
    'clove':'diente','cloves':'dientes','sprig':'ramita','sprigs':'ramitas',
    'handful':'puñado','handfuls':'puñados','pinch':'pizca',
    'slice':'rebanada','slices':'rebanadas','head':'ud',
    'large':'grande','medium':'mediano','small':'pequeño',
  },
  fr: {
    'pc':'pc','pcs':'pc','tbsp':'c. à s.','tsp':'c. à c.',
    'clove':'gousse','cloves':'gousses','sprig':'brin','sprigs':'brins',
    'handful':'poignée','handfuls':'poignées','pinch':'pincée',
    'slice':'tranche','slices':'tranches','head':'pièce',
    'large':'gros','medium':'moyenne','small':'petite',
  },
  de: {
    'pc':'St.','pcs':'St.','tbsp':'EL','tsp':'TL',
    'clove':'Zehe','cloves':'Zehen','sprig':'Zweig','sprigs':'Zweige',
    'handful':'Handvoll','handfuls':'Handvoll','pinch':'Prise',
    'slice':'Scheibe','slices':'Scheiben','head':'Kopf',
    'large':'große','medium':'mittelgroße','small':'kleine',
  },
};

function translateAmount(amount, lang) {
  // Handles forms like "2 cloves", "½ pc", "5-6 tbsp", "2cm", "80g"
  const m = amount.match(/^(.+?)\s+([a-zA-Z].*)$/);
  if (!m) return amount; // numeric only (g, ml, cm) or special
  const num  = m[1];
  const unit = m[2].trim();
  const t    = UNIT_TRANS[lang]?.[unit];
  return t ? `${num} ${t}` : amount;
}

// ── Name helpers ──────────────────────────────────────────────────────────
function chipName(name) {
  let n = name
    .replace(/\s*\([^)]*\)/g, '')                              // remove (qualifiers)
    .replace(/^(Fresh|Dried|Cooked|Frozen|Raw|Tinned)\s+/i, '') // remove state adj
    .replace(/,\s*(shredded|sliced|diced|chopped|grated|minced)$/i, '') // remove trailing adj
    .trim();
  // Re-capitalize first letter (stripping an adjective may lower-case it)
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function i18nChipName(translatedName) {
  let n = translatedName.replace(/\s*\([^)]*\)/g, '').trim();
  n = n.replace(/,\s*\w+$/i, '').trim();
  // Trailing state adjectives (ES)
  n = n.replace(/\s+(fresco|fresca|frescos|frescas)$/i, '').trim();
  // Trailing (FR)
  n = n.replace(/\s+(frais|fraîche|fraîches)$/i, '').trim();
  // Trailing (DE)
  n = n.replace(/\s+(frisch|frische|frischer|frischen|frischem|frisches)$/i, '').trim();
  // Leading (DE)
  n = n.replace(/^(frischer?|getrockneter?|gekochter?)\s+/i, '').trim();
  // Leading (ES)
  n = n.replace(/^(fresco|fresca)\s+/i, '').trim();
  // Leading (FR)
  n = n.replace(/^(frais|fraîche)\s+/i, '').trim();
  return n;
}

// ── Emoji helpers ─────────────────────────────────────────────────────────
function normEmoji(e) { return e.replace(/️|︎/g, ''); }
function ingMatchesChip(ing, chip) {
  return normEmoji(chip).startsWith(normEmoji(ing.emoji));
}

// ── Step-selection: find first step whose text/title mentions the ingredient ──
function keywords(name) {
  const core = chipName(name).toLowerCase();
  const parts = core
    .split(/\s+or\s+|\s+and\s+|\s*&\s*|,\s*/i)
    .flatMap(k => k.trim().split(/\s+/));
  return [...new Set([core, ...parts])]
    .filter(w => w.length > 3 && !/^(with|from|over|into|onto|that|this|then)$/.test(w));
}

function findBestStepIndex(recipe, ing) {
  const kws = keywords(ing.name);
  const steps = recipe.steps || [];
  for (let i = 0; i < steps.length; i++) {
    const hay = (steps[i].text + ' ' + (steps[i].title || '')).toLowerCase();
    if (kws.some(kw => hay.includes(kw))) return i;
  }
  return steps.length - 1; // fallback: last step
}

// ── Manual overrides: step index (0-based) for cases where text matching fails ──
// Format: { 'recipe-id': { ingredientName: stepIdx } }
const STEP_OVERRIDES = {
  'herb-tofu-smashed-potatoes':          { 'Garlic': 0 },
  'mujadara-lentils-caramelised-onions': { 'Garlic': 0 },
  'lemon-chicken-green-beans':           { 'Fresh thyme & rosemary': 0 },
  'beef-chimichurri-rice':               { 'Lemon': 3 }, // step 4 = assembly step
};

// ── Step text patches (EN only) for ingredients not mentioned at all ────────
// These update the step text so the shown chip makes sense to the user.
const TEXT_PATCHES = {
  'herb-tofu-smashed-potatoes': {
    0: (t) => t.replace(
      'marinate in soy sauce, lemon juice',
      'marinate in soy sauce, lemon juice, minced garlic'
    ),
  },
  'mujadara-lentils-caramelised-onions': {
    0: (t) => t.replace(
      'Thinly slice onions and cook',
      'Thinly slice onions and garlic, cook'
    ),
  },
  'beef-chimichurri-rice': {
    3: (t) => t.trim().endsWith('.')
      ? t.trim() + ' Squeeze lemon over everything.'
      : t.trim() + '. Squeeze lemon over everything.',
  },
};

// ── i18n text patches matching the EN changes above ──────────────────────
const I18N_TEXT_PATCHES = {
  'herb-tofu-smashed-potatoes': {
    0: {
      es: (t) => t.replace('marinarlo en salsa de soja, zumo de limón', 'marinarlo en salsa de soja, zumo de limón, ajo picado').replace('marinar en salsa de soja, zumo de limón', 'marinar en salsa de soja, zumo de limón, ajo picado'),
      fr: (t) => t.replace('le faire mariner dans la sauce soja, le jus de citron', 'le faire mariner dans la sauce soja, le jus de citron, l\'ail émincé').replace('mariner dans la sauce soja, le jus de citron', 'mariner dans la sauce soja, l\'ail émincé, le jus de citron'),
      de: (t) => t.replace('in Sojasoße, Zitronensaft', 'in Sojasoße, Zitronensaft, gehacktem Knoblauch'),
    },
  },
  'mujadara-lentils-caramelised-onions': {
    0: {
      es: (t) => t.replace('Corta las cebollas en rodajas finas y cocínalas', 'Corta las cebollas y el ajo en rodajas finas, cocínalos'),
      fr: (t) => t.replace('Émincer finement les oignons et les faire cuire', 'Émincer finement les oignons et l\'ail et les faire cuire'),
      de: (t) => t.replace('Die Zwiebeln dünn schneiden und', 'Die Zwiebeln und den Knoblauch dünn schneiden und'),
    },
  },
  'beef-chimichurri-rice': {
    3: {
      es: (t) => t.trim() + ' Exprime el limón por encima.',
      fr: (t) => t.trim() + ' Pressez le citron par-dessus.',
      de: (t) => t.trim() + ' Zitrone darüber auspressen.',
    },
  },
};

// ── Main fix loop ─────────────────────────────────────────────────────────
let totalFixed = 0;
const report = [];

recipes.forEach(r => {
  const entry = i18n[r.id];
  if (!entry) return;

  // Track which (recipe, stepIdx) text patches have already been applied
  const appliedTextPatches    = new Set();
  const appliedI18nPatches    = {};

  (r.ingredients || []).forEach((ing, ingIdx) => {
    const appearsInAnyStep = (r.steps || []).some(s =>
      (s.ings || []).some(chip => ingMatchesChip(ing, chip))
    );
    if (appearsInAnyStep) return;

    // Determine target step
    const override = STEP_OVERRIDES[r.id]?.[ing.name];
    const stepIdx  = override !== undefined ? override : findBestStepIndex(r, ing);

    // Build English chip
    const enName = chipName(ing.name);
    const enChip = `${ing.emoji} ${enName} · ${ing.amount}`;

    // Ensure step.ings array exists
    const step = r.steps[stepIdx];
    if (!step.ings) step.ings = [];
    step.ings.push(enChip);

    // Apply EN text patch once per step
    if (TEXT_PATCHES[r.id]?.[stepIdx] && !appliedTextPatches.has(stepIdx)) {
      step.text = TEXT_PATCHES[r.id][stepIdx](step.text);
      appliedTextPatches.add(stepIdx);
    }

    // Build i18n chips + apply text patches
    ['es', 'fr', 'de'].forEach(lang => {
      const langEntry = entry[lang];
      if (!langEntry) return;
      const tName     = langEntry.ingredients?.[ingIdx] || ing.name;
      const tChipName = i18nChipName(tName);
      const tAmount   = translateAmount(ing.amount, lang);
      const tChip     = `${ing.emoji} ${tChipName} · ${tAmount}`;

      const langStep = langEntry.steps?.[stepIdx];
      if (langStep) {
        if (!langStep.ings) langStep.ings = [];
        langStep.ings.push(tChip);

        // Apply i18n text patch once per (lang, step)
        const patchKey = `${lang}:${stepIdx}`;
        const patch = I18N_TEXT_PATCHES[r.id]?.[stepIdx]?.[lang];
        if (patch && !appliedI18nPatches[patchKey]) {
          langStep.text = patch(langStep.text);
          appliedI18nPatches[patchKey] = true;
        }
      }
    });

    report.push(`  [${r.id}] step ${stepIdx + 1}: + "${enChip}"`);
    totalFixed++;
  });
});

// ── Save ──────────────────────────────────────────────────────────────────
fs.writeFileSync('recipes_backup.json', JSON.stringify(recipes, null, 2));
fs.writeFileSync('recipes_i18n.json',   JSON.stringify(i18n, null, 2));

console.log(`\n=== Preparation tab ingredient fix — ${totalFixed} chips added ===\n`);
report.forEach(l => console.log(l));
console.log('\n✅ recipes_backup.json and recipes_i18n.json updated.');
