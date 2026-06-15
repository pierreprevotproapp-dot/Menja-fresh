// Beetroot & Feta Tart — replace store-bought puff pastry with a wholesome
// press-in almond + oat flour crust (butter OK, no puff pastry).
const fs = require('fs');
const ID = 'beetroot-feta-tart';

const ings = [
  ['🌰','Almond flour','120g'],
  ['🌾','Oat flour','80g'],
  ['🧈','Butter','80g'],
  ['🥚','Egg','1 pc'],
  ['🫚','Cooked beetroot','250g'],
  ['🧀','Feta','150g'],
  ['🧅','Red onion','1 pc'],
  ['🌰','Walnuts','40g'],
  ['🥬','Rocket','30g'],
];
const base = ['Olive oil','Balsamic vinegar','Thyme','Honey','Salt & pepper'];
const nutrition = { fat:30, kcal:410, carbs:20, fiber:5, protein:14 };
// steps: [title, text, [ingIdx], tip|null]
const steps = [
  ['Make the crust','Rub together the almond flour, oat flour, a pinch of salt, the cold butter and the egg into a dough. Press evenly into a tart tin and blind-bake at 180°C for 12–15 minutes until set and lightly golden.',[0,1,2,3],'Buckwheat flour works in place of the oat flour for a nuttier, gluten-free crust.'],
  ['Caramelise the onion','Soften the sliced red onion in a little olive oil with a splash of balsamic until soft and jammy.',[6],null],
  ['Top the tart','Spread the onion over the crust, arrange the sliced beetroot, crumble over the feta, scatter thyme and walnuts and drizzle with a little honey.',[4,5,7],'Pat the beetroot dry first so the crust stays crisp.'],
  ['Bake & finish','Bake at 190°C for 18–20 minutes until set and golden, then finish with fresh rocket.',[8],null],
];

const tr = {
  de:{ title:'Rote-Bete-Feta-Tarte', sub:'Saftige Zwiebeln, süße Rote Bete und Feta auf knusprigem Mandel-Hafer-Boden',
    names:['Mandelmehl','Hafermehl','Butter','Ei','Gekochte Rote Bete','Feta','Rote Zwiebel','Walnüsse','Rucola'],
    base:['Olivenöl','Balsamico','Thymian','Honig','Salz & Pfeffer'],
    steps:[['Boden machen','Mandelmehl, Hafermehl, eine Prise Salz, die kalte Butter und das Ei zu einem Teig verkneten. Gleichmäßig in eine Tarteform drücken und bei 180 °C 12–15 Minuten blind backen, bis fest und leicht goldbraun.'],
      ['Zwiebel karamellisieren','Rote Zwiebel in etwas Olivenöl mit einem Schuss Balsamico weich und marmeladig dünsten.'],
      ['Tarte belegen','Zwiebeln auf dem Boden verteilen, Rote-Bete-Scheiben darauf, Feta darüberbröseln, Thymian und Walnüsse aufstreuen und mit etwas Honig beträufeln.'],
      ['Backen & abschließen','Bei 190 °C 18–20 Minuten goldbraun backen, dann mit frischem Rucola abschließen.']] },
  es:{ title:'Tarta de remolacha y feta', sub:'Cebolla melosa, remolacha dulce y feta sobre base crujiente de almendra y avena',
    names:['Harina de almendra','Harina de avena','Mantequilla','Huevo','Remolacha cocida','Feta','Cebolla roja','Nueces','Rúcula'],
    base:['Aceite de oliva','Vinagre balsámico','Tomillo','Miel','Sal y pimienta'],
    steps:[['Haz la base','Mezcla con las manos la harina de almendra, la de avena, una pizca de sal, la mantequilla fría y el huevo hasta formar una masa. Presiónala en un molde de tarta y hornéala en vacío a 180 °C 12–15 minutos hasta que cuaje y dore ligeramente.'],
      ['Carameliza la cebolla','Pocha la cebolla roja en un poco de aceite con un chorro de balsámico hasta que esté blanda y melosa.'],
      ['Cubre la tarta','Reparte la cebolla sobre la base, coloca la remolacha en rodajas, desmenuza el feta, esparce tomillo y nueces y riega con un poco de miel.'],
      ['Hornea y termina','Hornea a 190 °C 18–20 minutos hasta que cuaje y dore, y termina con rúcula fresca.']] },
  fr:{ title:'Tarte betterave & feta', sub:'Oignons confits, betterave sucrée et feta sur une pâte croustillante amande-avoine',
    names:['Poudre d\'amande','Farine d\'avoine','Beurre','Œuf','Betterave cuite','Feta','Oignon rouge','Noix','Roquette'],
    base:['Huile d\'olive','Vinaigre balsamique','Thym','Miel','Sel & poivre'],
    steps:[['Préparer la pâte','Sabler la poudre d\'amande, la farine d\'avoine, une pincée de sel, le beurre froid et l\'œuf en une pâte. Tasser dans un moule à tarte et cuire à blanc à 180 °C 12–15 minutes jusqu\'à ce que ce soit pris et légèrement doré.'],
      ['Caraméliser l\'oignon','Faire fondre l\'oignon rouge émincé dans un peu d\'huile avec un trait de balsamique jusqu\'à ce qu\'il soit fondant et confit.'],
      ['Garnir la tarte','Étaler l\'oignon sur la pâte, disposer la betterave en tranches, émietter la feta, parsemer de thym et de noix et arroser d\'un peu de miel.'],
      ['Cuire et finir','Cuire à 190 °C 18–20 minutes jusqu\'à ce que ce soit pris et doré, puis finir avec de la roquette fraîche.']] },
};

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));

const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const r=nr.find(x=>x.id===ID);
r.subtitle='Jammy onions, sweet beetroot and feta on a crisp almond-oat crust';
r.ingredients=ingredients; r.base_ingredients=base; r.dressing=[]; r.mise_en_place=ingredients.slice(); r.steps=enSteps; r.nutrition=nutrition;
r.image_prompt='Rustic beetroot and feta tart on a wholesome golden almond-oat crust (no puff pastry), caramelised red onion, walnuts, thyme and fresh rocket, one slice cut, bright editorial food photography';
fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));

const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{const t=tr[l];
  i18n[ID][l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:null,kidsHelp:null}))};
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Beetroot tart: puff pastry → almond + oat flour crust.');
