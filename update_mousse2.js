// Chocolate avocado mousse — new formulation for 2, with peanut butter + melted
// 85% dark chocolate + almond milk (per latest user spec).
const fs = require('fs');
const ID = 'chocolate-avocado-mousse';

const ingredients = [
  { emoji:'🥑', name:'Ripe avocado',          amount:'1 pc' },
  { emoji:'🥜', name:'Peanut butter',         amount:'2 tbsp' },
  { emoji:'🍁', name:'Maple syrup',           amount:'45ml' },
  { emoji:'🟤', name:'Brown or coconut sugar',amount:'20g' },
  { emoji:'🍫', name:'Cocoa powder',          amount:'25g' },
  { emoji:'🍫', name:'Dark chocolate (85%)',  amount:'45g' },
  { emoji:'🥛', name:'Almond milk',           amount:'2 tbsp' },
];
const base_ingredients = ['Vanilla extract','Sea salt'];
const dressing = [];
const nutrition = { fat:28, kcal:440, carbs:38, fiber:8, protein:8 };
const servings = 2;
const steps = [
  { num:1, title:'Melt the chocolate', text:'Gently melt the 85% dark chocolate (water bath or short microwave bursts), then let it cool slightly.', ings:['🍫 Dark chocolate · 45g'], tip:null, kidsHelp:null },
  { num:2, title:'Blend smooth', text:'Blend the avocado, peanut butter, maple syrup, sugar, cocoa, almond milk, vanilla and a pinch of salt together with the melted chocolate until completely smooth and glossy.', ings:['🥑 Avocado · 1 pc','🥜 Peanut butter · 2 tbsp','🍁 Maple syrup · 45ml','🍫 Cocoa powder · 25g'], tip:'The melted 85% chocolate + peanut butter give it a deep, fudgy, grown-up richness.', kidsHelp:null },
  { num:3, title:'Chill & serve', text:'Spoon into 2 glasses and chill for at least 2 hours until set and the flavour deepens.', ings:[], tip:null, kidsHelp:null },
];

const i18n = {
  de:{ ingredients:['Reife Avocado','Erdnussbutter','Ahornsirup','Brauner oder Kokoszucker','Kakaopulver','Zartbitterschokolade (85%)','Mandelmilch'], base:['Vanilleextrakt','Meersalz'], dressing:[],
    steps:[
      {title:'Schokolade schmelzen',text:'85%ige Zartbitterschokolade sanft schmelzen (Wasserbad oder kurze Mikrowellen-Intervalle), dann leicht abkühlen lassen.',ings:['🍫 Zartbitterschokolade · 45g'],tip:null,kidsHelp:null},
      {title:'Glatt mixen',text:'Avocado, Erdnussbutter, Ahornsirup, Zucker, Kakao, Mandelmilch, Vanille und eine Prise Salz zusammen mit der geschmolzenen Schokolade vollständig glatt und glänzend mixen.',ings:['🥑 Avocado · 1 St.','🥜 Erdnussbutter · 2 EL','🍁 Ahornsirup · 45ml','🍫 Kakaopulver · 25g'],tip:null,kidsHelp:null},
      {title:'Kühlen & servieren',text:'In 2 Gläser füllen und mindestens 2 Stunden kühlen, bis fest.',ings:[],tip:null,kidsHelp:null} ] },
  es:{ ingredients:['Aguacate maduro','Crema de cacahuete','Sirope de arce','Azúcar moreno o de coco','Cacao en polvo','Chocolate negro (85%)','Leche de almendras'], base:['Extracto de vainilla','Sal marina'], dressing:[],
    steps:[
      {title:'Funde el chocolate',text:'Funde suavemente el chocolate negro 85% (al baño maría o en intervalos cortos en el microondas) y deja enfriar un poco.',ings:['🍫 Chocolate negro · 45g'],tip:null,kidsHelp:null},
      {title:'Tritura fino',text:'Tritura el aguacate, la crema de cacahuete, el sirope, el azúcar, el cacao, la leche de almendras, la vainilla y una pizca de sal junto con el chocolate fundido hasta que quede fino y brillante.',ings:['🥑 Aguacate · 1 ud','🥜 Crema de cacahuete · 2 cdas','🍁 Sirope de arce · 45ml','🍫 Cacao en polvo · 25g'],tip:null,kidsHelp:null},
      {title:'Enfría y sirve',text:'Reparte en 2 vasitos y refrigera al menos 2 horas hasta que cuaje.',ings:[],tip:null,kidsHelp:null} ] },
  fr:{ ingredients:['Avocat mûr','Beurre de cacahuète','Sirop d\'érable','Sucre roux ou de coco','Cacao en poudre','Chocolat noir (85%)','Lait d\'amande'], base:['Extrait de vanille','Sel marin'], dressing:[],
    steps:[
      {title:'Faire fondre le chocolat',text:'Faire fondre doucement le chocolat noir 85% (bain-marie ou courtes impulsions au micro-ondes), puis laisser tiédir.',ings:['🍫 Chocolat noir · 45g'],tip:null,kidsHelp:null},
      {title:'Mixer onctueux',text:'Mixer l\'avocat, le beurre de cacahuète, le sirop d\'érable, le sucre, le cacao, le lait d\'amande, la vanille et une pincée de sel avec le chocolat fondu jusqu\'à une texture lisse et brillante.',ings:['🥑 Avocat · 1 pc','🥜 Beurre de cacahuète · 2 c. à s.','🍁 Sirop d\'érable · 45ml','🍫 Cacao en poudre · 25g'],tip:null,kidsHelp:null},
      {title:'Réfrigérer et servir',text:'Répartir dans 2 verrines et réfrigérer au moins 2 heures jusqu\'à prise.',ings:[],tip:null,kidsHelp:null} ] },
};

const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const r = backup.find(x=>x.id===ID);
r.ingredients=ingredients; r.base_ingredients=base_ingredients; r.dressing=dressing; r.steps=steps; r.nutrition=nutrition; r.servings=servings;
fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));

const tr = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const ex = tr[ID]||{};
['de','es','fr'].forEach(l=>{ ex[l]=Object.assign({},ex[l],{title:(ex[l]&&ex[l].title)||'',...i18n[l]}); });
// keep existing titles
ex.de.title=ex.de.title||'Schoko-Avocado-Mousse'; ex.es.title=ex.es.title||'Mousse de chocolate y aguacate'; ex.fr.title=ex.fr.title||'Mousse chocolat-avocat';
tr[ID]=ex;
fs.writeFileSync('recipes_i18n.json', JSON.stringify(tr,null,2));

let fixes={}; try{fixes=JSON.parse(fs.readFileSync('recipe_fixes.json','utf8'));}catch(e){}
fixes[ID]={ ingredients, base_ingredients, dressing, steps, nutrition, servings };
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));
console.log('Updated mousse: 2 servings, peanut butter + 85% dark chocolate + almond milk.');
