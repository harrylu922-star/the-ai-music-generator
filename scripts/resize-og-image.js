#!/usr/bin/env node
/**
 * 将 OG 图裁切为 1200×630 并覆盖原文件。
 * 用法：node scripts/resize-og-image.js
 */

const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OG_PATH = path.join(ROOT, "public", "images", "home", "hero-card-ai-music-generator.jpg");
const WIDTH = 1200;
const HEIGHT = 630;

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error(
      "[resize-og-image] 需要 sharp。请运行：npm install -D sharp\n" + e.message
    );
    process.exit(1);
  }

  if (!fs.existsSync(OG_PATH)) {
    console.error("[resize-og-image] 文件不存在：", OG_PATH);
    process.exit(1);
  }

  const tempPath = OG_PATH + ".tmp." + Date.now();
  try {
    await sharp(OG_PATH)
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "center" })
      .jpeg({ quality: 88 })
      .toFile(tempPath);
    fs.renameSync(tempPath, OG_PATH);
    console.log(
      `[resize-og-image] 已裁切并替换：public/images/home/hero-card-ai-music-generator.jpg → ${WIDTH}×${HEIGHT}`
    );
  } catch (e) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error("[resize-og-image]", e.message);
    process.exit(1);
  }
}

main();
