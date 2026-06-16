// (A) Tiramisu: back to the TRADITIONAL raw-egg method (essentials kept), just
//     a touch lighter via whipped whites + a little Greek yogurt.
// (B) Orange energy balls: remove oats (Little Green Kitchen style = dates, nuts,
//     coconut, citrus — no oats).
const fs = require('fs');
const nr = JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();

// ───────── (A) TIRAMISU — traditional, raw eggs, lightened ─────────
{
const ID='tiramisu-lighter';
const ings=[['🧀','Mascarpone','350g'],['🥛','Greek yogurt','150g'],['🥚','Eggs','3 pcs'],['🥄','Sugar','70g'],['🍪','Ladyfingers','200g'],['☕','Strong coffee','300ml'],['🍫','Cocoa powder','2 tbsp']];
const base=['Vanilla extract'];
const steps=[
  ['Make the cream','Separate the eggs. Beat the yolks with the sugar until pale and creamy, then fold in the mascarpone and Greek yogurt. Whisk the egg whites to soft peaks and gently fold them through for a light, airy cream.',[2,3,0,1],'Classic raw-egg method — whipped whites and a little Greek yogurt keep it lighter without losing the mascarpone richness.'],
  ['Soak the biscuits','Dip the ladyfingers briefly in the cooled coffee — quick, so they don\'t go soggy.',[4,5],null],
  ['Layer','Layer the soaked biscuits and cream, repeat, and finish with a smooth layer of cream.',[],null],
  ['Chill & dust','Chill for at least 4 hours, then dust generously with cocoa just before serving.',[6],null],
];
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,ix,tip],i)=>({num:i+1,title:t,text:txt,ings:ix.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
const r=nr.find(x=>x.id===ID);
r.subtitle='The traditional Italian tiramisu — raw-egg method, just a touch lighter';
r.ingredients=ingredients; r.base_ingredients=base; r.mise_en_place=ingredients.slice(); r.steps=enSteps;
const tr={de:{names:['Mascarpone','Griechischer Joghurt','Eier','Zucker','Löffelbiskuits','Starker Kaffee','Kakaopulver'],base:['Vanilleextrakt'],
    steps:[['Creme machen','Eier trennen. Eigelb mit dem Zucker hell und cremig aufschlagen, dann Mascarpone und griechischen Joghurt unterheben. Eiweiß zu weichen Spitzen schlagen und vorsichtig unterheben — für eine leichte, luftige Creme.','Klassische Methode mit rohen Eiern — Eischnee und etwas Joghurt machen es leichter, ohne die Mascarpone-Fülle zu verlieren.'],['Biskuits tränken','Löffelbiskuits kurz in den abgekühlten Kaffee tauchen — zügig, damit sie nicht durchweichen.',null],['Schichten','Getränkte Biskuits und Creme schichten, wiederholen und mit einer glatten Cremeschicht abschließen.',null],['Kühlen & bestäuben','Mindestens 4 Stunden kühlen, dann kurz vor dem Servieren großzügig mit Kakao bestäuben.',null]]},
  es:{names:['Mascarpone','Yogur griego','Huevos','Azúcar','Bizcochos de soletilla','Café fuerte','Cacao en polvo'],base:['Extracto de vainilla'],
    steps:[['Haz la crema','Separa los huevos. Bate las yemas con el azúcar hasta que blanqueen, luego incorpora el mascarpone y el yogur griego. Monta las claras a punto suave e incorpóralas con suavidad — para una crema ligera y aireada.','Método clásico con huevo crudo — las claras montadas y un poco de yogur la aligeran sin perder la untuosidad del mascarpone.'],['Empapa los bizcochos','Moja los bizcochos un momento en el café frío — rápido, para que no se deshagan.',null],['Monta capas','Alterna bizcochos empapados y crema, repite y termina con una capa lisa de crema.',null],['Enfría y espolvorea','Refrigera al menos 4 horas y espolvorea generosamente con cacao justo antes de servir.',null]]},
  fr:{names:['Mascarpone','Yaourt grec','Œufs','Sucre','Biscuits à la cuillère','Café fort','Cacao en poudre'],base:['Extrait de vanille'],
    steps:[['Préparer la crème','Séparer les œufs. Battre les jaunes avec le sucre jusqu\'à blanchiment, puis incorporer le mascarpone et le yaourt grec. Monter les blancs en neige souple et les incorporer délicatement — pour une crème légère et aérienne.','Méthode classique aux œufs crus — les blancs montés et un peu de yaourt l\'allègent sans perdre l\'onctuosité du mascarpone.'],['Imbiber les biscuits','Tremper rapidement les biscuits dans le café refroidi — vite, pour qu\'ils ne se détrempent pas.',null],['Monter','Alterner biscuits imbibés et crème, répéter et finir par une couche lisse de crème.',null],['Réfrigérer et saupoudrer','Réfrigérer au moins 4 heures, puis saupoudrer généreusement de cacao juste avant de servir.',null]]}};
['de','es','fr'].forEach(l=>{const t=tr[l];i18n[ID][l]={title:i18n[ID][l].title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
  steps:steps.map(([,,ix],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:ix.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:t.steps[i][2]||null,kidsHelp:null}))};});
}

// ───────── (B) ENERGY BALLS — no oats (Little Green Kitchen style) ─────────
{
const ID='orange-energy-balls';
const ings=[['🌴','Medjool dates','200g'],['🌰','Almonds','120g'],['🥥','Desiccated coconut','50g'],['🍊','Orange','1 pc']];
const base=['Vanilla extract','Pinch of salt'];
const steps=[
  ['Blitz the almonds','Pulse the almonds in a food processor to a coarse meal.',[1],null],
  ['Add dates & orange','Add the pitted dates, the zest and juice of the orange, vanilla and a pinch of salt, and blitz to a sticky dough.',[0,3],'Add the orange juice a splash at a time — just enough to bind, so they\'re not too wet.'],
  ['Roll & chill','Roll into balls, then roll in the desiccated coconut. Chill for 30 minutes to firm up.',[2],null],
];
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,ix,tip],i)=>({num:i+1,title:t,text:txt,ings:ix.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
const r=nr.find(x=>x.id===ID);
r.subtitle='No-bake bites of dates, almonds & orange — no oats, just like Little Green Kitchen';
r.ingredients=ingredients; r.base_ingredients=base; r.mise_en_place=ingredients.slice(); r.steps=enSteps;
r.nutrition={fat:11,kcal:185,carbs:22,fiber:4,protein:5};
const tr={de:{names:['Medjool-Datteln','Mandeln','Kokosraspeln','Orange'],base:['Vanilleextrakt','Eine Prise Salz'],
    steps:[['Mandeln mahlen','Mandeln im Mixer grob mahlen.'],['Datteln & Orange zugeben','Entsteinte Datteln, Abrieb und Saft der Orange, Vanille und eine Prise Salz zugeben und zu einem klebrigen Teig mixen.'],['Rollen & kühlen','Zu Kugeln rollen, in Kokosraspeln wälzen und 30 Minuten kühlen.']]},
  es:{names:['Dátiles Medjool','Almendras','Coco rallado','Naranja'],base:['Extracto de vainilla','Una pizca de sal'],
    steps:[['Tritura las almendras','Tritura las almendras en la picadora hasta una textura gruesa.'],['Añade dátiles y naranja','Añade los dátiles sin hueso, la ralladura y el zumo de la naranja, la vainilla y una pizca de sal, y tritura hasta una masa pegajosa.'],['Forma y enfría','Forma bolitas, rebózalas en coco rallado y refrigera 30 minutos.']]},
  fr:{names:['Dattes Medjool','Amandes','Noix de coco râpée','Orange'],base:['Extrait de vanille','Une pincée de sel'],
    steps:[['Mixer les amandes','Mixer les amandes en poudre grossière.'],['Ajouter dattes et orange','Ajouter les dattes dénoyautées, le zeste et le jus de l\'orange, la vanille et une pincée de sel, et mixer en une pâte collante.'],['Rouler et réfrigérer','Façonner des billes, les rouler dans la noix de coco râpée et réfrigérer 30 minutes.']]}};
const tips={de:'Den Orangensaft schluckweise zugeben — nur so viel, dass es bindet.',es:'Añade el zumo poco a poco — lo justo para que ligue.',fr:'Ajouter le jus petit à petit — juste assez pour lier.'};
['de','es','fr'].forEach(l=>{const t=tr[l];i18n[ID][l]={title:i18n[ID][l].title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
  steps:steps.map(([,,ix],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:ix.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:(i===1?tips[l]:null),kidsHelp:null}))};});
}

fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Tiramisu → traditional raw-egg (lightened). Energy balls → no oats (LGK style).');
