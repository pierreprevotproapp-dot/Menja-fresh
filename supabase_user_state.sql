-- Menja Fresh — cross-device sync table
-- Run ONCE in Supabase → SQL Editor (https://supabase.com/dashboard → your project → SQL Editor → New query → paste → Run).
-- Safe to re-run: uses "if not exists" / drop-and-recreate policy.

create table if not exists public.user_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb,
  updated_at timestamptz default now()
);

-- Row Level Security: each user can only read/write their own row
alter table public.user_state enable row level security;

drop policy if exists "own state" on public.user_state;
create policy "own state" on public.user_state
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
