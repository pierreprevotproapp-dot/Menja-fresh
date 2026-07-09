-- Menja Fresh — Nährwert-Audit über ALLE Rezepte in der DB.
-- Ausführen: Supabase Dashboard → SQL Editor → New query → einfügen → Run.
--
-- Konvention der App: nutrition ist PRO PORTION (mealNutrition/dayMacros
-- summieren pro Person, ohne weitere Skalierung).
--
-- Checks:
--   atwater_dev_pct  – kcal vs. 4·Protein + 4·Kohlenhydrate + 9·Fett (±20 % ok)
--   flag             – Hauptgerichte < 380 kcal/Portion (Verdacht "zu gering"),
--                      alles > 950 kcal, fehlende Nährwerte, Abweichung > 20 %
SELECT
  id,
  title,
  servings,
  (nutrition->>'kcal')::numeric      AS kcal,
  (nutrition->>'protein')::numeric   AS protein_g,
  (nutrition->>'carbs')::numeric     AS carbs_g,
  (nutrition->>'fat')::numeric       AS fat_g,
  ROUND( ( 4*COALESCE((nutrition->>'protein')::numeric,0)
         + 4*COALESCE((nutrition->>'carbs')::numeric,0)
         + 9*COALESCE((nutrition->>'fat')::numeric,0)
         - (nutrition->>'kcal')::numeric )
         / NULLIF((nutrition->>'kcal')::numeric,0) * 100 ) AS atwater_dev_pct,
  CASE
    WHEN nutrition IS NULL OR nutrition->>'kcal' IS NULL THEN '❌ keine Nährwerte'
    WHEN ABS( ( 4*COALESCE((nutrition->>'protein')::numeric,0)
              + 4*COALESCE((nutrition->>'carbs')::numeric,0)
              + 9*COALESCE((nutrition->>'fat')::numeric,0)
              - (nutrition->>'kcal')::numeric )
            / NULLIF((nutrition->>'kcal')::numeric,0) * 100 ) > 20
      THEN '⚠ kcal passt nicht zu den Makros'
    WHEN meal @> ARRAY['Main Course'] AND NOT (categories @> ARRAY['Dessert'])
         AND (nutrition->>'kcal')::numeric < 380
      THEN '⚠ Hauptgericht sehr wenig kcal'
    WHEN (nutrition->>'kcal')::numeric > 950
      THEN '⚠ sehr hohe kcal'
    ELSE '✓ ok'
  END AS flag
FROM public.recipes
ORDER BY (nutrition->>'kcal')::numeric ASC NULLS FIRST;
