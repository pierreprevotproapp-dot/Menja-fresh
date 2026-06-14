// Menja Fresh — 10 most-searched classics + vegetarian lasagna + fudgy brownies
// (brownies REPLACE the unpopular flourless-chocolate-almond-cake).
// Generic builder: step chips are built from ingredient INDICES so amounts/emoji
// stay identical across EN/DE/ES/FR (only names translate) → alignment guaranteed.
const fs = require('fs');

// spec.ings:[emoji,EN,amt]  spec.base:[EN,...]  spec.dress:[[emoji,EN,amt]]?
// spec.steps:[title,text,[ingIdx],tip|null]
// spec.tr[l]:{title, names:[...], base:[...], dress:[...]?, steps:[[t,txt],...]}
const R = [
{ id:'spaghetti-bolognese', emoji:'🍝', is_kids:true, title:'Spaghetti Bolognese',
  subtitle:'The slow-simmered Italian classic the whole family asks for',
  tags:['Kid-Friendly'], meal:['Main Course'], categories:['Pasta'], diet:[], prep:15, cook:45, servings:4,
  nutrition:{fat:22,kcal:620,carbs:68,fiber:6,protein:34},
  ings:[['🍝','Spaghetti','400g'],['🥩','Beef mince','500g'],['🧅','Onion','1 pc'],['🥕','Carrot','1 pc'],['🧄','Garlic','2 cloves'],['🥫','Chopped tomatoes','800g'],['🍅','Tomato purée','2 tbsp'],['🧀','Parmesan','40g']],
  base:['Olive oil','Dried oregano','Bay leaf','Salt & pepper'], dress:null,
  steps:[
    ['Soffritto','Finely chop the onion, carrot and garlic and soften gently in olive oil for about 8 minutes.',[2,3,4],'A slow, gentle soffritto is the flavour base — don\'t rush or brown it.'],
    ['Brown the mince','Turn up the heat, add the beef mince and brown well, breaking it up with a spoon.',[1],null],
    ['Simmer the sauce','Stir in the chopped tomatoes, tomato purée, oregano and bay leaf. Simmer on low for at least 30 minutes.',[5,6],null],
    ['Cook & toss','Boil the spaghetti until al dente, drain, toss with the sauce and serve with grated parmesan.',[0,7],null] ],
  image_prompt:'Bowl of spaghetti bolognese with rich meat sauce, grated parmesan and basil, rustic Italian food photography',
  tr:{ de:{title:'Spaghetti Bolognese',names:['Spaghetti','Rinderhack','Zwiebel','Karotte','Knoblauch','Gehackte Tomaten','Tomatenmark','Parmesan'],base:['Olivenöl','Getrockneter Oregano','Lorbeerblatt','Salz & Pfeffer'],steps:[['Soffritto','Zwiebel, Karotte und Knoblauch fein hacken und in Olivenöl ca. 8 Minuten sanft andünsten.'],['Hack anbraten','Hitze erhöhen, Rinderhack zugeben und krümelig anbraten.'],['Sauce köcheln','Gehackte Tomaten, Tomatenmark, Oregano und Lorbeer zugeben. Mindestens 30 Minuten leise köcheln.'],['Kochen & vermengen','Spaghetti al dente kochen, abgießen, mit der Sauce vermengen und mit geriebenem Parmesan servieren.']]},
       es:{title:'Espaguetis a la boloñesa',names:['Espaguetis','Carne picada de ternera','Cebolla','Zanahoria','Ajo','Tomate triturado','Concentrado de tomate','Parmesano'],base:['Aceite de oliva','Orégano seco','Hoja de laurel','Sal y pimienta'],steps:[['Soffritto','Pica fino la cebolla, la zanahoria y el ajo y sofríe suavemente en aceite unos 8 minutos.'],['Dora la carne','Sube el fuego, añade la carne picada y dórala bien, desmenuzándola.'],['Cuece la salsa','Añade el tomate triturado, el concentrado, el orégano y el laurel. Cuece a fuego lento al menos 30 minutos.'],['Cuece y mezcla','Cuece los espaguetis al dente, escurre, mezcla con la salsa y sirve con parmesano rallado.']]},
       fr:{title:'Spaghetti bolognaise',names:['Spaghetti','Bœuf haché','Oignon','Carotte','Ail','Tomates concassées','Concentré de tomate','Parmesan'],base:['Huile d\'olive','Origan séché','Feuille de laurier','Sel & poivre'],steps:[['Soffritto','Hacher finement l\'oignon, la carotte et l\'ail et faire suer doucement dans l\'huile environ 8 minutes.'],['Saisir la viande','Monter le feu, ajouter le bœuf haché et bien le colorer en l\'émiettant.'],['Mijoter la sauce','Ajouter les tomates concassées, le concentré, l\'origan et le laurier. Laisser mijoter au moins 30 minutes.'],['Cuire et mélanger','Cuire les spaghetti al dente, égoutter, mélanger à la sauce et servir avec du parmesan râpé.']]} } },

{ id:'thai-green-chicken-curry', emoji:'🍛', is_kids:false, title:'Thai Green Chicken Curry',
  subtitle:'Fragrant, creamy and on the table in 30 minutes',
  tags:['Gluten-free'], meal:['Main Course'], categories:['Curry'], diet:['Gluten-free'], prep:15, cook:20, servings:4,
  nutrition:{fat:24,kcal:560,carbs:58,fiber:5,protein:32},
  ings:[['🍗','Chicken breast','500g'],['🟢','Green curry paste','3 tbsp'],['🥥','Coconut milk','400ml'],['🍚','Jasmine rice','250g'],['🫛','Green beans','150g'],['🫑','Red pepper','1 pc'],['🍋','Lime','1 pc']],
  base:['Vegetable oil','Fish sauce','Brown sugar','Thai basil'], dress:null,
  steps:[
    ['Cook the rice','Rinse and cook the jasmine rice according to the packet.',[3],null],
    ['Fry the paste','Fry the green curry paste in a little oil for 1 minute until fragrant.',[1],'Frying the paste first wakes up all the aromatics — don\'t skip it.'],
    ['Simmer the curry','Add the sliced chicken and coconut milk with a splash of fish sauce and sugar. Simmer 10 minutes, then add the beans and pepper for 5 more.',[0,2,4,5],null],
    ['Finish','Squeeze in the lime, scatter Thai basil and serve over the rice.',[6],null] ],
  image_prompt:'Thai green chicken curry with coconut sauce, green beans and red pepper over jasmine rice, fresh basil, vibrant food photography',
  tr:{ de:{title:'Grünes Thai-Hähnchen-Curry',names:['Hähnchenbrust','Grüne Currypaste','Kokosmilch','Jasminreis','Grüne Bohnen','Rote Paprika','Limette'],base:['Pflanzenöl','Fischsauce','Brauner Zucker','Thai-Basilikum'],steps:[['Reis kochen','Jasminreis abspülen und nach Packung kochen.'],['Paste anbraten','Grüne Currypaste in etwas Öl 1 Minute aromatisch anbraten.'],['Curry köcheln','Geschnetzeltes Hähnchen und Kokosmilch mit einem Schuss Fischsauce und Zucker zugeben. 10 Minuten köcheln, dann Bohnen und Paprika 5 Minuten mitgaren.'],['Abschließen','Limette ausdrücken, Thai-Basilikum darüber und über dem Reis servieren.']]},
       es:{title:'Curry verde de pollo tailandés',names:['Pechuga de pollo','Pasta de curry verde','Leche de coco','Arroz jazmín','Judías verdes','Pimiento rojo','Lima'],base:['Aceite vegetal','Salsa de pescado','Azúcar moreno','Albahaca tailandesa'],steps:[['Cuece el arroz','Enjuaga y cuece el arroz jazmín según el paquete.'],['Sofríe la pasta','Sofríe la pasta de curry verde en un poco de aceite 1 minuto hasta que sea aromática.'],['Cuece el curry','Añade el pollo en tiras y la leche de coco con un chorro de salsa de pescado y azúcar. Cuece 10 minutos, añade las judías y el pimiento 5 minutos más.'],['Termina','Exprime la lima, esparce albahaca y sirve sobre el arroz.']]},
       fr:{title:'Curry vert de poulet thaï',names:['Blanc de poulet','Pâte de curry vert','Lait de coco','Riz jasmin','Haricots verts','Poivron rouge','Citron vert'],base:['Huile végétale','Sauce poisson','Sucre roux','Basilic thaï'],steps:[['Cuire le riz','Rincer et cuire le riz jasmin selon le paquet.'],['Faire revenir la pâte','Faire revenir la pâte de curry vert dans un peu d\'huile 1 minute jusqu\'à ce qu\'elle embaume.'],['Mijoter le curry','Ajouter le poulet émincé et le lait de coco avec un trait de sauce poisson et le sucre. Mijoter 10 minutes, ajouter les haricots et le poivron 5 minutes de plus.'],['Finir','Presser le citron vert, parsemer de basilic thaï et servir sur le riz.']]} } },

{ id:'margherita-pizza', emoji:'🍕', is_kids:true, title:'Margherita Pizza',
  subtitle:'Blistered, bubbling and better than delivery',
  tags:['Vegetarian','Kid-Friendly'], meal:['Main Course'], categories:['Pizza'], diet:['Vegetarian'], prep:20, cook:12, servings:2,
  nutrition:{fat:18,kcal:560,carbs:74,fiber:4,protein:22},
  ings:[['🫓','Pizza dough','300g'],['🥫','Passata','150g'],['🧀','Mozzarella','125g'],['🌿','Fresh basil','1 handful'],['🧀','Parmesan','20g']],
  base:['Olive oil','Garlic','Dried oregano','Salt'], dress:null,
  steps:[
    ['Heat the oven','Heat the oven as hot as it goes (250°C) with a tray or stone inside.',[],'A screaming-hot oven + preheated tray is the secret to a crisp base at home.'],
    ['Make the sauce','Mix the passata with a little crushed garlic, oregano, olive oil and salt.',[1],null],
    ['Top the base','Stretch the dough thin, spread a thin layer of sauce and tear over the mozzarella.',[0,2],null],
    ['Bake & finish','Bake 8–12 minutes until blistered. Finish with fresh basil, parmesan and a drizzle of olive oil.',[3,4],null] ],
  image_prompt:'Classic margherita pizza with blistered crust, melted mozzarella, tomato and fresh basil, overhead shot, wood-fired look',
  tr:{ de:{title:'Pizza Margherita',names:['Pizzateig','Passata','Mozzarella','Frisches Basilikum','Parmesan'],base:['Olivenöl','Knoblauch','Getrockneter Oregano','Salz'],steps:[['Ofen vorheizen','Ofen so heiß wie möglich (250°C) mit Blech oder Stein darin vorheizen.'],['Sauce machen','Passata mit etwas gepresstem Knoblauch, Oregano, Olivenöl und Salz verrühren.'],['Belegen','Teig dünn ausziehen, dünn mit Sauce bestreichen und Mozzarella darüber zupfen.'],['Backen & abschließen','8–12 Minuten backen, bis Blasen werfen. Mit Basilikum, Parmesan und etwas Olivenöl abschließen.']]},
       es:{title:'Pizza margarita',names:['Masa de pizza','Passata','Mozzarella','Albahaca fresca','Parmesano'],base:['Aceite de oliva','Ajo','Orégano seco','Sal'],steps:[['Calienta el horno','Calienta el horno al máximo (250°C) con una bandeja o piedra dentro.'],['Haz la salsa','Mezcla la passata con un poco de ajo majado, orégano, aceite y sal.'],['Cubre la base','Estira la masa fina, extiende una capa fina de salsa y reparte la mozzarella.'],['Hornea y termina','Hornea 8–12 minutos hasta que burbujee. Termina con albahaca, parmesano y un chorrito de aceite.']]},
       fr:{title:'Pizza margherita',names:['Pâte à pizza','Passata','Mozzarella','Basilic frais','Parmesan'],base:['Huile d\'olive','Ail','Origan séché','Sel'],steps:[['Préchauffer le four','Préchauffer le four au maximum (250°C) avec une plaque ou pierre à l\'intérieur.'],['Faire la sauce','Mélanger la passata avec un peu d\'ail écrasé, l\'origan, l\'huile et le sel.'],['Garnir la base','Étirer la pâte finement, étaler une fine couche de sauce et répartir la mozzarella.'],['Cuire et finir','Cuire 8–12 minutes jusqu\'à ce que ça cloque. Finir avec basilic, parmesan et un filet d\'huile.']]} } },

{ id:'classic-beef-lasagna', emoji:'🍝', is_kids:true, title:'Classic Beef Lasagna',
  subtitle:'Layers of rich ragù and creamy béchamel — the ultimate comfort bake',
  tags:['Kid-Friendly'], meal:['Main Course'], categories:['Pasta'], diet:[], prep:30, cook:45, servings:6,
  nutrition:{fat:26,kcal:580,carbs:46,fiber:4,protein:32},
  ings:[['🍝','Lasagne sheets','250g'],['🥩','Beef mince','500g'],['🥫','Chopped tomatoes','800g'],['🧅','Onion','1 pc'],['🧄','Garlic','2 cloves'],['🥛','Milk','600ml'],['🧈','Butter','50g'],['🌾','Plain flour','50g'],['🧀','Parmesan','60g']],
  base:['Olive oil','Nutmeg','Dried oregano','Salt & pepper'], dress:null,
  steps:[
    ['Make the ragù','Soften the onion and garlic, brown the mince, add the tomatoes and oregano and simmer 20 minutes.',[3,4,1,2],null],
    ['Make the béchamel','Melt the butter, whisk in the flour, then gradually add the milk to make a smooth sauce. Season with a little nutmeg.',[6,7,5],null],
    ['Layer it up','Layer ragù, lasagne sheets and béchamel, repeat, and finish with béchamel and parmesan.',[0,8],null],
    ['Bake','Bake at 180°C for 35–40 minutes until golden and bubbling. Rest 10 minutes before cutting.',[],'Resting before you cut lets the layers set so it slices cleanly.'] ],
  image_prompt:'Classic beef lasagna with golden bubbling cheese top, one portion lifted showing layers of ragù and béchamel, cosy food photography',
  tr:{ de:{title:'Klassische Rinder-Lasagne',names:['Lasagneplatten','Rinderhack','Gehackte Tomaten','Zwiebel','Knoblauch','Milch','Butter','Weizenmehl','Parmesan'],base:['Olivenöl','Muskatnuss','Getrockneter Oregano','Salz & Pfeffer'],steps:[['Ragù machen','Zwiebel und Knoblauch andünsten, Hack anbraten, Tomaten und Oregano zugeben und 20 Minuten köcheln.'],['Béchamel machen','Butter schmelzen, Mehl einrühren, dann nach und nach Milch zu einer glatten Sauce geben. Mit etwas Muskat würzen.'],['Schichten','Ragù, Lasagneplatten und Béchamel schichten, wiederholen, mit Béchamel und Parmesan abschließen.'],['Backen','Bei 180°C 35–40 Minuten goldbraun backen. Vor dem Schneiden 10 Minuten ruhen lassen.']]},
       es:{title:'Lasaña de carne clásica',names:['Placas de lasaña','Carne picada de ternera','Tomate triturado','Cebolla','Ajo','Leche','Mantequilla','Harina de trigo','Parmesano'],base:['Aceite de oliva','Nuez moscada','Orégano seco','Sal y pimienta'],steps:[['Haz el ragú','Sofríe cebolla y ajo, dora la carne, añade el tomate y el orégano y cuece 20 minutos.'],['Haz la bechamel','Funde la mantequilla, incorpora la harina y añade la leche poco a poco hasta una salsa fina. Sazona con un poco de nuez moscada.'],['Monta las capas','Alterna ragú, placas y bechamel, repite y termina con bechamel y parmesano.'],['Hornea','Hornea a 180°C 35–40 minutos hasta dorar. Deja reposar 10 minutos antes de cortar.']]},
       fr:{title:'Lasagnes à la bolognaise',names:['Feuilles de lasagnes','Bœuf haché','Tomates concassées','Oignon','Ail','Lait','Beurre','Farine de blé','Parmesan'],base:['Huile d\'olive','Noix de muscade','Origan séché','Sel & poivre'],steps:[['Préparer le ragù','Faire suer oignon et ail, colorer le haché, ajouter les tomates et l\'origan et mijoter 20 minutes.'],['Préparer la béchamel','Faire fondre le beurre, incorporer la farine, puis ajouter le lait peu à peu pour une sauce lisse. Assaisonner d\'un peu de muscade.'],['Monter les couches','Alterner ragù, feuilles et béchamel, répéter et finir par béchamel et parmesan.'],['Cuire','Cuire à 180°C 35–40 minutes jusqu\'à doré. Laisser reposer 10 minutes avant de couper.']]} } },

{ id:'creamy-mac-and-cheese', emoji:'🧀', is_kids:true, title:'Creamy Mac and Cheese',
  subtitle:'Ultra-cheesy, crowd-pleasing comfort in one pan',
  tags:['Vegetarian','Kid-Friendly'], meal:['Main Course'], categories:['Pasta'], diet:['Vegetarian'], prep:10, cook:20, servings:4,
  nutrition:{fat:28,kcal:600,carbs:58,fiber:3,protein:24},
  ings:[['🍝','Macaroni','350g'],['🧀','Cheddar','200g'],['🥛','Milk','500ml'],['🧈','Butter','40g'],['🌾','Plain flour','40g'],['🍞','Breadcrumbs','30g']],
  base:['Mustard powder','Nutmeg','Salt & pepper'], dress:null,
  steps:[
    ['Cook the pasta','Boil the macaroni until just al dente, then drain.',[0],null],
    ['Cheese sauce','Melt the butter, whisk in the flour, add the milk gradually to a smooth sauce, then stir in the cheddar and a pinch of mustard powder.',[3,4,2,1],'Take the pan off the heat before adding the cheese so it stays silky, not grainy.'],
    ['Combine','Fold the drained pasta into the cheese sauce and season.',[],null],
    ['Bake (optional)','Top with breadcrumbs and bake at 200°C for 15 minutes until golden, or serve straight away.',[5],null] ],
  image_prompt:'Creamy macaroni and cheese with golden breadcrumb top in a baking dish, spoon pulling a cheesy portion, cosy food photography',
  tr:{ de:{title:'Cremige Mac and Cheese',names:['Makkaroni','Cheddar','Milch','Butter','Weizenmehl','Semmelbrösel'],base:['Senfpulver','Muskatnuss','Salz & Pfeffer'],steps:[['Nudeln kochen','Makkaroni gerade al dente kochen und abgießen.'],['Käsesauce','Butter schmelzen, Mehl einrühren, Milch nach und nach zu einer glatten Sauce geben, dann Cheddar und eine Prise Senfpulver einrühren.'],['Vermengen','Die abgetropften Nudeln unter die Käsesauce heben und abschmecken.'],['Backen (optional)','Mit Semmelbröseln bestreuen und bei 200°C 15 Minuten goldbraun backen, oder sofort servieren.']]},
       es:{title:'Macarrones con queso cremosos',names:['Macarrones','Cheddar','Leche','Mantequilla','Harina de trigo','Pan rallado'],base:['Mostaza en polvo','Nuez moscada','Sal y pimienta'],steps:[['Cuece la pasta','Cuece los macarrones al dente y escurre.'],['Salsa de queso','Funde la mantequilla, incorpora la harina, añade la leche poco a poco hasta una salsa fina y agrega el cheddar y una pizca de mostaza en polvo.'],['Mezcla','Incorpora la pasta escurrida a la salsa de queso y salpimienta.'],['Hornea (opcional)','Cubre con pan rallado y hornea a 200°C 15 minutos hasta dorar, o sirve al momento.']]},
       fr:{title:'Mac and cheese crémeux',names:['Macaronis','Cheddar','Lait','Beurre','Farine de blé','Chapelure'],base:['Moutarde en poudre','Noix de muscade','Sel & poivre'],steps:[['Cuire les pâtes','Cuire les macaronis juste al dente et égoutter.'],['Sauce au fromage','Faire fondre le beurre, incorporer la farine, ajouter le lait peu à peu pour une sauce lisse, puis ajouter le cheddar et une pincée de moutarde en poudre.'],['Mélanger','Incorporer les pâtes égouttées à la sauce et assaisonner.'],['Cuire (facultatif)','Parsemer de chapelure et cuire à 200°C 15 minutes jusqu\'à doré, ou servir aussitôt.']]} } },

{ id:'chili-con-carne', emoji:'🌶️', is_kids:false, title:'Chili con Carne',
  subtitle:'Smoky, spiced and even better the next day',
  tags:['Gluten-free'], meal:['Main Course'], categories:['Stew'], diet:['Gluten-free'], prep:15, cook:40, servings:4,
  nutrition:{fat:18,kcal:560,carbs:62,fiber:12,protein:34},
  ings:[['🥩','Beef mince','500g'],['🫘','Kidney beans','400g'],['🥫','Chopped tomatoes','400g'],['🧅','Onion','1 pc'],['🧄','Garlic','2 cloves'],['🫑','Red pepper','1 pc'],['🍚','Rice','250g']],
  base:['Cumin','Smoked paprika','Chilli powder','Olive oil'], dress:null,
  steps:[
    ['Cook the rice','Cook the rice according to the packet.',[6],null],
    ['Brown the base','Soften the onion, garlic and pepper in oil, then add the mince and brown.',[3,4,5,0],null],
    ['Spice & simmer','Stir in the cumin, paprika and chilli, then the tomatoes and beans. Simmer 30 minutes.',[2,1],'A long simmer melts everything together — the longer the better.'],
    ['Serve','Season and serve over the rice.',[],null] ],
  image_prompt:'Bowl of chili con carne with kidney beans over rice, topped with coriander, warm rustic food photography',
  tr:{ de:{title:'Chili con Carne',names:['Rinderhack','Kidneybohnen','Gehackte Tomaten','Zwiebel','Knoblauch','Rote Paprika','Reis'],base:['Kreuzkümmel','Geräuchertes Paprikapulver','Chilipulver','Olivenöl'],steps:[['Reis kochen','Reis nach Packung kochen.'],['Basis anbraten','Zwiebel, Knoblauch und Paprika in Öl andünsten, dann Hack zugeben und anbraten.'],['Würzen & köcheln','Kreuzkümmel, Paprika und Chili einrühren, dann Tomaten und Bohnen. 30 Minuten köcheln.'],['Servieren','Abschmecken und über dem Reis servieren.']]},
       es:{title:'Chili con carne',names:['Carne picada de ternera','Alubias rojas','Tomate triturado','Cebolla','Ajo','Pimiento rojo','Arroz'],base:['Comino','Pimentón ahumado','Chile en polvo','Aceite de oliva'],steps:[['Cuece el arroz','Cuece el arroz según el paquete.'],['Dora la base','Sofríe cebolla, ajo y pimiento en aceite, luego añade la carne y dórala.'],['Especia y cuece','Incorpora comino, pimentón y chile, luego el tomate y las alubias. Cuece 30 minutos.'],['Sirve','Salpimienta y sirve sobre el arroz.']]},
       fr:{title:'Chili con carne',names:['Bœuf haché','Haricots rouges','Tomates concassées','Oignon','Ail','Poivron rouge','Riz'],base:['Cumin','Paprika fumé','Piment en poudre','Huile d\'olive'],steps:[['Cuire le riz','Cuire le riz selon le paquet.'],['Colorer la base','Faire suer oignon, ail et poivron dans l\'huile, puis ajouter le haché et le colorer.'],['Épicer et mijoter','Incorporer cumin, paprika et piment, puis les tomates et les haricots. Mijoter 30 minutes.'],['Servir','Assaisonner et servir sur le riz.']]} } },

{ id:'egg-fried-rice', emoji:'🍚', is_kids:true, title:'Egg Fried Rice',
  subtitle:'The 15-minute takeaway favourite, made at home',
  tags:['Vegetarian'], meal:['Main Course'], categories:['Rice'], diet:['Vegetarian'], prep:10, cook:10, servings:2,
  nutrition:{fat:12,kcal:430,carbs:62,fiber:4,protein:14},
  ings:[['🍚','Cooked rice','400g'],['🥚','Eggs','3 pcs'],['🟢','Peas','100g'],['🧅','Spring onions','3 pcs'],['🥕','Carrot','1 pc'],['🧄','Garlic','2 cloves']],
  base:['Soy sauce','Sesame oil','Vegetable oil'], dress:null,
  steps:[
    ['Scramble the eggs','Beat and quickly scramble the eggs in a little oil, then set aside.',[1],null],
    ['Stir-fry the veg','Stir-fry the garlic, carrot, peas and spring onions over high heat.',[5,4,2,3],'Use cold, day-old rice if you can — it fries up far better than fresh.'],
    ['Fry the rice','Add the cooked rice and toss on high heat with a splash of soy sauce.',[0],null],
    ['Combine','Return the eggs, drizzle with sesame oil, toss together and serve.',[],null] ],
  image_prompt:'Egg fried rice with peas, carrot and spring onion in a wok, glossy and steaming, top-down food photography',
  tr:{ de:{title:'Gebratener Reis mit Ei',names:['Gekochter Reis','Eier','Erbsen','Frühlingszwiebeln','Karotte','Knoblauch'],base:['Sojasauce','Sesamöl','Pflanzenöl'],steps:[['Eier verquirlen','Eier verquirlen und in etwas Öl schnell zu Rührei braten, beiseitestellen.'],['Gemüse braten','Knoblauch, Karotte, Erbsen und Frühlingszwiebeln bei hoher Hitze anbraten.'],['Reis braten','Gekochten Reis zugeben und bei hoher Hitze mit einem Schuss Sojasauce schwenken.'],['Vermengen','Eier zurückgeben, mit Sesamöl beträufeln, vermengen und servieren.']]},
       es:{title:'Arroz frito con huevo',names:['Arroz cocido','Huevos','Guisantes','Cebolletas','Zanahoria','Ajo'],base:['Salsa de soja','Aceite de sésamo','Aceite vegetal'],steps:[['Cuaja los huevos','Bate y cuaja rápido los huevos en un poco de aceite y reserva.'],['Saltea la verdura','Saltea el ajo, la zanahoria, los guisantes y las cebolletas a fuego fuerte.'],['Fríe el arroz','Añade el arroz cocido y saltea a fuego fuerte con un chorro de salsa de soja.'],['Mezcla','Devuelve los huevos, riega con aceite de sésamo, mezcla y sirve.']]},
       fr:{title:'Riz sauté aux œufs',names:['Riz cuit','Œufs','Petits pois','Oignons nouveaux','Carotte','Ail'],base:['Sauce soja','Huile de sésame','Huile végétale'],steps:[['Brouiller les œufs','Battre et brouiller rapidement les œufs dans un peu d\'huile, réserver.'],['Sauter les légumes','Faire sauter l\'ail, la carotte, les petits pois et les oignons nouveaux à feu vif.'],['Sauter le riz','Ajouter le riz cuit et sauter à feu vif avec un trait de sauce soja.'],['Mélanger','Remettre les œufs, arroser d\'huile de sésame, mélanger et servir.']]} } },

{ id:'marry-me-chicken', emoji:'🍗', is_kids:false, title:'Marry Me Chicken',
  subtitle:'The viral creamy sun-dried tomato chicken everyone is searching for',
  tags:['Gluten-free'], meal:['Main Course'], categories:['Chicken'], diet:['Gluten-free'], prep:10, cook:25, servings:4,
  nutrition:{fat:30,kcal:540,carbs:10,fiber:2,protein:42},
  ings:[['🍗','Chicken breast','4 pcs'],['🥛','Double cream','250ml'],['🍅','Sun-dried tomatoes','80g'],['🧀','Parmesan','40g'],['🧄','Garlic','3 cloves'],['🥬','Spinach','60g']],
  base:['Olive oil','Dried oregano','Chilli flakes','Salt & pepper'], dress:null,
  steps:[
    ['Sear the chicken','Season the chicken breasts and sear in olive oil until golden on both sides, then set aside.',[0],null],
    ['Make the sauce','Soften the garlic, then add the sun-dried tomatoes, cream, parmesan, oregano and a pinch of chilli.',[4,2,1,3],null],
    ['Simmer','Return the chicken and simmer in the sauce for 10 minutes, then stir through the spinach.',[5],'Let it bubble gently so the sauce thickens and coats the chicken.'],
    ['Serve','Serve with rice, pasta or crusty bread to mop up the sauce.',[],null] ],
  image_prompt:'Marry me chicken — golden chicken breasts in creamy sun-dried tomato sauce with spinach and parmesan in a skillet, cosy food photography',
  tr:{ de:{title:'Marry Me Chicken',names:['Hähnchenbrust','Schlagsahne','Getrocknete Tomaten','Parmesan','Knoblauch','Spinat'],base:['Olivenöl','Getrockneter Oregano','Chiliflocken','Salz & Pfeffer'],steps:[['Hähnchen anbraten','Hähnchenbrüste würzen und in Olivenöl beidseitig goldbraun anbraten, beiseitestellen.'],['Sauce machen','Knoblauch andünsten, dann getrocknete Tomaten, Sahne, Parmesan, Oregano und eine Prise Chili zugeben.'],['Köcheln','Hähnchen zurückgeben und 10 Minuten in der Sauce köcheln, dann Spinat unterrühren.'],['Servieren','Mit Reis, Pasta oder knusprigem Brot servieren.']]},
       es:{title:'Marry Me Chicken (pollo cremoso)',names:['Pechuga de pollo','Nata para montar','Tomates secos','Parmesano','Ajo','Espinacas'],base:['Aceite de oliva','Orégano seco','Copos de chile','Sal y pimienta'],steps:[['Sella el pollo','Salpimienta las pechugas y séllalas en aceite hasta dorar por ambos lados, reserva.'],['Haz la salsa','Sofríe el ajo, luego añade los tomates secos, la nata, el parmesano, el orégano y una pizca de chile.'],['Cuece','Devuelve el pollo y cuece en la salsa 10 minutos, luego incorpora las espinacas.'],['Sirve','Sirve con arroz, pasta o pan crujiente.']]},
       fr:{title:'Marry Me Chicken (poulet crémeux)',names:['Blanc de poulet','Crème entière','Tomates séchées','Parmesan','Ail','Épinards'],base:['Huile d\'olive','Origan séché','Flocons de piment','Sel & poivre'],steps:[['Saisir le poulet','Assaisonner les blancs et les saisir dans l\'huile jusqu\'à doré des deux côtés, réserver.'],['Faire la sauce','Faire suer l\'ail, puis ajouter les tomates séchées, la crème, le parmesan, l\'origan et une pincée de piment.'],['Mijoter','Remettre le poulet et mijoter dans la sauce 10 minutes, puis incorporer les épinards.'],['Servir','Servir avec riz, pâtes ou pain croustillant.']]} } },

{ id:'chicken-fajita-bowl', emoji:'🌯', is_kids:true, title:'Chicken Fajita Bowl',
  subtitle:'Charred peppers, spiced chicken and all the toppings',
  tags:['Gluten-free','Kid-Friendly'], meal:['Main Course'], categories:['Bowl'], diet:['Gluten-free'], prep:15, cook:15, servings:4,
  nutrition:{fat:18,kcal:540,carbs:60,fiber:11,protein:38},
  ings:[['🍗','Chicken breast','500g'],['🫑','Mixed peppers','2 pcs'],['🧅','Onion','1 pc'],['🍚','Rice','250g'],['🫘','Black beans','400g'],['🥑','Avocado','1 pc'],['🍋','Lime','1 pc']],
  base:['Cumin','Smoked paprika','Olive oil','Salt'], dress:null,
  steps:[
    ['Cook the rice','Cook the rice according to the packet.',[3],null],
    ['Season & cook chicken','Toss the sliced chicken with cumin, paprika and salt, then cook until golden and done.',[0],null],
    ['Char the veg','Cook the peppers and onion over high heat until charred and just soft.',[1,2],'Leave them undisturbed for a minute at a time to get that smoky char.'],
    ['Build the bowl','Bowl up the rice and beans, add the chicken and veg, and top with avocado and a squeeze of lime.',[4,5,6],null] ],
  image_prompt:'Chicken fajita bowl with charred peppers, black beans, rice, avocado and lime, colourful overhead food photography',
  tr:{ de:{title:'Hähnchen-Fajita-Bowl',names:['Hähnchenbrust','Gemischte Paprika','Zwiebel','Reis','Schwarze Bohnen','Avocado','Limette'],base:['Kreuzkümmel','Geräuchertes Paprikapulver','Olivenöl','Salz'],steps:[['Reis kochen','Reis nach Packung kochen.'],['Hähnchen würzen & braten','Geschnittenes Hähnchen mit Kreuzkümmel, Paprika und Salz mischen und goldbraun garen.'],['Gemüse anrösten','Paprika und Zwiebel bei hoher Hitze rösten, bis sie Röstaromen haben und gerade weich sind.'],['Bowl aufbauen','Reis und Bohnen einfüllen, Hähnchen und Gemüse dazugeben, mit Avocado und einem Spritzer Limette toppen.']]},
       es:{title:'Bol de fajita de pollo',names:['Pechuga de pollo','Pimientos variados','Cebolla','Arroz','Frijoles negros','Aguacate','Lima'],base:['Comino','Pimentón ahumado','Aceite de oliva','Sal'],steps:[['Cuece el arroz','Cuece el arroz según el paquete.'],['Sazona y cocina el pollo','Mezcla el pollo en tiras con comino, pimentón y sal y cocina hasta dorar.'],['Asa la verdura','Cocina los pimientos y la cebolla a fuego fuerte hasta que estén tostados y tiernos.'],['Monta el bol','Pon el arroz y los frijoles, añade el pollo y la verdura, y corona con aguacate y un chorrito de lima.']]},
       fr:{title:'Bol fajita au poulet',names:['Blanc de poulet','Poivrons mélangés','Oignon','Riz','Haricots noirs','Avocat','Citron vert'],base:['Cumin','Paprika fumé','Huile d\'olive','Sel'],steps:[['Cuire le riz','Cuire le riz selon le paquet.'],['Assaisonner et cuire le poulet','Mélanger le poulet émincé avec cumin, paprika et sel et cuire jusqu\'à doré.'],['Saisir les légumes','Cuire les poivrons et l\'oignon à feu vif jusqu\'à coloration et tendreté.'],['Monter le bol','Disposer le riz et les haricots, ajouter le poulet et les légumes, garnir d\'avocat et d\'un trait de citron vert.']]} } },

{ id:'chicken-pad-thai', emoji:'🍜', is_kids:false, title:'Chicken Pad Thai',
  subtitle:'Sweet, tangy, peanutty noodles — the Thai street-food icon',
  tags:['Gluten-free'], meal:['Main Course'], categories:['Noodles'], diet:['Gluten-free'], prep:15, cook:10, servings:2,
  nutrition:{fat:18,kcal:560,carbs:72,fiber:5,protein:30},
  ings:[['🍜','Rice noodles','200g'],['🍗','Chicken breast','300g'],['🥚','Eggs','2 pcs'],['🫛','Beansprouts','100g'],['🥜','Peanuts','30g'],['🧅','Spring onions','2 pcs'],['🍋','Lime','1 pc']],
  base:['Tamarind paste','Fish sauce','Brown sugar','Vegetable oil'], dress:null,
  steps:[
    ['Soak the noodles','Soak the rice noodles in warm water until pliable, then drain.',[0],null],
    ['Cook chicken & egg','Stir-fry the chicken until cooked, push to one side and scramble the eggs.',[1,2],null],
    ['Toss with sauce','Add the noodles with the tamarind, fish sauce and sugar, and toss over high heat to coat.',[],'Tamarind + fish sauce + sugar is the classic sweet-salty-sour balance — taste and adjust.'],
    ['Finish','Add the beansprouts and spring onion, then top with crushed peanuts and a wedge of lime.',[3,4,5,6],null] ],
  image_prompt:'Chicken pad thai with rice noodles, beansprouts, crushed peanuts, spring onion and lime wedge, vibrant street-food photography',
  tr:{ de:{title:'Pad Thai mit Hähnchen',names:['Reisnudeln','Hähnchenbrust','Eier','Sojasprossen','Erdnüsse','Frühlingszwiebeln','Limette'],base:['Tamarindenpaste','Fischsauce','Brauner Zucker','Pflanzenöl'],steps:[['Nudeln einweichen','Reisnudeln in warmem Wasser einweichen, bis biegsam, dann abgießen.'],['Hähnchen & Ei garen','Hähnchen anbraten, zur Seite schieben und die Eier zu Rührei braten.'],['Mit Sauce schwenken','Nudeln mit Tamarinde, Fischsauce und Zucker zugeben und bei hoher Hitze schwenken.'],['Abschließen','Sojasprossen und Frühlingszwiebeln zugeben, mit gehackten Erdnüssen und einer Limettenspalte toppen.']]},
       es:{title:'Pad thai de pollo',names:['Fideos de arroz','Pechuga de pollo','Huevos','Brotes de soja','Cacahuetes','Cebolletas','Lima'],base:['Pasta de tamarindo','Salsa de pescado','Azúcar moreno','Aceite vegetal'],steps:[['Remoja los fideos','Remoja los fideos de arroz en agua tibia hasta que estén flexibles y escurre.'],['Cocina pollo y huevo','Saltea el pollo, apártalo a un lado y cuaja los huevos.'],['Saltea con salsa','Añade los fideos con tamarindo, salsa de pescado y azúcar y saltea a fuego fuerte.'],['Termina','Añade los brotes y las cebolletas, corona con cacahuetes picados y un gajo de lima.']]},
       fr:{title:'Pad thaï au poulet',names:['Nouilles de riz','Blanc de poulet','Œufs','Pousses de soja','Cacahuètes','Oignons nouveaux','Citron vert'],base:['Pâte de tamarin','Sauce poisson','Sucre roux','Huile végétale'],steps:[['Tremper les nouilles','Tremper les nouilles de riz dans l\'eau tiède jusqu\'à souplesse, puis égoutter.'],['Cuire poulet et œuf','Faire sauter le poulet, le pousser sur le côté et brouiller les œufs.'],['Sauter avec la sauce','Ajouter les nouilles avec le tamarin, la sauce poisson et le sucre et sauter à feu vif.'],['Finir','Ajouter les pousses de soja et les oignons nouveaux, garnir de cacahuètes concassées et d\'un quartier de citron vert.']]} } },

{ id:'vegetarian-lasagna', emoji:'🍝', is_kids:true, title:'Best-Ever Vegetarian Lasagna',
  subtitle:'Roasted veg and a rich tomato-béchamel — no one misses the meat',
  tags:['Vegetarian','Kid-Friendly'], meal:['Main Course'], categories:['Pasta'], diet:['Vegetarian'], prep:30, cook:45, servings:6,
  nutrition:{fat:20,kcal:480,carbs:54,fiber:8,protein:20},
  ings:[['🍝','Lasagne sheets','250g'],['🍆','Aubergine','1 pc'],['🥒','Courgette','1 pc'],['🫑','Red pepper','1 pc'],['🥫','Chopped tomatoes','800g'],['🥛','Milk','600ml'],['🧈','Butter','50g'],['🌾','Plain flour','50g'],['🧀','Mozzarella','125g']],
  base:['Olive oil','Garlic','Dried oregano','Nutmeg','Salt & pepper'], dress:null,
  steps:[
    ['Roast the veg','Dice the aubergine, courgette and pepper, toss with olive oil and roast at 200°C for 20 minutes.',[1,2,3],'Roasting the veg first deepens the flavour and stops the lasagna going watery.'],
    ['Tomato sauce','Simmer the chopped tomatoes with garlic and oregano for 15 minutes, then stir in the roasted veg.',[4],null],
    ['Béchamel','Melt the butter, whisk in the flour, add the milk gradually to a smooth sauce and season with nutmeg.',[6,7,5],null],
    ['Layer & bake','Layer veg sauce, lasagne sheets and béchamel, top with mozzarella and bake at 180°C for 35–40 minutes.',[0,8],null] ],
  image_prompt:'Vegetarian lasagna with roasted aubergine, courgette and pepper, golden mozzarella top, one slice lifted, cosy food photography',
  tr:{ de:{title:'Beste vegetarische Lasagne',names:['Lasagneplatten','Aubergine','Zucchini','Rote Paprika','Gehackte Tomaten','Milch','Butter','Weizenmehl','Mozzarella'],base:['Olivenöl','Knoblauch','Getrockneter Oregano','Muskatnuss','Salz & Pfeffer'],steps:[['Gemüse rösten','Aubergine, Zucchini und Paprika würfeln, mit Olivenöl mischen und bei 200°C 20 Minuten rösten.'],['Tomatensauce','Gehackte Tomaten mit Knoblauch und Oregano 15 Minuten köcheln, dann das geröstete Gemüse unterrühren.'],['Béchamel','Butter schmelzen, Mehl einrühren, Milch nach und nach zu einer glatten Sauce geben und mit Muskat würzen.'],['Schichten & backen','Gemüsesauce, Lasagneplatten und Béchamel schichten, mit Mozzarella belegen und bei 180°C 35–40 Minuten backen.']]},
       es:{title:'La mejor lasaña vegetariana',names:['Placas de lasaña','Berenjena','Calabacín','Pimiento rojo','Tomate triturado','Leche','Mantequilla','Harina de trigo','Mozzarella'],base:['Aceite de oliva','Ajo','Orégano seco','Nuez moscada','Sal y pimienta'],steps:[['Asa la verdura','Corta en dados la berenjena, el calabacín y el pimiento, mezcla con aceite y asa a 200°C 20 minutos.'],['Salsa de tomate','Cuece el tomate triturado con ajo y orégano 15 minutos, luego incorpora la verdura asada.'],['Bechamel','Funde la mantequilla, incorpora la harina, añade la leche poco a poco hasta una salsa fina y sazona con nuez moscada.'],['Monta y hornea','Alterna salsa de verduras, placas y bechamel, cubre con mozzarella y hornea a 180°C 35–40 minutos.']]},
       fr:{title:'Meilleures lasagnes végétariennes',names:['Feuilles de lasagnes','Aubergine','Courgette','Poivron rouge','Tomates concassées','Lait','Beurre','Farine de blé','Mozzarella'],base:['Huile d\'olive','Ail','Origan séché','Noix de muscade','Sel & poivre'],steps:[['Rôtir les légumes','Couper l\'aubergine, la courgette et le poivron en dés, mélanger à l\'huile et rôtir à 200°C 20 minutes.'],['Sauce tomate','Mijoter les tomates concassées avec ail et origan 15 minutes, puis incorporer les légumes rôtis.'],['Béchamel','Faire fondre le beurre, incorporer la farine, ajouter le lait peu à peu pour une sauce lisse et assaisonner de muscade.'],['Monter et cuire','Alterner sauce aux légumes, feuilles et béchamel, couvrir de mozzarella et cuire à 180°C 35–40 minutes.']]} } },

{ id:'fudgy-chocolate-brownies', emoji:'🍫', is_kids:true, title:'Fudgy Chocolate Brownies',
  subtitle:'Crackly top, dense fudgy middle — the chocolate hit everyone wants',
  tags:['Vegetarian','Kid-Friendly'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian'], prep:15, cook:25, servings:12,
  nutrition:{fat:18,kcal:300,carbs:34,fiber:2,protein:4},
  ings:[['🍫','Dark chocolate','200g'],['🧈','Butter','150g'],['🍬','Sugar','200g'],['🥚','Eggs','3 pcs'],['🌾','Plain flour','100g'],['🍫','Cocoa powder','30g']],
  base:['Vanilla extract','Pinch of salt'], dress:null,
  steps:[
    ['Melt','Melt the dark chocolate with the butter until smooth, then let it cool slightly.',[0,1],null],
    ['Mix the batter','Whisk the eggs, sugar and vanilla until thick and pale, then fold in the melted chocolate.',[3,2],null],
    ['Fold in dry','Gently fold in the flour, cocoa and a pinch of salt — stop as soon as it\'s combined.',[4,5],'Under-mixing and under-baking slightly is the secret to a fudgy, not cakey, brownie.'],
    ['Bake & cut','Pour into a lined tin and bake at 180°C for 20–25 minutes until just set. Cool fully, then cut into squares.',[],null] ],
  image_prompt:'Stack of fudgy chocolate brownies with crackly tops and dense centres, chocolate chunks visible, moody food photography',
  tr:{ de:{title:'Saftige Schoko-Brownies',names:['Zartbitterschokolade','Butter','Zucker','Eier','Weizenmehl','Kakaopulver'],base:['Vanilleextrakt','Eine Prise Salz'],steps:[['Schmelzen','Zartbitterschokolade mit der Butter glatt schmelzen, dann leicht abkühlen lassen.'],['Teig anrühren','Eier, Zucker und Vanille dick und hell aufschlagen, dann geschmolzene Schokolade unterheben.'],['Trockenes unterheben','Mehl, Kakao und eine Prise Salz vorsichtig unterheben — aufhören, sobald alles verbunden ist.'],['Backen & schneiden','In eine ausgelegte Form gießen und bei 180°C 20–25 Minuten backen, bis gerade fest. Vollständig abkühlen, dann in Stücke schneiden.']]},
       es:{title:'Brownies de chocolate jugosos',names:['Chocolate negro','Mantequilla','Azúcar','Huevos','Harina de trigo','Cacao en polvo'],base:['Extracto de vainilla','Una pizca de sal'],steps:[['Funde','Funde el chocolate negro con la mantequilla hasta que quede liso, deja enfriar un poco.'],['Prepara la masa','Bate los huevos, el azúcar y la vainilla hasta que blanqueen y espesen, luego incorpora el chocolate fundido.'],['Incorpora lo seco','Incorpora con suavidad la harina, el cacao y una pizca de sal — para en cuanto se integre.'],['Hornea y corta','Vierte en un molde forrado y hornea a 180°C 20–25 minutos hasta que esté justo cuajado. Enfría del todo y corta en cuadrados.']]},
       fr:{title:'Brownies au chocolat fondants',names:['Chocolat noir','Beurre','Sucre','Œufs','Farine de blé','Cacao en poudre'],base:['Extrait de vanille','Une pincée de sel'],steps:[['Faire fondre','Faire fondre le chocolat noir avec le beurre jusqu\'à lisse, laisser tiédir.'],['Préparer la pâte','Fouetter les œufs, le sucre et la vanille jusqu\'à épaississement, puis incorporer le chocolat fondu.'],['Incorporer le sec','Incorporer délicatement la farine, le cacao et une pincée de sel — arrêter dès que c\'est homogène.'],['Cuire et couper','Verser dans un moule chemisé et cuire à 180°C 20–25 minutes jusqu\'à juste pris. Laisser refroidir puis couper en carrés.']]} } },
];

// ── builders ──
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

// ── write ──
let nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
// remove the unpopular flourless cake (replaced by brownies)
nr=nr.filter(r=>r.id!=='flourless-chocolate-almond-cake'); delete i18n['flourless-chocolate-almond-cake'];
let added=0;
R.forEach(s=>{const row=enRow(s);const k=nr.findIndex(r=>r.id===s.id);if(k>=0)nr[k]=row;else{nr.push(row);added++;}i18n[s.id]=i18nEntry(s);});
fs.writeFileSync('new_recipes.json',JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json',JSON.stringify(i18n,null,2));
console.log(`Built ${R.length} recipes (${added} new). Removed flourless cake. new_recipes.json now has ${nr.length} rows.`);
