// Fix the 9 diet contradictions surfaced once base_ingredients + dressing are scanned.
const fs = require('fs');
const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const i18n   = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
let fixes = {}; try{ fixes = JSON.parse(fs.readFileSync('recipe_fixes.json','utf8')); }catch(e){}
const get = id => backup.find(r=>r.id===id);
const nm = x => typeof x==='string'?x:((x&&x.name)||'');
const setName = (x,v)=> typeof x==='string' ? v : Object.assign({},x,{name:v});

// Replace an ingredient value in base_ingredients|dressing (EN) + same index in i18n.
function swap(id, field, matchRe, newEN, tr){
  const r = get(id);
  const arr = r[field]||[];
  const idx = arr.findIndex(x=>matchRe.test(nm(x)));
  if(idx<0){ console.log('  ! not found',id,field,matchRe); return; }
  arr[idx] = setName(arr[idx], newEN);
  const il = field==='base_ingredients'?'base':'dressing';
  ['de','es','fr'].forEach(l=>{
    const ent=i18n[id]&&i18n[id][l];
    if(ent&&Array.isArray(ent[il])&&ent[il][idx]!==undefined) ent[il][idx]=setName(ent[il][idx], tr[l]);
  });
  fixes[id]=Object.assign(fixes[id]||{},{[field]:r[field]});
}
function dropGF(id){
  const r=get(id);
  r.diet=(r.diet||[]).filter(x=>!/gluten/i.test(x));
  r.tags=(r.tags||[]).filter(x=>!/gluten/i.test(x));
  fixes[id]=Object.assign(fixes[id]||{},{diet:r.diet,tags:r.tags});
}

const TAMARI={de:'Tamari',es:'Tamari',fr:'Tamari'};
// 1) soy sauce → tamari (genuinely gluten-free) — keep the GF tag, now correct
swap('herb-tofu-smashed-potatoes','dressing',/soy sauce/i,'Tamari',TAMARI);
swap('tuna-tataki-saffron-rice','dressing',/soy sauce/i,'Tamari',TAMARI);
swap('salmon-avocado-rice-bowl','dressing',/soy sauce/i,'Tamari',TAMARI);
swap('chicken-vegetable-stir-fry','dressing',/soy sauce/i,'Tamari',TAMARI);
swap('thai-peanut-quinoa-salad','base_ingredients',/soy sauce/i,'Tamari',TAMARI);

// 2) structural gluten → drop the GF claim
dropGF('miso-salmon-bok-choy');   // miso/soy commonly contain barley/wheat
dropGF('hummus-bowl-roasted-veg'); // flatbread

// 3) vegan fixes
swap('acai-bowl-granola-berries','base_ingredients',/honey/i,'Maple syrup (optional)',
  {de:'Ahornsirup (optional)',es:'Sirope de arce (opcional)',fr:'Sirop d\'érable (facultatif)'});
swap('apple-pie-pecan-oat-bowl','base_ingredients',/butter or coconut oil/i,'Coconut oil',
  {de:'Kokosöl',es:'Aceite de coco',fr:'Huile de coco'});

fs.writeFileSync('recipes_backup.json', JSON.stringify(backup,null,2));
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
fs.writeFileSync('recipe_fixes.json', JSON.stringify(fixes,null,2));
console.log('Applied tag fixes (soy→tamari ×5, GF dropped ×2, vegan fixes ×2).');
