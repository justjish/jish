import sharp from 'sharp';

//_  0px  - 600w - 120vw
//sm 640px - 600w - 90vw
//md 768px - 700w - 90vw
//lg 1024px - 950w - 50vw
//xl 1280px - 640w - 50vw
//2xl 1536px - 700w - 40vw
const sizes = [
  [600, 1200, 1800],
  [700, 1400, 2100],
  [950, 1900, 2850],
  [640, 1280, 1920],
  [700, 1400, 2100],
];
const avif = Promise.all(
  sizes.map(
    async (ws) =>
      await Promise.all(
        ws.map(async (w, i) =>
          sharp('./app/assets/pictures/fullbody.heic', { unlimited: true })
            .avif({ effort: 9, lossless: true })
            .resize(w, null, { fit: 'inside', withoutEnlargement: true })
            .toFile(`./app/assets/pictures/fullbody-ll-${w}w-${i + 1}x.avif`),
        ),
      ),
  ),
);
const avifLossy = Promise.all(
  sizes.map(
    async (ws) =>
      await Promise.all(
        ws.map(async (w, i) =>
          sharp('./app/assets/pictures/fullbody.heic', { unlimited: true })
            .avif({ effort: 9, quality: 80 })
            .resize(w, null, { fit: 'inside', withoutEnlargement: true })
            .toFile(`./app/assets/pictures/fullbody-ly-${w}w-${i + 1}x.avif`),
        ),
      ),
  ),
);
const webp = Promise.all(
  sizes.map(
    async (ws) =>
      await Promise.all(
        ws.map(async (w, i) =>
          sharp('./app/assets/pictures/fullbody.heic', { unlimited: true })
            .webp({ effort: 6, lossless: true })
            .resize(w, null, { fit: 'inside', withoutEnlargement: true })
            .toFile(`./app/assets/pictures/fullbody-ll-${w}w-${i + 1}x.webp`),
        ),
      ),
  ),
);
const webpLossy = Promise.all(
  sizes.map(
    async (ws) =>
      await Promise.all(
        ws.map(async (w, i) =>
          sharp('./app/assets/pictures/fullbody.heic', { unlimited: true })
            .webp({ effort: 6, quality: 80 })
            .resize(w, null, { fit: 'inside', withoutEnlargement: true })
            .toFile(`./app/assets/pictures/fullbody-ly-${w}w-${i + 1}x.webp`),
        ),
      ),
  ),
);

const png = Promise.all(
  sizes.map(
    async (ws) =>
      await Promise.all(
        ws.map(async (w, i) =>
          sharp('./app/assets/pictures/fullbody.heic', { unlimited: true })
            .png({ effort: 9, compressionLevel: 9 })
            .resize(w, null, { fit: 'inside', withoutEnlargement: true })
            .toFile(`./app/assets/pictures/fullbody-ll-${w}w-${i + 1}x.png`),
        ),
      ),
  ),
);
const results = await Promise.all([avif, webp, avifLossy, webpLossy, png]);
console.log('avid', results[0]);
console.log('webp', results[1]);
console.log('avidLossy', results[2]);
console.log('webpLossy', results[3]);
console.log('png', results[4]);
export {};


