/**
 * 图片优化脚本：缩小体积、生成合适尺寸，便于 Lighthouse 测速通过
 * - 图标：tamg-icon2.png 等缩为 72x72（显示 36px）并输出 WebP
 * - 首页/封面图：最大宽 1920px，质量 85，可选输出 WebP
 *
 * 运行：node scripts/optimize-images.js
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PUBLIC = path.join(__dirname, "..", "public", "images");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 82;

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function optimizeIcon(name, size = 72) {
  const inputPath = path.join(PUBLIC, `${name}.png`);
  if (!fs.existsSync(inputPath)) {
    console.warn(`[optimize-images] Skip (not found): ${inputPath}`);
    return;
  }
  const outBase = path.join(PUBLIC, `${name}-${size}`);
  const s = sharp(inputPath).resize(size, size);
  await s.clone().webp({ quality: WEBP_QUALITY }).toFile(`${outBase}.webp`);
  await s.clone().png({ compressionLevel: 6 }).toFile(`${outBase}.png`);
  console.log(`[optimize-images] Icon: ${name}.png -> ${name}-${size}.webp + ${name}-${size}.png`);
}

async function optimizeJpeg(dir, maxWidth = MAX_WIDTH) {
  const dirPath = path.join(PUBLIC, dir);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter((f) => /\.(jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const inputPath = path.join(dirPath, file);
    const meta = await sharp(inputPath).metadata();
    const w = meta.width || 0;
    if (w <= maxWidth && w > 0) {
      console.log(`[optimize-images] Skip (already narrow): ${dir}/${file}`);
      continue;
    }
    const base = path.basename(file, path.extname(file));
    const outPath = path.join(dirPath, `${base}.jpg`);
    await sharp(inputPath)
      .resize(maxWidth, null, { withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(outPath);
    console.log(`[optimize-images] Resized: ${dir}/${file} -> max ${maxWidth}px`);
  }
}

async function main() {
  console.log("[optimize-images] Start…\n");

  await ensureDir(PUBLIC);

  // 1. 图标：36px 显示用 72px 图即可，大幅减小体积
  await optimizeIcon("tamg-icon2", 72);
  await optimizeIcon("tamg-icon", 72);
  await optimizeIcon("tamg-logo", 72);

  // 2. 首页与封面图：限制最大宽度
  await optimizeJpeg("home");
  await optimizeJpeg("covers");

  console.log("\n[optimize-images] Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
