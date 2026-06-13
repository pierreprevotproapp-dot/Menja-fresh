// Add a proper lemon-tahini dressing to avocado-greens-beetroot-bowl
// (it was the only bowl/salad with an empty dressing field).
const fs = require('fs');
const ID = 'avocado-greens-beetroot-bowl';

const base_ingredients = ['Olive oil','Lemon juice','Maple syrup','Salt & pepper'];
const dressing = [{ name:'Tahini', emoji:'🥜', amount:'2 tbsp' }];
const step4_en = {
  title:'Make the dressing & build',
  text:'Whisk the tahini with the lemon juice, olive oil, a splash of water and a little maple syrup into a creamy, pourable dressing. Toss the greens with half of it, layer everything in the bowl, finish with sliced avocado and the pistachio crunch, then drizzle over the rest.',
  ings:['🥜 Tahini · 2 tbsp','🥑 Avocado · 1 pc','🥬 Mixed greens · 80g'],
};

const i18n = {
  de: {
    base:['Olivenöl','Zitronensaft','Ahornsirup','Salz & Pfeffer'],
    dressing:[{ name:'Tahini', emoji:'🥜', amount:'2 EL' }],
    step4:{ title:'Dressing machen & aufbauen',
      text:'Tahini mit Zitronensaft, Olivenöl, einem Schuss Wasser und etwas Ahornsirup zu einem cremigen, gießbaren Dressing verrühren. Die Hälfte mit den Blattsalaten mischen, alles in die Bowl schichten, mit Avocadoscheiben und knusprigen Pistazien abschließen und den Rest darüberträufeln.',
      ings:['🥜 Tahini · 2 EL','🥑 Avocado · 1 St.','🥬 Blattsalate · 80g'] },
  },
  es: {
    base:['Aceite de oliva','Zumo de limón','Sirope de arce','Sal y pimienta'],
    dressing:[{ name:'Tahini', emoji:'🥜', amount:'2 cdas' }],
    step4:{ title:'Prepara el aliño y monta',
      text:'Bate el tahini con el zumo de limón, el aceite de oliva, un chorrito de agua y un poco de sirope de arce hasta lograr un aliño cremoso y fluido. Mezcla la mitad con las hojas verdes, monta todo en el bol, termina con aguacate en láminas y el crujiente de pistacho, y riega con el resto.',
      ings:['🥜 Tahini · 2 cdas','🥑 Aguacate · 1 ud','🥬 Hojas verdes · 80g'] },
  },
  fr: {
    base:['Huile d\'olive','Jus de citron','Sirop d\'érable','Sel & poivre'],
    dressing:[{ name:'Tahini', emoji:'🥜', amount:'2 c. à s.' }],
    step4:{ title:'Préparer la sauce et monter',
      text:'Fouetter le tahini avec le jus de citron, l\'huile d\'olive, un filet d\'eau et un peu de sirop d\'érable pour obtenir une sauce crémeuse et nappante. Mélanger la moitié avec les pousses, monter le tout dans le bol, finir avec l\'avocat émincé et le croquant de pistache, puis arroser du reste.',
      ings:['🥜 Tahini · 2 c. à s.','🥑 Avocat · 1 pc','🥬 Jeunes pousses · 80g'] },
  },
};

const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const r = backup.find(x=>x.id===ID);
r.base_ingredients = base_ingredients;
r.dressing = dressing;
r.steps[3].title = step4_en.title;
r.steps[3].text  = step4_en.text;
r.steps[3].ings  = step4_en.ings;
fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));

const tr = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{
  tr[ID][l].base = i18n[l].base;
  tr[ID][l].dressing = i18n[l].dressing;
  const s = tr[ID][l].steps[3];
  s.title = i18n[l].step4.title; s.text = i18n[l].step4.text; s.ings = i18n[l].step4.ings;
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(tr,null,2));

let fixes = {};
try { fixes = JSON.parse(fs.readFileSync('recipe_fixes.json','utf8')); } catch(e){}
fixes[ID] = { base_ingredients, dressing, steps: backup.find(x=>x.id===ID).steps };
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));

console.log('Updated', ID, '— added lemon-tahini dressing');
