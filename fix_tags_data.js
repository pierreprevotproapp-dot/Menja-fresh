// Fix the 2 diet-tag contradictions found by test_tags.js.
const fs = require('fs');
const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const i18n   = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
let fixes = {}; try{ fixes = JSON.parse(fs.readFileSync('recipe_fixes.json','utf8')); }catch(e){}

// 1) Turkish eggs: contains sourdough bread → NOT gluten-free. Drop the GF tag.
const te = backup.find(r=>r.id==='turkish-style-eggs-yogurt');
te.diet = te.diet.filter(x=>!/gluten/i.test(x));
te.tags = te.tags.filter(x=>!/gluten/i.test(x));
fixes['turkish-style-eggs-yogurt'] = Object.assign(fixes['turkish-style-eggs-yogurt']||{}, { diet: te.diet, tags: te.tags });

// 2) Buckwheat porridge: "Maple syrup or honey" → "Maple syrup" (keep it truly vegan).
const bp = backup.find(r=>r.id==='buckwheat-porridge-berries');
const idx = bp.ingredients.findIndex(i=>/honey|honig|miel/i.test(i.name));
if(idx>=0) bp.ingredients[idx].name = 'Maple syrup';
fixes['buckwheat-porridge-berries'] = Object.assign(fixes['buckwheat-porridge-berries']||{}, { ingredients: bp.ingredients });
const T={de:'Ahornsirup',es:'Sirope de arce',fr:'Sirop d\'érable'};
['de','es','fr'].forEach(l=>{
  const ent=i18n['buckwheat-porridge-berries']&&i18n['buckwheat-porridge-berries'][l];
  if(ent&&Array.isArray(ent.ingredients)&&ent.ingredients[idx]!==undefined) ent.ingredients[idx]=T[l];
});

fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));
console.log('Fixed: turkish-eggs (removed GF tag), buckwheat-porridge (honey→maple). idx',idx);
