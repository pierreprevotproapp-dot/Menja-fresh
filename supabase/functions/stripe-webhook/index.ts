// Menja Fresh — Stripe webhook (Supabase Edge Function)
// Grants/revokes Premium by setting auth user_metadata.plan.
//
// Deploy:
//   supabase functions deploy stripe-webhook --no-verify-jwt
// Secrets (set once):
//   supabase secrets set STRIPE_SECRET_KEY=sk_live_... STRIPE_WEBHOOK_SECRET=whsec_... \
//     SB_URL=https://YOURPROJECT.supabase.co SB_SERVICE_ROLE_KEY=eyJ...service_role
// Then in Stripe → Developers → Webhooks, add the function URL and subscribe to:
//   checkout.session.completed, customer.subscription.deleted, customer.subscription.updated

import Stripe from "https://esm.sh/stripe@14?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const supabase = createClient(Deno.env.get("SB_URL")!, Deno.env.get("SB_SERVICE_ROLE_KEY")!);

async function setPlan(userId: string | null, plan: string) {
  if (!userId) return;
  await supabase.auth.admin.updateUserById(userId, { user_metadata: { plan } });
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, webhookSecret);
  } catch (err) {
    return new Response(`Webhook signature error: ${(err as Error).message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;
      const userId = s.client_reference_id;          // we passed this from the app
      await setPlan(userId, "premium");
      // remember customer ↔ user so we can downgrade on cancellation
      if (userId && s.customer) {
        await supabase.from("stripe_customers")
          .upsert({ customer_id: String(s.customer), user_id: userId }, { onConflict: "customer_id" });
      }
    } else if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      const { data } = await supabase.from("stripe_customers")
        .select("user_id").eq("customer_id", String(sub.customer)).single();
      if (data?.user_id) await setPlan(data.user_id, "registered"); // back to free
    } else if (event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription;
      const active = sub.status === "active" || sub.status === "trialing";
      const { data } = await supabase.from("stripe_customers")
        .select("user_id").eq("customer_id", String(sub.customer)).single();
      if (data?.user_id) await setPlan(data.user_id, active ? "premium" : "registered");
    }
  } catch (err) {
    console.error("handler error", err);
    return new Response("handler error", { status: 500 });
  }
  return new Response("ok", { status: 200 });
});
