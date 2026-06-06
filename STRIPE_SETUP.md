# Menja Fresh — Stripe setup (lightweight, no contracts)

Two parts: **(A)** take the payment with Stripe Payment Links, **(B)** unlock Premium automatically with a webhook.

---

## A) Payment Links (5 min, no code from you except pasting 2 URLs)

1. Stripe Dashboard → **Product catalogue** → create product **"Menja Premium"** with two prices:
   - **€4.99 / month** (recurring)
   - **€44 / year** (recurring)  *(optionally add a 7-day free trial on each price)*
2. Dashboard → **Payment Links** → create one link per price.
   - In each link's settings, set **"After payment → Redirect"** to `https://www.menja-fresh.com` (so they come back).
3. Copy each link's base URL (looks like `https://buy.stripe.com/abc123`).
4. In `index.html`, paste them into:
   ```js
   const STRIPE_LINKS = { monthly: 'https://buy.stripe.com/...', yearly: 'https://buy.stripe.com/...' };
   ```
   The app automatically appends `?client_reference_id=<the user's id>` so the webhook knows who paid. ✅

That alone takes payments. But the user won't become Premium until part B.

---

## B) The webhook that grants Premium (the important bit)

The browser can't be trusted to make itself Premium, so a tiny server function does it. We use a **Supabase Edge Function** (you already use Supabase).

### 1. One-time SQL — a table to map Stripe customers to users
Supabase → SQL Editor → run:
```sql
create table if not exists public.stripe_customers (
  customer_id text primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  updated_at  timestamptz default now()
);
alter table public.stripe_customers enable row level security;
-- no anon policies: only the service-role (the webhook) touches this table
```

### 2. Deploy the function (file already in repo: `supabase/functions/stripe-webhook/index.ts`)
Install the Supabase CLI, then:
```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy stripe-webhook --no-verify-jwt
supabase secrets set \
  STRIPE_SECRET_KEY=sk_live_xxx \
  STRIPE_WEBHOOK_SECRET=whsec_xxx \
  SB_URL=https://YOURPROJECT.supabase.co \
  SB_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```
(`SB_SERVICE_ROLE_KEY` is in Supabase → Project Settings → API → service_role. Keep it secret — server only.)

### 3. Point Stripe at the function
Stripe → Developers → **Webhooks** → Add endpoint:
- URL: `https://YOURPROJECT.supabase.co/functions/v1/stripe-webhook`
- Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
- Copy the signing secret → that's the `STRIPE_WEBHOOK_SECRET` above.

### 4. How it flows
- User taps **Start free trial** → Stripe checkout (with their user id attached).
- Payment succeeds → Stripe calls the webhook → function sets `user_metadata.plan = 'premium'`.
- User reloads / next session → `getUserTier()` reads `premium` → all Premium features unlock.
- Cancellation → webhook sets plan back to `registered` (free).

---

## Simplest possible start (if you want to launch before the webhook)
Skip part B for now: take payments via Payment Links, and **manually** set a paying user to Premium in Supabase → Authentication → Users → (user) → edit `user_metadata` → `{"plan":"premium"}`. Fine for the first handful of customers; automate with the webhook once volume grows.
