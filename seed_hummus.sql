-- Menja Fresh — homemade hummus (the internet's best-rated method).
-- Based on Ottolenghi/Tamimi's famous "Jerusalem" hummus (Food52, MasterClass) with the
-- family-friendly canned-chickpea shortcut popularised by Cookie+Kate ("Best Hummus",
-- thousands of 5★ reviews): simmer canned chickpeas with baking soda until the skins
-- collapse, whip the tahini-lemon cream FIRST, then blend long with ice water.
-- Run in: Supabase Dashboard → SQL Editor → paste → Run. Safe to re-run (upsert).

INSERT INTO public.recipes
  (id, title, subtitle, emoji, image_url, tags, meal, categories, diet,
   is_kids, prep_minutes, cook_minutes, servings, nutrition,
   ingredients, dressing, base_ingredients, steps, i18n)
VALUES
(
  'homemade-hummus',
  'Silky Homemade Hummus',
  'The famous method — baking-soda soft chickpeas, whipped tahini, ice water',
  '🥣',
  NULL,
  ARRAY['Vegan','GlutenFree','Basic'],
  ARRAY['snack','side'],
  ARRAY['Basic'],
  ARRAY['vegan','gluten-free','dairy-free'],
  true,
  10, 20, 6,
  '{"kcal":190,"protein":7,"carbs":15,"fat":11,"fiber":5}'::jsonb,
  '[
    {"name":"Chickpeas (canned, drained)","emoji":"🫘","amount":"480g"},
    {"name":"Tahini","emoji":"🫙","amount":"90g"},
    {"name":"Lemon juice","emoji":"🍋","amount":"3 tbsp"},
    {"name":"Garlic","emoji":"🧄","amount":"1 clove"},
    {"name":"Baking soda","emoji":"🧂","amount":"1/2 tsp"},
    {"name":"Ice water","emoji":"🧊","amount":"60ml"},
    {"name":"Ground cumin","emoji":"🌿","amount":"1/2 tsp"},
    {"name":"Olive oil (to serve)","emoji":"🫒","amount":"2 tbsp"}
  ]'::jsonb,
  NULL,
  '["Salt"]'::jsonb,
  '[
    {"title":"Soften the chickpeas","text":"Simmer the drained chickpeas with the baking soda in fresh water for 20 minutes, until the skins collapse and they are very soft. Drain.","ings":[0,4]},
    {"title":"Whip the tahini cream","text":"Blend tahini, lemon juice, garlic and salt until the mixture lightens and thickens — this is the secret to silky hummus.","ings":[1,2,3]},
    {"title":"Blend long","text":"Add the warm chickpeas and blend 3–5 minutes, drizzling in the ice water, until completely smooth and creamy.","ings":[0,5]},
    {"title":"Serve","text":"Spoon into a bowl, swirl, dust with cumin and finish with olive oil.","ings":[6,7],"tip":"Warm chickpeas + ice water is the pro trick — the temperature shock makes it extra fluffy."}
  ]'::jsonb,
  '{
    "de":{"title":"Seidiges selbstgemachtes Hummus","subtitle":"Die berühmte Methode — Natron-weiche Kichererbsen, aufgeschlagenes Tahini, Eiswasser",
      "ingredients":["Kichererbsen (Dose, abgetropft)","Tahini","Zitronensaft","Knoblauch","Natron","Eiswasser","Gemahlener Kreuzkümmel","Olivenöl (zum Servieren)"],
      "base":["Salz"],
      "steps":[["Kichererbsen weich kochen","Abgetropfte Kichererbsen mit Natron in frischem Wasser 20 Minuten köcheln, bis die Schalen zerfallen und sie sehr weich sind. Abgießen."],
               ["Tahini-Creme aufschlagen","Tahini, Zitronensaft, Knoblauch und Salz mixen, bis die Masse hell und dick wird — das Geheimnis für seidiges Hummus."],
               ["Lange mixen","Warme Kichererbsen zugeben und 3–5 Minuten mixen, dabei Eiswasser einlaufen lassen, bis alles komplett glatt und cremig ist."],
               ["Servieren","In eine Schale geben, Mulde ziehen, mit Kreuzkümmel bestäuben und mit Olivenöl beträufeln."]]},
    "fr":{"title":"Houmous maison soyeux","subtitle":"La méthode culte — pois chiches fondants au bicarbonate, tahini fouetté, eau glacée",
      "ingredients":["Pois chiches (boîte, égouttés)","Tahini","Jus de citron","Ail","Bicarbonate","Eau glacée","Cumin moulu","Huile d''olive (pour servir)"],
      "base":["Sel"],
      "steps":[["Attendrir les pois chiches","Faire mijoter les pois chiches égouttés avec le bicarbonate 20 minutes, jusqu''à ce que les peaux se défassent. Égoutter."],
               ["Fouetter la crème de tahini","Mixer tahini, citron, ail et sel jusqu''à ce que le mélange blanchisse et épaississe."],
               ["Mixer longuement","Ajouter les pois chiches chauds et mixer 3–5 minutes en versant l''eau glacée, jusqu''à une texture parfaitement lisse."],
               ["Servir","Verser dans un bol, creuser, saupoudrer de cumin et arroser d''huile d''olive."]]},
    "es":{"title":"Hummus casero sedoso","subtitle":"El método famoso — garbanzos tiernos con bicarbonato, tahini batido, agua helada",
      "ingredients":["Garbanzos (bote, escurridos)","Tahini","Zumo de limón","Ajo","Bicarbonato","Agua helada","Comino molido","Aceite de oliva (para servir)"],
      "base":["Sal"],
      "steps":[["Ablanda los garbanzos","Cuece los garbanzos escurridos con el bicarbonato 20 minutos, hasta que las pieles se deshagan. Escurre."],
               ["Bate la crema de tahini","Tritura tahini, limón, ajo y sal hasta que la mezcla aclare y espese."],
               ["Tritura a fondo","Añade los garbanzos calientes y tritura 3–5 minutos añadiendo el agua helada, hasta que quede totalmente liso."],
               ["Sirve","Pon en un bol, haz un remolino, espolvorea comino y termina con aceite de oliva."]]}
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, emoji=EXCLUDED.emoji,
  tags=EXCLUDED.tags, meal=EXCLUDED.meal, categories=EXCLUDED.categories, diet=EXCLUDED.diet,
  is_kids=EXCLUDED.is_kids, prep_minutes=EXCLUDED.prep_minutes, cook_minutes=EXCLUDED.cook_minutes,
  servings=EXCLUDED.servings, nutrition=EXCLUDED.nutrition, ingredients=EXCLUDED.ingredients,
  dressing=EXCLUDED.dressing, base_ingredients=EXCLUDED.base_ingredients, steps=EXCLUDED.steps, i18n=EXCLUDED.i18n;
