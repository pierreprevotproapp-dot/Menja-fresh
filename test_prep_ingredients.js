#!/usr/bin/env node
// test_prep_ingredients.js
// Validates that the preparation tab is complete: every recipe ingredient must
// appear in at least one step's ingredient chips, and no step mentions an
// ingredient in its text that hasn't been introduced yet via chips.
// Run: node test_prep_ingredients.js

'use strict';
const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n    = JSON.parse(fs.readFileSync('recipes_i18n.json',   'utf8'));

// ── Helpers ───────────────────────────────────────────────────────────────
function normEmoji(e) { return (e || '').replace(/️|︎/g, ''); }
function ingMatchesChip(ing, chip) {
  return normEmoji(chip).startsWith(normEmoji(ing.emoji));
}

function chipName(name) {
  let n = name
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^(Fresh|Dried|Cooked|Frozen|Raw|Tinned)\s+/i, '')
    .replace(/,\s*(shredded|sliced|diced|chopped|grated|minced)$/i, '')
    .trim();
  return n.charAt(0).toUpperCase() + n.slice(1);
}

// Generate search keywords from an ingredient name for text-matching
function keywords(name) {
  const core = chipName(name).toLowerCase();
  const parts = core
    .split(/\s+or\s+|\s+and\s+|\s*&\s*|,\s*/i)
    .flatMap(k => k.trim().split(/\s+/));
  return [...new Set([core, ...parts])]
    .filter(w => w.length > 3 && !/^(with|from|over|into|onto|that|this|then|some)$/.test(w));
}

let errors = [], warnings = [];
const LANGS = ['es', 'fr', 'de'];

recipes.forEach(r => {
  const entry = i18n[r.id];
  const steps = r.steps || [];

  // ── CHECK 1: every ingredient must appear in at least one step's chips ──
  (r.ingredients || []).forEach((ing, idx) => {
    const inAnyChip = steps.some(s =>
      (s.ings || []).some(chip => ingMatchesChip(ing, chip))
    );
    if (!inAnyChip) {
      errors.push(`${r.id}: ingredient[${idx}] "${ing.name}" (${ing.emoji}) never appears in any step chips`);
    }
  });

  // ── CHECK 2: emoji uniqueness — two ingredients sharing an emoji make
  //   chip-to-ingredient mapping ambiguous (soft warning)            ──
  const emojiSeen = {};
  (r.ingredients || []).forEach(ing => {
    const ne = normEmoji(ing.emoji);
    if (emojiSeen[ne]) {
      warnings.push(`${r.id}: emoji ${ing.emoji} shared by "${emojiSeen[ne]}" and "${ing.name}"`);
    } else {
      emojiSeen[ne] = ing.name;
    }
  });

  // ── CHECK 3: no orphan chip — every chip emoji must match a known ingredient ──
  steps.forEach((s, si) => {
    (s.ings || []).forEach(chip => {
      const matches = (r.ingredients || []).some(ing => ingMatchesChip(ing, chip));
      if (!matches) {
        warnings.push(`${r.id}: step ${si + 1} chip "${chip}" has no matching ingredient (unknown emoji)`);
      }
    });
  });

  // ── CHECK 4: step text vs. chip coverage
  //   If a MAIN ingredient is mentioned in a step's text but has NOT been
  //   introduced in any chip at or before that step, warn.            ──
  const introducedEmojis = new Set();
  steps.forEach((s, si) => {
    const hay = (s.text + ' ' + (s.title || '')).toLowerCase();
    (s.ings || []).forEach(chip => {
      (r.ingredients || []).forEach(ing => {
        if (ingMatchesChip(ing, chip)) introducedEmojis.add(normEmoji(ing.emoji));
      });
    });

    (r.ingredients || []).forEach(ing => {
      const ne = normEmoji(ing.emoji);
      if (introducedEmojis.has(ne)) return; // already introduced — OK
      const kws = keywords(ing.name);
      const mentioned = kws.some(kw => hay.includes(kw));
      if (mentioned) {
        warnings.push(
          `${r.id}: step ${si + 1} text mentions "${ing.name}" but no chip has introduced it yet`
        );
      }
    });
  });

  // ── CHECK 5: i18n chip counts must match English per step ──────────────
  if (!entry) { warnings.push(`${r.id}: no i18n entry found`); return; }
  LANGS.forEach(lang => {
    if (!entry[lang]) { warnings.push(`${r.id}[${lang}]: missing language block`); return; }
    (r.steps || []).forEach((s, si) => {
      const enCount = (s.ings || []).length;
      const tCount  = (entry[lang]?.steps?.[si]?.ings || []).length;
      if (enCount !== tCount) {
        errors.push(
          `${r.id}[${lang}]: step ${si + 1} ings count ${tCount} ≠ EN ${enCount}`
        );
      }
    });
  });
});

// ── Report ────────────────────────────────────────────────────────────────
const recipeCount = recipes.length;
console.log(`\n=== Preparation tab ingredient test — ${recipeCount} recipes ===`);

console.log(`\n❌ ERRORS (${errors.length}):`);
errors.forEach(e => console.log('  - ' + e));

console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
warnings.slice(0, 60).forEach(w => console.log('  - ' + w));
if (warnings.length > 60) console.log(`  …and ${warnings.length - 60} more`);

console.log('');
if (errors.length === 0) {
  console.log('✅ All ingredients appear in preparation step chips — tab is complete.');
} else {
  console.log(`❌ ${errors.length} errors: some ingredients are missing from step chips.`);
}
process.exit(errors.length ? 1 : 0);
