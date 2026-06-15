// Apple Pie Pecan Oat Bowl — add fresh berries for colour & freshness, tidy the
// maple/almond-butter into the drizzle, and give it a more appetising prompt.
const fs = require('fs');
const ID = 'apple-pie-pecan-oat-bowl';

const ings = [
  ['🌾','Rolled oats','100g'],
  ['🥛','Oat milk','400ml'],
  ['🍎','Apple','2 pcs'],
  ['🌰','Pecans','40g'],
  ['🟤','Raisins','2 tbsp'],
  ['🫐','Fresh berries','80g'],
];
const base = ['Cinnamon','Pinch of salt','Coconut oil'];
const dressing = [ {name:'Maple syrup',emoji:'🍯',amount:'2 tbsp'}, {name:'Almond butter',emoji:'🥜',amount:'2 tbsp'} ];
const steps = [
  ['Cook the porridge','Simmer the oats with the oat milk, a pinch of salt and ½ tsp cinnamon for 5–7 minutes, stirring, until creamy.',[0,1],null],
  ['Sauté the cinnamon apples','Cube the apples and cook in a little coconut oil with cinnamon and a drizzle of maple for 4–5 minutes until soft and golden. Toast the pecans in a dry pan for 2–3 minutes, then roughly chop.',[2,3],null],
  ['Build & serve','Spoon the porridge into bowls, top with the cinnamon apples, pecans, raisins and a generous handful of fresh berries, then drizzle with maple syrup and almond butter.',[4,5],'The fresh berries add colour, juicy freshness and a tart contrast to the sweet apples.'],
];
const image_prompt='A cosy homemade breakfast bowl of creamy oat porridge topped with golden cinnamon-sautéed apple, toasted pecans, plump raisins and a generous scatter of fresh raspberries and blueberries, a swirl of almond butter and a maple drizzle — vibrant pops of red and purple berries against the warm oats — in a ceramic bowl on a wooden table, soft natural window light, realistic homemade food photography, slightly imperfect, not over-stylised';

const tr = {
  de:{ names:['Haferflocken','Hafermilch','Apfel','Pekannüsse','Rosinen','Frische Beeren'], base:['Zimt','Eine Prise Salz','Kokosöl'],
    dress:['Ahornsirup','Mandelmus'],
    steps:[['Porridge kochen','Haferflocken mit Hafermilch, einer Prise Salz und ½ TL Zimt 5–7 Minuten unter Rühren cremig köcheln.'],
      ['Zimt-Äpfel anbraten','Äpfel würfeln und in etwas Kokosöl mit Zimt und einem Schuss Ahornsirup 4–5 Minuten weich und goldbraun braten. Pekannüsse 2–3 Minuten trocken rösten, dann grob hacken.'],
      ['Anrichten & servieren','Porridge in Schalen füllen, mit Zimt-Äpfeln, Pekannüssen, Rosinen und einer großzügigen Handvoll frischer Beeren belegen, dann mit Ahornsirup und Mandelmus beträufeln.']] },
  es:{ names:['Copos de avena','Bebida de avena','Manzana','Nueces pecanas','Pasas','Frutos rojos frescos'], base:['Canela','Una pizca de sal','Aceite de coco'],
    dress:['Sirope de arce','Crema de almendras'],
    steps:[['Cuece el porridge','Cuece la avena con la bebida de avena, una pizca de sal y ½ cdta de canela 5–7 minutos, removiendo, hasta que quede cremoso.'],
      ['Saltea las manzanas a la canela','Corta las manzanas en dados y cocínalas en un poco de aceite de coco con canela y un chorrito de sirope 4–5 minutos hasta que estén blandas y doradas. Tuesta las nueces 2–3 minutos y pícalas.'],
      ['Monta y sirve','Reparte el porridge en boles, corona con las manzanas a la canela, las nueces, las pasas y un buen puñado de frutos rojos frescos, y riega con sirope de arce y crema de almendras.']] },
  fr:{ names:['Flocons d\'avoine','Lait d\'avoine','Pomme','Noix de pécan','Raisins secs','Fruits rouges frais'], base:['Cannelle','Une pincée de sel','Huile de coco'],
    dress:['Sirop d\'érable','Purée d\'amande'],
    steps:[['Cuire le porridge','Faire cuire les flocons d\'avoine avec le lait d\'avoine, une pincée de sel et ½ c. à c. de cannelle 5–7 minutes en remuant jusqu\'à consistance crémeuse.'],
      ['Poêler les pommes à la cannelle','Couper les pommes en dés et les cuire dans un peu d\'huile de coco avec la cannelle et un filet de sirop 4–5 minutes jusqu\'à tendreté et coloration. Torréfier les noix de pécan 2–3 minutes, puis les concasser.'],
      ['Dresser et servir','Répartir le porridge dans des bols, garnir des pommes à la cannelle, des noix, des raisins et d\'une belle poignée de fruits rouges frais, puis arroser de sirop d\'érable et de purée d\'amande.']] },
};

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));

const backup=JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const r=backup.find(x=>x.id===ID);
r.ingredients=ingredients; r.base_ingredients=base; r.dressing=dressing; r.steps=enSteps; r.image_prompt=image_prompt;
fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));

const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{const t=tr[l];const ex=i18n[ID][l]||{};
  i18n[ID][l]={title:ex.title||r.title, ingredients:t.names.slice(), base:t.base.slice(),
    dressing:dressing.map((d,k)=>({name:t.dress[k],emoji:d.emoji,amount:d.amount})),
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:null,kidsHelp:null}))};
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));

let fixes={};try{fixes=JSON.parse(fs.readFileSync('recipe_fixes.json','utf8'));}catch(e){}
fixes[ID]={ ingredients, base_ingredients:base, dressing, steps:enSteps, image_prompt };
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));
console.log('Apple Pie Pecan Oat Bowl: + fresh berries, cleaner drizzle, livelier prompt.');
