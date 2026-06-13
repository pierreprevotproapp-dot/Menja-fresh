// Refine the lemon-tahini dressing per top-rated online recipes & reviews:
//  + add garlic (in every 5-star version), + explicit lemon juice amount,
//  + cold-water loosening + maple-to-cut-bitterness tip.
const fs = require('fs');
const ID = 'avocado-greens-beetroot-bowl';

const base_ingredients = ['Lemon juice','Olive oil','Garlic','Maple syrup','Salt & pepper'];
const step4 = {
  title:'Make the dressing & build',
  text:'Whisk the tahini with the lemon juice, olive oil, grated garlic and a little maple syrup, then loosen with cold water a tablespoon at a time until creamy and pourable. Toss the greens with half, layer everything in the bowl, finish with sliced avocado and the pistachio crunch, then drizzle over the rest.',
  tip:'Cold water plus a touch of maple keeps the tahini from tasting bitter — add water slowly until it ribbons off the spoon.',
};
const tr = {
  de:{ base:['Zitronensaft','Olivenöl','Knoblauch','Ahornsirup','Salz & Pfeffer'],
    title:'Dressing machen & aufbauen',
    text:'Tahini mit Zitronensaft, Olivenöl, geriebenem Knoblauch und etwas Ahornsirup verrühren, dann löffelweise mit kaltem Wasser verdünnen, bis es cremig und gießbar ist. Die Hälfte mit den Blattsalaten mischen, alles in die Bowl schichten, mit Avocadoscheiben und knusprigen Pistazien abschließen und den Rest darüberträufeln.' },
  es:{ base:['Zumo de limón','Aceite de oliva','Ajo','Sirope de arce','Sal y pimienta'],
    title:'Prepara el aliño y monta',
    text:'Bate el tahini con el zumo de limón, el aceite de oliva, el ajo rallado y un poco de sirope de arce, luego afloja con agua fría cucharada a cucharada hasta que quede cremoso y fluido. Mezcla la mitad con las hojas verdes, monta todo en el bol, termina con aguacate en láminas y el crujiente de pistacho, y riega con el resto.' },
  fr:{ base:['Jus de citron','Huile d\'olive','Ail','Sirop d\'érable','Sel & poivre'],
    title:'Préparer la sauce et monter',
    text:'Fouetter le tahini avec le jus de citron, l\'huile d\'olive, l\'ail râpé et un peu de sirop d\'érable, puis détendre avec de l\'eau froide cuillère par cuillère jusqu\'à une texture crémeuse et nappante. Mélanger la moitié avec les pousses, monter le tout dans le bol, finir avec l\'avocat émincé et le croquant de pistache, puis arroser du reste.' },
};

const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const r = backup.find(x=>x.id===ID);
r.base_ingredients = base_ingredients;
r.steps[3].title = step4.title; r.steps[3].text = step4.text; r.steps[3].tip = step4.tip;
fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));

const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
['de','es','fr'].forEach(l=>{
  i18n[ID][l].base = tr[l].base;
  i18n[ID][l].steps[3].title = tr[l].title;
  i18n[ID][l].steps[3].text  = tr[l].text;
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));

const fixes = JSON.parse(fs.readFileSync('recipe_fixes.json','utf8'));
fixes[ID] = { base_ingredients, dressing: r.dressing, steps: r.steps };
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));

console.log('Refined lemon-tahini dressing: +garlic, +maple/cold-water tip');
console.log('base:', base_ingredients.join(', '));
console.log('dressing:', JSON.stringify(r.dressing));
