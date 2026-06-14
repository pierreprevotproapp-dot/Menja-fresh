// Strawberry, Tomato & Burrata Salad (HBH-inspired). Strawberries primary;
// peaches (pan-seared) or cherries as alternative; pine nuts; herb vinaigrette.
const fs = require('fs');
const ID = 'strawberry-tomato-burrata-salad';
const ings = [
  ['🍓','Strawberries','250g'],
  ['🍅','Cherry tomatoes','300g'],
  ['🧀','Burrata','250g'],
  ['🌰','Pine nuts','30g'],
];
const base = ['Olive oil','Balsamic vinegar','Garlic','Lemon zest','Salt & pepper','Chilli flakes'];
const dress = [ ['🍯','Honey','1 tbsp'], ['🧅','Shallot','½ pc'], ['🌿','Fresh herbs (basil, oregano, thyme)','1 handful'] ];
// steps: [title, text, [ingIdx], tip|null]
const steps = [
  ['Make the vinaigrette','Whisk the olive oil, balsamic vinegar, honey, finely chopped shallot, grated garlic, lemon zest and chopped herbs with salt and a pinch of chilli flakes.',[],null],
  ['Marinate','Halve the strawberries and toss with the cherry tomatoes and a third of the vinaigrette. Let sit for 10 minutes so the juices mingle.',[0,1],'Swap strawberries for peaches or cherries — if using peaches, sear the wedges cut-side down for 1–2 min first to deepen the flavour.'],
  ['Toast & assemble','Toast the pine nuts in a dry pan until golden. Arrange the marinated fruit and tomatoes on a platter, tear the burrata over the top, drizzle with the remaining vinaigrette and scatter with pine nuts and extra herbs.',[3,2],null],
];
const nutrition = { fat:26, kcal:360, carbs:20, fiber:4, protein:12 };

const tr = {
  de:{ title:'Erdbeer-Tomaten-Burrata-Salat', names:['Erdbeeren','Cherry-Tomaten','Burrata','Pinienkerne'],
    base:['Olivenöl','Balsamico','Knoblauch','Zitronenabrieb','Salz & Pfeffer','Chiliflocken'],
    dress:['Honig','Schalotte','Frische Kräuter (Basilikum, Oregano, Thymian)'],
    steps:[
      ['Vinaigrette anrühren','Olivenöl, Balsamico, Honig, fein gehackte Schalotte, geriebenen Knoblauch, Zitronenabrieb und gehackte Kräuter mit Salz und einer Prise Chiliflocken verquirlen.',null],
      ['Marinieren','Erdbeeren halbieren und mit den Cherry-Tomaten und einem Drittel der Vinaigrette mischen. 10 Minuten ziehen lassen, damit sich die Säfte verbinden.','Statt Erdbeeren gehen auch Pfirsiche oder Kirschen — Pfirsichspalten vorher kurz mit der Schnittfläche nach unten anbraten, das intensiviert den Geschmack.'],
      ['Rösten & anrichten','Pinienkerne in einer trockenen Pfanne goldbraun rösten. Mariniertes Obst und Tomaten auf einer Platte anrichten, Burrata darüber zupfen, restliche Vinaigrette darüberträufeln und mit Pinienkernen und Kräutern bestreuen.',null] ] },
  es:{ title:'Ensalada de fresa, tomate y burrata', names:['Fresas','Tomates cherry','Burrata','Piñones'],
    base:['Aceite de oliva','Vinagre balsámico','Ajo','Ralladura de limón','Sal y pimienta','Copos de chile'],
    dress:['Miel','Chalota','Hierbas frescas (albahaca, orégano, tomillo)'],
    steps:[
      ['Prepara la vinagreta','Bate el aceite, el vinagre balsámico, la miel, la chalota picada, el ajo rallado, la ralladura de limón y las hierbas picadas con sal y una pizca de copos de chile.',null],
      ['Marina','Parte las fresas y mézclalas con los tomates cherry y un tercio de la vinagreta. Deja reposar 10 minutos.','Puedes cambiar las fresas por melocotones o cerezas — si usas melocotón, dóralo un momento por el lado del corte para intensificar el sabor.'],
      ['Tuesta y monta','Tuesta los piñones en una sartén seca hasta dorar. Coloca la fruta marinada y los tomates en una fuente, reparte la burrata por encima, riega con el resto de la vinagreta y esparce piñones y hierbas.',null] ] },
  fr:{ title:'Salade fraise, tomate et burrata', names:['Fraises','Tomates cerises','Burrata','Pignons de pin'],
    base:['Huile d\'olive','Vinaigre balsamique','Ail','Zeste de citron','Sel & poivre','Flocons de piment'],
    dress:['Miel','Échalote','Herbes fraîches (basilic, origan, thym)'],
    steps:[
      ['Préparer la vinaigrette','Fouetter l\'huile, le vinaigre balsamique, le miel, l\'échalote ciselée, l\'ail râpé, le zeste de citron et les herbes ciselées avec du sel et une pincée de flocons de piment.',null],
      ['Mariner','Couper les fraises et les mélanger aux tomates cerises et à un tiers de la vinaigrette. Laisser reposer 10 minutes.','Remplacez les fraises par des pêches ou des cerises — pour les pêches, saisissez-les côté coupé 1–2 min pour intensifier le goût.'],
      ['Torréfier et dresser','Torréfier les pignons à sec jusqu\'à doré. Disposer les fruits marinés et les tomates sur un plat, répartir la burrata, arroser du reste de vinaigrette et parsemer de pignons et d\'herbes.',null] ] },
};

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
const ingredients=ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const dressing=dress.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
const enSteps=steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(ings[j][0],short(ings[j][1]),ings[j][2])),tip:tip||null,kidsHelp:null}));
const row={id:ID,title:'Strawberry, Tomato & Burrata Salad',subtitle:'Summer on a plate — juicy fruit, creamy burrata, herby vinaigrette',emoji:'🍓',is_kids:false,
  tags:['Vegetarian','Gluten-free'],meal:['Main Course','Kleine Mahlzeit'],categories:['Salat'],diet:['Vegetarian','Gluten-free'],
  prep_minutes:15,cook_minutes:5,servings:4,image_url:'',
  image_prompt:'Strawberry, tomato and burrata salad on a platter with torn burrata, toasted pine nuts, fresh basil and a herby vinaigrette, bright summer food photography',
  nutrition,ingredients,base_ingredients:base,dressing,mise_en_place:[...ingredients,...dressing],steps:enSteps};

const i18n={};
['de','es','fr'].forEach(l=>{const t=tr[l];
  i18n[l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),
    dressing:dress.map(([e,,a],k)=>({name:t.dress[k],emoji:e,amount:a})),
    steps:steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(ings[j][0],short(t.names[j]),ings[j][2])),tip:t.steps[i][2]||null,kidsHelp:null}))};
});

const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const all=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const k=nr.findIndex(r=>r.id===ID); if(k>=0)nr[k]=row; else nr.push(row);
all[ID]=i18n;
fs.writeFileSync('new_recipes.json',JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json',JSON.stringify(all,null,2));
console.log('Added',ID,'— new_recipes.json now has',nr.length,'rows.');
