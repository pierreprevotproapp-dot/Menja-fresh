-- Menja Fresh — track which delivery supermarket users pick.
-- Run in Supabase Dashboard → SQL Editor. Insert-only for the app (anon):
-- users can log a click but cannot read the table, so it stays private analytics.

create table if not exists public.delivery_clicks (
  id         bigint generated always as identity primary key,
  store      text not null,          -- 'mercadona' | 'carrefour' | 'veritas' | …
  country    text,                   -- 'ES', …
  lang       text,
  user_id    uuid,                   -- null for guests
  created_at timestamptz not null default now()
);

alter table public.delivery_clicks enable row level security;

-- allow anyone (anon + logged-in) to INSERT a click; no SELECT policy = not readable
drop policy if exists "insert delivery clicks" on public.delivery_clicks;
create policy "insert delivery clicks"
  on public.delivery_clicks for insert
  to anon, authenticated
  with check (true);

-- How to read your numbers (as the project owner, in the SQL editor):
--   select store, country, count(*) from public.delivery_clicks group by 1,2 order by 3 desc;
