// Adapt chocolate-avocado-mousse with the "Honest Greens" chef-twist feedback.
// Updates recipes_backup.json (EN source), recipes_i18n.json (de/es/fr) and
// recipe_fixes.json (so apply_fixes.js pushes the EN columns to the DB).
const fs = require('fs');
const ID = 'chocolate-avocado-mousse';

// ---- EN: new ingredient + step data --------------------------------------
const ingredients = [
  { emoji:'🥑', name:'Ripe avocados',     amount:'2 pcs' },
  { emoji:'🍫', name:'Raw cacao powder',  amount:'4 tbsp' },
  { emoji:'🍯', name:'Maple syrup',       amount:'4 tbsp' },
  { emoji:'🥥', name:'Coconut milk',      amount:'60ml' },
  { emoji:'🍓', name:'Fresh raspberries', amount:'80g' },
  { emoji:'🌰', name:'Pistachios',        amount:'20g' },
  { emoji:'🟤', name:'Cacao nibs',        amount:'1 tbsp' },
];
const base_ingredients = ['Vanilla extract','Espresso powder','Sea salt flakes','Orange zest'];
const dressing = [];
const steps = [
  { title:'Blend the mousse',
    text:'Scoop the avocado flesh into a blender. Add the raw cacao, maple syrup, coconut milk, vanilla, espresso powder and a pinch of sea-salt flakes. Blend for about 2 minutes until completely smooth and glossy.',
    ings:['🥑 Avocados · 2 pcs','🍫 Raw cacao powder · 4 tbsp','🍯 Maple syrup · 4 tbsp','🥥 Coconut milk · 60ml'],
    tip:'The espresso powder deepens the chocolate flavour and hides any avocado taste.' },
  { title:'Chill to set',
    text:'Spoon into glasses and chill for at least 2 hours, so the mousse firms up and the flavour deepens.',
    ings:[] },
  { title:'Top & serve',
    text:'Top with raspberries, crushed pistachios and cacao nibs, then finish with a little orange zest and a few sea-salt flakes.',
    ings:['🍓 Raspberries · 80g','🌰 Pistachios · 20g','🟤 Cacao nibs · 1 tbsp'] },
];
const nutrition = { fat:20, kcal:275, carbs:26, fiber:7, protein:5 };

// ---- i18n -----------------------------------------------------------------
const i18n = {
  de: {
    title:'Schoko-Avocado-Mousse',
    ingredients:['Reife Avocados','Rohes Kakaopulver','Ahornsirup','Kokosmilch','Frische Himbeeren','Pistazien','Kakaonibs'],
    base:['Vanilleextrakt','Espressopulver','Salzflocken','Orangenzeste'],
    dressing:[],
    steps:[
      { title:'Mousse mixen',
        text:'Avocadofleisch in einen Mixer geben. Rohen Kakao, Ahornsirup, Kokosmilch, Vanille, Espressopulver und eine Prise Salzflocken zugeben. Etwa 2 Minuten mixen, bis alles vollständig glatt und glänzend ist.',
        ings:['🥑 Avocados · 2 St.','🍫 Rohes Kakaopulver · 4 EL','🍯 Ahornsirup · 4 EL','🥥 Kokosmilch · 60ml'],
        tip:'Das Espressopulver vertieft den Schokogeschmack und überdeckt jeden Avocado-Ton.' },
      { title:'Kühlen & fest werden lassen',
        text:'In Gläser füllen und mindestens 2 Stunden kühlen, damit die Mousse fest wird und der Geschmack reift.',
        ings:[] },
      { title:'Belegen & servieren',
        text:'Mit Himbeeren, gehackten Pistazien und Kakaonibs belegen, dann mit etwas Orangenzeste und ein paar Salzflocken abschließen.',
        ings:['🍓 Himbeeren · 80g','🌰 Pistazien · 20g','🟤 Kakaonibs · 1 EL'] },
    ],
  },
  es: {
    title:'Mousse de chocolate y aguacate',
    ingredients:['Aguacates maduros','Cacao puro en polvo','Sirope de arce','Leche de coco','Frambuesas frescas','Pistachos','Nibs de cacao'],
    base:['Extracto de vainilla','Café espresso en polvo','Escamas de sal','Ralladura de naranja'],
    dressing:[],
    steps:[
      { title:'Tritura la mousse',
        text:'Pon la pulpa de aguacate en una batidora. Añade el cacao puro, el sirope de arce, la leche de coco, la vainilla, el café en polvo y una pizca de escamas de sal. Tritura unos 2 minutos hasta que quede completamente fino y brillante.',
        ings:['🥑 Aguacates · 2 ud','🍫 Cacao puro en polvo · 4 cdas','🍯 Sirope de arce · 4 cdas','🥥 Leche de coco · 60ml'],
        tip:'El café en polvo intensifica el sabor a chocolate y disimula el aguacate.' },
      { title:'Enfría para que cuaje',
        text:'Reparte en vasitos y refrigera al menos 2 horas, para que la mousse cuaje y el sabor se asiente.',
        ings:[] },
      { title:'Corona y sirve',
        text:'Corona con frambuesas, pistachos picados y nibs de cacao, y termina con un poco de ralladura de naranja y unas escamas de sal.',
        ings:['🍓 Frambuesas · 80g','🌰 Pistachos · 20g','🟤 Nibs de cacao · 1 cda'] },
    ],
  },
  fr: {
    title:'Mousse chocolat-avocat',
    ingredients:['Avocats mûrs','Cacao cru en poudre','Sirop d\'érable','Lait de coco','Framboises fraîches','Pistaches','Éclats de cacao'],
    base:['Extrait de vanille','Café espresso en poudre','Fleur de sel','Zeste d\'orange'],
    dressing:[],
    steps:[
      { title:'Mixer la mousse',
        text:'Mettre la chair d\'avocat dans un blender. Ajouter le cacao cru, le sirop d\'érable, le lait de coco, la vanille, le café en poudre et une pincée de fleur de sel. Mixer environ 2 minutes jusqu\'à ce que ce soit parfaitement lisse et brillant.',
        ings:['🥑 Avocats · 2 pc','🍫 Cacao cru en poudre · 4 c. à s.','🍯 Sirop d\'érable · 4 c. à s.','🥥 Lait de coco · 60ml'],
        tip:'Le café en poudre intensifie le goût de chocolat et masque celui de l\'avocat.' },
      { title:'Réfrigérer pour figer',
        text:'Répartir dans des verrines et réfrigérer au moins 2 heures, pour que la mousse prenne et que le goût se développe.',
        ings:[] },
      { title:'Garnir et servir',
        text:'Garnir de framboises, de pistaches concassées et d\'éclats de cacao, puis finir avec un peu de zeste d\'orange et quelques cristaux de fleur de sel.',
        ings:['🍓 Framboises · 80g','🌰 Pistaches · 20g','🟤 Éclats de cacao · 1 c. à s.'] },
    ],
  },
};

// ---- apply ----------------------------------------------------------------
const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const r = backup.find(x=>x.id===ID);
if(!r){ console.error('recipe not found'); process.exit(1); }
r.ingredients = ingredients;
r.base_ingredients = base_ingredients;
r.dressing = dressing;
r.steps = steps;
r.nutrition = nutrition;
fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));

const tr = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
tr[ID] = i18n;
fs.writeFileSync('recipes_i18n.json', JSON.stringify(tr,null,2));

let fixes = {};
try { fixes = JSON.parse(fs.readFileSync('recipe_fixes.json','utf8')); } catch(e){}
fixes[ID] = { ingredients, base_ingredients, dressing, steps, nutrition };
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));

console.log('Updated', ID, 'in recipes_backup.json, recipes_i18n.json, recipe_fixes.json');
