# Menja Fresh — Deployment Guide (www.menja-fresh.com)

---

## Step 1 — Deploy to Vercel

### Option A: Drag & Drop
1. Go to https://vercel.com → sign up free
2. Click **Add New → Project → Deploy without Git**
3. Drag this entire `menja-deploy` folder
4. Done — you get a temporary URL like `menja-fresh-xxx.vercel.app`

### Option B: CLI
```bash
cd menja-deploy
npx vercel --prod
```

---

## Step 2 — Connect your custom domain on Vercel

1. In Vercel → open your project → **Settings → Domains**
2. Click **Add Domain** → type `www.menja-fresh.com` → Add
3. Also add `menja-fresh.com` (Vercel will redirect it to www automatically)
4. Vercel gives you two DNS records to add — go to your domain registrar:

**Add these at your domain registrar (GoDaddy / Namecheap / etc.):**

| Type  | Name | Value |
|-------|------|-------|
| CNAME | www  | cname.vercel-dns.com |
| A     | @    | 76.76.21.21 |

5. Wait 5–30 minutes for DNS to propagate
6. Vercel issues HTTPS automatically — no setup needed ✓

---

## Step 3 — Update Supabase

Go to **Supabase Dashboard → Authentication → URL Configuration**

| Field | Value |
|-------|-------|
| **Site URL** | `https://www.menja-fresh.com` |
| **Redirect URLs** | `https://www.menja-fresh.com` |
|  | `https://www.menja-fresh.com/**` |
|  | `https://menja-fresh.com` |
|  | `https://menja-fresh.com/**` |

Click **Save**.

---

## Step 4 — Update Google OAuth

In **Google Cloud Console → APIs & Services → Credentials → your OAuth Client**:

**Authorized JavaScript origins — add:**
```
https://www.menja-fresh.com
https://menja-fresh.com
```

**Authorized redirect URIs — make sure this exists:**
```
https://ekuynkjtcvpiueollznp.supabase.co/auth/v1/callback
```

Click **Save**.

---

## Step 5 — Test

1. Open https://www.menja-fresh.com
2. Create account → confirm email → sign in ✓

---

## Files in this folder

| File | Purpose |
|------|---------|
| `index.html` | The full Menja Fresh app |
| `manifest.json` | PWA — makes it installable on phones |
| `sw.js` | Service worker — offline support |
| `vercel.json` | Vercel routing config |
| `netlify.toml` | Netlify config (backup) |
| `_redirects` | Cloudflare Pages routing (backup) |
| `supabase_setup.sql` | Run in Supabase SQL Editor if needed |
| `icons/` | App icons (192px and 512px) |
| `.well-known/assetlinks.json` | For Play Store TWA (fill in later) |
