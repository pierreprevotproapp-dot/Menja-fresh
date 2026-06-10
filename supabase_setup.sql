-- ============================================================
-- MENJA FRESH — Supabase Database Setup (idempotent)
-- Safe to run multiple times — drops policies before recreating
-- Supabase Dashboard → SQL Editor → New query → Paste → Run
-- ============================================================

-- ── 1. FAMILY SETTINGS ──────────────────────────────────────
create table if not exists public.family_settings (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  adults      int  not null default 2,
  children    int  not null default 0,
  updated_at  timestamptz default now(),
  unique(user_id)
);
alter table public.family_settings enable row level security;
drop policy if exists "Users manage own family settings" on public.family_settings;
create policy "Users manage own family settings"
  on public.family_settings for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 2. DISH PREFERENCES ─────────────────────────────────────
create table if not exists public.dish_preferences (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  dish_id     int  not null,
  preference  text not null check (preference in ('liked', 'disliked')),
  created_at  timestamptz default now(),
  unique(user_id, dish_id)
);
alter table public.dish_preferences enable row level security;
drop policy if exists "Users manage own dish preferences" on public.dish_preferences;
create policy "Users manage own dish preferences"
  on public.dish_preferences for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 3. MEAL PLAN ────────────────────────────────────────────
create table if not exists public.meal_plan (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  date        date not null,
  meal_type   text not null check (meal_type in ('Breakfast', 'Lunch', 'Dinner')),
  dish_id     int  not null,
  adults      int  not null default 2,
  children    int  not null default 0,
  updated_at  timestamptz default now(),
  unique(user_id, date, meal_type)
);
alter table public.meal_plan enable row level security;
drop policy if exists "Users manage own meal plan" on public.meal_plan;
create policy "Users manage own meal plan"
  on public.meal_plan for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 4. DISH RATINGS ─────────────────────────────────────────
create table if not exists public.dish_ratings (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users(id) on delete cascade,
  dish_id   int  not null,
  score     int  not null check (score between 1 and 5),
  rated_at  timestamptz default now(),
  unique(user_id, dish_id)
);
alter table public.dish_ratings enable row level security;
drop policy if exists "Users manage own ratings" on public.dish_ratings;
create policy "Users manage own ratings"
  on public.dish_ratings for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 5. APP PREFERENCES ──────────────────────────────────────
create table if not exists public.app_preferences (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  active_tag       text default 'All',
  rec_tag          text default 'All',
  open_days        jsonb default '{}',
  cat_open         jsonb default '{}',
  discover_paused  boolean default false,
  updated_at       timestamptz default now(),
  unique(user_id)
);
alter table public.app_preferences enable row level security;
drop policy if exists "Users manage own app preferences" on public.app_preferences;
create policy "Users manage own app preferences"
  on public.app_preferences for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 6. INDEXES ───────────────────────────────────────────────
create index if not exists idx_dish_preferences_user on public.dish_preferences(user_id);
create index if not exists idx_meal_plan_user        on public.meal_plan(user_id);
create index if not exists idx_meal_plan_date        on public.meal_plan(user_id, date);
create index if not exists idx_dish_ratings_user     on public.dish_ratings(user_id);


-- ── VERIFY — should return 5 rows ────────────────────────────
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in (
    'family_settings','dish_preferences',
    'meal_plan','dish_ratings','app_preferences'
  )
order by table_name;
