#!/usr/bin/env node
/**
 * Menja Fresh — end-to-end flow test (headless Chromium via Playwright).
 * Covers: boot/no-errors, i18n, bottom-nav + green sticky headers, onboarding CTA,
 * returning-user surfaces (gaps bar; welcome-back banner retired),
 * "repeat last week", plan redesign (day strip / day-by-day focus flow / clean week
 * list / cook-now on today), Track dashboard (rings, meal log, protein week),
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

const results = await page.evaluate(async () => {
  const R=[]; const ok=(name,cond,detail='')=>R.push({name,pass:!!cond,detail:String(detail)});
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
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
  const motivBtn=()=>document.querySelector('#cal-scroll [onclick="startWeekFlow()"]');
  ok('onboarding CTA: first-week copy', motivBtn()?.textContent==='✨ Meine erste Woche planen');
  ok('header: no second plan-week button', !document.getElementById('plan-generate-btn'));
  state.weekPickDone=true; renderPlan();
  ok('CTA reverts after first plan', motivBtn()?.textContent==='✨ Woche planen');

  state.plan={}; weekOffset=-1; getDateRange().forEach(d=>state.plan[dk(d)]={Dinner:{dishId:'d'+d.getDate(),adults:2,children:0}}); weekOffset=0;
  state.weekPickDone=false; showTab('plan');
  ok('repeat: button shown when last week planned', !!document.querySelector('#cal-scroll button[onclick="repeatLastWeek()"]'));
  repeatLastWeek();
  ok('repeat: copies 7 dinners to this week', weekPlacedCount()===7, 'placed='+weekPlacedCount());

  state.cookDays=[0,1,2,3,4,5,6]; state.skippedDays={}; state.returnNudgeSeen=null;
  state.plan={}; getDateRange().forEach(d=>state.plan[dk(d)]={Dinner:{dishId:'x'+d.getDate()}});
  _returnNudge=true; renderPlan();
  ok('nudge: welcome-back banner retired', document.getElementById('plan-return-nudge').innerHTML==='');
  ok('nudge: bento promo stays silent', document.getElementById('plan-bento-promo').innerHTML==='');
  delete state.plan[dk(new Date())]; state.confirmed={}; renderPlan();
  ok('nudge: gaps bar took over the fill-CTA', !!document.querySelector('.plan-gaps-bar'));

  // ── Plan redesign: popup → day-by-day focus flow (choose/skip) → clean week list ──
  for(let i=0;i<8;i++)DISHES.push({id:'ft'+i,emoji:'🥗',_title:'Flow Dish '+i,tags:['vegetarian'],meal:['Abendessen'],prep:10,cook:20,servings:2,nutrition:{kcal:600,protein:45,fat:20},ingredients:[],i18n:{de:{title:'Flow Dish '+i},en:{title:'Flow Dish '+i}}});
  state.plan={}; state.confirmed={}; state.skippedDays={}; state.cookDays=[]; state.weekPickDone=false; _returnNudge=false; planFocus=null;
  showTab('plan'); renderPlan();
  const week=getDateRange().map(d=>dk(d)); const tk=dk(new Date());
  const todayIdx=week.indexOf(tk);
  ok('strip: 7 day chips render', document.querySelectorAll('#plan-daystrip .dchip').length===7);
  ok('strip: past days greyed out', document.querySelectorAll('#plan-daystrip .dchip.past').length===todayIdx, 'past='+document.querySelectorAll('#plan-daystrip .dchip.past').length);
  openFirstWeek();
  ok('flow: first-week popup shows', document.getElementById('firstweek-bg').classList.contains('open'));
  document.querySelector('#firstweek-bg .weekpick-go').click();   // "Let's go" → day-by-day flow
  ok('flow: popup starts focus on first plannable day', !!document.querySelector('.pfocus') && planFocus===tk);
  ok('focus: choose AND skip buttons offered', !!document.querySelector('.pfocus-cta') && !!document.querySelector('.pfocus-skip'));
  const nameBefore=document.querySelector('.pfocus .pday-name').textContent;
  document.querySelector('.pfocus .pday-arrow.right').click();
  ok('focus: arrows swap the dish', document.querySelector('.pfocus .pday-name').textContent!==nameBefore);
  document.querySelector('.pfocus-cta').click(); await sleep(240);          // choose today
  ok('flow: choose advances to next day', planFocus===week[todayIdx+1] && !!document.querySelector('.pfocus'));
  document.querySelector('.pfocus-skip').click(); await sleep(240);         // skip tomorrow
  ok('flow: skip drops the day and moves on', state.skippedDays[week[todayIdx+1]]===true && planFocus===week[todayIdx+2]);
  ok('strip: ✓ and – states shown', document.querySelectorAll('#plan-daystrip .dchip.done').length===1 && document.querySelectorAll('#plan-daystrip .dchip.skipped').length===1);
  ok('focus: done-to-groceries exit offered', !!document.querySelector('.pfocus-exit.strong'));
  document.querySelector('.pfocus-exit.strong').click();                    // "I'm done — to my groceries"
  ok('flow: done lands on groceries', (document.querySelector('#app .screen.active')||{}).id==='screen-shopping' && planFocus===null);
  showTab('plan'); renderPlan();
  ok('list: only chosen days show', document.querySelectorAll('#cal-scroll .pday').length===1 && !!document.querySelector('#cal-scroll .prow-check.on'));
  ok('list: gaps bar continues the flow', !!document.querySelector('.plan-gaps-bar'));
  focusPlanDay(week[0]);                                                    // Monday is gone
  ok('flow: past day refuses planning', planFocus!==week[0]);
  dayStripTap(6);                                                           // Sunday: open → picker
  ok('strip: tap open day enters the picker', !!document.querySelector('.pfocus') && planFocus===week[6] && !!state.plan[week[6]][mainMealType()].dishId);
  exitFocus();
  ok('flow: leaving the picker removes the unchosen preview', !(state.plan[week[6]]&&state.plan[week[6]][mainMealType()]&&state.plan[week[6]][mainMealType()].dishId));
  ok('flow: no celebration popup, slim bars instead', !document.querySelector('#weekdone-bg.open'));
  ok('plan: no coach hint & no promo card', !document.querySelector('.plan-hint') && document.getElementById('plan-bento-promo').innerHTML==='');

  // ── Track tab: macro/microbiome dashboard ──
  state.plan={}; state.confirmed={}; state.cooked={}; state.macroGoals={kcal:1950,protein:140}; planFocus=null;
  state.plan[tk]={Dinner:{dishId:'ft0'},Breakfast:{dishId:'ft1'}};
  showTab('today'); renderToday();
  ok('track: nav renamed to Tracking', document.querySelector('#tab-today [data-t="navToday"]').textContent==='Tracking');
  ok('track: header is title+sub, no date/day-nav/plan-streak', document.getElementById('th-greet').textContent==='Makros & Mikrobiom' && !document.getElementById('th-date') && !document.querySelector('#screen-today [onclick^="todayNavDay"]') && !document.getElementById('streak-chip'));
  const bigBox=document.querySelector('.trk-ring.big')?.parentElement;
  ok('track: protein is the hero ring, planned macros pre-fill', bigBox?.querySelector('.trk-lbl')?.textContent==='Protein' && bigBox?.querySelector('.trk-v')?.textContent==='90g');
  ok('track: 3 rings + plants bar + meal log in cards', document.querySelectorAll('.trk-ring').length===3 && !!document.querySelector('.trk-pbar') && document.querySelectorAll('.trk-meal').length===2 && document.querySelectorAll('.trk-card').length===3);
  ok('track: microbiome link explained', /Darm|gut|intestin|intestino/i.test(document.querySelector('.trk-pexplain')?.textContent||''));
  document.querySelector('.trk-chk.off').click();
  ok('track: ticking a meal updates the log meta', document.querySelectorAll('.trk-chk.on').length===1 && [...document.querySelectorAll('.trk-sec h3 span')].some(x=>x.textContent.includes('1 / 2')));
  ok('track: protein week bars + goal line + average', document.querySelectorAll('.trk-bar').length===7 && !!document.querySelector('.trk-goal .lbl') && [...document.querySelectorAll('.trk-sec h3 span')].some(x=>/Ø \d+ g/.test(x.textContent)));

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
