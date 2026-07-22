# Filling ingredient ASINs (Amazon UK) — setup

Turns `ingredients_for_asins.csv` (293 products) into a real ASIN catalogue via
Amazon's Product Advertising API. That catalogue then powers the one-click
"add my whole grocery list to the Amazon basket" upgrade.

## 1. Requirements
- An **Amazon Associates UK** account with **PA-API access approved**
  (PA-API unlocks after ~3 qualifying affiliate sales — a known Amazon gate).
- Your PA-API credentials: **Access Key**, **Secret Key**, and your **Partner
  Tag** (e.g. `menja-21`).
- Python 3.9+.

```bash
pip install python-amazon-paapi
export PAAPI_ACCESS_KEY=AKIA...
export PAAPI_SECRET_KEY=...
export PAAPI_PARTNER_TAG=yourtag-21
```

## 2. Run
```bash
python3 fill_asins_paapi.py                 # fills ingredients_for_asins.csv in place
python3 fill_asins_paapi.py --limit 20      # test on the first 20 unfilled rows first
```
- **Re-runnable**: rows that already have an ASIN are skipped, and the file is
  saved after every row — safe to stop with Ctrl-C and resume later.
- Rate-limited to ~1 request/sec (PA-API rule); it backs off automatically if
  throttled. 293 rows ≈ 6–7 minutes.

## 3. The curation rule (edit once)
In `pick_best_asin()`:
1. prefer Amazon's own **"by Amazon"** private-label product
2. otherwise the first **Prime**-eligible result
3. otherwise the **top hit**

Change that function once and it applies to every ingredient. You can also
hand-edit any `asin` cell in the CSV afterwards — the script won't overwrite a
row that already has one.

## 4. Output columns added
`asin, title, price, image, prime, brand` — so you can eyeball the picks and
fix any odd matches before we wire them into the cart.

## 5. Next step (me)
Send the filled CSV back. I'll:
- build the Amazon **add-to-cart URL** generator (`/gp/aws/cart/add.html?ASIN.1=…&Quantity.1=…&AssociateTag=…`)
  so the delivery button drops the user's whole current shopping list into **one
  Amazon basket, one tab** — the true one-click cart, affiliate-tagged.
- fall back to the current per-item search for any ingredient without an ASIN.
