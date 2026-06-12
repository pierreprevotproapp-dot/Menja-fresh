-- Menja Fresh — FULL-STATE SYNC TABLE (fixes "settings reset on login")
-- Run ONCE in Supabase → SQL Editor.
--
-- The app stores its entire state (household size, setupDone, weekly plan,
-- dietary prefs, macro goals, budget, favourites, learning …) as a single JSON
-- blob in public.user_state. This table was MISSING, so every save silently
-- failed and each login fell back to defaults → the first-run setup reopened
-- and the household/plan appeared reset. Creating it makes cross-device sync work.

create table if not exists public.user_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

-- Each signed-in user may read & write ONLY their own row.
drop policy if exists "user_state_select_own" on public.user_state;
create policy "user_state_select_own" on public.user_state
  for select using (auth.uid() = user_id);

drop policy if exists "user_state_insert_own" on public.user_state;
create policy "user_state_insert_own" on public.user_state
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_state_update_own" on public.user_state;
create policy "user_state_update_own" on public.user_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "user_state_delete_own" on public.user_state;
create policy "user_state_delete_own" on public.user_state
  for delete using (auth.uid() = user_id);
