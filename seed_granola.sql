-- Menja Fresh — homemade granola (the internet's best-rated healthy version).
-- Based on Cookie + Kate's "Healthy Granola" (900+ five-star reviews): whole rolled
-- oats, nuts/seeds, olive or coconut oil, naturally sweetened with maple syrup, baked
-- low for big crunchy clusters. meal=['breakfast'] so it lands in the Breakfast slot.
-- Run in: Supabase Dashboard → SQL Editor → paste → Run. Safe to re-run (upsert).

INSERT INTO public.recipes
  (id, title, subtitle, emoji, image_url, tags, meal, categories, diet,
   is_kids, prep_minutes, cook_minutes, servings, nutrition,
   ingredients, dressing, base_ingredients, steps, i18n)
VALUES
(
  'homemade-granola',
  'Crunchy Homemade Granola',
  'Big clusters, olive oil & maple — naturally sweetened',
  '🥣',
  NULL,
  ARRAY['Vegan','Vegetarian','Kid-Friendly'],
  ARRAY['breakfast','snack'],
  ARRAY['breakfast'],
  ARRAY['vegan','vegetarian','dairy-free'],
  true,
  10, 24, 6,
  '{"kcal":280,"protein":6,"carbs":30,"fat":15,"fiber":5}'::jsonb,
  '[
    {"name":"Rolled oats",                    "emoji":"🌾","amount":"300g"},
    {"name":"Mixed nuts & seeds (almonds, pepitas)","emoji":"🌰","amount":"150g"},
    {"name":"Olive oil (or coconut oil)",     "emoji":"🫒","amount":"80ml"},
    {"name":"Maple syrup (or honey)",         "emoji":"🍁","amount":"80ml"},
    {"name":"Vanilla extract",                "emoji":"🫙","amount":"1 tsp"},
    {"name":"Ground cinnamon",                "emoji":"🌿","amount":"1 tsp"},
    {"name":"Dried cranberries (or raisins)", "emoji":"🍒","amount":"80g"}
  ]'::jsonb,
  NULL,
  '["Fine sea salt"]'::jsonb,
  '[
    {"title":"Heat the oven","text":"Heat the oven to 175°C and line a baking tray with parchment.","ings":[]},
    {"title":"Mix the dry","text":"In a big bowl, stir the oats, nuts and seeds, cinnamon and a good pinch of salt.","ings":[0,1,5]},
    {"title":"Coat","text":"Pour in the oil, maple syrup and vanilla and stir until every oat is glossy.","ings":[2,3,4]},
    {"title":"Bake for clusters","text":"Spread on the tray and press down firmly. Bake 22–24 min, stirring once halfway, until golden.","ings":[],"tip":"Press it flat and don''t stir while it cools — that''s how you get big crunchy clusters."},
    {"title":"Cool & finish","text":"Let it cool completely on the tray, then break into clusters and stir through the dried fruit. Keeps 2 weeks in a jar.","ings":[6]}
  ]'::jsonb,
  '{
    "de":{"title":"Knuspriges selbstgemachtes Granola","subtitle":"Große Cluster, Olivenöl & Ahornsirup — natürlich gesüßt",
      "ingredients":["Haferflocken","Nuss-Kern-Mix (Mandeln, Kürbiskerne)","Olivenöl (oder Kokosöl)","Ahornsirup (oder Honig)","Vanilleextrakt","Gemahlener Zimt","Getrocknete Cranberrys (oder Rosinen)"],
      "base":["Feines Meersalz"],
      "steps":[["Ofen vorheizen","Ofen auf 175°C vorheizen und ein Blech mit Backpapier auslegen."],
               ["Trockenes mischen","In einer großen Schüssel Haferflocken, Nüsse und Kerne, Zimt und eine kräftige Prise Salz vermengen."],
               ["Ummanteln","Öl, Ahornsirup und Vanille dazugeben und rühren, bis jede Flocke glänzt."],
               ["Für Cluster backen","Auf dem Blech verteilen und fest andrücken. 22–24 Min. backen, einmal nach der Hälfte wenden, bis goldbraun."],
               ["Auskühlen & vollenden","Vollständig auf dem Blech auskühlen lassen, in Cluster brechen und die Trockenfrüchte unterheben. Hält 2 Wochen im Glas."]]},
    "fr":{"title":"Granola maison croustillant","subtitle":"Gros clusters, huile d''olive & sirop d''érable — sucré naturellement",
      "ingredients":["Flocons d''avoine","Mélange noix & graines (amandes, courge)","Huile d''olive (ou de coco)","Sirop d''érable (ou miel)","Extrait de vanille","Cannelle moulue","Cranberries séchées (ou raisins secs)"],
      "base":["Sel fin de mer"],
      "steps":[["Préchauffer le four","Préchauffe le four à 175°C et tapisse une plaque de papier cuisson."],
               ["Mélanger le sec","Dans un grand bol, mélange l''avoine, les noix et graines, la cannelle et une bonne pincée de sel."],
               ["Enrober","Verse l''huile, le sirop d''érable et la vanille, et mélange jusqu''à ce que tout brille."],
               ["Cuire en clusters","Étale sur la plaque et presse fermement. Cuis 22–24 min en remuant une fois à mi-cuisson, jusqu''à doré."],
               ["Refroidir & finir","Laisse refroidir complètement sur la plaque, casse en clusters et incorpore les fruits secs. Se garde 2 semaines en bocal."]]},
    "es":{"title":"Granola casera crujiente","subtitle":"Grandes clusters, aceite de oliva y sirope de arce — sin azúcar añadido",
      "ingredients":["Copos de avena","Mezcla de frutos secos y semillas (almendras, pipas)","Aceite de oliva (o de coco)","Sirope de arce (o miel)","Extracto de vainilla","Canela molida","Arándanos secos (o pasas)"],
      "base":["Sal fina"],
      "steps":[["Calienta el horno","Calienta el horno a 175°C y forra una bandeja con papel de hornear."],
               ["Mezcla lo seco","En un bol grande, mezcla la avena, los frutos secos y semillas, la canela y una buena pizca de sal."],
               ["Cubre","Añade el aceite, el sirope y la vainilla y remueve hasta que todo brille."],
               ["Hornea en clusters","Extiende en la bandeja y presiona bien. Hornea 22–24 min, removiendo una vez a media cocción, hasta dorar."],
               ["Enfría y termina","Deja enfriar del todo en la bandeja, rompe en clusters e incorpora la fruta seca. Se conserva 2 semanas en un tarro."]]}
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, emoji=EXCLUDED.emoji,
  tags=EXCLUDED.tags, meal=EXCLUDED.meal, categories=EXCLUDED.categories, diet=EXCLUDED.diet,
  is_kids=EXCLUDED.is_kids, prep_minutes=EXCLUDED.prep_minutes, cook_minutes=EXCLUDED.cook_minutes,
  servings=EXCLUDED.servings, nutrition=EXCLUDED.nutrition, ingredients=EXCLUDED.ingredients,
  dressing=EXCLUDED.dressing, base_ingredients=EXCLUDED.base_ingredients, steps=EXCLUDED.steps, i18n=EXCLUDED.i18n;
