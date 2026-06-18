#!/usr/bin/env node
// test_preparation_complete.js
// ─────────────────────────────────────────────────────────────────────────────
// MASTER test for the Preparation tab — supersedes and extends:
//   test_prep_ingredients.js, test_dressing_completeness.js
//
// Checks covered:
//  [A] Ingredient coverage  — every main ingredient in ≥1 step chip
//  [B] Dressing coverage    — every dressing item in ≥1 step chip
//  [C] Chip format          — {emoji} {name} · {amount}, no empty parts
//  [D] Chip uniqueness      — no duplicate emoji in the same step
//  [E] Chip ↔ ingredient    — every chip emoji resolves to a known source
//  [F] Step structure       — title + text present, tip/kidsHelp not ""
//  [G] Step count sanity    — 2–12 steps per recipe
//  [H] i18n step count      — translations have the same number of steps
//  [I] i18n chip count      — per step, translation count = EN count
//  [J] i18n chip amounts    — numeric amounts in translations match EN
//  [K] Data hygiene         — ingredient not duplicated in both ingredients[] and dressing[]
//
// Run:  node test_preparation_complete.js
// Exit: 0 = all clear, 1 = hard errors found
// ─────────────────────────────────────────────────────────────────────────────
'use strict';
const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n    = JSON.parse(fs.readFileSync('recipes_i18n.json',   'utf8'));
const LANGS   = ['es', 'fr', 'de'];

// ── Shared helpers ────────────────────────────────────────────────────────
function normEmoji(e) { return (e || '').replace(/️|︎/g, ''); }

function chipEmoji(chip) {
  // Extract the leading emoji sequence (may be 1-2 codepoints + optional VS16)
  const m = chip.match(/^([\s\S]{1,3}?)\s/);
  return m ? normEmoji(m[1].trim()) : '';
}

function chipAmount(chip) {
  const i = chip.lastIndexOf('·');
  return i < 0 ? null : chip.slice(i + 1).trim();
}

const FRAC = { '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125 };
function parseNum(s) {
  if (!s) return null;
  const t = String(s).trim();
  let m = t.match(/^([0-9]+(?:[.,][0-9]+)?)\s*([¼½¾⅓⅔⅛]?)/);
  if (m) return parseFloat(m[1].replace(',', '.')) + (m[2] ? FRAC[m[2]] : 0);
  const f = t.match(/^([¼½¾⅓⅔⅛])/);
  return f ? FRAC[f[1]] : null;
}

function ingMatchesChip(ingEmoji, chip) {
  return normEmoji(chip).startsWith(normEmoji(ingEmoji));
}

// ── Accumulate results ────────────────────────────────────────────────────
const errors   = [];
const warnings = [];
function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ═════════════════════════════════════════════════════════════════════════
recipes.forEach(r => {
  const id       = r.id;
  const steps    = r.steps || [];
  const mainIngs = r.ingredients    || [];
  const dressing = r.dressing       || [];
  const entry    = i18n[id];

  // ── [G] Step count sanity ──────────────────────────────────────────────
  if (steps.length < 2)
    warn(`${id}: only ${steps.length} step(s) — surprisingly low`);
  if (steps.length > 12)
    warn(`${id}: ${steps.length} steps — surprisingly high`);

  // ── [H] i18n step count ────────────────────────────────────────────────
  if (!entry) {
    warn(`${id}: no i18n entry found`);
  } else {
    LANGS.forEach(l => {
      if (!entry[l]) { err(`${id}[${l}]: language block missing`); return; }
      const tc = (entry[l].steps || []).length;
      if (tc !== steps.length)
        err(`${id}[${l}]: ${tc} translated steps ≠ EN ${steps.length}`);
    });
  }

  // ── [A] Every main ingredient must appear in ≥1 chip ──────────────────
  mainIngs.forEach((ing, idx) => {
    const found = steps.some(s =>
      (s.ings || []).some(chip => ingMatchesChip(ing.emoji, chip))
    );
    if (!found)
      err(`${id}: ingredient[${idx}] "${ing.name}" (${ing.emoji} ${ing.amount}) never appears in any step chip`);
  });

  // ── [B] Every dressing item must appear in ≥1 chip ────────────────────
  dressing.forEach((d, di) => {
    if (!d.emoji) {
      warn(`${id}: dressing[${di}] "${d.name || d}" has no emoji — stored as plain string`);
      return;
    }
    const found = steps.some(s =>
      (s.ings || []).some(chip => ingMatchesChip(d.emoji, chip))
    );
    if (!found)
      err(`${id}: dressing "${d.name}" (${d.emoji} ${d.amount}) never shown in any step chip`);
  });

  // ── [K] Ingredient not duplicated in both ingredients[] + dressing[] ───
  const mainEmojiMap = {};
  mainIngs.forEach(i => { mainEmojiMap[normEmoji(i.emoji)] = i.name; });
  dressing.forEach(d => {
    if (!d.emoji) return;
    const ne = normEmoji(d.emoji);
    if (mainEmojiMap[ne])
      warn(`${id}: "${d.name}" (${d.emoji}) appears in BOTH ingredients AND dressing — may render twice`);
  });

  // ── Per-step checks ────────────────────────────────────────────────────
  // Build a set of emoji introduced so far (for sequential coverage check)
  const introducedEmojis = new Set();

  steps.forEach((s, si) => {
    const stepId = `${id} step ${si + 1} [${s.title || '(no title)'}]`;

    // [F] Step structure
    if (!s.title || !s.title.trim())
      err(`${stepId}: title is empty`);
    if (!s.text || !s.text.trim())
      err(`${stepId}: text is empty`);
    else if (s.text.trim().length < 15)
      warn(`${stepId}: text is very short ("${s.text.trim()}")`);
    if (s.tip      === '') warn(`${stepId}: tip is empty string — use null instead`);
    if (s.kidsHelp === '') warn(`${stepId}: kidsHelp is empty string — use null instead`);

    const chips = s.ings || [];

    // [D] Duplicate emoji within the same step
    const seenInStep = {};
    chips.forEach(chip => {
      const ce = chipEmoji(chip);
      if (!ce) return;
      if (seenInStep[ce])
        err(`${stepId}: duplicate emoji ${chip.split(' ')[0]} in the same step`);
      seenInStep[ce] = true;
    });

    // [C] Chip format validation
    chips.forEach((chip, ci) => {
      if (!chip.includes('·'))
        err(`${stepId} chip[${ci}]: missing "·" separator → "${chip}"`);
      else {
        const name = chip.split('·')[0].replace(/^[\s\S]{1,3}\s/, '').trim();
        const amt  = chipAmount(chip);
        if (!name)
          err(`${stepId} chip[${ci}]: empty name part → "${chip}"`);
        if (!amt)
          err(`${stepId} chip[${ci}]: empty amount after "·" → "${chip}"`);
      }
    });

    // [E] Chip emoji resolves to a known source
    //     (main ingredient, dressing item, or well-known pantry emoji)
    const knownEmojis = new Set([
      ...mainIngs.map(i => normEmoji(i.emoji)),
      ...dressing.filter(d => d.emoji).map(d => normEmoji(d.emoji)),
    ]);
    chips.forEach(chip => {
      const ce = chipEmoji(chip);
      if (!ce) return;
      if (!knownEmojis.has(ce))
        warn(`${stepId}: chip "${chip}" — emoji not found in ingredients or dressing`);
    });

    // Mark emojis introduced by this step's chips
    chips.forEach(chip => {
      const ce = chipEmoji(chip);
      if (ce) introducedEmojis.add(ce);
    });

    // [I] i18n chip count per step
    if (entry) {
      LANGS.forEach(l => {
        const langStep = entry[l]?.steps?.[si];
        if (!langStep) return; // already caught by [H]

        // [F-i18n] Translated step structure
        if (!langStep.title || !langStep.title.trim())
          err(`${id}[${l}] step ${si + 1}: translated title is empty`);
        if (!langStep.text || !langStep.text.trim())
          err(`${id}[${l}] step ${si + 1}: translated text is empty`);
        if (langStep.tip === '')
          warn(`${id}[${l}] step ${si + 1}: translated tip is empty string — use null`);

        // [I] chip count
        const enCount = chips.length;
        const tCount  = (langStep.ings || []).length;
        if (enCount !== tCount)
          err(`${id}[${l}] step ${si + 1}: ${tCount} chips ≠ EN ${enCount}`);

        // [J] Numeric amounts must match
        chips.forEach((enChip, ci) => {
          const tChip = (langStep.ings || [])[ci];
          if (!tChip) return;
          const ea = parseNum(chipAmount(enChip));
          const ta = parseNum(chipAmount(tChip));
          if (ea !== null && ta !== null && Math.abs(ea - ta) > 0.001)
            err(`${id}[${l}] step ${si + 1} chip[${ci}]: amount ${ta} ≠ EN ${ea} ("${enChip}" vs "${tChip}")`);
        });
      });
    }
  });
});

// ═════════════════════════════════════════════════════════════════════════
// Report
// ═════════════════════════════════════════════════════════════════════════
const CHECKS = [
  '[A] Ingredient coverage  — every main ingredient in ≥1 step chip',
  '[B] Dressing coverage    — every dressing item in ≥1 step chip',
  '[C] Chip format          — {emoji} {name} · {amount}, no empty parts',
  '[D] Chip uniqueness      — no duplicate emoji in the same step',
  '[E] Chip ↔ ingredient   — every chip emoji resolves to a known source',
  '[F] Step structure       — title + text present, tip/kidsHelp not ""',
  '[G] Step count sanity    — 2–12 steps per recipe',
  '[H] i18n step count      — translations have the same number of steps',
  '[I] i18n chip count      — per step, translation count = EN count',
  '[J] i18n chip amounts    — numeric amounts in translations match EN',
  '[K] Data hygiene         — ingredient not duplicated in ingredients[] + dressing[]',
];

console.log(`\n${'═'.repeat(70)}`);
console.log(` PREPARATION TAB — MASTER TEST  (${recipes.length} recipes)`);
console.log(`${'═'.repeat(70)}`);
console.log('\nChecks:');
CHECKS.forEach(c => console.log('  ' + c));

console.log(`\n❌  ERRORS (${errors.length}):`);
if (errors.length === 0) {
  console.log('  None.');
} else {
  errors.forEach(e => console.log('  • ' + e));
}

console.log(`\n⚠️   WARNINGS (${warnings.length}):`);
warnings.slice(0, 80).forEach(w => console.log('  · ' + w));
if (warnings.length > 80) console.log(`  … and ${warnings.length - 80} more`);

console.log(`\n${'─'.repeat(70)}`);
if (errors.length === 0) {
  console.log(' ✅  All hard checks pass — preparation tab content is complete and consistent.');
} else {
  console.log(` ❌  ${errors.length} error(s) must be fixed before the preparation tab is reliable.`);
}
console.log(`${'─'.repeat(70)}\n`);

process.exit(errors.length ? 1 : 0);
