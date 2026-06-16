// Vegetarian lasagna → dairy-free, creative version (no milk, no béchamel):
// roasted veg + lentil-tomato ragù + cashew & white-bean "ricotta". Vegan.
const fs = require('fs');
const ID = 'vegetarian-lasagna';

const ings = [
  ['🍝','Lasagne sheets','250g'],
  ['🍆','Aubergine','1 pc'],
  ['🥒','Courgette','1 pc'],
  ['🥫','Chopped tomatoes','800g'],
  ['🟠','Red lentils','120g'],
  ['🫘','White beans','400g'],
  ['🌰','Cashews','60g'],
  ['🧅','Onion','1 pc'],
  ['🧄','Garlic','3 cloves'],
];
const base = ['Olive oil','Nutritional yeast','Lemon','Dried oregano','Salt & pepper'];
const nutrition = { fat:16, kcal:480, carbs:64, fiber:13, protein:20 };
// steps: [title, text, [ingIdx], tip|null]
const steps = [
  ['Roast the veg','Dice the aubergine and courgette, toss with olive oil and roast at 200°C for 20 minutes until soft and caramelised.',[1,2],null],
  ['Lentil-tomato ragù','Soften the onion and garlic in olive oil, add the red lentils, chopped tomatoes and oregano and simmer 20 minutes until thick, then stir in the roasted veg.',[7,8,4,3],null],
  ['Cashew & white-bean "ricotta"','Blend the cashews and white beans with the juice of the lemon, nutritional yeast, a splash of water, salt and pepper until smooth and creamy.',[6,5],'Soak the cashews in hot water for 10 minutes first — it makes the dairy-free layer beautifully creamy.'],
  ['Layer & bake','Layer ragù, lasagne sheets and the cashew–bean cream, repeat, finish with a layer of the cream and bake at 180°C for 35–40 minutes until golden and bubbling.',[0],null],
];
const image_prompt='Creamy dairy-free vegetable lasagna, layers of roasted aubergine and courgette, rich tomato-lentil ragù and a smooth cashew & white-bean ricotta, golden bubbling top, one portion lifted to show the layers, rustic baking dish, soft natural daylight, realistic homemade food photography, not over-stylised';

const tr = {
  de:{ title:'Cremige milchfreie Gemüse-Lasagne', sub:'Geröstetes Gemüse, Linsen-Ragù und cremige Cashew-Bohnen-„Ricotta" — ganz ohne Milch',
    names:['Lasagneplatten','Aubergine','Zucchini','Gehackte Tomaten','Rote Linsen','Weiße Bohnen','Cashews','Zwiebel','Knoblauch'],
    base:['Olivenöl','Hefeflocken','Zitrone','Getrockneter Oregano','Salz & Pfeffer'],
    steps:[['Gemüse rösten','Aubergine und Zucchini würfeln, mit Olivenöl mischen und bei 200 °C 20 Minuten weich und karamellisiert rösten.'],
      ['Linsen-Tomaten-Ragù','Zwiebel und Knoblauch in Olivenöl andünsten, rote Linsen, gehackte Tomaten und Oregano zugeben und 20 Minuten dicklich köcheln, dann das geröstete Gemüse unterrühren.'],
      ['Cashew-Bohnen-„Ricotta"','Cashews und weiße Bohnen mit dem Saft der Zitrone, Hefeflocken, einem Schuss Wasser, Salz und Pfeffer cremig mixen.','Cashews vorher 10 Minuten in heißem Wasser einweichen — dann wird die milchfreie Schicht besonders cremig.'],
      ['Schichten & backen','Ragù, Lasagneplatten und Cashew-Bohnen-Creme schichten, wiederholen, mit einer Cremeschicht abschließen und bei 180 °C 35–40 Minuten goldbraun backen.']] },
  es:{ title:'Lasaña de verduras cremosa sin lácteos', sub:'Verduras asadas, ragú de lentejas y «ricotta» cremosa de anacardos y alubias — sin nada de leche',
    names:['Placas de lasaña','Berenjena','Calabacín','Tomate triturado','Lentejas rojas','Alubias blancas','Anacardos','Cebolla','Ajo'],
    base:['Aceite de oliva','Levadura nutricional','Limón','Orégano seco','Sal y pimienta'],
    steps:[['Asa las verduras','Corta en dados la berenjena y el calabacín, mézclalos con aceite y ásalos a 200 °C 20 minutos hasta que estén blandos y caramelizados.'],
      ['Ragú de lentejas y tomate','Sofríe la cebolla y el ajo en aceite, añade las lentejas rojas, el tomate triturado y el orégano y cuece 20 minutos hasta que espese, luego incorpora las verduras asadas.'],
      ['«Ricotta» de anacardos y alubias','Tritura los anacardos y las alubias blancas con el zumo del limón, la levadura nutricional, un chorro de agua, sal y pimienta hasta que quede cremoso.','Remoja los anacardos 10 minutos en agua caliente para que la capa sin lácteos quede muy cremosa.'],
      ['Monta y hornea','Alterna ragú, placas de lasaña y la crema de anacardos y alubias, repite, termina con una capa de crema y hornea a 180 °C 35–40 minutos hasta dorar.']] },
  fr:{ title:'Lasagnes de légumes crémeuses sans lactose', sub:'Légumes rôtis, ragù de lentilles et « ricotta » crémeuse cajou-haricots blancs — sans lait',
    names:['Feuilles de lasagnes','Aubergine','Courgette','Tomates concassées','Lentilles corail','Haricots blancs','Noix de cajou','Oignon','Ail'],
    base:['Huile d\'olive','Levure maltée','Citron','Origan séché','Sel & poivre'],
    steps:[['Rôtir les légumes','Couper l\'aubergine et la courgette en dés, mélanger à l\'huile et rôtir à 200 °C 20 minutes jusqu\'à tendreté et caramélisation.'],
      ['Ragù lentilles-tomate','Faire suer l\'oignon et l\'ail dans l\'huile, ajouter les lentilles corail, les tomates concassées et l\'origan et mijoter 20 minutes jusqu\'à épaississement, puis incorporer les légumes rôtis.'],
      ['« Ricotta » cajou-haricots blancs','Mixer les noix de cajou et les haricots blancs avec le jus du citron, la levure maltée, un filet d\'eau, sel et poivre jusqu\'à consistance crémeuse.','Faire tremper les noix de cajou 10 minutes dans l\'eau chaude pour une couche sans lactose bien crémeuse.'],
      ['Monter et cuire','Alterner ragù, feuilles de lasagnes et crème cajou-haricots, répéter, finir par une couche de crème et cuire à 180 °C 35–40 minutes jusqu\'à doré.']] },
};

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));

const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const r=nr.find(x=>x.id===ID);
r.title='Creamy Dairy-Free Veggie Lasagna';
r.subtitle='Roasted veg, lentil ragù and a creamy cashew & white-bean ricotta — no milk, no béchamel';
r.tags=['Vegan','Vegetarian','Kid-Friendly']; r.diet=['Vegan','Vegetarian'];
r.ingredients=ingredients; r.base_ingredients=base; r.dressing=[]; r.mise_en_place=ingredients.slice();
r.steps=enSteps; r.nutrition=nutrition; r.image_prompt=image_prompt;
fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));

const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{const t=tr[l];
  i18n[ID][l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:t.steps[i][2]||null,kidsHelp:null}))};
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Lasagna → dairy-free (cashew & white-bean ricotta + lentil ragù). Now vegan.');
