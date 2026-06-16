// (A) Tiramisu: cook the egg yolks over a bain-marie (no raw eggs).
// (B) Replace Crème Brûlée with a traditional Mousse au Chocolat.
const fs = require('fs');
const nr = JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();

// ───────── (A) Tiramisu — cooked yolks (zabaglione) ─────────
const T = nr.find(x=>x.id==='tiramisu-lighter');
// step 1 ings were [eggs,sugar,mascarpone,greek yogurt] = idx 2,3,0,1
const s1ings = ['🥚 Eggs · 3 pcs','🥄 Sugar · 70g','🧀 Mascarpone · 250g','🥛 Greek yogurt · 250g'];
T.steps[0]={num:1,title:'Cook the egg yolks (zabaglione)',
  text:'Whisk the egg yolks with the sugar in a heatproof bowl set over a pan of simmering water for 4–5 minutes until thick, pale and hot — this gently cooks the eggs. Take off the heat, let cool, then fold in the mascarpone and Greek yogurt.',
  ings:s1ings,tip:'No raw eggs — the yolks are gently cooked over a bain-marie.',kidsHelp:null};
const tT={de:{title:'Eigelb garen (Zabaglione)',text:'Eigelb mit dem Zucker in einer hitzebeständigen Schüssel über einem Topf mit siedendem Wasser 4–5 Minuten dick, hell und heiß aufschlagen — so garen die Eier sanft. Vom Herd nehmen, abkühlen, dann Mascarpone und griechischen Joghurt unterheben.',tip:'Keine rohen Eier — das Eigelb wird über dem Wasserbad gegart.',ings:['🥚 Eier · 3 St.','🥄 Zucker · 70g','🧀 Mascarpone · 250g','🥛 Griechischer Joghurt · 250g']},
  es:{title:'Cocina las yemas (sabayón)',text:'Bate las yemas con el azúcar en un bol resistente al calor sobre una olla con agua hirviendo a fuego suave 4–5 minutos hasta que estén espesas, pálidas y calientes — así se cuajan los huevos. Retira del calor, enfría e incorpora el mascarpone y el yogur griego.',tip:'Sin huevo crudo — las yemas se cuecen al baño maría.',ings:['🥚 Huevos · 3 ud','🥄 Azúcar · 70g','🧀 Mascarpone · 250g','🥛 Yogur griego · 250g']},
  fr:{title:'Cuire les jaunes (sabayon)',text:'Fouetter les jaunes avec le sucre dans un bol résistant à la chaleur au-dessus d\'une casserole d\'eau frémissante 4–5 minutes jusqu\'à ce qu\'ils soient épais, pâles et chauds — cela cuit doucement les œufs. Retirer du feu, laisser refroidir, puis incorporer le mascarpone et le yaourt grec.',tip:'Pas d\'œufs crus — les jaunes sont cuits au bain-marie.',ings:['🥚 Œufs · 3 pc','🥄 Sucre · 70g','🧀 Mascarpone · 250g','🥛 Yaourt grec · 250g']}};
['de','es','fr'].forEach(l=>{const st=i18n['tiramisu-lighter'][l].steps[0];st.title=tT[l].title;st.text=tT[l].text;st.tip=tT[l].tip;st.ings=tT[l].ings;});

// ───────── (B) remove Crème Brûlée, add Mousse au Chocolat ─────────
const idx=nr.findIndex(x=>x.id==='creme-brulee'); if(idx>=0)nr.splice(idx,1); delete i18n['creme-brulee'];

const M_ID='mousse-au-chocolat';
const ings=[['🍫','Dark chocolate','200g'],['🥚','Eggs','4 pcs'],['🥄','Sugar','40g'],['🧈','Butter','30g']];
const base=['Vanilla extract','Pinch of salt'];
const steps=[
  ['Melt the chocolate','Melt the dark chocolate with the butter until smooth, then let it cool slightly.',[0,3],null],
  ['Add the yolks','Separate the eggs and stir the yolks into the melted chocolate with the vanilla.',[1],null],
  ['Whip the whites','Whisk the egg whites with a pinch of salt to soft peaks, add the sugar and whisk to a glossy meringue.',[2],null],
  ['Fold & chill','Gently fold the whites into the chocolate in three batches, spoon into glasses and chill for at least 3 hours.',[],'Fold gently to keep the air — that\'s what makes a classic mousse light.'],
];
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,ix,tip],i)=>({num:i+1,title:t,text:txt,ings:ix.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
nr.push({id:M_ID,title:'Mousse au Chocolat',subtitle:'The traditional French chocolate mousse — light, airy and intensely chocolatey',
  emoji:'🍫',is_kids:false,tags:['Vegetarian','Gluten-free'],meal:['Dessert'],categories:['Süßspeise'],diet:['Vegetarian','Gluten-free'],
  prep_minutes:20,cook_minutes:0,servings:4,image_url:'',
  image_prompt:'Classic French chocolate mousse (mousse au chocolat) in a small glass, dark, airy and glossy, a spoonful lifted, a few chocolate shavings on top, soft natural light, realistic homemade food photography, not over-stylised',
  nutrition:{fat:22,kcal:320,carbs:24,fiber:3,protein:7},ingredients,base_ingredients:base,dressing:[],mise_en_place:ingredients.slice(),steps:enSteps});
const mtr={de:{title:'Mousse au Chocolat',names:['Zartbitterschokolade','Eier','Zucker','Butter'],base:['Vanilleextrakt','Eine Prise Salz'],
  steps:[['Schokolade schmelzen','Zartbitterschokolade mit der Butter glatt schmelzen, dann leicht abkühlen lassen.'],['Eigelb zugeben','Eier trennen und die Eigelbe mit der Vanille unter die geschmolzene Schokolade rühren.'],['Eiweiß schlagen','Eiweiß mit einer Prise Salz zu weichen Spitzen schlagen, Zucker zugeben und zu glänzendem Eischnee schlagen.'],['Unterheben & kühlen','Eischnee in drei Portionen vorsichtig unter die Schokolade heben, in Gläser füllen und mindestens 3 Stunden kühlen.']]},
  es:{title:'Mousse de chocolate',names:['Chocolate negro','Huevos','Azúcar','Mantequilla'],base:['Extracto de vainilla','Una pizca de sal'],
  steps:[['Funde el chocolate','Funde el chocolate negro con la mantequilla hasta que quede liso y deja enfriar un poco.'],['Añade las yemas','Separa los huevos e incorpora las yemas con la vainilla al chocolate fundido.'],['Monta las claras','Monta las claras con una pizca de sal a punto suave, añade el azúcar y bate hasta un merengue brillante.'],['Incorpora y enfría','Incorpora las claras al chocolate en tres veces con suavidad, reparte en vasitos y refrigera al menos 3 horas.']]},
  fr:{title:'Mousse au chocolat',names:['Chocolat noir','Œufs','Sucre','Beurre'],base:['Extrait de vanille','Une pincée de sel'],
  steps:[['Faire fondre le chocolat','Faire fondre le chocolat noir avec le beurre jusqu\'à lisse, puis laisser tiédir.'],['Ajouter les jaunes','Séparer les œufs et incorporer les jaunes avec la vanille au chocolat fondu.'],['Monter les blancs','Monter les blancs avec une pincée de sel en neige souple, ajouter le sucre et fouetter en meringue brillante.'],['Incorporer et réfrigérer','Incorporer délicatement les blancs au chocolat en trois fois, répartir dans des verrines et réfrigérer au moins 3 heures.']]}};
i18n[M_ID]={};['de','es','fr'].forEach(l=>{const t=mtr[l];
  i18n[M_ID][l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
    steps:steps.map(([,,ix],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:ix.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:null,kidsHelp:null}))};
});

fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Tiramisu: eggs cooked (zabaglione). Crème Brûlée removed → Mousse au Chocolat added.');
