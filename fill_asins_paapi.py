#!/usr/bin/env python3
"""
fill_asins_paapi.py — auto-fill the `asin` column of ingredients_for_asins.csv
using Amazon's Product Advertising API (PA-API 5).

For each ingredient it runs one SearchItems call (SearchIndex =
GroceryAndGourmetFood, marketplace Amazon.co.uk) and writes back the chosen
ASIN plus title / price / image / Prime status. Re-runnable and incremental:
rows that already have an ASIN are skipped, and the CSV is saved after every
row, so you can stop/resume and it never re-charges quota for done rows.

The single curation rule lives in pick_best_asin():
    1) prefer Amazon's own "by Amazon" private-label product
    2) otherwise the first Prime-eligible result
    3) otherwise the top hit
Tweak it once — it applies to every row.

SETUP
    pip install python-amazon-paapi
    export PAAPI_ACCESS_KEY=...          # from Amazon Associates → PA-API
    export PAAPI_SECRET_KEY=...
    export PAAPI_PARTNER_TAG=yourtag-21  # your UK Associates tag
    python3 fill_asins_paapi.py            # fills ingredients_for_asins.csv in place

Notes
  • Needs an Amazon Associates UK account with PA-API access approved
    (PA-API requires ~3 qualifying sales before it unlocks).
  • PA-API is rate-limited (≈1 request/sec to start). REQUEST_DELAY handles it;
    on a TooManyRequests error the script backs off and retries.
"""

import argparse
import csv
import os
import sys
import time

try:
    from amazon_paapi import AmazonApi
except ImportError:
    sys.exit("Missing dependency. Run:  pip install python-amazon-paapi")

REQUEST_DELAY = 1.2          # seconds between calls (respect PA-API TPS limit)
MAX_RETRIES = 4             # on throttling / transient errors
EXTRA_COLUMNS = ["asin", "title", "price", "image", "prime", "brand"]


def _attr(obj, *path, default=None):
    """Safely walk a chain of attributes/index — PA-API objects are deeply nested."""
    cur = obj
    for p in path:
        if cur is None:
            return default
        try:
            cur = cur[p] if isinstance(p, int) else getattr(cur, p)
        except (AttributeError, IndexError, TypeError, KeyError):
            return default
    return cur if cur is not None else default


def pick_best_asin(items):
    """Curation rule — change here once, applies to every ingredient."""
    if not items:
        return None
    # 1) Amazon's own private label ("by Amazon" / "Amazon Fresh" brand)
    for it in items:
        brand = (_attr(it, "item_info", "by_line_info", "brand", "display_value", default="") or "").lower()
        if "amazon" in brand:
            return it
    # 2) first Prime-eligible result
    for it in items:
        if _attr(it, "offers", "listings", 0, "delivery_info", "is_prime_eligible", default=False):
            return it
    # 3) top hit
    return items[0]


def describe(it):
    return {
        "asin": _attr(it, "asin", default="") or "",
        "title": (_attr(it, "item_info", "title", "display_value", default="") or "")[:120],
        "price": _attr(it, "offers", "listings", 0, "price", "display_amount", default="") or "",
        "image": _attr(it, "images", "primary", "large", "url", default="") or "",
        "prime": "yes" if _attr(it, "offers", "listings", 0, "delivery_info", "is_prime_eligible", default=False) else "",
        "brand": _attr(it, "item_info", "by_line_info", "brand", "display_value", default="") or "",
    }


def search_one(api, keywords):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            res = api.search_items(
                keywords=keywords,
                search_index="GroceryAndGourmetFood",
                item_count=10,
            )
            return getattr(res, "items", None) or []
        except Exception as e:  # noqa: BLE001 — PA-API raises many typed errors; treat uniformly
            msg = str(e)
            if "TooManyRequests" in msg or "throttl" in msg.lower():
                wait = REQUEST_DELAY * (2 ** attempt)
                print(f"    throttled, backing off {wait:.0f}s…")
                time.sleep(wait)
                continue
            if "NoResults" in msg or "ItemNotAccessible" in msg:
                return []
            print(f"    error: {msg[:140]}")
            return []
    return []


def main():
    ap = argparse.ArgumentParser(description="Fill the asin column via Amazon PA-API.")
    ap.add_argument("csv", nargs="?", default="ingredients_for_asins.csv")
    ap.add_argument("--search-col", default="search_term_amazon_fresh_uk",
                    help="CSV column to use as the search keyword")
    ap.add_argument("--country", default="UK")
    ap.add_argument("--limit", type=int, default=0, help="only process the first N unfilled rows (0 = all)")
    ap.add_argument("--skip-flagged", action="store_true",
                    help="leave vague rows empty ('X or Y', 'Salt & pepper', 'Pinch', 'to taste/serve')")
    args = ap.parse_args()

    import re
    FLAGGED = re.compile(r"\bor\b|salt\s*&\s*pepper|pinch|to taste|to serve", re.I)

    key = os.environ.get("PAAPI_ACCESS_KEY")
    secret = os.environ.get("PAAPI_SECRET_KEY")
    tag = os.environ.get("PAAPI_PARTNER_TAG")
    if not (key and secret and tag):
        sys.exit("Set PAAPI_ACCESS_KEY, PAAPI_SECRET_KEY and PAAPI_PARTNER_TAG in your environment.")

    api = AmazonApi(key, secret, tag, args.country)

    with open(args.csv, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
        fieldnames = list(rows[0].keys()) if rows else []
    for c in EXTRA_COLUMNS:
        if c not in fieldnames:
            fieldnames.append(c)

    def save():
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=fieldnames)
            w.writeheader()
            w.writerows(rows)

    done = 0
    for i, row in enumerate(rows, 1):
        if (row.get("asin") or "").strip():
            continue  # already filled — skip (re-runnable)
        keywords = (row.get(args.search_col) or row.get("product") or "").strip().strip('"')
        if not keywords:
            continue
        if args.skip_flagged and FLAGGED.search(row.get("product", "")):
            print(f"[{i}/{len(rows)}] skip (flagged): {row.get('product')}")
            continue
        print(f"[{i}/{len(rows)}] {keywords}")
        items = search_one(api, keywords)
        best = pick_best_asin(items)
        if best:
            row.update(describe(best))
            print(f"    → {row['asin']}  {row['title'][:60]}  {row['price']}  {'PRIME' if row['prime'] else ''}")
        else:
            row["asin"] = row.get("asin", "")
            print("    → no result")
        save()  # incremental — safe to Ctrl-C and resume
        done += 1
        if args.limit and done >= args.limit:
            print(f"Reached --limit {args.limit}, stopping.")
            break
        time.sleep(REQUEST_DELAY)

    filled = sum(1 for r in rows if (r.get("asin") or "").strip())
    print(f"\nDone. {filled}/{len(rows)} rows have an ASIN. Saved to {args.csv}.")


if __name__ == "__main__":
    main()
