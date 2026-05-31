<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Menja Fresh</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#1A2E1F">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Menja Fresh">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
<meta name="description" content="Seasonal meal planning for your family. Discover dishes, plan your week, generate smart shopping lists.">
<script>
// Load Supabase with CDN fallback — if one CDN is slow, try another
(function(){
  var s=document.createElement('script');
  s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onerror=function(){
    var s2=document.createElement('script');
    s2.src='https://unpkg.com/@supabase/supabase-js@2';
    document.head.appendChild(s2);
  };
  document.head.appendChild(s);
})();
</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#F5F7F2;--surface:#fff;--surface2:#EEF1E8;
  --border:rgba(45,90,61,0.1);--border2:rgba(45,90,61,0.18);
  --text:#1A2214;--text2:#4A5E40;--text3:#8A9E82;
  --accent:#2D5A3D;--accent-l:#E0EDD8;--accent2:#C8622A;--danger:#C84040;
  --nav:#1A2E1F;--nav-t:#A8C8A0;--nav-a:#7EC87A;--gold:#F59E0B;
  --fd:'Playfair Display',Georgia,serif;--fb:'DM Sans',system-ui,sans-serif;
  --r:16px;--rsm:10px;--sh:0 2px 16px rgba(45,90,61,.1);--shl:0 8px 40px rgba(45,90,61,.18)
}
body{font-family:var(--fb);background:var(--bg);color:var(--text);max-width:480px;margin:0 auto;min-height:100vh}
.auth-screen{display:none;min-height:100vh;flex-direction:column}
.auth-screen.active{display:flex}
.auth-hero{background:var(--nav);padding:56px 28px 40px;text-align:center;border-radius:0 0 40px 40px}
.auth-hero-leaf{font-size:56px;margin-bottom:16px;display:block}
.auth-hero h1{font-family:var(--fd);font-size:32px;font-weight:500;color:#fff;margin-bottom:6px}
.auth-hero p{font-size:14px;color:var(--nav-t);line-height:1.5}
.auth-body{padding:28px 24px;flex:1}
.lang-row{display:flex;justify-content:center;gap:8px;margin-bottom:18px}
.lang-btn{background:none;border:2px solid transparent;border-radius:8px;font-size:22px;cursor:pointer;padding:3px 6px;transition:all .15s}
.lang-btn.active{border-color:var(--nav-a);background:rgba(126,200,122,.12)}
.auth-tabs{display:flex;background:var(--surface2);border-radius:99px;padding:4px;margin-bottom:24px}
.auth-tab{flex:1;text-align:center;padding:9px;border-radius:99px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;color:var(--text3)}
.auth-tab.active{background:var(--nav);color:var(--nav-a)}
.field{margin-bottom:16px}
.field label{display:block;font-size:11px;font-weight:600;color:var(--text2);margin-bottom:5px;text-transform:uppercase;letter-spacing:.06em}
.field input{width:100%;padding:13px 14px;border-radius:var(--rsm);border:1.5px solid var(--border2);background:var(--surface);font-size:14px;color:var(--text);font-family:var(--fb);outline:none;transition:border-color .15s}
.field input:focus{border-color:var(--accent)}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.auth-submit{width:100%;padding:15px;background:var(--nav);color:var(--nav-a);font-size:15px;font-weight:600;border:none;border-radius:99px;cursor:pointer;font-family:var(--fb);transition:all .2s;margin-top:8px}
.auth-submit:disabled{opacity:.6;cursor:not-allowed}
.social-btn{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px;border-radius:var(--rsm);border:1.5px solid var(--border2);background:var(--surface);font-size:14px;font-weight:500;color:var(--text);cursor:pointer;margin-top:12px}
.social-btn:hover{background:var(--surface2)}
.social-btn svg{width:20px;height:20px}
.auth-error{background:#FCEBEB;color:#791F1F;border-radius:var(--rsm);padding:10px 14px;font-size:13px;margin-bottom:12px;display:none;white-space:pre-line;line-height:1.55}
.auth-success{background:var(--accent-l);color:var(--accent);border-radius:var(--rsm);padding:10px 14px;font-size:13px;margin-bottom:12px;display:none}
.auth-guest{text-align:center;margin-top:20px;font-size:13px;color:var(--text3)}
.auth-guest a{color:var(--accent);cursor:pointer;font-weight:500}
/* ── PAYWALL ────────────────────────────────────── */
.paywall-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;align-items:flex-end;justify-content:center}
.paywall-bg.open{display:flex}
.paywall-sheet{background:var(--surface);border-radius:24px 24px 0 0;width:100%;max-width:480px;padding:0 0 36px;animation:su .25s ease;max-height:92vh;overflow-y:auto}
.paywall-handle{width:36px;height:4px;background:var(--border2);border-radius:99px;margin:12px auto 0}
.paywall-hero{text-align:center;padding:20px 24px 0}
.paywall-emoji{font-size:44px;margin-bottom:8px;display:block}
.paywall-title{font-family:var(--fd);font-size:22px;font-weight:500;color:var(--text);margin-bottom:6px}
.paywall-sub{font-size:13px;color:var(--text2);line-height:1.5;margin-bottom:20px}
.paywall-tiers{display:flex;gap:10px;padding:0 18px;margin-bottom:20px}
.paywall-tier{flex:1;border-radius:var(--r);border:2px solid var(--border2);padding:14px 10px;text-align:center;cursor:pointer;transition:all .2s;position:relative;background:var(--surface)}
.paywall-tier.selected{border-color:var(--accent);background:var(--accent-l)}
.paywall-tier-badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--accent2);color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:99px;white-space:nowrap}
.paywall-tier-price{font-family:var(--fd);font-size:22px;font-weight:500;color:var(--text);line-height:1}
.paywall-tier-period{font-size:10px;color:var(--text3);margin-top:2px}
.paywall-tier-save{font-size:10px;font-weight:600;color:var(--accent);margin-top:3px}
.paywall-features{padding:0 18px;margin-bottom:20px}
.paywall-feature{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:.5px solid var(--border)}
.paywall-feature:last-child{border-bottom:none}
.paywall-feature-icon{font-size:18px;flex-shrink:0;width:24px;text-align:center}
.paywall-feature-text{font-size:13px;color:var(--text);line-height:1.4;flex:1}
.paywall-feature-text strong{color:var(--accent)}
.paywall-cta{margin:0 18px;width:calc(100% - 36px);padding:16px;background:var(--nav);color:var(--nav-a);font-size:15px;font-weight:600;border:none;border-radius:99px;cursor:pointer;font-family:var(--fb);transition:all .2s}
.paywall-cta:hover{transform:translateY(-1px);box-shadow:var(--shl)}
.paywall-terms{text-align:center;font-size:10px;color:var(--text3);margin-top:10px;padding:0 18px;line-height:1.5}
.paywall-close{display:block;text-align:center;padding:12px 18px 0;font-size:13px;color:var(--text3);cursor:pointer}
/* ── LOCK BADGES ────────────────────────────────── */
.tier-lock{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:600;padding:3px 8px;border-radius:99px;cursor:pointer}
.tier-lock.registered{background:#E8F5E9;color:#2E7D32}
.tier-lock.premium{background:#FFF8E1;color:#F57F17}
#app{display:none}
.app-lang-bar{display:flex;align-items:center;gap:5px;padding:5px 16px 3px;background:var(--nav);justify-content:flex-end}
.app-lang-btn{background:none;border:1.5px solid transparent;border-radius:6px;font-size:17px;cursor:pointer;padding:2px 4px;opacity:.6;transition:all .12s}
.app-lang-btn.active{border-color:var(--nav-a);opacity:1}
.nav{position:sticky;top:0;background:var(--nav);z-index:300}
.nav-tabs{display:flex}
.nav-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 2px 8px;font-size:9px;font-weight:500;color:var(--nav-t);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;transition:all .2s;text-transform:uppercase;letter-spacing:.03em}
.nav-tab svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.7}
.nav-tab.active{color:var(--nav-a);border-bottom-color:var(--nav-a)}
.badge{background:var(--accent2);color:#fff;font-size:9px;font-weight:600;padding:1px 5px;border-radius:99px}
.screen{display:none;padding:0 0 88px}
.screen.active{display:block}
.user-bar{background:var(--nav);padding:10px 20px;display:flex;align-items:center;justify-content:space-between}
.user-bar-left{display:flex;align-items:center;gap:10px}
.user-avatar{width:32px;height:32px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:15px;border:2px solid var(--nav-a)}
.user-name{font-size:13px;font-weight:500;color:#fff}
.user-plan{font-size:10px;color:var(--nav-t);margin-top:1px}
.signout-btn{font-size:11px;color:var(--nav-t);background:rgba(255,255,255,.1);border:none;border-radius:99px;padding:5px 12px;cursor:pointer}
.sync-bar{background:var(--accent-l);padding:5px 20px;font-size:11px;color:var(--accent);display:none;align-items:center;gap:6px}
.sync-bar.show{display:flex}
.sync-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.fam-hero{background:var(--nav);padding:20px 20px 16px}
.fam-hero h1{font-family:var(--fd);font-size:22px;font-weight:500;color:#fff;margin-bottom:3px}
.fam-hero p{font-size:12px;color:var(--nav-t)}
.fam-section{padding:16px 20px 0}
.fam-section h3{font-family:var(--fd);font-size:15px;font-weight:500;margin-bottom:10px}
.fam-row{display:flex;align-items:center;justify-content:space-between;background:var(--surface);border-radius:var(--r);padding:12px 16px;margin-bottom:10px;border:.5px solid var(--border);box-shadow:var(--sh)}
.fam-row-left{display:flex;align-items:center;gap:12px}
.fam-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
.fam-avatar.adult{background:#E8F2EC}.fam-avatar.child{background:#FFF3E0}
.fam-label{font-size:13px;font-weight:500}.fam-sublabel{font-size:11px;color:var(--text3);margin-top:1px}
.fam-counter{display:flex;align-items:center;gap:10px}
.fam-count{font-family:var(--fd);font-size:22px;font-weight:500;min-width:26px;text-align:center}
.fam-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border2);background:var(--surface2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--text2);transition:all .15s}
.fam-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.fam-summary{margin:14px 20px;background:var(--nav);border-radius:var(--r);padding:13px 16px}
.fam-summary p{font-size:13px;color:var(--nav-t);line-height:1.6}
.fam-summary strong{color:var(--nav-a)}
.hero{background:var(--nav);padding:14px 20px 10px;border-bottom:1px solid rgba(126,200,122,.2)}
.hero h1{font-family:var(--fd);font-size:21px;font-weight:500;color:#fff;margin-bottom:2px}
.hero p{font-size:12px;color:var(--nav-t)}
.tag-wrap{padding:8px 16px;display:flex;gap:7px;overflow-x:auto;scrollbar-width:none}
.tag-wrap::-webkit-scrollbar{display:none}
.tag-pill{font-size:11px;font-weight:500;padding:5px 12px;border-radius:99px;background:var(--surface);color:var(--text2);border:.5px solid var(--border2);cursor:pointer;white-space:nowrap;transition:all .15s;flex-shrink:0}
.tag-pill.active{background:var(--nav);color:var(--nav-a);border-color:var(--nav)}
.swipe-hints{display:flex;justify-content:space-between;align-items:center;padding:0 20px 8px}
.hint{display:flex;align-items:center;gap:5px;font-size:12px;font-weight:500}
.hint-no{color:var(--danger)}.hint-yes{color:var(--accent)}
.done-btn{font-size:12px;font-weight:500;color:var(--text2);background:var(--surface2);border:.5px solid var(--border2);border-radius:99px;padding:5px 14px;cursor:pointer}
.swipe-area{padding:8px 20px;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.dish-card{background:var(--surface);border-radius:var(--r);box-shadow:var(--shl);width:100%;max-width:340px;overflow:hidden;cursor:grab;user-select:none;transition:transform .05s;position:relative}
.dish-card:active{cursor:grabbing}.dish-card.swiping{transition:none}
.dish-card.fly-l{transition:transform .32s ease,opacity .32s;transform:translateX(-140%) rotate(-20deg)!important;opacity:0}
.dish-card.fly-r{transition:transform .32s ease,opacity .32s;transform:translateX(140%) rotate(20deg)!important;opacity:0}
.dish-img{width:100%;height:196px;object-fit:cover;display:block;background:var(--surface2)}
.dish-fb{width:100%;height:196px;display:flex;align-items:center;justify-content:center;font-size:64px;background:var(--surface2)}
.swo{position:absolute;top:10px;left:10px;right:10px;display:flex;justify-content:space-between;pointer-events:none;z-index:2}
.swl{font-family:var(--fd);font-size:20px;font-weight:600;padding:5px 12px;border-radius:7px;border:3px solid;opacity:0;transition:opacity .12s;background:rgba(255,255,255,.88)}
.swl.no{color:var(--danger);border-color:var(--danger);transform:rotate(-8deg)}
.swl.yes{color:var(--accent);border-color:var(--accent);transform:rotate(8deg)}
.dish-credit{position:absolute;bottom:0;right:0;font-size:9px;color:rgba(255,255,255,.7);background:rgba(0,0,0,.28);padding:2px 6px;border-radius:4px 0 0 0}
.dish-rating-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.55);color:#fff;font-size:11px;font-weight:600;padding:3px 8px;border-radius:99px}
.di{padding:11px 14px 14px}
.dtags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px}
.tag{font-size:11px;font-weight:500;padding:2px 8px;border-radius:99px;background:var(--accent-l);color:var(--accent);border:.5px solid var(--border2)}
.dn{font-family:var(--fd);font-size:18px;font-weight:500;margin-bottom:2px;line-height:1.2}
.dd{font-size:12px;color:var(--text2);line-height:1.5}
.di-badges{display:flex;gap:5px;margin-top:6px;flex-wrap:wrap}
.hbadge{font-size:10px;font-weight:500;padding:2px 7px;border-radius:99px}
.hb-vegan{background:#E8F5E9;color:#2E7D32}.hb-veg{background:#F1F8E9;color:#558B2F}
.hb-gf{background:#FFF8E1;color:#F57F17}.hb-protein{background:#E8EAF6;color:#3949AB}
.swipe-btns{display:flex;justify-content:center;gap:22px;padding:6px 20px 4px}
.abtn{width:56px;height:56px;border-radius:50%;border:1.5px solid var(--border2);background:var(--surface);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--sh);transition:transform .15s}
.abtn:hover{transform:scale(1.08)}.abtn.no svg{stroke:var(--danger)}.abtn.yes svg{stroke:var(--accent)}
.abtn svg{width:24px;height:24px;fill:none;stroke-width:2}
.dpb{height:3px;background:rgba(45,90,61,.12);border-radius:99px;margin:6px 20px 0;overflow:hidden}
.dpf{height:100%;background:var(--accent);border-radius:99px;transition:width .4s}
.done-panel{text-align:center;padding:32px 20px}
.done-panel .em{font-size:48px;margin-bottom:10px}
.done-panel h2{font-family:var(--fd);font-size:20px;margin-bottom:6px}
.done-panel p{font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.5}
.done-btns{display:flex;flex-direction:column;gap:8px;align-items:center}
.btn-p{padding:10px 26px;background:var(--nav);color:var(--nav-a);border:none;border-radius:99px;font-size:13px;font-weight:500;cursor:pointer}
.btn-s{padding:9px 22px;background:none;color:var(--accent);border:1.5px solid var(--accent);border-radius:99px;font-size:12px;font-weight:500;cursor:pointer}
#screen-plan{padding:0}
.plan-layout{display:flex;flex-direction:column;height:calc(100vh - 50px);overflow:hidden}
.tray-hdr{padding:10px 16px 6px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.tray-hdr h2{font-family:var(--fd);font-size:16px;font-weight:500}.tray-hdr span{font-size:11px;color:var(--text3)}
.tray{display:flex;gap:9px;padding:0 16px 10px;overflow-x:auto;flex-shrink:0;scrollbar-width:none;border-bottom:.5px solid var(--border)}
.tray::-webkit-scrollbar{display:none}
.chip{flex-shrink:0;width:86px;border-radius:12px;overflow:hidden;background:var(--surface);border:.5px solid var(--border);box-shadow:var(--sh);cursor:grab;user-select:none;touch-action:none;transition:opacity .2s,transform .15s}
.chip:active{cursor:grabbing}.chip.dragging{transform:scale(1.06) rotate(2deg);box-shadow:var(--shl);opacity:.85;z-index:500}
.chip.used{opacity:.38;filter:grayscale(.4)}
.chip img{width:100%;height:58px;object-fit:cover;display:block}
.chip-fb{width:100%;height:58px;display:flex;align-items:center;justify-content:center;font-size:24px;background:var(--surface2)}
.chip-name{padding:4px 5px 5px;font-size:10px;font-weight:500;line-height:1.3;color:var(--text)}
.chip-use-count{font-size:9px;color:var(--accent);font-weight:600;padding:0 5px 4px}
.af-bar{display:flex;align-items:center;gap:8px;padding:7px 14px;background:var(--surface2);border-bottom:.5px solid var(--border);flex-shrink:0}
.af-bar span{font-size:11px;color:var(--text2);flex:1}
.af-btn{font-size:11px;font-weight:500;color:var(--nav-a);background:var(--nav);border:none;border-radius:99px;padding:4px 12px;cursor:pointer}
.cl-btn{font-size:11px;font-weight:500;color:var(--text3);background:none;border:.5px solid var(--border2);border-radius:99px;padding:4px 10px;cursor:pointer}
.cal-scroll{flex:1;overflow-y:auto;padding:8px 12px 20px}
.cal-day{margin-bottom:7px;border-radius:var(--r);background:var(--surface);border:.5px solid var(--border);overflow:hidden}
.cal-hdr{display:flex;align-items:center;gap:10px;padding:9px 13px;cursor:pointer;user-select:none;transition:background .15s}
.cal-hdr:hover{background:var(--surface2)}
.cal-date{display:flex;flex-direction:column;align-items:center;width:34px;flex-shrink:0}
.cal-dow{font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.06em;color:var(--text3)}
.cal-num{font-family:var(--fd);font-size:19px;font-weight:500;color:var(--text);line-height:1}
.cal-hdr.today .cal-num{color:var(--accent)}
.cal-summary{flex:1;min-width:0}
.cal-pills{display:flex;gap:4px;flex-wrap:wrap;margin-top:2px}
.cal-pill{font-size:10px;font-weight:500;padding:2px 7px;border-radius:99px;background:var(--accent-l);color:var(--accent);white-space:nowrap}
.cal-hint{font-size:11px;color:var(--text3)}
.cal-chev{color:var(--text3);transition:transform .22s;font-size:17px;flex-shrink:0}
.cal-chev.open{transform:rotate(90deg)}
.exp-dot{width:7px;height:7px;background:var(--danger);border-radius:50%;flex-shrink:0}
.cal-slots{display:none;border-top:.5px solid var(--border)}.cal-slots.open{display:block}
.cal-slot{display:flex;align-items:center;gap:9px;padding:8px 13px;border-bottom:.5px solid var(--border);min-height:54px;transition:background .15s;position:relative}
.cal-slot:last-child{border-bottom:none}
.cal-slot.drop-target{background:var(--accent-l)}
.cal-slot.drop-target::after{content:'Drop here';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:var(--accent);border:2px dashed var(--accent);pointer-events:none;opacity:.7}
.slot-type{font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);width:52px;flex-shrink:0}
.slot-content{flex:1;display:flex;align-items:center;gap:8px;min-width:0}
.slot-thumb{width:36px;height:36px;border-radius:7px;object-fit:cover;flex-shrink:0}
.slot-thumb-em{width:36px;height:36px;border-radius:7px;flex-shrink:0;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:17px}
.slot-name{font-family:var(--fd);font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.slot-empty{font-size:11px;color:var(--text3);font-style:italic}
.slot-warn{font-size:9px;font-weight:500;background:#FCEBEB;color:#791F1F;padding:1px 5px;border-radius:99px;flex-shrink:0}
.slot-right{display:flex;align-items:center;gap:5px;flex-shrink:0}
.guest-counter{display:flex;align-items:center;gap:3px;background:var(--surface2);border-radius:99px;padding:2px 5px;border:.5px solid var(--border2)}
.gc-btn{width:18px;height:18px;border-radius:50%;border:none;background:none;cursor:pointer;font-size:14px;color:var(--text2);display:flex;align-items:center;justify-content:center}
.gc-label{font-size:10px;font-weight:600;color:var(--text);min-width:24px;text-align:center}
.slot-rm{width:22px;height:22px;border-radius:50%;background:var(--surface2);border:.5px solid var(--border2);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:13px;color:var(--text3);transition:background .1s}
.slot-rm:hover{background:var(--danger);color:#fff}
.picker-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:400;align-items:flex-end;justify-content:center}
.picker-bg.open{display:flex}
.picker-modal{background:var(--surface);border-radius:20px 20px 0 0;width:100%;max-width:480px;padding:0 0 28px;animation:su .22s ease}
@keyframes su{from{transform:translateY(100%)}to{transform:translateY(0)}}
.p-handle{width:34px;height:4px;background:var(--border2);border-radius:99px;margin:10px auto 0}
.p-preview{display:flex;align-items:center;gap:12px;padding:14px 20px 8px}
.p-img{width:48px;height:48px;border-radius:9px;object-fit:cover;flex-shrink:0}
.p-img-em{width:48px;height:48px;border-radius:9px;flex-shrink:0;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:22px}
.p-name{font-family:var(--fd);font-size:15px;font-weight:500}.p-sub{font-size:11px;color:var(--text3);margin-top:2px}
.p-q{font-size:13px;color:var(--text2);padding:2px 20px 10px}
.p-opts{display:flex;flex-direction:column}
.p-opt{display:flex;align-items:center;gap:13px;padding:13px 20px;cursor:pointer;border-top:.5px solid var(--border);transition:background .1s}
.p-opt:hover{background:var(--surface2)}
.p-ico{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.p-ico.breakfast{background:#FFF8E6}.p-ico.lunch{background:var(--accent-l)}.p-ico.dinner{background:#EEF0F8}
.p-lbl{font-size:14px;font-weight:500;flex:1}.p-sl{font-size:11px;color:var(--text3);margin-top:1px}
.p-cancel{display:block;text-align:center;padding:13px 20px 0;font-size:13px;color:var(--text3);cursor:pointer}
.shop-hdr{padding:18px 20px 4px;display:flex;align-items:center;justify-content:space-between}
.shop-hdr h1{font-family:var(--fd);font-size:22px;font-weight:500}
.cbtn{font-size:13px;color:var(--text3);cursor:pointer;background:none;border:none}
.shop-sub-tabs{display:flex;background:var(--surface2);border-radius:99px;padding:3px;margin:4px 16px 10px}
.shop-stab{flex:1;text-align:center;padding:7px 6px;border-radius:99px;font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;color:var(--text3)}
.shop-stab.active{background:var(--nav);color:var(--nav-a)}
.prog-wrap{padding:8px 20px 12px}
.prog-bar{height:4px;background:var(--border);border-radius:99px;overflow:hidden;margin-bottom:5px}
.prog-fill{height:100%;background:var(--accent);border-radius:99px;transition:width .3s}
.prog-txt{font-size:12px;color:var(--text2)}
.scat{margin:0 14px 7px;border-radius:var(--rsm);overflow:hidden;border:.5px solid var(--border);background:var(--surface)}
.scat-hdr{display:flex;align-items:center;gap:9px;padding:10px 13px;cursor:pointer;user-select:none}
.cico{font-size:17px;width:24px;text-align:center;flex-shrink:0}
.clbl{font-size:13px;font-weight:500;flex:1;color:var(--text)}.ccount{font-size:11px;color:var(--text3)}
.cchev{color:var(--text3);transition:transform .2s;font-size:15px}.cchev.open{transform:rotate(90deg)}
.scat-items{display:none;border-top:.5px solid var(--border)}.scat-items.open{display:block}
.sitem{display:flex;align-items:center;gap:10px;padding:9px 13px;cursor:pointer;border-bottom:.5px solid var(--border);transition:background .1s}
.sitem:last-child{border-bottom:none}.sitem:active{background:var(--surface2)}
.schk{width:21px;height:21px;border-radius:6px;border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:var(--surface)}
.schk.checked{background:var(--accent);border-color:var(--accent)}
.schk.checked::after{content:'';width:9px;height:5px;border-left:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(-45deg) translate(1px,-1px)}
.sitem-mid{flex:1;min-width:0}.sitem-name{font-size:14px;color:var(--text)}
.sitem-name.checked{color:var(--text3);text-decoration:line-through}.sitem-src{font-size:11px;color:var(--text3);margin-top:1px}
.sitem-right{display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0}
.sitem-qty{font-size:12px;font-weight:600;color:var(--accent);white-space:nowrap}
.ep{font-size:11px;font-weight:500;padding:2px 7px;border-radius:99px;white-space:nowrap}
.ep-ok{background:#EAF3DE;color:#27500A}.ep-soon{background:#FAEEDA;color:#633806}.ep-urgent{background:#FCEBEB;color:#791F1F}
.pantry-bdg{font-size:9px;color:var(--accent);font-weight:600;margin-left:5px;background:var(--accent-l);padding:1px 5px;border-radius:99px}
.gen-section{padding:8px 14px 0}
.gen-stitle{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);margin-bottom:7px;padding-top:4px}
.gen-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.gen-item{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rsm);padding:10px 5px 8px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;transition:all .15s;position:relative;text-align:center}
.gen-item.on{background:var(--accent-l);border-color:var(--accent)}
.gen-item.on::after{content:'✓';position:absolute;top:4px;right:5px;font-size:9px;color:var(--accent);font-weight:700}
.gen-icon{font-size:26px;line-height:1.1}
.gen-name{font-size:10px;font-weight:500;color:var(--text);line-height:1.25}
/* ── FRIDGE SCANNER ─────────────────────────── */
.fridge-hero{background:var(--nav);padding:20px 20px 16px}
.fridge-hero h1{font-family:var(--fd);font-size:22px;font-weight:500;color:#fff;margin-bottom:3px}
.fridge-hero p{font-size:12px;color:var(--nav-t);line-height:1.5}
.fridge-upload-zone{margin:14px 16px;border:2px dashed var(--border2);border-radius:var(--r);padding:28px 20px;text-align:center;cursor:pointer;transition:all .2s;background:var(--surface);position:relative}
.fridge-upload-zone:hover,.fridge-upload-zone.drag{border-color:var(--accent);background:var(--accent-l)}
.fridge-upload-zone input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.fridge-upload-icon{font-size:40px;margin-bottom:8px}
.fridge-upload-title{font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px}
.fridge-upload-sub{font-size:12px;color:var(--text3)}
.fridge-preview{margin:0 16px 12px;border-radius:var(--r);overflow:hidden;position:relative}
.fridge-preview img{width:100%;max-height:220px;object-fit:cover;display:block;border-radius:var(--r)}
.fridge-preview-remove{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.55);color:#fff;border:none;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
.fridge-scan-btn{margin:0 16px 14px;width:calc(100% - 32px);padding:14px;background:var(--nav);color:var(--nav-a);border:none;border-radius:99px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--fb);display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity .2s}
.fridge-scan-btn:disabled{opacity:.5;cursor:not-allowed}
.fridge-scanning{margin:0 16px 14px;background:var(--surface);border-radius:var(--r);padding:20px;text-align:center;display:none}
.fridge-scanning.show{display:block}
.fridge-scan-anim{font-size:32px;animation:float 1.2s ease-in-out infinite;display:block;margin-bottom:8px}
.fridge-scan-msg{font-size:13px;color:var(--text2)}
.fridge-results{padding:0 16px 20px}
.fridge-results-title{font-family:var(--fd);font-size:16px;font-weight:500;margin-bottom:10px}
.fridge-ingredients{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.fridge-ing-chip{font-size:12px;font-weight:500;padding:4px 10px;border-radius:99px;background:var(--accent-l);color:var(--accent);border:.5px solid var(--border2)}
.fridge-ing-chip.missing{background:#FFF3E0;color:#E65100;border-color:#FFB74D}
.fridge-recipe-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:10px;cursor:pointer;transition:box-shadow .15s}
.fridge-recipe-card:hover{box-shadow:var(--sh)}
.fridge-recipe-inner{display:flex;align-items:center}
.fridge-recipe-ph{width:78px;height:72px;object-fit:cover;flex-shrink:0}
.fridge-recipe-ph-em{width:78px;height:72px;display:flex;align-items:center;justify-content:center;font-size:32px;background:var(--surface2);flex-shrink:0}
.fridge-recipe-info{padding:10px 12px;flex:1;min-width:0}
.fridge-recipe-name{font-family:var(--fd);font-size:14px;font-weight:500;margin-bottom:3px}
.fridge-recipe-match{font-size:11px;color:var(--accent);font-weight:500}
.fridge-recipe-missing{font-size:11px;color:var(--text3);margin-top:2px}
.fridge-recipe-arr{padding-right:12px;color:var(--text3);font-size:18px}
.fridge-ai-recipe{background:var(--surface);border:.5px solid var(--border);border-radius:var(--r);padding:14px 16px;margin-bottom:10px}
.fridge-ai-badge{font-size:10px;font-weight:600;background:linear-gradient(135deg,var(--accent),#5B8A6A);color:#fff;padding:2px 8px;border-radius:99px;display:inline-block;margin-bottom:6px}
.fridge-ai-name{font-family:var(--fd);font-size:15px;font-weight:500;margin-bottom:4px}
.fridge-ai-desc{font-size:12px;color:var(--text2);line-height:1.5;margin-bottom:8px}
.fridge-ai-ings{display:flex;flex-wrap:wrap;gap:4px}
.fridge-empty{padding:40px 20px;text-align:center;color:var(--text3);font-size:13px;line-height:1.6}
.fridge-empty span{display:block;font-size:40px;margin-bottom:10px}
.fridge-section-lbl{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--text3);margin-bottom:8px;margin-top:4px}
/* ── RECIPE LIST ───────────────────────────────── */
.rec-hdr{padding:18px 20px 8px}
.rec-hdr h1{font-family:var(--fd);font-size:22px;font-weight:500}.rec-hdr p{font-size:13px;color:var(--text2);margin-top:3px}
.rec-grid{padding:0 14px 8px}
.rec-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:10px;cursor:pointer;transition:box-shadow .2s,transform .15s;box-shadow:var(--sh)}
.rec-card:hover{box-shadow:var(--shl);transform:translateY(-1px)}
.rec-card-img{width:100%;height:160px;object-fit:cover;display:block}
.rec-card-img-em{width:100%;height:160px;display:flex;align-items:center;justify-content:center;font-size:56px;background:var(--surface2)}
.rec-card-body{padding:12px 14px 14px}
.rec-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:4px}
.rec-card-name{font-family:var(--fd);font-size:16px;font-weight:500;line-height:1.2;flex:1}
.rec-card-time{display:flex;align-items:center;gap:3px;font-size:11px;color:var(--text3);flex-shrink:0}
.rec-card-sub{font-size:12px;color:var(--text3);margin-bottom:8px;line-height:1.4}
.rec-card-footer{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.rec-time-chip{display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text2);background:var(--surface2);border-radius:99px;padding:3px 9px;border:.5px solid var(--border)}
.empty-rec{padding:40px 20px;text-align:center;color:var(--text3);font-size:14px}
.empty-rec span{display:block;font-size:36px;margin-bottom:10px}
/* ── RECIPE DETAIL ─────────────────────────────── */
.rd-back{display:flex;align-items:center;gap:6px;padding:14px 20px 0;cursor:pointer;color:var(--accent);font-size:13px;font-weight:500}
.rd-back svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2}
.rd-hero{position:relative}
.rd-img{width:100%;height:220px;object-fit:cover;display:block}
.rd-img-em{width:100%;height:220px;display:flex;align-items:center;justify-content:center;font-size:80px;background:var(--surface2)}
.rd-hero-overlay{position:absolute;bottom:0;left:0;right:0;padding:16px 18px 14px;background:linear-gradient(transparent,rgba(0,0,0,.65))}
.rd-hero-title{font-family:var(--fd);font-size:22px;font-weight:500;color:#fff;line-height:1.2;margin-bottom:2px}
.rd-hero-sub{font-size:12px;color:rgba(255,255,255,.8)}
.rd-body{padding:0 0 20px}
.rd-meta-strip{display:flex;gap:0;border-bottom:.5px solid var(--border)}
.rd-meta-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:12px 6px;border-right:.5px solid var(--border)}
.rd-meta-item:last-child{border-right:none}
.rd-meta-val{font-family:var(--fd);font-size:16px;font-weight:500;color:var(--text)}
.rd-meta-lbl{font-size:10px;color:var(--text3);margin-top:2px;text-align:center}
.rd-tags-wrap{display:flex;gap:5px;flex-wrap:wrap;padding:12px 16px 4px}
.rd-servings{display:flex;align-items:center;gap:10px;background:var(--surface2);border-radius:99px;padding:7px 16px;margin:8px 16px 4px;width:fit-content}
.rd-srv-label{font-size:12px;color:var(--text2)}
.rd-srv-count{font-family:var(--fd);font-size:15px;font-weight:500;min-width:26px;text-align:center}
.rd-srv-btn{width:26px;height:26px;border-radius:50%;border:1.5px solid var(--border2);background:var(--surface);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;color:var(--text2);transition:all .15s}
.rd-srv-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.rd-section{padding:14px 16px 0}
.rd-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:10px}
/* Ingredient grid */
.rd-ing-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
.rd-ing-item{display:flex;align-items:center;gap:9px;background:var(--surface2);border-radius:var(--rsm);padding:8px 10px;border:.5px solid var(--border)}
.rd-ing-emoji{font-size:20px;flex-shrink:0;width:26px;text-align:center}
.rd-ing-mid{flex:1;min-width:0}
.rd-ing-name{font-size:12px;font-weight:500;color:var(--text);line-height:1.3}
.rd-ing-amt{font-size:11px;color:var(--accent);font-weight:600;margin-top:1px}
/* Base ingredients row */
.rd-base{display:flex;flex-wrap:wrap;gap:5px;padding:8px 16px 0}
.rd-base-chip{font-size:11px;color:var(--text3);background:var(--surface2);border-radius:99px;padding:3px 10px;border:.5px solid var(--border)}
/* Steps */
.rd-step-card{background:var(--surface);border:.5px solid var(--border);border-radius:var(--rsm);margin-bottom:8px;overflow:hidden}
.rd-step-hdr{display:flex;align-items:center;gap:10px;padding:11px 13px}
.rd-step-num{width:24px;height:24px;border-radius:50%;background:var(--nav);color:var(--nav-a);font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rd-step-title{font-size:13px;font-weight:600;color:var(--text);flex:1}
.rd-step-body{padding:0 13px 12px}
.rd-step-txt{font-size:13px;color:var(--text2);line-height:1.55;margin-bottom:6px}
.rd-step-ings{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px}
.rd-step-ing{font-size:11px;color:var(--accent);background:var(--accent-l);border-radius:99px;padding:2px 9px;border:.5px solid var(--border2)}
.rd-step-tip{display:flex;gap:7px;background:#FFFBEC;border-radius:var(--rsm);padding:7px 10px;border:.5px solid #F0E68C}
.rd-step-tip-icon{font-size:13px;flex-shrink:0;margin-top:1px}
.rd-step-tip-txt{font-size:11px;color:#856404;line-height:1.5}
.rd-step-kids{display:flex;gap:7px;background:#E8F5E9;border-radius:var(--rsm);padding:7px 10px;margin-top:5px;border:.5px solid #A5D6A7}
.rd-step-kids-txt{font-size:11px;color:#2E7D32;line-height:1.5}
/* Nutrition */
.rd-nut{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:4px}
.rd-nitem{background:var(--nav);border-radius:var(--rsm);padding:9px 4px;text-align:center}
.rd-nval{font-family:var(--fd);font-size:14px;font-weight:500;color:var(--nav-a)}
.rd-nlbl{font-size:9px;color:#A8C8A0;margin-top:2px}
/* Rate button */
.rd-rate-btn{display:flex;align-items:center;gap:8px;margin:14px 16px 0;padding:12px 16px;background:var(--surface2);border-radius:var(--r);cursor:pointer;border:.5px solid var(--border);width:calc(100% - 32px);font-family:var(--fb)}
.rd-rate-btn span{font-size:13px;color:var(--text2);flex:1;text-align:left}
.mini-star{font-size:16px;color:#ddd}.mini-star.filled{color:var(--gold)}
.rate-modal{background:var(--surface);border-radius:20px 20px 0 0;width:100%;max-width:480px;padding:0 0 28px;animation:su .22s ease}
.rate-preview{display:flex;align-items:center;gap:12px;padding:16px 20px 12px}
.rate-img{width:52px;height:52px;border-radius:10px;object-fit:cover;flex-shrink:0}
.rate-img-em{width:52px;height:52px;border-radius:10px;flex-shrink:0;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:26px}
.rate-title{font-family:var(--fd);font-size:16px;font-weight:500}.rate-sub{font-size:12px;color:var(--text3);margin-top:2px}
.rate-body{padding:0 20px 4px;text-align:center}
.rate-body p{font-size:14px;color:var(--text2);margin-bottom:14px}
.rate-stars{display:flex;justify-content:center;gap:8px;margin-bottom:16px}
.rate-star{font-size:36px;cursor:pointer;transition:transform .1s;color:#ddd}
.rate-star.filled{color:var(--gold)}.rate-star:hover{transform:scale(1.2)}
.rate-submit{width:100%;padding:13px;background:var(--nav);color:var(--nav-a);border:none;border-radius:99px;font-size:14px;font-weight:500;cursor:pointer;margin-top:4px}
.rate-skip{display:block;text-align:center;padding:12px 20px 0;font-size:13px;color:var(--text3);cursor:pointer}
.th{padding:20px 20px 12px;background:var(--nav);border-radius:0 0 22px 22px;margin-bottom:4px}
.th-date{font-size:11px;opacity:.6;margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em;color:var(--nav-t)}
.th h1{font-family:var(--fd);font-size:25px;font-weight:500;line-height:1.1;color:#fff}
.tm{padding:12px 20px}
.tmeal{background:var(--surface);border-radius:var(--r);border:.5px solid var(--border);margin-bottom:10px;overflow:hidden;box-shadow:var(--sh);cursor:pointer;transition:box-shadow .15s}
.tmeal:hover{box-shadow:var(--shl)}
.tmeal-time{padding:9px 13px 0;font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);display:flex;align-items:center;justify-content:space-between}
.tmeal-guests{font-size:10px;color:var(--accent);font-weight:500}
.tmeal-img{width:100%;height:120px;object-fit:cover;display:block;margin-top:6px}
.tmeal-fb{width:100%;height:120px;display:flex;align-items:center;justify-content:center;font-size:48px;background:var(--surface2);margin-top:6px}
.tmeal-foot{padding:9px 13px 12px;display:flex;align-items:center;justify-content:space-between}
.tmeal-name{font-family:var(--fd);font-size:16px;font-weight:500;margin-bottom:2px}
.tmeal-arrow{color:var(--text3);font-size:18px}
.tempty{background:var(--surface2);border:1.5px dashed var(--border2);border-radius:var(--r);padding:20px;text-align:center;margin-bottom:10px}
.tempty p{font-size:13px;color:var(--text3)}
.go-btn{display:inline-block;margin-top:8px;padding:7px 16px;background:var(--nav);color:var(--nav-a);border-radius:99px;font-size:13px;font-weight:500;cursor:pointer;border:none}
#ghost{position:fixed;pointer-events:none;z-index:9999;opacity:.92;width:86px;border-radius:12px;overflow:hidden;background:var(--surface);border:.5px solid var(--border);box-shadow:var(--shl);transform:rotate(3deg) scale(1.06);display:none}
#ghost img{width:100%;height:58px;object-fit:cover}
#ghost .chip-name{padding:4px 5px 5px;font-size:10px;font-weight:500}
.loading-screen{position:fixed;inset:0;background:var(--nav);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity .4s}
/* Hard fallback — if loading screen is still showing after 8s, hide it */
@keyframes loadingTimeout{0%,87.5%{opacity:1;pointer-events:all}100%{opacity:0;pointer-events:none}}
.loading-screen{animation:loadingTimeout 8s forwards}
.loading-screen.hide{opacity:0;pointer-events:none}
.loading-leaf{font-size:52px;margin-bottom:16px;animation:float 2s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.loading-text{font-family:var(--fd);font-size:24px;color:#fff;margin-bottom:8px}
.loading-sub{font-size:13px;color:var(--nav-t)}
</style>
</head>
<body>
<div class="loading-screen" id="loading"><div class="loading-leaf">🌿</div><div class="loading-text">Menja Fresh</div><div class="loading-sub" id="loading-sub">Loading...</div></div>
<div class="auth-screen" id="auth-screen">
  <div class="auth-hero"><span class="auth-hero-leaf">🌿</span><h1>Menja Fresh</h1><p id="auth-tagline">Seasonal · Whole foods · Plant-forward</p></div>
  <div class="auth-body">
    <div class="lang-row" id="auth-lang-row"></div>
    <div class="auth-tabs">
      <div class="auth-tab active" id="tab-signin" onclick="switchAuthTab('signin')" data-t="signin">Sign in</div>
      <div class="auth-tab" id="tab-signup" onclick="switchAuthTab('signup')" data-t="signup">Create account</div>
    </div>
    <div id="auth-error" class="auth-error"></div>
    <div id="auth-success" class="auth-success"></div>

    <!-- SIGN IN -->
    <div id="form-signin">
      <div class="field"><label data-t="email">Email</label><input type="email" id="si-email" autocomplete="email"></div>
      <div class="field"><label data-t="password">Password</label><input type="password" id="si-pass" autocomplete="current-password"></div>
      <button class="auth-submit" id="si-btn" onclick="signIn()" data-t="signinBtn">Sign in →</button>
      <div style="display:flex;align-items:center;gap:10px;margin:14px 0 10px"><div style="flex:1;height:1px;background:var(--border2)"></div><span style="font-size:11px;color:var(--text3)">or</span><div style="flex:1;height:1px;background:var(--border2)"></div></div>
      <div class="social-btn" onclick="signInWithGoogle()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        <span data-t="googleBtn">Continue with Google</span>
      </div>
      <div class="social-btn" onclick="signInWithApple()" style="margin-top:8px">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        <span data-t="appleBtn">Continue with Apple</span>
      </div>
      <div class="social-btn" onclick="signInWithFacebook()" style="margin-top:8px">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        <span>Continue with Facebook</span>
      </div>
      <div class="auth-guest" style="margin-top:18px">
        <a onclick="continueAsGuest()" style="display:block;text-align:center;padding:10px;border-radius:99px;border:1.5px solid var(--border2);font-size:13px;font-weight:500;color:var(--text2)">👤 <span data-t="guestLink">Continue as guest</span></a>
        <div style="font-size:11px;color:var(--text3);text-align:center;margin-top:7px" data-t="guestLimits">Guest access: 4 dishes · 3-day planner</div>
      </div>
    </div>

    <!-- SIGN UP -->
    <div id="form-signup" style="display:none">
      <div style="background:var(--accent-l);border-radius:var(--rsm);padding:10px 13px;margin-bottom:16px;font-size:12px;color:var(--accent);line-height:1.5">
        🎉 <strong data-t="freeAccountTitle">Free account</strong> — <span data-t="freeAccountDesc">10 dishes, full week planner, sync across devices</span>
      </div>
      <div class="field-row">
        <div class="field"><label data-t="firstName">First name</label><input type="text" id="su-fname" autocomplete="given-name"></div>
        <div class="field"><label data-t="lastName">Last name</label><input type="text" id="su-lname" autocomplete="family-name"></div>
      </div>
      <div class="field"><label data-t="email">Email</label><input type="email" id="su-email" autocomplete="email"></div>
      <div class="field"><label data-t="password">Password</label><input type="password" id="su-pass" autocomplete="new-password" placeholder="Min. 8 characters"></div>
      <button class="auth-submit" id="su-btn" onclick="signUp()" data-t="createAccountBtn">Create free account →</button>
      <div style="display:flex;align-items:center;gap:10px;margin:14px 0 10px"><div style="flex:1;height:1px;background:var(--border2)"></div><span style="font-size:11px;color:var(--text3)">or</span><div style="flex:1;height:1px;background:var(--border2)"></div></div>
      <div class="social-btn" onclick="signInWithGoogle()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        <span data-t="googleBtn">Sign up with Google</span>
      </div>
      <div class="social-btn" onclick="signInWithApple()" style="margin-top:8px">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        <span data-t="appleBtn">Sign up with Apple</span>
      </div>
      <div class="auth-guest" style="margin-top:14px;text-align:center;font-size:13px;color:var(--text3)">
        <span data-t="haveAccount">Already have an account?</span> <a onclick="switchAuthTab('signin')" data-t="signinLink" style="color:var(--accent);font-weight:500">Sign in →</a>
      </div>
    </div>
  </div>
</div>
<div id="app">
  <div class="user-bar"><div class="user-bar-left"><div class="user-avatar" id="user-avatar">🌿</div><div><div class="user-name" id="user-name">Loading...</div><div class="user-plan" id="user-plan">guest</div></div></div><button class="signout-btn" onclick="signOut()" data-t="signOut">Sign out</button></div>
  <div class="sync-bar" id="sync-bar"><div class="sync-dot"></div><span data-t="syncing">Syncing...</span></div>
  <div class="app-lang-bar" id="app-lang-bar"></div>
  <nav class="nav"><div class="nav-tabs">
    <button class="nav-tab active" onclick="showTab('family')" id="tab-family"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg><span data-t="navFamily">Family</span></button>
    <button class="nav-tab" onclick="showTab('discover')" id="tab-discover"><svg viewBox="0 0 24 24"><path d="M12 3l1.45 3.97L17.5 7l-2.88 2.72.77 4-3.39-1.96L8.61 13.72l.77-4L6.5 7l4.05-.03z"/></svg><span data-t="navDiscover">Discover</span></button>
    <button class="nav-tab" onclick="showTab('plan')" id="tab-plan"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span data-t="navPlanner">Planner</span></button>
    <button class="nav-tab" onclick="showTab('shopping')" id="tab-shopping"><svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><span data-t="navShop">Shop</span><span class="badge" id="shopping-badge" style="display:none">0</span></button>
    <button class="nav-tab" onclick="showTab('fridge')" id="tab-fridge"><svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="8" y1="6" x2="8" y2="8"/><line x1="8" y1="14" x2="8" y2="18"/></svg><span data-t="navFridge">Fridge</span></button>
    <button class="nav-tab" onclick="showTab('recipes')" id="tab-recipes"><svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg><span data-t="navRecipes">Recipes</span></button>
    <button class="nav-tab" onclick="showTab('today')" id="tab-today"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg><span data-t="navToday">Today</span></button>
  </div></nav>
  <div class="screen active" id="screen-family">
    <div class="fam-hero"><h1 data-t="famTitle">🏡 My Family</h1><p data-t="famSub">Recipes and portions adjust automatically</p></div>
    <div class="fam-section"><h3 data-t="whoAtTable">Who's at the table?</h3>
      <div class="fam-row"><div class="fam-row-left"><div class="fam-avatar adult">👨</div><div><div class="fam-label" data-t="adults">Adults</div><div class="fam-sublabel" data-t="fullPortions">Full portions</div></div></div><div class="fam-counter"><div class="fam-btn" onclick="adjFamily('adults',-1)">−</div><div class="fam-count" id="adults-count">2</div><div class="fam-btn" onclick="adjFamily('adults',1)">+</div></div></div>
      <div class="fam-row"><div class="fam-row-left"><div class="fam-avatar child">👧</div><div><div class="fam-label" data-t="children">Children</div><div class="fam-sublabel" data-t="threeQuarter">¾ adult portion</div></div></div><div class="fam-counter"><div class="fam-btn" onclick="adjFamily('children',-1)">−</div><div class="fam-count" id="children-count">0</div><div class="fam-btn" onclick="adjFamily('children',1)">+</div></div></div>
    </div>
    <div class="fam-summary" id="fam-summary"></div>
    <div style="margin:0 20px;background:var(--accent-l);border-radius:var(--rsm);padding:12px 14px;font-size:12px;color:var(--text2);line-height:1.5" data-t="famTip">💡 You can adjust guests per meal in the Planner.</div>
  </div>
  <div class="screen" id="screen-discover">
    <div class="hero"><h1>🌿 Menja Fresh</h1><p data-t="discoverSub">Seasonal · Whole foods · Plant-forward</p></div>
    <div class="tag-wrap" id="tag-filters"></div>
    <div class="swipe-hints"><div class="hint hint-no"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span data-t="skip">Skip</span></div><button class="done-btn" onclick="showDonePanel()" data-t="doneForNow">Done for now ✓</button><div class="hint hint-yes"><span data-t="addIt">Add it</span> <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div></div>
    <div class="swipe-area"><div class="dish-card" id="dish-card"><div class="swo"><div class="swl no" id="lbl-no">SKIP</div><div class="swl yes" id="lbl-yes">ADD!</div></div><div id="dish-img-wrap"></div><div class="di"><div class="dtags" id="dish-tags"></div><div class="dn" id="dish-name"></div><div class="dd" id="dish-desc"></div><div class="di-badges" id="dish-badges"></div></div></div><div style="display:none" id="done-panel" class="done-panel"><div class="em" id="done-em">✅</div><h2 id="done-title"></h2><p id="done-body"></p><div class="done-btns"><button class="btn-p" onclick="showTab('plan')" data-t="planMyWeek">Plan my week →</button><button class="btn-s" onclick="continueSwiping()" data-t="keepBrowsing">Keep browsing</button></div></div></div>
    <div class="swipe-btns" id="swipe-btns"><button class="abtn no" onclick="swipeCard('left')"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><button class="abtn yes" onclick="swipeCard('right')"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></button></div>
    <div class="dpb"><div class="dpf" id="dpf" style="width:0%"></div></div>
  </div>
  <div class="screen" id="screen-plan"><div class="plan-layout"><div class="tray-hdr"><h2 data-t="yourMeals">Your meals</h2><span data-t="dragHint">Drag onto a day</span></div><div class="tray" id="tray"></div><div class="af-bar"><span id="plan-status"></span><button class="af-btn" onclick="autoFill()" data-t="autoFill">Auto-fill</button><button class="cl-btn" onclick="clearPlan()" data-t="clearAll">Clear</button></div><div class="cal-scroll" id="cal-scroll"></div></div></div>
  <div class="screen" id="screen-shopping">
    <div class="shop-hdr"><h1 data-t="shoppingList">Shopping list</h1><button class="cbtn" onclick="clearChecked()" data-t="clearTicked">Clear ticked</button></div>
    <div class="shop-sub-tabs"><div class="shop-stab active" id="stab-menu" onclick="switchShopTab('menu')" data-t="fromMenu">From Menu</div><div class="shop-stab" id="stab-generic" onclick="switchShopTab('generic')" data-t="genericItems">Generic Items</div></div>
    <div id="shop-menu-panel"><div class="prog-wrap"><div class="prog-bar"><div class="prog-fill" id="prog-fill" style="width:0%"></div></div><div class="prog-txt" id="prog-txt"></div></div><div id="shop-container"></div></div>
    <div id="shop-generic-panel" style="display:none"><div id="gen-container"></div></div>
  </div>
  <div class="screen" id="screen-fridge">
    <div class="fridge-hero">
      <h1 data-t="fridgeTitle">📷 Fridge Scanner</h1>
      <p data-t="fridgeSub">Take a photo of your fridge — AI identifies ingredients and suggests recipes</p>
    </div>
    <div id="fridge-api-bar" style="margin:10px 16px 0;display:none">
      <div style="background:var(--surface2);border-radius:var(--rsm);padding:10px 12px;border:.5px solid var(--border2)">
        <div style="font-size:11px;font-weight:600;color:var(--text2);margin-bottom:6px;text-transform:uppercase;letter-spacing:.06em">Anthropic API Key</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="password" id="fridge-api-input" placeholder="sk-ant-..." style="flex:1;padding:8px 10px;border-radius:var(--rsm);border:1.5px solid var(--border2);font-size:12px;font-family:var(--fb);outline:none;background:var(--surface)">
          <button onclick="saveApiKey()" style="padding:8px 12px;background:var(--nav);color:var(--nav-a);border:none;border-radius:var(--rsm);font-size:12px;font-weight:600;cursor:pointer">Save</button>
        </div>
        <div style="font-size:10px;color:var(--text3);margin-top:5px">Get a key at <a href="https://console.anthropic.com" target="_blank" style="color:var(--accent)">console.anthropic.com</a> — stored only on your device</div>
      </div>
    </div>
    <div class="fridge-upload-zone" id="fridge-upload-zone" onclick="document.getElementById('fridge-file-input').click()">
      <div class="fridge-upload-icon">📸</div>
      <div class="fridge-upload-title" data-t="fridgeUploadTitle">Tap to take or upload a photo</div>
      <div class="fridge-upload-sub" data-t="fridgeUploadSub">Works with fridge photos, pantry shots, or any food image</div>
      <input type="file" id="fridge-file-input" accept="image/*" capture="environment" onchange="handleFridgeImage(event)" style="display:none">
    </div>
    <div id="fridge-preview-wrap" style="display:none">
      <div class="fridge-preview">
        <img id="fridge-preview-img" src="" alt="Fridge photo">
        <button class="fridge-preview-remove" onclick="clearFridgeImage()">×</button>
      </div>
    </div>
    <button class="fridge-scan-btn" id="fridge-scan-btn" onclick="scanFridge()" disabled>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <span data-t="fridgeScanBtn">Identify ingredients & find recipes</span>
    </button>
    <div class="fridge-scanning" id="fridge-scanning">
      <span class="fridge-scan-anim">🔍</span>
      <div class="fridge-scan-msg" id="fridge-scan-msg">Scanning your fridge...</div>
    </div>
    <div class="fridge-results" id="fridge-results" style="display:none"></div>
  </div>
  <div class="screen" id="screen-recipes"><div id="rec-list-view"><div class="rec-hdr"><h1 data-t="recipes">Recipes</h1><p data-t="recipesSub">Tap any saved dish for the full recipe</p></div><div class="tag-wrap" id="rec-tag-filters" style="padding-bottom:8px"></div><div class="rec-grid" id="rec-grid"></div></div><div id="rec-detail-view" style="display:none"></div></div>
  <div class="screen" id="screen-today"><div class="th"><div class="th-date" id="th-date"></div><h1 id="th-greet"></h1></div><div class="tm" id="tm"></div></div>
</div>
<!-- PAYWALL MODAL -->
<div class="paywall-bg" id="paywall-bg" onclick="event.target===this&&closePaywall()">
  <div class="paywall-sheet">
    <div class="paywall-handle"></div>
    <div class="paywall-hero">
      <span class="paywall-emoji">⭐</span>
      <div class="paywall-title">Unlock Premium</div>
      <div class="paywall-sub">Everything you need for stress-free, healthy family meals — every week.</div>
    </div>
    <div class="paywall-tiers">
      <div class="paywall-tier selected" id="ptier-monthly" onclick="selectPaywallTier('monthly')">
        <div class="paywall-tier-price">€4.99</div>
        <div class="paywall-tier-period">per month</div>
      </div>
      <div class="paywall-tier" id="ptier-yearly" onclick="selectPaywallTier('yearly')">
        <div class="paywall-tier-badge">BEST VALUE</div>
        <div class="paywall-tier-price">€44</div>
        <div class="paywall-tier-period">per year</div>
        <div class="paywall-tier-save">Save 27%</div>
      </div>
    </div>
    <div class="paywall-features">
      <div class="paywall-feature"><span class="paywall-feature-icon">🍽️</span><div class="paywall-feature-text"><strong>All 12+ recipes</strong> — new dishes added every month</div></div>
      <div class="paywall-feature"><span class="paywall-feature-icon">📅</span><div class="paywall-feature-text"><strong>Multi-week planner</strong> — plan up to 4 weeks ahead</div></div>
      <div class="paywall-feature"><span class="paywall-feature-icon">🛒</span><div class="paywall-feature-text"><strong>Smart shopping list</strong> — auto-generated from your plan</div></div>
      <div class="paywall-feature"><span class="paywall-feature-icon">📷</span><div class="paywall-feature-text"><strong>Fridge Scanner</strong> — AI identifies ingredients from a photo</div></div>
      <div class="paywall-feature"><span class="paywall-feature-icon">☁️</span><div class="paywall-feature-text"><strong>Sync across all devices</strong> — family members share the plan</div></div>
      <div class="paywall-feature"><span class="paywall-feature-icon">🌍</span><div class="paywall-feature-text"><strong>5 languages</strong> — EN, FR, ES, PT, DE</div></div>
    </div>
    <button class="paywall-cta" id="paywall-cta-btn" onclick="startCheckout()">Start Premium — €4.99/month</button>
    <div class="paywall-terms">Cancel anytime. Secure payment. No hidden fees.</div>
    <div class="paywall-close" onclick="closePaywall()">Maybe later</div>
  </div>
</div>

<div id="ghost"><div id="ghost-img"></div><div class="chip-name" id="ghost-name"></div></div>
<div class="picker-bg" id="picker-bg"><div class="picker-modal"><div class="p-handle"></div><div class="p-preview" id="p-preview"></div><div class="p-q" id="p-q"></div><div class="p-opts" id="p-opts"></div><div class="p-cancel" onclick="closePicker()" data-t="cancel">Cancel</div></div></div>
<div class="picker-bg" id="rate-bg"><div class="rate-modal"><div class="p-handle"></div><div class="rate-preview" id="rate-preview"></div><div class="rate-body"><p data-t="rateQ">How did you enjoy this meal?</p><div class="rate-stars" id="rate-stars"></div><button class="rate-submit" onclick="submitRating()" data-t="saveRating">Save rating</button></div><div class="rate-skip" onclick="closeRating()" data-t="skip">Skip</div></div></div>
<script>

// ═══════════════════════════════════════════════════
// SUPABASE
// ═══════════════════════════════════════════════════
const SUPA_URL='https://ekuynkjtcvpiueollznp.supabase.co';
const SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdXlua2p0Y3ZwaXVlb2xsem5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODExNTUsImV4cCI6MjA5NTQ1NzE1NX0.rOdHlfIyu6tjzhmexXs25maNVkckCmck-UEhSgM0rEY';
// Wait for supabase library to load before creating client
let sb;
function initSupabase(){
  if(typeof supabase==='undefined'){
    setTimeout(initSupabase,50);
    return;
  }
  sb=supabase.createClient(SUPA_URL,SUPA_KEY);
  init(); // Start app once Supabase is ready
}
// Don't call init() at bottom — initSupabase handles it

// ── Anthropic API key (stored locally, never sent to our servers) ──
function getApiKey(){try{return localStorage.getItem('menja_api_key')||'';}catch(e){return '';}}
function setApiKey(k){try{localStorage.setItem('menja_api_key',k.trim());}catch(e){}}

// ═══════════════════════════════════════════════════
// I18N
// ═══════════════════════════════════════════════════
const LANGS=[
  {code:'en',flag:'🇬🇧'},
  {code:'fr',flag:'🇫🇷'},
  {code:'es',flag:'🇪🇸'},
  {code:'pt',flag:'🇵🇹'},
  {code:'de',flag:'🇩🇪'},
];
let lang='en';

const TR={
en:{
  signin:'Sign in',signup:'Create account',email:'Email',password:'Password',
  signinBtn:'Sign in →',createAccountBtn:'Create account →',googleBtn:'Continue with Google',
  noAccount:'No account?',guestLink:'Continue as guest →',
  haveAccount:'Already have an account?',signinLink:'Sign in →',
  choosePlan:'Choose your plan',
  firstName:'First name',lastName:'Last name',
  navFamily:'Family',navDiscover:'Discover',navPlanner:'Planner',navShop:'Shop',
  navFridge:'Fridge',navRecipes:'Recipes',navToday:'Today',
  famTitle:'🏡 My Family',famSub:'Recipes and portions adjust automatically',
  whoAtTable:"Who's at the table?",adults:'Adults',children:'Children',
  fullPortions:'Full portions',threeQuarter:'¾ adult portion',
  famTip:'💡 You can adjust guests per meal in the Planner.',
  discoverSub:'Seasonal · Whole foods · Plant-forward',
  skip:'Skip',addIt:'Add it',doneForNow:'Done for now ✓',
  planMyWeek:'Plan my week →',keepBrowsing:'Keep browsing',
  yourMeals:'Your meals',dragHint:'Drag onto a day',autoFill:'Auto-fill',clearAll:'Clear',
  shoppingList:'Shopping list',clearTicked:'Clear ticked',
  fromMenu:'From Menu',genericItems:'Generic Items',
  myPantry:'My Pantry',pantryIntro:'Track what you have at home. Items update when you tick off your shopping list.',
  pantryEmpty:'Your pantry is empty. Items appear here automatically when you check things off your shopping list.',
  recipes:'Recipes',recipesSub:'Tap any saved dish for the full recipe',
  cancel:'Cancel',rateQ:'How did you enjoy this meal?',saveRating:'Save rating',
  signOut:'Sign out',syncing:'Syncing...',
  cookingFor:'Cooking for',and:'and',adults2:'adults',adult:'adult',children2:'children',child:'child',
  person:'person',people:'people',
  recipesFor:'Recipes show quantities for',servings:'servings',
  mealsScheduled:'meals scheduled',openDay:'Open a day to assign meals',
  of:'of',itemsReady:'items ready',
  goodMorning:'Good morning! 🌱',goodAfternoon:'Good afternoon! 🌿',goodEvening:'Good evening! 🍃',
  noBreakfast:'No breakfast planned',noLunch:'No lunch planned',noDinner:'No dinner planned',
  planIt:'Plan it →',allReviewed:'All reviewed!',savedDishes:'dishes saved',
  nothingSaved:'Nothing saved yet — swipe right on dishes you love.',
  moreToBrowse:'more dishes to browse.',readyToPlan:'Ready to plan your week?',
  dishSaved:'dish saved',dishesSaved:'dishes saved',
  assignMeal:'Assign to which meal?',
  rateRecipe:'Rate this recipe',updateRating:'Update your rating',
  clearPlanConfirm:'Clear all meals?',saveFirst:'Save some dishes in Discover first!',
  servingLabel:'Servings',ingredients:'Ingredients',method:'Method',
  nutritionPer:'Nutrition per serving',kcal:'kcal',protein:'Protein',carbs:'Carbs',fat:'Fat',
  allRecipes:'All recipes',loadingKitchen:'Loading your kitchen...',
  fridgeTitle:'📷 Fridge Scanner',fridgeSub:'Photo your fridge — AI spots ingredients and suggests recipes',fridgeUploadTitle:'Tap to take or upload a photo',fridgeUploadSub:'Fridge, pantry or any food photo works',fridgeScanBtn:'Find recipes from my fridge',fridgeScanning:'Scanning your fridge...',fridgeAnalysing:'Analysing ingredients...',fridgeGenerating:'Finding matching recipes...',fridgeFoundTitle:'Found in your fridge',fridgeMatchTitle:'Recipes you can make',fridgeAiTitle:'AI recipe idea',fridgeNeedAlso:'Also need:',fridgeCanMake:'You have all ingredients!',fridgeTryAnother:'Scan another photo',
  genericIntro:'Tap items to add to your list',inPantry:'In pantry',
  appleBtn:'Continue with Apple',guestLimits:'Guest: 4 dishes · 3-day planner',freeAccountTitle:'Free account',freeAccountDesc:'10 dishes, full week planner, sync across devices',premiumCTA:"Unlock Premium",
},
fr:{
  signin:'Se connecter',signup:'Créer un compte',email:'E-mail',password:'Mot de passe',
  signinBtn:'Se connecter →',createAccountBtn:'Créer un compte →',googleBtn:'Continuer avec Google',
  noAccount:'Pas de compte ?',guestLink:'Continuer en invité →',
  haveAccount:'Déjà un compte ?',signinLink:'Se connecter →',
  choosePlan:'Choisissez votre formule',
  firstName:'Prénom',lastName:'Nom',
  navFamily:'Famille',navDiscover:'Découvrir',navPlanner:'Planifier',navShop:'Courses',
  navFridge:'Frigo',navRecipes:'Recettes',navToday:"Aujourd'hui",
  famTitle:'🏡 Ma Famille',famSub:'Les quantités s\'adaptent automatiquement',
  whoAtTable:'Qui est à table ?',adults:'Adultes',children:'Enfants',
  fullPortions:'Portions complètes',threeQuarter:'¾ de portion adulte',
  famTip:'💡 Vous pouvez ajuster les invités par repas dans le Planificateur.',
  discoverSub:'Saisonnier · Aliments entiers · Végétal',
  skip:'Ignorer',addIt:'Ajouter',doneForNow:"Terminé pour l'instant ✓",
  planMyWeek:'Planifier ma semaine →',keepBrowsing:'Continuer à parcourir',
  yourMeals:'Vos repas',dragHint:'Glisser sur un jour',autoFill:'Auto-remplir',clearAll:'Effacer',
  shoppingList:'Liste de courses',clearTicked:'Effacer cochés',
  fromMenu:'Du menu',genericItems:'Articles généraux',
  myPantry:'Mon Garde-manger',pantryIntro:'Suivez ce que vous avez à la maison. Les articles se mettent à jour quand vous cochez votre liste.',
  pantryEmpty:'Votre garde-manger est vide. Les articles apparaissent automatiquement quand vous cochez votre liste.',
  recipes:'Recettes',recipesSub:'Appuyez sur un plat sauvegardé pour la recette complète',
  cancel:'Annuler',rateQ:'Comment avez-vous apprécié ce repas ?',saveRating:'Enregistrer',
  signOut:'Se déconnecter',syncing:'Synchronisation...',
  cookingFor:'Cuisine pour',and:'et',adults2:'adultes',adult:'adulte',children2:'enfants',child:'enfant',
  person:'personne',people:'personnes',
  recipesFor:'Recettes pour',servings:'portions',
  mealsScheduled:'repas planifiés',openDay:'Ouvrez un jour pour assigner des repas',
  of:'sur',itemsReady:'articles prêts',
  goodMorning:'Bonjour ! 🌱',goodAfternoon:'Bon après-midi ! 🌿',goodEvening:'Bonsoir ! 🍃',
  noBreakfast:'Pas de petit-déjeuner planifié',noLunch:'Pas de déjeuner planifié',noDinner:'Pas de dîner planifié',
  planIt:'Planifier →',allReviewed:'Tout vu !',savedDishes:'plats sauvegardés',
  nothingSaved:'Rien de sauvegardé — glissez vers la droite les plats que vous aimez.',
  moreToBrowse:'plats restants.',readyToPlan:'Prêt à planifier votre semaine ?',
  dishSaved:'plat sauvegardé',dishesSaved:'plats sauvegardés',
  assignMeal:'Ajouter à quel repas ?',
  rateRecipe:'Noter cette recette',updateRating:'Mettre à jour la note',
  clearPlanConfirm:'Effacer tous les repas ?',saveFirst:'Sauvegardez d\'abord des plats dans Découvrir !',
  servingLabel:'Portions',ingredients:'Ingrédients',method:'Méthode',
  nutritionPer:'Nutrition par portion',kcal:'kcal',protein:'Protéines',carbs:'Glucides',fat:'Lipides',
  allRecipes:'Toutes les recettes',loadingKitchen:'Chargement de votre cuisine...',
  fridgeTitle:'📷 Scanner Frigo',fridgeSub:"Photo de votre frigo — l'IA détecte les ingrédients",fridgeUploadTitle:'Appuyez pour prendre ou télécharger une photo',fridgeUploadSub:'Photo de frigo ou placard',fridgeScanBtn:'Trouver des recettes depuis mon frigo',fridgeScanning:'Analyse du frigo...',fridgeAnalysing:'Identification des ingrédients...',fridgeGenerating:'Recherche de recettes...',fridgeFoundTitle:'Trouvé dans votre frigo',fridgeMatchTitle:'Recettes réalisables',fridgeAiTitle:'Idée IA',fridgeNeedAlso:'Il manque :',fridgeCanMake:'Vous avez tout !',fridgeTryAnother:'Scanner une autre photo',
  genericIntro:'Tapez pour ajouter à votre liste',inPantry:'En garde-manger',
  appleBtn:'Continuer avec Apple',guestLimits:'Invité : 4 plats · Planificateur 3 jours',freeAccountTitle:'Compte gratuit',freeAccountDesc:'10 plats, planificateur semaine complète, synchronisation',premiumCTA:'Débloquer Premium',
},
es:{
  signin:'Iniciar sesión',signup:'Crear cuenta',email:'Correo',password:'Contraseña',
  signinBtn:'Iniciar sesión →',createAccountBtn:'Crear cuenta →',googleBtn:'Continuar con Google',
  noAccount:'¿Sin cuenta?',guestLink:'Continuar como invitado →',
  haveAccount:'¿Ya tienes cuenta?',signinLink:'Iniciar sesión →',
  choosePlan:'Elige tu plan',
  firstName:'Nombre',lastName:'Apellido',
  navFamily:'Familia',navDiscover:'Descubrir',navPlanner:'Planificar',navShop:'Compras',
  navFridge:'Nevera',navRecipes:'Recetas',navToday:'Hoy',
  famTitle:'🏡 Mi Familia',famSub:'Las cantidades se ajustan automáticamente',
  whoAtTable:'¿Quién está en la mesa?',adults:'Adultos',children:'Niños',
  fullPortions:'Porciones completas',threeQuarter:'¾ porción adulto',
  famTip:'💡 Puedes ajustar los invitados por comida en el Planificador.',
  discoverSub:'Estacional · Alimentos integrales · Plantas',
  skip:'Omitir',addIt:'Añadir',doneForNow:'Hecho por ahora ✓',
  planMyWeek:'Planificar mi semana →',keepBrowsing:'Seguir explorando',
  yourMeals:'Tus comidas',dragHint:'Arrastra a un día',autoFill:'Auto-rellenar',clearAll:'Limpiar',
  shoppingList:'Lista de compras',clearTicked:'Borrar marcados',
  fromMenu:'Del menú',genericItems:'Artículos generales',
  myPantry:'Mi Despensa',pantryIntro:'Controla lo que tienes en casa. Los artículos se actualizan al tachar tu lista.',
  pantryEmpty:'Tu despensa está vacía. Los artículos aparecen automáticamente cuando tachas tu lista.',
  recipes:'Recetas',recipesSub:'Toca cualquier plato guardado para la receta completa',
  cancel:'Cancelar',rateQ:'¿Cómo disfrutaste esta comida?',saveRating:'Guardar',
  signOut:'Cerrar sesión',syncing:'Sincronizando...',
  cookingFor:'Cocinando para',and:'y',adults2:'adultos',adult:'adulto',children2:'niños',child:'niño',
  person:'persona',people:'personas',
  recipesFor:'Recetas para',servings:'porciones',
  mealsScheduled:'comidas programadas',openDay:'Abre un día para asignar comidas',
  of:'de',itemsReady:'artículos listos',
  goodMorning:'¡Buenos días! 🌱',goodAfternoon:'¡Buenas tardes! 🌿',goodEvening:'¡Buenas noches! 🍃',
  noBreakfast:'Sin desayuno planificado',noLunch:'Sin almuerzo planificado',noDinner:'Sin cena planificada',
  planIt:'Planificar →',allReviewed:'¡Todo revisado!',savedDishes:'platos guardados',
  nothingSaved:'Nada guardado — desliza a la derecha los platos que te gusten.',
  moreToBrowse:'platos más.',readyToPlan:'¿Listo para planificar tu semana?',
  dishSaved:'plato guardado',dishesSaved:'platos guardados',
  assignMeal:'¿Asignar a qué comida?',
  rateRecipe:'Valorar esta receta',updateRating:'Actualizar valoración',
  clearPlanConfirm:'¿Borrar todas las comidas?',saveFirst:'¡Guarda primero platos en Descubrir!',
  servingLabel:'Porciones',ingredients:'Ingredientes',method:'Método',
  nutritionPer:'Nutrición por porción',kcal:'kcal',protein:'Proteínas',carbs:'Carbohidratos',fat:'Grasas',
  allRecipes:'Todas las recetas',loadingKitchen:'Cargando tu cocina...',
  fridgeTitle:'📷 Escáner de Nevera',fridgeSub:'Foto de tu nevera — la IA detecta ingredientes y sugiere recetas',fridgeUploadTitle:'Toca para tomar o subir una foto',fridgeUploadSub:'Vale cualquier foto de nevera',fridgeScanBtn:'Encontrar recetas desde mi nevera',fridgeScanning:'Escaneando la nevera...',fridgeAnalysing:'Analizando ingredientes...',fridgeGenerating:'Buscando recetas...',fridgeFoundTitle:'Encontrado en tu nevera',fridgeMatchTitle:'Recetas que puedes hacer',fridgeAiTitle:'Receta IA',fridgeNeedAlso:'También necesitas:',fridgeCanMake:'¡Tienes todo!',fridgeTryAnother:'Escanear otra foto',
  genericIntro:'Toca para añadir a tu lista',inPantry:'En despensa',
  appleBtn:'Continuar con Apple',guestLimits:'Invitado: 4 platos · Planificador 3 días',freeAccountTitle:'Cuenta gratuita',freeAccountDesc:'10 platos, planificador semana completa, sincronización',premiumCTA:'Desbloquear Premium',
},
pt:{
  signin:'Entrar',signup:'Criar conta',email:'E-mail',password:'Senha',
  signinBtn:'Entrar →',createAccountBtn:'Criar conta →',googleBtn:'Continuar com Google',
  noAccount:'Sem conta?',guestLink:'Continuar como convidado →',
  haveAccount:'Já tem conta?',signinLink:'Entrar →',
  choosePlan:'Escolha seu plano',
  firstName:'Nome',lastName:'Sobrenome',
  navFamily:'Família',navDiscover:'Descobrir',navPlanner:'Planejar',navShop:'Compras',
  navFridge:'Frigorífico',navRecipes:'Receitas',navToday:'Hoje',
  famTitle:'🏡 Minha Família',famSub:'As quantidades se ajustam automaticamente',
  whoAtTable:'Quem está à mesa?',adults:'Adultos',children:'Crianças',
  fullPortions:'Porções completas',threeQuarter:'¾ porção adulto',
  famTip:'💡 Você pode ajustar os convidados por refeição no Planejador.',
  discoverSub:'Sazonal · Alimentos integrais · Plantas',
  skip:'Pular',addIt:'Adicionar',doneForNow:'Pronto por agora ✓',
  planMyWeek:'Planejar minha semana →',keepBrowsing:'Continuar navegando',
  yourMeals:'Suas refeições',dragHint:'Arraste para um dia',autoFill:'Auto-preencher',clearAll:'Limpar',
  shoppingList:'Lista de compras',clearTicked:'Limpar marcados',
  fromMenu:'Do menu',genericItems:'Itens genéricos',
  myPantry:'Minha Despensa',pantryIntro:'Acompanhe o que você tem em casa. Os itens são atualizados ao marcar sua lista.',
  pantryEmpty:'Sua despensa está vazia. Os itens aparecem automaticamente quando você marca sua lista.',
  recipes:'Receitas',recipesSub:'Toque em qualquer prato salvo para a receita completa',
  cancel:'Cancelar',rateQ:'Como você aproveitou esta refeição?',saveRating:'Salvar',
  signOut:'Sair',syncing:'Sincronizando...',
  cookingFor:'Cozinhando para',and:'e',adults2:'adultos',adult:'adulto',children2:'crianças',child:'criança',
  person:'pessoa',people:'pessoas',
  recipesFor:'Receitas para',servings:'porções',
  mealsScheduled:'refeições agendadas',openDay:'Abra um dia para atribuir refeições',
  of:'de',itemsReady:'itens prontos',
  goodMorning:'Bom dia! 🌱',goodAfternoon:'Boa tarde! 🌿',goodEvening:'Boa noite! 🍃',
  noBreakfast:'Sem café da manhã planejado',noLunch:'Sem almoço planejado',noDinner:'Sem jantar planejado',
  planIt:'Planejar →',allReviewed:'Tudo revisado!',savedDishes:'pratos salvos',
  nothingSaved:'Nada salvo — deslize para a direita nos pratos que você ama.',
  moreToBrowse:'pratos a explorar.',readyToPlan:'Pronto para planejar sua semana?',
  dishSaved:'prato salvo',dishesSaved:'pratos salvos',
  assignMeal:'Atribuir a qual refeição?',
  rateRecipe:'Avaliar esta receita',updateRating:'Atualizar avaliação',
  clearPlanConfirm:'Limpar todas as refeições?',saveFirst:'Salve primeiro pratos em Descobrir!',
  servingLabel:'Porções',ingredients:'Ingredientes',method:'Método',
  nutritionPer:'Nutrição por porção',kcal:'kcal',protein:'Proteínas',carbs:'Carboidratos',fat:'Gorduras',
  allRecipes:'Todas as receitas',loadingKitchen:'Carregando sua cozinha...',
  fridgeTitle:'📷 Scanner do Frigorífico',fridgeSub:'Foto do seu frigorífico — IA deteta ingredientes e sugere receitas',fridgeUploadTitle:'Toque para tirar ou carregar foto',fridgeUploadSub:'Qualquer foto de frigorífico',fridgeScanBtn:'Encontrar receitas do meu frigorífico',fridgeScanning:'A analisar...',fridgeAnalysing:'A identificar ingredientes...',fridgeGenerating:'A procurar receitas...',fridgeFoundTitle:'Encontrado no seu frigorífico',fridgeMatchTitle:'Receitas que pode fazer',fridgeAiTitle:'Receita IA',fridgeNeedAlso:'Também precisa:',fridgeCanMake:'Tem tudo!',fridgeTryAnother:'Escanear outra foto',
  genericIntro:'Toque para adicionar à sua lista',inPantry:'Na despensa',
  appleBtn:'Continuar com Apple',guestLimits:'Convidado: 4 pratos · Planificador 3 dias',freeAccountTitle:'Conta gratuita',freeAccountDesc:'10 pratos, planificador semana completa, sincronização',premiumCTA:'Desbloquear Premium',
},
de:{
  signin:'Anmelden',signup:'Konto erstellen',email:'E-Mail',password:'Passwort',
  signinBtn:'Anmelden →',createAccountBtn:'Konto erstellen →',googleBtn:'Mit Google fortfahren',
  noAccount:'Kein Konto?',guestLink:'Als Gast fortfahren →',
  haveAccount:'Bereits ein Konto?',signinLink:'Anmelden →',
  choosePlan:'Plan wählen',
  firstName:'Vorname',lastName:'Nachname',
  navFamily:'Familie',navDiscover:'Entdecken',navPlanner:'Planer',navShop:'Einkauf',
  navFridge:'Kühlschrank',navRecipes:'Rezepte',navToday:'Heute',
  famTitle:'🏡 Meine Familie',famSub:'Mengen passen sich automatisch an',
  whoAtTable:'Wer sitzt am Tisch?',adults:'Erwachsene',children:'Kinder',
  fullPortions:'Volle Portionen',threeQuarter:'¾ Erwachsenenportion',
  famTip:'💡 Sie können Gäste pro Mahlzeit im Planer anpassen.',
  discoverSub:'Saisonal · Vollwertig · Pflanzenbetont',
  skip:'Überspringen',addIt:'Hinzufügen',doneForNow:'Jetzt fertig ✓',
  planMyWeek:'Meine Woche planen →',keepBrowsing:'Weiter stöbern',
  yourMeals:'Ihre Mahlzeiten',dragHint:'Auf einen Tag ziehen',autoFill:'Auto-füllen',clearAll:'Löschen',
  shoppingList:'Einkaufsliste',clearTicked:'Angehakte löschen',
  fromMenu:'Aus dem Menü',genericItems:'Allgemeine Artikel',
  myPantry:'Meine Speisekammer',pantryIntro:'Verfolgen Sie was Sie zu Hause haben. Artikel aktualisieren sich beim Abhaken.',
  pantryEmpty:'Ihre Speisekammer ist leer. Artikel erscheinen automatisch wenn Sie Ihre Liste abhaken.',
  recipes:'Rezepte',recipesSub:'Tippen Sie auf ein gespeichertes Gericht für das vollständige Rezept',
  cancel:'Abbrechen',rateQ:'Wie hat Ihnen diese Mahlzeit geschmeckt?',saveRating:'Speichern',
  signOut:'Abmelden',syncing:'Synchronisierung...',
  cookingFor:'Kochen für',and:'und',adults2:'Erwachsene',adult:'Erwachsener',children2:'Kinder',child:'Kind',
  person:'Person',people:'Personen',
  recipesFor:'Rezepte für',servings:'Portionen',
  mealsScheduled:'Mahlzeiten geplant',openDay:'Öffnen Sie einen Tag um Mahlzeiten zuzuweisen',
  of:'von',itemsReady:'Artikel bereit',
  goodMorning:'Guten Morgen! 🌱',goodAfternoon:'Guten Nachmittag! 🌿',goodEvening:'Guten Abend! 🍃',
  noBreakfast:'Kein Frühstück geplant',noLunch:'Kein Mittagessen geplant',noDinner:'Kein Abendessen geplant',
  planIt:'Planen →',allReviewed:'Alles überprüft!',savedDishes:'Gerichte gespeichert',
  nothingSaved:'Nichts gespeichert — wischen Sie nach rechts auf Gerichte die Sie mögen.',
  moreToBrowse:'weitere Gerichte.',readyToPlan:'Bereit Ihre Woche zu planen?',
  dishSaved:'Gericht gespeichert',dishesSaved:'Gerichte gespeichert',
  assignMeal:'Welcher Mahlzeit zuweisen?',
  rateRecipe:'Dieses Rezept bewerten',updateRating:'Bewertung aktualisieren',
  clearPlanConfirm:'Alle Mahlzeiten löschen?',saveFirst:'Speichern Sie zuerst Gerichte in Entdecken!',
  servingLabel:'Portionen',ingredients:'Zutaten',method:'Methode',
  nutritionPer:'Ernährung pro Portion',kcal:'kcal',protein:'Eiweiß',carbs:'Kohlenhydrate',fat:'Fett',
  allRecipes:'Alle Rezepte',loadingKitchen:'Ihre Küche wird geladen...',
  fridgeTitle:'📷 Kühlschrank-Scanner',fridgeSub:'Foto des Kühlschranks — KI erkennt Zutaten und schlägt Rezepte vor',fridgeUploadTitle:'Tippen zum Aufnehmen oder Hochladen',fridgeUploadSub:'Kühlschrank- oder Speisekammerfotos',fridgeScanBtn:'Rezepte aus meinem Kühlschrank finden',fridgeScanning:'Wird gescannt...',fridgeAnalysing:'Zutaten werden erkannt...',fridgeGenerating:'Rezepte werden gesucht...',fridgeFoundTitle:'Im Kühlschrank gefunden',fridgeMatchTitle:'Mögliche Rezepte',fridgeAiTitle:'KI-Rezeptidee',fridgeNeedAlso:'Fehlt noch:',fridgeCanMake:'Sie haben alles!',fridgeTryAnother:'Anderes Foto scannen',
  genericIntro:'Tippen um zur Liste hinzuzufügen',inPantry:'In Speisekammer',
  appleBtn:'Mit Apple fortfahren',guestLimits:'Gast: 4 Gerichte · 3-Tage-Planer',freeAccountTitle:'Kostenloses Konto',freeAccountDesc:'10 Gerichte, Wochenplaner, geräteübergreifende Sync',premiumCTA:'Premium freischalten',
},
};

function t(k){return(TR[lang]&&TR[lang][k])||TR.en[k]||k;}

function applyLang(){
  document.querySelectorAll('[data-t]').forEach(el=>{
    const k=el.getAttribute('data-t');const v=t(k);
    if(v&&el.tagName!=='INPUT')el.textContent=v;
  });
}

function setLang(code,rerender){
  lang=code;
  try{localStorage.setItem('menja_lang',code);}catch(e){}
  applyLang();
  renderLangBars();
  if(rerender){
    renderFamily();
    if(document.getElementById('screen-shopping').classList.contains('active'))renderShopping();
    if(document.getElementById('screen-today').classList.contains('active'))renderToday();
    if(document.getElementById('screen-discover').classList.contains('active')){renderFilters();renderDish();}
    if(document.getElementById('screen-plan').classList.contains('active'))renderPlan();
    if(document.getElementById('screen-recipes').classList.contains('active'))renderRecipes();
  }
}

function renderLangBars(){
  ['auth-lang-row','app-lang-bar'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el)return;
    el.innerHTML=LANGS.map(l=>
      `<button class="${id==='auth-lang-row'?'lang-btn':'app-lang-btn'} ${l.code===lang?'active':''}" onclick="setLang('${l.code}',true)" title="${l.code}">${l.flag}</button>`
    ).join('');
  });
}

// ═══════════════════════════════════════════════════
// CONSTANTS & TAGS
// ═══════════════════════════════════════════════════
const MEAL_TYPES=['Breakfast','Lunch','Dinner'];
const MEAL_ICONS={Breakfast:'🌅',Lunch:'☀️',Dinner:'🌙'};
const DOW_EN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const DOW_FR=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
const DOW_ES=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const DOW_PT=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const DOW_DE=['So','Mo','Di','Mi','Do','Fr','Sa'];
const MON_EN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MON_FR=['Jan','Fév','Mar','Avr','Mai','Juin','Jul','Aoû','Sep','Oct','Nov','Déc'];
const MON_ES=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const MON_PT=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
const MON_DE=['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
function dow(d){return({en:DOW_EN,fr:DOW_FR,es:DOW_ES,pt:DOW_PT,de:DOW_DE}[lang]||DOW_EN)[d.getDay()];}
function mon(d){return({en:MON_EN,fr:MON_FR,es:MON_ES,pt:MON_PT,de:MON_DE}[lang]||MON_EN)[d.getMonth()];}

const TAG_KEYS_ALL=['All','Vegetarian','Vegan','GlutenFree','Quick','Mediterranean','Asian','Salad','Soup','Pasta','GrainBowl','ComfortFood'];
const TAG_TR={
  en:{All:'All',Vegetarian:'Vegetarian',Vegan:'Vegan',GlutenFree:'Gluten-free',Quick:'Quick',Mediterranean:'Mediterranean',Asian:'Asian',Salad:'Salad',Soup:'Soup',Pasta:'Pasta',GrainBowl:'Grain bowl',ComfortFood:'Comfort food'},
  fr:{All:'Tout',Vegetarian:'Végétarien',Vegan:'Végétalien',GlutenFree:'Sans gluten',Quick:'Rapide',Mediterranean:'Méditerranéen',Asian:'Asiatique',Salad:'Salade',Soup:'Soupe',Pasta:'Pâtes',GrainBowl:'Bowl céréales',ComfortFood:'Réconfortant'},
  es:{All:'Todo',Vegetarian:'Vegetariano',Vegan:'Vegano',GlutenFree:'Sin gluten',Quick:'Rápido',Mediterranean:'Mediterráneo',Asian:'Asiático',Salad:'Ensalada',Soup:'Sopa',Pasta:'Pasta',GrainBowl:'Bowl cereales',ComfortFood:'Reconfortante'},
  pt:{All:'Tudo',Vegetarian:'Vegetariano',Vegan:'Vegano',GlutenFree:'Sem glúten',Quick:'Rápido',Mediterranean:'Mediterrâneo',Asian:'Asiático',Salad:'Salada',Soup:'Sopa',Pasta:'Massa',GrainBowl:'Bowl cereais',ComfortFood:'Aconchegante'},
  de:{All:'Alle',Vegetarian:'Vegetarisch',Vegan:'Vegan',GlutenFree:'Glutenfrei',Quick:'Schnell',Mediterranean:'Mediterran',Asian:'Asiatisch',Salad:'Salat',Soup:'Suppe',Pasta:'Pasta',GrainBowl:'Getreidebowl',ComfortFood:'Hausmannskost'},
};
function tTag(k){return(TAG_TR[lang]&&TAG_TR[lang][k])||TAG_TR.en[k]||k;}

const BADGE_HTML={
  vegan:'<span class="hbadge hb-vegan">🌱 Vegan</span>',
  veg:'<span class="hbadge hb-veg">🥗 Veg</span>',
  gf:'<span class="hbadge hb-gf">🌾 GF</span>',
  protein:'<span class="hbadge hb-protein">💪 Protein</span>',
};

const STORE_CATS=[
  {id:'produce',label:{en:'Produce',fr:'Fruits & Légumes',es:'Frutas y Verduras',pt:'Frutas e Legumes',de:'Obst & Gemüse'},icon:'🥦'},
  {id:'dairy',label:{en:'Dairy & Eggs',fr:'Laitages & Œufs',es:'Lácteos y Huevos',pt:'Laticínios e Ovos',de:'Milch & Eier'},icon:'🥚'},
  {id:'grains',label:{en:'Grains & Bread',fr:'Céréales & Pain',es:'Cereales y Pan',pt:'Cereais e Pão',de:'Getreide & Brot'},icon:'🌾'},
  {id:'protein',label:{en:'Protein',fr:'Protéines',es:'Proteínas',pt:'Proteínas',de:'Protein'},icon:'🫘'},
  {id:'pantry',label:{en:'Pantry',fr:'Garde-manger',es:'Despensa',pt:'Despensa',de:'Speisekammer'},icon:'🫙'},
  {id:'herbs',label:{en:'Herbs & Spices',fr:'Herbes & Épices',es:'Hierbas y Especias',pt:'Ervas e Especiarias',de:'Kräuter & Gewürze'},icon:'🌿'},
  {id:'other',label:{en:'Other',fr:'Autre',es:'Otro',pt:'Outro',de:'Sonstiges'},icon:'🛒'},
];
function catLabel(c){return c.label[lang]||c.label.en;}

const CAT_MAP={
  'tomatoes':'produce','cherry tomatoes':'produce','spinach':'produce','kale':'produce','lettuce':'produce',
  'arugula':'produce','zucchini':'produce','aubergine':'produce','bell pepper':'produce','pepper':'produce',
  'onion':'produce','red onion':'produce','garlic':'produce','carrot':'produce','celery':'produce',
  'cucumber':'produce','avocado':'produce','lemon':'produce','lime':'produce','sweet potato':'produce',
  'potato':'produce','mushroom':'produce','mushrooms':'produce','beetroot':'produce','leek':'produce',
  'asparagus':'produce','green beans':'produce','peas':'produce','broccoli':'produce','cauliflower':'produce',
  'egg':'dairy','eggs':'dairy','milk':'dairy','butter':'dairy','cream':'dairy','yogurt':'dairy',
  'yoghurt':'dairy','cheese':'dairy','parmesan':'dairy','feta':'dairy','mozzarella':'dairy',
  'ricotta':'dairy','halloumi':'dairy','cream cheese':'dairy',
  'bread':'grains','pasta':'grains','rice':'grains','quinoa':'grains','oats':'grains','flour':'grains',
  'tortilla':'grains','noodles':'grains','couscous':'grains','barley':'grains','lasagne sheets':'grains',
  'lentils':'protein','chickpeas':'protein','black beans':'protein','kidney beans':'protein','tofu':'protein',
  'tempeh':'protein','chicken':'protein','salmon':'protein','tuna':'protein','beef':'protein',
  'prawns':'protein','white beans':'protein','edamame':'protein',
  'basil':'herbs','parsley':'herbs','coriander':'herbs','thyme':'herbs','rosemary':'herbs','oregano':'herbs',
  'mint':'herbs','cumin':'herbs','paprika':'herbs','turmeric':'herbs','cinnamon':'herbs',
  'chili flakes':'herbs','garam masala':'herbs','curry powder':'herbs','sumac':'herbs',
  'olive oil':'pantry','vinegar':'pantry','soy sauce':'pantry','tahini':'pantry','miso':'pantry',
  'coconut milk':'pantry','canned tomatoes':'pantry','stock':'pantry','honey':'pantry',
  'sugar':'pantry','salt':'pantry','tomato paste':'pantry','balsamic':'pantry','capers':'pantry',
  'olives':'pantry','nuts':'pantry','pine nuts':'pantry','almonds':'pantry','sesame oil':'pantry',
  'harissa':'pantry','mustard':'pantry',
};
function catOf(n){const l=n.toLowerCase();if(CAT_MAP[l])return CAT_MAP[l];for(const k of Object.keys(CAT_MAP)){if(l.includes(k))return CAT_MAP[k];}return'other';}

const EXPIRY={
  'spinach':3,'kale':4,'lettuce':3,'basil':3,'parsley':5,'coriander':4,'mushrooms':4,'mushroom':4,
  'tomatoes':5,'cherry tomatoes':5,'avocado':3,'cucumber':5,'zucchini':5,'asparagus':3,
  'green beans':4,'leek':7,'milk':7,'cream':5,'yogurt':10,'yoghurt':10,'eggs':21,'egg':21,
  'butter':30,'ricotta':5,'mozzarella':5,'chicken':2,'salmon':2,'beef':3,'prawns':2,'tofu':5,
};
function effDays(n){const l=n.toLowerCase();if(EXPIRY[l]!==undefined)return EXPIRY[l];for(const k of Object.keys(EXPIRY)){if(l.includes(k))return EXPIRY[k];}return null;}
function epHTML(n){const d=effDays(n);if(d===null)return'';if(d<=2)return`<span class="ep ep-urgent">${d}d</span>`;if(d<=5)return`<span class="ep ep-soon">${d}d</span>`;return`<span class="ep ep-ok">${d}d</span>`;}

// ─── GENERIC ITEMS ───────────────────────────────
const GENERIC_CATS=[
  {key:'bathroom',label:{en:'Bathroom',fr:'Salle de bain',es:'Baño',pt:'Banheiro',de:'Badezimmer'},items:[
    {id:'tp',icon:'🧻',name:{en:'Toilet paper',fr:'Papier toilette',es:'Papel higiénico',pt:'Papel higiênico',de:'Toilettenpapier'}},
    {id:'shampoo',icon:'🧴',name:{en:'Shampoo',fr:'Shampooing',es:'Champú',pt:'Xampu',de:'Shampoo'}},
    {id:'soap',icon:'🧼',name:{en:'Soap',fr:'Savon',es:'Jabón',pt:'Sabão',de:'Seife'}},
    {id:'toothpaste',icon:'🦷',name:{en:'Toothpaste',fr:'Dentifrice',es:'Pasta dental',pt:'Pasta de dentes',de:'Zahnpasta'}},
    {id:'toothbrush',icon:'🪥',name:{en:'Toothbrush',fr:'Brosse à dents',es:'Cepillo dental',pt:'Escova dental',de:'Zahnbürste'}},
    {id:'deodorant',icon:'✨',name:{en:'Deodorant',fr:'Déodorant',es:'Desodorante',pt:'Desodorante',de:'Deodorant'}},
    {id:'bodywash',icon:'🚿',name:{en:'Body wash',fr:'Gel douche',es:'Gel de ducha',pt:'Gel de banho',de:'Duschgel'}},
    {id:'conditioner',icon:'💆',name:{en:'Conditioner',fr:'Après-shampoing',es:'Acondicionador',pt:'Condicionador',de:'Spülung'}},
  ]},
  {key:'cleaning',label:{en:'Cleaning',fr:'Nettoyage',es:'Limpieza',pt:'Limpeza',de:'Reinigung'},items:[
    {id:'dishsoap',icon:'🍽️',name:{en:'Dish soap',fr:'Liquide vaisselle',es:'Jabón platos',pt:'Detergente',de:'Spülmittel'}},
    {id:'laundry',icon:'🫧',name:{en:'Laundry detergent',fr:'Lessive',es:'Detergente ropa',pt:'Detergente roupa',de:'Waschmittel'}},
    {id:'sponge',icon:'🧽',name:{en:'Sponge',fr:'Éponge',es:'Esponja',pt:'Esponja',de:'Schwamm'}},
    {id:'trashbags',icon:'🗑️',name:{en:'Trash bags',fr:'Sacs poubelle',es:'Bolsas basura',pt:'Sacos lixo',de:'Müllbeutel'}},
    {id:'allpurpose',icon:'🧹',name:{en:'All-purpose cleaner',fr:'Nettoyant multi-usages',es:'Limpiador multiusos',pt:'Limpador multiuso',de:'Allzweckreiniger'}},
    {id:'papertowels',icon:'🗞️',name:{en:'Paper towels',fr:'Essuie-tout',es:'Papel cocina',pt:'Papel absorvente',de:'Küchenrolle'}},
  ]},
  {key:'kitchen',label:{en:'Kitchen',fr:'Cuisine',es:'Cocina',pt:'Cozinha',de:'Küche'},items:[
    {id:'alfoil',icon:'🫙',name:{en:'Aluminium foil',fr:'Papier aluminium',es:'Papel aluminio',pt:'Papel alumínio',de:'Alufolie'}},
    {id:'clingfilm',icon:'📦',name:{en:'Cling film',fr:'Film alimentaire',es:'Film transparente',pt:'Película plástica',de:'Frischhaltefolie'}},
    {id:'bakingpaper',icon:'📄',name:{en:'Baking paper',fr:'Papier cuisson',es:'Papel horno',pt:'Papel manteiga',de:'Backpapier'}},
    {id:'zipbags',icon:'🤐',name:{en:'Zip bags',fr:'Sacs zip',es:'Bolsas zip',pt:'Sacos zip',de:'Zipbeutel'}},
    {id:'candles',icon:'🕯️',name:{en:'Candles',fr:'Bougies',es:'Velas',pt:'Velas',de:'Kerzen'}},
    {id:'matches',icon:'🔥',name:{en:'Matches',fr:'Allumettes',es:'Cerillas',pt:'Fósforos',de:'Streichhölzer'}},
  ]},
  {key:'health',label:{en:'Health & Care',fr:'Santé',es:'Salud',pt:'Saúde',de:'Gesundheit'},items:[
    {id:'painkillers',icon:'💊',name:{en:'Painkillers',fr:'Analgésiques',es:'Analgésicos',pt:'Analgésicos',de:'Schmerzmittel'}},
    {id:'plasters',icon:'🩹',name:{en:'Plasters',fr:'Pansements',es:'Tiritas',pt:'Pensos',de:'Pflaster'}},
    {id:'vitamins',icon:'💛',name:{en:'Vitamins',fr:'Vitamines',es:'Vitaminas',pt:'Vitaminas',de:'Vitamine'}},
    {id:'tissues',icon:'🤧',name:{en:'Tissues',fr:'Mouchoirs',es:'Pañuelos',pt:'Lenços',de:'Taschentücher'}},
    {id:'sunscreen',icon:'☀️',name:{en:'Sunscreen',fr:'Crème solaire',es:'Protector solar',pt:'Protetor solar',de:'Sonnencreme'}},
    {id:'handcream',icon:'🤲',name:{en:'Hand cream',fr:'Crème mains',es:'Crema manos',pt:'Creme de mãos',de:'Handcreme'}},
  ]},
  {key:'beverages',label:{en:'Beverages',fr:'Boissons',es:'Bebidas',pt:'Bebidas',de:'Getränke'},items:[
    {id:'water',icon:'💧',name:{en:'Water',fr:'Eau',es:'Agua',pt:'Água',de:'Wasser'}},
    {id:'coffee',icon:'☕',name:{en:'Coffee',fr:'Café',es:'Café',pt:'Café',de:'Kaffee'}},
    {id:'tea',icon:'🍵',name:{en:'Tea',fr:'Thé',es:'Té',pt:'Chá',de:'Tee'}},
    {id:'juice',icon:'🧃',name:{en:'Juice',fr:'Jus',es:'Zumo',pt:'Suco',de:'Saft'}},
    {id:'wine',icon:'🍷',name:{en:'Wine',fr:'Vin',es:'Vino',pt:'Vinho',de:'Wein'}},
    {id:'beer',icon:'🍺',name:{en:'Beer',fr:'Bière',es:'Cerveza',pt:'Cerveja',de:'Bier'}},
  ]},
  {key:'baby',label:{en:'Baby & Kids',fr:'Bébé & Enfants',es:'Bebé & Niños',pt:'Bebê & Crianças',de:'Baby & Kinder'},items:[
    {id:'nappies',icon:'👶',name:{en:'Nappies',fr:'Couches',es:'Pañales',pt:'Fraldas',de:'Windeln'}},
    {id:'wetwipes',icon:'🧻',name:{en:'Wet wipes',fr:'Lingettes',es:'Toallitas',pt:'Lenços húmidos',de:'Feuchttücher'}},
    {id:'babyfood',icon:'🍼',name:{en:'Baby food',fr:'Nourriture bébé',es:'Comida bebé',pt:'Comida bebê',de:'Babynahrung'}},
    {id:'snacks',icon:'🎒',name:{en:'School snacks',fr:'Collations école',es:'Meriendas',pt:'Lanches',de:'Schulsnacks'}},
  ]},
  {key:'pets',label:{en:'Pets',fr:'Animaux',es:'Mascotas',pt:'Animais',de:'Haustiere'},items:[
    {id:'dogfood',icon:'🐕',name:{en:'Dog food',fr:'Nourriture chien',es:'Comida perro',pt:'Ração cão',de:'Hundefutter'}},
    {id:'catfood',icon:'🐈',name:{en:'Cat food',fr:'Nourriture chat',es:'Comida gato',pt:'Ração gato',de:'Katzenfutter'}},
    {id:'petlitter',icon:'🪣',name:{en:'Cat litter',fr:'Litière',es:'Arena gato',pt:'Areia gato',de:'Katzenstreu'}},
  ]},
];

// ─── PANTRY ICONS ────────────────────────────────
const PANTRY_ICONS_MAP={
  'olive oil':'🫒','salt':'🧂','sugar':'🍬','cumin':'🌿','paprika':'🌶️','turmeric':'🟡',
  'canned tomatoes':'🥫','stock':'🫙','coconut milk':'🥛','miso':'🫙','soy sauce':'🫙',
  'tahini':'🫙','honey':'🍯','lemon':'🍋','garlic':'🧄','onion':'🧅','red onion':'🧅',
  'rice':'🌾','pasta':'🍝','quinoa':'🌾','oats':'🥣','flour':'🌾','noodles':'🍜',
  'chickpeas':'🫘','lentils':'🫘','black beans':'🫘','white beans':'🫘','edamame':'🫘',
  'eggs':'🥚','egg':'🥚','butter':'🧈','parmesan':'🧀','feta':'🧀','mozzarella':'🧀',
  'yogurt':'🥛','yoghurt':'🥛','milk':'🥛','cream':'🥛',
  'chicken':'🍗','salmon':'🐟','tofu':'🧱','beef':'🥩','prawns':'🍤',
  'basil':'🌿','parsley':'🌿','coriander':'🌿','rosemary':'🌿','thyme':'🌿','mint':'🌿',
  'chili flakes':'🌶️','cinnamon':'🟫','garam masala':'🌿','curry powder':'🟡',
  'almonds':'🌰','walnuts':'🌰','pine nuts':'🌰','olives':'🫒','capers':'🫙',
  'avocado':'🥑','sweet potato':'🍠','tomatoes':'🍅','cherry tomatoes':'🍅',
  'spinach':'🥬','kale':'🥬','mushrooms':'🍄','mushroom':'🍄',
  'vinegar':'🫙','balsamic':'🫙','sesame oil':'🫙','harissa':'🌶️',
};
function pantryIcon(n){return PANTRY_ICONS_MAP[n.toLowerCase()]||'🥄';}

// ═══════════════════════════════════════════════════
// DISHES  (metric European quantities throughout)
// ═══════════════════════════════════════════════════
const DISHES=[
{id:1,emoji:'🥚',photo:'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&q=80',
 tags:['Vegetarian','Mediterranean','GlutenFree'],badges:['veg','gf'],
 prep:10,cook:20,
 name:{en:'Shakshuka with Feta',fr:'Shakshuka au Feta',es:'Shakshuka con Feta',pt:'Shakshuka com Feta',de:'Shakshuka mit Feta'},
 subtitle:{en:'Spiced, warming & easy one-pan',fr:'Épicé, réconfortant & un seul poêle',es:'Especiado, reconfortante & en una sola sartén',pt:'Apimentado, reconfortante & numa só frigideira',de:'Würzig, wärmend & in einer Pfanne'},
 desc:{en:'Eggs poached in spiced tomato and pepper sauce, finished with crumbled feta and parsley.',fr:'Œufs pochés dans une sauce tomate épicée, terminés avec de la feta émiettée.',es:'Huevos escalfados en salsa de tomate especiada con feta desmenuzado.',pt:'Ovos pochê em molho de tomate temperado com feta esfarelado.',de:'Eier in würziger Tomatensauce pochiert, mit Feta und Petersilie.'},
 ingredients:[
   {emoji:'🥚',name:{en:'Eggs',fr:'Œufs',es:'Huevos',pt:'Ovos',de:'Eier'},qty:2,unit:''},
   {emoji:'🍅',name:{en:'Chopped tomatoes',fr:'Tomates concassées',es:'Tomates troceados',pt:'Tomates picados',de:'Gehackte Tomaten'},qty:400,unit:'g'},
   {emoji:'🧀',name:{en:'Feta cheese',fr:'Fromage feta',es:'Queso feta',pt:'Queijo feta',de:'Fetakäse'},qty:80,unit:'g'},
   {emoji:'🫑',name:{en:'Red pepper',fr:'Poivron rouge',es:'Pimiento rojo',pt:'Pimento vermelho',de:'Rote Paprika'},qty:1,unit:''},
   {emoji:'🧅',name:{en:'Onion',fr:'Oignon',es:'Cebolla',pt:'Cebola',de:'Zwiebel'},qty:1,unit:''},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:2,unit:'cloves'},
   {emoji:'🌶️',name:{en:'Chilli flakes',fr:'Flocons de piment',es:'Copos de chile',pt:'Flocos de pimenta',de:'Chiliflocken'},qty:0.5,unit:'tsp'},
   {emoji:'🌿',name:{en:'Fresh parsley',fr:'Persil frais',es:'Perejil fresco',pt:'Salsa fresca',de:'Frische Petersilie'},qty:15,unit:'g'},
 ],
 base:{en:['Olive oil','Cumin','Smoked paprika','Salt & pepper'],fr:['Huile d\'olive','Cumin','Paprika fumé','Sel & poivre'],es:['Aceite de oliva','Comino','Pimentón ahumado','Sal y pimienta'],pt:['Azeite','Cominhos','Páprica fumada','Sal e pimenta'],de:['Olivenöl','Kreuzkümmel','Geräucherter Paprika','Salz & Pfeffer']},
 steps:{
   en:[
     {num:1,title:'Sauté vegetables',text:'Dice onion and red pepper. Cook in olive oil over medium heat for 5–6 minutes until soft.',ings:['🧅 Onion · 1','🫑 Red pepper · 1','🧄 Garlic · 2 cloves'],tip:null,kids:null},
     {num:2,title:'Add spices & tomatoes',text:'Add garlic and cook 1 minute. Stir in cumin, smoked paprika and chilli flakes, then add chopped tomatoes.',ings:['🍅 Chopped tomatoes · 400g'],tip:null,kids:null},
     {num:3,title:'Simmer',text:'Simmer for 10 minutes until the sauce thickens nicely.',ings:[],tip:'The sauce should be thick enough that a spoon leaves a trail.',kids:null},
     {num:4,title:'Poach the eggs',text:'Make 4 wells in the sauce. Crack one egg into each. Cover and cook over low heat for 5–7 minutes until whites are set but yolks still runny.',ings:['🥚 Eggs · 2–4'],tip:'Keep the lid on — this steams the top of the eggs gently.',kids:null},
     {num:5,title:'Finish & serve',text:'Crumble feta over the top, scatter fresh parsley and a drizzle of olive oil. Serve from the pan with crusty bread.',ings:['🧀 Feta · 80g','🌿 Parsley · 15g'],tip:null,kids:null},
   ],
   fr:[
     {num:1,title:'Faire revenir les légumes',text:'Couper l\'oignon et le poivron. Faire revenir dans l\'huile d\'olive à feu moyen 5–6 min.',ings:['🧅 Oignon · 1','🫑 Poivron · 1'],tip:null,kids:null},
     {num:2,title:'Ajouter les épices et les tomates',text:'Ajouter l\'ail, cuire 1 min. Incorporer le cumin, le paprika, les flocons de piment puis les tomates.',ings:['🍅 Tomates · 400g'],tip:null,kids:null},
     {num:3,title:'Mijoter',text:'Mijoter 10 minutes jusqu\'à ce que la sauce épaississe.',ings:[],tip:'La sauce doit être assez épaisse pour que la cuillère laisse une trace.',kids:null},
     {num:4,title:'Pocher les œufs',text:'Faire 4 puits dans la sauce. Casser un œuf dans chaque puits. Couvrir et cuire 5–7 min à feu doux.',ings:['🥚 Œufs · 2–4'],tip:'Garder le couvercle — cela cuit le dessus des œufs doucement.',kids:null},
     {num:5,title:'Finir et servir',text:'Émietter la feta, parsemer de persil et arroser d\'huile d\'olive. Servir dans la poêle avec du pain.',ings:['🧀 Feta · 80g','🌿 Persil · 15g'],tip:null,kids:null},
   ],
   es:[
     {num:1,title:'Sofreír las verduras',text:'Cortar la cebolla y el pimiento. Cocinar en aceite de oliva a fuego medio 5–6 min.',ings:['🧅 Cebolla · 1','🫑 Pimiento · 1'],tip:null,kids:null},
     {num:2,title:'Añadir especias y tomates',text:'Añadir ajo, cocinar 1 min. Añadir comino, pimentón, chile y los tomates troceados.',ings:['🍅 Tomates · 400g'],tip:null,kids:null},
     {num:3,title:'Hervir a fuego lento',text:'Hervir 10 minutos hasta que la salsa espese.',ings:[],tip:null,kids:null},
     {num:4,title:'Escalfar los huevos',text:'Hacer 4 huecos en la salsa. Romper un huevo en cada hueco. Tapar y cocinar 5–7 min.',ings:['🥚 Huevos · 2–4'],tip:'Mantener la tapa puesta para cocinar suavemente la parte superior.',kids:null},
     {num:5,title:'Terminar y servir',text:'Desmenuzar el feta, añadir perejil y aceite de oliva. Servir en la sartén con pan.',ings:['🧀 Feta · 80g','🌿 Perejil · 15g'],tip:null,kids:null},
   ],
   pt:[{num:1,title:'Refogar os legumes',text:'Cortar a cebola e o pimento. Cozinhar em azeite a fogo médio 5–6 min.',ings:['🧅 Cebola · 1'],tip:null,kids:null},{num:2,title:'Adicionar especiarias e tomates',text:'Adicionar alho, cozinhar 1 min. Juntar cominhos, páprica, pimenta e os tomates.',ings:['🍅 Tomates · 400g'],tip:null,kids:null},{num:3,title:'Ferver em lume brando',text:'Ferver 10 minutos até o molho engrossar.',ings:[],tip:null,kids:null},{num:4,title:'Pochar os ovos',text:'Fazer 4 buracos no molho. Quebrar um ovo em cada. Tapar e cozinhar 5–7 min.',ings:['🥚 Ovos · 2–4'],tip:null,kids:null},{num:5,title:'Finalizar e servir',text:'Esmigalhar feta, salpicar salsa e azeite. Servir na frigideira com pão.',ings:['🧀 Feta · 80g'],tip:null,kids:null}],
   de:[{num:1,title:'Gemüse anbraten',text:'Zwiebel und Paprika würfeln. In Olivenöl bei mittlerer Hitze 5–6 Min. weich braten.',ings:['🧅 Zwiebel · 1'],tip:null,kids:null},{num:2,title:'Gewürze und Tomaten',text:'Knoblauch hinzufügen, 1 Min. kochen. Kreuzkümmel, Paprika, Chili und Tomaten einrühren.',ings:['🍅 Tomaten · 400g'],tip:null,kids:null},{num:3,title:'Köcheln',text:'10 Minuten köcheln bis die Sauce eindickt.',ings:[],tip:null,kids:null},{num:4,title:'Eier pochieren',text:'4 Mulden in die Sauce drücken. Je ein Ei hineinschlagen. Abdecken und 5–7 Min. köcheln.',ings:['🥚 Eier · 2–4'],tip:'Deckel drauflassen — das dampft die Oberseite der Eier sanft gar.',kids:null},{num:5,title:'Fertigstellen & servieren',text:'Feta darüber bröseln, Petersilie und Olivenöl darüber. Aus der Pfanne mit Brot servieren.',ings:['🧀 Feta · 80g'],tip:null,kids:null}],
 },
 nutrition:{kcal:360,protein:20,carbs:28,fat:18,fiber:7}},

{id:2,emoji:'🥕',photo:'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
 tags:['Vegetarian','Quick','Breakfast'],badges:['veg'],
 prep:10,cook:15,
 name:{en:'Carrot Cake Pancakes',fr:'Pancakes Carrot Cake',es:'Tortitas de Zanahoria',pt:'Panquecas de Cenoura',de:'Karottenkuchen-Pancakes'},
 subtitle:{en:'Fluffy, spiced & naturally sweet',fr:'Moelleux, épicés & naturellement sucrés',es:'Esponjosas, especiadas y naturalmente dulces',pt:'Fofas, temperadas e naturalmente doces',de:'Fluffig, gewürzt & natürlich süß'},
 desc:{en:'Wholesome oat and carrot pancakes topped with Greek yogurt, fresh berries and maple syrup.',fr:'Pancakes sains à l\'avoine et la carotte avec yaourt grec et fruits rouges.',es:'Tortitas saludables de avena y zanahoria con yogur griego y frutos rojos.',pt:'Panquecas saudáveis de aveia e cenoura com iogurte grego e frutos vermelhos.',de:'Gesunde Hafer-Karotten-Pancakes mit griechischem Joghurt und frischen Beeren.'},
 ingredients:[
   {emoji:'🌾',name:{en:'Rolled oats',fr:'Flocons d\'avoine',es:'Copos de avena',pt:'Aveia em flocos',de:'Haferflocken'},qty:100,unit:'g'},
   {emoji:'🍚',name:{en:'Whole wheat flour',fr:'Farine complète',es:'Harina integral',pt:'Farinha integral',de:'Vollkornmehl'},qty:80,unit:'g'},
   {emoji:'🥕',name:{en:'Carrot, finely grated',fr:'Carotte râpée finement',es:'Zanahoria rallada fina',pt:'Cenoura ralada fina',de:'Karotte, fein gerieben'},qty:2,unit:'medium'},
   {emoji:'🥚',name:{en:'Eggs',fr:'Œufs',es:'Huevos',pt:'Ovos',de:'Eier'},qty:2,unit:''},
   {emoji:'🥛',name:{en:'Milk or oat milk',fr:'Lait ou lait d\'avoine',es:'Leche o leche de avena',pt:'Leite ou leite de aveia',de:'Milch oder Hafermilch'},qty:180,unit:'ml'},
   {emoji:'🍎',name:{en:'Unsweetened applesauce',fr:'Compote de pommes',es:'Puré de manzana',pt:'Puré de maçã',de:'Ungesüßtes Apfelmus'},qty:3,unit:'tbsp'},
   {emoji:'🍓',name:{en:'Fresh strawberries',fr:'Fraises fraîches',es:'Fresas frescas',pt:'Morangos frescos',de:'Frische Erdbeeren'},qty:80,unit:'g'},
   {emoji:'🫐',name:{en:'Blueberries',fr:'Myrtilles',es:'Arándanos',pt:'Mirtilos',de:'Blaubeeren'},qty:50,unit:'g'},
 ],
 base:{en:['Cinnamon','Ground ginger','Baking powder','Pinch of salt','Butter or coconut oil'],fr:['Cannelle','Gingembre moulu','Levure chimique','Pincée de sel','Beurre'],es:['Canela','Jengibre molido','Levadura en polvo','Pizca de sal','Mantequilla'],pt:['Canela','Gengibre moído','Fermento em pó','Pitada de sal','Manteiga'],de:['Zimt','Gemahlener Ingwer','Backpulver','Prise Salz','Butter']},
 steps:{
   en:[
     {num:1,title:'Grate the carrots',text:'Finely grate carrots using the small holes of a box grater for seamless batter texture.',ings:['🥕 Carrot · 2 medium'],tip:'Use fresh carrots — pre-grated ones are too thick and dry.',kids:'Kids can help with the grater with supervision! 🧒'},
     {num:2,title:'Mix dry ingredients',text:'Combine oats, flour, 1 tsp cinnamon, ½ tsp ginger, 1 tsp baking powder and a pinch of salt in a large bowl.',ings:['🌾 Rolled oats · 100g','🍚 Flour · 80g'],tip:null,kids:'Kids can do the stirring! 🧒'},
     {num:3,title:'Mix wet & combine',text:'Whisk eggs, milk and applesauce together. Pour into dry ingredients and fold gently — don\'t overmix.',ings:['🥚 Eggs · 2','🥛 Milk · 180ml','🍎 Applesauce · 3 tbsp'],tip:'A few lumps are fine — overmixing makes them dense.',kids:null},
     {num:4,title:'Fold in carrot',text:'Fold in the grated carrot. If batter feels too thick, add 2–3 tbsp extra milk.',ings:[],tip:'Oats absorb a lot of liquid — the batter should slowly fall from a spoon.',kids:null},
     {num:5,title:'Cook the pancakes',text:'Heat a non-stick pan with a little butter over medium heat. Pour 8cm rounds and cook 2–3 minutes until bubbles form, then flip and cook 1–2 minutes more.',ings:[],tip:null,kids:null},
     {num:6,title:'Serve with yogurt & berries',text:'Stack pancakes and top with Greek yogurt, sliced strawberries, blueberries and a drizzle of maple syrup.',ings:['🍓 Strawberries · 80g','🫐 Blueberries · 50g'],tip:'Stores in the fridge 3 days or freeze for 3 months.',kids:'Let kids add the fruit and yogurt! 🧒'},
   ],
   fr:[{num:1,title:'Râper les carottes',text:'Râper finement les carottes.',ings:['🥕 Carotte · 2'],tip:null,kids:'Les enfants peuvent aider ! 🧒'},{num:2,title:'Mélanger les ingrédients secs',text:'Mélanger l\'avoine, la farine, 1 c.c. cannelle, ½ c.c. gingembre, 1 c.c. levure et sel.',ings:['🌾 Avoine · 100g'],tip:null,kids:null},{num:3,title:'Mélanger humide & combiner',text:'Fouetter les œufs, le lait et la compote. Incorporer dans le mélange sec.',ings:['🥚 Œufs · 2','🥛 Lait · 180ml'],tip:'Quelques grumeaux sont bien.',kids:null},{num:4,title:'Incorporer la carotte',text:'Incorporer délicatement la carotte râpée.',ings:[],tip:null,kids:null},{num:5,title:'Cuire les pancakes',text:'Chauffer une poêle avec du beurre. Verser des ronds de 8cm et cuire 2–3 min, retourner et cuire 1–2 min.',ings:[],tip:null,kids:null},{num:6,title:'Servir',text:'Disposer avec le yaourt grec, les fraises, les myrtilles et le sirop d\'érable.',ings:['🍓 Fraises · 80g'],tip:null,kids:'Les enfants peuvent garnir ! 🧒'}],
   es:[{num:1,title:'Rallar las zanahorias',text:'Rallar finamente las zanahorias.',ings:['🥕 Zanahoria · 2'],tip:null,kids:'¡Los niños pueden ayudar con supervisión! 🧒'},{num:2,title:'Mezclar ingredientes secos',text:'Combinar avena, harina, canela, jengibre, levadura y sal.',ings:['🌾 Avena · 100g'],tip:null,kids:null},{num:3,title:'Mezclar húmedos y combinar',text:'Batir huevos, leche y puré de manzana. Incorporar a los secos.',ings:['🥚 Huevos · 2'],tip:null,kids:null},{num:4,title:'Añadir zanahoria',text:'Incorporar la zanahoria rallada con cuidado.',ings:[],tip:null,kids:null},{num:5,title:'Cocinar las tortitas',text:'Calentar sartén con mantequilla. Verter círculos de 8cm y cocinar 2–3 min, voltear.',ings:[],tip:null,kids:null},{num:6,title:'Servir',text:'Con yogur griego, fresas, arándanos y jarabe de arce.',ings:['🍓 Fresas · 80g'],tip:null,kids:'¡Los niños pueden decorar! 🧒'}],
   pt:[{num:1,title:'Ralar as cenouras',text:'Ralar finamente as cenouras.',ings:['🥕 Cenoura · 2'],tip:null,kids:'As crianças podem ajudar! 🧒'},{num:2,title:'Misturar secos',text:'Combinar aveia, farinha, canela, gengibre, fermento e sal.',ings:[],tip:null,kids:null},{num:3,title:'Misturar húmidos e combinar',text:'Bater ovos, leite e puré de maçã. Incorporar nos secos.',ings:['🥚 Ovos · 2'],tip:null,kids:null},{num:4,title:'Adicionar cenoura',text:'Incorporar a cenoura ralada.',ings:[],tip:null,kids:null},{num:5,title:'Cozinhar as panquecas',text:'Aquecer frigideira com manteiga. Verter círculos de 8cm e cozinhar 2–3 min.',ings:[],tip:null,kids:null},{num:6,title:'Servir',text:'Com iogurte grego, morangos, mirtilos e xarope de bordo.',ings:[],tip:null,kids:'As crianças podem decorar! 🧒'}],
   de:[{num:1,title:'Karotten reiben',text:'Karotten fein reiben.',ings:['🥕 Karotte · 2'],tip:'Frische Karotten nehmen — vorgeraspelte sind zu trocken.',kids:'Kinder können beim Reiben helfen! 🧒'},{num:2,title:'Trockene Zutaten mischen',text:'Haferflocken, Mehl, 1 TL Zimt, ½ TL Ingwer, 1 TL Backpulver und Salz mischen.',ings:['🌾 Haferflocken · 100g'],tip:null,kids:'Kinder können rühren! 🧒'},{num:3,title:'Nasse mischen & kombinieren',text:'Eier, Milch und Apfelmus verquirlen. In trockene Zutaten einfalten.',ings:['🥚 Eier · 2'],tip:'Ein paar Klumpen sind gut.',kids:null},{num:4,title:'Karotte einfalten',text:'Geriebene Karotte vorsichtig einfalten.',ings:[],tip:null,kids:null},{num:5,title:'Pancakes backen',text:'Pfanne mit Butter erhitzen. 8cm-Runden einschütten, 2–3 Min. backen, wenden.',ings:[],tip:null,kids:null},{num:6,title:'Servieren',text:'Mit griechischem Joghurt, Erdbeeren, Blaubeeren und Ahornsirup.',ings:[],tip:null,kids:'Kinder können garnieren! 🧒'}],
 },
 dressing:{en:['Maple syrup · 2 tbsp','Greek yogurt · 4 tbsp'],fr:['Sirop d\'érable · 2 c.s.','Yaourt grec · 4 c.s.'],es:['Jarabe de arce · 2 c.s.','Yogur griego · 4 c.s.'],pt:['Xarope de bordo · 2 c.s.','Iogurte grego · 4 c.s.'],de:['Ahornsirup · 2 EL','Griechischer Joghurt · 4 EL']},
 nutrition:{kcal:310,protein:9,carbs:42,fat:10,fiber:4}},

{id:3,emoji:'🥗',photo:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
 tags:['Vegan','GrainBowl','GlutenFree'],badges:['vegan','gf','protein'],
 prep:15,cook:25,
 name:{en:'Quinoa Buddha Bowl',fr:'Buddha Bowl Quinoa',es:'Buddha Bowl de Quinoa',pt:'Buddha Bowl de Quinoa',de:'Quinoa Buddha Bowl'},
 subtitle:{en:'Nourishing, colourful & fully loaded',fr:'Nourrissant, coloré & complet',es:'Nutritivo, colorido y completo',pt:'Nutritivo, colorido e completo',de:'Nährend, bunt & vollgepackt'},
 desc:{en:'Roasted sweet potato and chickpeas over fluffy quinoa with creamy tahini dressing.',fr:'Patate douce et pois chiches rôtis sur quinoa avec vinaigrette tahini.',es:'Boniato y garbanzos asados sobre quinoa con aliño de tahini.',pt:'Batata-doce e grão-de-bico assados sobre quinoa com molho de tahini.',de:'Geröstete Süßkartoffel und Kichererbsen auf Quinoa mit Tahini-Dressing.'},
 ingredients:[
   {emoji:'🌾',name:{en:'Quinoa',fr:'Quinoa',es:'Quinoa',pt:'Quinoa',de:'Quinoa'},qty:100,unit:'g'},
   {emoji:'🍠',name:{en:'Sweet potato',fr:'Patate douce',es:'Boniato',pt:'Batata-doce',de:'Süßkartoffel'},qty:200,unit:'g'},
   {emoji:'🫘',name:{en:'Chickpeas (tin)',fr:'Pois chiches (boîte)',es:'Garbanzos (lata)',pt:'Grão-de-bico (lata)',de:'Kichererbsen (Dose)'},qty:200,unit:'g'},
   {emoji:'🥬',name:{en:'Kale',fr:'Chou kale',es:'Col kale',pt:'Couve kale',de:'Grünkohl'},qty:60,unit:'g'},
   {emoji:'🥑',name:{en:'Avocado',fr:'Avocat',es:'Aguacate',pt:'Abacate',de:'Avocado'},qty:1,unit:''},
   {emoji:'🍋',name:{en:'Lemon',fr:'Citron',es:'Limón',pt:'Limão',de:'Zitrone'},qty:1,unit:''},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:1,unit:'clove'},
 ],
 base:{en:['Olive oil','Tahini · 2 tbsp','Cumin','Salt'],fr:['Huile d\'olive','Tahini · 2 c.s.','Cumin','Sel'],es:['Aceite de oliva','Tahini · 2 c.s.','Comino','Sal'],pt:['Azeite','Tahini · 2 c.s.','Cominhos','Sal'],de:['Olivenöl','Tahini · 2 EL','Kreuzkümmel','Salz']},
 steps:{
   en:[
     {num:1,title:'Cook the quinoa',text:'Rinse quinoa. Cook in 200ml salted water for 15 minutes. Fluff with a fork and set aside.',ings:['🌾 Quinoa · 100g'],tip:null,kids:null},
     {num:2,title:'Roast the veg',text:'Dice sweet potato and drain chickpeas. Toss with olive oil, cumin and salt on a baking tray. Roast at 200°C for 25 minutes until golden.',ings:['🍠 Sweet potato · 200g','🫘 Chickpeas · 200g'],tip:'Don\'t overcrowd the tray — spread in a single layer for crispiness.',kids:null},
     {num:3,title:'Prep the kale',text:'Massage kale with a pinch of salt and a drizzle of olive oil for 1 minute until softened.',ings:['🥬 Kale · 60g'],tip:null,kids:null},
     {num:4,title:'Make the dressing',text:'Whisk tahini with lemon juice, 1 crushed garlic clove and 3 tbsp water until smooth and creamy.',ings:['🍋 Lemon · 1'],tip:'Add more water if too thick — it should pour easily.',kids:null},
     {num:5,title:'Assemble & serve',text:'Divide quinoa between bowls. Arrange roasted veg, kale and sliced avocado on top. Drizzle generously with tahini dressing.',ings:['🥑 Avocado · 1'],tip:'Great for meal prep — keep components separate and assemble fresh.',kids:null},
   ],
   fr:[{num:1,title:'Cuire le quinoa',text:'Rincer le quinoa. Cuire dans 200ml d\'eau salée 15 min.',ings:['🌾 Quinoa · 100g'],tip:null,kids:null},{num:2,title:'Rôtir les légumes',text:'Couper la patate douce, égoutter les pois chiches. Mélanger avec huile, cumin, sel. Rôtir à 200°C 25 min.',ings:['🍠 Patate douce · 200g'],tip:null,kids:null},{num:3,title:'Préparer le kale',text:'Masser le chou kale avec sel et huile d\'olive.',ings:[],tip:null,kids:null},{num:4,title:'Vinaigrette tahini',text:'Fouetter le tahini avec jus de citron, ail écrasé et 3 c.s. d\'eau.',ings:[],tip:null,kids:null},{num:5,title:'Assembler',text:'Quinoa dans les bols, légumes, kale et avocat dessus. Arroser de vinaigrette.',ings:['🥑 Avocat · 1'],tip:null,kids:null}],
   es:[{num:1,title:'Cocinar la quinoa',text:'Enjuagar la quinoa. Cocinar en 200ml de agua salada 15 min.',ings:[],tip:null,kids:null},{num:2,title:'Asar las verduras',text:'Cortar el boniato, escurrir los garbanzos. Mezclar con aceite, comino, sal. Asar a 200°C 25 min.',ings:[],tip:null,kids:null},{num:3,title:'Preparar el kale',text:'Masajear el kale con sal y aceite.',ings:[],tip:null,kids:null},{num:4,title:'Aliño tahini',text:'Batir tahini con zumo de limón, ajo y 3 c.s. de agua.',ings:[],tip:null,kids:null},{num:5,title:'Montar',text:'Quinoa en los boles, verduras asadas, kale y aguacate. Regar con aliño.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Cozinhar a quinoa',text:'Lavar a quinoa. Cozinhar em 200ml de água salgada 15 min.',ings:[],tip:null,kids:null},{num:2,title:'Assar os legumes',text:'Cortar a batata-doce, escorrer o grão. Misturar com azeite, cominhos, sal. Assar a 200°C 25 min.',ings:[],tip:null,kids:null},{num:3,title:'Preparar a couve',text:'Massajar a couve com sal e azeite.',ings:[],tip:null,kids:null},{num:4,title:'Molho tahini',text:'Bater tahini com sumo de limão, alho e 3 c.s. de água.',ings:[],tip:null,kids:null},{num:5,title:'Montar',text:'Quinoa nas tigelas, legumes, couve e abacate. Regar com molho.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Quinoa kochen',text:'Quinoa spülen. In 200ml gesalzenem Wasser 15 Min. kochen.',ings:[],tip:null,kids:null},{num:2,title:'Gemüse rösten',text:'Süßkartoffel würfeln, Kichererbsen abtropfen. Mit Öl, Kreuzkümmel, Salz mischen. Bei 200°C 25 Min. rösten.',ings:[],tip:null,kids:null},{num:3,title:'Grünkohl vorbereiten',text:'Grünkohl mit Salz und Olivenöl 1 Min. massieren.',ings:[],tip:null,kids:null},{num:4,title:'Tahini-Dressing',text:'Tahini mit Zitronensaft, Knoblauch und 3 EL Wasser verrühren.',ings:[],tip:null,kids:null},{num:5,title:'Anrichten',text:'Quinoa in Schüsseln, Gemüse, Grünkohl und Avocado darauf. Mit Dressing beträufeln.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:520,protein:18,carbs:62,fat:22,fiber:12}},

{id:4,emoji:'🍝',photo:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
 tags:['Vegetarian','Mediterranean','ComfortFood'],badges:['veg'],
 prep:10,cook:30,
 name:{en:'Pasta e Fagioli',fr:'Pasta e Fagioli',es:'Pasta e Fagioli',pt:'Pasta e Fagioli',de:'Pasta e Fagioli'},
 subtitle:{en:'Hearty Italian white bean soup',fr:'Soupe italienne copieuse aux haricots blancs',es:'Contundente sopa italiana de alubias blancas',pt:'Reconfortante sopa italiana de feijão branco',de:'Herzhafter italienischer Weißbohneneintopf'},
 desc:{en:'A classic Italian peasant dish — creamy white beans and pasta in a rich tomato broth.',fr:'Un classique paysan italien — haricots blancs et pâtes dans un bouillon de tomates.',es:'Un clásico italiano — alubias blancas y pasta en un caldo de tomate.',pt:'Um clássico italiano — feijão branco e massa num caldo de tomate rico.',de:'Ein klassisches italienisches Gericht — cremige Bohnen und Pasta in Tomatenbrühe.'},
 ingredients:[
   {emoji:'🍝',name:{en:'Pasta (small)',fr:'Pâtes (petites)',es:'Pasta (pequeña)',pt:'Massa (pequena)',de:'Pasta (kleine)'},qty:200,unit:'g'},
   {emoji:'🫘',name:{en:'White beans (tin)',fr:'Haricots blancs (boîte)',es:'Alubias blancas (lata)',pt:'Feijão branco (lata)',de:'Weiße Bohnen (Dose)'},qty:400,unit:'g'},
   {emoji:'🍅',name:{en:'Chopped tomatoes',fr:'Tomates concassées',es:'Tomates troceados',pt:'Tomates picados',de:'Gehackte Tomaten'},qty:200,unit:'g'},
   {emoji:'🥕',name:{en:'Celery sticks',fr:'Branches de céleri',es:'Ramas de apio',pt:'Talos de aipo',de:'Stangensellerie'},qty:2,unit:''},
   {emoji:'🥕',name:{en:'Carrot',fr:'Carotte',es:'Zanahoria',pt:'Cenoura',de:'Karotte'},qty:1,unit:''},
   {emoji:'🧅',name:{en:'Onion',fr:'Oignon',es:'Cebolla',pt:'Cebola',de:'Zwiebel'},qty:1,unit:''},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:3,unit:'cloves'},
   {emoji:'🧀',name:{en:'Parmesan',fr:'Parmesan',es:'Parmesano',pt:'Parmesão',de:'Parmesan'},qty:30,unit:'g'},
 ],
 base:{en:['Olive oil · 45ml','Rosemary sprig','Stock · 500ml','Salt & pepper'],fr:['Huile d\'olive · 45ml','Brin de romarin','Bouillon · 500ml'],es:['Aceite de oliva · 45ml','Rama de romero','Caldo · 500ml'],pt:['Azeite · 45ml','Ramo de alecrim','Caldo · 500ml'],de:['Olivenöl · 45ml','Rosmarinzweig','Brühe · 500ml']},
 steps:{
   en:[
     {num:1,title:'Build the soffritto',text:'Gently fry onion, carrot and celery in olive oil over low heat for 10 minutes until very soft. Don\'t rush this — it\'s the flavour base.',ings:['🧅 Onion · 1','🥕 Carrot · 1','🥕 Celery · 2 sticks'],tip:'Low and slow is key here. The vegetables should melt, not brown.',kids:null},
     {num:2,title:'Add garlic & rosemary',text:'Add garlic and rosemary sprig, cook 1 more minute until fragrant.',ings:['🧄 Garlic · 3 cloves'],tip:null,kids:null},
     {num:3,title:'Tomatoes & stock',text:'Add chopped tomatoes and stock. Stir well and simmer for 10 minutes.',ings:['🍅 Tomatoes · 200g'],tip:null,kids:null},
     {num:4,title:'Beans — mash some',text:'Add beans. Use the back of a spoon or fork to mash about a quarter of them directly in the pot — this thickens the soup beautifully.',ings:['🫘 White beans · 400g'],tip:'This is what makes the broth creamy without any cream.',kids:null},
     {num:5,title:'Add pasta & finish',text:'Add pasta and cook until al dente (check packet). Remove rosemary. Season well. Serve with parmesan and a drizzle of good olive oil.',ings:['🍝 Pasta · 200g','🧀 Parmesan · 30g'],tip:'Even better the next day — the pasta absorbs the broth overnight.',kids:null},
   ],
   fr:[{num:1,title:'Soffritto',text:'Faire revenir doucement oignon, carotte et céleri dans l\'huile 10 min à feu doux.',ings:[],tip:'Lentement est la clé — les légumes doivent fondre.',kids:null},{num:2,title:'Ail & romarin',text:'Ajouter l\'ail et le romarin, cuire 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Tomates & bouillon',text:'Ajouter tomates et bouillon. Mijoter 10 min.',ings:[],tip:null,kids:null},{num:4,title:'Haricots — écraser certains',text:'Ajouter les haricots. Écraser ¼ directement dans la casserole.',ings:[],tip:null,kids:null},{num:5,title:'Pâtes & finition',text:'Ajouter les pâtes, cuire al dente. Retirer le romarin. Servir avec parmesan.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Sofrito',text:'Sofreír suavemente cebolla, zanahoria y apio en aceite 10 min a fuego lento.',ings:[],tip:null,kids:null},{num:2,title:'Ajo y romero',text:'Añadir ajo y romero, cocinar 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Tomates y caldo',text:'Añadir tomates y caldo. Hervir 10 min.',ings:[],tip:null,kids:null},{num:4,title:'Alubias — aplastar algunas',text:'Añadir alubias. Aplastar ¼ directamente en la olla.',ings:[],tip:null,kids:null},{num:5,title:'Pasta y acabado',text:'Añadir pasta, cocinar al dente. Retirar romero. Servir con parmesano.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Sofrito',text:'Refogar suavemente cebola, cenoura e aipo em azeite 10 min a fogo lento.',ings:[],tip:null,kids:null},{num:2,title:'Alho e alecrim',text:'Adicionar alho e alecrim, cozinhar 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Tomates e caldo',text:'Adicionar tomates e caldo. Ferver 10 min.',ings:[],tip:null,kids:null},{num:4,title:'Feijão — esmagar alguns',text:'Adicionar feijão. Esmagar ¼ diretamente na panela.',ings:[],tip:null,kids:null},{num:5,title:'Massa e acabamento',text:'Adicionar massa, cozinhar al dente. Retirar alecrim. Servir com parmesão.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Soffritto',text:'Zwiebel, Karotte und Sellerie in Olivenöl bei niedriger Hitze 10 Min. sanft anbraten.',ings:[],tip:'Langsam und sanft — das Gemüse soll schmelzen, nicht bräunen.',kids:null},{num:2,title:'Knoblauch & Rosmarin',text:'Knoblauch und Rosmarin hinzufügen, 1 Min. köcheln.',ings:[],tip:null,kids:null},{num:3,title:'Tomaten & Brühe',text:'Tomaten und Brühe hinzufügen. 10 Min. köcheln.',ings:[],tip:null,kids:null},{num:4,title:'Bohnen — einige zerdrücken',text:'Bohnen hinzufügen. ¼ direkt im Topf zerdrücken.',ings:[],tip:null,kids:null},{num:5,title:'Pasta & fertigstellen',text:'Pasta hinzufügen, al dente kochen. Rosmarin entfernen. Mit Parmesan servieren.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:410,protein:18,carbs:65,fat:8,fiber:11}},

{id:5,emoji:'🫘',photo:'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80',
 tags:['Vegan','Asian','Quick','GlutenFree'],badges:['vegan','gf','protein'],
 prep:5,cook:25,
 name:{en:'Green Lentil Dal',fr:'Dal de Lentilles Vertes',es:'Dal de Lentejas Verdes',pt:'Dal de Lentilhas Verdes',de:'Grünes Linsen Dal'},
 subtitle:{en:'Warming, spiced & ready in 30 min',fr:'Réconfortant, épicé et prêt en 30 min',es:'Reconfortante, especiado y listo en 30 min',pt:'Reconfortante, temperado e pronto em 30 min',de:'Wärmend, würzig & in 30 Min. fertig'},
 desc:{en:'Creamy spiced lentils with coconut milk and wilted spinach. A weeknight staple.',fr:'Lentilles épicées crémeuses au lait de coco et épinards flétris.',es:'Lentejas especiadas cremosas con leche de coco y espinacas.',pt:'Lentilhas temperadas cremosas com leite de coco e espinafres.',de:'Cremige gewürzte Linsen mit Kokosmilch und Spinat.'},
 ingredients:[
   {emoji:'🫘',name:{en:'Green lentils',fr:'Lentilles vertes',es:'Lentejas verdes',pt:'Lentilhas verdes',de:'Grüne Linsen'},qty:200,unit:'g'},
   {emoji:'🥛',name:{en:'Coconut milk',fr:'Lait de coco',es:'Leche de coco',pt:'Leite de coco',de:'Kokosmilch'},qty:400,unit:'ml'},
   {emoji:'🍅',name:{en:'Chopped tomatoes',fr:'Tomates concassées',es:'Tomates troceados',pt:'Tomates picados',de:'Gehackte Tomaten'},qty:200,unit:'g'},
   {emoji:'🥬',name:{en:'Spinach',fr:'Épinards',es:'Espinacas',pt:'Espinafres',de:'Spinat'},qty:60,unit:'g'},
   {emoji:'🧅',name:{en:'Onion',fr:'Oignon',es:'Cebolla',pt:'Cebola',de:'Zwiebel'},qty:1,unit:''},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:3,unit:'cloves'},
   {emoji:'🌿',name:{en:'Fresh coriander',fr:'Coriandre fraîche',es:'Cilantro fresco',pt:'Coentro fresco',de:'Frischer Koriander'},qty:15,unit:'g'},
   {emoji:'🌾',name:{en:'Basmati rice',fr:'Riz basmati',es:'Arroz basmati',pt:'Arroz basmati',de:'Basmatireis'},qty:160,unit:'g'},
 ],
 base:{en:['Turmeric · 1 tsp','Cumin · 1 tsp','Salt','Oil'],fr:['Curcuma · 1 c.c.','Cumin · 1 c.c.','Sel'],es:['Cúrcuma · 1 c.c.','Comino · 1 c.c.','Sal'],pt:['Curcuma · 1 c.c.','Cominhos · 1 c.c.','Sal'],de:['Kurkuma · 1 TL','Kreuzkümmel · 1 TL','Salz']},
 steps:{
   en:[
     {num:1,title:'Start the rice',text:'Cook basmati rice according to packet. Keep warm.',ings:['🌾 Rice · 160g'],tip:null,kids:null},
     {num:2,title:'Fry onion & spices',text:'Sauté diced onion in oil until golden, about 6 minutes. Add garlic, turmeric and cumin — cook 1 more minute until fragrant.',ings:['🧅 Onion · 1','🧄 Garlic · 3 cloves'],tip:'The spices should sizzle in the oil — this blooms the flavour.',kids:null},
     {num:3,title:'Add lentils & liquids',text:'Add rinsed lentils, chopped tomatoes and coconut milk. Stir well. Bring to a boil.',ings:['🫘 Lentils · 200g','🍅 Tomatoes · 200g','🥛 Coconut milk · 400ml'],tip:null,kids:null},
     {num:4,title:'Simmer until creamy',text:'Reduce heat and simmer for 20 minutes, stirring occasionally, until lentils are completely soft and the dal is thick and creamy.',ings:[],tip:'If too thick, add a splash of water. If too thin, simmer a few more minutes.',kids:null},
     {num:5,title:'Finish with spinach',text:'Stir in spinach until wilted, about 1 minute. Season with salt. Serve over rice topped with fresh coriander.',ings:['🥬 Spinach · 60g','🌿 Coriander · 15g'],tip:null,kids:null},
   ],
   fr:[{num:1,title:'Cuire le riz',text:'Cuire le riz basmati selon les instructions.',ings:[],tip:null,kids:null},{num:2,title:'Oignon & épices',text:'Faire revenir l\'oignon jusqu\'à dorure. Ajouter ail, curcuma, cumin — 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Lentilles & liquides',text:'Ajouter lentilles rincées, tomates et lait de coco. Porter à ébullition.',ings:[],tip:null,kids:null},{num:4,title:'Mijoter',text:'Réduire le feu, mijoter 20 min jusqu\'à ce que les lentilles soient tendres.',ings:[],tip:null,kids:null},{num:5,title:'Épinards & service',text:'Incorporer les épinards. Servir sur riz avec coriandre fraîche.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Cocer el arroz',text:'Cocer el arroz basmati según instrucciones.',ings:[],tip:null,kids:null},{num:2,title:'Cebolla y especias',text:'Sofreír la cebolla hasta dorar. Añadir ajo, cúrcuma, comino — 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Lentejas y líquidos',text:'Añadir lentejas enjuagadas, tomates y leche de coco. Llevar a ebullición.',ings:[],tip:null,kids:null},{num:4,title:'Hervir a fuego lento',text:'Reducir fuego, hervir 20 min hasta que las lentejas estén tiernas.',ings:[],tip:null,kids:null},{num:5,title:'Espinacas y servicio',text:'Incorporar espinacas. Servir sobre arroz con cilantro.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Cozinhar o arroz',text:'Cozinhar o arroz basmati conforme instruções.',ings:[],tip:null,kids:null},{num:2,title:'Cebola e especiarias',text:'Refogar a cebola até dourar. Adicionar alho, curcuma, cominhos — 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Lentilhas e líquidos',text:'Adicionar lentilhas lavadas, tomates e leite de coco. Ferver.',ings:[],tip:null,kids:null},{num:4,title:'Ferver em lume brando',text:'Reduzir lume, ferver 20 min até as lentilhas ficarem macias.',ings:[],tip:null,kids:null},{num:5,title:'Espinafres e serviço',text:'Incorporar espinafres. Servir sobre arroz com coentro.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Reis kochen',text:'Basmatireis nach Packungsanweisung kochen.',ings:[],tip:null,kids:null},{num:2,title:'Zwiebel & Gewürze',text:'Zwiebel goldbraun anbraten. Knoblauch, Kurkuma, Kreuzkümmel hinzufügen — 1 Min.',ings:[],tip:null,kids:null},{num:3,title:'Linsen & Flüssigkeiten',text:'Gespülte Linsen, Tomaten und Kokosmilch hinzufügen. Aufkochen.',ings:[],tip:null,kids:null},{num:4,title:'Köcheln',text:'Hitze reduzieren, 20 Min. köcheln bis Linsen weich sind.',ings:[],tip:null,kids:null},{num:5,title:'Spinat & servieren',text:'Spinat einrühren. Auf Reis mit Koriander servieren.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:480,protein:22,carbs:72,fat:12,fiber:14}},

{id:6,emoji:'🥗',photo:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
 tags:['Vegetarian','Mediterranean','Salad','Quick','GlutenFree'],badges:['veg','gf'],
 prep:10,cook:0,
 name:{en:'Greek Salad',fr:'Salade Grecque',es:'Ensalada Griega',pt:'Salada Grega',de:'Griechischer Salat'},
 subtitle:{en:'Classic Horiatiki — bright & satisfying',fr:'Horiatiki classique — vif et rassasiant',es:'Horiatiki clásico — vibrante y saciante',pt:'Horiatiki clássico — vivo e saciante',de:'Klassischer Horiatiki — frisch & sättigend'},
 desc:{en:'Sun-ripened tomatoes, cucumber, olives and feta — the real Greek way.',fr:'Tomates mûres, concombre, olives et feta — à la vraie façon grecque.',es:'Tomates maduros al sol, pepino, aceitunas y feta — a la manera griega.',pt:'Tomates maduros ao sol, pepino, azeitonas e feta — à maneira grega.',de:'Sonnengereifte Tomaten, Gurke, Oliven und Feta — auf echte griechische Art.'},
 ingredients:[
   {emoji:'🍅',name:{en:'Ripe tomatoes',fr:'Tomates mûres',es:'Tomates maduros',pt:'Tomates maduros',de:'Reife Tomaten'},qty:300,unit:'g'},
   {emoji:'🥒',name:{en:'Cucumber',fr:'Concombre',es:'Pepino',pt:'Pepino',de:'Gurke'},qty:1,unit:''},
   {emoji:'🧅',name:{en:'Red onion',fr:'Oignon rouge',es:'Cebolla roja',pt:'Cebola roxa',de:'Rote Zwiebel'},qty:0.5,unit:''},
   {emoji:'🧀',name:{en:'Feta (block)',fr:'Feta (bloc)',es:'Feta (bloque)',pt:'Feta (bloco)',de:'Feta (Block)'},qty:100,unit:'g'},
   {emoji:'🫒',name:{en:'Kalamata olives',fr:'Olives Kalamata',es:'Aceitunas Kalamata',pt:'Azeitonas Kalamata',de:'Kalamata-Oliven'},qty:80,unit:'g'},
   {emoji:'🍋',name:{en:'Lemon',fr:'Citron',es:'Limón',pt:'Limão',de:'Zitrone'},qty:0.5,unit:''},
 ],
 base:{en:['Olive oil · 45ml','Dried oregano · 1 tsp','Salt & pepper'],fr:['Huile d\'olive · 45ml','Origan séché · 1 c.c.','Sel'],es:['Aceite de oliva · 45ml','Orégano seco · 1 c.c.','Sal'],pt:['Azeite · 45ml','Orégão seco · 1 c.c.','Sal'],de:['Olivenöl · 45ml','Getrockneter Oregano · 1 TL','Salz']},
 steps:{
   en:[
     {num:1,title:'Chop the veg',text:'Cut tomatoes into large wedges. Slice cucumber into half-moons. Thinly slice red onion.',ings:['🍅 Tomatoes · 300g','🥒 Cucumber · 1','🧅 Red onion · ½'],tip:'Use the ripest tomatoes you can find — this salad lives or dies by them.',kids:null},
     {num:2,title:'Combine',text:'Put all vegetables in a wide bowl. Add olives and toss gently.',ings:['🫒 Olives · 80g'],tip:null,kids:null},
     {num:3,title:'Dress & finish',text:'Place the feta block whole on top (don\'t crumble it yet). Drizzle with olive oil, a squeeze of lemon and a generous pinch of dried oregano. Season with salt.',ings:['🧀 Feta · 100g','🍋 Lemon · ½'],tip:'Letting the feta sit whole keeps it moist. Break it as you serve.',kids:null},
     {num:4,title:'Rest & serve',text:'Let the salad sit for 5 minutes before serving — the tomatoes will release their juices into the dressing.',ings:[],tip:null,kids:null},
   ],
   fr:[{num:1,title:'Couper les légumes',text:'Couper les tomates en grosses tranches. Trancher le concombre. Émincer l\'oignon rouge.',ings:[],tip:null,kids:null},{num:2,title:'Combiner',text:'Mettre tous les légumes dans un bol. Ajouter les olives.',ings:[],tip:null,kids:null},{num:3,title:'Assaisonner',text:'Poser le bloc de feta entier dessus. Arroser d\'huile d\'olive, jus de citron et origan.',ings:[],tip:null,kids:null},{num:4,title:'Reposer et servir',text:'Laisser reposer 5 minutes.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Cortar las verduras',text:'Cortar los tomates en gajos. El pepino en medias lunas. La cebolla roja fina.',ings:[],tip:null,kids:null},{num:2,title:'Combinar',text:'Poner todo en un bol. Añadir aceitunas.',ings:[],tip:null,kids:null},{num:3,title:'Aliñar',text:'Colocar el bloque de feta entero encima. Aceite de oliva, limón y orégano.',ings:[],tip:null,kids:null},{num:4,title:'Reposar y servir',text:'Dejar reposar 5 minutos.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Cortar os legumes',text:'Cortar os tomates em gomos. Pepino em meias-luas. Cebola roxa fina.',ings:[],tip:null,kids:null},{num:2,title:'Combinar',text:'Colocar tudo numa tigela. Adicionar azeitonas.',ings:[],tip:null,kids:null},{num:3,title:'Temperar',text:'Colocar o bloco de feta inteiro por cima. Azeite, limão e orégão.',ings:[],tip:null,kids:null},{num:4,title:'Repousar e servir',text:'Deixar repousar 5 minutos.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Gemüse schneiden',text:'Tomaten in große Spalten schneiden. Gurke in Halbmonde. Rote Zwiebel dünn schneiden.',ings:[],tip:null,kids:null},{num:2,title:'Kombinieren',text:'Alles in eine Schüssel. Oliven dazugeben.',ings:[],tip:null,kids:null},{num:3,title:'Anmachen',text:'Feta-Block ganz darauflegen. Mit Olivenöl, Zitrone und Oregano beträufeln.',ings:[],tip:null,kids:null},{num:4,title:'Ruhen lassen & servieren',text:'5 Minuten ruhen lassen.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:260,protein:9,carbs:12,fat:19,fiber:3}},

{id:7,emoji:'🍜',photo:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
 tags:['Vegan','Asian','Quick','GlutenFree'],badges:['vegan','gf'],
 prep:5,cook:15,
 name:{en:'Miso Noodle Soup',fr:'Soupe de Nouilles Miso',es:'Sopa de Fideos Miso',pt:'Sopa de Noodles Miso',de:'Miso-Nudelsuppe'},
 subtitle:{en:'Light, umami-rich & deeply comforting',fr:'Légère, riche en umami et réconfortante',es:'Ligera, rica en umami y reconfortante',pt:'Leve, rica em umami e reconfortante',de:'Leicht, umami-reich & tief tröstlich'},
 desc:{en:'A nourishing Japanese-inspired bowl with silken tofu, mushrooms and noodles in a miso broth.',fr:'Un bol nourrissant à la japonaise avec tofu soyeux, champignons et nouilles dans un bouillon miso.',es:'Un bol nutritivo de inspiración japonesa con tofu, setas y fideos en caldo miso.',pt:'Uma tigela nutritiva de inspiração japonesa com tofu, cogumelos e noodles em caldo miso.',de:'Eine nährende japanisch inspirierte Schüssel mit Seidentofu, Pilzen und Nudeln in Misobrühe.'},
 ingredients:[
   {emoji:'🧱',name:{en:'Silken tofu',fr:'Tofu soyeux',es:'Tofu sedoso',pt:'Tofu sedoso',de:'Seidentofu'},qty:200,unit:'g'},
   {emoji:'🫙',name:{en:'White miso paste',fr:'Pâte miso blanche',es:'Pasta miso blanca',pt:'Pasta miso branca',de:'Weiße Misopaste'},qty:45,unit:'g'},
   {emoji:'🍄',name:{en:'Mushrooms',fr:'Champignons',es:'Setas',pt:'Cogumelos',de:'Pilze'},qty:100,unit:'g'},
   {emoji:'🥬',name:{en:'Spinach',fr:'Épinards',es:'Espinacas',pt:'Espinafres',de:'Spinat'},qty:30,unit:'g'},
   {emoji:'🍜',name:{en:'Noodles',fr:'Nouilles',es:'Fideos',pt:'Noodles',de:'Nudeln'},qty:80,unit:'g'},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:1,unit:'clove'},
 ],
 base:{en:['Soy sauce · 15ml','Sesame oil · 1 tsp','Spring onion to serve'],fr:['Sauce soja · 15ml','Huile de sésame · 1 c.c.'],es:['Salsa de soja · 15ml','Aceite de sésamo · 1 c.c.'],pt:['Molho de soja · 15ml','Óleo de sésamo · 1 c.c.'],de:['Sojasoße · 15ml','Sesamöl · 1 TL']},
 steps:{
   en:[
     {num:1,title:'Heat the broth',text:'Bring 800ml water to a gentle simmer — never a rolling boil. Add sliced mushrooms and garlic. Simmer 3 minutes.',ings:['🍄 Mushrooms · 100g'],tip:'Boiling destroys miso\'s beneficial enzymes — always simmer gently.',kids:null},
     {num:2,title:'Cook the noodles',text:'Add noodles and cook per packet instructions (usually 3–4 minutes).',ings:['🍜 Noodles · 80g'],tip:null,kids:null},
     {num:3,title:'Add tofu',text:'Cube the tofu and add to the pot. Simmer 2 minutes to heat through.',ings:['🧱 Tofu · 200g'],tip:'Silken tofu breaks apart easily — add gently.',kids:null},
     {num:4,title:'Dissolve the miso',text:'Turn off the heat. Scoop miso into a small bowl, add 2 tbsp of the hot broth, whisk until smooth, then stir back into the pot.',ings:['🫙 Miso · 45g'],tip:'Never boil after adding miso — the flavour and probiotics are heat-sensitive.',kids:null},
     {num:5,title:'Finish & serve',text:'Add spinach until wilted. Add a few drops of sesame oil. Serve immediately in deep bowls with soy sauce on the side.',ings:['🥬 Spinach · 30g'],tip:null,kids:null},
   ],
   fr:[{num:1,title:'Chauffer le bouillon',text:'Porter 800ml d\'eau à frémissement. Ajouter champignons et ail. Mijoter 3 min.',ings:[],tip:'Ne jamais bouillir — cela détruit les enzymes du miso.',kids:null},{num:2,title:'Cuire les nouilles',text:'Ajouter les nouilles et cuire selon les instructions.',ings:[],tip:null,kids:null},{num:3,title:'Ajouter le tofu',text:'Couper le tofu en cubes et ajouter. Mijoter 2 min.',ings:[],tip:null,kids:null},{num:4,title:'Dissoudre le miso',text:'Éteindre le feu. Diluer le miso dans du bouillon chaud, puis incorporer.',ings:[],tip:null,kids:null},{num:5,title:'Finir et servir',text:'Ajouter les épinards. Quelques gouttes d\'huile de sésame. Servir immédiatement.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Calentar el caldo',text:'Llevar 800ml de agua a ebullición suave. Añadir setas y ajo. Hervir 3 min.',ings:[],tip:null,kids:null},{num:2,title:'Cocer los fideos',text:'Añadir los fideos y cocer según las instrucciones.',ings:[],tip:null,kids:null},{num:3,title:'Añadir el tofu',text:'Cortar el tofu en cubos y añadir. Hervir 2 min.',ings:[],tip:null,kids:null},{num:4,title:'Disolver el miso',text:'Apagar el fuego. Disolver el miso en caldo caliente, luego incorporar.',ings:[],tip:null,kids:null},{num:5,title:'Terminar y servir',text:'Añadir espinacas. Unas gotas de aceite de sésamo. Servir inmediatamente.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Aquecer o caldo',text:'Ferver 800ml de água suavemente. Adicionar cogumelos e alho. Ferver 3 min.',ings:[],tip:null,kids:null},{num:2,title:'Cozinhar os noodles',text:'Adicionar noodles e cozinhar conforme instruções.',ings:[],tip:null,kids:null},{num:3,title:'Adicionar o tofu',text:'Cortar o tofu em cubos e adicionar. Ferver 2 min.',ings:[],tip:null,kids:null},{num:4,title:'Dissolver o miso',text:'Apagar o lume. Dissolver o miso em caldo quente, depois incorporar.',ings:[],tip:null,kids:null},{num:5,title:'Finalizar e servir',text:'Adicionar espinafres. Gotas de óleo de sésamo. Servir imediatamente.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Brühe erhitzen',text:'800ml Wasser zum sanften Köcheln bringen. Pilze und Knoblauch hinzufügen. 3 Min. köcheln.',ings:[],tip:'Nie kochen — zerstört Misos Enzyme.',kids:null},{num:2,title:'Nudeln kochen',text:'Nudeln nach Packungsanweisung kochen.',ings:[],tip:null,kids:null},{num:3,title:'Tofu hinzufügen',text:'Tofu würfeln und hinzufügen. 2 Min. köcheln.',ings:[],tip:null,kids:null},{num:4,title:'Miso auflösen',text:'Feuer ausschalten. Miso in heißer Brühe auflösen, dann einrühren.',ings:[],tip:null,kids:null},{num:5,title:'Fertigstellen & servieren',text:'Spinat einrühren. Sesamöl-Tropfen. Sofort servieren.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:290,protein:15,carbs:34,fat:10,fiber:4}},

{id:8,emoji:'🌮',photo:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
 tags:['Vegan','Quick','ComfortFood'],badges:['vegan'],
 prep:15,cook:10,
 name:{en:'Black Bean Tacos',fr:'Tacos aux Haricots Noirs',es:'Tacos de Frijoles Negros',pt:'Tacos de Feijão Preto',de:'Schwarze-Bohnen-Tacos'},
 subtitle:{en:'Smoky, fresh & weeknight-fast',fr:'Fumé, frais et rapide en semaine',es:'Ahumado, fresco y rápido entre semana',pt:'Defumado, fresco e rápido nos dias da semana',de:'Rauchig, frisch & schnell für die Woche'},
 desc:{en:'Smoky black beans, avocado crema and zingy tomato salsa in warm tortillas.',fr:'Haricots noirs fumés, crème d\'avocat et salsa tomate dans des tortillas chaudes.',es:'Frijoles negros ahumados, crema de aguacate y salsa de tomate en tortillas calientes.',pt:'Feijão preto defumado, creme de abacate e salsa de tomate em tortillas quentes.',de:'Rauchige schwarze Bohnen, Avocado-Crema und Tomatensalsa in warmen Tortillas.'},
 ingredients:[
   {emoji:'🫘',name:{en:'Black beans (tin)',fr:'Haricots noirs (boîte)',es:'Frijoles negros (lata)',pt:'Feijão preto (lata)',de:'Schwarze Bohnen (Dose)'},qty:400,unit:'g'},
   {emoji:'🌮',name:{en:'Small tortillas',fr:'Petites tortillas',es:'Tortillas pequeñas',pt:'Tortillas pequenas',de:'Kleine Tortillas'},qty:8,unit:''},
   {emoji:'🥑',name:{en:'Avocados',fr:'Avocats',es:'Aguacates',pt:'Abacates',de:'Avocados'},qty:2,unit:''},
   {emoji:'🍋',name:{en:'Limes',fr:'Citrons verts',es:'Limas',pt:'Limas',de:'Limetten'},qty:2,unit:''},
   {emoji:'🍅',name:{en:'Cherry tomatoes',fr:'Tomates cerises',es:'Tomates cherry',pt:'Tomates cherry',de:'Kirschtomaten'},qty:150,unit:'g'},
   {emoji:'🌿',name:{en:'Fresh coriander',fr:'Coriandre fraîche',es:'Cilantro fresco',pt:'Coentro fresco',de:'Frischer Koriander'},qty:15,unit:'g'},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:2,unit:'cloves'},
 ],
 base:{en:['Cumin · 1 tsp','Smoked paprika · 1 tsp','Olive oil','Salt & chilli'],fr:['Cumin · 1 c.c.','Paprika fumé · 1 c.c.','Huile d\'olive'],es:['Comino · 1 c.c.','Pimentón ahumado · 1 c.c.','Aceite de oliva'],pt:['Cominhos · 1 c.c.','Páprica fumada · 1 c.c.','Azeite'],de:['Kreuzkümmel · 1 TL','Geräucherter Paprika · 1 TL','Olivenöl']},
 steps:{
   en:[
     {num:1,title:'Make the guacamole',text:'Halve and scoop avocados. Mash with a fork with juice of 1 lime and a pinch of salt. Keep chunky.',ings:['🥑 Avocados · 2','🍋 Lime · 1'],tip:'Press cling film directly onto the surface to stop browning.',kids:'Kids love mashing the avocado! 🧒'},
     {num:2,title:'Make the salsa',text:'Halve cherry tomatoes. Finely chop red onion and coriander. Mix together with juice of ½ lime and a pinch of salt.',ings:['🍅 Cherry tomatoes · 150g','🌿 Coriander · 15g'],tip:null,kids:null},
     {num:3,title:'Cook the beans',text:'Heat oil in a pan. Fry garlic 1 minute. Add drained beans, cumin, smoked paprika and a splash of water. Cook 5 minutes, mashing slightly.',ings:['🫘 Black beans · 400g','🧄 Garlic · 2 cloves'],tip:'A few mashed beans helps the filling hold together in the taco.',kids:null},
     {num:4,title:'Warm the tortillas',text:'Warm tortillas one at a time in a dry pan for 30 seconds per side, or wrap in a damp cloth and microwave 1 minute.',ings:['🌮 Tortillas · 8'],tip:null,kids:null},
     {num:5,title:'Assemble',text:'Spread guacamole on each tortilla. Add beans, then salsa. Serve immediately with extra lime wedges.',ings:[],tip:null,kids:'Let kids build their own tacos! 🧒'},
   ],
   fr:[{num:1,title:'Guacamole',text:'Écraser les avocats avec le jus d\'un citron vert et sel.',ings:[],tip:null,kids:'Les enfants adorent écraser l\'avocat ! 🧒'},{num:2,title:'Salsa',text:'Couper les tomates en deux. Hacher l\'oignon rouge et la coriandre. Mélanger avec jus de citron vert.',ings:[],tip:null,kids:null},{num:3,title:'Cuire les haricots',text:'Chauffer huile, faire revenir l\'ail 1 min. Ajouter haricots égouttés, cumin, paprika fumé. Cuire 5 min.',ings:[],tip:null,kids:null},{num:4,title:'Chauffer les tortillas',text:'Chauffer les tortillas dans une poêle sèche 30 sec de chaque côté.',ings:[],tip:null,kids:null},{num:5,title:'Assembler',text:'Tartiner de guacamole, ajouter les haricots et la salsa.',ings:[],tip:null,kids:'Laissez les enfants assembler ! 🧒'}],
   es:[{num:1,title:'Guacamole',text:'Aplastar los aguacates con zumo de lima y sal.',ings:[],tip:null,kids:'¡A los niños les encanta aplastar el aguacate! 🧒'},{num:2,title:'Salsa',text:'Partir los tomates cherry. Picar cebolla roja y cilantro. Mezclar con lima.',ings:[],tip:null,kids:null},{num:3,title:'Cocinar los frijoles',text:'Calentar aceite, sofreír ajo 1 min. Añadir frijoles escurridos, comino, pimentón. Cocinar 5 min.',ings:[],tip:null,kids:null},{num:4,title:'Calentar las tortillas',text:'Calentar las tortillas en sartén seca 30 seg por lado.',ings:[],tip:null,kids:null},{num:5,title:'Montar',text:'Untar con guacamole, añadir frijoles y salsa.',ings:[],tip:null,kids:'¡Deja que los niños monten sus tacos! 🧒'}],
   pt:[{num:1,title:'Guacamole',text:'Esmagar os abacates com sumo de lima e sal.',ings:[],tip:null,kids:'As crianças adoram esmagar o abacate! 🧒'},{num:2,title:'Salsa',text:'Cortar os tomates cherry. Picar a cebola roxa e o coentro. Misturar com lima.',ings:[],tip:null,kids:null},{num:3,title:'Cozinhar o feijão',text:'Aquecer azeite, refogar alho 1 min. Adicionar feijão escorrido, cominhos, páprica. Cozinhar 5 min.',ings:[],tip:null,kids:null},{num:4,title:'Aquecer as tortillas',text:'Aquecer as tortillas numa frigideira seca 30 seg de cada lado.',ings:[],tip:null,kids:null},{num:5,title:'Montar',text:'Barrar com guacamole, adicionar feijão e salsa.',ings:[],tip:null,kids:'Deixe as crianças montar os seus tacos! 🧒'}],
   de:[{num:1,title:'Guacamole',text:'Avocados mit Limettensaft und Salz zerdrücken.',ings:[],tip:null,kids:'Kinder lieben das Zerdrücken! 🧒'},{num:2,title:'Salsa',text:'Kirschtomaten halbieren. Rote Zwiebel und Koriander fein hacken. Mit Limettensaft mischen.',ings:[],tip:null,kids:null},{num:3,title:'Bohnen kochen',text:'Öl erhitzen, Knoblauch 1 Min. anbraten. Abgetropfte Bohnen, Kreuzkümmel, Paprika hinzufügen. 5 Min. kochen.',ings:[],tip:null,kids:null},{num:4,title:'Tortillas erwärmen',text:'Tortillas in trockener Pfanne 30 Sek. pro Seite erwärmen.',ings:[],tip:null,kids:null},{num:5,title:'Zusammenbauen',text:'Mit Guacamole bestreichen, Bohnen und Salsa drauf.',ings:[],tip:null,kids:'Kinder können ihre eigenen Tacos bauen! 🧒'}],
 },
 nutrition:{kcal:440,protein:16,carbs:68,fat:14,fiber:13}},

{id:9,emoji:'🍝',photo:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80',
 tags:['Vegetarian','Quick','Mediterranean'],badges:['veg'],
 prep:5,cook:20,
 name:{en:'Tomato Basil Pasta',fr:'Pâtes Tomate Basilic',es:'Pasta Tomate y Albahaca',pt:'Massa Tomate e Manjericão',de:'Tomaten-Basilikum-Pasta'},
 subtitle:{en:'Simple, vibrant & ready in 20 minutes',fr:'Simple, vif et prêt en 20 minutes',es:'Simple, vibrante y listo en 20 minutos',pt:'Simples, vibrante e pronto em 20 minutos',de:'Einfach, lebendig & in 20 Min. fertig'},
 desc:{en:'Al dente pasta with jammy cherry tomatoes, fragrant garlic and fresh basil.',fr:'Pâtes al dente avec tomates cerises confites, ail parfumé et basilic frais.',es:'Pasta al dente con tomates cherry confitados, ajo aromático y albahaca fresca.',pt:'Massa al dente com tomates cherry caramelizados, alho aromático e manjericão fresco.',de:'Al dente Pasta mit konfierten Kirschtomaten, aromatischem Knoblauch und frischem Basilikum.'},
 ingredients:[
   {emoji:'🍝',name:{en:'Pasta (spaghetti or penne)',fr:'Pâtes (spaghetti ou penne)',es:'Pasta (espagueti o penne)',pt:'Massa (esparguete ou penne)',de:'Pasta (Spaghetti oder Penne)'},qty:320,unit:'g'},
   {emoji:'🍅',name:{en:'Cherry tomatoes',fr:'Tomates cerises',es:'Tomates cherry',pt:'Tomates cherry',de:'Kirschtomaten'},qty:400,unit:'g'},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:4,unit:'cloves'},
   {emoji:'🌿',name:{en:'Fresh basil',fr:'Basilic frais',es:'Albahaca fresca',pt:'Manjericão fresco',de:'Frisches Basilikum'},qty:20,unit:'g'},
   {emoji:'🧀',name:{en:'Parmesan',fr:'Parmesan',es:'Parmesano',pt:'Parmesão',de:'Parmesan'},qty:40,unit:'g'},
 ],
 base:{en:['Olive oil · 60ml','Chilli flakes · ½ tsp','Salt & pepper'],fr:['Huile d\'olive · 60ml','Flocons de piment · ½ c.c.'],es:['Aceite de oliva · 60ml','Copos de chile · ½ c.c.'],pt:['Azeite · 60ml','Flocos de pimenta · ½ c.c.'],de:['Olivenöl · 60ml','Chiliflocken · ½ TL']},
 steps:{
   en:[
     {num:1,title:'Salt the pasta water',text:'Bring a large pot of generously salted water to a boil — it should taste like the sea. Cook pasta until al dente. Before draining, scoop out 1 cup of pasta water.',ings:['🍝 Pasta · 320g'],tip:'The pasta water is liquid gold — the starch thickens and binds the sauce.',kids:null},
     {num:2,title:'Blister the tomatoes',text:'While pasta cooks, heat olive oil in a wide pan over medium heat. Add halved cherry tomatoes and cook without stirring for 3–4 minutes until they start to burst and caramelise.',ings:['🍅 Cherry tomatoes · 400g'],tip:'Don\'t rush them — the blistering creates deep, jammy flavour.',kids:null},
     {num:3,title:'Add garlic & chilli',text:'Push tomatoes to the side. Add sliced garlic and chilli flakes to the centre of the pan. Cook 1 minute until golden — not brown.',ings:['🧄 Garlic · 4 cloves'],tip:null,kids:null},
     {num:4,title:'Bring it together',text:'Add hot drained pasta directly to the pan. Add a splash of pasta water and toss vigorously for 1–2 minutes until the sauce emulsifies and coats every strand.',ings:[],tip:'Use tongs and keep tossing — the movement creates the silky sauce.',kids:null},
     {num:5,title:'Finish with basil & parmesan',text:'Remove from heat. Tear in fresh basil and grate parmesan on top. Taste and season. Serve immediately.',ings:['🌿 Basil · 20g','🧀 Parmesan · 40g'],tip:null,kids:null},
   ],
   fr:[{num:1,title:'Eau à pâtes',text:'Porter à ébullition de l\'eau généreusement salée. Cuire les pâtes al dente. Réserver 1 tasse d\'eau.',ings:[],tip:'L\'eau de cuisson est de l\'or liquide.',kids:null},{num:2,title:'Brûler les tomates',text:'Chauffer l\'huile. Ajouter les tomates cerises coupées en deux, cuire 3–4 min sans remuer.',ings:[],tip:null,kids:null},{num:3,title:'Ail & piment',text:'Pousser les tomates de côté. Ajouter l\'ail émincé et les flocons de piment. Cuire 1 min.',ings:[],tip:null,kids:null},{num:4,title:'Assembler',text:'Ajouter les pâtes égouttées dans la poêle. Ajouter l\'eau de cuisson. Mélanger vigoureusement.',ings:[],tip:null,kids:null},{num:5,title:'Finir avec basilic & parmesan',text:'Retirer du feu. Déchirer le basilic et râper le parmesan.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Agua de pasta',text:'Llevar a ebullición agua con mucha sal. Cocer la pasta al dente. Reservar 1 taza del agua.',ings:[],tip:null,kids:null},{num:2,title:'Chamuscar los tomates',text:'Calentar aceite. Añadir los tomates cherry cortados por la mitad, cocinar 3–4 min sin remover.',ings:[],tip:null,kids:null},{num:3,title:'Ajo y chile',text:'Apartar los tomates. Añadir ajo laminado y copos de chile. Cocinar 1 min.',ings:[],tip:null,kids:null},{num:4,title:'Montar',text:'Añadir la pasta escurrida a la sartén. Añadir agua de cocción. Mezclar vigorosamente.',ings:[],tip:null,kids:null},{num:5,title:'Acabar con albahaca y parmesano',text:'Retirar del fuego. Romper la albahaca y rallar el parmesano.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Água da massa',text:'Ferver água com muito sal. Cozinhar a massa al dente. Reservar 1 chávena da água.',ings:[],tip:null,kids:null},{num:2,title:'Tomates chamuscados',text:'Aquecer azeite. Adicionar os tomates cherry cortados ao meio, cozinhar 3–4 min sem mexer.',ings:[],tip:null,kids:null},{num:3,title:'Alho e pimenta',text:'Afastar os tomates. Adicionar alho laminado e flocos de pimenta. Cozinhar 1 min.',ings:[],tip:null,kids:null},{num:4,title:'Montar',text:'Adicionar a massa escorrida à frigideira. Adicionar água de cozedura. Misturar vigorosamente.',ings:[],tip:null,kids:null},{num:5,title:'Finalizar com manjericão e parmesão',text:'Retirar do lume. Rasgar o manjericão e ralar o parmesão.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Nudelwasser',text:'Großzügig gesalzenes Wasser zum Kochen bringen. Pasta al dente kochen. 1 Tasse Kochwasser aufheben.',ings:[],tip:'Das Kochwasser ist flüssiges Gold.',kids:null},{num:2,title:'Tomaten anrösten',text:'Öl erhitzen. Halbierte Kirschtomaten hinzufügen, 3–4 Min. ohne Rühren kochen.',ings:[],tip:null,kids:null},{num:3,title:'Knoblauch & Chili',text:'Tomaten zur Seite schieben. Geschnittenen Knoblauch und Chiliflocken hinzufügen. 1 Min. kochen.',ings:[],tip:null,kids:null},{num:4,title:'Zusammenführen',text:'Abgetropfte Pasta in die Pfanne geben. Kochwasser hinzufügen. Kräftig schwenken.',ings:[],tip:null,kids:null},{num:5,title:'Mit Basilikum & Parmesan fertigstellen',text:'Vom Feuer nehmen. Basilikum zerreißen und Parmesan reiben.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:490,protein:16,carbs:78,fat:14,fiber:5}},

{id:10,emoji:'🍲',photo:'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
 tags:['Vegan','Soup','GlutenFree','ComfortFood'],badges:['vegan','gf','protein'],
 prep:10,cook:35,
 name:{en:'Golden Lentil Soup',fr:'Soupe de Lentilles Dorée',es:'Sopa de Lentejas Dorada',pt:'Sopa de Lentilhas Dourada',de:'Goldene Linsensuppe'},
 subtitle:{en:'Thick, spiced & deeply satisfying',fr:'Épaisse, épicée et profondément rassasiante',es:'Espesa, especiada y muy saciante',pt:'Espessa, temperada e muito saciante',de:'Dick, würzig & tiefgründig sättigend'},
 desc:{en:'A bowl of this golden, deeply spiced soup is all you need on a cold day.',fr:'Un bol de cette soupe dorée et épicée est tout ce dont vous avez besoin.',es:'Un tazón de esta sopa dorada y especiada es todo lo que necesitas.',pt:'Uma tigela desta sopa dourada e temperada é tudo que precisa.',de:'Eine Schüssel dieser goldenen, würzigen Suppe ist alles, was man an einem kalten Tag braucht.'},
 ingredients:[
   {emoji:'🫘',name:{en:'Red lentils',fr:'Lentilles rouges',es:'Lentejas rojas',pt:'Lentilhas vermelhas',de:'Rote Linsen'},qty:250,unit:'g'},
   {emoji:'🧅',name:{en:'Onions',fr:'Oignons',es:'Cebollas',pt:'Cebolas',de:'Zwiebeln'},qty:2,unit:''},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:4,unit:'cloves'},
   {emoji:'🥕',name:{en:'Carrots',fr:'Carottes',es:'Zanahorias',pt:'Cenouras',de:'Karotten'},qty:2,unit:''},
   {emoji:'🍅',name:{en:'Chopped tomatoes',fr:'Tomates concassées',es:'Tomates troceados',pt:'Tomates picados',de:'Gehackte Tomaten'},qty:200,unit:'g'},
   {emoji:'🍋',name:{en:'Lemon',fr:'Citron',es:'Limón',pt:'Limão',de:'Zitrone'},qty:1,unit:''},
 ],
 base:{en:['Stock · 1L','Cumin · 2 tsp','Turmeric · 1 tsp','Smoked paprika · 1 tsp','Olive oil · 45ml'],fr:['Bouillon · 1L','Cumin · 2 c.c.','Curcuma · 1 c.c.'],es:['Caldo · 1L','Comino · 2 c.c.','Cúrcuma · 1 c.c.'],pt:['Caldo · 1L','Cominhos · 2 c.c.','Curcuma · 1 c.c.'],de:['Brühe · 1L','Kreuzkümmel · 2 TL','Kurkuma · 1 TL']},
 steps:{
   en:[
     {num:1,title:'Caramelise the onions',text:'Slice onions and cook in olive oil over medium heat for 15 minutes, stirring occasionally, until deeply golden and sweet.',ings:['🧅 Onions · 2'],tip:'This is the flavour foundation — don\'t rush it. Deep golden colour = deep flavour.',kids:null},
     {num:2,title:'Add aromatics',text:'Add garlic, cumin, turmeric and smoked paprika. Stir and cook 1 minute until fragrant.',ings:['🧄 Garlic · 4 cloves'],tip:null,kids:null},
     {num:3,title:'Add lentils & liquid',text:'Add carrots, rinsed lentils, chopped tomatoes and stock. Bring to a boil.',ings:['🫘 Lentils · 250g','🥕 Carrots · 2','🍅 Tomatoes · 200g'],tip:null,kids:null},
     {num:4,title:'Simmer until soft',text:'Reduce heat and simmer for 25 minutes until lentils are completely soft and starting to dissolve.',ings:[],tip:null,kids:null},
     {num:5,title:'Blend & finish',text:'Use a stick blender to blend about half the soup for a creamy-yet-chunky texture. Season with lemon juice and salt. Top with crispy fried onion if you like.',ings:['🍋 Lemon · 1'],tip:'The half-blend is the secret — you get body AND texture.',kids:null},
   ],
   fr:[{num:1,title:'Caraméliser les oignons',text:'Faire revenir les oignons émincés dans l\'huile 15 min jusqu\'à dorure profonde.',ings:[],tip:'Ne pas précipiter — couleur dorée = saveur profonde.',kids:null},{num:2,title:'Ajouter les aromates',text:'Ajouter ail, cumin, curcuma et paprika fumé. Remuer 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Ajouter lentilles & liquide',text:'Ajouter carottes, lentilles rincées, tomates et bouillon. Porter à ébullition.',ings:[],tip:null,kids:null},{num:4,title:'Mijoter',text:'Mijoter 25 min jusqu\'à ce que les lentilles soient tendres.',ings:[],tip:null,kids:null},{num:5,title:'Mixer et finir',text:'Mixer la moitié de la soupe. Assaisonner avec jus de citron et sel.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Caramelizar las cebollas',text:'Sofreír las cebollas en rodajas en aceite 15 min hasta dorar profundamente.',ings:[],tip:null,kids:null},{num:2,title:'Añadir los aromáticos',text:'Añadir ajo, comino, cúrcuma y pimentón ahumado. Remover 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Añadir lentejas y líquido',text:'Añadir zanahorias, lentejas enjuagadas, tomates y caldo. Llevar a ebullición.',ings:[],tip:null,kids:null},{num:4,title:'Hervir a fuego lento',text:'Hervir 25 min hasta que las lentejas estén tiernas.',ings:[],tip:null,kids:null},{num:5,title:'Triturar y terminar',text:'Triturar la mitad de la sopa. Sazonar con limón y sal.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Caramelizar as cebolas',text:'Refogar as cebolas em fatias no azeite 15 min até dourar profundamente.',ings:[],tip:null,kids:null},{num:2,title:'Adicionar aromáticos',text:'Adicionar alho, cominhos, curcuma e páprica fumada. Mexer 1 min.',ings:[],tip:null,kids:null},{num:3,title:'Adicionar lentilhas e líquido',text:'Adicionar cenouras, lentilhas lavadas, tomates e caldo. Ferver.',ings:[],tip:null,kids:null},{num:4,title:'Ferver em lume brando',text:'Ferver 25 min até as lentilhas ficarem macias.',ings:[],tip:null,kids:null},{num:5,title:'Triturar e finalizar',text:'Triturar metade da sopa. Temperar com limão e sal.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Zwiebeln karamellisieren',text:'Geschnittene Zwiebeln in Öl 15 Min. bis zur tiefen Goldfarbe anbraten.',ings:[],tip:'Nicht hetzen — tiefe Farbe = tiefer Geschmack.',kids:null},{num:2,title:'Gewürze hinzufügen',text:'Knoblauch, Kreuzkümmel, Kurkuma und Paprika hinzufügen. 1 Min. rühren.',ings:[],tip:null,kids:null},{num:3,title:'Linsen & Flüssigkeit',text:'Karotten, gespülte Linsen, Tomaten und Brühe hinzufügen. Aufkochen.',ings:[],tip:null,kids:null},{num:4,title:'Köcheln',text:'25 Min. köcheln bis Linsen weich sind.',ings:[],tip:null,kids:null},{num:5,title:'Mixen & fertigstellen',text:'Hälfte der Suppe mixen. Mit Zitronensaft und Salz würzen.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:340,protein:18,carbs:52,fat:7,fiber:10}},

{id:11,emoji:'🥕',photo:'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&q=80',
 tags:['Vegetarian','Mediterranean','GlutenFree'],badges:['veg','gf'],
 prep:10,cook:35,
 name:{en:'Roasted Vegetable Tray Bake',fr:'Légumes Rôtis au Four',es:'Bandeja de Verduras Asadas',pt:'Assado de Legumes no Forno',de:'Ofengemüse Auflauf'},
 subtitle:{en:'Effortless, colourful & hands-off',fr:'Sans effort, coloré et sans surveillance',es:'Sin esfuerzo, colorido y sin vigilancia',pt:'Sem esforço, colorido e sem vigilância',de:'Mühelos, bunt & ohne Aufwand'},
 desc:{en:'Seasonal vegetables roasted to golden perfection with a creamy garlic yogurt sauce.',fr:'Légumes de saison rôtis à la perfection avec une sauce au yaourt à l\'ail.',es:'Verduras de temporada asadas a la perfección con una salsa de yogur y ajo.',pt:'Vegetais sazonais assados à perfeição com molho de iogurte e alho.',de:'Saisongemüse goldbraun geröstet mit cremiger Knoblauch-Joghurtsauce.'},
 ingredients:[
   {emoji:'🍠',name:{en:'Sweet potato',fr:'Patate douce',es:'Boniato',pt:'Batata-doce',de:'Süßkartoffel'},qty:300,unit:'g'},
   {emoji:'🫑',name:{en:'Bell peppers',fr:'Poivrons',es:'Pimientos',pt:'Pimentos',de:'Paprikaschoten'},qty:2,unit:''},
   {emoji:'🥒',name:{en:'Courgette',fr:'Courgette',es:'Calabacín',pt:'Curgete',de:'Zucchini'},qty:200,unit:'g'},
   {emoji:'🧅',name:{en:'Red onion',fr:'Oignon rouge',es:'Cebolla roja',pt:'Cebola roxa',de:'Rote Zwiebel'},qty:1,unit:''},
   {emoji:'🍅',name:{en:'Cherry tomatoes',fr:'Tomates cerises',es:'Tomates cherry',pt:'Tomates cherry',de:'Kirschtomaten'},qty:200,unit:'g'},
   {emoji:'🫘',name:{en:'Chickpeas (tin)',fr:'Pois chiches (boîte)',es:'Garbanzos (lata)',pt:'Grão-de-bico (lata)',de:'Kichererbsen (Dose)'},qty:200,unit:'g'},
   {emoji:'🥛',name:{en:'Greek yogurt',fr:'Yaourt grec',es:'Yogur griego',pt:'Iogurte grego',de:'Griechischer Joghurt'},qty:100,unit:'g'},
   {emoji:'🍋',name:{en:'Lemon',fr:'Citron',es:'Limón',pt:'Limão',de:'Zitrone'},qty:1,unit:''},
 ],
 base:{en:['Olive oil · 60ml','Cumin · 1 tsp','Smoked paprika · 1 tsp','Garlic · 2 cloves','Salt'],fr:['Huile d\'olive · 60ml','Cumin · 1 c.c.','Paprika fumé · 1 c.c.'],es:['Aceite de oliva · 60ml','Comino · 1 c.c.','Pimentón ahumado · 1 c.c.'],pt:['Azeite · 60ml','Cominhos · 1 c.c.','Páprica fumada · 1 c.c.'],de:['Olivenöl · 60ml','Kreuzkümmel · 1 TL','Geräucherter Paprika · 1 TL']},
 steps:{
   en:[
     {num:1,title:'Prep & season',text:'Preheat oven to 200°C. Chop all vegetables into similar-sized chunks — about 3cm. Drain chickpeas. Toss everything with olive oil, cumin, smoked paprika and salt.',ings:['🍠 Sweet potato','🫑 Peppers','🥒 Courgette','🧅 Red onion','🫘 Chickpeas'],tip:'Uniform size ensures even cooking. Smaller = crispier, larger = softer.',kids:null},
     {num:2,title:'Roast',text:'Spread on one or two large baking trays in a single layer. Roast for 35 minutes, turning once at the halfway point, until golden and caramelised.',ings:['🍅 Cherry tomatoes · 200g'],tip:'Add the cherry tomatoes in the last 10 minutes — they burst and become intensely sweet.',kids:null},
     {num:3,title:'Make the yogurt sauce',text:'Mix yogurt with crushed garlic, lemon juice and a pinch of salt.',ings:['🥛 Yogurt · 100g','🍋 Lemon · 1'],tip:null,kids:null},
     {num:4,title:'Serve',text:'Spread yogurt sauce on a large plate or serving dish. Pile the roasted veg on top. Drizzle with olive oil and serve with flatbread or grains.',ings:[],tip:'Leftovers make an amazing wrap the next day.',kids:null},
   ],
   fr:[{num:1,title:'Préparer et assaisonner',text:'Préchauffer le four à 200°C. Couper tous les légumes en morceaux de 3cm. Égoutter les pois chiches. Mélanger avec huile, cumin, paprika, sel.',ings:[],tip:null,kids:null},{num:2,title:'Rôtir',text:'Étaler sur une ou deux plaques. Rôtir 35 min en retournant à mi-cuisson.',ings:[],tip:null,kids:null},{num:3,title:'Sauce yaourt',text:'Mélanger le yaourt avec ail écrasé, jus de citron et sel.',ings:[],tip:null,kids:null},{num:4,title:'Servir',text:'Étaler la sauce yaourt dans un plat. Empiler les légumes rôtis dessus.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Preparar y condimentar',text:'Precalentar el horno a 200°C. Cortar todos los vegetales en trozos de 3cm. Escurrir los garbanzos. Mezclar con aceite, comino, pimentón, sal.',ings:[],tip:null,kids:null},{num:2,title:'Asar',text:'Extender en una o dos bandejas. Asar 35 min dando la vuelta a mitad.',ings:[],tip:null,kids:null},{num:3,title:'Salsa de yogur',text:'Mezclar el yogur con ajo machacado, zumo de limón y sal.',ings:[],tip:null,kids:null},{num:4,title:'Servir',text:'Extender la salsa de yogur en un plato. Poner las verduras asadas encima.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Preparar e temperar',text:'Preaquecer o forno a 200°C. Cortar todos os legumes em pedaços de 3cm. Escorrer o grão. Misturar com azeite, cominhos, páprica, sal.',ings:[],tip:null,kids:null},{num:2,title:'Assar',text:'Distribuir numa ou duas assadeiras. Assar 35 min virando a meio.',ings:[],tip:null,kids:null},{num:3,title:'Molho de iogurte',text:'Misturar o iogurte com alho esmagado, sumo de limão e sal.',ings:[],tip:null,kids:null},{num:4,title:'Servir',text:'Espalhar o molho de iogurte num prato. Colocar os legumes assados por cima.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Vorbereiten & würzen',text:'Ofen auf 200°C vorheizen. Alle Gemüse in 3cm-Stücke schneiden. Kichererbsen abtropfen. Mit Öl, Kreuzkümmel, Paprika, Salz mischen.',ings:[],tip:null,kids:null},{num:2,title:'Rösten',text:'Auf einem oder zwei großen Backblechen ausbreiten. 35 Min. rösten, bei Halbzeit wenden.',ings:[],tip:null,kids:null},{num:3,title:'Joghurtsauce',text:'Joghurt mit gehacktem Knoblauch, Zitronensaft und Salz mischen.',ings:[],tip:null,kids:null},{num:4,title:'Servieren',text:'Joghurtsauce auf einem großen Teller verteilen. Geröstetes Gemüse daraufhäufen.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:380,protein:12,carbs:52,fat:14,fiber:9}},

{id:12,emoji:'🫘',photo:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
 tags:['Vegan','GlutenFree','Mediterranean','ComfortFood'],badges:['vegan','gf','protein'],
 prep:5,cook:20,
 name:{en:'Spanish Chickpea Stew',fr:'Ragoût Espagnol de Pois Chiches',es:'Potaje Español de Garbanzos',pt:'Ensopado Espanhol de Grão-de-bico',de:'Spanischer Kichererbsen-Eintopf'},
 subtitle:{en:'Bold, smoky & ready in 25 minutes',fr:'Audacieux, fumé et prêt en 25 minutes',es:'Intenso, ahumado y listo en 25 minutos',pt:'Intenso, defumado e pronto em 25 minutos',de:'Kräftig, rauchig & in 25 Min. fertig'},
 desc:{en:'Spanish-inspired chickpea and spinach stew with smoked paprika and a splash of vinegar.',fr:'Ragoût espagnol de pois chiches et épinards au paprika fumé.',es:'Guiso español de garbanzos y espinacas con pimentón ahumado.',pt:'Ensopado espanhol de grão-de-bico e espinafres com páprica fumada.',de:'Spanisch inspirierter Kichererbsen-Spinat-Eintopf mit geräuchertem Paprika.'},
 ingredients:[
   {emoji:'🫘',name:{en:'Chickpeas (tin)',fr:'Pois chiches (boîte)',es:'Garbanzos (lata)',pt:'Grão-de-bico (lata)',de:'Kichererbsen (Dose)'},qty:400,unit:'g'},
   {emoji:'🥬',name:{en:'Spinach',fr:'Épinards',es:'Espinacas',pt:'Espinafres',de:'Spinat'},qty:150,unit:'g'},
   {emoji:'🧅',name:{en:'Onion',fr:'Oignon',es:'Cebolla',pt:'Cebola',de:'Zwiebel'},qty:1,unit:''},
   {emoji:'🧄',name:{en:'Garlic',fr:'Ail',es:'Ajo',pt:'Alho',de:'Knoblauch'},qty:3,unit:'cloves'},
   {emoji:'🍅',name:{en:'Chopped tomatoes',fr:'Tomates concassées',es:'Tomates troceados',pt:'Tomates picados',de:'Gehackte Tomaten'},qty:200,unit:'g'},
 ],
 base:{en:['Smoked paprika · 2 tsp','Cumin · 1 tsp','Sherry vinegar · 1 tbsp','Stock · 200ml','Olive oil · 30ml'],fr:['Paprika fumé · 2 c.c.','Cumin · 1 c.c.','Vinaigre de Xérès · 1 c.s.'],es:['Pimentón ahumado · 2 c.c.','Comino · 1 c.c.','Vinagre de Jerez · 1 c.s.'],pt:['Páprica fumada · 2 c.c.','Cominhos · 1 c.c.','Vinagre de xerez · 1 c.s.'],de:['Geräucherter Paprika · 2 TL','Kreuzkümmel · 1 TL','Sherryessig · 1 EL']},
 steps:{
   en:[
     {num:1,title:'Build the base',text:'Fry diced onion and garlic in olive oil over medium heat until soft, about 6 minutes.',ings:['🧅 Onion · 1','🧄 Garlic · 3 cloves'],tip:null,kids:null},
     {num:2,title:'Bloom the spices',text:'Add smoked paprika and cumin. Stir constantly for 30 seconds — the spices should sizzle in the oil.',ings:[],tip:'This step transforms the dish — blooming spices in oil releases fat-soluble flavour compounds.',kids:null},
     {num:3,title:'Add tomatoes & chickpeas',text:'Add chopped tomatoes, drained chickpeas and stock. Stir well. Simmer 15 minutes.',ings:['🍅 Tomatoes · 200g','🫘 Chickpeas · 400g'],tip:null,kids:null},
     {num:4,title:'Wilt the spinach',text:'Add spinach in handfuls and stir until wilted — about 2 minutes.',ings:['🥬 Spinach · 150g'],tip:null,kids:null},
     {num:5,title:'Finish with vinegar',text:'Add a splash of sherry vinegar — it lifts all the flavours. Season with salt. Serve with crusty bread.',ings:[],tip:'Sherry vinegar is the secret weapon. Red wine vinegar works too.',kids:null},
   ],
   fr:[{num:1,title:'Construire la base',text:'Faire revenir l\'oignon émincé et l\'ail dans l\'huile 6 min.',ings:[],tip:null,kids:null},{num:2,title:'Faire chauffer les épices',text:'Ajouter le paprika fumé et le cumin. Remuer 30 sec.',ings:[],tip:null,kids:null},{num:3,title:'Tomates et pois chiches',text:'Ajouter tomates, pois chiches égouttés et bouillon. Mijoter 15 min.',ings:[],tip:null,kids:null},{num:4,title:'Épinards',text:'Ajouter les épinards par poignées et remuer jusqu\'à ce qu\'ils s\'affaissent.',ings:[],tip:null,kids:null},{num:5,title:'Finir avec le vinaigre',text:'Ajouter une giclée de vinaigre de Xérès. Assaisonner. Servir avec du pain.',ings:[],tip:null,kids:null}],
   es:[{num:1,title:'Construir la base',text:'Sofreír la cebolla picada y el ajo en aceite 6 min.',ings:[],tip:null,kids:null},{num:2,title:'Dorar las especias',text:'Añadir pimentón ahumado y comino. Remover 30 seg.',ings:[],tip:null,kids:null},{num:3,title:'Tomates y garbanzos',text:'Añadir tomates, garbanzos escurridos y caldo. Hervir 15 min.',ings:[],tip:null,kids:null},{num:4,title:'Espinacas',text:'Añadir espinacas por puñados y remover hasta que se marchiten.',ings:[],tip:null,kids:null},{num:5,title:'Acabar con vinagre',text:'Añadir un chorrito de vinagre de Jerez. Sazonar. Servir con pan.',ings:[],tip:null,kids:null}],
   pt:[{num:1,title:'Construir a base',text:'Refogar a cebola picada e o alho em azeite 6 min.',ings:[],tip:null,kids:null},{num:2,title:'Ativar as especiarias',text:'Adicionar páprica fumada e cominhos. Mexer 30 seg.',ings:[],tip:null,kids:null},{num:3,title:'Tomates e grão',text:'Adicionar tomates, grão escorrido e caldo. Ferver 15 min.',ings:[],tip:null,kids:null},{num:4,title:'Espinafres',text:'Adicionar espinafres aos punhados e mexer até murcharem.',ings:[],tip:null,kids:null},{num:5,title:'Finalizar com vinagre',text:'Adicionar um fio de vinagre de xerez. Temperar. Servir com pão.',ings:[],tip:null,kids:null}],
   de:[{num:1,title:'Basis aufbauen',text:'Gewürfelte Zwiebel und Knoblauch in Öl 6 Min. anbraten.',ings:[],tip:null,kids:null},{num:2,title:'Gewürze anrösten',text:'Paprika und Kreuzkümmel hinzufügen. 30 Sek. rühren.',ings:[],tip:null,kids:null},{num:3,title:'Tomaten & Kichererbsen',text:'Tomaten, abgetropfte Kichererbsen und Brühe hinzufügen. 15 Min. köcheln.',ings:[],tip:null,kids:null},{num:4,title:'Spinat',text:'Spinat handweise einrühren bis er zusammenfällt.',ings:[],tip:null,kids:null},{num:5,title:'Mit Essig fertigstellen',text:'Spritzer Sherryessig hinzufügen. Würzen. Mit Brot servieren.',ings:[],tip:null,kids:null}],
 },
 nutrition:{kcal:360,protein:16,carbs:48,fat:10,fiber:12}},
];

// ── Dish helpers ──────────────────────────────────────────────
function getDish(id){return DISHES.find(d=>d.id===parseInt(id));}
function dishName(d){return(d.name&&(d.name[lang]||d.name.en))||'';}
function dishSubtitle(d){return(d.subtitle&&(d.subtitle[lang]||d.subtitle.en))||'';}
function dishDesc(d){return(d.desc&&(d.desc[lang]||d.desc.en))||'';}
function dishSteps(d){return(d.steps&&(d.steps[lang]||d.steps.en))||[];}
function dishBase(d){return(d.base&&(d.base[lang]||d.base.en))||[];}
function dishDressing(d){return(d.dressing&&(d.dressing[lang]||d.dressing.en))||[];}
function ingName(ing){return(ing.name&&(ing.name[lang]||ing.name.en))||'';}

// ═══════════════════════════════════════════════════
// QUANTITY FORMATTER  (European/metric)
// ═══════════════════════════════════════════════════
function fmtQty(q,unit){
  if(!unit||unit===''){
    if(q===0.25)return'¼';if(q===0.5)return'½';if(q===0.75)return'¾';
    return q%1===0?String(q):q.toFixed(1);
  }
  if(unit==='g'&&q>=1000)return`${+(q/1000).toFixed(2).replace(/\.?0+$/,'')} kg`;
  if(unit==='ml'&&q>=1000)return`${+(q/1000).toFixed(2).replace(/\.?0+$/,'')} L`;
  if(unit==='g')return`${Math.round(q)} g`;
  if(unit==='ml')return`${Math.round(q)} ml`;
  return`${Math.round(q*10)/10} ${unit}`;
}
function fmtIngQty(ing,mult){
  const q=(ing.qty||0)*mult;
  return fmtQty(q,ing.unit);
}


// ═══════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════
let currentUser=null,isGuest=false,selectedPlan='guest';
let state={
  family:{adults:2,children:0},
  liked:[],disliked:[],plan:{},shopping:{},catOpen:{},
  ratings:{},activeTag:'All',recTag:'All',openDays:{},discoverPaused:false,
  pantry:{},        // {itemName: {qty, unit}}
  genericCart:{},   // {itemId: bool}
};

const STABLE=7;

// ─── Helpers ────────────────────────────────────
function familyServings(){return state.family.adults+(state.family.children*0.75);}
function guestServings(slot){const a=slot.adults??state.family.adults;const c=slot.children??state.family.children;return a+(c*0.75);}
function guestLabel(slot){const a=slot.adults??state.family.adults;const c=slot.children??state.family.children;const tot=a+c;return`${tot} ${tot===1?t('person'):t('people')}`;}
function defaultGuests(){return{adults:state.family.adults,children:state.family.children};}
function dateKey(d){return d.toISOString().slice(0,10);}
function getDateRange(){
  const days=[];const today=new Date();today.setHours(0,0,0,0);
  const count=plannerDays(); // 3 guest, 7 registered, 28 premium
  for(let i=0;i<count;i++){const d=new Date(today);d.setDate(today.getDate()+i);days.push(d);}
  return days;
}
function avgRating(id){const r=state.ratings[id];if(!r||!r.count)return 0;return r.score/r.count;}
function starHTML(rating,size=14){return[1,2,3,4,5].map(i=>`<span style="font-size:${size}px;color:${i<=Math.round(rating)?'var(--gold)':'#ddd'}">★</span>`).join('');}

// ─── Persistence ────────────────────────────────
function saveLocal(){
  try{localStorage.setItem('menja_state',JSON.stringify(state));}catch(e){}
}
function loadLocal(){
  try{const s=localStorage.getItem('menja_state');if(s)Object.assign(state,JSON.parse(s));}catch(e){}
}
// ─── AUTH ────────────────────────────────────────
// ══════════════════════════════════════════════
// TIER SYSTEM
// ══════════════════════════════════════════════
// guest    → 4 dishes, 3-day planner
// registered → 10 dishes, 7-day planner (free)
// premium  → all dishes, multi-week planner, all features

function getUserTier(){
  if(isGuest)return'guest';
  if(!currentUser||currentUser.id==='guest')return'guest';
  const plan=currentUser.user_metadata?.plan||'registered';
  return plan; // 'registered' or 'premium'
}
function canAccessDish(idx){
  // idx is 0-based index in DISHES array
  const tier=getUserTier();
  if(tier==='premium')return true;
  if(tier==='registered')return idx<10;
  return idx<4; // guest
}
function plannerDays(){
  const tier=getUserTier();
  if(tier==='premium')return 28;
  if(tier==='registered')return 7;
  return 3; // guest
}
function requiresTier(needed){
  // needed: 'registered' or 'premium'
  const tier=getUserTier();
  if(needed==='registered'&&tier==='guest')return true;
  if(needed==='premium'&&tier!=='premium')return true;
  return false;
}
function gateAction(needed,action){
  if(requiresTier(needed)){openPaywall(needed);return false;}
  action();return true;
}

// ══════════════════════════════════════════════
// AUTH FUNCTIONS
// ══════════════════════════════════════════════
function switchAuthTab(tab){
  document.getElementById('tab-signin').classList.toggle('active',tab==='signin');
  document.getElementById('tab-signup').classList.toggle('active',tab==='signup');
  document.getElementById('form-signin').style.display=tab==='signin'?'':'none';
  document.getElementById('form-signup').style.display=tab==='signup'?'':'none';
  clearAuthMsg();
}
function showAuthError(msg){const el=document.getElementById('auth-error');el.textContent=msg;el.style.display='block';el.style.whiteSpace='pre-line';document.getElementById('auth-success').style.display='none';}
function showAuthSuccess(msg){const el=document.getElementById('auth-success');el.textContent=msg;el.style.display='block';document.getElementById('auth-error').style.display='none';}
function clearAuthMsg(){document.getElementById('auth-error').style.display='none';document.getElementById('auth-success').style.display='none';}

function isFileProt(){return location.protocol==='file:';}
function fileProtMsg(){return'⚠️ Open via a server, not file://\n\nRun in terminal:\n  npx serve .\nThen open: http://localhost:3000\n\nOr use "Continue as guest" to test the app without sign-in.';}

async function signIn(){
  if(isFileProt()){showAuthError('Cannot sign in from file://\nRun: npx serve . → http://localhost:3000\nOr use "Continue as guest" below.');return;}
  const email=document.getElementById('si-email').value.trim();
  const pass=document.getElementById('si-pass').value;
  if(!email||!pass){showAuthError('Please fill in all fields.');return;}
  const btn=document.getElementById('si-btn');btn.disabled=true;btn.textContent='...';
  try{
    const{error}=await sb.auth.signInWithPassword({email,password:pass});
    btn.disabled=false;btn.textContent=t('signinBtn');
    if(error)showAuthError(error.message);
  }catch(e){btn.disabled=false;btn.textContent=t('signinBtn');showAuthError('Network error. Check your connection.');}
}
async function signUp(){
  if(isFileProt()){showAuthError('Cannot sign up from file://\nRun: npx serve . → http://localhost:3000');return;}
  const fname=document.getElementById('su-fname').value.trim();
  const email=document.getElementById('su-email').value.trim();
  const pass=document.getElementById('su-pass').value;
  if(!fname||!email||!pass){showAuthError('Please fill in all fields.');return;}
  if(pass.length<8){showAuthError('Password must be at least 8 characters.');return;}
  const btn=document.getElementById('su-btn');btn.disabled=true;btn.textContent='...';
  try{
    const{error}=await sb.auth.signUp({email,password:pass,options:{
      emailRedirectTo:window.location.origin,
      data:{first_name:fname,last_name:document.getElementById('su-lname').value.trim(),plan:'registered',avatar:'🌿'}
    }});
    btn.disabled=false;btn.textContent=t('createAccountBtn');
    if(error)showAuthError(error.message==='Failed to fetch'?'Network error. Check your connection.':error.message);
    else showAuthSuccess('✅ Account created! Check your email to confirm, then sign in.');
  }catch(e){btn.disabled=false;btn.textContent=t('createAccountBtn');showAuthError('Network error. Check your connection.');}
}
async function signInWithGoogle(){
  if(isFileProt()){showAuthError('Google sign-in needs a web server.\nRun: npx serve . → http://localhost:3000');return;}
  const redirectTo=window.location.origin;
  try{const{error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo,queryParams:{access_type:'offline',prompt:'consent'}}});if(error)showAuthError(error.message);}
  catch(e){showAuthError('Network error.');}
}
async function signInWithApple(){
  if(isFileProt()){showAuthError('Apple sign-in needs a web server.');return;}
  const redirectTo=window.location.origin;
  try{const{error}=await sb.auth.signInWithOAuth({provider:'apple',options:{redirectTo}});if(error)showAuthError(error.message);}
  catch(e){showAuthError('Apple sign-in not configured yet. Set up in Supabase → Auth → Providers → Apple.');}
}
async function signInWithFacebook(){
  if(isFileProt()){showAuthError('Facebook sign-in needs a web server.');return;}
  const redirectTo=window.location.origin;
  try{const{error}=await sb.auth.signInWithOAuth({provider:'facebook',options:{redirectTo}});if(error)showAuthError(error.message);}
  catch(e){showAuthError('Facebook sign-in not configured yet. Set up in Supabase → Auth → Providers → Facebook.');}
}
function continueAsGuest(){
  isGuest=true;loadLocal();hideLoading();
  showApp({id:'guest',email:'',user_metadata:{first_name:'Guest',avatar:'👤',plan:'guest'}});
}
async function signOut(){
  isGuest=false;
  try{localStorage.removeItem('menja_guest');}catch(e){}
  if(currentUser&&currentUser.id!=='guest')await sb.auth.signOut();
  state={family:{adults:2,children:0},liked:[],disliked:[],plan:{},shopping:{},catOpen:{},ratings:{},activeTag:'All',recTag:'All',openDays:{},discoverPaused:false,pantry:{},genericCart:{}};
  showAuth();
}

// ══════════════════════════════════════════════
// PAYWALL FUNCTIONS
// ══════════════════════════════════════════════
let paywallTier='monthly';
function openPaywall(reason){
  paywallTier='monthly';
  document.getElementById('ptier-monthly').classList.add('selected');
  document.getElementById('ptier-yearly').classList.remove('selected');
  document.getElementById('paywall-cta-btn').textContent='Start Premium — €4.99/month';
  // Customise message based on what triggered it
  const titles={
    'registered':"Create a Free Account",
    'premium':"Unlock Premium",
    'dish':"You've reached the dish limit",
    'planner':"Extend your planner",
  };
  const hero=document.querySelector('.paywall-hero .paywall-title');
  if(hero&&titles[reason])hero.textContent=titles[reason]||"Unlock Premium";
  document.getElementById('paywall-bg').classList.add('open');
}
function closePaywall(){document.getElementById('paywall-bg').classList.remove('open');}
function selectPaywallTier(tier){
  paywallTier=tier;
  document.getElementById('ptier-monthly').classList.toggle('selected',tier==='monthly');
  document.getElementById('ptier-yearly').classList.toggle('selected',tier==='yearly');
  const btn=document.getElementById('paywall-cta-btn');
  btn.textContent=tier==='yearly'?'Start Premium — €44/year':'Start Premium — €4.99/month';
}
function startCheckout(){
  // Redirect to Stripe payment page — replace URL with your actual Stripe link
  const urls={
    monthly:'https://buy.stripe.com/YOUR_MONTHLY_LINK',
    yearly:'https://buy.stripe.com/YOUR_YEARLY_LINK',
  };
  const url=urls[paywallTier];
  if(url.includes('YOUR_')){
    // Not set up yet — show instructions
    showPaywallSetupInfo();
    return;
  }
  window.open(url,'_blank');
}
function showPaywallSetupInfo(){
  const sheet=document.querySelector('.paywall-sheet');
  const existing=document.getElementById('paywall-setup-note');
  if(existing)return;
  const note=document.createElement('div');
  note.id='paywall-setup-note';
  note.style.cssText='margin:0 18px;background:#FFF8E1;border-radius:var(--rsm);padding:12px 14px;font-size:12px;color:#856404;line-height:1.6;border:.5px solid #F0E68C';
  note.innerHTML='<strong>Payment not set up yet.</strong><br>To accept payments, create a <a href="https://stripe.com" target="_blank" style="color:var(--accent)">Stripe account</a>, create two payment links (monthly €4.99 and yearly €44), and replace the URLs in the <code>startCheckout()</code> function in the app code.';
  const cta=document.getElementById('paywall-cta-btn');
  cta.parentNode.insertBefore(note,cta);
}

// ─── SUPABASE LOAD/SAVE ──────────────────────────
async function loadUserData(user){
  if(!user||user.id==='guest'){loadLocal();return;}
  // Load local first as baseline, then overlay cloud data
  loadLocal();
  try{
    const tryGet=async(promise)=>{try{const r=await promise;return r.data||null;}catch(e){return null;}};
    const[fam,prefs,meals,ratings,ap]=await Promise.all([
      tryGet(sb.from('family_settings').select('*').eq('user_id',user.id).single()),
      tryGet(sb.from('dish_preferences').select('*').eq('user_id',user.id)),
      tryGet(sb.from('meal_plan').select('*').eq('user_id',user.id)),
      tryGet(sb.from('dish_ratings').select('*').eq('user_id',user.id)),
      tryGet(sb.from('app_preferences').select('*').eq('user_id',user.id).single()),
    ]);
    if(fam&&fam.adults!==undefined)state.family={adults:fam.adults,children:fam.children||0};
    if(prefs&&Array.isArray(prefs)){
      state.liked=prefs.filter(p=>p.preference==='liked').map(p=>p.dish_id);
      state.disliked=prefs.filter(p=>p.preference==='disliked').map(p=>p.dish_id);
    }
    if(meals&&Array.isArray(meals)&&meals.length){
      state.plan={};
      meals.forEach(m=>{if(!state.plan[m.date])state.plan[m.date]={};state.plan[m.date][m.meal_type]={dishId:m.dish_id,adults:m.adults,children:m.children};});
    }
    if(ratings&&Array.isArray(ratings)&&ratings.length){
      state.ratings={};
      ratings.forEach(r=>{state.ratings[r.dish_id]={score:r.score,count:1};});
    }
    if(ap&&ap.active_tag!==undefined){
      state.activeTag=ap.active_tag||'All';state.recTag=ap.rec_tag||'All';
      state.openDays=ap.open_days||{};state.catOpen=ap.cat_open||{};
      state.discoverPaused=ap.discover_paused||false;
    }
  }catch(e){console.warn('Supabase load error (using local data):',e);}
}

let syncTimer=null;
function save(){
  if(currentUser&&currentUser.id!=='guest'&&!isGuest){
    clearTimeout(syncTimer);syncTimer=setTimeout(saveToSupabase,1200);
  }else saveLocal();
}
async function saveToSupabase(){
  if(!currentUser||currentUser.id==='guest'||isGuest){saveLocal();return;}
  // Always save locally as backup
  saveLocal();
  showSync();const uid=currentUser.id;
  const tryUpsert=async(table,data,opts)=>{try{await sb.from(table).upsert(data,opts);}catch(e){console.warn('Save error on',table,e.message);}};
  try{
    await tryUpsert('family_settings',{user_id:uid,adults:state.family.adults,children:state.family.children,updated_at:new Date().toISOString()},{onConflict:'user_id'});
    const prefRows=[...state.liked.map(id=>({user_id:uid,dish_id:id,preference:'liked'})),...state.disliked.map(id=>({user_id:uid,dish_id:id,preference:'disliked'}))];
    if(prefRows.length)await tryUpsert('dish_preferences',prefRows,{onConflict:'user_id,dish_id'});
    const mealRows=[];Object.entries(state.plan).forEach(([date,meals])=>{Object.entries(meals).forEach(([type,slot])=>{if(slot&&slot.dishId)mealRows.push({user_id:uid,date,meal_type:type,dish_id:slot.dishId,adults:slot.adults||state.family.adults,children:slot.children||state.family.children,updated_at:new Date().toISOString()});});});
    if(mealRows.length)await tryUpsert('meal_plan',mealRows,{onConflict:'user_id,date,meal_type'});
    const rRows=Object.entries(state.ratings).map(([dishId,r])=>({user_id:uid,dish_id:parseInt(dishId),score:Math.round(r.score/r.count),rated_at:new Date().toISOString()}));
    if(rRows.length)await tryUpsert('dish_ratings',rRows,{onConflict:'user_id,dish_id'});
    await tryUpsert('app_preferences',{user_id:uid,active_tag:state.activeTag,rec_tag:state.recTag,open_days:state.openDays,cat_open:state.catOpen,discover_paused:state.discoverPaused,updated_at:new Date().toISOString()},{onConflict:'user_id'});
  }catch(e){console.warn('Supabase save error:',e);}
  hideSync();
}
function showSync(){document.getElementById('sync-bar').classList.add('show');}
function hideSync(){document.getElementById('sync-bar').classList.remove('show');}

// ═══════════════════════════════════════════════════
// SHOPPING
// ═══════════════════════════════════════════════════
function rebuildShopping(){
  const ex={...state.shopping};const totals={};
  Object.values(state.plan).forEach(dm=>{
    Object.values(dm).forEach(slot=>{
      if(!slot||!slot.dishId)return;
      const dish=getDish(slot.dishId);if(!dish)return;
      const servings=guestServings(slot);
      dish.ingredients.forEach(ing=>{
        const n=ingName(ing);
        if(totals[n]){totals[n].totalQty+=ing.qty*servings;totals[n].sources.add(dishName(dish));}
        else totals[n]={totalQty:ing.qty*servings,unit:ing.unit,sources:new Set([dishName(dish)])};
      });
    });
  });
  const nl={};
  Object.entries(totals).forEach(([name,v])=>{
    nl[name]={qty:v.totalQty,unit:v.unit,source:[...v.sources].join(', '),checked:ex[name]?.checked||false,expiryAdj:ex[name]?.expiryAdj||0};
  });
  state.shopping=nl;save();
}

function updateBadge(){
  const u=Object.values(state.shopping).filter(v=>!v.checked).length+Object.values(state.genericCart).filter(Boolean).length;
  const b=document.getElementById('shopping-badge');
  if(u>0){b.style.display='';b.textContent=u;}else b.style.display='none';
}

let shopTab='menu';
function switchShopTab(tab){
  shopTab=tab;
  document.getElementById('stab-menu').classList.toggle('active',tab==='menu');
  document.getElementById('stab-generic').classList.toggle('active',tab==='generic');
  document.getElementById('shop-menu-panel').style.display=tab==='menu'?'':'none';
  document.getElementById('shop-generic-panel').style.display=tab==='generic'?'':'none';
  if(tab==='generic')renderGenericItems();
}

function toggleCat(id){
  state.catOpen[id]=!state.catOpen[id];save();
  const items=document.getElementById('si-'+id);
  const chev=document.getElementById('sc-'+id);
  if(items)items.classList.toggle('open',state.catOpen[id]);
  if(chev)chev.classList.toggle('open',state.catOpen[id]);
}

function renderShopping(){
  rebuildShopping();
  const items=Object.entries(state.shopping);
  const total=items.length;const chk=items.filter(([,v])=>v.checked).length;
  document.getElementById('prog-fill').style.width=total?Math.round(chk/total*100)+'%':'0%';
  document.getElementById('prog-txt').textContent=`${chk} ${t('of')} ${total} ${t('itemsReady')}`;
  updateBadge();
  const grouped={};STORE_CATS.forEach(c=>{grouped[c.id]=[];});
  items.forEach(([n,v])=>grouped[catOf(n)].push([n,v]));
  let html='';
  STORE_CATS.forEach(cat=>{
    const ci=grouped[cat.id];if(!ci||!ci.length)return;
    const done=ci.filter(([,v])=>v.checked).length;
    const isOpen=state.catOpen[cat.id]!==false;
    html+=`<div class="scat"><div class="scat-hdr" onclick="toggleCat('${cat.id}')">
      <span class="cico">${cat.icon}</span><span class="clbl">${catLabel(cat)}</span>
      <span class="ccount">${done}/${ci.length}</span>
      <span class="cchev ${isOpen?'open':''}" id="sc-${cat.id}">›</span>
    </div><div class="scat-items ${isOpen?'open':''}" id="si-${cat.id}">${
      ci.map(([name,v])=>{
        const qStr=v.unit!==undefined?fmtQty(Math.ceil(v.qty*4)/4,v.unit):'';
        const inPantry=state.pantry[name]&&state.pantry[name].qty>0;
        return`<div class="sitem" onclick="toggleItem('${name.replace(/'/g,"\\'")}')">
          <div class="schk ${v.checked?'checked':''}"></div>
          <div class="sitem-mid">
            <div class="sitem-name ${v.checked?'checked':''}">${name}${inPantry?`<span class="pantry-bdg">✓ ${t('inPantry')}</span>`:''}</div>
            <div class="sitem-src">${v.source}</div>
          </div>
          <div class="sitem-right">${qStr?`<span class="sitem-qty">${qStr}</span>`:''}${epHTML(name)}</div>
        </div>`;
      }).join('')
    }</div></div>`;
  });
  if(!html)html=`<div style="padding:40px 20px;text-align:center;color:var(--text3);font-size:14px;">${t('openDay')}</div>`;
  document.getElementById('shop-container').innerHTML=html;
}

function toggleItem(name){
  if(!state.shopping[name])state.shopping[name]={checked:false,expiryAdj:0};
  state.shopping[name].checked=!state.shopping[name].checked;
  // Auto-add to pantry when checked off
  if(state.shopping[name].checked){
    const item=state.shopping[name];
    if(!state.pantry[name])state.pantry[name]={qty:0,unit:item.unit||''};
    state.pantry[name].qty=Math.round((state.pantry[name].qty+(item.qty||1))*10)/10;
    state.pantry[name].unit=item.unit||state.pantry[name].unit;
  }
  save();renderShopping();
}
function clearChecked(){
  Object.keys(state.shopping).forEach(k=>{if(state.shopping[k].checked)state.shopping[k].checked=false;});
  save();renderShopping();
}

// ═══════════════════════════════════════════════════
// GENERIC ITEMS
// ═══════════════════════════════════════════════════
function renderGenericItems(){
  let html='';
  GENERIC_CATS.forEach(cat=>{
    const catLbl=cat.label[lang]||cat.label.en;
    html+=`<div class="gen-section"><div class="gen-stitle">${catLbl}</div><div class="gen-grid">`;
    cat.items.forEach(item=>{
      const name=item.name[lang]||item.name.en;
      const isOn=state.genericCart[item.id]||false;
      html+=`<div class="gen-item ${isOn?'on':''}" onclick="toggleGeneric('${item.id}')">
        <span class="gen-icon">${item.icon}</span>
        <span class="gen-name">${name}</span>
      </div>`;
    });
    html+=`</div></div>`;
  });
  document.getElementById('gen-container').innerHTML=html||'<div style="padding:30px;text-align:center;color:var(--text3)">No items</div>';
  updateBadge();
}

function toggleGeneric(id){
  state.genericCart[id]=!state.genericCart[id];
  save();renderGenericItems();updateBadge();
}

// ═══════════════════════════════════════════════════
// FRIDGE SCANNER
// ═══════════════════════════════════════════════════
let fridgeImageBase64=null;
let fridgeImageMime='image/jpeg';

function handleFridgeImage(event){
  const file=event.target.files[0];
  if(!file)return;
  fridgeImageMime=file.type||'image/jpeg';
  const reader=new FileReader();
  reader.onload=e=>{
    fridgeImageBase64=e.target.result.split(',')[1];
    document.getElementById('fridge-preview-img').src=e.target.result;
    document.getElementById('fridge-preview-wrap').style.display='block';
    document.getElementById('fridge-upload-zone').style.display='none';
    document.getElementById('fridge-scan-btn').disabled=false;
    document.getElementById('fridge-results').style.display='none';
    document.getElementById('fridge-results').innerHTML='';
  };
  reader.readAsDataURL(file);
}

function clearFridgeImage(){
  fridgeImageBase64=null;
  document.getElementById('fridge-preview-wrap').style.display='none';
  document.getElementById('fridge-upload-zone').style.display='block';
  document.getElementById('fridge-scan-btn').disabled=true;
  document.getElementById('fridge-results').style.display='none';
  document.getElementById('fridge-file-input').value='';
}

async function scanFridge(){
  if(!fridgeImageBase64)return;
  const btn=document.getElementById('fridge-scan-btn');
  const scanning=document.getElementById('fridge-scanning');
  const msg=document.getElementById('fridge-scan-msg');
  const results=document.getElementById('fridge-results');

  btn.disabled=true;
  scanning.classList.add('show');
  results.style.display='none';
  results.innerHTML='';

  msg.textContent=t('fridgeScanning');
  await new Promise(r=>setTimeout(r,600));
  msg.textContent=t('fridgeAnalysing');

  try{
    // Call Claude Vision API to identify ingredients
    const response=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':getApiKey(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        messages:[{
          role:'user',
          content:[
            {type:'image',source:{type:'base64',media_type:fridgeImageMime,data:fridgeImageBase64}},
            {type:'text',text:`Look at this fridge/pantry/food photo and list every food ingredient you can identify.
Return ONLY a JSON object in this exact format, no other text:
{"ingredients":["tomatoes","eggs","milk","cheese","spinach","garlic"]}
List individual ingredients, be specific (e.g. "cheddar cheese" not just "cheese").
Include everything visible — vegetables, fruits, dairy, meat, condiments, leftovers, etc.`}
          ]
        }]
      })
    });

    if(!response.ok){
      if(response.status===401)throw new Error('API key required — add your Anthropic API key to the app to use this feature.');
      throw new Error('API error: '+response.status);
    }

    const data=await response.json();
    const text=data.content?.[0]?.text||'';
    let identified=[];
    try{
      const clean=text.replace(/```json|```/g,'').trim();
      identified=JSON.parse(clean).ingredients||[];
    }catch(e){
      // Fallback: extract words from text
      identified=text.match(/["']([a-z ]+)["']/g)?.map(s=>s.replace(/["']/g,''))||[];
    }

    msg.textContent=t('fridgeGenerating');
    await new Promise(r=>setTimeout(r,400));

    scanning.classList.remove('show');
    btn.disabled=false;
    renderFridgeResults(identified);

  }catch(err){
    scanning.classList.remove('show');
    btn.disabled=false;
    results.style.display='block';
    results.innerHTML=`<div style="padding:20px;background:#FCEBEB;border-radius:var(--r);color:#791F1F;font-size:13px;line-height:1.6">
      <strong>⚠️ Could not scan image</strong><br><br>${err.message}<br><br>
      <strong>To enable AI scanning:</strong> Add your Anthropic API key to the app. 
      Go to <a href="https://console.anthropic.com" target="_blank" style="color:var(--accent)">console.anthropic.com</a> to get one.
    </div>`;
  }
}

function renderFridgeResults(ingredients){
  const results=document.getElementById('fridge-results');
  results.style.display='block';

  if(!ingredients||!ingredients.length){
    results.innerHTML=`<div class="fridge-empty"><span>🤔</span>Could not identify ingredients. Try a clearer photo with better lighting.</div>`;
    return;
  }

  // Normalise
  const found=ingredients.map(i=>i.toLowerCase().trim());

  // Match against our dish library
  const dishMatches=DISHES.map(dish=>{
    const dishIngs=dish.ingredients.map(i=>ingName(i).toLowerCase());
    const matched=dishIngs.filter(di=>found.some(fi=>di.includes(fi)||fi.includes(di)));
    const missing=dishIngs.filter(di=>!found.some(fi=>di.includes(fi)||fi.includes(di)));
    const score=matched.length/dishIngs.length;
    return{dish,matched,missing,score};
  }).filter(m=>m.score>0).sort((a,b)=>b.score-a.score).slice(0,4);

  // Build HTML
  let html=`<div class="fridge-section-lbl">${t('fridgeFoundTitle')}</div>`;
  html+=`<div class="fridge-ingredients">${found.map(i=>`<span class="fridge-ing-chip">${i}</span>`).join('')}</div>`;

  if(dishMatches.length){
    html+=`<div class="fridge-section-lbl">${t('fridgeMatchTitle')}</div>`;
    dishMatches.forEach(({dish,matched,missing,score})=>{
      const pct=Math.round(score*100);
      const img=dish.photo
        ?`<img class="fridge-recipe-ph" src="${dish.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="fridge-recipe-ph-em" style="display:none">${dish.emoji}</div>`
        :`<div class="fridge-recipe-ph-em">${dish.emoji}</div>`;
      const missingHtml=missing.length?`<div class="fridge-recipe-missing">${t('fridgeNeedAlso')} ${missing.slice(0,3).join(', ')}${missing.length>3?'…':''}</div>`:'';
      html+=`<div class="fridge-recipe-card" onclick="openRecipe(${dish.id})">
        <div class="fridge-recipe-inner">${img}
          <div class="fridge-recipe-info">
            <div class="fridge-recipe-name">${dishName(dish)}</div>
            <div class="fridge-recipe-match">${pct>=100?'✓ '+t('fridgeCanMake'):'✓ '+pct+'% match ('+matched.length+'/'+dish.ingredients.length+' ingredients)'}</div>
            ${missingHtml}
          </div>
          <div class="fridge-recipe-arr">›</div>
        </div>
      </div>`;
    });
  }

  // AI generated recipe idea based on top ingredients
  const topIngs=found.slice(0,6).join(', ');
  html+=`<div style="margin-top:6px">
    <div class="fridge-section-lbl">${t('fridgeAiTitle')}</div>
    <div class="fridge-ai-recipe" id="fridge-ai-recipe">
      <div style="text-align:center;padding:20px;color:var(--text3);font-size:13px" id="fridge-ai-loading">
        <div style="font-size:24px;margin-bottom:6px;animation:float 1.2s ease-in-out infinite">✨</div>
        Generating a custom recipe idea...
      </div>
    </div>
  </div>`;

  html+=`<button class="fridge-scan-btn" style="margin-top:14px;background:var(--surface2);color:var(--text2)" onclick="clearFridgeImage()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><polyline points="12 8 12 12 14 14"/></svg>
    ${t('fridgeTryAnother')}
  </button>`;

  results.innerHTML=html;

  // Async: generate AI recipe idea
  generateAiRecipe(found, document.getElementById('fridge-ai-recipe'));
}

async function generateAiRecipe(ingredients, container){
  try{
    const response=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':getApiKey(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:400,
        messages:[{
          role:'user',
          content:`I have these ingredients: ${ingredients.slice(0,8).join(', ')}.
Suggest ONE creative recipe I can make. Return ONLY JSON, no other text:
{"name":"Recipe Name","emoji":"🍳","description":"One sentence description","ingredients":["ingredient 1","ingredient 2"],"steps":["Step 1","Step 2","Step 3"]}`
        }]
      })
    });
    if(!response.ok)throw new Error('API error');
    const data=await response.json();
    const text=data.content?.[0]?.text||'';
    const clean=text.replace(/```json|```/g,'').trim();
    const recipe=JSON.parse(clean);
    container.innerHTML=`
      <div class="fridge-ai-badge">✨ AI Recipe</div>
      <div class="fridge-ai-name">${recipe.emoji||'🍳'} ${recipe.name}</div>
      <div class="fridge-ai-desc">${recipe.description}</div>
      <div class="fridge-section-lbl" style="margin-top:8px">Ingredients</div>
      <div class="fridge-ai-ings">${(recipe.ingredients||[]).map(i=>`<span class="fridge-ing-chip">${i}</span>`).join('')}</div>
      <div class="fridge-section-lbl" style="margin-top:10px">Method</div>
      ${(recipe.steps||[]).map((s,i)=>`<div style="display:flex;gap:8px;margin-bottom:8px"><div style="width:20px;height:20px;border-radius:50%;background:var(--nav);color:var(--nav-a);font-size:10px;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div><div style="font-size:12px;color:var(--text);line-height:1.5">${s}</div></div>`).join('')}`;
  }catch(e){
    container.innerHTML=`<div class="fridge-ai-badge">✨ AI Recipe</div><div style="font-size:12px;color:var(--text3);padding:4px 0">Add your Anthropic API key to generate custom recipe ideas.</div>`;
  }
}

// ═══════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════
function showTab(tab){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(nt=>nt.classList.remove('active'));
  document.getElementById('screen-'+tab).classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
  if(tab==='plan')renderPlan();
  if(tab==='shopping')renderShopping();
  if(tab==='today')renderToday();
  if(tab==='recipes')renderRecipes();
  if(tab==='fridge')initFridgeScreen();
}

function initFridgeScreen(){
  const key=getApiKey();
  const bar=document.getElementById('fridge-api-bar');
  const input=document.getElementById('fridge-api-input');
  if(!key){bar.style.display='block';if(input)input.value='';}
  else{bar.style.display='none';}
}

function saveApiKey(){
  const input=document.getElementById('fridge-api-input');
  if(!input||!input.value.trim())return;
  setApiKey(input.value.trim());
  document.getElementById('fridge-api-bar').style.display='none';
  // Show confirmation
  const btn=document.querySelector('#fridge-api-bar button');
  if(btn){btn.textContent='Saved ✓';setTimeout(()=>{btn.textContent='Save';},1500);}
}

// ═══════════════════════════════════════════════════
// FAMILY
// ═══════════════════════════════════════════════════
function adjFamily(type,delta){
  state.family[type]=Math.max(0,state.family[type]+delta);
  if(state.family.adults===0&&state.family.children===0)state.family.adults=1;
  save();renderFamily();
}
function renderFamily(){
  document.getElementById('adults-count').textContent=state.family.adults;
  document.getElementById('children-count').textContent=state.family.children;
  const total=state.family.adults+state.family.children;
  const s=familyServings();const sf=s%1===0?s:s.toFixed(1);
  let txt=`${t('cookingFor')} <strong>${total} ${total===1?t('person'):t('people')}</strong>`;
  if(state.family.adults&&state.family.children)txt+=` — ${state.family.adults} ${state.family.adults>1?t('adults2'):t('adult')} ${t('and')} ${state.family.children} ${state.family.children>1?t('children2'):t('child')}`;
  txt+=`.<br>${t('recipesFor')} <strong>${sf} ${t('servings')}</strong>.`;
  document.getElementById('fam-summary').innerHTML=`<p>${txt}</p>`;
}

// ═══════════════════════════════════════════════════
// DISCOVER
// ═══════════════════════════════════════════════════
function filteredDishes(){return state.activeTag==='All'?DISHES:DISHES.filter(d=>d.tags.includes(state.activeTag));}
function remaining(){return filteredDishes().filter(d=>!state.liked.includes(d.id)&&!state.disliked.includes(d.id));}

function renderFilters(){
  document.getElementById('tag-filters').innerHTML=TAG_KEYS_ALL.map(k=>
    `<div class="tag-pill ${state.activeTag===k?'active':''}" onclick="setTag('${k}')">${tTag(k)}</div>`
  ).join('');
}
function setTag(k){state.activeTag=k;save();renderFilters();renderDish();}

let drag=false,sx=0,sy=0,cx=0;const THRESH=80;
function initDiscover(){
  const c=document.getElementById('dish-card');
  c.addEventListener('mousedown',dStart);c.addEventListener('touchstart',dStart,{passive:true});
  window.addEventListener('mousemove',dMove);window.addEventListener('touchmove',dMove,{passive:true});
  window.addEventListener('mouseup',dEnd);window.addEventListener('touchend',dEnd);
  renderFilters();renderDish();
}
function renderDish(){
  const rem=remaining();const tot=filteredDishes().length;
  document.getElementById('dpf').style.width=tot?Math.round((tot-rem.length)/tot*100)+'%':'100%';
  const card=document.getElementById('dish-card'),done=document.getElementById('done-panel'),btns=document.getElementById('swipe-btns');
  if(state.discoverPaused){showDonePanel();return;}
  if(!rem.length){card.style.display='none';btns.style.display='none';done.style.display='block';document.getElementById('done-em').textContent='🎉';document.getElementById('done-title').textContent=t('allReviewed');document.getElementById('done-body').textContent=`${state.liked.length} ${t('savedDishes')}`;return;}
  const dish=rem[0];const rating=avgRating(dish.id);
  document.getElementById('lbl-no').style.opacity=0;document.getElementById('lbl-yes').style.opacity=0;
  card.style.transform='';card.className='dish-card';card.style.display='';done.style.display='none';btns.style.display='flex';
  document.getElementById('dish-img-wrap').innerHTML=dish.photo?`<div style="position:relative"><img class="dish-img" src="${dish.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="dish-fb" style="display:none">${dish.emoji}</div><span class="dish-credit">Unsplash</span>${rating>0?`<div class="dish-rating-badge">★ ${rating.toFixed(1)}</div>`:''}</div>`:`<div class="dish-fb">${dish.emoji}</div>`;
  document.getElementById('dish-tags').innerHTML=dish.tags.map(tk=>`<span class="tag">${tTag(tk)}</span>`).join('');
  document.getElementById('dish-name').textContent=dishName(dish);
  document.getElementById('dish-desc').textContent=dishDesc(dish);
  document.getElementById('dish-badges').innerHTML=(dish.badges||[]).map(b=>BADGE_HTML[b]||'').join('');
}
function showDonePanel(){
  state.discoverPaused=true;save();
  document.getElementById('dish-card').style.display='none';document.getElementById('swipe-btns').style.display='none';
  const p=document.getElementById('done-panel');p.style.display='block';
  const n=state.liked.length,r=remaining().length;
  document.getElementById('done-em').textContent=n>0?'✅':'🍽️';
  document.getElementById('done-title').textContent=n>0?`${n} ${n===1?t('dishSaved'):t('dishesSaved')}`:t('nothingSaved').split('—')[0].trim();
  document.getElementById('done-body').textContent=n>0?(r>0?`${r} ${t('moreToBrowse')} `:'')+(t('readyToPlan')):t('nothingSaved').split('—').slice(1).join('—').trim();
}
function continueSwiping(){state.discoverPaused=false;save();document.getElementById('done-panel').style.display='none';renderDish();}

function dStart(e){drag=true;const p=e.touches?e.touches[0]:e;sx=p.clientX;sy=p.clientY;cx=0;document.getElementById('dish-card').classList.add('swiping');}
function dMove(e){if(!drag)return;const p=e.touches?e.touches[0]:e;cx=p.clientX-sx;const cy=p.clientY-sy;const c=document.getElementById('dish-card');c.style.transform=`translateX(${cx}px) translateY(${cy*.2}px) rotate(${cx*.08}deg)`;const ratio=Math.abs(cx)/THRESH;if(cx<0){document.getElementById('lbl-no').style.opacity=Math.min(ratio,1);document.getElementById('lbl-yes').style.opacity=0;}else{document.getElementById('lbl-yes').style.opacity=Math.min(ratio,1);document.getElementById('lbl-no').style.opacity=0;}}
function dEnd(){if(!drag)return;drag=false;const c=document.getElementById('dish-card');c.classList.remove('swiping');if(Math.abs(cx)>THRESH)swipeCard(cx>0?'right':'left');else{c.style.transform='';document.getElementById('lbl-no').style.opacity=0;document.getElementById('lbl-yes').style.opacity=0;}}
function swipeCard(dir){
  const rem=remaining();if(!rem.length)return;
  const dish=rem[0];
  // Check if liking this dish would exceed the tier limit
  if(dir==='right'){
    const tier=getUserTier();
    const limit=tier==='guest'?4:tier==='registered'?10:999;
    if(state.liked.length>=limit){
      document.getElementById('dish-card').style.transform='';
      if(tier==='guest')openPaywall('registered');
      else openPaywall('premium');
      return;
    }
  }
  document.getElementById('dish-card').classList.add(dir==='left'?'fly-l':'fly-r');
  if(dir==='right')state.liked.push(dish.id);else state.disliked.push(dish.id);
  save();rebuildShopping();updateBadge();setTimeout(renderDish,340);
}

// ═══════════════════════════════════════════════════
// PLANNER
// ═══════════════════════════════════════════════════
function sortedLiked(){
  const used=new Set();Object.values(state.plan).forEach(dm=>Object.values(dm).forEach(s=>{if(s&&s.dishId)used.add(s.dishId);}));
  const u=state.liked.filter(id=>!used.has(id));const x=state.liked.filter(id=>used.has(id));
  u.sort((a,b)=>avgRating(b)-avgRating(a));return[...u,...x];
}
function countUsage(id){let c=0;Object.values(state.plan).forEach(dm=>Object.values(dm).forEach(s=>{if(s&&s.dishId===id)c++;}));return c;}
function countPlaced(){let c=0;Object.values(state.plan).forEach(dm=>Object.values(dm).forEach(s=>{if(s&&s.dishId)c++;}));return c;}
function dayHasExp(key){const dm=state.plan[key];if(!dm)return false;return Object.values(dm).some(slot=>{if(!slot||!slot.dishId)return false;const d=getDish(slot.dishId);return d&&d.ingredients.some(ing=>{const days=effDays(ing.name);return days!==null&&days<=3;});});}

function renderPlan(){renderTray();renderCal();}
function renderTray(){
  const tray=document.getElementById('tray');
  if(!state.liked.length){tray.innerHTML=`<div style="padding:8px 0;font-size:13px;color:var(--text3);">${t('saveFirst')}</div>`;return;}
  const used=new Set();Object.values(state.plan).forEach(dm=>Object.values(dm).forEach(s=>{if(s&&s.dishId)used.add(s.dishId);}));
  tray.innerHTML=sortedLiked().map(id=>{const d=getDish(id);if(!d)return'';const times=countUsage(id);const img=d.photo?`<img src="${d.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="chip-fb" style="display:none">${d.emoji}</div>`:`<div class="chip-fb">${d.emoji}</div>`;return`<div class="chip ${used.has(id)?'used':''}" data-id="${id}">${img}<div class="chip-name">${dishName(d)}</div>${times>0?`<div class="chip-use-count">×${times}</div>`:''}</div>`;}).join('');
  tray.querySelectorAll('.chip').forEach(chip=>{chip.addEventListener('mousedown',chipStart);chip.addEventListener('touchstart',chipStart,{passive:false});});
  const cp=countPlaced();document.getElementById('plan-status').textContent=cp>0?`${cp} ${t('mealsScheduled')}`:t('openDay');
}
function renderCal(){
  const cal=document.getElementById('cal-scroll');const dates=getDateRange();const todayKey=dateKey(new Date());
  cal.innerHTML=dates.map(d=>{
    const key=dateKey(d);const dm=state.plan[key]||{};const isToday=key===todayKey;const isOpen=state.openDays[key];const expired=dayHasExp(key);
    const pills=MEAL_TYPES.filter(tp=>dm[tp]&&dm[tp].dishId).map(tp=>{const di=getDish(dm[tp].dishId);return di?`<span class="cal-pill">${di.emoji} ${dishName(di)}</span>`:''}).join('');
    const slots=MEAL_TYPES.map(type=>{
      const slot=dm[type];const dish=slot?.dishId?getDish(slot.dishId):null;
      const hasExp=dish&&dish.ingredients.some(ing=>{const days=effDays(ingName(ing));return days!==null&&days<=3;});
      const thumb=dish?(dish.photo?`<img class="slot-thumb" src="${dish.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="slot-thumb-em" style="display:none">${dish.emoji}</div>`:`<div class="slot-thumb-em">${dish.emoji}</div>`):'';
      const gc=dish?`<div class="guest-counter"><button class="gc-btn" onclick="adjG(event,'${key}','${type}',-1)">−</button><span class="gc-label">${guestLabel(slot)}</span><button class="gc-btn" onclick="adjG(event,'${key}','${type}',1)">+</button></div>`:'';
      return`<div class="cal-slot" data-key="${key}" data-type="${type}"><div class="slot-type">${MEAL_ICONS[type]} ${type}</div><div class="slot-content">${thumb}${dish?`<span class="slot-name">${dishName(dish)}</span>`:`<span class="slot-empty">—</span>`}${hasExp?`<span class="slot-warn">⚠</span>`:''}</div><div class="slot-right">${gc}${dish?`<div class="slot-rm" onclick="rmMeal('${key}','${type}')">×</div>`:''}</div></div>`;
    }).join('');
    return`<div class="cal-day" id="calday-${key}"><div class="cal-hdr ${isToday?'today':''}" onclick="toggleDay('${key}')"><div class="cal-date"><span class="cal-dow">${dow(d)}</span><span class="cal-num">${d.getDate()}</span></div><div class="cal-summary"><div class="cal-pills">${pills||`<span class="cal-hint">${t('dragHint')}</span>`}</div></div>${expired?`<div class="exp-dot"></div>`:''}<div class="cal-chev ${isOpen?'open':''}">›</div></div><div class="cal-slots ${isOpen?'open':''}" id="slots-${key}">${slots}</div></div>`;
  }).join('');
}
function adjG(e,key,type,delta){e.stopPropagation();if(!state.plan[key])state.plan[key]={};const slot=state.plan[key][type];if(!slot||!slot.dishId)return;slot.adults=Math.max(0,(slot.adults||state.family.adults)+delta);if(slot.adults===0&&(slot.children||0)===0)slot.adults=1;save();rebuildShopping();updateBadge();renderPlan();}
function toggleDay(key){state.openDays[key]=!state.openDays[key];save();const s=document.getElementById('slots-'+key);const ch=document.querySelector(`#calday-${key} .cal-chev`);if(s)s.classList.toggle('open',state.openDays[key]);if(ch)ch.classList.toggle('open',state.openDays[key]);}
function rmMeal(key,type){if(state.plan[key])state.plan[key][type]=null;save();rebuildShopping();updateBadge();renderPlan();}

let activeDrag=null;const ghost=document.getElementById('ghost');
function chipStart(e){e.preventDefault();const chip=e.currentTarget;const id=parseInt(chip.dataset.id);const dish=getDish(id);if(!dish)return;const p=e.touches?e.touches[0]:e;activeDrag={dishId:id,chip};document.getElementById('ghost-img').innerHTML=dish.photo?`<img src="${dish.photo}" style="width:100%;height:58px;object-fit:cover">`:`<div class="chip-fb">${dish.emoji}</div>`;document.getElementById('ghost-name').textContent=dishName(dish);ghost.style.display='block';moveGhost(p.clientX,p.clientY);chip.classList.add('dragging');window.addEventListener('mousemove',chipMove);window.addEventListener('touchmove',chipMove,{passive:false});window.addEventListener('mouseup',chipEnd);window.addEventListener('touchend',chipEnd);}
function moveGhost(x,y){ghost.style.left=(x-43)+'px';ghost.style.top=(y-37)+'px';}
function chipMove(e){if(!activeDrag)return;e.preventDefault();const p=e.touches?e.touches[0]:e;moveGhost(p.clientX,p.clientY);ghost.style.display='none';const el=document.elementFromPoint(p.clientX,p.clientY);ghost.style.display='block';document.querySelectorAll('.cal-slot.drop-target').forEach(s=>s.classList.remove('drop-target'));if(el){const slot=el.closest('.cal-slot');if(slot)slot.classList.add('drop-target');const dh=el.closest('.cal-hdr');if(dh){const cd=dh.closest('.cal-day');if(cd){const k=cd.id.replace('calday-','');if(!state.openDays[k]){state.openDays[k]=true;save();const ss=document.getElementById('slots-'+k);const cv=dh.querySelector('.cal-chev');if(ss)ss.classList.add('open');if(cv)cv.classList.add('open');}}}}}
function chipEnd(e){if(!activeDrag){cleanupDrag();return;}const p=e.changedTouches?e.changedTouches[0]:e;ghost.style.display='none';const el=document.elementFromPoint(p.clientX,p.clientY);document.querySelectorAll('.cal-slot.drop-target').forEach(s=>s.classList.remove('drop-target'));if(activeDrag.chip)activeDrag.chip.classList.remove('dragging');if(el){const slot=el.closest('.cal-slot');if(slot&&slot.dataset.key&&slot.dataset.type){assignDirect(activeDrag.dishId,slot.dataset.key,slot.dataset.type);cleanupDrag();return;}const dh=el.closest('.cal-hdr');if(dh){const cd=dh.closest('.cal-day');if(cd){const k=cd.id.replace('calday-','');openPicker(activeDrag.dishId,k);}}}cleanupDrag();}
function cleanupDrag(){activeDrag=null;ghost.style.display='none';window.removeEventListener('mousemove',chipMove);window.removeEventListener('touchmove',chipMove);window.removeEventListener('mouseup',chipEnd);window.removeEventListener('touchend',chipEnd);}
function assignDirect(dishId,key,type){if(!state.plan[key])state.plan[key]={};state.plan[key][type]={dishId,...defaultGuests()};save();rebuildShopping();updateBadge();renderPlan();}

let pickerState=null;
function openPicker(dishId,key){const dish=getDish(dishId);if(!dish)return;pickerState={dishId,key};const dm=state.plan[key]||{};const imgH=dish.photo?`<img class="p-img" src="${dish.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="p-img-em" style="display:none">${dish.emoji}</div>`:`<div class="p-img-em">${dish.emoji}</div>`;document.getElementById('p-preview').innerHTML=`${imgH}<div><div class="p-name">${dishName(dish)}</div><div class="p-sub">${dish.tags.map(tk=>tTag(tk)).join(' · ')}</div></div>`;const d=new Date(key+'T00:00:00');document.getElementById('p-q').textContent=`${t('assignMeal')} — ${dow(d)} ${d.getDate()} ${mon(d)}`;document.getElementById('p-opts').innerHTML=MEAL_TYPES.map(type=>{const exist=dm[type]?.dishId?getDish(dm[type].dishId):null;return`<div class="p-opt" onclick="pickerSel('${type}')"><div class="p-ico ${type.toLowerCase()}">${MEAL_ICONS[type]}</div><div><div class="p-lbl">${type}</div><div class="p-sl">${exist?`Replaces ${dishName(exist)}`:'Empty slot'}</div></div></div>`;}).join('');document.getElementById('picker-bg').classList.add('open');}
function pickerSel(type){if(!pickerState)return;assignDirect(pickerState.dishId,pickerState.key,type);closePicker();}
function closePicker(){document.getElementById('picker-bg').classList.remove('open');pickerState=null;}
function autoFill(){if(!state.liked.length){alert(t('saveFirst'));return;}const dates=getDateRange();let idx=0;dates.forEach(d=>{const key=dateKey(d);if(!state.plan[key])state.plan[key]={};MEAL_TYPES.forEach(type=>{if(!state.plan[key][type]||!state.plan[key][type].dishId){state.plan[key][type]={dishId:state.liked[idx%state.liked.length],...defaultGuests()};idx++;}});});save();rebuildShopping();updateBadge();renderPlan();}
function clearPlan(){if(!confirm(t('clearPlanConfirm')))return;state.plan={};save();rebuildShopping();updateBadge();renderPlan();}

// ═══════════════════════════════════════════════════
// RECIPES
// ═══════════════════════════════════════════════════
const recipeServings={};
function renderRecipes(){
  document.getElementById('rec-list-view').style.display='';
  document.getElementById('rec-detail-view').style.display='none';
  const allTagKeys=['All',...new Set(DISHES.filter(d=>state.liked.includes(d.id)).flatMap(d=>d.tags))];
  document.getElementById('rec-tag-filters').innerHTML=allTagKeys.map(k=>
    `<div class="tag-pill ${state.recTag===k?'active':''}" onclick="setRecTag('${k}')">${tTag(k)}</div>`
  ).join('');
  const grid=document.getElementById('rec-grid');
  const visible=state.liked.filter(id=>{const d=getDish(id);return d&&(state.recTag==='All'||d.tags.includes(state.recTag));});
  if(!visible.length){grid.innerHTML=`<div class="empty-rec"><span>🌿</span>${t('recipesSub')}</div>`;return;}
  grid.innerHTML=visible.map(id=>{
    const d=getDish(id);if(!d)return'';
    const rating=avgRating(id);
    const totalTime=(d.prep||0)+(d.cook||0);
    const img=d.photo
      ?`<img class="rec-card-img" src="${d.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="rec-card-img-em" style="display:none">${d.emoji}</div>`
      :`<div class="rec-card-img-em">${d.emoji}</div>`;
    return`<div class="rec-card" onclick="openRecipe(${id})">
      ${img}
      <div class="rec-card-body">
        <div class="rec-card-top">
          <div class="rec-card-name">${dishName(d)}</div>
        </div>
        <div class="rec-card-sub">${dishSubtitle(d)||dishDesc(d)}</div>
        <div class="rec-card-footer">
          ${totalTime?`<span class="rec-time-chip">⏱ ${totalTime} min</span>`:''}
          ${(d.badges||[]).map(b=>BADGE_HTML[b]||'').join('')}
          ${rating>0?`<span style="font-size:11px;color:var(--gold);font-weight:500">★ ${rating.toFixed(1)}</span>`:''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function setRecTag(k){state.recTag=k;save();renderRecipes();}

function openRecipe(id){
  const d=getDish(id);if(!d)return;
  document.getElementById('rec-list-view').style.display='none';
  recipeServings[id]=recipeServings[id]||Math.round(familyServings());
  renderRecipeDetail(id);
  document.getElementById('screen-recipes').scrollTop=0;
}

function changeServings(id,delta){
  recipeServings[id]=Math.max(1,(recipeServings[id]||Math.round(familyServings()))+delta);
  renderRecipeDetail(id);
}

function renderRecipeDetail(id){
  const d=getDish(id);if(!d)return;
  const servings=recipeServings[id]||Math.round(familyServings());
  const mult=servings/(d.servings||2);
  const rating=avgRating(id);const rCount=state.ratings[id]?.count||0;
  const dv=document.getElementById('rec-detail-view');dv.style.display='';
  const steps=dishSteps(d);
  const base=dishBase(d);
  const dressing=dishDressing(d);
  const totalTime=(d.prep||0)+(d.cook||0);

  // Hero image with overlay title
  const img=d.photo
    ?`<img class="rd-img" src="${d.photo}" onerror="this.style.display='none';this.nextSibling.style.display='flex'"><div class="rd-img-em" style="display:none">${d.emoji}</div>`
    :`<div class="rd-img-em">${d.emoji}</div>`;

  // Meta strip
  const metaStrip=`<div class="rd-meta-strip">
    ${d.prep?`<div class="rd-meta-item"><div class="rd-meta-val">${d.prep}'</div><div class="rd-meta-lbl">Prep</div></div>`:''}
    ${d.cook?`<div class="rd-meta-item"><div class="rd-meta-val">${d.cook}'</div><div class="rd-meta-lbl">Cook</div></div>`:''}
    <div class="rd-meta-item"><div class="rd-meta-val">${totalTime}'</div><div class="rd-meta-lbl">Total</div></div>
    <div class="rd-meta-item"><div class="rd-meta-val">${d.nutrition?.kcal||'—'}</div><div class="rd-meta-lbl">kcal</div></div>
  </div>`;

  // Ingredient grid
  const ingGrid=`<div class="rd-ing-grid">${d.ingredients.map(ing=>{
    const qty=fmtIngQty(ing,mult);
    return`<div class="rd-ing-item">
      <span class="rd-ing-emoji">${ing.emoji}</span>
      <div class="rd-ing-mid">
        <div class="rd-ing-name">${ingName(ing)}</div>
        <div class="rd-ing-amt">${qty}</div>
      </div>
    </div>`;
  }).join('')}</div>`;

  // Base ingredients
  const baseHtml=base.length?`<div class="rd-base">${base.map(b=>`<span class="rd-base-chip">${b}</span>`).join('')}</div>`:'';

  // Dressing
  const dressingHtml=dressing.length?`<div class="rd-section" style="margin-top:14px"><div class="rd-section-title">Sauce & Dressing</div><div class="rd-base">${dressing.map(b=>`<span class="rd-base-chip">${b}</span>`).join('')}</div></div>`:'';

  // Steps
  const stepsHtml=steps.map(step=>{
    const ingsHtml=step.ings&&step.ings.length?`<div class="rd-step-ings">${step.ings.map(i=>`<span class="rd-step-ing">${i}</span>`).join('')}</div>`:'';
    const tipHtml=step.tip?`<div class="rd-step-tip"><span class="rd-step-tip-icon">💡</span><div class="rd-step-tip-txt">${step.tip}</div></div>`:'';
    const kidsHtml=step.kids?`<div class="rd-step-kids"><div class="rd-step-kids-txt">${step.kids}</div></div>`:'';
    return`<div class="rd-step-card">
      <div class="rd-step-hdr">
        <div class="rd-step-num">${step.num}</div>
        <div class="rd-step-title">${step.title}</div>
      </div>
      <div class="rd-step-body">
        ${ingsHtml}
        <div class="rd-step-txt">${step.text}</div>
        ${tipHtml}${kidsHtml}
      </div>
    </div>`;
  }).join('');

  // Nutrition
  const nut=d.nutrition?`<div class="rd-section"><div class="rd-section-title">${t('nutritionPer')}</div>
    <div class="rd-nut">
      <div class="rd-nitem"><div class="rd-nval">${d.nutrition.kcal}</div><div class="rd-nlbl">${t('kcal')}</div></div>
      <div class="rd-nitem"><div class="rd-nval">${d.nutrition.protein}g</div><div class="rd-nlbl">${t('protein')}</div></div>
      <div class="rd-nitem"><div class="rd-nval">${d.nutrition.carbs}g</div><div class="rd-nlbl">${t('carbs')}</div></div>
      <div class="rd-nitem"><div class="rd-nval">${d.nutrition.fat}g</div><div class="rd-nlbl">${t('fat')}</div></div>
      ${d.nutrition.fiber?`<div class="rd-nitem"><div class="rd-nval">${d.nutrition.fiber}g</div><div class="rd-nlbl">Fiber</div></div>`:''}
    </div></div>`:'';

  dv.innerHTML=`
    <div class="rd-back" onclick="renderRecipes()">
      <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>${t('allRecipes')}
    </div>
    <div class="rd-hero">
      ${img}
      <div class="rd-hero-overlay">
        <div class="rd-hero-title">${dishName(d)}</div>
        <div class="rd-hero-sub">${dishSubtitle(d)}</div>
      </div>
    </div>
    <div class="rd-body">
      ${metaStrip}
      <div class="rd-tags-wrap">
        ${d.tags.map(tk=>`<span class="tag">${tTag(tk)}</span>`).join('')}
        ${(d.badges||[]).map(b=>BADGE_HTML[b]||'').join('')}
        ${rating>0?`<div style="display:flex;align-items:center;gap:4px;">${starHTML(rating,13)}<span style="font-size:11px;color:var(--text3)">${rating.toFixed(1)} (${rCount})</span></div>`:''}
      </div>
      <div class="rd-servings">
        <span class="rd-srv-label">${t('servingLabel')}</span>
        <button class="rd-srv-btn" onclick="changeServings(${id},-1)">−</button>
        <span class="rd-srv-count">${servings}</span>
        <button class="rd-srv-btn" onclick="changeServings(${id},1)">+</button>
      </div>
      <div class="rd-section">
        <div class="rd-section-title">${t('ingredients')}</div>
        ${ingGrid}
        ${baseHtml}
      </div>
      ${dressingHtml}
      <div class="rd-section" style="margin-top:14px">
        <div class="rd-section-title">${t('method')}</div>
        ${stepsHtml}
      </div>
      ${nut}
      <button class="rd-rate-btn" onclick="openRating(${id})">
        <span>${rating>0?t('updateRating'):t('rateRecipe')}</span>
        <div>${[1,2,3,4,5].map(i=>`<span class="mini-star ${i<=Math.round(rating)?'filled':''}">★</span>`).join('')}</div>
      </button>
      <div style="font-size:11px;color:var(--text3);margin:14px 16px 0;">📷 Photos: Unsplash.com</div>
    </div>`;
}

function openRecipeFromToday(dishId){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(nt=>nt.classList.remove('active'));
  document.getElementById('screen-recipes').classList.add('active');
  document.getElementById('tab-recipes').classList.add('active');
  document.getElementById('rec-list-view').style.display='none';
  recipeServings[dishId]=recipeServings[dishId]||familyServings();
  renderRecipeDetail(dishId);
}

// ═══════════════════════════════════════════════════
// CORE APP
// ═══════════════════════════════════════════════════
function hideLoading(){
  const el=document.getElementById('loading');
  if(!el)return;
  el.style.animation='none'; // cancel CSS timeout
  el.classList.add('hide');
  setTimeout(()=>{el.style.display='none';},500);
}
function showAuth(){document.getElementById('auth-screen').classList.add('active');document.getElementById('app').style.display='none';}
function showApp(user){
  document.getElementById('auth-screen').classList.remove('active');
  document.getElementById('app').style.display='block';
  currentUser=user;
  const meta=user.user_metadata||{};
  document.getElementById('user-avatar').textContent=meta.avatar||'🌿';
  document.getElementById('user-name').textContent=meta.first_name||user.email?.split('@')[0]||'Friend';
  const tier=getUserTier();
  const tierLabels={guest:'Guest · 4 dishes',registered:'Free account · 10 dishes',premium:'⭐ Premium'};
  document.getElementById('user-plan').textContent=tierLabels[tier]||tier;
  // Show upgrade prompt for non-premium
  if(tier!=='premium'&&!isGuest){
    document.getElementById('user-plan').style.cursor='pointer';
    document.getElementById('user-plan').onclick=()=>openPaywall('premium');
  }
  applyLang();renderLangBars();renderFamily();initDiscover();rebuildShopping();updateBadge();
}

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
async function init(){
  // ── Load language ──────────────────────────────────────────
  try{const saved=localStorage.getItem('menja_lang');if(saved&&TR[saved])lang=saved;}catch(e){}
  applyLang();
  renderLangBars();
  document.getElementById('loading-sub').textContent=t('loadingKitchen');

  // ── Register auth listener FIRST (before any async calls) ──
  // This ensures OAuth callbacks and email confirmations always work
  sb.auth.onAuthStateChange(async(event,session)=>{
    if(event==='SIGNED_IN'&&session){
      clearTimeout(window._safetyTimer);
      await loadUserData(session.user);
      hideLoading();
      showApp(session.user);
    }else if(event==='SIGNED_OUT'){
      state={family:{adults:2,children:0},liked:[],disliked:[],plan:{},shopping:{},catOpen:{},ratings:{},activeTag:'All',recTag:'All',openDays:{},discoverPaused:false,pantry:{},genericCart:{}};
      showAuth();
    }
  });

  // ── file:// fallback ───────────────────────────────────────
  if(isFileProt()){
    hideLoading();showAuth();
    showAuthError('Opening as a local file.\nSign-in needs a web server: npx serve . → http://localhost:3000\n\nOr tap "Continue as guest" below.');
    return;
  }

  // ── Safety timer — never hang forever ──────────────────────
  // If Supabase doesn't respond in 4s, show auth screen anyway
  window._safetyTimer=setTimeout(()=>{
    console.warn('Supabase timeout — showing auth screen');
    hideLoading();
    showAuth();
  },4000);

  // ── Check existing session ─────────────────────────────────
  try{
    const{data:{session},error}=await sb.auth.getSession();
    clearTimeout(window._safetyTimer);

    if(session&&session.user){
      // Valid session found — load data and show app
      await loadUserData(session.user);
      hideLoading();
      showApp(session.user);
      return;
    }

    // No session — check for saved guest
    try{
      const g=localStorage.getItem('menja_guest');
      if(g&&JSON.parse(g).isGuest){
        isGuest=true;loadLocal();hideLoading();
        showApp({id:'guest',email:'',user_metadata:{first_name:'Guest',avatar:'👤',plan:'guest'}});
        return;
      }
    }catch(e){}

    // No session, no guest — show auth
    hideLoading();showAuth();

  }catch(e){
    // Network error or Supabase unreachable
    clearTimeout(window._safetyTimer);
    console.warn('Supabase getSession error:',e);
    hideLoading();showAuth();
  }
}

// init() is called by initSupabase() once the library loads
initSupabase();
</script>

<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.log('SW registration failed:', err));
    });
  }
</script>
</body>
</html>
