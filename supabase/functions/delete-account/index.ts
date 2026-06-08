// Menja Fresh — account deletion (Supabase Edge Function)
// Verifies the caller's access token, then deletes their data + auth user
// using the service-role key. Required for GDPR (Art. 17) and the App Store.
//
// Deploy:
//   supabase functions deploy delete-account --no-verify-jwt
// Secrets (already set for the Stripe webhook; reuse the same):
//   supabase secrets set SB_URL=https://YOURPROJECT.supabase.co SB_SERVICE_ROLE_KEY=eyJ...service_role
//
// The app calls it with the logged-in user's access token in the Authorization header.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  try {
    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "missing token" }, 401);

    const admin = createClient(Deno.env.get("SB_URL")!, Deno.env.get("SB_SERVICE_ROLE_KEY")!);

    // Validate the caller and get their user id
    const { data: { user }, error: uErr } = await admin.auth.getUser(token);
    if (uErr || !user) return json({ error: "invalid token" }, 401);
    const uid = user.id;

    // Remove the user's data, then the auth user itself
    await admin.from("user_state").delete().eq("user_id", uid);
    await admin.from("stripe_customers").delete().eq("user_id", uid);
    const { error: dErr } = await admin.auth.admin.deleteUser(uid);
    if (dErr) throw dErr;

    return json({ ok: true });
  } catch (e) {
    return json({ error: String((e as Error).message || e) }, 500);
  }
});
