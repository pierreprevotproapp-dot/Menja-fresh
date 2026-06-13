// Add Inspired Taste's classic Carrot Cake with cream-cheese frosting.
// Frosting lives in the `dressing` field (the recipe's "hero topper").
const fs = require('fs');
const ID = 'classic-carrot-cake-cream-cheese';

// main ingredients: [emoji, EN name, amount]
const ings = [
  ['🥕','Grated carrots','300g'],
  ['🌾','Plain flour','260g'],
  ['🥚','Eggs','4 pcs'],
  ['🫗','Vegetable oil','295ml'],
  ['🍬','Sugar','200g'],
  ['🟤','Brown sugar','190g'],
  ['🌰','Pecans','120g'],
  ['🍇','Raisins','70g'],
];
const base = ['Baking soda','Cinnamon','Vanilla extract','Sea salt'];
// frosting (dressing): [emoji, EN name, amount]
const frosting = [
  ['🧀','Cream cheese','225g'],
  ['🍚','Powdered sugar','140g'],
  ['🥛','Heavy cream','80ml'],
];
// steps: [title, text, [main-ingredient indices], tip|null]
const steps = [
  ['Mix the batter','Whisk the flour, baking soda, cinnamon and salt. In a second bowl whisk the oil, both sugars and vanilla, then beat in the eggs one at a time. Stir the dry mix into the wet in three parts, then fold in the carrots, pecans and raisins.',[1,0,2],'Don\'t overmix once the flour goes in — fold just until combined for a tender crumb.'],
  ['Bake','Divide the batter between two lined 23 cm (9-inch) tins and bake at 180°C for 35–45 minutes, until the tops spring back when pressed. Cool completely before frosting.',[],null],
  ['Make the frosting','Beat the cream cheese until smooth, beat in the powdered sugar, then whip in the cold heavy cream until thick and spreadable.',[],'Use cold cream and a block cream cheese (not spreadable tub) so the frosting holds its shape.'],
  ['Frost & serve','Spread the frosting between and over the cooled layers, then finish with the remaining chopped pecans.',[6],null],
];
const nutrition = { fat:24, kcal:420, carbs:46, fiber:2, protein:5 };

const tr = {
  de:{ title:'Klassischer Carrot Cake mit Frischkäse-Frosting',
    names:['Geriebene Karotten','Weizenmehl','Eier','Pflanzenöl','Zucker','Brauner Zucker','Pekannüsse','Rosinen'],
    base:['Natron','Zimt','Vanilleextrakt','Meersalz'],
    frosting:['Frischkäse','Puderzucker','Schlagsahne'],
    steps:[
      ['Teig anrühren','Mehl, Natron, Zimt und Salz verquirlen. In einer zweiten Schüssel Öl, beide Zuckersorten und Vanille verrühren, dann die Eier einzeln unterrühren. Die trockene Mischung in drei Portionen unter die feuchte rühren, dann Karotten, Pekannüsse und Rosinen unterheben.'],
      ['Backen','Den Teig auf zwei ausgelegte 23-cm-Formen verteilen und bei 180 °C 35–45 Minuten backen, bis die Oberfläche auf Fingerdruck zurückfedert. Vor dem Frosten vollständig abkühlen lassen.'],
      ['Frosting machen','Frischkäse glatt rühren, Puderzucker unterrühren, dann die kalte Schlagsahne dick und streichfähig aufschlagen.'],
      ['Frosten & servieren','Das Frosting zwischen und über die abgekühlten Böden streichen, dann mit den restlichen gehackten Pekannüssen abschließen.'],
    ]},
  es:{ title:'Tarta de zanahoria clásica con frosting de queso',
    names:['Zanahoria rallada','Harina de trigo','Huevos','Aceite vegetal','Azúcar','Azúcar moreno','Nueces pecanas','Pasas'],
    base:['Bicarbonato','Canela','Extracto de vainilla','Sal marina'],
    frosting:['Queso crema','Azúcar glas','Nata para montar'],
    steps:[
      ['Prepara la masa','Bate la harina, el bicarbonato, la canela y la sal. En otro bol bate el aceite, los dos azúcares y la vainilla, luego incorpora los huevos uno a uno. Añade la mezcla seca a la húmeda en tres veces y, por último, incorpora la zanahoria, las nueces pecanas y las pasas.'],
      ['Hornea','Reparte la masa en dos moldes de 23 cm forrados y hornea a 180 °C durante 35–45 minutos, hasta que la superficie recupere su forma al presionar. Deja enfriar del todo antes de cubrir.'],
      ['Haz el frosting','Bate el queso crema hasta que quede liso, incorpora el azúcar glas y luego monta con la nata fría hasta que quede espeso y untable.'],
      ['Cubre y sirve','Reparte el frosting entre las capas y por encima del bizcocho frío, y termina con el resto de nueces pecanas picadas.'],
    ]},
  fr:{ title:'Carrot cake classique au glaçage fromage frais',
    names:['Carottes râpées','Farine de blé','Œufs','Huile végétale','Sucre','Sucre roux','Noix de pécan','Raisins secs'],
    base:['Bicarbonate','Cannelle','Extrait de vanille','Sel marin'],
    frosting:['Fromage frais','Sucre glace','Crème liquide entière'],
    steps:[
      ['Préparer la pâte','Fouetter la farine, le bicarbonate, la cannelle et le sel. Dans un second saladier, fouetter l\'huile, les deux sucres et la vanille, puis incorporer les œufs un à un. Ajouter le mélange sec au mélange humide en trois fois, puis incorporer les carottes, les noix de pécan et les raisins secs.'],
      ['Cuire','Répartir la pâte dans deux moules de 23 cm chemisés et cuire à 180 °C pendant 35 à 45 minutes, jusqu\'à ce que le dessus revienne sous le doigt. Laisser refroidir complètement avant de glacer.'],
      ['Préparer le glaçage','Battre le fromage frais jusqu\'à ce qu\'il soit lisse, incorporer le sucre glace, puis monter avec la crème froide jusqu\'à une texture épaisse et tartinable.'],
      ['Glacer et servir','Étaler le glaçage entre les couches et sur le gâteau refroidi, puis finir avec le reste de noix de pécan concassées.'],
    ]},
};

// ---- builders -------------------------------------------------------------
const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const shortName=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients = ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const dressing = frosting.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps = steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],shortName(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
const row = {
  id:ID, title:'Classic Carrot Cake with Cream-Cheese Frosting',
  subtitle:'The crowd-favourite bake — moist, spiced and generously frosted',
  emoji:'🥕', is_kids:true,
  tags:['Vegetarian'], meal:['Dessert'], categories:['Süßspeise'], diet:['Vegetarian'],
  prep_minutes:20, cook_minutes:40, servings:12, image_url:'',
  image_prompt:'Classic two-layer carrot cake with thick cream cheese frosting and chopped pecans on top, one slice cut to show the moist spiced crumb, soft natural light, editorial food photography',
  nutrition, ingredients, base_ingredients:base, dressing,
  mise_en_place:[...ingredients, ...dressing], steps:enSteps,
};

const i18n={};
['de','es','fr'].forEach(l=>{
  const t=tr[l];
  i18n[l]={ title:t.title, ingredients:t.names.slice(), base:t.base.slice(),
    dressing:frosting.map(([e,,a],k)=>({name:t.frosting[k],emoji:e,amount:a})),
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],shortName(t.names[j]),ings[j][2])),tip:null,kidsHelp:null})) };
});

// ---- write ----------------------------------------------------------------
const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const k=nr.findIndex(r=>r.id===ID); if(k>=0)nr[k]=row; else nr.push(row);
fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));
const all=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
all[ID]=i18n; fs.writeFileSync('recipes_i18n.json', JSON.stringify(all,null,2));
console.log('Added', ID, '— new_recipes.json now has', nr.length, 'rows');
