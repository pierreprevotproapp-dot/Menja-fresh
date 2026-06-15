// Beetroot & Feta Tart — swap rocket → fresh dill (matches the classic look &
// the reference photo) and give it a realistic, photo-matching image prompt.
const fs = require('fs');
const ID = 'beetroot-feta-tart';
const nr = JSON.parse(fs.readFileSync('new_recipes.json','utf8'));
const i18n = JSON.parse(fs.readFileSync('recipes_i18n.json','utf8'));
const r = nr.find(x=>x.id===ID);
if(!r){ console.error('not found'); process.exit(1); }

// ingredient index 8 = rocket → fresh dill
const idx = r.ingredients.findIndex(i=>/rocket|rúcula|roquette|rucola/i.test(i.name));
if(idx>=0){ r.ingredients[idx]={emoji:'🌿',name:'Fresh dill',amount:'10g'}; }
r.mise_en_place = r.ingredients.slice();
// step 4 (finish) — use dill instead of rocket
const s4 = r.steps[r.steps.length-1];
s4.text = 'Bake at 190°C for 18–20 minutes until set and golden, then finish with fresh dill.';
s4.ings = ['🌿 Fresh dill · 10g'];
r.image_prompt = 'A rustic round beetroot and feta tart on a pale grey ceramic plate, golden crimped shortcrust edge, overlapping thin slices of deep crimson and pink beetroot, crumbled white feta, toasted walnut pieces and fresh dill scattered on top, one wedge cut and pulled slightly aside with a few crumbs on the plate, a linen napkin beside, overhead top-down shot, soft natural daylight, realistic editorial food photography, homemade, not over-stylised';
fs.writeFileSync('new_recipes.json', JSON.stringify(nr,null,2));

// i18n: dill name + step-4 text/chip
const DILL={de:'Dill',es:'Eneldo',fr:'Aneth'};
const S4={de:'Bei 190 °C 18–20 Minuten goldbraun backen, dann mit frischem Dill abschließen.',
          es:'Hornea a 190 °C 18–20 minutos hasta que cuaje y dore, y termina con eneldo fresco.',
          fr:'Cuire à 190 °C 18–20 minutes jusqu\'à ce que ce soit pris et doré, puis finir avec de l\'aneth frais.'};
const CHIP={de:'🌿 Dill · 10g',es:'🌿 Eneldo · 10g',fr:'🌿 Aneth · 10g'};
['de','es','fr'].forEach(l=>{const e=i18n[ID]&&i18n[ID][l];if(!e)return;
  if(Array.isArray(e.ingredients)&&idx>=0)e.ingredients[idx]=DILL[l];
  const st=e.steps[e.steps.length-1];if(st){st.text=S4[l];st.ings=[CHIP[l]];}
});
fs.writeFileSync('recipes_i18n.json', JSON.stringify(i18n,null,2));
console.log('Beetroot tart: rocket → fresh dill; photo-matching prompt set.');
