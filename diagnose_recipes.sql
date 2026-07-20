-- Menja Fresh — "why did the recipes disappear?" diagnostic.
-- Run in: Supabase Dashboard → SQL Editor → New query → paste → Run.
-- The app change did NOT remove recipes (the loading code is unchanged); the
-- cause is on the database/service side. This tells you which of the three it is.

-- 1) Are the rows still there at all?  (Expect ~105. If 0 → the table was emptied.)
SELECT count(*) AS recipe_rows FROM public.recipes;

-- 2) Is Row Level Security ON, and is there a policy that lets the app read?
--    The app connects as the "anon" role. If RLS is ON with NO SELECT policy
--    for anon, every query returns 0 rows WITH NO ERROR — a silent blank.
SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM pg_class WHERE relname = 'recipes';

SELECT policyname, cmd, roles, qual
FROM pg_policies WHERE schemaname = 'public' AND tablename = 'recipes';

-- 3) What can the anon role ACTUALLY see? (This mirrors exactly what the app gets.)
SET LOCAL role anon;
SELECT count(*) AS rows_visible_to_app FROM public.recipes;
RESET role;

-- ── How to fix, based on the result ─────────────────────────────────────────
-- • recipe_rows = 0            → the table was emptied. Re-seed it (backup below).
-- • recipe_rows > 0 but
--   rows_visible_to_app = 0    → RLS is hiding them. Add a public read policy:
--        ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
--        CREATE POLICY "public read recipes" ON public.recipes
--          FOR SELECT TO anon, authenticated USING (true);
-- • query errors / times out   → the project is paused. Resume it in the
--                                Supabase dashboard (Settings → General → Resume).
