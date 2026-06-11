// Menja Fresh — render App Store / Play marketing screenshots (6.7", 1290×2796).
// Real food photos from the live recipe DB, brand colours, German captions.
// Usage:  node resources/generate-screenshots.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 1290, H = 2796;
const GREEN = '#234227', GREEN2 = '#37704A', CREAM = '#FBF5E9', CREAM_TX = '#FBF5E9',
      INK = '#213F27', MUT_ON_GREEN = '#CFE0D0', MUT_ON_CREAM = '#6E6055', ACCENT = '#E07A4E';

const slides = [
  // 1 — PAIN: the nightly decision fatigue → OUTCOME: the whole week, decided, in minutes
  { theme:'green', h:['Schluss mit der','Abend-Frage.'], accentLine:1,
    sub:'In 2 Minuten steht das Essen für die ganze Woche.',
    badge:'2 Minuten pro Woche',
    photo:'https://v3b.fal.media/files/b/0a9cf81c/K6Ye8kFA33SPrOvE8CQyu_1d21f191f05e4044bce5aaf4174f776d.jpg',
    pill:'Hähnchen-Halloumi-Salat' },
  // 2 — PAIN: mental load / who decides → OUTCOME: we decide, you just approve
  { theme:'cream', h:['Du musst nichts','mehr aussuchen.'], accentLine:1,
    sub:'Wir wählen passende Gerichte – du swipest nur noch.',
    badge:'3× swipen – fertig',
    photo:'https://v3b.fal.media/files/b/0a9cf82c/GDeOJLLX6p3aBE4571c-h_d46de74fb57f464d8847ba27c2781b02.jpg',
    pill:'Beeren-Smoothie-Bowl' },
  // 3 — PAIN: writing lists, forgetting items, extra trips → OUTCOME: list writes itself
  { theme:'green', h:['Nie wieder eine','Liste schreiben.'], accentLine:1,
    sub:'Die Einkaufsliste entsteht automatisch – nichts vergessen.',
    badge:'0 vergessene Zutaten',
    photo:'https://v3b.fal.media/files/b/0a9cf812/dRcuFh5yMT_Ca263MrKXs_f36bca24600442d29df917bd24351a4a.jpg',
    pill:'Beef Chimichurri & Reis' },
  // 4 — PAIN: same boring meals / unhealthy under time pressure → OUTCOME: fresh & varied
  { theme:'cream', h:['Jeden Abend frisch.','Nie langweilig.'], accentLine:1,
    sub:'70+ ausgewogene Rezepte – viele in unter 30 Minuten.',
    badge:'70+ frische Rezepte',
    photo:'https://v3b.fal.media/files/b/0a9cf838/Hylc0Fz7I815A41Ktq9HM_6017c84f81b644cf868e0e1e62689ae9.jpg',
    pill:'Gefüllte Paprika mit Feta' },
  // 5 — PAIN: shopping logistics → OUTCOME: from plan to your front door
  { theme:'green', h:['Vom Plan direkt','vor die Haustür.'], accentLine:1,
    sub:'Zutaten online kaufen und nach Hause liefern lassen.',
    badge:'Liefern lassen statt schleppen',
    photo:'https://v3b.fal.media/files/b/0a9cf81b/EFctP0hmqINYvfwRjkEYu_3d3233de7ca24aa0b1a5714ad3530a27.jpg',
    pill:'Süßkartoffel mit Tahini' },
];

const slidesEN = [
  { theme:'green', h:['End the','dinner question.'], accentLine:1,
    sub:'Your whole week, planned in 2 minutes.',
    badge:'2 minutes a week',
    photo:'https://v3b.fal.media/files/b/0a9cf81c/K6Ye8kFA33SPrOvE8CQyu_1d21f191f05e4044bce5aaf4174f776d.jpg',
    pill:'Chicken & Halloumi Salad' },
  { theme:'cream', h:["You don't pick","a thing."], accentLine:1,
    sub:'We choose the meals — you just swipe.',
    badge:'3 swipes, done',
    photo:'https://v3b.fal.media/files/b/0a9cf82c/GDeOJLLX6p3aBE4571c-h_d46de74fb57f464d8847ba27c2781b02.jpg',
    pill:'Berry Smoothie Bowl' },
  { theme:'green', h:['Never write a','list again.'], accentLine:1,
    sub:'Your shopping list builds itself — nothing forgotten.',
    badge:'0 forgotten items',
    photo:'https://v3b.fal.media/files/b/0a9cf812/dRcuFh5yMT_Ca263MrKXs_f36bca24600442d29df917bd24351a4a.jpg',
    pill:'Beef Chimichurri & Rice' },
  { theme:'cream', h:['Fresh every night.','Never boring.'], accentLine:1,
    sub:'70+ balanced recipes — many under 30 minutes.',
    badge:'70+ recipes',
    photo:'https://v3b.fal.media/files/b/0a9cf838/Hylc0Fz7I815A41Ktq9HM_6017c84f81b644cf868e0e1e62689ae9.jpg',
    pill:'Stuffed Peppers with Feta' },
  { theme:'green', h:['From plan','to your door.'], accentLine:1,
    sub:'Buy the ingredients online and have them delivered.',
    badge:'Delivered, not lugged',
    photo:'https://v3b.fal.media/files/b/0a9cf81b/EFctP0hmqINYvfwRjkEYu_3d3233de7ca24aa0b1a5714ad3530a27.jpg',
    pill:'Sweet Potato with Tahini' },
];

const SETS = { de: { slides, step: 'Schritt für Schritt' }, en: { slides: slidesEN, step: 'Step by step' } };

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const bowl = (x,y,s)=>`<g transform="translate(${x},${y}) scale(${s/1024})">
  <circle cx="512" cy="406" r="66" fill="#E6A92E"/><circle cx="416" cy="452" r="84" fill="#D6492F"/>
  <circle cx="610" cy="444" r="74" fill="#83B26A"/>
  <path d="M612 384 q48 -46 104 -24 q-20 54 -76 54 q-24 -12 -28 -30 Z" fill="#5E9B49"/>
  <path d="M196 520 Q512 900 828 520 Z" fill="#FFFDF7"/>
  <ellipse cx="512" cy="520" rx="316" ry="50" fill="#FFFDF7"/></g>`;

// card geometry
const CX=145, CY=900, CW=1000, CH=1640, CR=72;

async function buildBase(s){
  const onGreen = s.theme==='green';
  const bg = onGreen ? `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${GREEN2}"/><stop offset="1" stop-color="${GREEN}"/></linearGradient>` : '';
  const bgFill = onGreen ? 'url(#bg)' : CREAM;
  const txt = onGreen ? CREAM_TX : INK;
  const mut = onGreen ? MUT_ON_GREEN : MUT_ON_CREAM;
  const FS=86, LH=100, hy0=300;
  const hl = s.h.map((line,i)=>{
    const fill = i===s.accentLine ? ACCENT : txt;
    return `<text x="${CX}" y="${hy0+i*LH}" font-family="Georgia, 'Times New Roman', serif" font-size="${FS}" font-weight="700" fill="${fill}">${esc(line)}</text>`;
  }).join('');
  const subY = hy0 + s.h.length*LH + 18;
  // outcome badge — solid accent pill, no emoji (renders reliably server-side)
  let badge='';
  if(s.badge){
    const bw = Math.round(s.badge.length*16.5 + 64);
    const by = subY + 34;
    badge = `<g>
      <rect x="${CX}" y="${by}" width="${bw}" height="56" rx="28" fill="${ACCENT}"/>
      <circle cx="${CX+30}" cy="${by+28}" r="7" fill="#FFFFFF"/>
      <text x="${CX+50}" y="${by+38}" font-family="Arial, Helvetica, sans-serif" font-size="29" font-weight="700" fill="#FFFFFF">${esc(s.badge)}</text>
    </g>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>${bg}</defs>
    <rect width="${W}" height="${H}" fill="${bgFill}"/>
    ${bowl(CX-6,150,84)}
    ${hl}
    <text x="${CX}" y="${subY}" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="${mut}">${esc(s.sub)}</text>
    ${badge}
    <text x="${W/2}" y="${H-90}" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-weight="700" fill="${txt}" opacity="0.85">Menja Fresh</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

function overlaySvg(s, stepLabel){
  // bottom gradient on the photo card + recipe pill
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="#10210F" stop-opacity="0.82"/>
      </linearGradient>
      <clipPath id="card"><rect x="${CX}" y="${CY}" width="${CW}" height="${CH}" rx="${CR}"/></clipPath>
    </defs>
    <g clip-path="url(#card)">
      <rect x="${CX}" y="${CY+CH-420}" width="${CW}" height="420" fill="url(#shade)"/>
    </g>
    <rect x="${CX}" y="${CY}" width="${CW}" height="${CH}" rx="${CR}" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
    <text x="${CX+56}" y="${CY+CH-150}" font-family="Georgia, serif" font-size="46" font-weight="700" fill="#FFFFFF">${esc(s.pill)}</text>
    <g>
      <rect x="${CX+56}" y="${CY+CH-110}" width="${Math.round(stepLabel.length*17+60)}" height="64" rx="32" fill="#D6492F"/>
      <text x="${CX+56+Math.round((stepLabel.length*17+60)/2)}" y="${CY+CH-66}" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">${esc(stepLabel)}</text>
    </g>
  </svg>`);
}

async function fetchPhoto(url){
  const r = await fetch(url);
  if(!r.ok) throw new Error('photo '+r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  const mask = Buffer.from(`<svg width="${CW}" height="${CH}"><rect width="${CW}" height="${CH}" rx="${CR}" ry="${CR}"/></svg>`);
  return sharp(buf).resize(CW, CH, { fit:'cover' })
    .composite([{ input: mask, blend:'dest-in' }]).png().toBuffer();
}

(async () => {
  const outDir = path.join(__dirname,'..','store','screenshots');
  fs.mkdirSync(outDir,{recursive:true});
  // Render only the language(s) passed as args (e.g. `node generate-screenshots.js en`),
  // or all of them by default.
  const want = process.argv.slice(2);
  const langs = want.length ? want : Object.keys(SETS);
  for(const lang of langs){
    const set = SETS[lang]; if(!set){ console.log('  ! unknown lang', lang); continue; }
    for(let i=0;i<set.slides.length;i++){
      const s = set.slides[i];
      const base = await buildBase(s);
      const photo = await fetchPhoto(s.photo);
      const out = path.join(outDir, `${lang}-67-${i+1}.png`);
      await sharp(base)
        .composite([{ input: photo, left: CX, top: CY }, { input: overlaySvg(s, set.step), left:0, top:0 }])
        .png({ compressionLevel:9 })
        .toFile(out);
      console.log('  ✓ store/screenshots/'+path.basename(out));
    }
  }
  console.log('Done — '+langs.join(', ')+' (1290×2796).');
})();
