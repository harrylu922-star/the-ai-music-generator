/**
 * 图片优化脚本：移动端性能（LCP/带宽）
 * - 图标：72px WebP+PNG
 * - home/*.jpg → WebP 最大宽 960px（移动端友好），质量 78
 * - covers/*.jpg → WebP 最大宽 640px（网格小图），质量 78
 * 运行：node scripts/optimize-images.js
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PUBLIC = path.join(__dirname, "..", "public", "images");
const WEBP_QUALITY = 78;
const WEBP_QUALITY_ICON = 82;

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
  await s.clone().webp({ quality: WEBP_QUALITY_ICON }).toFile(`${outBase}.webp`);
  await s.clone().png({ compressionLevel: 6 }).toFile(`${outBase}.png`);
  console.log(`[optimize-images] Icon: ${name}.png -> ${name}-${size}.webp + .png`);
}

/** 将目录下所有 jpg 转为 WebP，限制最大宽，供移动端与桌面共用单文件 */
async function convertDirToWebP(dir, maxWidth) {
  const dirPath = path.join(PUBLIC, dir);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter((f) => /\.(jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const inputPath = path.join(dirPath, file);
    const base = path.basename(file, path.extname(file));
    const outPath = path.join(dirPath, `${base}.webp`);
    await sharp(inputPath)
      .resize(maxWidth, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`[optimize-images] ${dir}/${base}.webp (max ${maxWidth}px, ${(stat.size / 1024).toFixed(0)} KiB)`);
  }
}

async function main() {
  console.log("[optimize-images] Start (mobile-first WebP)…\n");
  await ensureDir(PUBLIC);

  await optimizeIcon("tamg-icon2", 72);
  await optimizeIcon("tamg-icon", 72);
  await optimizeIcon("tamg-logo", 72);

  // 首页大图：最大 960px，单文件即可显著减小体积
  await convertDirToWebP("home", 960);
  // 封面小图：最大 640px（网格 50vw/25vw）
  await convertDirToWebP("covers", 640);

  console.log("\n[optimize-images] Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
