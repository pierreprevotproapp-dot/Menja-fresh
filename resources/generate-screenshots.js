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
  { theme:'green', h:['Was koche','ich heute?'], accentLine:1,
    sub:'Diese Frage stellst du dir nie wieder.',
    photo:'https://v3b.fal.media/files/b/0a9cf81c/K6Ye8kFA33SPrOvE8CQyu_1d21f191f05e4044bce5aaf4174f776d.jpg',
    pill:'Hähnchen-Halloumi-Salat' },
  { theme:'cream', h:['Wir wählen.','Du swipest.'], accentLine:1,
    sub:'Dein Wochenplan in unter 2 Minuten.',
    photo:'https://v3b.fal.media/files/b/0a9cf82c/GDeOJLLX6p3aBE4571c-h_d46de74fb57f464d8847ba27c2781b02.jpg',
    pill:'Beeren-Smoothie-Bowl' },
  { theme:'green', h:['Einkaufsliste?','Automatisch.'], accentLine:1,
    sub:'Sortiert. Nichts vergessen.',
    photo:'https://v3b.fal.media/files/b/0a9cf812/dRcuFh5yMT_Ca263MrKXs_f36bca24600442d29df917bd24351a4a.jpg',
    pill:'Beef Chimichurri & Reis' },
  { theme:'cream', h:['70+ frische','Rezepte.'], accentLine:1,
    sub:'Viele in unter 30 Minuten.',
    photo:'https://v3b.fal.media/files/b/0a9cf838/Hylc0Fz7I815A41Ktq9HM_6017c84f81b644cf868e0e1e62689ae9.jpg',
    pill:'Gefüllte Paprika mit Feta' },
  { theme:'green', h:['Kaufen &','liefern lassen.'], accentLine:1,
    sub:'Von der Idee bis vor die Tür.',
    photo:'https://v3b.fal.media/files/b/0a9cf81b/EFctP0hmqINYvfwRjkEYu_3d3233de7ca24aa0b1a5714ad3530a27.jpg',
    pill:'Süßkartoffel mit Tahini' },
];

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
  const hl = s.h.map((line,i)=>{
    const fill = i===s.accentLine ? ACCENT : txt;
    return `<text x="${CX}" y="${330+i*108}" font-family="Georgia, 'Times New Roman', serif" font-size="100" font-weight="700" fill="${fill}">${esc(line)}</text>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>${bg}</defs>
    <rect width="${W}" height="${H}" fill="${bgFill}"/>
    ${bowl(CX-6,150,84)}
    ${hl}
    <text x="${CX}" y="${330+s.h.length*108+24}" font-family="Arial, Helvetica, sans-serif" font-size="46" fill="${mut}">${esc(s.sub)}</text>
    <text x="${W/2}" y="${H-90}" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-weight="700" fill="${txt}" opacity="0.85">Menja Fresh</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

function overlaySvg(s){
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
      <rect x="${CX+56}" y="${CY+CH-110}" width="300" height="64" rx="32" fill="#D6492F"/>
      <text x="${CX+56+150}" y="${CY+CH-66}" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#FFFFFF">Schritt für Schritt</text>
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
  for(let i=0;i<slides.length;i++){
    const s = slides[i];
    const base = await buildBase(s);
    const photo = await fetchPhoto(s.photo);
    const out = path.join(outDir, `de-67-${i+1}.png`);
    await sharp(base)
      .composite([{ input: photo, left: CX, top: CY }, { input: overlaySvg(s), left:0, top:0 }])
      .png({ compressionLevel:9 })
      .toFile(out);
    console.log('  ✓ store/screenshots/'+path.basename(out));
  }
  console.log('Done — '+slides.length+' screenshots (1290×2796).');
})();
