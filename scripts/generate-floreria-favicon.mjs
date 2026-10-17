import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SOURCE_IMAGE = "C:/Users/Sofia/.gemini/antigravity/brain/e9ac385e-6970-4d90-94b4-f00adc109e94/.user_uploaded/media_1792200401824.jpg";

async function main() {
  console.log("🌿 Generando icono circular de la florería y favicons optimizados...");

  const size = 744;
  const left = 139;
  const top = 140;
  const r = size / 2; // 372

  // Máscara circular con anti-aliasing exacto
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${r}" cy="${r}" r="369" fill="#ffffff" />
    </svg>`
  );

  // Generar imagen base circular con esquinas transparentes
  const circularMaster = await sharp(SOURCE_IMAGE)
    .extract({ left, top, width: size, height: size })
    .ensureAlpha()
    .composite([
      {
        input: circleMask,
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const publicDir = path.join(projectRoot, "public");
  const appDir = path.join(projectRoot, "src", "app");

  // 1. Guardar master circular en public
  await fs.writeFile(path.join(publicDir, "logo.png"), circularMaster);
  
  // Guardar logo.jpg con fondo dark green para compatibilidad
  await sharp(circularMaster)
    .flatten({ background: "#01410d" })
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, "logo.jpg"));
  console.log("✅ public/logo.png y public/logo.jpg actualizados con el isotipo circular");

  // 2. Generar SVG wrapper embebido en alta resolución para navegadores modernos
  const base64Png = circularMaster.toString("base64");
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <image width="${size}" height="${size}" href="data:image/png;base64,${base64Png}"/>
</svg>`;
  await fs.writeFile(path.join(publicDir, "favicon.svg"), svgFavicon, "utf-8");
  console.log("✅ public/favicon.svg generado");

  // 3. Generar variantes PNG en todas las resoluciones estándar
  const p16 = await sharp(circularMaster).resize(16, 16).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "favicon-16x16.png"), p16);

  const p32 = await sharp(circularMaster).resize(32, 32).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "favicon-32x32.png"), p32);
  await fs.writeFile(path.join(appDir, "icon.png"), p32);

  const p48 = await sharp(circularMaster).resize(48, 48).ensureAlpha().png().toBuffer();

  const p180 = await sharp(circularMaster).resize(180, 180).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "apple-touch-icon.png"), p180);
  await fs.writeFile(path.join(appDir, "apple-icon.png"), p180);

  const p192 = await sharp(circularMaster).resize(192, 192).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "android-chrome-192x192.png"), p192);

  const p512 = await sharp(circularMaster).resize(512, 512).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "android-chrome-512x512.png"), p512);

  console.log("✅ PNGs generados en 16x16, 32x32, 48x48, 180x180, 192x192 y 512x512");

  // 4. Generar archivo multi-icono .ico estándar con RGBA (16, 32, 48)
  const images = [
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ];

  const headerLen = 6;
  const dirEntryLen = 16;
  let offset = headerLen + dirEntryLen * images.length;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type ico
  header.writeUInt16LE(images.length, 4);

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)]);

  await fs.writeFile(path.join(appDir, "favicon.ico"), icoBuffer);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("✅ src/app/favicon.ico y public/favicon.ico generados");

  console.log("\n🎉 Generación completada con éxito!");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
