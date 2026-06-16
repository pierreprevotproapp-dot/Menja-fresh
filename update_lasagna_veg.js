// Vegetarian lasagna (NOT vegan), no béchamel: roasted veg + tomato sauce +
// a creamy ricotta–spinach layer in place of the white sauce. Best-rated style.
const fs = require('fs');
const ID = 'vegetarian-lasagna';
const ings = [
  ['🍝','Lasagne sheets','250g'],
  ['🍆','Aubergine','1 pc'],
  ['🥒','Courgette','1 pc'],
  ['🥫','Chopped tomatoes','800g'],
  ['🧀','Ricotta','400g'],
  ['🥬','Spinach','150g'],
  ['🧀','Mozzarella','125g'],
  ['🧅','Onion','1 pc'],
  ['🧄','Garlic','3 cloves'],
  ['🧀','Parmesan','40g'],
];
const base = ['Olive oil','Dried oregano','Nutmeg','Salt & pepper'];
const nutrition = { fat:22, kcal:470, carbs:46, fiber:7, protein:23 };
const steps = [
  ['Roast the veg','Dice the aubergine and courgette, toss with olive oil and roast at 200°C for 20 minutes until soft and caramelised.',[1,2],null],
  ['Tomato sauce','Soften the onion and garlic in olive oil, add the chopped tomatoes and oregano and simmer 15 minutes, then stir in the roasted veg.',[7,8,3],null],
  ['Ricotta-spinach layer','Wilt the spinach, squeeze it dry, then mix with the ricotta, a little nutmeg, salt and pepper.',[5,4],'This creamy ricotta-spinach layer replaces béchamel — no white-sauce faff.'],
  ['Layer & bake','Layer the tomato-veg sauce, lasagne sheets and the ricotta-spinach, repeat, top with mozzarella and parmesan and bake at 180°C for 35–40 minutes until golden and bubbling.',[0,6,9],null],
];
const image_prompt='Vegetarian vegetable lasagna with roasted aubergine and courgette, rich tomato sauce and a creamy ricotta-spinach layer (no béchamel), golden melted mozzarella top, one portion lifted to show the layers, rustic baking dish, soft natural daylight, realistic homemade food photography, not over-stylised';

const tr = {
  de:{ title:'Gemüse-Lasagne (ohne Béchamel)', sub:'Geröstetes Gemüse, Tomatensauce und eine cremige Ricotta-Spinat-Schicht statt Béchamel',
    names:['Lasagneplatten','Aubergine','Zucchini','Gehackte Tomaten','Ricotta','Spinat','Mozzarella','Zwiebel','Knoblauch','Parmesan'],
    base:['Olivenöl','Getrockneter Oregano','Muskatnuss','Salz & Pfeffer'],
    steps:[['Gemüse rösten','Aubergine und Zucchini würfeln, mit Olivenöl mischen und bei 200 °C 20 Minuten weich und karamellisiert rösten.'],
      ['Tomatensauce','Zwiebel und Knoblauch in Olivenöl andünsten, gehackte Tomaten und Oregano zugeben und 15 Minuten köcheln, dann das geröstete Gemüse unterrühren.'],
      ['Ricotta-Spinat-Schicht','Spinat zusammenfallen lassen, gut ausdrücken und mit Ricotta, etwas Muskat, Salz und Pfeffer verrühren.','Diese cremige Ricotta-Spinat-Schicht ersetzt das Béchamel — ohne Mehlschwitze.'],
      ['Schichten & backen','Tomaten-Gemüse-Sauce, Lasagneplatten und Ricotta-Spinat schichten, wiederholen, mit Mozzarella und Parmesan belegen und bei 180 °C 35–40 Minuten goldbraun backen.']] },
  es:{ title:'Lasaña de verduras (sin bechamel)', sub:'Verduras asadas, salsa de tomate y una capa cremosa de ricotta y espinacas en lugar de bechamel',
    names:['Placas de lasaña','Berenjena','Calabacín','Tomate triturado','Ricotta','Espinacas','Mozzarella','Cebolla','Ajo','Parmesano'],
    base:['Aceite de oliva','Orégano seco','Nuez moscada','Sal y pimienta'],
    steps:[['Asa las verduras','Corta en dados la berenjena y el calabacín, mézclalos con aceite y ásalos a 200 °C 20 minutos hasta que estén blandos y caramelizados.'],
      ['Salsa de tomate','Sofríe la cebolla y el ajo en aceite, añade el tomate triturado y el orégano y cuece 15 minutos, luego incorpora las verduras asadas.'],
      ['Capa de ricotta y espinacas','Pocha las espinacas, escúrrelas bien y mézclalas con la ricotta, un poco de nuez moscada, sal y pimienta.','Esta capa cremosa de ricotta y espinacas sustituye a la bechamel — sin complicaciones.'],
      ['Monta y hornea','Alterna la salsa de tomate y verduras, las placas de lasaña y la mezcla de ricotta y espinacas, repite, cubre con mozzarella y parmesano y hornea a 180 °C 35–40 minutos hasta dorar.']] },
  fr:{ title:'Lasagnes de légumes (sans béchamel)', sub:'Légumes rôtis, sauce tomate et une couche crémeuse de ricotta-épinards à la place de la béchamel',
    names:['Feuilles de lasagnes','Aubergine','Courgette','Tomates concassées','Ricotta','Épinards','Mozzarella','Oignon','Ail','Parmesan'],
    base:['Huile d\'olive','Origan séché','Noix de muscade','Sel & poivre'],
    steps:[['Rôtir les légumes','Couper l\'aubergine et la courgette en dés, mélanger à l\'huile et rôtir à 200 °C 20 minutes jusqu\'à tendreté.'],
      ['Sauce tomate','Faire suer l\'oignon et l\'ail dans l\'huile, ajouter les tomates concassées et l\'origan et mijoter 15 minutes, puis incorporer les légumes rôtis.'],
      ['Couche ricotta-épinards','Faire tomber les épinards, bien les essorer, puis les mélanger à la ricotta, un peu de muscade, sel et poivre.','Cette couche crémeuse de ricotta-épinards remplace la béchamel — sans roux.'],
      ['Monter et cuire','Alterner la sauce tomate-légumes, les feuilles de lasagnes et la ricotta-épinards, répéter, couvrir de mozzarella et de parmesan et cuire à 180 °C 35–40 minutes jusqu\'à doré.']] },
};

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const r=nr.find(x=>x.id===ID);
r.title='Vegetable Lasagna (No Béchamel)';
r.subtitle='Roasted veg, tomato sauce and a creamy ricotta-spinach layer instead of béchamel';
r.tags=['Vegetarian','Kid-Friendly']; r.diet=['Vegetarian'];
r.ingredients=ingredients; r.base_ingredients=base; r.dressing=[]; r.mise_en_place=ingredients.slice();
r.steps=enSteps; r.nutrition=nutrition; r.image_prompt=image_prompt;
fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));
const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{const t=tr[l];
  i18n[ID][l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:t.steps[i][2]||null,kidsHelp:null}))};
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Lasagna → vegetarian (ricotta-spinach, no béchamel). Not vegan.');
