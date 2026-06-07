-- Menja Fresh — recipe translations
-- Run ONCE in Supabase → SQL Editor before running apply_translations.js.
-- Adds a single nullable JSONB column. Existing English columns are untouched.

alter table public.recipes
  add column if not exists i18n jsonb;

-- Shape stored per recipe (English stays in the existing columns as fallback):
-- {
--   "es": { "title": "...", "subtitle": "...",
--           "ingredients": ["nombre1", ...],      -- aligned by index with ingredients[]
--           "base":        ["...", ...],           -- aligned with base_ingredients[]
--           "dressing":    ["...", ...],           -- aligned with dressing[]
--           "steps":       [ { "title":"...", "text":"...", "tip":"...", "kidsHelp":"...", "ings":["..."] }, ... ] },
--   "fr": { ... },
--   "de": { ... }
-- }
