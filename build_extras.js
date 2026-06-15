// Menja Fresh — 8 extras (Honest-Greens style: a bit healthier, sugar OK, tasty).
// Apple Crumble, Orange Energy Balls (Little Green Kitchen vibe), lightened
// Cheesecake & Tiramisu (Greek yogurt), Choc-Chip Cookies, Molten Lava Cake,
// Crème Brûlée, Beetroot & Feta Tart. Step chips built from ingredient indices.
const fs = require('fs');
const R = [
{ id:'apple-crumble', emoji:'🍎', is_kids:true, title:'Apple & Oat Crumble',
  subtitle:'Cosy classic, lightly wholesome — oats, nuts and just enough sugar',
  tags:['Vegetarian','Kid-Friendly'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian'], prep:20, cook:40, servings:6,
  nutrition:{fat:14,kcal:330,carbs:44,fiber:5,protein:4},
  ings:[['🍎','Apples','800g'],['🌾','Rolled oats','80g'],['🌾','Plain flour','80g'],['🧈','Butter','90g'],['🟤','Brown sugar','60g'],['🌰','Pecans','40g']],
  base:['Cinnamon','Maple syrup','Pinch of salt'], dress:null,
  steps:[
    ['Prep the apples','Peel, core and slice the apples, toss with cinnamon and a little maple syrup and tip into a baking dish.',[0],null],
    ['Make the crumble','Rub the butter into the oats, flour, brown sugar and chopped pecans with your fingertips until clumpy.',[1,2,3,4,5],'Leave some big clumps — that\'s where the crunch comes from.'],
    ['Bake','Scatter the crumble over the apples and bake at 190°C for 35–40 minutes until golden and bubbling.',[],null] ],
  image_prompt:'Golden apple and oat crumble in a rustic baking dish, bubbling fruit at the edges, a spoonful served with a little cream, cosy warm food photography',
  tr:{ de:{title:'Apfel-Hafer-Crumble',names:['Äpfel','Haferflocken','Weizenmehl','Butter','Brauner Zucker','Pekannüsse'],base:['Zimt','Ahornsirup','Eine Prise Salz'],steps:[['Äpfel vorbereiten','Äpfel schälen, entkernen, in Scheiben schneiden, mit Zimt und etwas Ahornsirup mischen und in eine Auflaufform geben.'],['Streusel machen','Butter mit Haferflocken, Mehl, braunem Zucker und gehackten Pekannüssen mit den Fingern zu Streuseln verreiben.'],['Backen','Streusel über die Äpfel geben und bei 190 °C 35–40 Minuten goldbraun backen.']]},
       es:{title:'Crumble de manzana y avena',names:['Manzanas','Copos de avena','Harina de trigo','Mantequilla','Azúcar moreno','Nueces pecanas'],base:['Canela','Sirope de arce','Una pizca de sal'],steps:[['Prepara las manzanas','Pela, descorazona y corta las manzanas, mézclalas con canela y un poco de sirope y ponlas en una fuente.'],['Haz el crumble','Mezcla con los dedos la mantequilla con la avena, la harina, el azúcar moreno y las nueces picadas hasta formar grumos.'],['Hornea','Reparte el crumble sobre las manzanas y hornea a 190 °C 35–40 minutos hasta dorar.']]},
       fr:{title:'Crumble pommes & avoine',names:['Pommes','Flocons d\'avoine','Farine de blé','Beurre','Sucre roux','Noix de pécan'],base:['Cannelle','Sirop d\'érable','Une pincée de sel'],steps:[['Préparer les pommes','Éplucher, évider et couper les pommes, les mélanger avec la cannelle et un peu de sirop et les mettre dans un plat.'],['Préparer le crumble','Sabler du bout des doigts le beurre avec les flocons, la farine, le sucre roux et les noix concassées jusqu\'à obtenir des grumeaux.'],['Cuire','Répartir le crumble sur les pommes et cuire à 190 °C 35–40 minutes jusqu\'à doré.']]} } },

{ id:'orange-energy-balls', emoji:'🟠', is_kids:true, title:'Orange & Almond Energy Balls',
  subtitle:'No-bake bites sweetened only by dates — bright with orange',
  tags:['Vegan','Kid-Friendly'], meal:['Snack','Dessert'], categories:['Süßspeise'], diet:['Vegan'], prep:15, cook:0, servings:6,
  nutrition:{fat:9,kcal:190,carbs:24,fiber:4,protein:5},
  ings:[['🌴','Medjool dates','200g'],['🌾','Rolled oats','80g'],['🌰','Almonds','80g'],['🍊','Orange','1 pc'],['🥥','Desiccated coconut','30g']],
  base:['Vanilla extract','Pinch of salt'], dress:null,
  steps:[
    ['Blitz nuts & oats','Pulse the almonds and oats in a food processor to a coarse meal.',[2,1],null],
    ['Add dates & orange','Add the pitted dates, the zest and juice of the orange, vanilla and a pinch of salt, and blitz to a sticky dough.',[0,3],'Add the orange juice a splash at a time — just enough to bind, so they\'re not too wet.'],
    ['Roll & chill','Roll into balls, then roll in the desiccated coconut. Chill for 30 minutes to firm up.',[4],null] ],
  image_prompt:'Orange and almond energy balls rolled in desiccated coconut on a plate, fresh orange and dates beside, bright clean natural-food photography',
  tr:{ de:{title:'Orangen-Mandel-Energiekugeln',names:['Medjool-Datteln','Haferflocken','Mandeln','Orange','Kokosraspeln'],base:['Vanilleextrakt','Eine Prise Salz'],steps:[['Nüsse & Hafer mahlen','Mandeln und Haferflocken im Mixer grob mahlen.'],['Datteln & Orange zugeben','Entsteinte Datteln, Abrieb und Saft der Orange, Vanille und eine Prise Salz zugeben und zu einem klebrigen Teig mixen.'],['Rollen & kühlen','Zu Kugeln rollen, in Kokosraspeln wälzen und 30 Minuten kühlen.']]},
       es:{title:'Bolitas energéticas de naranja y almendra',names:['Dátiles Medjool','Copos de avena','Almendras','Naranja','Coco rallado'],base:['Extracto de vainilla','Una pizca de sal'],steps:[['Tritura frutos secos y avena','Tritura las almendras y la avena en la picadora hasta una textura gruesa.'],['Añade dátiles y naranja','Añade los dátiles sin hueso, la ralladura y el zumo de la naranja, la vainilla y una pizca de sal, y tritura hasta una masa pegajosa.'],['Forma y enfría','Forma bolitas, rebózalas en coco rallado y refrigera 30 minutos.']]},
       fr:{title:'Billes énergétiques orange & amande',names:['Dattes Medjool','Flocons d\'avoine','Amandes','Orange','Noix de coco râpée'],base:['Extrait de vanille','Une pincée de sel'],steps:[['Mixer fruits secs et avoine','Mixer les amandes et les flocons d\'avoine en une poudre grossière.'],['Ajouter dattes et orange','Ajouter les dattes dénoyautées, le zeste et le jus de l\'orange, la vanille et une pincée de sel, et mixer en une pâte collante.'],['Rouler et réfrigérer','Façonner des billes, les rouler dans la noix de coco râpée et réfrigérer 30 minutes.']]} } },

{ id:'baked-cheesecake-lighter', emoji:'🍰', is_kids:false, title:'Baked Vanilla Cheesecake',
  subtitle:'Creamy and rich but lightened with Greek yogurt',
  tags:['Vegetarian'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian'], prep:20, cook:55, servings:10,
  nutrition:{fat:18,kcal:340,carbs:28,fiber:1,protein:8},
  ings:[['🧀','Cream cheese','400g'],['🥛','Greek yogurt','200g'],['🍬','Sugar','120g'],['🥚','Eggs','3 pcs'],['🍪','Digestive biscuits','200g'],['🧈','Butter','70g']],
  base:['Vanilla extract','Lemon zest'], dress:null,
  steps:[
    ['Make the base','Crush the biscuits, mix with the melted butter and press firmly into a lined tin. Chill while you make the filling.',[4,5],null],
    ['Filling','Beat the cream cheese with the sugar until smooth, then beat in the eggs one at a time, the Greek yogurt, vanilla and lemon zest.',[0,2,3,1],'The yogurt keeps it creamy but lighter than an all-cream-cheese cake.'],
    ['Bake low & slow','Pour over the base and bake at 160°C for about 55 minutes until just set with a slight wobble in the centre.',[],null],
    ['Cool & chill','Cool in the switched-off oven with the door ajar, then chill several hours before slicing.',[],null] ],
  image_prompt:'Slice of baked vanilla cheesecake on a biscuit base, smooth creamy top, served on a plate with a few berries, soft natural light',
  tr:{ de:{title:'Gebackener Vanille-Käsekuchen',names:['Frischkäse','Griechischer Joghurt','Zucker','Eier','Butterkekse','Butter'],base:['Vanilleextrakt','Zitronenabrieb'],steps:[['Boden machen','Kekse zerbröseln, mit geschmolzener Butter mischen und fest in eine ausgelegte Form drücken. Kühlen, während die Füllung entsteht.'],['Füllung','Frischkäse mit dem Zucker glatt rühren, dann die Eier einzeln, den griechischen Joghurt, Vanille und Zitronenabrieb unterrühren.'],['Niedrig backen','Über den Boden gießen und bei 160 °C etwa 55 Minuten backen, bis die Mitte gerade fest ist und leicht wackelt.'],['Kühlen','Im ausgeschalteten Ofen mit leicht geöffneter Tür abkühlen, dann mehrere Stunden kühlen.']]},
       es:{title:'Tarta de queso al horno con vainilla',names:['Queso crema','Yogur griego','Azúcar','Huevos','Galletas digestive','Mantequilla'],base:['Extracto de vainilla','Ralladura de limón'],steps:[['Haz la base','Tritura las galletas, mézclalas con la mantequilla fundida y presiónalas en un molde forrado. Refrigera mientras preparas el relleno.'],['Relleno','Bate el queso crema con el azúcar, luego incorpora los huevos uno a uno, el yogur griego, la vainilla y la ralladura de limón.'],['Hornea suave','Vierte sobre la base y hornea a 160 °C unos 55 minutos hasta que el centro esté casi cuajado y tiemble un poco.'],['Enfría','Deja enfriar en el horno apagado con la puerta entreabierta y refrigera varias horas antes de cortar.']]},
       fr:{title:'Cheesecake vanille au four',names:['Fromage frais','Yaourt grec','Sucre','Œufs','Biscuits digestive','Beurre'],base:['Extrait de vanille','Zeste de citron'],steps:[['Préparer la base','Émietter les biscuits, mélanger au beurre fondu et tasser dans un moule chemisé. Réfrigérer pendant la préparation de l\'appareil.'],['Appareil','Battre le fromage frais avec le sucre, puis incorporer les œufs un à un, le yaourt grec, la vanille et le zeste de citron.'],['Cuire doucement','Verser sur la base et cuire à 160 °C environ 55 minutes jusqu\'à ce que le centre soit juste pris et tremble légèrement.'],['Refroidir','Laisser refroidir dans le four éteint porte entrouverte, puis réfrigérer plusieurs heures avant de trancher.']]} } },

{ id:'tiramisu-lighter', emoji:'🍰', is_kids:false, title:'Lighter Tiramisu',
  subtitle:'The Italian favourite, rounded out with Greek yogurt',
  tags:['Vegetarian'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian'], prep:30, cook:0, servings:8,
  nutrition:{fat:16,kcal:330,carbs:30,fiber:1,protein:9},
  ings:[['🧀','Mascarpone','250g'],['🥛','Greek yogurt','250g'],['🥚','Eggs','3 pcs'],['🍬','Sugar','70g'],['🍪','Ladyfingers','200g'],['☕','Strong coffee','300ml'],['🍫','Cocoa powder','2 tbsp']],
  base:['Vanilla extract'], dress:null,
  steps:[
    ['Whip the cream','Beat the egg yolks with the sugar until pale, then fold in the mascarpone, Greek yogurt and vanilla. Whisk the egg whites to soft peaks and fold through.',[2,3,0,1],'The yogurt lightens the mascarpone so it tastes rich but not heavy.'],
    ['Soak the biscuits','Dip the ladyfingers briefly in the cooled coffee — quick, so they don\'t go soggy.',[4,5],null],
    ['Layer','Layer soaked biscuits and cream, repeat, and finish with a smooth layer of cream.',[],null],
    ['Chill & dust','Chill for at least 4 hours, then dust generously with cocoa just before serving.',[6],null] ],
  image_prompt:'Lighter tiramisu in a glass dish dusted with cocoa, one portion scooped to show the layers of coffee-soaked biscuit and cream, moody food photography',
  tr:{ de:{title:'Leichteres Tiramisu',names:['Mascarpone','Griechischer Joghurt','Eier','Zucker','Löffelbiskuits','Starker Kaffee','Kakaopulver'],base:['Vanilleextrakt'],steps:[['Creme aufschlagen','Eigelb mit dem Zucker hell aufschlagen, dann Mascarpone, griechischen Joghurt und Vanille unterheben. Eiweiß zu weichen Spitzen schlagen und unterheben.'],['Biskuits tränken','Löffelbiskuits kurz in den abgekühlten Kaffee tauchen — zügig, damit sie nicht durchweichen.'],['Schichten','Getränkte Biskuits und Creme schichten, wiederholen und mit einer glatten Cremeschicht abschließen.'],['Kühlen & bestäuben','Mindestens 4 Stunden kühlen, dann kurz vor dem Servieren großzügig mit Kakao bestäuben.']]},
       es:{title:'Tiramisú más ligero',names:['Mascarpone','Yogur griego','Huevos','Azúcar','Bizcochos de soletilla','Café fuerte','Cacao en polvo'],base:['Extracto de vainilla'],steps:[['Monta la crema','Bate las yemas con el azúcar hasta que blanqueen, luego incorpora el mascarpone, el yogur griego y la vainilla. Monta las claras a punto suave e incorpóralas.'],['Empapa los bizcochos','Moja los bizcochos un momento en el café frío — rápido, para que no se deshagan.'],['Monta capas','Alterna bizcochos empapados y crema, repite y termina con una capa lisa de crema.'],['Enfría y espolvorea','Refrigera al menos 4 horas y espolvorea generosamente con cacao justo antes de servir.']]},
       fr:{title:'Tiramisu plus léger',names:['Mascarpone','Yaourt grec','Œufs','Sucre','Biscuits à la cuillère','Café fort','Cacao en poudre'],base:['Extrait de vanille'],steps:[['Monter la crème','Battre les jaunes avec le sucre jusqu\'à blanchiment, puis incorporer le mascarpone, le yaourt grec et la vanille. Monter les blancs en neige souple et les incorporer.'],['Imbiber les biscuits','Tremper rapidement les biscuits dans le café refroidi — vite, pour qu\'ils ne se détrempent pas.'],['Monter','Alterner biscuits imbibés et crème, répéter et finir par une couche lisse de crème.'],['Réfrigérer et saupoudrer','Réfrigérer au moins 4 heures, puis saupoudrer généreusement de cacao juste avant de servir.']]} } },

{ id:'chocolate-chip-cookies', emoji:'🍪', is_kids:true, title:'Chocolate Chip Cookies',
  subtitle:'Crisp edges, soft middle — a touch of wholemeal for depth',
  tags:['Vegetarian','Kid-Friendly'], meal:['Dessert','Snack'], categories:['Süßspeise'], diet:['Vegetarian'], prep:15, cook:12, servings:6,
  nutrition:{fat:11,kcal:230,carbs:30,fiber:2,protein:4},
  ings:[['🌾','Plain flour','200g'],['🌾','Wholemeal flour','50g'],['🧈','Butter','140g'],['🟤','Brown sugar','120g'],['🥚','Egg','1 pc'],['🍫','Dark chocolate chips','150g']],
  base:['Vanilla extract','Baking soda','Sea salt'], dress:null,
  steps:[
    ['Cream butter & sugar','Beat the soft butter with the brown sugar until creamy, then beat in the egg and vanilla.',[2,3,4],null],
    ['Make the dough','Fold in both flours, the baking soda and a good pinch of salt, then the chocolate chips.',[0,1,5],'A little wholemeal flour and flaky salt give a more grown-up, less sugary-flat cookie.'],
    ['Bake','Scoop onto a lined tray and bake at 180°C for 10–12 minutes until golden at the edges but still soft in the middle.',[],null] ],
  image_prompt:'Stack of chocolate chip cookies with melty dark chocolate and crisp golden edges on a cooling rack, warm homely light',
  tr:{ de:{title:'Schoko-Cookies',names:['Weizenmehl','Vollkornmehl','Butter','Brauner Zucker','Ei','Zartbitter-Schokostückchen'],base:['Vanilleextrakt','Natron','Meersalz'],steps:[['Butter & Zucker cremig rühren','Weiche Butter mit braunem Zucker cremig rühren, dann Ei und Vanille unterrühren.'],['Teig machen','Beide Mehle, Natron und eine kräftige Prise Salz unterheben, dann die Schokostückchen.'],['Backen','Häufchen auf ein ausgelegtes Blech setzen und bei 180 °C 10–12 Minuten backen, bis die Ränder goldbraun, die Mitte aber noch weich ist.']]},
       es:{title:'Galletas con pepitas de chocolate',names:['Harina de trigo','Harina integral','Mantequilla','Azúcar moreno','Huevo','Pepitas de chocolate negro'],base:['Extracto de vainilla','Bicarbonato','Sal marina'],steps:[['Bate mantequilla y azúcar','Bate la mantequilla blanda con el azúcar moreno hasta que esté cremosa, luego incorpora el huevo y la vainilla.'],['Haz la masa','Incorpora las dos harinas, el bicarbonato y una buena pizca de sal, y por último las pepitas de chocolate.'],['Hornea','Coloca montoncitos en una bandeja forrada y hornea a 180 °C 10–12 minutos hasta que los bordes estén dorados y el centro siga blando.']]},
       fr:{title:'Cookies aux pépites de chocolat',names:['Farine de blé','Farine complète','Beurre','Sucre roux','Œuf','Pépites de chocolat noir'],base:['Extrait de vanille','Bicarbonate','Sel marin'],steps:[['Crémer beurre et sucre','Battre le beurre mou avec le sucre roux jusqu\'à consistance crémeuse, puis incorporer l\'œuf et la vanille.'],['Faire la pâte','Incorporer les deux farines, le bicarbonate et une bonne pincée de sel, puis les pépites de chocolat.'],['Cuire','Déposer des petits tas sur une plaque chemisée et cuire à 180 °C 10–12 minutes jusqu\'à ce que les bords soient dorés et le centre encore moelleux.']]} } },

{ id:'molten-chocolate-lava-cake', emoji:'🍫', is_kids:false, title:'Molten Chocolate Lava Cake',
  subtitle:'Gooey-centred and naturally gluten-free with ground almonds',
  tags:['Vegetarian','Gluten-free'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian','Gluten-free'], prep:15, cook:12, servings:4,
  nutrition:{fat:26,kcal:400,carbs:28,fiber:3,protein:8},
  ings:[['🍫','Dark chocolate','120g'],['🧈','Butter','90g'],['🥚','Eggs','2 pcs'],['🍁','Maple syrup','60ml'],['🌰','Ground almonds','40g']],
  base:['Vanilla extract','Pinch of salt','Cocoa powder (for the moulds)'], dress:null,
  steps:[
    ['Melt','Melt the dark chocolate with the butter until smooth, then let it cool slightly.',[0,1],null],
    ['Batter','Whisk the eggs with the maple syrup and vanilla until pale, fold in the melted chocolate, then the ground almonds and a pinch of salt.',[2,3,4],null],
    ['Bake hot & short','Pour into buttered, cocoa-dusted ramekins and bake at 200°C for 10–12 minutes until set outside but molten in the centre.',[],'Bake just until the tops are set — the few minutes either side decide gooey vs cakey.'],
    ['Serve at once','Turn out and serve immediately while the centre is still runny.',[],null] ],
  image_prompt:'Molten chocolate lava cake on a plate with the gooey centre spilling out, dusting of cocoa and a few raspberries, moody food photography',
  tr:{ de:{title:'Schokoladen-Lavakuchen',names:['Zartbitterschokolade','Butter','Eier','Ahornsirup','Gemahlene Mandeln'],base:['Vanilleextrakt','Eine Prise Salz','Kakaopulver (für die Förmchen)'],steps:[['Schmelzen','Zartbitterschokolade mit der Butter glatt schmelzen, dann leicht abkühlen lassen.'],['Teig','Eier mit Ahornsirup und Vanille hell aufschlagen, geschmolzene Schokolade unterheben, dann gemahlene Mandeln und eine Prise Salz.'],['Heiß & kurz backen','In gebutterte, mit Kakao bestäubte Förmchen füllen und bei 200 °C 10–12 Minuten backen, bis außen fest, innen flüssig.'],['Sofort servieren','Stürzen und sofort servieren, solange die Mitte noch flüssig ist.']]},
       es:{title:'Coulant de chocolate',names:['Chocolate negro','Mantequilla','Huevos','Sirope de arce','Almendra molida'],base:['Extracto de vainilla','Una pizca de sal','Cacao en polvo (para los moldes)'],steps:[['Funde','Funde el chocolate negro con la mantequilla hasta que quede liso y deja enfriar un poco.'],['Masa','Bate los huevos con el sirope de arce y la vainilla hasta que blanqueen, incorpora el chocolate fundido y luego la almendra molida y una pizca de sal.'],['Hornea fuerte y corto','Vierte en moldes engrasados y espolvoreados con cacao y hornea a 200 °C 10–12 minutos hasta que estén cuajados por fuera y líquidos por dentro.'],['Sirve al momento','Desmolda y sirve enseguida mientras el centro siga líquido.']]},
       fr:{title:'Coulant au chocolat',names:['Chocolat noir','Beurre','Œufs','Sirop d\'érable','Poudre d\'amande'],base:['Extrait de vanille','Une pincée de sel','Cacao en poudre (pour les moules)'],steps:[['Faire fondre','Faire fondre le chocolat noir avec le beurre jusqu\'à lisse, puis laisser tiédir.'],['Pâte','Fouetter les œufs avec le sirop d\'érable et la vanille jusqu\'à blanchiment, incorporer le chocolat fondu, puis la poudre d\'amande et une pincée de sel.'],['Cuire chaud et court','Verser dans des ramequins beurrés et chemisés de cacao et cuire à 200 °C 10–12 minutes jusqu\'à ce que ce soit pris dehors et coulant au centre.'],['Servir aussitôt','Démouler et servir immédiatement tant que le centre est coulant.']]} } },

{ id:'creme-brulee', emoji:'🍮', is_kids:false, title:'Vanilla Crème Brûlée',
  subtitle:'Silky vanilla custard under a crackly caramel top',
  tags:['Vegetarian','Gluten-free'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian','Gluten-free'], prep:20, cook:40, servings:4,
  nutrition:{fat:38,kcal:450,carbs:24,fiber:0,protein:5},
  ings:[['🥛','Double cream','500ml'],['🥚','Egg yolks','5 pcs'],['🍬','Sugar','70g']],
  base:['Vanilla extract','Sugar (for the top)'], dress:null,
  steps:[
    ['Infuse the cream','Gently warm the cream with the vanilla until steaming — do not let it boil.',[0],null],
    ['Make the custard','Whisk the egg yolks with the sugar, then slowly whisk in the warm cream.',[1,2],null],
    ['Bake in a bain-marie','Pour into ramekins, set them in a tray of hot water and bake at 150°C for 35–40 minutes until just set. Cool, then chill.',[],'The water bath keeps it silky — bake just until it barely jiggles in the middle.'],
    ['Brûlée the top','Sprinkle with a thin layer of sugar and caramelise with a blowtorch (or under a hot grill) just before serving.',[],null] ],
  image_prompt:'Crème brûlée in a ramekin with a glassy caramelised sugar top being cracked with a spoon, vanilla flecks in the custard, elegant food photography',
  tr:{ de:{title:'Crème brûlée',names:['Schlagsahne','Eigelb','Zucker'],base:['Vanilleextrakt','Zucker (für die Kruste)'],steps:[['Sahne aromatisieren','Sahne mit Vanille sanft erwärmen, bis sie dampft — nicht kochen.'],['Creme machen','Eigelb mit dem Zucker verrühren, dann langsam die warme Sahne unterrühren.'],['Im Wasserbad backen','In Förmchen füllen, in ein Blech mit heißem Wasser stellen und bei 150 °C 35–40 Minuten backen, bis gerade fest. Abkühlen, dann kühlen.'],['Kruste flambieren','Mit einer dünnen Zuckerschicht bestreuen und kurz vor dem Servieren mit dem Bunsenbrenner (oder unter dem heißen Grill) karamellisieren.']]},
       es:{title:'Crema catalana / crème brûlée',names:['Nata para montar','Yemas de huevo','Azúcar'],base:['Extracto de vainilla','Azúcar (para la costra)'],steps:[['Infusiona la nata','Calienta la nata con la vainilla hasta que humee — sin que hierva.'],['Haz la crema','Bate las yemas con el azúcar y luego incorpora poco a poco la nata caliente.'],['Hornea al baño maría','Reparte en ramequines, ponlos en una bandeja con agua caliente y hornea a 150 °C 35–40 minutos hasta que cuaje. Enfría y refrigera.'],['Quema la costra','Espolvorea una capa fina de azúcar y caramelízala con soplete (o bajo el grill) justo antes de servir.']]},
       fr:{title:'Crème brûlée à la vanille',names:['Crème entière','Jaunes d\'œuf','Sucre'],base:['Extrait de vanille','Sucre (pour le dessus)'],steps:[['Infuser la crème','Chauffer doucement la crème avec la vanille jusqu\'à frémissement — sans la faire bouillir.'],['Préparer la crème','Fouetter les jaunes avec le sucre, puis incorporer lentement la crème chaude.'],['Cuire au bain-marie','Répartir dans des ramequins, les poser dans un plat d\'eau chaude et cuire à 150 °C 35–40 minutes jusqu\'à juste prise. Refroidir, puis réfrigérer.'],['Caraméliser le dessus','Saupoudrer d\'une fine couche de sucre et caraméliser au chalumeau (ou sous le gril) juste avant de servir.']]} } },

{ id:'beetroot-feta-tart', emoji:'🫚', is_kids:false, title:'Beetroot & Feta Tart',
  subtitle:'Jammy onions, sweet beetroot and salty feta on crisp puff pastry',
  tags:['Vegetarian'], meal:['Main Course','Kleine Mahlzeit'], categories:['Tart'], diet:['Vegetarian'], prep:20, cook:25, servings:4,
  nutrition:{fat:24,kcal:420,carbs:34,fiber:4,protein:11},
  ings:[['🥐','Puff pastry','320g'],['🫚','Cooked beetroot','250g'],['🧀','Feta','150g'],['🧅','Red onion','1 pc'],['🌰','Walnuts','40g'],['🥚','Egg','1 pc'],['🥬','Rocket','30g']],
  base:['Olive oil','Balsamic vinegar','Thyme','Honey','Salt & pepper'], dress:null,
  steps:[
    ['Prep the pastry','Unroll the puff pastry onto a lined tray, score a 2 cm border with a knife and brush the border with beaten egg.',[0,5],null],
    ['Caramelise the onion','Soften the sliced red onion in a little olive oil with a splash of balsamic until soft and jammy.',[3],null],
    ['Top the tart','Spread the onion inside the border, arrange the sliced beetroot, crumble over the feta, scatter thyme and walnuts and drizzle with a little honey.',[1,2,4],'Pat the beetroot dry first so the pastry stays crisp, not soggy.'],
    ['Bake & finish','Bake at 200°C for 22–25 minutes until the pastry is puffed and golden. Finish with fresh rocket.',[6],null] ],
  image_prompt:'Rustic beetroot and feta puff pastry tart with caramelised red onion, walnuts, thyme and fresh rocket, one slice cut, bright editorial food photography',
  tr:{ de:{title:'Rote-Bete-Feta-Tarte',names:['Blätterteig','Gekochte Rote Bete','Feta','Rote Zwiebel','Walnüsse','Ei','Rucola'],base:['Olivenöl','Balsamico','Thymian','Honig','Salz & Pfeffer'],steps:[['Teig vorbereiten','Blätterteig auf ein ausgelegtes Blech rollen, mit dem Messer einen 2-cm-Rand einritzen und den Rand mit verquirltem Ei bestreichen.'],['Zwiebel karamellisieren','Rote Zwiebel in etwas Olivenöl mit einem Schuss Balsamico weich und marmeladig dünsten.'],['Tarte belegen','Zwiebeln innerhalb des Rands verteilen, Rote-Bete-Scheiben darauf, Feta darüberbröseln, Thymian und Walnüsse aufstreuen und mit etwas Honig beträufeln.'],['Backen & abschließen','Bei 200 °C 22–25 Minuten goldbraun backen. Mit frischem Rucola abschließen.']]},
       es:{title:'Tarta de remolacha y feta',names:['Hojaldre','Remolacha cocida','Feta','Cebolla roja','Nueces','Huevo','Rúcula'],base:['Aceite de oliva','Vinagre balsámico','Tomillo','Miel','Sal y pimienta'],steps:[['Prepara el hojaldre','Extiende el hojaldre en una bandeja forrada, marca un borde de 2 cm con un cuchillo y pinta el borde con huevo batido.'],['Carameliza la cebolla','Pocha la cebolla roja en un poco de aceite con un chorro de balsámico hasta que esté blanda y melosa.'],['Cubre la tarta','Reparte la cebolla dentro del borde, coloca la remolacha en rodajas, desmenuza el feta, esparce tomillo y nueces y riega con un poco de miel.'],['Hornea y termina','Hornea a 200 °C 22–25 minutos hasta que el hojaldre esté hinchado y dorado. Termina con rúcula fresca.']]},
       fr:{title:'Tarte betterave & feta',names:['Pâte feuilletée','Betterave cuite','Feta','Oignon rouge','Noix','Œuf','Roquette'],base:['Huile d\'olive','Vinaigre balsamique','Thym','Miel','Sel & poivre'],steps:[['Préparer la pâte','Dérouler la pâte feuilletée sur une plaque chemisée, marquer un bord de 2 cm au couteau et le badigeonner d\'œuf battu.'],['Caraméliser l\'oignon','Faire fondre l\'oignon rouge émincé dans un peu d\'huile avec un trait de balsamique jusqu\'à ce qu\'il soit fondant et confit.'],['Garnir la tarte','Étaler l\'oignon à l\'intérieur du bord, disposer la betterave en tranches, émietter la feta, parsemer de thym et de noix et arroser d\'un peu de miel.'],['Cuire et finir','Cuire à 200 °C 22–25 minutes jusqu\'à ce que la pâte soit gonflée et dorée. Finir avec de la roquette fraîche.']]} } },
];

// ── builders (same pattern as build_classics) ──
const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
function enRow(s){
  const ingredients=s.ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
  const dressing=(s.dress||[]).map(([e,n,a])=>({name:n,emoji:e,amount:a}));
  const steps=s.steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(s.ings[j][0],short(s.ings[j][1]),s.ings[j][2])),tip:tip||null,kidsHelp:null}));
  return {id:s.id,title:s.title,subtitle:s.subtitle,emoji:s.emoji,is_kids:s.is_kids,tags:s.tags,meal:s.meal,categories:s.categories,diet:s.diet,prep_minutes:s.prep,cook_minutes:s.cook,servings:s.servings,image_url:'',image_prompt:s.image_prompt,nutrition:s.nutrition,ingredients,base_ingredients:s.base,dressing,mise_en_place:[...ingredients,...dressing],steps};
}
function i18nEntry(s){
  const out={};
  ['de','es','fr'].forEach(l=>{const t=s.tr[l];
    out[l]={title:t.title,ingredients:t.names.slice(),base:(t.base||[]).slice(),
      dressing:(s.dress||[]).map(([e,,a],k)=>({name:(t.dress||[])[k]||'',emoji:e,amount:a})),
      steps:s.steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(s.ings[j][0],short(t.names[j]),s.ings[j][2])),tip:null,kidsHelp:null}))};
  });
  return out;
}

const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
let added=0;
R.forEach(s=>{const row=enRow(s);const k=nr.findIndex(r=>r.id===s.id);if(k>=0)nr[k]=row;else{nr.push(row);added++;}i18n[s.id]=i18nEntry(s);});
fs.writeFileSync('new_recipes.json',JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json',JSON.stringify(i18n,null,2));
console.log(`Built ${R.length} extras (${added} new). new_recipes.json now has ${nr.length} rows.`);
