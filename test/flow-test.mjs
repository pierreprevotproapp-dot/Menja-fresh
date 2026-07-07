#!/usr/bin/env node
/**
 * Menja Fresh — end-to-end flow test (headless Chromium via Playwright).
 * Covers: boot/no-errors, i18n, bottom-nav + green sticky headers, onboarding CTA,
 * returning-user routing & welcome-back nudge (planned/gaps/once-per-day),
 * "repeat last week", plan redesign (day strip / focus mode / clean week list),
 * Lunchbox (Bento) visibility/segment, recipe detail & whole-box,
 * and Bento→Groceries integration (quantities + 🍱 tag).
 *
 * Run:  node test/flow-test.mjs
 * Env:  APP_URL (default http://localhost:3000/app.html), PW (path to playwright)
 * Exit: 0 = all green & no page errors, 1 = failure.
 */
import pkg from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pkg;
const APP_URL = process.env.APP_URL || 'http://localhost:3000/app.html';
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const pageErrors=[];
page.on('pageerror', e => pageErrors.push('PAGEERROR: '+e.message));
page.on('console', m => { if(m.type()==='error' && !/Failed to load resource|net::ERR|ERR_/.test(m.text())) pageErrors.push('CONSOLE: '+m.text()); });
await page.goto(APP_URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

const results = await page.evaluate(() => {
  const R=[]; const ok=(name,cond,detail='')=>R.push({name,pass:!!cond,detail:String(detail)});
  const keep=new Set(['app','bento-sheet-bg','bento-recipe-bg']);
  [...document.body.children].forEach(el=>{if(!keep.has(el.id))el.style.display='none';});
  const app=document.getElementById('app'); app.style.display='block';
  const dk=d=>{const p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());};
  const NAV='rgb(26, 46, 31)';
  const bg=s=>{const e=document.querySelector(s);return e?getComputedStyle(e).backgroundColor:null;};

  lang='de'; applyLang();
  ok('i18n: nav Plan (de)', document.querySelector('#tab-plan [data-t="navPlan"]').textContent==='Planen');
  ok('i18n: guest banner localized (de)', /nicht gespeichert/.test(document.querySelector('[data-t="guestPlanTitle"]').textContent));
  lang='en'; applyLang();
  ok("i18n: guest banner localized (en)", /isn't saved/.test(document.querySelector('[data-t="guestPlanTitle"]').textContent));
  lang='de'; applyLang();

  const navTabs=[...document.querySelectorAll('#app .nav .nav-tab')];
  ok('nav: 5 base tabs, no bento tab', navTabs.length===5 && !document.getElementById('tab-bentokids'), 'count='+navTabs.length);
  const navR=document.querySelector('#app .nav').getBoundingClientRect();
  ok('nav: fixed at bottom', Math.round(navR.bottom)===Math.round(window.innerHeight));
  const hdrGreen=[['today','.th'],['shopping','.shop-top'],['recipes','.rec-hdr'],['family','.fam-hero']].every(([t,h])=>{showTab(t);return bg(`#screen-${t} ${h}`)===NAV;});
  ok('design: all tab headers are --nav green', hdrGreen);

  state.plan={}; state.weekPickDone=false; weekOffset=0; _returnNudge=false; showTab('plan');
  ok('onboarding CTA: first-week copy', document.getElementById('plan-generate-btn').textContent==='✨ Meine erste Woche planen');
  state.weekPickDone=true; renderPlan();
  ok('CTA reverts after first plan', document.getElementById('plan-generate-btn').textContent==='✨ Woche planen');

  state.plan={}; weekOffset=-1; getDateRange().forEach(d=>state.plan[dk(d)]={Dinner:{dishId:'d'+d.getDate(),adults:2,children:0}}); weekOffset=0;
  state.weekPickDone=false; showTab('plan');
  ok('repeat: button shown when last week planned', !!document.querySelector('#cal-scroll button[onclick="repeatLastWeek()"]'));
  repeatLastWeek();
  ok('repeat: copies 7 dinners to this week', weekPlacedCount()===7, 'placed='+weekPlacedCount());

  state.cookDays=[0,1,2,3,4,5,6]; state.skippedDays={}; state.returnNudgeSeen=null;
  state.plan={}; getDateRange().forEach(d=>state.plan[dk(d)]={Dinner:{dishId:'x'+d.getDate()}});
  _returnNudge=true; renderPlan();
  ok('nudge: planned variant -> shopping', /geplant/.test(document.querySelector('#plan-return-nudge .return-nudge-txt')?.textContent||'') && /Einkaufen/.test(document.querySelector('#plan-return-nudge .return-nudge-cta')?.textContent||''));
  ok('nudge: marks once-per-day', state.returnNudgeSeen===dk(new Date()));
  ok('nudge: suppresses bento promo', document.getElementById('plan-bento-promo').innerHTML==='');
  delete state.plan[dk(new Date())];
  _returnNudge=true; renderPlan();
  ok('nudge: gaps variant + singular', /Noch 1 Tag offen/.test(document.querySelector('#plan-return-nudge .return-nudge-txt')?.textContent||''));
  dismissReturnNudge();
  ok('nudge: dismiss clears it', document.querySelector('#plan-return-nudge .return-nudge')===null);

  // ── Plan redesign: day strip + focus mode + clean week list ──
  for(let i=0;i<8;i++)DISHES.push({id:'ft'+i,emoji:'🥗',_title:'Flow Dish '+i,tags:['vegetarian'],meal:['Abendessen'],prep:10,cook:20,servings:2,ingredients:[],i18n:{de:{title:'Flow Dish '+i},en:{title:'Flow Dish '+i}}});
  state.plan={}; state.confirmed={}; state.skippedDays={}; state.cookDays=[0,2,4]; state.weekPickDone=true; _returnNudge=false; planFocus=null;
  showTab('plan'); renderPlan();
  ok('strip: 7 day chips render', document.querySelectorAll('#plan-daystrip .dchip').length===7);
  weekPickSel=new Set([0,2,4]); confirmWeekPick();
  ok('focus: weekpick enters focus mode', !!document.querySelector('.pfocus') && /Tag 1 von 3/.test(document.querySelector('.pfocus-count')?.textContent||''));
  ok('strip: dots mark planned days', document.querySelectorAll('#plan-daystrip .dchip.filled').length===3);
  const nameBefore=document.querySelector('.pfocus .pday-name').textContent;
  document.querySelector('.pfocus .pday-arrow.right').click();
  ok('focus: arrows swap the dish', document.querySelector('.pfocus .pday-name').textContent!==nameBefore);
  for(let i=0;i<3;i++)document.querySelector('.pfocus-cta')?.click();
  ok('focus: choose-through lands in clean list', !document.querySelector('.pfocus') && document.querySelectorAll('#cal-scroll .prow-check.on').length===3);
  ok('list: week decided after focus flow', weekDecided());
  document.querySelector('#cal-scroll .prow-check.on').click();   // unlock one day
  ok('list: unconfirm reveals swap', !!document.querySelector('#cal-scroll .prow-swap'));
  document.querySelector('#cal-scroll .prow-swap').click();
  ok('list: swap re-enters focus', !!document.querySelector('.pfocus'));
  exitFocus();
  dayStripTap(6);   // Sunday: not a cook day, empty → should open the browse deck
  ok('strip: tap empty day opens browse', !!document.getElementById('ibrowse-card'));
  browseCancel();
  ok('plan: no coach hint & no promo card', !document.querySelector('.plan-hint') && document.getElementById('plan-bento-promo').innerHTML==='');

  state.family.children=0; state.showBentoTab=undefined; showTab('plan'); applyBentoTabVisibility();
  ok('lunchbox: hidden with no kids', getComputedStyle(document.getElementById('plan-seg')).display==='none');
  state.family.children=1; showTab('plan'); applyBentoTabVisibility();
  ok('lunchbox: segment shows with kids', getComputedStyle(document.getElementById('plan-seg')).display!=='none');
  document.querySelectorAll('#plan-seg .plan-seg-btn')[1].click();
  ok('lunchbox: segment routes to bento screen', (document.querySelector('#app .screen.active')||{}).id==='screen-bentokids');
  ok('lunchbox: Plan nav stays highlighted', document.getElementById('tab-plan').classList.contains('active'));

  const k=dk(new Date());
  bentoSurprise(k);
  const box=state.bentoPlan[k];
  const isCombo=BENTO_COMBOS.some(c=>['main','protein','veg','fruit','well'].every(s=>c[s]===box[s]));
  ok('bento: surprise fills a coherent combo', isCombo && Object.keys(box).length===5);
  openBentoRecipe(k,'main');
  ok('bento: tap compartment opens recipe (3 tabs)', document.querySelectorAll('#bento-recipe-body .rd-tab').length===3);
  setBentoRecipeTab('macro');
  ok('bento: macro tab has protein ring', !!document.querySelector('#bento-recipe-body .rd-tabpane[data-pane=macro] svg'));
  closeBentoRecipe();
  bentoBoxRecipe(k); setBentoRecipeTab('prep');
  const groups=document.querySelectorAll('#bento-recipe-body details.bento-prep-group');
  ok('bento: whole-box prep = 5 collapsible rows', groups.length===5 && [...groups].every(g=>!g.open));
  ok('bento: prep rows show a time pill', document.querySelectorAll('#bento-recipe-body .bento-prep-time').length>=4);
  closeBentoRecipe();

  state.plan={}; state.shopping={}; state.shoppingFrom=k;
  state.bentoDays={[k]:true}; state.bentoPlan={[k]:JSON.parse(JSON.stringify(BENTO_COMBOS[0]))};
  rebuildShopping();
  const items=Object.entries(state.shopping);
  ok('groceries: bento ingredients merged with tag', items.filter(([n,v])=>(v.source||'').includes('🍱')).length>=10);
  ok('groceries: quantities present', items.filter(([n,v])=>v.qty!=null).length===items.length && items.length>0);
  showTab('shopping');
  ok('groceries: tag rendered in list', document.querySelectorAll('#shop-container .bento-tag').length>=10);

  const passed=R.filter(r=>r.pass).length;
  return { total:R.length, passed, failed:R.length-passed, results:R };
});

console.log('\n===== FLOW TEST RESULTS =====');
for(const r of results.results) console.log((r.pass?'PASS':'FAIL')+' · '+r.name + (r.pass?'':('   [['+r.detail+']]')));
console.log(`\n${results.passed}/${results.total} passed, ${results.failed} failed`);
console.log('Page errors: '+(pageErrors.length?JSON.stringify(pageErrors,null,2):'none'));
await browser.close();
process.exit(results.failed===0 && pageErrors.length===0 ? 0 : 1);
