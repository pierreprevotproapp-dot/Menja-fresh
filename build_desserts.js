// Menja Fresh — build 10 "healthy but not too healthy" desserts.
// Appends full EN rows to new_recipes.json and i18n entries to recipes_i18n.json.
// Step chips are built from ingredient INDICES, so amounts/emoji stay identical
// across all 4 languages (only names translate) → alignment is guaranteed.
const fs = require('fs');

// spec.ings: [emoji, EN name, amount].  spec.steps: [title, text, [ingIdx...], tip|null]
// spec.tr[lang]: { title, names:[...ingredient names...], base:[...], steps:[[title,text],...] }
const R = [
{
  id:'greek-yogurt-berry-bark', emoji:'🍫', is_kids:true,
  title:'Frozen Greek Yogurt Berry Bark',
  subtitle:'A crunchy frozen treat that tastes like dessert, not diet food',
  tags:['Vegetarian','Gluten-free','Kid-Friendly'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegetarian','Gluten-free'], prep:10, cook:0, servings:6,
  nutrition:{fat:6,kcal:150,carbs:16,fiber:2,protein:8},
  ings:[['🥛','Greek yogurt','400g'],['🍯','Honey','2 tbsp'],['🫐','Mixed berries','150g'],['🍫','Dark chocolate','30g']],
  base:['Vanilla extract'], dressing:[],
  steps:[
    ['Sweeten the yogurt','Stir the Greek yogurt with the honey and a little vanilla until smooth and creamy.',[0,1],null],
    ['Spread & top','Spread the yogurt onto a lined tray in a ~1 cm layer. Scatter the berries and chopped dark chocolate over the top.',[2,3],'Press the berries in lightly so they freeze into the bark.'],
    ['Freeze & break','Freeze for at least 3 hours until solid, then break into shards. Keep in the freezer until serving.',[],null],
  ],
  image_prompt:'Frozen Greek yogurt bark broken into shards on a marble board, topped with raspberries, blueberries and dark chocolate shavings, bright airy food photography',
  tr:{
    de:{title:'Gefrorenes Joghurt-Beeren-Bark', names:['Griechischer Joghurt','Honig','Gemischte Beeren','Zartbitterschokolade'], base:['Vanilleextrakt'],
      steps:[['Joghurt süßen','Griechischen Joghurt mit Honig und etwas Vanille glatt und cremig verrühren.'],['Verstreichen & belegen','Joghurt ~1 cm dick auf ein ausgelegtes Blech streichen. Beeren und gehackte Zartbitterschokolade darüber verteilen.'],['Frieren & brechen','Mindestens 3 Stunden gefrieren, bis fest, dann in Stücke brechen. Bis zum Servieren im Gefrierfach lassen.']]},
    es:{title:'Corteza helada de yogur y frutos rojos', names:['Yogur griego','Miel','Frutos rojos variados','Chocolate negro'], base:['Extracto de vainilla'],
      steps:[['Endulza el yogur','Mezcla el yogur griego con la miel y un poco de vainilla hasta que quede fino y cremoso.'],['Extiende y corona','Extiende el yogur en una capa de ~1 cm sobre una bandeja con papel. Reparte los frutos rojos y el chocolate negro picado por encima.'],['Congela y parte','Congela al menos 3 horas hasta que esté firme, luego parte en trozos. Guarda en el congelador hasta servir.']]},
    fr:{title:'Écorce glacée yaourt & fruits rouges', names:['Yaourt grec','Miel','Fruits rouges mélangés','Chocolat noir'], base:['Extrait de vanille'],
      steps:[['Sucrer le yaourt','Mélanger le yaourt grec avec le miel et un peu de vanille jusqu\'à obtenir une texture lisse et crémeuse.'],['Étaler et garnir','Étaler le yaourt en couche de ~1 cm sur une plaque chemisée. Parsemer de fruits rouges et de chocolat noir haché.'],['Congeler et casser','Congeler au moins 3 heures jusqu\'à ce que ce soit ferme, puis casser en morceaux. Garder au congélateur jusqu\'au service.']]},
  },
},
{
  id:'frozen-banana-nice-cream', emoji:'🍌', is_kids:true,
  title:'Chocolate-Peanut Banana Nice Cream',
  subtitle:'Two-minute soft-serve from frozen bananas — no ice-cream machine',
  tags:['Vegan','Gluten-free','Kid-Friendly'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegan','Gluten-free'], prep:5, cook:0, servings:2,
  nutrition:{fat:7,kcal:230,carbs:38,fiber:5,protein:5},
  ings:[['🍌','Frozen ripe bananas','3 pcs'],['🥜','Peanut butter','1 tbsp'],['🍫','Cocoa powder','1 tbsp'],['🥛','Plant milk','2 tbsp']],
  base:['Pinch of salt'], dressing:[],
  steps:[
    ['Freeze ahead','Slice ripe bananas and freeze for at least 3 hours (best done the night before).',[0],'The riper the bananas, the sweeter the nice cream — no added sugar needed.'],
    ['Blend smooth','Blend the frozen banana with peanut butter, cocoa, plant milk and a pinch of salt until thick and creamy like soft-serve.',[1,2,3],null],
    ['Serve','Eat straight away as soft-serve, or freeze for 1 hour for a scoopable texture.',[],null],
  ],
  image_prompt:'Creamy chocolate banana nice cream swirled in a bowl, dusted with cocoa and a swirl of peanut butter, soft natural light',
  tr:{
    de:{title:'Schoko-Erdnuss-Bananen-Nicecream', names:['Gefrorene reife Bananen','Erdnussbutter','Kakaopulver','Pflanzenmilch'], base:['Eine Prise Salz'],
      steps:[['Vorab einfrieren','Reife Bananen in Scheiben schneiden und mindestens 3 Stunden einfrieren (am besten über Nacht).'],['Cremig mixen','Gefrorene Banane mit Erdnussbutter, Kakao, Pflanzenmilch und einer Prise Salz dick und cremig wie Softeis mixen.'],['Servieren','Sofort als Softeis essen oder 1 Stunde frieren für eine portionierbare Konsistenz.']]},
    es:{title:'Nice cream de plátano, chocolate y cacahuete', names:['Plátanos maduros congelados','Crema de cacahuete','Cacao en polvo','Bebida vegetal'], base:['Una pizca de sal'],
      steps:[['Congela antes','Corta los plátanos maduros y congélalos al menos 3 horas (mejor la noche anterior).'],['Tritura cremoso','Tritura el plátano congelado con la crema de cacahuete, el cacao, la bebida vegetal y una pizca de sal hasta que quede espeso y cremoso como un helado suave.'],['Sirve','Cómelo al momento como helado suave, o congélalo 1 hora para una textura más firme.']]},
    fr:{title:'Nice cream banane, chocolat & cacahuète', names:['Bananes mûres congelées','Beurre de cacahuète','Cacao en poudre','Lait végétal'], base:['Une pincée de sel'],
      steps:[['Congeler à l\'avance','Couper les bananes mûres en rondelles et congeler au moins 3 heures (idéalement la veille).'],['Mixer onctueux','Mixer la banane congelée avec le beurre de cacahuète, le cacao, le lait végétal et une pincée de sel jusqu\'à une texture épaisse et crémeuse comme une glace à l\'italienne.'],['Servir','Déguster aussitôt en glace molle, ou congeler 1 heure pour une texture à la cuillère.']]},
  },
},
{
  id:'berry-chia-pudding-parfait', emoji:'🫐', is_kids:false,
  title:'Berry Chia Pudding Parfait',
  subtitle:'Make-ahead pudding that sets overnight — creamy, fruity, no cooking',
  tags:['Vegan','Gluten-free'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegan','Gluten-free'], prep:10, cook:0, servings:2,
  nutrition:{fat:9,kcal:210,carbs:24,fiber:11,protein:6},
  ings:[['⚫','Chia seeds','4 tbsp'],['🥥','Coconut or almond milk','250ml'],['🍁','Maple syrup','1 tbsp'],['🫐','Mixed berries','120g']],
  base:['Vanilla extract'], dressing:[],
  steps:[
    ['Mix the pudding','Whisk the chia seeds with the milk, maple syrup and a little vanilla. Let it rest 5 minutes, then whisk again to break up any clumps.',[0,1,2],'The second whisk is the trick to a smooth, lump-free pudding.'],
    ['Chill to set','Cover and chill for at least 4 hours, or overnight, until thick and spoonable.',[],null],
    ['Layer & serve','Layer the chia pudding with the berries in glasses and serve cold.',[3],null],
  ],
  image_prompt:'Chia pudding parfait layered with fresh berries in a glass, topped with mint, bright clean food photography',
  tr:{
    de:{title:'Beeren-Chia-Pudding-Parfait', names:['Chiasamen','Kokos- oder Mandelmilch','Ahornsirup','Gemischte Beeren'], base:['Vanilleextrakt'],
      steps:[['Pudding anrühren','Chiasamen mit Milch, Ahornsirup und etwas Vanille verrühren. 5 Minuten ruhen lassen, dann erneut verrühren, um Klümpchen aufzulösen.'],['Kühlen & fest werden lassen','Abdecken und mindestens 4 Stunden oder über Nacht kühlen, bis dick und löffelbar.'],['Schichten & servieren','Chia-Pudding mit den Beeren in Gläsern schichten und kalt servieren.']]},
    es:{title:'Parfait de pudin de chía y frutos rojos', names:['Semillas de chía','Leche de coco o almendra','Sirope de arce','Frutos rojos variados'], base:['Extracto de vainilla'],
      steps:[['Prepara el pudin','Bate las semillas de chía con la leche, el sirope de arce y un poco de vainilla. Deja reposar 5 minutos y vuelve a batir para deshacer los grumos.'],['Enfría para que cuaje','Tapa y refrigera al menos 4 horas, o toda la noche, hasta que esté espeso y se pueda comer a cucharadas.'],['Monta y sirve','Monta el pudin de chía con los frutos rojos en vasos y sirve frío.']]},
    fr:{title:'Parfait de pudding de chia aux fruits rouges', names:['Graines de chia','Lait de coco ou d\'amande','Sirop d\'érable','Fruits rouges mélangés'], base:['Extrait de vanille'],
      steps:[['Préparer le pudding','Fouetter les graines de chia avec le lait, le sirop d\'érable et un peu de vanille. Laisser reposer 5 minutes, puis fouetter à nouveau pour défaire les grumeaux.'],['Réfrigérer pour figer','Couvrir et réfrigérer au moins 4 heures, ou toute la nuit, jusqu\'à une texture épaisse et crémeuse.'],['Monter et servir','Monter le pudding de chia avec les fruits rouges dans des verres et servir frais.']]},
  },
},
{
  id:'no-bake-chocolate-peanut-oat-bars', emoji:'🍫', is_kids:true,
  title:'No-Bake Chocolate Peanut Oat Bars',
  subtitle:'Chewy oat bars with a dark-chocolate top — no oven needed',
  tags:['Vegetarian','Kid-Friendly'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegetarian'], prep:15, cook:0, servings:8,
  nutrition:{fat:11,kcal:230,carbs:24,fiber:3,protein:6},
  ings:[['🌾','Rolled oats','150g'],['🥜','Peanut butter','120g'],['🍁','Maple syrup','60ml'],['🍫','Dark chocolate','60g']],
  base:['Pinch of salt'], dressing:[],
  steps:[
    ['Mix the base','Gently warm the peanut butter with the maple syrup until runny, then stir into the oats with a pinch of salt until evenly coated.',[0,1,2],null],
    ['Press & chill','Press the mixture firmly into a lined tin and chill for 30 minutes until set.',[],'Press hard — well-compacted bars hold together when you cut them.'],
    ['Chocolate top','Melt the dark chocolate, spread over the top, chill until set, then cut into bars.',[3],null],
  ],
  image_prompt:'No-bake oat bars with a glossy dark chocolate top, cut into squares on parchment, cozy food photography',
  tr:{
    de:{title:'No-Bake Schoko-Erdnuss-Haferriegel', names:['Haferflocken','Erdnussbutter','Ahornsirup','Zartbitterschokolade'], base:['Eine Prise Salz'],
      steps:[['Basis mischen','Erdnussbutter mit Ahornsirup sanft erwärmen, bis flüssig, dann mit einer Prise Salz unter die Haferflocken rühren, bis alles benetzt ist.'],['Pressen & kühlen','Die Masse fest in eine ausgelegte Form drücken und 30 Minuten kühlen, bis fest.'],['Schoko-Schicht','Zartbitterschokolade schmelzen, oben aufstreichen, fest werden lassen, dann in Riegel schneiden.']]},
    es:{title:'Barritas de avena, chocolate y cacahuete sin horno', names:['Copos de avena','Crema de cacahuete','Sirope de arce','Chocolate negro'], base:['Una pizca de sal'],
      steps:[['Mezcla la base','Calienta suavemente la crema de cacahuete con el sirope de arce hasta que esté fluida, luego mézclala con la avena y una pizca de sal hasta cubrir todo.'],['Presiona y enfría','Presiona bien la mezcla en un molde forrado y refrigera 30 minutos hasta que cuaje.'],['Cobertura de chocolate','Funde el chocolate negro, extiéndelo por encima, refrigera hasta que cuaje y corta en barritas.']]},
    fr:{title:'Barres avoine-chocolat-cacahuète sans cuisson', names:['Flocons d\'avoine','Beurre de cacahuète','Sirop d\'érable','Chocolat noir'], base:['Une pincée de sel'],
      steps:[['Mélanger la base','Réchauffer doucement le beurre de cacahuète avec le sirop d\'érable jusqu\'à ce qu\'il soit fluide, puis l\'incorporer aux flocons d\'avoine avec une pincée de sel jusqu\'à enrobage complet.'],['Presser et réfrigérer','Tasser fermement le mélange dans un moule chemisé et réfrigérer 30 minutes jusqu\'à prise.'],['Couche de chocolat','Faire fondre le chocolat noir, l\'étaler sur le dessus, réfrigérer jusqu\'à prise, puis couper en barres.']]},
  },
},
{
  id:'banana-oat-choc-chip-cookies', emoji:'🍪', is_kids:true,
  title:'Banana Oat Chocolate-Chip Cookies',
  subtitle:'Soft cookies sweetened mostly by ripe banana',
  tags:['Vegetarian','Kid-Friendly'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegetarian'], prep:10, cook:15, servings:4,
  nutrition:{fat:6,kcal:200,carbs:30,fiber:4,protein:5},
  ings:[['🍌','Ripe bananas','2 pcs'],['🌾','Rolled oats','120g'],['🍫','Dark chocolate chips','50g'],['🥜','Peanut butter','2 tbsp']],
  base:['Cinnamon'], dressing:[],
  steps:[
    ['Mash & mix','Mash the bananas well, then stir in the oats, peanut butter, a little cinnamon and the chocolate chips into a thick dough.',[0,1,3],null],
    ['Shape','Spoon mounds onto a lined tray and flatten gently into cookies — they don\'t spread much.',[2],null],
    ['Bake','Bake at 180°C for 12–15 minutes until golden at the edges. Cool on a rack to firm up.',[],null],
  ],
  image_prompt:'Soft banana oat cookies with melting dark chocolate chips on a cooling rack, warm homely light',
  tr:{
    de:{title:'Bananen-Hafer-Cookies mit Schokostückchen', names:['Reife Bananen','Haferflocken','Zartbitter-Schokostückchen','Erdnussbutter'], base:['Zimt'],
      steps:[['Zerdrücken & mischen','Bananen gut zerdrücken, dann Haferflocken, Erdnussbutter, etwas Zimt und Schokostückchen zu einem dicken Teig verrühren.'],['Formen','Häufchen auf ein ausgelegtes Blech setzen und sanft zu Cookies flach drücken — sie laufen kaum auseinander.'],['Backen','Bei 180 °C 12–15 Minuten backen, bis die Ränder goldbraun sind. Auf einem Gitter abkühlen lassen, damit sie fest werden.']]},
    es:{title:'Galletas de plátano y avena con pepitas de chocolate', names:['Plátanos maduros','Copos de avena','Pepitas de chocolate negro','Crema de cacahuete'], base:['Canela'],
      steps:[['Machaca y mezcla','Machaca bien los plátanos, luego mezcla la avena, la crema de cacahuete, un poco de canela y las pepitas de chocolate hasta formar una masa espesa.'],['Da forma','Coloca montoncitos en una bandeja forrada y aplástalos suavemente en forma de galleta — apenas se extienden.'],['Hornea','Hornea a 180 °C durante 12–15 minutos hasta que los bordes estén dorados. Deja enfriar en una rejilla para que se afirmen.']]},
    fr:{title:'Cookies banane-avoine aux pépites de chocolat', names:['Bananes mûres','Flocons d\'avoine','Pépites de chocolat noir','Beurre de cacahuète'], base:['Cannelle'],
      steps:[['Écraser et mélanger','Écraser les bananes, puis incorporer les flocons d\'avoine, le beurre de cacahuète, un peu de cannelle et les pépites de chocolat en une pâte épaisse.'],['Façonner','Déposer des petits tas sur une plaque chemisée et les aplatir légèrement en cookies — ils ne s\'étalent presque pas.'],['Cuire','Cuire à 180 °C pendant 12 à 15 minutes jusqu\'à ce que les bords soient dorés. Laisser refroidir sur une grille pour qu\'ils raffermissent.']]},
  },
},
{
  id:'baked-cinnamon-apples-oat-crumble', emoji:'🍎', is_kids:true,
  title:'Baked Cinnamon Apples with Oat Crumble',
  subtitle:'All the apple-crumble cosiness, in single portions',
  tags:['Vegetarian','Kid-Friendly'], meal:['Dessert'], categories:['Süßspeise'],
  diet:['Vegetarian'], prep:10, cook:30, servings:4,
  nutrition:{fat:9,kcal:240,carbs:34,fiber:5,protein:3},
  ings:[['🍎','Apples','4 pcs'],['🌾','Rolled oats','60g'],['🌰','Walnuts','40g'],['🧈','Butter','30g'],['🍁','Maple syrup','2 tbsp']],
  base:['Cinnamon'], dressing:[],
  steps:[
    ['Prep the apples','Core the apples and set them upright in a baking dish.',[0],null],
    ['Make the crumble','Mix the oats, chopped walnuts, soft butter, maple syrup and plenty of cinnamon into a crumble, then spoon it into and over the apples.',[1,2,3,4],null],
    ['Bake','Bake at 180°C for 25–30 minutes until the apples are soft and the topping is golden. Serve warm.',[],'Lovely with a spoon of Greek yogurt on top.'],
  ],
  image_prompt:'Baked whole apples stuffed with golden oat-walnut crumble in a rustic dish, steam rising, warm cosy light',
  tr:{
    de:{title:'Gebackene Zimtäpfel mit Haferstreusel', names:['Äpfel','Haferflocken','Walnüsse','Butter','Ahornsirup'], base:['Zimt'],
      steps:[['Äpfel vorbereiten','Äpfel entkernen und aufrecht in eine Auflaufform stellen.'],['Streusel machen','Haferflocken, gehackte Walnüsse, weiche Butter, Ahornsirup und reichlich Zimt zu Streuseln mischen, dann in und über die Äpfel geben.'],['Backen','Bei 180 °C 25–30 Minuten backen, bis die Äpfel weich und die Streusel goldbraun sind. Warm servieren.']]},
    es:{title:'Manzanas asadas a la canela con crumble de avena', names:['Manzanas','Copos de avena','Nueces','Mantequilla','Sirope de arce'], base:['Canela'],
      steps:[['Prepara las manzanas','Descorazona las manzanas y colócalas de pie en una fuente de horno.'],['Haz el crumble','Mezcla la avena, las nueces picadas, la mantequilla blanda, el sirope de arce y bastante canela hasta formar un crumble, y repártelo dentro y sobre las manzanas.'],['Hornea','Hornea a 180 °C durante 25–30 minutos hasta que las manzanas estén blandas y la cobertura dorada. Sirve caliente.']]},
    fr:{title:'Pommes rôties à la cannelle et crumble d\'avoine', names:['Pommes','Flocons d\'avoine','Noix','Beurre','Sirop d\'érable'], base:['Cannelle'],
      steps:[['Préparer les pommes','Évider les pommes et les placer debout dans un plat allant au four.'],['Préparer le crumble','Mélanger les flocons d\'avoine, les noix concassées, le beurre mou, le sirop d\'érable et beaucoup de cannelle en un crumble, puis le répartir dans et sur les pommes.'],['Cuire','Cuire à 180 °C pendant 25 à 30 minutes jusqu\'à ce que les pommes soient tendres et le crumble doré. Servir chaud.']]},
  },
},
{
  id:'stuffed-medjool-dates', emoji:'🍫', is_kids:true,
  title:'Peanut-Butter Stuffed Dates',
  subtitle:'Three ingredients, "snickers" energy — the famous viral treat',
  tags:['Vegan','Gluten-free','Kid-Friendly'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegan','Gluten-free'], prep:15, cook:0, servings:4,
  nutrition:{fat:9,kcal:200,carbs:28,fiber:4,protein:4},
  ings:[['🌴','Medjool dates','8 pcs'],['🥜','Peanut butter','4 tbsp'],['🍫','Dark chocolate','50g']],
  base:['Sea salt flakes'], dressing:[],
  steps:[
    ['Fill the dates','Slit each date down one side, remove the pit and fill the cavity with peanut butter.',[0,1],null],
    ['Coat in chocolate','Melt the dark chocolate and dip or drizzle each date until coated.',[2],null],
    ['Set & serve','Sprinkle with sea-salt flakes and chill until the chocolate sets.',[],'The salt is what makes them taste like a candy bar — don\'t skip it.'],
  ],
  image_prompt:'Medjool dates filled with peanut butter and coated in dark chocolate, sprinkled with sea salt flakes on parchment',
  tr:{
    de:{title:'Mit Erdnussbutter gefüllte Datteln', names:['Medjool-Datteln','Erdnussbutter','Zartbitterschokolade'], base:['Salzflocken'],
      steps:[['Datteln füllen','Jede Dattel an einer Seite einschneiden, den Kern entfernen und die Mulde mit Erdnussbutter füllen.'],['In Schokolade tauchen','Zartbitterschokolade schmelzen und jede Dattel eintauchen oder beträufeln, bis sie überzogen ist.'],['Fest werden lassen & servieren','Mit Salzflocken bestreuen und kühlen, bis die Schokolade fest ist.']]},
    es:{title:'Dátiles rellenos de crema de cacahuete', names:['Dátiles Medjool','Crema de cacahuete','Chocolate negro'], base:['Escamas de sal'],
      steps:[['Rellena los dátiles','Haz un corte a lo largo de cada dátil, retira el hueso y rellena el hueco con crema de cacahuete.'],['Baña en chocolate','Funde el chocolate negro y baña o decora cada dátil hasta cubrirlo.'],['Cuaja y sirve','Espolvorea con escamas de sal y refrigera hasta que el chocolate cuaje.']]},
    fr:{title:'Dattes fourrées au beurre de cacahuète', names:['Dattes Medjool','Beurre de cacahuète','Chocolat noir'], base:['Fleur de sel'],
      steps:[['Fourrer les dattes','Inciser chaque datte sur un côté, retirer le noyau et garnir la cavité de beurre de cacahuète.'],['Enrober de chocolat','Faire fondre le chocolat noir et tremper ou napper chaque datte jusqu\'à enrobage.'],['Faire prendre et servir','Saupoudrer de fleur de sel et réfrigérer jusqu\'à ce que le chocolat prenne.']]},
  },
},
{
  id:'dark-chocolate-almond-bark', emoji:'🍫', is_kids:false,
  title:'Dark Chocolate Almond & Cranberry Bark',
  subtitle:'A 3-ingredient chocolate bark you make in ten minutes',
  tags:['Vegan','Gluten-free'], meal:['Dessert','Snack'], categories:['Süßspeise'],
  diet:['Vegan','Gluten-free'], prep:10, cook:0, servings:8,
  nutrition:{fat:13,kcal:190,carbs:16,fiber:3,protein:4},
  ings:[['🍫','Dark chocolate','200g'],['🌰','Almonds','60g'],['🫐','Dried cranberries','40g']],
  base:['Sea salt flakes'], dressing:[],
  steps:[
    ['Melt the chocolate','Melt the dark chocolate gently over a water bath or in short bursts in the microwave, stirring until smooth.',[0],null],
    ['Spread & top','Spread the chocolate onto a lined tray and scatter over the toasted almonds, cranberries and a few sea-salt flakes.',[1,2],null],
    ['Set & break','Chill until fully set, then break into rough pieces.',[],null],
  ],
  image_prompt:'Dark chocolate bark studded with whole almonds and dried cranberries, broken into shards on baking paper',
  tr:{
    de:{title:'Zartbitter-Bark mit Mandeln & Cranberries', names:['Zartbitterschokolade','Mandeln','Getrocknete Cranberries'], base:['Salzflocken'],
      steps:[['Schokolade schmelzen','Zartbitterschokolade sanft über dem Wasserbad oder in kurzen Intervallen in der Mikrowelle schmelzen und glatt rühren.'],['Verstreichen & belegen','Schokolade auf ein ausgelegtes Blech streichen und mit gerösteten Mandeln, Cranberries und ein paar Salzflocken bestreuen.'],['Fest werden lassen & brechen','Kühlen, bis vollständig fest, dann in grobe Stücke brechen.']]},
    es:{title:'Corteza de chocolate negro con almendras y arándanos', names:['Chocolate negro','Almendras','Arándanos rojos secos'], base:['Escamas de sal'],
      steps:[['Funde el chocolate','Funde el chocolate negro suavemente al baño maría o en intervalos cortos en el microondas, removiendo hasta que quede liso.'],['Extiende y corona','Extiende el chocolate en una bandeja forrada y reparte las almendras tostadas, los arándanos y unas escamas de sal.'],['Cuaja y parte','Refrigera hasta que cuaje del todo, luego parte en trozos irregulares.']]},
    fr:{title:'Écorce de chocolat noir aux amandes & canneberges', names:['Chocolat noir','Amandes','Canneberges séchées'], base:['Fleur de sel'],
      steps:[['Faire fondre le chocolat','Faire fondre le chocolat noir doucement au bain-marie ou par courtes impulsions au micro-ondes, en remuant jusqu\'à ce qu\'il soit lisse.'],['Étaler et garnir','Étaler le chocolat sur une plaque chemisée et parsemer d\'amandes torréfiées, de canneberges et de quelques cristaux de fleur de sel.'],['Faire prendre et casser','Réfrigérer jusqu\'à prise complète, puis casser en morceaux irréguliers.']]},
  },
},
{
  id:'roasted-honey-peaches-yogurt', emoji:'🍑', is_kids:false,
  title:'Roasted Honey Peaches with Yogurt',
  subtitle:'Warm caramelised peaches over cool yogurt — summer in a bowl',
  tags:['Vegetarian','Gluten-free'], meal:['Dessert'], categories:['Süßspeise'],
  diet:['Vegetarian','Gluten-free'], prep:10, cook:20, servings:4,
  nutrition:{fat:6,kcal:180,carbs:24,fiber:3,protein:7},
  ings:[['🍑','Peaches','4 pcs'],['🍯','Honey','2 tbsp'],['🥛','Greek yogurt','200g'],['🌰','Pistachios','30g']],
  base:['Cinnamon'], dressing:[],
  steps:[
    ['Prep the peaches','Halve and pit the peaches and place them cut-side up in a baking dish. Drizzle with the honey and a little cinnamon.',[0,1],null],
    ['Roast','Roast at 200°C for about 20 minutes until soft and caramelised at the edges.',[],null],
    ['Serve','Spoon over the Greek yogurt, set the warm peaches on top and finish with crushed pistachios.',[2,3],null],
  ],
  image_prompt:'Roasted peach halves caramelised with honey, served over Greek yogurt and topped with crushed pistachios, bright summer light',
  tr:{
    de:{title:'Geröstete Honig-Pfirsiche mit Joghurt', names:['Pfirsiche','Honig','Griechischer Joghurt','Pistazien'], base:['Zimt'],
      steps:[['Pfirsiche vorbereiten','Pfirsiche halbieren, entkernen und mit der Schnittfläche nach oben in eine Auflaufform legen. Mit Honig und etwas Zimt beträufeln.'],['Rösten','Bei 200 °C etwa 20 Minuten rösten, bis weich und an den Rändern karamellisiert.'],['Servieren','Griechischen Joghurt in Schalen geben, die warmen Pfirsiche darauf setzen und mit gehackten Pistazien bestreuen.']]},
    es:{title:'Melocotones asados con miel y yogur', names:['Melocotones','Miel','Yogur griego','Pistachos'], base:['Canela'],
      steps:[['Prepara los melocotones','Parte los melocotones por la mitad, deshuésalos y colócalos con el corte hacia arriba en una fuente. Riega con la miel y un poco de canela.'],['Asa','Asa a 200 °C unos 20 minutos hasta que estén blandos y caramelizados por los bordes.'],['Sirve','Reparte el yogur griego, coloca encima los melocotones calientes y termina con pistachos picados.']]},
    fr:{title:'Pêches rôties au miel et yaourt', names:['Pêches','Miel','Yaourt grec','Pistaches'], base:['Cannelle'],
      steps:[['Préparer les pêches','Couper les pêches en deux, les dénoyauter et les placer côté coupé vers le haut dans un plat. Arroser de miel et d\'un peu de cannelle.'],['Rôtir','Rôtir à 200 °C environ 20 minutes jusqu\'à ce qu\'elles soient tendres et caramélisées sur les bords.'],['Servir','Répartir le yaourt grec, poser les pêches chaudes dessus et finir avec des pistaches concassées.']]},
  },
},
{
  id:'flourless-chocolate-almond-cake', emoji:'🎂', is_kids:false,
  title:'Flourless Chocolate Almond Cake',
  subtitle:'Dense, fudgy and naturally gluten-free — a real celebration cake',
  tags:['Vegetarian','Gluten-free'], meal:['Dessert'], categories:['Süßspeise'],
  diet:['Vegetarian','Gluten-free'], prep:15, cook:30, servings:8,
  nutrition:{fat:22,kcal:320,carbs:22,fiber:3,protein:7},
  ings:[['🍫','Dark chocolate','150g'],['🧈','Butter','100g'],['🥚','Eggs','3 pcs'],['🌰','Ground almonds','100g'],['🍬','Sugar','80g']],
  base:['Pinch of salt'], dressing:[],
  steps:[
    ['Melt the chocolate','Melt the dark chocolate with the butter until smooth, then let it cool slightly.',[0,1],null],
    ['Mix the batter','Whisk the eggs with the sugar until pale, then fold in the melted chocolate, ground almonds and a pinch of salt.',[2,4,3],null],
    ['Bake','Pour into a lined tin and bake at 170°C for 25–30 minutes until just set with a slight wobble. Cool before slicing.',[],'A little wobble in the centre = a fudgy cake. Don\'t overbake.'],
  ],
  image_prompt:'Dense flourless chocolate almond cake dusted with cocoa, one slice removed showing fudgy interior, moody food photography',
  tr:{
    de:{title:'Mehlloser Schoko-Mandel-Kuchen', names:['Zartbitterschokolade','Butter','Eier','Gemahlene Mandeln','Zucker'], base:['Eine Prise Salz'],
      steps:[['Schokolade schmelzen','Zartbitterschokolade mit der Butter glatt schmelzen, dann leicht abkühlen lassen.'],['Teig anrühren','Eier mit dem Zucker hell aufschlagen, dann geschmolzene Schokolade, gemahlene Mandeln und eine Prise Salz unterheben.'],['Backen','In eine ausgelegte Form gießen und bei 170 °C 25–30 Minuten backen, bis er gerade fest ist, aber noch leicht wackelt. Vor dem Schneiden abkühlen lassen.']]},
    es:{title:'Tarta de chocolate y almendra sin harina', names:['Chocolate negro','Mantequilla','Huevos','Almendra molida','Azúcar'], base:['Una pizca de sal'],
      steps:[['Funde el chocolate','Funde el chocolate negro con la mantequilla hasta que quede liso, luego deja enfriar un poco.'],['Prepara la masa','Bate los huevos con el azúcar hasta que blanqueen, luego incorpora el chocolate fundido, la almendra molida y una pizca de sal.'],['Hornea','Vierte en un molde forrado y hornea a 170 °C durante 25–30 minutos hasta que esté justo cuajada pero algo temblorosa. Deja enfriar antes de cortar.']]},
    fr:{title:'Gâteau chocolat-amande sans farine', names:['Chocolat noir','Beurre','Œufs','Poudre d\'amande','Sucre'], base:['Une pincée de sel'],
      steps:[['Faire fondre le chocolat','Faire fondre le chocolat noir avec le beurre jusqu\'à ce que ce soit lisse, puis laisser tiédir.'],['Préparer la pâte','Fouetter les œufs avec le sucre jusqu\'à ce que le mélange blanchisse, puis incorporer le chocolat fondu, la poudre d\'amande et une pincée de sel.'],['Cuire','Verser dans un moule chemisé et cuire à 170 °C pendant 25 à 30 minutes jusqu\'à ce que ce soit juste pris mais encore légèrement tremblotant au centre. Laisser refroidir avant de trancher.']]},
  },
},
];

// ---- builders -------------------------------------------------------------
function chip(emoji,name,amount){ return `${emoji} ${name} · ${amount}`; }
function enRow(s){
  const ingredients = s.ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
  const mise = ingredients.slice();
  const steps = s.steps.map(([title,text,idx,tip],i)=>({
    num:i+1, title, text,
    ings: idx.map(j=>chip(s.ings[j][0], shortName(s.ings[j][1]), s.ings[j][2])),
    tip: tip||null, kidsHelp:null,
  }));
  return { id:s.id, title:s.title, subtitle:s.subtitle, emoji:s.emoji, is_kids:s.is_kids,
    tags:s.tags, meal:s.meal, categories:s.categories, diet:s.diet,
    prep_minutes:s.prep, cook_minutes:s.cook, servings:s.servings,
    image_url:'', image_prompt:s.image_prompt, nutrition:s.nutrition,
    ingredients, base_ingredients:s.base, dressing:[], mise_en_place:mise, steps };
}
// step chips drop trailing parenthetical to stay short, matching existing data style
function shortName(n){ return n.replace(/\s*\(.*?\)\s*$/,'').trim(); }

function i18nEntry(s){
  const out={};
  ['de','es','fr'].forEach(l=>{
    const t=s.tr[l];
    const steps=s.steps.map(([,, idx],i)=>({
      title:t.steps[i][0], text:t.steps[i][1],
      ings: idx.map(j=>chip(s.ings[j][0], shortName(t.names[j]), s.ings[j][2])),
      tip:null, kidsHelp:null,
    }));
    out[l]={ title:t.title, ingredients:t.names.slice(), base:t.base.slice(), dressing:[], steps };
  });
  return out;
}

// ---- write ----------------------------------------------------------------
const newRows = JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const existing = new Set(newRows.map(r=>r.id));
let added=0;
R.forEach(s=>{
  const row=enRow(s);
  if(existing.has(s.id)){ const k=newRows.findIndex(r=>r.id===s.id); newRows[k]=row; }
  else { newRows.push(row); added++; }
  i18n[s.id]=i18nEntry(s);
});
fs.writeFileSync('new_recipes.json', JSON.stringify(newRows,null,2));
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log(`Built ${R.length} desserts (${added} new). new_recipes.json now has ${newRows.length} rows.`);
