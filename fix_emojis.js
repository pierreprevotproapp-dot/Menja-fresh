// Normalise two emojis across ALL recipe data:
//   • sugar 🍬 (candy) → 🥄
//   • cream cheese 🧀 (yellow gouda wedge) → 🫙  (only for cream cheese, not feta/parmesan/etc.)
// Handles ingredient/dressing objects (emoji field) AND step chip strings
// ("🍬 Sugar · 100g", "🧀 Frischkäse · 400g") in every language.
const fs = require('fs');
const CREAM = /^(cream cheese|frischkäse|queso crema|fromage frais)$/i;

function fixStr(s){
  if(typeof s!=='string') return s;
  if(s.startsWith('🍬')) return '🥄'+s.slice(2);
  if(s.startsWith('🧀')){
    const rest=s.slice(2);
    const name=rest.replace(/^\s+/,'').split(' · ')[0].trim();
    if(CREAM.test(name)) return '🫙'+rest;
  }
  return s;
}
function walk(o){
  if(Array.isArray(o)) return o.map(walk);
  if(o && typeof o==='object'){
    if(o.emoji==='🍬') o.emoji='🥄';
    if(o.emoji==='🧀' && CREAM.test((o.name||'').trim())) o.emoji='🫙';
    for(const k in o) o[k]=walk(o[k]);
    return o;
  }
  return fixStr(o);
}

let total=0;
['new_recipes.json','recipes_backup.json','recipe_fixes.json','recipes_i18n.json'].forEach(f=>{
  if(!fs.existsSync(f)) return;
  const before=fs.readFileSync(f,'utf8');
  const data=walk(JSON.parse(before));
  const after=JSON.stringify(data,null,2);
  fs.writeFileSync(f,after);
  const sugar=(before.match(/🍬/g)||[]).length;
  console.log(`  ${f}: ${sugar} sugar emoji swapped`+(before!==after?'':' (no change)'));
  total+=sugar;
});
console.log(`Done. Sugar 🍬→🥄 and cream-cheese 🧀→🫙 normalised across all files.`);
