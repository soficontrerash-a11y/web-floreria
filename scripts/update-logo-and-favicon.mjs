import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SOURCE_IMAGE = "C:/Users/Sofia/.gemini/antigravity/brain/e9ac385e-6970-4d90-94b4-f00adc109e94/.user_uploaded/media_1792200401824.jpg";

async function main() {
  console.log("🌿 Iniciando generación de nuevo Logo y Favicons...");
  console.log("   Origen:", SOURCE_IMAGE);

  const image = sharp(SOURCE_IMAGE);
  const metadata = await image.metadata();
  console.log(`   Dimensiones originales: ${metadata.width}x${metadata.height}`);

  const publicDir = path.join(projectRoot, "public");
  const appDir = path.join(projectRoot, "src", "app");

  // 1. Guardar logo en public/logo.jpg (1024x1024 alta calidad)
  await sharp(SOURCE_IMAGE)
    .resize(1024, 1024)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, "logo.jpg"));
  console.log("✅ public/logo.jpg generado (1024x1024)");

  // 2. Guardar logo en public/logo.png
  await sharp(SOURCE_IMAGE)
    .resize(1024, 1024)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, "logo.png"));
  console.log("✅ public/logo.png generado (1024x1024)");

  // 3. Generar variantes de iconos para favicon y dispositivos
  // 16x16
  const p16 = await sharp(SOURCE_IMAGE).resize(16, 16).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "favicon-16x16.png"), p16);

  // 32x32
  const p32 = await sharp(SOURCE_IMAGE).resize(32, 32).ensureAlpha().png().toBuffer();
  await fs.writeFile(path.join(publicDir, "favicon-32x32.png"), p32);
  await fs.writeFile(path.join(appDir, "icon.png"), p32);

  // 48x48
  const p48 = await sharp(SOURCE_IMAGE).resize(48, 48).ensureAlpha().png().toBuffer();

  // 180x180 Apple Touch Icon
  const p180 = await sharp(SOURCE_IMAGE).resize(180, 180).png().toBuffer();
  await fs.writeFile(path.join(publicDir, "apple-touch-icon.png"), p180);
  await fs.writeFile(path.join(appDir, "apple-icon.png"), p180);

  // 192x192 Android Chrome
  const p192 = await sharp(SOURCE_IMAGE).resize(192, 192).png().toBuffer();
  await fs.writeFile(path.join(publicDir, "android-chrome-192x192.png"), p192);

  // 512x512 Android Chrome / PWA
  const p512 = await sharp(SOURCE_IMAGE).resize(512, 512).png().toBuffer();
  await fs.writeFile(path.join(publicDir, "android-chrome-512x512.png"), p512);

  console.log("✅ PNGs generados para todas las resoluciones (16, 32, 48, 180, 192, 512)");

  // 4. Crear archivo .ico multi-resolución estándar (16, 32, 48)
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

  // Guardar .ico en src/app/favicon.ico y public/favicon.ico
  await fs.writeFile(path.join(appDir, "favicon.ico"), icoBuffer);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("✅ src/app/favicon.ico y public/favicon.ico generados con éxito");

  console.log("\n🎉 Todo el set de logo y favicons fue generado correctamente!");
}

main().catch((err) => {
  console.error("❌ Error generando imágenes:", err);
  process.exit(1);
});
