import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface AgreementRecord {
  id: string;
  email: string;
  document: "content-license" | "terms" | "privacy";
  documentVersion: string;
  agreedAt: string; // ISO 8601
}

const DATA_DIR = path.join(process.cwd(), "data");
const AGREEMENTS_FILE = path.join(DATA_DIR, "agreements.json");

async function loadAgreements(): Promise<AgreementRecord[]> {
  try {
    const raw = await readFile(AGREEMENTS_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getAgreements(email?: string): Promise<AgreementRecord[]> {
  const list = await loadAgreements();
  if (email) {
    return list.filter((a) => a.email.toLowerCase() === email.toLowerCase());
  }
  return list;
}

export async function addAgreement(
  email: string,
  document: AgreementRecord["document"],
  documentVersion: string
): Promise<AgreementRecord> {
  const list = await loadAgreements();
  const id = `agr_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const record: AgreementRecord = {
    id,
    email: email.trim().toLowerCase(),
    document,
    documentVersion,
    agreedAt: new Date().toISOString(),
  };
  list.push(record);
  await writeFile(AGREEMENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
  return record;
}
