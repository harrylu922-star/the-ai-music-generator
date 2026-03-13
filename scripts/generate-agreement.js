/**
 * 后台生成一条用户 agreement 记录并写入 data/agreements.json
 * 用法: node scripts/generate-agreement.js [email]
 * 默认邮箱: yafarovagaliya@gmail.com
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data");
const AGREEMENTS_FILE = path.join(DATA_DIR, "agreements.json");

const email = process.argv[2] || "yafarovagaliya@gmail.com";
const document = "content-license";
const documentVersion = "2025-03-10";

function loadAgreements() {
  try {
    const raw = fs.readFileSync(AGREEMENTS_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const list = loadAgreements();
ensureDataDir();

const id = `agr_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
const record = {
  id,
  email: email.trim().toLowerCase(),
  document,
  documentVersion,
  agreedAt: new Date().toISOString(),
};

list.push(record);
fs.writeFileSync(AGREEMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");

console.log("Agreement generated:");
console.log(JSON.stringify(record, null, 2));
console.log("\nTotal agreements in file:", list.length);
