// Menja Fresh — render all PNG app assets from the master SVGs.
// Usage:  node resources/generate.js
// Requires: sharp  (npm install sharp)

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const icon = path.join(__dirname, 'icon.svg');
const iconMask = path.join(__dirname, 'icon-maskable.svg');
const splash = path.join(__dirname, 'splash.svg');

// [sourceSvg, outPath, size]  — outPath relative to repo root
const jobs = [
  // PWA / web icons (referenced by manifest.json + app.html)
  [icon, 'icon-192.png', 192],
  [icon, 'icon-512.png', 512],
  [iconMask, 'icon-maskable-512.png', 512],
  [icon, 'apple-touch-icon.png', 180],
  [icon, 'favicon-32.png', 32],
  // App Store / Play Store marketing icon + Capacitor source
  [icon, 'store/icon-1024.png', 1024],
  [splash, 'store/splash-2732.png', 2732],
];

(async () => {
  for (const [src, out, size] of jobs) {
    const outAbs = path.join(root, out);
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    await sharp(src, { density: 384 })
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(outAbs);
    console.log('  ✓', out, `(${size}×${size})`);
  }
  console.log('Done — all assets rendered.');
})();
