// Chocolate avocado mousse — add raspberries + honey-caramelised pistachios.
// Honey => no longer vegan: switch diet to Vegetarian (+ Gluten-free).
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
  { emoji:'🍓', name:'Fresh raspberries',     amount:'60g' },
  { emoji:'🌰', name:'Pistachios',            amount:'20g' },
];
const base_ingredients = ['Vanilla extract','Sea salt','Honey'];
const dressing = [];
const nutrition = { fat:32, kcal:520, carbs:46, fiber:9, protein:9 };
const servings = 2;
const diet = ['Vegetarian','Gluten-free'];
const tags = ['Vegetarian','Gluten-free'];
const steps = [
  { num:1, title:'Melt the chocolate', text:'Gently melt the 85% dark chocolate (water bath or short microwave bursts), then let it cool slightly.', ings:['🍫 Dark chocolate · 45g'], tip:null, kidsHelp:null },
  { num:2, title:'Blend smooth', text:'Blend the avocado, peanut butter, maple syrup, sugar, cocoa, almond milk, vanilla and a pinch of salt with the melted chocolate until completely smooth and glossy.', ings:['🥑 Avocado · 1 pc','🥜 Peanut butter · 2 tbsp','🍁 Maple syrup · 45ml','🍫 Cocoa powder · 25g'], tip:'The 85% chocolate + peanut butter give it a deep, fudgy richness.', kidsHelp:null },
  { num:3, title:'Caramelise the pistachios', text:'In a small dry pan, toast the pistachios with the honey over medium heat for 1–2 minutes until glossy and caramelised, then tip onto baking paper to cool and harden.', ings:['🌰 Pistachios · 20g'], tip:null, kidsHelp:null },
  { num:4, title:'Chill, top & serve', text:'Spoon the mousse into 2 glasses and chill for at least 2 hours. Just before serving, top with the raspberries and the caramelised pistachios.', ings:['🍓 Raspberries · 60g'], tip:null, kidsHelp:null },
];

const i18n = {
  de:{ title:'Schoko-Avocado-Mousse', ingredients:['Reife Avocado','Erdnussbutter','Ahornsirup','Brauner oder Kokoszucker','Kakaopulver','Zartbitterschokolade (85%)','Mandelmilch','Frische Himbeeren','Pistazien'], base:['Vanilleextrakt','Meersalz','Honig'], dressing:[],
    steps:[
      {title:'Schokolade schmelzen',text:'85%ige Zartbitterschokolade sanft schmelzen (Wasserbad oder kurze Mikrowellen-Intervalle), dann leicht abkühlen lassen.',ings:['🍫 Zartbitterschokolade · 45g'],tip:null,kidsHelp:null},
      {title:'Glatt mixen',text:'Avocado, Erdnussbutter, Ahornsirup, Zucker, Kakao, Mandelmilch, Vanille und eine Prise Salz mit der geschmolzenen Schokolade vollständig glatt und glänzend mixen.',ings:['🥑 Avocado · 1 St.','🥜 Erdnussbutter · 2 EL','🍁 Ahornsirup · 45ml','🍫 Kakaopulver · 25g'],tip:null,kidsHelp:null},
      {title:'Pistazien karamellisieren',text:'Pistazien in einer kleinen trockenen Pfanne mit dem Honig bei mittlerer Hitze 1–2 Minuten rösten, bis glänzend und karamellisiert, dann auf Backpapier auskühlen lassen.',ings:['🌰 Pistazien · 20g'],tip:null,kidsHelp:null},
      {title:'Kühlen, toppen & servieren',text:'Mousse in 2 Gläser füllen und mindestens 2 Stunden kühlen. Kurz vor dem Servieren mit Himbeeren und den karamellisierten Pistazien toppen.',ings:['🍓 Himbeeren · 60g'],tip:null,kidsHelp:null} ] },
  es:{ title:'Mousse de chocolate y aguacate', ingredients:['Aguacate maduro','Crema de cacahuete','Sirope de arce','Azúcar moreno o de coco','Cacao en polvo','Chocolate negro (85%)','Leche de almendras','Frambuesas frescas','Pistachos'], base:['Extracto de vainilla','Sal marina','Miel'], dressing:[],
    steps:[
      {title:'Funde el chocolate',text:'Funde suavemente el chocolate negro 85% (al baño maría o en intervalos cortos en el microondas) y deja enfriar un poco.',ings:['🍫 Chocolate negro · 45g'],tip:null,kidsHelp:null},
      {title:'Tritura fino',text:'Tritura el aguacate, la crema de cacahuete, el sirope, el azúcar, el cacao, la leche de almendras, la vainilla y una pizca de sal con el chocolate fundido hasta que quede fino y brillante.',ings:['🥑 Aguacate · 1 ud','🥜 Crema de cacahuete · 2 cdas','🍁 Sirope de arce · 45ml','🍫 Cacao en polvo · 25g'],tip:null,kidsHelp:null},
      {title:'Carameliza los pistachos',text:'En una sartén pequeña, tuesta los pistachos con la miel a fuego medio 1–2 minutos hasta que estén brillantes y caramelizados; pásalos a papel de horno para que enfríen y endurezcan.',ings:['🌰 Pistachos · 20g'],tip:null,kidsHelp:null},
      {title:'Enfría, corona y sirve',text:'Reparte la mousse en 2 vasitos y refrigera al menos 2 horas. Justo antes de servir, corona con las frambuesas y los pistachos caramelizados.',ings:['🍓 Frambuesas · 60g'],tip:null,kidsHelp:null} ] },
  fr:{ title:'Mousse chocolat-avocat', ingredients:['Avocat mûr','Beurre de cacahuète','Sirop d\'érable','Sucre roux ou de coco','Cacao en poudre','Chocolat noir (85%)','Lait d\'amande','Framboises fraîches','Pistaches'], base:['Extrait de vanille','Sel marin','Miel'], dressing:[],
    steps:[
      {title:'Faire fondre le chocolat',text:'Faire fondre doucement le chocolat noir 85% (bain-marie ou courtes impulsions au micro-ondes), puis laisser tiédir.',ings:['🍫 Chocolat noir · 45g'],tip:null,kidsHelp:null},
      {title:'Mixer onctueux',text:'Mixer l\'avocat, le beurre de cacahuète, le sirop d\'érable, le sucre, le cacao, le lait d\'amande, la vanille et une pincée de sel avec le chocolat fondu jusqu\'à lisse et brillant.',ings:['🥑 Avocat · 1 pc','🥜 Beurre de cacahuète · 2 c. à s.','🍁 Sirop d\'érable · 45ml','🍫 Cacao en poudre · 25g'],tip:null,kidsHelp:null},
      {title:'Caraméliser les pistaches',text:'Dans une petite poêle sèche, torréfier les pistaches avec le miel à feu moyen 1–2 minutes jusqu\'à ce qu\'elles soient brillantes et caramélisées, puis débarrasser sur du papier cuisson pour refroidir.',ings:['🌰 Pistaches · 20g'],tip:null,kidsHelp:null},
      {title:'Réfrigérer, garnir et servir',text:'Répartir la mousse dans 2 verrines et réfrigérer au moins 2 heures. Juste avant de servir, garnir de framboises et des pistaches caramélisées.',ings:['🍓 Framboises · 60g'],tip:null,kidsHelp:null} ] },
};

const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const r = backup.find(x=>x.id===ID);
r.ingredients=ingredients; r.base_ingredients=base_ingredients; r.dressing=dressing; r.steps=steps; r.nutrition=nutrition; r.servings=servings; r.diet=diet; r.tags=tags;
fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));

const tr = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
tr[ID]=i18n;
fs.writeFileSync('recipes_i18n.json', JSON.stringify(tr,null,2));

let fixes={}; try{fixes=JSON.parse(fs.readFileSync('recipe_fixes.json','utf8'));}catch(e){}
fixes[ID]={ ingredients, base_ingredients, dressing, steps, nutrition, servings, diet, tags };
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));
console.log('Mousse: added raspberries + honey-caramelised pistachios; diet → Vegetarian + GF.');
