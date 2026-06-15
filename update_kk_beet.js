// (1) Beetroot tart: more feta + more herbs + rocket, side-angle photo prompt.
// (2) Replace lightened cheesecake with a classic GERMAN Käsekuchen (Quark).
const fs = require('fs');
const nr = JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();

// ───────────────────────── (1) BEETROOT TART ─────────────────────────
const B = nr.find(x=>x.id==='beetroot-feta-tart');
// more feta
const fi = B.ingredients.findIndex(i=>/feta/i.test(i.name)); if(fi>=0) B.ingredients[fi].amount='200g';
// add rocket back (alongside dill)
if(!B.ingredients.some(i=>/rocket/i.test(i.name))) B.ingredients.push({emoji:'🥬',name:'Rocket',amount:'30g'});
const di=B.ingredients.findIndex(i=>/fresh dill/i.test(i.name));
const ri=B.ingredients.findIndex(i=>/rocket/i.test(i.name));
B.mise_en_place=B.ingredients.slice();
// step "Top the tart" → plenty of feta
B.steps[2].text='Spread the onion over the crust, arrange the sliced beetroot, crumble over plenty of feta, scatter thyme and walnuts and drizzle with a little honey.';
// step "Bake & finish" → dill + rocket
B.steps[3].text='Bake at 190°C for 18–20 minutes until set and golden, then finish with plenty of fresh dill and a handful of rocket.';
B.steps[3].ings=[chip('🌿','Fresh dill','10g'),chip('🥬','Rocket','30g')];
B.image_prompt='A rustic round beetroot and feta tart on a pale grey ceramic plate, golden crimped crust, overlapping slices of deep crimson beetroot generously topped with lots of crumbled white feta, toasted walnuts, plenty of fresh dill and a handful of peppery rocket, one wedge cut and pulled slightly aside, photographed from a low three-quarter side angle (about 30 degrees) so the height and crust show, soft natural daylight, realistic editorial food photography, homemade, not over-stylised';
['de','es','fr'].forEach(l=>{const e=i18n['beetroot-feta-tart'][l];if(!e)return;
  // add rocket name at same index
  const rname={de:'Rucola',es:'Rúcula',fr:'Roquette'}[l];
  if(e.ingredients.length<B.ingredients.length) e.ingredients.push(rname); else e.ingredients[ri]=rname;
  // step3 text (plenty of feta)
  e.steps[2].text={de:'Zwiebeln auf dem Boden verteilen, Rote-Bete-Scheiben darauf, reichlich Feta darüberbröseln, Thymian und Walnüsse aufstreuen und mit etwas Honig beträufeln.',
    es:'Reparte la cebolla sobre la base, coloca la remolacha en rodajas, desmenuza bastante feta, esparce tomillo y nueces y riega con un poco de miel.',
    fr:'Étaler l\'oignon sur la pâte, disposer la betterave en tranches, émietter généreusement de la feta, parsemer de thym et de noix et arroser d\'un peu de miel.'}[l];
  // step4 text + chips (dill + rocket)
  e.steps[3].text={de:'Bei 190 °C 18–20 Minuten goldbraun backen, dann mit reichlich frischem Dill und einer Handvoll Rucola abschließen.',
    es:'Hornea a 190 °C 18–20 minutos hasta que cuaje y dore, y termina con abundante eneldo fresco y un puñado de rúcula.',
    fr:'Cuire à 190 °C 18–20 minutes jusqu\'à ce que ce soit pris et doré, puis finir avec beaucoup d\'aneth frais et une poignée de roquette.'}[l];
  const dl={de:'🌿 Dill · 10g',es:'🌿 Eneldo · 10g',fr:'🌿 Aneth · 10g'}[l];
  const rl={de:'🥬 Rucola · 30g',es:'🥬 Rúcula · 30g',fr:'🥬 Roquette · 30g'}[l];
  e.steps[3].ings=[dl,rl];
});

// ───────────────────────── (2) GERMAN KÄSEKUCHEN ─────────────────────────
const ID='baked-cheesecake-lighter';
const ings=[
  ['🌾','Plain flour','200g'],
  ['🧈','Butter','150g'],
  ['🥄','Sugar','180g'],
  ['🥚','Eggs','4 pcs'],
  ['🥛','Quark','500g'],
  ['🍮','Vanilla custard powder','40g'],
];
const base=['Vanilla extract','Lemon zest','Baking powder','Pinch of salt'];
const steps=[
  ['Make the shortcrust','Rub the flour with 100g of the butter, 60g of the sugar and 1 egg into a dough. Chill 20 minutes, then press into the base and up the sides of a lined springform tin.',[0,1],null],
  ['Quark filling','Beat the quark with the remaining sugar, the other 3 eggs, the rest of the butter (melted), the custard powder, vanilla and lemon zest until smooth.',[4,2,3,5],'Quark is the key to a real German Käsekuchen — lighter and tangier than cream cheese.'],
  ['Bake','Pour the filling onto the base and bake at 170°C for about 60 minutes until set and golden (cover loosely if it browns too fast).',[],null],
  ['Cool slowly','Turn off the oven and let the cake cool inside with the door ajar to stop it cracking, then chill before slicing.',[],null],
];
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
const C=nr.find(x=>x.id===ID);
C.title='German Käsekuchen (Quark)'; C.subtitle='The classic German baked cheesecake — made with quark, on a shortcrust base';
C.ingredients=ingredients; C.base_ingredients=base; C.dressing=[]; C.mise_en_place=ingredients.slice(); C.steps=enSteps;
C.nutrition={fat:18,kcal:360,carbs:38,fiber:1,protein:12}; C.servings=12; C.prep_minutes=30; C.cook_minutes=60;
C.image_prompt='Classic German Käsekuchen (quark cheesecake) in a springform tin with a golden shortcrust edge and a tall, pale, lightly browned set filling, one slice cut to reveal the creamy interior, on a plate with a cake fork, soft natural daylight, realistic homemade food photography, not over-stylised';
const tr={
  de:{title:'Deutscher Käsekuchen',names:['Weizenmehl','Butter','Zucker','Eier','Quark','Vanillepuddingpulver'],base:['Vanilleextrakt','Zitronenabrieb','Backpulver','Eine Prise Salz'],
    steps:[['Mürbeteig machen','Mehl mit 100 g der Butter, 60 g Zucker und 1 Ei zu einem Teig verkneten. 20 Minuten kühlen, dann als Boden und Rand in eine ausgelegte Springform drücken.'],
      ['Quarkmasse','Quark mit dem restlichen Zucker, den 3 übrigen Eiern, der restlichen geschmolzenen Butter, dem Puddingpulver, Vanille und Zitronenabrieb glatt rühren.'],
      ['Backen','Die Masse auf den Boden gießen und bei 170 °C ca. 60 Minuten backen, bis fest und goldbraun (bei Bedarf locker abdecken).'],
      ['Langsam abkühlen','Ofen ausschalten und den Kuchen bei leicht geöffneter Tür darin abkühlen lassen (verhindert Risse), dann vor dem Schneiden kühlen.']]},
  es:{title:'Tarta de queso alemana (quark)',names:['Harina de trigo','Mantequilla','Azúcar','Huevos','Quark','Preparado de natillas de vainilla'],base:['Extracto de vainilla','Ralladura de limón','Levadura química','Una pizca de sal'],
    steps:[['Haz la masa quebrada','Amasa la harina con 100 g de mantequilla, 60 g de azúcar y 1 huevo. Refrigera 20 minutos y presiona como base y borde en un molde desmontable forrado.'],
      ['Relleno de quark','Bate el quark con el resto del azúcar, los 3 huevos restantes, el resto de la mantequilla fundida, el preparado de natillas, la vainilla y la ralladura de limón hasta que quede liso.'],
      ['Hornea','Vierte el relleno sobre la base y hornea a 170 °C unos 60 minutos hasta que cuaje y dore (cubre sin apretar si se dora demasiado).'],
      ['Enfría despacio','Apaga el horno y deja enfriar el pastel dentro con la puerta entreabierta (evita grietas), luego refrigera antes de cortar.']]},
  fr:{title:'Käsekuchen allemand (au quark)',names:['Farine de blé','Beurre','Sucre','Œufs','Quark','Préparation pour flan vanille'],base:['Extrait de vanille','Zeste de citron','Levure chimique','Une pincée de sel'],
    steps:[['Préparer la pâte sablée','Pétrir la farine avec 100 g de beurre, 60 g de sucre et 1 œuf. Réfrigérer 20 minutes, puis tasser en fond et bords d\'un moule à charnière chemisé.'],
      ['Appareil au quark','Battre le quark avec le reste du sucre, les 3 œufs restants, le reste du beurre fondu, la préparation pour flan, la vanille et le zeste de citron jusqu\'à consistance lisse.'],
      ['Cuire','Verser l\'appareil sur la base et cuire à 170 °C environ 60 minutes jusqu\'à ce que ce soit pris et doré (couvrir sans serrer si ça dore trop).'],
      ['Refroidir lentement','Éteindre le four et laisser refroidir le gâteau à l\'intérieur porte entrouverte (évite les fissures), puis réfrigérer avant de trancher.']]},
};
['de','es','fr'].forEach(l=>{const t=tr[l];
  i18n[ID][l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:null,kidsHelp:null}))};
});

fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Beetroot tart: +feta/+herbs/+rocket, side-angle prompt. Cheesecake → German Käsekuchen (Quark).');
