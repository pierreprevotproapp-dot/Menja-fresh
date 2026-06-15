// Baked Vanilla Cheesecake — remake from scratch (no shop-bought digestive
// biscuits): a homemade toasted-oat base + Greek-yogurt-lightened filling.
// Uses the new emojis: sugar 🥄, cream cheese 🫙.
const fs = require('fs');
const ID = 'baked-cheesecake-lighter';

const ings = [
  ['🌾','Rolled oats','120g'],
  ['🧈','Butter','80g'],
  ['🥄','Sugar','140g'],
  ['🫙','Cream cheese','400g'],
  ['🥛','Greek yogurt','200g'],
  ['🥚','Eggs','3 pcs'],
];
const base = ['Vanilla extract','Lemon zest','Pinch of salt'];
const nutrition = { fat:18, kcal:340, carbs:30, fiber:2, protein:9 };
const steps = [
  ['Make the base from scratch','Blitz the oats to a coarse meal, mix with the melted butter and a third of the sugar, then press firmly into a lined tin and bake at 170°C for 10 minutes until lightly golden.',[0,1],'A toasted oat base stays crisp under the filling — no shop-bought biscuits needed.'],
  ['Make the filling','Beat the cream cheese with the rest of the sugar until smooth, then beat in the eggs one at a time, the Greek yogurt, vanilla and lemon zest.',[3,2,5,4],null],
  ['Bake low & slow','Pour over the base and bake at 160°C for about 50 minutes until just set with a slight wobble in the centre.',[],null],
  ['Cool & chill','Cool in the switched-off oven with the door ajar, then chill several hours before slicing.',[],null],
];

const tr = {
  de:{ title:'Gebackener Vanille-Käsekuchen', sub:'Cremig und reichhaltig, mit griechischem Joghurt leichter — Boden selbst gemacht',
    names:['Haferflocken','Butter','Zucker','Frischkäse','Griechischer Joghurt','Eier'], base:['Vanilleextrakt','Zitronenabrieb','Eine Prise Salz'],
    steps:[['Boden selbst machen','Haferflocken grob mahlen, mit der geschmolzenen Butter und einem Drittel des Zuckers mischen, fest in eine ausgelegte Form drücken und bei 170 °C 10 Minuten leicht goldbraun backen.'],
      ['Füllung machen','Frischkäse mit dem restlichen Zucker glatt rühren, dann die Eier einzeln, den griechischen Joghurt, Vanille und Zitronenabrieb unterrühren.'],
      ['Niedrig backen','Über den Boden gießen und bei 160 °C etwa 50 Minuten backen, bis die Mitte gerade fest ist und leicht wackelt.'],
      ['Kühlen','Im ausgeschalteten Ofen mit leicht geöffneter Tür abkühlen, dann mehrere Stunden kühlen.']] },
  es:{ title:'Tarta de queso al horno con vainilla', sub:'Cremosa y rica, más ligera con yogur griego — base hecha desde cero',
    names:['Copos de avena','Mantequilla','Azúcar','Queso crema','Yogur griego','Huevos'], base:['Extracto de vainilla','Ralladura de limón','Una pizca de sal'],
    steps:[['Haz la base desde cero','Tritura la avena hasta una textura gruesa, mézclala con la mantequilla fundida y un tercio del azúcar, presiónala en un molde forrado y hornea a 170 °C 10 minutos hasta que dore ligeramente.'],
      ['Haz el relleno','Bate el queso crema con el resto del azúcar, luego incorpora los huevos uno a uno, el yogur griego, la vainilla y la ralladura de limón.'],
      ['Hornea suave','Vierte sobre la base y hornea a 160 °C unos 50 minutos hasta que el centro esté casi cuajado y tiemble un poco.'],
      ['Enfría','Deja enfriar en el horno apagado con la puerta entreabierta y refrigera varias horas antes de cortar.']] },
  fr:{ title:'Cheesecake vanille au four', sub:'Crémeux et riche, allégé au yaourt grec — base maison',
    names:['Flocons d\'avoine','Beurre','Sucre','Fromage frais','Yaourt grec','Œufs'], base:['Extrait de vanille','Zeste de citron','Une pincée de sel'],
    steps:[['Faire la base maison','Mixer les flocons d\'avoine en poudre grossière, mélanger au beurre fondu et à un tiers du sucre, tasser dans un moule chemisé et cuire à 170 °C 10 minutes jusqu\'à légèrement doré.'],
      ['Préparer l\'appareil','Battre le fromage frais avec le reste du sucre, puis incorporer les œufs un à un, le yaourt grec, la vanille et le zeste de citron.'],
      ['Cuire doucement','Verser sur la base et cuire à 160 °C environ 50 minutes jusqu\'à ce que le centre soit juste pris et tremble légèrement.'],
      ['Refroidir','Laisser refroidir dans le four éteint porte entrouverte, puis réfrigérer plusieurs heures avant de trancher.']] },
};

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));

const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const r=nr.find(x=>x.id===ID);
r.subtitle='Creamy and rich, lightened with Greek yogurt — base made from scratch';
r.ingredients=ingredients; r.base_ingredients=base; r.dressing=[]; r.mise_en_place=ingredients.slice(); r.steps=enSteps; r.nutrition=nutrition;
r.image_prompt='Slice of baked vanilla cheesecake on a homemade toasted-oat base, smooth creamy top, served on a plate with a few berries, soft natural light';
fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));

const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{const t=tr[l];
  i18n[ID][l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:null,kidsHelp:null}))};
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Cheesecake: from-scratch oat base, new emojis (🥄 sugar, 🫙 cream cheese).');
