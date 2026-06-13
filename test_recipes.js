// Menja Fresh — automated recipe data consistency test.
// Run:  node test_recipes.js
// Checks the local source of truth (recipes_backup.json + recipes_i18n.json)
// for the kinds of inconsistencies that cause display bugs in the app.
const fs = require('fs');
const backup = JSON.parse(fs.readFileSync('recipes_backup.json', 'utf8'));
const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json', 'utf8'));

const FRAC = { '¼':0.25,'½':0.5,'¾':0.75,'⅓':1/3,'⅔':2/3,'⅛':0.125 };
const KNOWN_TEXT = /^(to taste|a pinch|pinch|all|some|handful|optional|as needed|q\.?s\.?|nach geschmack|al gusto|au go[uû]t)/i;
function chipAmount(chip){ const i=chip.lastIndexOf('·'); return i<0?null:chip.slice(i+1).trim(); }
function num(amount){
  if(amount==null) return null;
  let s=String(amount).trim(); if(!s) return null;
  let m=s.match(/^(\d+(?:[.,]\d+)?)\s*([¼½¾⅓⅔⅛]?)/);
  if(m) return parseFloat(m[1].replace(',','.'))+(m[2]?FRAC[m[2]]:0);
  let f=s.match(/^([¼½¾⅓⅔⅛])/); if(f) return FRAC[f[1]];
  return null;
}

let errors=[], warnings=[];
const LANGS=['es','fr','de'];

backup.forEach(r=>{
  const id=r.id, ent=i18n[id];
  // E: required fields
  ['title','steps','ingredients','nutrition','servings'].forEach(f=>{
    if(r[f]==null||(Array.isArray(r[f])&&!r[f].length)) errors.push(`${id}: missing/empty field "${f}"`);
  });
  if(!ent){ errors.push(`${id}: no i18n entry`); return; }
  // A: structural alignment
  const map=[['ingredients','ingredients'],['base_ingredients','base'],['dressing','dressing'],['steps','steps']];
  LANGS.forEach(l=>{
    if(!ent[l]){ errors.push(`${id}[${l}]: missing language`); return; }
    map.forEach(([en,tr])=>{
      const a=(r[en]||[]).length, b=(ent[l][tr]||[]).length;
      if(a!==b) errors.push(`${id}[${l}]: ${tr} count ${b} ≠ EN ${a}`);
    });
  });
  // D: step quality + F: parseable amounts (EN)
  (r.steps||[]).forEach((s,si)=>{
    if(!(s.title||'').trim()) errors.push(`${id}: step ${si+1} empty title`);
    if(!(s.text||'').trim()) errors.push(`${id}: step ${si+1} empty text`);
    if(/\b(and|with|the|for|to|a|of|&)$/i.test((s.title||'').trim())) warnings.push(`${id}: step ${si+1} fragment title "${s.title}"`);
    (s.ings||[]).forEach(c=>{
      const a=chipAmount(c);
      if(a && num(a)===null && !KNOWN_TEXT.test(a) && !/\d/.test(a)) warnings.push(`${id}: step ${si+1} unparseable chip amount "${c}"`);
    });
  });
  (r.ingredients||[]).forEach(ing=>{
    if(ing.amount && num(ing.amount)===null && !KNOWN_TEXT.test(ing.amount) && !/\d/.test(ing.amount)) warnings.push(`${id}: ingredient "${ing.name}" odd amount "${ing.amount}"`);
  });
  // C: i18n step-chip numeric amounts must match EN per position
  LANGS.forEach(l=>{
    if(!ent[l]||!ent[l].steps) return;
    (r.steps||[]).forEach((s,si)=>{
      const ts=ent[l].steps[si]; if(!ts) return;
      const en=(s.ings||[]), tr=(ts.ings||[]);
      if(en.length!==tr.length){ errors.push(`${id}[${l}]: step ${si+1} ings count ${tr.length} ≠ EN ${en.length}`); return; }
      en.forEach((c,ci)=>{
        const ea=num(chipAmount(c)), ta=num(chipAmount(tr[ci]));
        if(ea!=null && ta!=null && Math.abs(ea-ta)>0.001) errors.push(`${id}[${l}]: step ${si+1} chip ${ci+1} amount ${ta} ≠ EN ${ea}`);
      });
    });
  });
});

// G: serving-size sanity (warnings) — staple grams per person
const MIN={spaghetti:80,pasta:80,penne:80,rigatoni:80,rice:55,quinoa:50,couscous:50,bulgur:50,farro:50,lentil:55,noodle:70};
backup.forEach(r=>{
  const sv=r.servings||2;
  (r.ingredients||[]).forEach(ing=>{
    const n=(ing.name||'').toLowerCase(); const k=Object.keys(MIN).find(x=>n.includes(x)); if(!k) return;
    const g=(String(ing.amount).match(/(\d+)\s*g\b/)||[])[1]; if(!g) return;
    if(g/sv < MIN[k]) warnings.push(`${r.id}: ${ing.name} ${ing.amount} = ${Math.round(g/sv)}g/serving (low for ${sv}p, min ~${MIN[k]})`);
  });
});

console.log(`\n=== Menja recipe test — ${backup.length} recipes, ${Object.keys(i18n).length} i18n entries ===`);
console.log(`\n❌ ERRORS (${errors.length}):`); errors.forEach(e=>console.log('  - '+e));
console.log(`\n⚠️  WARNINGS (${warnings.length}):`); warnings.slice(0,40).forEach(w=>console.log('  - '+w));
if(warnings.length>40) console.log(`  …and ${warnings.length-40} more`);
console.log(`\n${errors.length===0?'✅ No hard errors — data is internally consistent.':'❌ '+errors.length+' errors to fix.'}`);
process.exit(errors.length?1:0);
