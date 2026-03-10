#!/usr/bin/env node
/**
 * 构建前校验：确保默认 OG 图存在且尺寸为 1200×630，避免分享/爬虫 404。
 * 用法：node scripts/verify-og-image.js 或 npm run verify:og
 * 可在 CI 或 prebuild 中运行。
 */

const fs = require("fs");
const path = require("path");
const { imageSize } = require("image-size");

const ROOT = path.resolve(__dirname, "..");
const OG_PATH = path.join(ROOT, "public", "images", "home", "hero-card-ai-music-generator.jpg");
const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 630;
/** 设为 "0" 或 "false" 时只校验文件存在，不校验尺寸（便于过渡期） */
const CHECK_DIMENSIONS = process.env.VERIFY_OG_DIMENSIONS !== "0" && process.env.VERIFY_OG_DIMENSIONS !== "false";

function main() {
  if (!fs.existsSync(OG_PATH)) {
    console.error(
      `[verify-og-image] 缺少 OG 图文件，分享/爬虫可能 404。\n` +
        `请确保存在：public/images/home/hero-card-ai-music-generator.jpg`
    );
    process.exit(1);
  }

  let dims;
  try {
    dims = imageSize(fs.readFileSync(OG_PATH));
  } catch (e) {
    console.error(
      `[verify-og-image] 无法读取图片尺寸：${e.message}\n文件：${OG_PATH}`
    );
    process.exit(1);
  }
  if (!dims || !dims.width || !dims.height) {
    console.error(
      `[verify-og-image] 无法解析图片尺寸，请确认是支持的图片格式（如 JPEG/PNG）：${OG_PATH}`
    );
    process.exit(1);
  }

  if (CHECK_DIMENSIONS && (dims.width !== EXPECTED_WIDTH || dims.height !== EXPECTED_HEIGHT)) {
    console.error(
      `[verify-og-image] OG 图尺寸应为 ${EXPECTED_WIDTH}×${EXPECTED_HEIGHT}（社交分享推荐），当前为 ${dims.width}×${dims.height}。\n` +
        `文件：${OG_PATH}\n` +
        `临时跳过尺寸校验：VERIFY_OG_DIMENSIONS=0 node scripts/verify-og-image.js`
    );
    process.exit(1);
  }

  const dimNote = CHECK_DIMENSIONS
    ? ` ${dims.width}×${dims.height}`
    : ` ${dims.width}×${dims.height}（未校验是否 ${EXPECTED_WIDTH}×${EXPECTED_HEIGHT}）`;
  console.log(
    `[verify-og-image] OK: public/images/home/hero-card-ai-music-generator.jpg${dimNote}`
  );
}

main();
