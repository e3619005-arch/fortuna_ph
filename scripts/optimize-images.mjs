// Оптимизация фото: originals/*.jpg -> public/
// Запуск: npm run img
//   carph1.jpg  (hero)   -> 1920px ширина, JPEG  q80
//   carph2..9   (тайлы)  ->  900px ширина, WebP  q80
import sharp from "sharp";
import { stat, mkdir } from "node:fs/promises";

const HERO_WIDTH = 1920;
const TILE_WIDTH = 900;
const QUALITY = 80;

const jobs = [
  { src: "carph1.jpg", dst: "carph1.jpg", width: HERO_WIDTH, format: "jpeg" },
  ...[2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    src: `carph${n}.jpg`,
    dst: `carph${n}.webp`,
    width: TILE_WIDTH,
    format: "webp",
  })),
];

const kb = (b) => `${Math.round(b / 1024)} KB`;

await mkdir("public", { recursive: true });

for (const job of jobs) {
  const input = `originals/${job.src}`;
  const output = `public/${job.dst}`;

  let pipeline = sharp(input).resize({ width: job.width, withoutEnlargement: true });
  pipeline = job.format === "webp"
    ? pipeline.webp({ quality: QUALITY })
    : pipeline.jpeg({ quality: QUALITY, mozjpeg: true });

  await pipeline.toFile(output);

  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  console.log(
    `${job.src}  ${kb(before)} -> ${job.dst}  ${kb(after)}  (-${Math.round((1 - after / before) * 100)}%)`
  );
}

console.log("Готово. Не забудь поднять PHOTO_VERSION в photo-version.ts, если менял фото.");
