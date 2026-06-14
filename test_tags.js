// Menja Fresh — automated DIET + ALLERGEN tag test.
// Run:  node test_tags.js
//
// Validates, for every recipe (recipes_backup.json + new_recipes.json):
//   1. DIET CONTRADICTIONS (errors): a declared diet tag the ingredients break
//      e.g. "Vegan" but contains dairy, "Vegetarian" but contains chicken.
//   2. DIET COMPLETENESS (warnings): no animal products but NOT tagged veg/vegan.
//   3. APP ALLERGEN FALSE-POSITIVES: simulates app.html's exact keyword logic
//      (substring match) and flags where it over-matches (e.g. "coconut milk"
//      → Dairy) — these wrongly EXCLUDE safe dishes for allergy users.
const fs = require('fs');
const backup = JSON.parse(fs.readFileSync('recipes_backup.json','utf8'));
const newr   = JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const all = [...backup, ...newr];

const nm = x => typeof x==='string'?x:((x&&x.name)||'');
const text = r => [
  ...(r.ingredients||[]).map(i=>(i&&i.name)||''),
  ...(r.base_ingredients||[]).map(nm),
  ...(r.dressing||[]).map(nm),
].join(' | ').toLowerCase();
const diet = r => [...(r.diet||[]),...(r.tags||[])].map(x=>String(x).toLowerCase());

// ── precise detectors (word-boundary + plant-alternative exclusions) ──
const has = (t, words) => words.some(w => new RegExp('\\b'+w+'\\b','i').test(t));
const stripPlant = t => t
  .replace(/\b(coconut|almond|oat|soy|soya|rice|plant|cashew|hemp|pea)\s+milk\b/g,' ')
  .replace(/\b(peanut|almond|cashew|nut|sun(flower)?|seed|tahini)\s+butter\b/g,' ')
  .replace(/\b(almond|coconut|chickpea|corn|rice)\s+flour\b/g,' ')
  .replace(/\brice\s+noodles?\b/g,' ')
  .replace(/\bfish\s+sauce\b/g,' ')
  .replace(/\bbuckwheat\b/g,' ')
  .replace(/\beggplant\b/g,' ')
  .replace(/\bcoconut\s+(cream|yogurt|yoghurt)\b/g,' ');
// gluten hides inside compound words (flat-bread, whole-wheat), so match as substring
const hasGluten = t => GLUTEN.some(w=>t.includes(w));

const MEAT  = ['chicken','beef','pork','lamb','turkey','mince','bacon','ham','sausage','chorizo','prosciutto','duck','veal','salami','pepperoni','gammon','meatball','meatballs'];
const FISH  = ['salmon','tuna','cod','prawn','prawns','shrimp','crab','lobster','mussel','clam','scallop','anchovy','anchovies','sardine','sardines','mackerel','haddock','trout','squid','octopus','seafood','fish'];
const DAIRY = ['milk','butter','cream','cheese','feta','parmesan','mozzarella','ricotta','halloumi','yogurt','yoghurt','labneh','mascarpone','ghee','custard','burrata','stracciatella'];
const EGG   = ['egg','eggs'];
const HONEY = ['honey'];
const GLUTEN= ['wheat','flour','bread','breadcrumb','breadcrumbs','pasta','spaghetti','penne','rigatoni','macaroni','lasagne','lasagna','noodle','noodles','couscous','barley','bulgur','farro','pastry','cracker','tortilla','pita','pitta','soy sauce'];

function detect(r){
  const t = stripPlant(text(r));
  return {
    meat: has(t,MEAT), fish: has(t,FISH), dairy: has(t,DAIRY),
    egg: has(t,EGG), honey: has(t,HONEY), gluten: hasGluten(t),
  };
}

// ── app.html ALLERGENS (verbatim, substring match) for false-positive sim ──
const APP_ALLERGENS = [
  {id:'peanuts',kw:['peanut']},
  {id:'treenuts',kw:['almond','walnut','cashew','pecan','hazelnut','pistachio','pine nut','macadamia']},
  {id:'shellfish',kw:['prawn','shrimp','crab','lobster','mussel','clam','scallop']},
  {id:'fish',kw:['salmon','tuna','cod','anchov','sardine','mackerel','haddock','trout']},
  {id:'dairy',kw:['milk','cheese','butter','cream','yogurt','yoghurt','parmesan','feta','mozzarella','ricotta','halloumi']},
  {id:'eggs',kw:['egg']},
  {id:'gluten',kw:['wheat','flour','bread','pasta','noodle','couscous','barley','breadcrumb','lasagne']},
  {id:'soy',kw:['soy','tofu','edamame','miso','tempeh','tamari']},
];
const REFINED = { dairy:DAIRY, fish:FISH, gluten:GLUTEN, eggs:EGG };

let errors=[], warnings=[], fp=[];
all.forEach(r=>{
  const d = diet(r), x = detect(r);
  const isVegan = d.includes('vegan');
  const isVeg   = d.includes('vegetarian') || isVegan;
  const isPesc  = d.includes('pescatarian');
  const isGF    = d.includes('gluten-free')||d.includes('glutenfree')||d.includes('gf');

  // 1) CONTRADICTIONS
  if(isVeg && x.meat) errors.push(`${r.id}: tagged ${isVegan?'VEGAN':'VEGETARIAN'} but contains MEAT`);
  if(isVeg && x.fish) errors.push(`${r.id}: tagged ${isVegan?'VEGAN':'VEGETARIAN'} but contains FISH/SEAFOOD`);
  if(isVegan && x.dairy) errors.push(`${r.id}: tagged VEGAN but contains DAIRY`);
  if(isVegan && x.egg) errors.push(`${r.id}: tagged VEGAN but contains EGG`);
  if(isVegan && x.honey) errors.push(`${r.id}: tagged VEGAN but contains HONEY`);
  if(isPesc && x.meat) errors.push(`${r.id}: tagged PESCATARIAN but contains MEAT`);
  if(isGF && x.gluten) errors.push(`${r.id}: tagged GLUTEN-FREE but contains GLUTEN`);

  // 2) COMPLETENESS (missing tags)
  const noFlesh = !x.meat && !x.fish;
  const noAnimal = noFlesh && !x.dairy && !x.egg && !x.honey;
  if(noFlesh && !isVeg) warnings.push(`${r.id}: no meat/fish but NOT tagged Vegetarian (consider adding)`);
  if(noAnimal && !isVegan) warnings.push(`${r.id}: no animal products but NOT tagged Vegan (consider adding)`);
  if(!x.gluten && !isGF) warnings.push(`${r.id}: no gluten ingredients but NOT tagged Gluten-free`);

  // 3) APP FALSE-POSITIVES — verifies the fixed violatesAllergy() stripping
  //    (plant milk / nut butter / buckwheat etc. must NOT trigger dairy/gluten).
  const t = stripPlant(text(r));
  APP_ALLERGENS.forEach(a=>{
    const appHit = a.kw.some(k=>t.includes(k));
    if(!appHit) return;
    const ref = REFINED[a.id];
    if(ref){ const reallyHas = a.id==='gluten' ? hasGluten(stripPlant(t)) : has(stripPlant(t), ref);
      if(!reallyHas){ const k=a.kw.find(k=>t.includes(k)); fp.push(`${r.id}: app flags "${a.id}" via "${k}" but it's a plant alternative — FALSE POSITIVE (dish wrongly hidden from ${a.id}-allergy users)`); }
    }
  });
});

const dedup=a=>[...new Set(a)];
errors=dedup(errors); warnings=dedup(warnings); fp=dedup(fp);
console.log(`\n=== Menja tag test — ${all.length} recipes ===`);
console.log(`\n❌ DIET CONTRADICTIONS (${errors.length}) — must fix:`); errors.forEach(e=>console.log('  - '+e));
console.log(`\n🐞 APP ALLERGEN FALSE-POSITIVES (${fp.length}) — over-exclude safe dishes:`); fp.slice(0,30).forEach(e=>console.log('  - '+e)); if(fp.length>30)console.log(`  …and ${fp.length-30} more`);
console.log(`\n⚠️  COMPLETENESS hints (${warnings.length}):`); warnings.slice(0,25).forEach(w=>console.log('  - '+w)); if(warnings.length>25)console.log(`  …and ${warnings.length-25} more`);
console.log(`\n${errors.length===0?'✅ No diet contradictions — no meat/fish under veg, no dairy/egg under vegan, no gluten under GF.':'❌ '+errors.length+' contradictions to fix.'}`);
process.exit(errors.length?1:0);
