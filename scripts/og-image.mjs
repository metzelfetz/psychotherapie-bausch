// Renders public/og-image.jpg (1200×630), the preview image for links shared
// on social media and in messengers: the portrait in front of the sage arch,
// as in the hero, with the practice name beside it. Run once after changing
// the portrait or the colours: `node scripts/og-image.mjs`.
import sharp from 'sharp';

const W = 1200;
const H = 630;
// Colours from src/styles/global.css (the bausch theme).
const bg = '#efe9dd';
const sage = '#5a6b4a';
const sand = '#c9b58e';
const text = '#2e2c28';
const muted = '#6b665c';

const portraitH = 600;
const portrait = await sharp('src/assets/Portrait_cutout.png').resize({ height: portraitH }).toBuffer();
const { width: portraitW } = await sharp(portrait).metadata();
const px = W - portraitW - 70;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <circle cx="${px + 40}" cy="200" r="70" fill="${sand}" opacity="0.55"/>
  <path d="M${px + 50} ${H} V260 a${(portraitW - 100) / 2} ${(portraitW - 100) / 2} 0 0 1 ${portraitW - 100} 0 V${H} Z" fill="${sage}"/>
  <text x="80" y="265" font-family="Georgia, serif" font-size="58" fill="${text}">Praxis für</text>
  <text x="80" y="335" font-family="Georgia, serif" font-size="58" fill="${text}">Psychotherapie</text>
  <text x="80" y="410" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${sage}">Dr. phil. Paul Bausch</text>
  <text x="80" y="452" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${muted}">Schopfheim · Freiburg</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: portrait, left: px, top: H - portraitH }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg');
console.log('public/og-image.jpg written');
