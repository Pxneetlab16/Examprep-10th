import sharp from "sharp";
import fs from "fs";

const SRC = "./public/logo-examprep.png";

async function main() {
  const buf = fs.readFileSync(SRC);

  for (const size of [192, 512]) {
    await sharp(buf)
      .resize(size, size, { fit: "cover" })
      .png()
      .toFile(`./public/icon-${size}.png`);
    console.log(`icon-${size}.png`);
  }

  for (const size of [192, 512]) {
    const inner = Math.round(size * 0.8);
    const pad = Math.round((size - inner) / 2);
    await sharp(buf)
      .resize(inner, inner, { fit: "cover" })
      .extend({
        top: pad, bottom: pad, left: pad, right: pad,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      })
      .png()
      .toFile(`./public/icon-maskable-${size}.png`);
    console.log(`icon-maskable-${size}.png`);
  }

  await sharp(buf).resize(180, 180, { fit: "cover" }).png().toFile("./public/apple-touch-icon.png");
  console.log("apple-touch-icon.png");

  await sharp(buf).resize(32, 32, { fit: "cover" }).png().toFile("./public/favicon-32.png");
  console.log("favicon-32.png");
}

main().catch((e) => { console.error(e); process.exit(1); });
