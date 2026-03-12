/**
 * 图片优化脚本：移动端性能（LCP/带宽）
 * - 图标：72px WebP+PNG
 * - home/*.jpg → WebP 最大宽 960px，质量 78；hero-card 额外生成 640w 供 srcset
 * - covers/*.jpg → WebP 最大宽 640px，质量 78；并为 sample-* 封面生成 400w 供 srcset
 * - 构建时校验 hero-card*.webp 单文件 ≤100 KiB，避免误部署大图
 * 运行：node scripts/optimize-images.js
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PUBLIC = path.join(__dirname, "..", "public", "images");
const WEBP_QUALITY = 78;
const WEBP_QUALITY_ICON = 82;
const MAX_HERO_WEBP_KIB = 100;

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

/** 将目录下所有 jpg 转为 WebP，限制最大宽 */
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

/** 为首页 hero 卡生成 640w 版本，供 srcset 移动端小图 */
const HERO_BASES = ["hero-card-ai-music-generator", "hero-card-ai-lyrics-generator", "hero-card-ai-music-tools"];
async function generateHero640Variants() {
  const dirPath = path.join(PUBLIC, "home");
  if (!fs.existsSync(dirPath)) return;
  for (const base of HERO_BASES) {
    const jpgPath = path.join(dirPath, `${base}.jpg`);
    if (!fs.existsSync(jpgPath)) continue;
    const outPath = path.join(dirPath, `${base}-640.webp`);
    await sharp(jpgPath)
      .resize(640, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`[optimize-images] home/${base}-640.webp (640w, ${(stat.size / 1024).toFixed(0)} KiB)`);
  }
}

/** 校验 hero-card*.webp 不超过 MAX_HERO_WEBP_KIB，防止误部署旧大图 */
function assertHeroCardSizes() {
  const dirPath = path.join(PUBLIC, "home");
  for (const base of HERO_BASES) {
    const webpPath = path.join(dirPath, `${base}.webp`);
    if (!fs.existsSync(webpPath)) continue;
    const stat = fs.statSync(webpPath);
    const kib = stat.size / 1024;
    if (kib > MAX_HERO_WEBP_KIB) {
      console.error(`[optimize-images] ERROR: ${base}.webp is ${kib.toFixed(0)} KiB (max ${MAX_HERO_WEBP_KIB} KiB). Deploy would serve a large file and hurt LCP.`);
      process.exit(1);
    }
  }
}

/** 为 sample 封面生成 400w 版本，供首页 HomeSampleTracks srcset 减少移动端下载（PageSpeed Improve image delivery） */
const COVER_BASES = ["sample-cinematic", "sample-lofi", "sample-loop", "sample-social", "sample-documentary", "sample-vlog", "sample-rnb", "sample-ambient"];
async function generateCover400Variants() {
  const dirPath = path.join(PUBLIC, "covers");
  if (!fs.existsSync(dirPath)) return;
  for (const base of COVER_BASES) {
    const webpPath = path.join(dirPath, `${base}.webp`);
    if (!fs.existsSync(webpPath)) continue;
    const outPath = path.join(dirPath, `${base}-400.webp`);
    await sharp(webpPath)
      .resize(400, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`[optimize-images] covers/${base}-400.webp (400w, ${(stat.size / 1024).toFixed(0)} KiB)`);
  }
}

async function main() {
  console.log("[optimize-images] Start (mobile-first WebP)…\n");
  await ensureDir(PUBLIC);

  await optimizeIcon("tamg-icon2", 72);
  await optimizeIcon("tamg-icon", 72);
  await optimizeIcon("tamg-logo", 72);

  await convertDirToWebP("home", 960);
  await generateHero640Variants();
  assertHeroCardSizes();

  await convertDirToWebP("covers", 640);
  await generateCover400Variants();

  console.log("\n[optimize-images] Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
