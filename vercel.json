-- ============================================================
-- MENJA FRESH — Full database reset
-- WARNING: This deletes ALL users and ALL data permanently.
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ── Step 1: Clear all app data tables ───────────────────────
truncate table public.app_preferences  restart identity cascade;
truncate table public.dish_ratings     restart identity cascade;
truncate table public.meal_plan        restart identity cascade;
truncate table public.dish_preferences restart identity cascade;
truncate table public.family_settings  restart identity cascade;

-- ── Step 2: Delete all auth users ───────────────────────────
-- This deletes every user from auth.users (the Supabase auth table)
delete from auth.users;

-- ── Step 3: Verify everything is empty ──────────────────────
select 'app_preferences'  as tbl, count(*) from public.app_preferences
union all
select 'dish_ratings',    count(*) from public.dish_ratings
union all
select 'meal_plan',       count(*) from public.meal_plan
union all
select 'dish_preferences',count(*) from public.dish_preferences
union all
select 'family_settings', count(*) from public.family_settings
union all
select 'auth.users',      count(*) from auth.users;

-- All counts should be 0 ✓

-- ── Step 4: Add 'plan' column to family_settings if missing ─
alter table public.family_settings
  add column if not exists plan text default 'registered';

-- ── Step 5: Re-confirm RLS policies are in place ────────────
-- (These are safe to run even if policies already exist)
drop policy if exists "Users manage own family settings"  on public.family_settings;
drop policy if exists "Users manage own dish preferences" on public.dish_preferences;
drop policy if exists "Users manage own meal plan"        on public.meal_plan;
drop policy if exists "Users manage own ratings"          on public.dish_ratings;
drop policy if exists "Users manage own app preferences"  on public.app_preferences;

create policy "Users manage own family settings"
  on public.family_settings for all
  using(auth.uid()=user_id) with check(auth.uid()=user_id);

create policy "Users manage own dish preferences"
  on public.dish_preferences for all
  using(auth.uid()=user_id) with check(auth.uid()=user_id);

create policy "Users manage own meal plan"
  on public.meal_plan for all
  using(auth.uid()=user_id) with check(auth.uid()=user_id);

create policy "Users manage own ratings"
  on public.dish_ratings for all
  using(auth.uid()=user_id) with check(auth.uid()=user_id);

create policy "Users manage own app preferences"
  on public.app_preferences for all
  using(auth.uid()=user_id) with check(auth.uid()=user_id);

-- ============================================================
-- DONE ✓ — Database is clean, ready for fresh registrations
-- ============================================================
