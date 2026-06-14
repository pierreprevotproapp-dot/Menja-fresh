// Menja Fresh — BASICS (ultra-simple fallback meals). categories:['Basic'] makes
// isBasic() true → they appear ONLY under the 🥄 Basics filter, never in swipe.
// Starting with 2 so we can see how it looks: Strammer Max + Pasta Pesto.
const fs = require('fs');
const R = [
{ id:'strammer-max', emoji:'🍳', is_kids:true, title:'Strammer Max',
  subtitle:'Ham and fried egg on buttered bread — ready in 5 minutes',
  tags:['Basic','Kid-Friendly'], meal:['Main Course','Kleine Mahlzeit'], categories:['Basic'], diet:[],
  prep:3, cook:5, servings:2, nutrition:{fat:24,kcal:420,carbs:28,fiber:2,protein:24},
  ings:[['🍞','Rye bread','2 slices'],['🥓','Cooked ham','4 slices'],['🥚','Eggs','2 pcs'],['🧈','Butter','1 tbsp'],['🌿','Chives','5g']],
  base:['Salt & pepper'], dress:null,
  steps:[
    ['Butter the bread','Lightly toast the rye bread and spread with butter.',[0,3],null],
    ['Fry ham & eggs','Warm the ham briefly in the pan, then fry the eggs sunny-side up.',[1,2],'Keep the yolks runny — they become the sauce.'],
    ['Build & serve','Top the bread with ham and a fried egg, season and scatter with chives.',[4],null] ],
  image_prompt:'Strammer Max — rye bread topped with ham and a sunny-side-up fried egg, chives, runny yolk, cosy German food photography',
  tr:{ de:{title:'Strammer Max',names:['Roggenbrot','Gekochter Schinken','Eier','Butter','Schnittlauch'],base:['Salz & Pfeffer'],steps:[['Brot buttern','Roggenbrot leicht toasten und mit Butter bestreichen.'],['Schinken & Eier braten','Schinken kurz in der Pfanne erwärmen, dann die Eier als Spiegeleier braten.'],['Anrichten & servieren','Brot mit Schinken und einem Spiegelei belegen, würzen und mit Schnittlauch bestreuen.']]},
       es:{title:'Strammer Max (huevo y jamón sobre pan)',names:['Pan de centeno','Jamón cocido','Huevos','Mantequilla','Cebollino'],base:['Sal y pimienta'],steps:[['Unta el pan','Tuesta ligeramente el pan de centeno y úntalo con mantequilla.'],['Fríe jamón y huevos','Calienta el jamón un momento en la sartén y fríe los huevos.'],['Monta y sirve','Coloca el jamón y un huevo frito sobre el pan, salpimienta y espolvorea cebollino.']]},
       fr:{title:'Strammer Max (œuf et jambon sur pain)',names:['Pain de seigle','Jambon cuit','Œufs','Beurre','Ciboulette'],base:['Sel & poivre'],steps:[['Beurrer le pain','Toaster légèrement le pain de seigle et le tartiner de beurre.'],['Cuire jambon et œufs','Réchauffer le jambon à la poêle, puis cuire les œufs au plat.'],['Dresser et servir','Garnir le pain de jambon et d\'un œuf au plat, assaisonner et parsemer de ciboulette.']]} } },

{ id:'pasta-pesto-basic', emoji:'🍝', is_kids:true, title:'Pasta with Pesto',
  subtitle:'Three ingredients, ten minutes — the ultimate easy dinner',
  tags:['Basic','Vegetarian','Kid-Friendly'], meal:['Main Course'], categories:['Basic'], diet:['Vegetarian'],
  prep:3, cook:10, servings:2, nutrition:{fat:22,kcal:520,carbs:64,fiber:4,protein:16},
  ings:[['🍝','Pasta','200g'],['🌿','Pesto','4 tbsp'],['🧀','Parmesan','20g'],['🍅','Cherry tomatoes','100g']],
  base:['Olive oil','Salt'], dress:null,
  steps:[
    ['Cook the pasta','Boil the pasta in salted water until al dente, then drain — keep a splash of the cooking water.',[0],null],
    ['Toss with pesto','Stir the pesto through the warm pasta, loosening with a little pasta water until glossy.',[1],'A splash of pasta water makes the pesto cling and turns it silky.'],
    ['Serve','Top with grated parmesan and halved cherry tomatoes.',[2,3],null] ],
  image_prompt:'Bowl of pasta tossed with green basil pesto, grated parmesan and cherry tomatoes, simple bright food photography',
  tr:{ de:{title:'Nudeln mit Pesto',names:['Nudeln','Pesto','Parmesan','Kirschtomaten'],base:['Olivenöl','Salz'],steps:[['Nudeln kochen','Nudeln in Salzwasser al dente kochen, abgießen — etwas Kochwasser aufheben.'],['Mit Pesto schwenken','Pesto unter die warmen Nudeln rühren, mit etwas Kochwasser geschmeidig machen.'],['Servieren','Mit geriebenem Parmesan und halbierten Kirschtomaten servieren.']]},
       es:{title:'Pasta al pesto',names:['Pasta','Pesto','Parmesano','Tomates cherry'],base:['Aceite de oliva','Sal'],steps:[['Cuece la pasta','Cuece la pasta en agua con sal al dente y escurre — reserva un poco del agua.'],['Mezcla con pesto','Mezcla el pesto con la pasta caliente y aflójalo con un poco de agua de cocción.'],['Sirve','Sirve con parmesano rallado y tomates cherry partidos.']]},
       fr:{title:'Pâtes au pesto',names:['Pâtes','Pesto','Parmesan','Tomates cerises'],base:['Huile d\'olive','Sel'],steps:[['Cuire les pâtes','Cuire les pâtes dans l\'eau salée al dente et égoutter — garder un peu d\'eau de cuisson.'],['Mélanger au pesto','Mélanger le pesto aux pâtes chaudes, détendre avec un peu d\'eau de cuisson.'],['Servir','Servir avec du parmesan râpé et des tomates cerises coupées.']]} } },

{ id:'pasta-tomato-sauce-basic', emoji:'🍝', is_kids:true, title:'Pasta with Tomato Sauce',
  subtitle:'The everyday classic — pantry to plate in 15 minutes',
  tags:['Basic','Vegetarian','Kid-Friendly'], meal:['Main Course'], categories:['Basic'], diet:['Vegetarian'],
  prep:3, cook:12, servings:2, nutrition:{fat:12,kcal:480,carbs:78,fiber:6,protein:15},
  ings:[['🍝','Pasta','200g'],['🥫','Passata','300g'],['🧄','Garlic','1 clove'],['🧀','Parmesan','20g']],
  base:['Olive oil','Dried oregano','Salt & pepper'], dress:null,
  steps:[
    ['Cook the pasta','Boil the pasta in salted water until al dente, then drain.',[0],null],
    ['Quick tomato sauce','Soften the garlic in a little olive oil, add the passata and oregano and simmer 5 minutes, then season.',[2,1],null],
    ['Combine & serve','Toss the pasta in the sauce and top with grated parmesan.',[3],null] ],
  image_prompt:'Simple bowl of pasta in tomato sauce topped with grated parmesan and basil, homely food photography',
  tr:{ de:{title:'Nudeln mit Tomatensauce',names:['Nudeln','Passata','Knoblauch','Parmesan'],base:['Olivenöl','Getrockneter Oregano','Salz & Pfeffer'],steps:[['Nudeln kochen','Nudeln in Salzwasser al dente kochen und abgießen.'],['Schnelle Tomatensauce','Knoblauch in etwas Olivenöl andünsten, Passata und Oregano zugeben, 5 Minuten köcheln und würzen.'],['Vermengen & servieren','Nudeln in der Sauce schwenken und mit geriebenem Parmesan toppen.']]},
       es:{title:'Pasta con salsa de tomate',names:['Pasta','Passata','Ajo','Parmesano'],base:['Aceite de oliva','Orégano seco','Sal y pimienta'],steps:[['Cuece la pasta','Cuece la pasta en agua con sal al dente y escurre.'],['Salsa de tomate rápida','Sofríe el ajo en un poco de aceite, añade la passata y el orégano, cuece 5 minutos y salpimienta.'],['Mezcla y sirve','Mezcla la pasta con la salsa y corona con parmesano rallado.']]},
       fr:{title:'Pâtes à la sauce tomate',names:['Pâtes','Passata','Ail','Parmesan'],base:['Huile d\'olive','Origan séché','Sel & poivre'],steps:[['Cuire les pâtes','Cuire les pâtes dans l\'eau salée al dente et égoutter.'],['Sauce tomate rapide','Faire suer l\'ail dans un peu d\'huile, ajouter la passata et l\'origan, mijoter 5 minutes et assaisonner.'],['Mélanger et servir','Mélanger les pâtes à la sauce et garnir de parmesan râpé.']]} } },
];

const chip=(e,n,a)=>`${e} ${n} · ${a}`;
const short=n=>n.replace(/\s*\(.*?\)\s*$/,'').trim();
function enRow(s){
  const ingredients=s.ings.map(([e,n,a])=>({name:n,emoji:e,amount:a}));
  const steps=s.steps.map(([t,txt,idx,tip],i)=>({num:i+1,title:t,text:txt,ings:idx.map(j=>chip(s.ings[j][0],short(s.ings[j][1]),s.ings[j][2])),tip:tip||null,kidsHelp:null}));
  return {id:s.id,title:s.title,subtitle:s.subtitle,emoji:s.emoji,is_kids:s.is_kids,tags:s.tags,meal:s.meal,categories:s.categories,diet:s.diet,prep_minutes:s.prep,cook_minutes:s.cook,servings:s.servings,image_url:'',image_prompt:s.image_prompt,nutrition:s.nutrition,ingredients,base_ingredients:s.base,dressing:[],mise_en_place:ingredients,steps};
}
function i18nEntry(s){const out={};['de','es','fr'].forEach(l=>{const t=s.tr[l];out[l]={title:t.title,ingredients:t.names.slice(),base:t.base.slice(),dressing:[],steps:s.steps.map(([,,idx],i)=>({title:t.steps[i][0],text:t.steps[i][1],ings:idx.map(j=>chip(s.ings[j][0],short(t.names[j]),s.ings[j][2])),tip:null,kidsHelp:null}))};});return out;}

const nr=JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n=JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
let added=0;
R.forEach(s=>{const row=enRow(s);const k=nr.findIndex(r=>r.id===s.id);if(k>=0)nr[k]=row;else{nr.push(row);added++;}i18n[s.id]=i18nEntry(s);});
fs.writeFileSync('new_recipes.json',JSON.stringify(nr,null,2));
fs.writeFileSync('recipes_i18n.json',JSON.stringify(i18n,null,2));
console.log(`Built ${R.length} basics (${added} new). new_recipes.json now has ${nr.length} rows.`);
