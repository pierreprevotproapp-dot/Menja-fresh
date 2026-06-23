/**
 * Insert new recipes into the Menja Fresh Supabase DB.
 * Usage: SUPABASE_SERVICE_KEY=<key> node insert_recipes.js
 *
 * The service key is in Supabase dashboard → Project Settings → API → service_role key.
 * Never commit that key — pass it as an env var only.
 */

const SUPA_URL = 'https://ekuynkjtcvpiueollznp.supabase.co';
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPA_KEY) {
  console.error('\n❌  SUPABASE_SERVICE_KEY env var not set.');
  console.error('    Run:  SUPABASE_SERVICE_KEY=<your_service_role_key> node insert_recipes.js\n');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// RECIPE DATA
// ─────────────────────────────────────────────────────────────────────────────

const RECIPES = [

  // ── 1. Date & Pistachio Energy Bar ────────────────────────────────────────
  {
    id: 'date-pistachio-energy-bar',
    title: 'Date & Pistachio Energy Bar',
    subtitle: 'Raw, no-bake — dark chocolate coated',
    emoji: '🍫',
    image_url: null,
    tags: ['Vegan', 'GlutenFree', 'Quick'],
    meal: ['snack', 'dessert'],
    categories: ['snack'],
    diet: ['vegan', 'gluten-free', 'dairy-free'],
    is_kids: false,
    prep_minutes: 15,
    cook_minutes: 0,
    servings: 10,
    nutrition: { kcal: 210, protein: 5, carbs: 24, fat: 12, fiber: 4 },
    ingredients: [
      { name: 'Medjool dates, pitted',          emoji: '🌴', amount: '250g' },
      { name: 'Pistachios, shelled unsalted',   emoji: '🌿', amount: '180g' },
      { name: 'Tahini',                         emoji: '🫙', amount: '2 tbsp' },
      { name: 'Vanilla extract',                emoji: '🫙', amount: '1 tsp' },
      { name: 'Ground cardamom',                emoji: '🌿', amount: '¼ tsp' },
      { name: 'Sea salt',                       emoji: '🧂', amount: '1 pinch' },
      { name: 'Dark chocolate 70%+',            emoji: '🍫', amount: '180g' },
      { name: 'Coconut oil',                    emoji: '🥥', amount: '1 tsp' },
      { name: 'Pistachios, roughly chopped',    emoji: '🌿', amount: '40g' },
      { name: 'Fleur de sel',                   emoji: '🧂', amount: '1 pinch' },
    ],
    dressing: [],
    base_ingredients: [],
    steps: [
      {
        title: 'Blend the dates',
        text: 'Add the pitted Medjool dates to a food processor and pulse for 1 minute until a smooth, sticky paste forms.',
        tip: 'If dates feel dry, soak in warm water for 10 min and pat dry before blending.',
      },
      {
        title: 'Build the base',
        text: 'Add the pistachios, tahini, vanilla extract, cardamom and sea salt. Pulse 30–45 seconds until the mixture is a moist, crumbly mass that holds together when pressed. Leave visible pistachio pieces — do not over-process.',
      },
      {
        title: 'Press and freeze',
        text: 'Line a 20 × 10 cm loaf tin with baking paper. Transfer the mixture and press down firmly with the back of a spoon until flat and compact. Freeze for 30 minutes.',
      },
      {
        title: 'Chocolate coating',
        text: 'Melt the dark chocolate with the coconut oil in a bain-marie or microwave (30-second bursts). Lift the frozen base out onto a wire rack and pour the chocolate evenly over it. Immediately scatter the chopped pistachios and fleur de sel on top.',
      },
      {
        title: 'Set and slice',
        text: 'Refrigerate for 20 minutes until the chocolate is firm. Slice into bars with a sharp knife warmed briefly under hot water for clean cuts. Store in the fridge for up to 2 weeks or freeze for 3 months.',
      },
    ],
    i18n: {
      de: {
        title: 'Dattel-Pistazien-Energieriegel',
        subtitle: 'Roh, ohne Backen — mit Zartbitterschokolade',
        ingredients: [
          'Medjool-Datteln, entsteint',
          'Pistazien, geschält und ungesalzen',
          'Tahini (Sesammus)',
          'Vanilleextrakt',
          'Kardamom, gemahlen',
          'Meersalz',
          'Zartbitterschokolade 70%+',
          'Kokosöl',
          'Pistazien, grob gehackt',
          'Fleur de sel',
        ],
        steps: [
          { title: 'Datteln pürieren', text: 'Entsteinte Medjool-Datteln in den Food Processor geben und ca. 1 Minute pulsieren, bis eine glatte, klebrige Paste entsteht.', tip: 'Wenn die Datteln trocken wirken, 10 Min. in warmem Wasser einweichen und gut abtupfen.' },
          { title: 'Masse mischen', text: 'Pistazien, Tahini, Vanilleextrakt, Kardamom und Salz dazugeben. 30–45 Sekunden pulsieren, bis eine feuchte, krümelige Masse entsteht, die beim Zusammendrücken hält. Sichtbare Pistazienstücke sollen erhalten bleiben — nicht zu fein mixen.' },
          { title: 'Formen und einfrieren', text: 'Eine 20 × 10 cm Kastenform mit Backpapier auslegen. Masse hineingeben und mit dem Rückseite eines Löffels fest andrücken. 30 Minuten einfrieren.' },
          { title: 'Schokoladenglasur', text: 'Zartbitterschokolade mit Kokosöl im Wasserbad oder in der Mikrowelle (30-Sekunden-Intervalle) schmelzen. Die gefrorene Basis auf ein Gitter heben und gleichmäßig mit Schokolade übergießen. Sofort gehackte Pistazien und Fleur de sel darüberstreuen.' },
          { title: 'Fest werden lassen und schneiden', text: '20 Minuten kühlen bis die Schokolade fest ist. Mit einem Messer, das kurz unter heißes Wasser gehalten wurde, in Riegel schneiden. Im Kühlschrank bis zu 2 Wochen haltbar, eingefroren bis zu 3 Monate.' },
        ],
      },
      fr: {
        title: 'Barre Énergie Dattes & Pistaches',
        subtitle: 'Crue, sans cuisson — enrobée de chocolat noir',
        ingredients: [
          'Dattes Medjool, dénoyautées',
          'Pistaches, décortiquées et non salées',
          'Tahini (purée de sésame)',
          'Extrait de vanille',
          'Cardamome moulue',
          'Sel de mer',
          'Chocolat noir 70%+',
          'Huile de coco',
          'Pistaches, grossièrement hachées',
          'Fleur de sel',
        ],
        steps: [
          { title: 'Mixer les dattes', text: 'Placer les dattes Medjool dénoyautées dans un robot culinaire et mixer 1 minute jusqu\'à obtenir une pâte lisse et collante.', tip: 'Si les dattes semblent sèches, les tremper 10 min dans de l\'eau tiède et les éponger.' },
          { title: 'Préparer la base', text: 'Ajouter les pistaches, le tahini, l\'extrait de vanille, la cardamome et le sel. Pulser 30–45 secondes jusqu\'à obtenir une masse friable et humide qui se tient lorsqu\'on la presse. Laisser des morceaux de pistaches visibles.' },
          { title: 'Mouler et congeler', text: 'Chemiser un moule à cake 20 × 10 cm de papier sulfurisé. Verser la préparation et tasser fermement. Congeler 30 minutes.' },
          { title: 'Enrobage chocolat', text: 'Faire fondre le chocolat noir avec l\'huile de coco au bain-marie ou au micro-ondes (par tranches de 30 s). Déposer la base congelée sur une grille et napper uniformément de chocolat. Parsemer aussitôt de pistaches et de fleur de sel.' },
          { title: 'Découper', text: 'Réfrigérer 20 minutes jusqu\'à ce que le chocolat soit ferme. Couper en barres avec un couteau passé rapidement sous l\'eau chaude. Se conserve 2 semaines au réfrigérateur ou 3 mois au congélateur.' },
        ],
      },
      es: {
        title: 'Barritas de Dátil y Pistacho con Chocolate',
        subtitle: 'Crudas, sin horno — bañadas en chocolate negro',
        ingredients: [
          'Dátiles Medjool, sin hueso',
          'Pistachos, pelados y sin sal',
          'Tahini (pasta de sésamo)',
          'Extracto de vainilla',
          'Cardamomo molido',
          'Sal marina',
          'Chocolate negro 70%+',
          'Aceite de coco',
          'Pistachos, picados groseramente',
          'Flor de sal',
        ],
        steps: [
          { title: 'Triturar los dátiles', text: 'Poner los dátiles Medjool sin hueso en un robot de cocina y pulsar durante 1 minuto hasta obtener una pasta suave y pegajosa.', tip: 'Si los dátiles están secos, remójalos 10 min en agua tibia y sécalos bien.' },
          { title: 'Preparar la base', text: 'Añadir los pistachos, el tahini, el extracto de vainilla, el cardamomo y la sal. Pulsar 30–45 segundos hasta que la mezcla sea una masa húmeda y granulosa que se cohesiona al presionarla. Conservar trozos visibles de pistacho.' },
          { title: 'Moldear y congelar', text: 'Forrar un molde de 20 × 10 cm con papel de horno. Volcar la masa y compactarla con la parte posterior de una cuchara. Congelar 30 minutos.' },
          { title: 'Baño de chocolate', text: 'Derretir el chocolate negro con el aceite de coco al baño María o en el microondas (intervalos de 30 s). Sacar la base congelada sobre una rejilla y cubrir uniformemente con el chocolate. Decorar de inmediato con pistachos picados y flor de sal.' },
          { title: 'Enfriar y cortar', text: 'Refrigerar 20 minutos hasta que el chocolate esté firme. Cortar en barritas con un cuchillo pasado brevemente por agua caliente. Se conserva 2 semanas en la nevera o 3 meses en el congelador.' },
        ],
      },
    },
  },

  // ── 2. Watermelon & Feta Salad ────────────────────────────────────────────
  {
    id: 'watermelon-feta-salad',
    title: 'Watermelon & Feta Salad',
    subtitle: 'Sweet, salty and refreshing — summer in a bowl',
    emoji: '🍉',
    image_url: null,
    tags: ['Vegetarian', 'GlutenFree', 'Salad', 'Quick', 'Mediterranean'],
    meal: ['lunch', 'starter', 'side', 'main course'],
    categories: ['salad'],
    diet: ['vegetarian', 'gluten-free'],
    is_kids: true,
    prep_minutes: 10,
    cook_minutes: 0,
    servings: 4,
    nutrition: { kcal: 185, protein: 7, carbs: 21, fat: 9, fiber: 1 },
    ingredients: [
      { name: 'Watermelon',                     emoji: '🍉', amount: '800g' },
      { name: 'Feta cheese',                    emoji: '🧀', amount: '200g' },
      { name: 'Fresh mint',                     emoji: '🌿', amount: '15g' },
      { name: 'Red onion',                      emoji: '🧅', amount: '½ pc' },
      { name: 'Lime, juice only',               emoji: '🍋', amount: '1 pc' },
      { name: 'Extra virgin olive oil',         emoji: '🫙', amount: '2 tbsp' },
      { name: 'Fleur de sel',                   emoji: '🧂', amount: '1 pinch' },
      { name: 'Black pepper, freshly ground',   emoji: '🌶️', amount: '1 pinch' },
      { name: 'Rocket (arugula), optional',     emoji: '🥗', amount: '40g' },
    ],
    dressing: ['Lime juice', 'Extra virgin olive oil', 'Fleur de sel'],
    base_ingredients: [],
    steps: [
      {
        title: 'Prepare the watermelon',
        text: 'Remove the rind from the watermelon and cut the flesh into 3–4 cm chunks. Arrange on a wide serving plate or shallow bowl.',
      },
      {
        title: 'Slice the onion',
        text: 'Peel the red onion and slice as thinly as possible. For a milder flavour, soak the slices in cold water for 5 minutes, then drain and pat dry.',
      },
      {
        title: 'Make the dressing',
        text: 'Squeeze the lime juice into a small bowl, add the olive oil and a pinch of fleur de sel. Whisk briefly to combine.',
      },
      {
        title: 'Assemble',
        text: 'Scatter the rocket over the watermelon, then add the red onion. Crumble the feta generously on top. Drizzle with the lime dressing and finish with fresh mint leaves and a crack of black pepper.',
        tip: 'Serve immediately — watermelon releases water if it sits too long. For a dinner party, prepare all ingredients separately and assemble just before serving.',
      },
    ],
    i18n: {
      de: {
        title: 'Wassermelonen-Feta-Salat',
        subtitle: 'Süß, salzig und erfrischend — Sommer in einer Schüssel',
        ingredients: [
          'Wassermelone',
          'Feta-Käse',
          'Frische Minze',
          'Rote Zwiebel',
          'Limette, nur der Saft',
          'Natives Olivenöl extra',
          'Fleur de sel',
          'Schwarzer Pfeffer, frisch gemahlen',
          'Rucola, optional',
        ],
        dressing: ['Limettensaft', 'Natives Olivenöl extra', 'Fleur de sel'],
        steps: [
          { title: 'Wassermelone vorbereiten', text: 'Wassermelone schälen und in 3–4 cm große Stücke schneiden. Auf einer flachen Platte anrichten.' },
          { title: 'Zwiebel schneiden', text: 'Rote Zwiebel schälen und so dünn wie möglich in Ringe schneiden. Für milderen Geschmack 5 Minuten in kaltem Wasser einweichen, dann abtropfen lassen.' },
          { title: 'Dressing zubereiten', text: 'Limettensaft in eine kleine Schüssel pressen, Olivenöl und Fleur de sel dazugeben. Kurz verrühren.' },
          { title: 'Anrichten', text: 'Rucola über die Melone streuen, dann Zwiebeln dazugeben. Feta großzügig darüber krümeln. Mit dem Limetten-Dressing beträufeln und mit Minzblättern sowie frisch gemahlenem Pfeffer abschließen.', tip: 'Sofort servieren — Wassermelone gibt Wasser ab, wenn sie steht. Alle Zutaten getrennt vorbereiten und erst kurz vor dem Servieren anrichten.' },
        ],
      },
      fr: {
        title: 'Salade Pastèque & Feta',
        subtitle: 'Sucrée, salée et rafraîchissante — l\'été dans un bol',
        ingredients: [
          'Pastèque',
          'Feta',
          'Menthe fraîche',
          'Oignon rouge',
          'Citron vert, jus uniquement',
          'Huile d\'olive extra vierge',
          'Fleur de sel',
          'Poivre noir, fraîchement moulu',
          'Roquette, optionnelle',
        ],
        dressing: ['Jus de citron vert', 'Huile d\'olive extra vierge', 'Fleur de sel'],
        steps: [
          { title: 'Préparer la pastèque', text: 'Retirer la peau de la pastèque et couper la chair en morceaux de 3–4 cm. Disposer sur un plat de service.' },
          { title: 'Émincer l\'oignon', text: 'Peler l\'oignon rouge et l\'émincer aussi finement que possible. Pour un goût plus doux, le tremper 5 min dans de l\'eau froide, puis égoutter.' },
          { title: 'Préparer la vinaigrette', text: 'Presser le jus de citron vert dans un bol, ajouter l\'huile d\'olive et la fleur de sel. Fouetter brièvement.' },
          { title: 'Dresser', text: 'Répartir la roquette sur la pastèque, puis ajouter l\'oignon. Émietter généreusement la feta. Arroser de vinaigrette et terminer avec les feuilles de menthe et un tour de poivre.', tip: 'Servir immédiatement — la pastèque rend de l\'eau rapidement. Préparer les ingrédients séparément et assembler juste avant de servir.' },
        ],
      },
      es: {
        title: 'Ensalada de Sandía y Feta',
        subtitle: 'Dulce, salada y refrescante — el verano en un bol',
        ingredients: [
          'Sandía',
          'Queso feta',
          'Menta fresca',
          'Cebolla roja',
          'Lima, solo el zumo',
          'Aceite de oliva virgen extra',
          'Flor de sal',
          'Pimienta negra, recién molida',
          'Rúcula, opcional',
        ],
        dressing: ['Zumo de lima', 'Aceite de oliva virgen extra', 'Flor de sal'],
        steps: [
          { title: 'Preparar la sandía', text: 'Retirar la corteza de la sandía y cortar la pulpa en trozos de 3–4 cm. Disponer en una fuente amplia.' },
          { title: 'Cortar la cebolla', text: 'Pelar la cebolla roja y cortarla en rodajas lo más finas posible. Para un sabor más suave, remojarlas 5 minutos en agua fría y escurrir.' },
          { title: 'Preparar el aliño', text: 'Exprimir el zumo de lima en un cuenco pequeño, añadir el aceite de oliva y la flor de sal. Remover brevemente.' },
          { title: 'Montar la ensalada', text: 'Repartir la rúcula sobre la sandía, añadir la cebolla. Desmenuzar el feta generosamente por encima. Regar con el aliño y terminar con hojas de menta y pimienta negra recién molida.', tip: 'Servir de inmediato — la sandía suelta agua si reposa. Preparar todos los ingredientes por separado y montar justo antes de servir.' },
        ],
      },
    },
  },

];

// ─────────────────────────────────────────────────────────────────────────────
// INSERT LOGIC
// ─────────────────────────────────────────────────────────────────────────────

async function upsertRecipe(recipe) {
  const res = await fetch(`${SUPA_URL}/rest/v1/recipes`, {
    method: 'POST',
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': `Bearer ${SUPA_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status} for "${recipe.id}": ${body}`);
  }
  return res.json();
}

(async () => {
  console.log(`\n🥗 Menja Fresh — inserting ${RECIPES.length} recipes into Supabase\n`);
  let ok = 0;
  for (const r of RECIPES) {
    try {
      await upsertRecipe(r);
      console.log(`  ✅  ${r.id}`);
      ok++;
    } catch (e) {
      console.error(`  ❌  ${r.id}: ${e.message}`);
    }
  }
  console.log(`\n${ok}/${RECIPES.length} recipes inserted.\n`);
  if (ok < RECIPES.length) process.exit(1);
})();
