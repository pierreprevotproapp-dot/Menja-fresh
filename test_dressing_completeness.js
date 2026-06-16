#!/usr/bin/env node
// test_dressing_completeness.js
// Validates that every dressing/sauce ingredient listed in a recipe's
// "dressing" array is visible as a chip in at least one preparation step,
// and that dressing-making steps don't reference unaccounted ingredients.
// Run: node test_dressing_completeness.js

'use strict';
const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n    = JSON.parse(fs.readFileSync('recipes_i18n.json',   'utf8'));

const LANGS = ['es', 'fr', 'de'];

// Keywords that identify a "sauce / dressing / glaze / dip" step by title
const SAUCE_STEP_KW = [
  'dressing','sauce','glaze','glaze','marinade','marinate','vinaigrette',
  'tahini','dip','make the','mix the','prepare the',
];

function normEmoji(e) { return (e || '').replace(/️|︎/g, ''); }

function chipStartsWithEmoji(chip, emoji) {
  return normEmoji(chip).startsWith(normEmoji(emoji));
}

// Extract the emoji from a chip string (handles multi-codepoint sequences)
function chipEmoji(chip) {
  const m = chip.match(/^([\s\S]{1,3}?)\s/);
  return m ? normEmoji(m[1]) : '';
}

let errors = [], warnings = [];

recipes.forEach(r => {
  const dressing     = r.dressing || [];
  const ingredients  = r.ingredients || [];
  const base         = r.base_ingredients || [];
  const steps        = r.steps || [];
  const entry        = i18n[r.id];

  if (!dressing.length) return; // no dressing — skip

  // ── CHECK 1: every dressing item appears in ≥1 step chip ────────────────
  dressing.forEach((d, di) => {
    if (!d.emoji) {
      warnings.push(`${r.id}: dressing[${di}] "${d.name || d}" has no emoji field (string-only format)`);
      return;
    }
    const inAnyChip = steps.some(s =>
      (s.ings || []).some(chip => chipStartsWithEmoji(chip, d.emoji))
    );
    if (!inAnyChip) {
      errors.push(
        `${r.id}: dressing "${d.name}" (${d.emoji} ${d.amount}) is never shown in any step chip`
      );
    }
  });

  // ── CHECK 2: dressing-making steps — chips should be accounted for ──────
  steps.forEach((s, si) => {
    const titleLow = (s.title || '').toLowerCase();
    const isSauceStep = SAUCE_STEP_KW.some(kw => titleLow.includes(kw));
    if (!isSauceStep || !(s.ings && s.ings.length)) return;

    const knownEmojis = new Set([
      ...ingredients.map(i => normEmoji(i.emoji)),
      ...dressing.filter(d => d.emoji).map(d => normEmoji(d.emoji)),
    ]);
    // base ingredients don't have emoji — skip salt/pepper/oil base items

    s.ings.forEach(chip => {
      const ce = chipEmoji(chip);
      if (!ce) return;
      if (!knownEmojis.has(ce)) {
        warnings.push(
          `${r.id}: step ${si + 1} [${s.title}] chip "${chip}" emoji not found in ingredients or dressing`
        );
      }
    });
  });

  // ── CHECK 3: i18n dressing chip counts must match EN per step ───────────
  if (!entry) { warnings.push(`${r.id}: no i18n entry`); return; }
  LANGS.forEach(lang => {
    if (!entry[lang]) { warnings.push(`${r.id}[${lang}]: missing language`); return; }
    steps.forEach((s, si) => {
      const enCount = (s.ings || []).length;
      const tCount  = (entry[lang]?.steps?.[si]?.ings || []).length;
      if (enCount !== tCount) {
        errors.push(
          `${r.id}[${lang}]: step ${si + 1} ings ${tCount} ≠ EN ${enCount} (after dressing fix)`
        );
      }
    });
  });

  // ── CHECK 4: dressing array must not be empty if recipe has a sauce step ─
  const hasSauceStep = steps.some(s =>
    SAUCE_STEP_KW.some(kw => (s.title || '').toLowerCase().includes(kw))
  );
  if (hasSauceStep && !dressing.length) {
    warnings.push(`${r.id}: has a sauce/dressing step but dressing[] is empty`);
  }
});

// ── Report ─────────────────────────────────────────────────────────────────
const recipesWithDressing = recipes.filter(r => r.dressing && r.dressing.length).length;
console.log(`\n=== Dressing completeness test — ${recipes.length} recipes (${recipesWithDressing} with dressing) ===`);

console.log(`\n❌ ERRORS (${errors.length}):`);
errors.forEach(e => console.log('  - ' + e));

console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
warnings.forEach(w => console.log('  - ' + w));

console.log('');
if (errors.length === 0) {
  console.log('✅ All dressing/sauce ingredients appear in preparation step chips.');
} else {
  console.log(`❌ ${errors.length} dressing items missing from step chips — fix required.`);
}

process.exit(errors.length ? 1 : 0);
