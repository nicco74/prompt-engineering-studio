/**
 * Build-time message key parity validation.
 *
 * Recursively compares en.json and no.json to ensure every key present in
 * one file is also present in the other. Exits with a non-zero code if
 * any mismatch is found, preventing the build from proceeding.
 *
 * Run with: npx tsx src/i18n/validate-messages.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";

type MessageObject = Record<string, unknown>;

function getKeys(obj: MessageObject, prefix = ""): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...getKeys(value as MessageObject, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

function main() {
  const root = resolve(__dirname, "../../messages");

  const enPath = resolve(root, "en.json");
  const noPath = resolve(root, "no.json");

  const en: MessageObject = JSON.parse(readFileSync(enPath, "utf-8"));
  const no: MessageObject = JSON.parse(readFileSync(noPath, "utf-8"));

  const enKeys = new Set(getKeys(en));
  const noKeys = new Set(getKeys(no));

  const missingInNo: string[] = [];
  const missingInEn: string[] = [];

  for (const key of enKeys) {
    if (!noKeys.has(key)) {
      missingInNo.push(key);
    }
  }

  for (const key of noKeys) {
    if (!enKeys.has(key)) {
      missingInEn.push(key);
    }
  }

  console.log("=== Message Key Parity Validation ===\n");
  console.log(`English keys: ${enKeys.size}`);
  console.log(`Norwegian keys: ${noKeys.size}`);

  let hasErrors = false;

  if (missingInNo.length > 0) {
    hasErrors = true;
    console.error(
      `\nERROR: ${missingInNo.length} key(s) present in en.json but missing from no.json:`
    );
    for (const key of missingInNo) {
      console.error(`  - ${key}`);
    }
  }

  if (missingInEn.length > 0) {
    hasErrors = true;
    console.error(
      `\nERROR: ${missingInEn.length} key(s) present in no.json but missing from en.json:`
    );
    for (const key of missingInEn) {
      console.error(`  - ${key}`);
    }
  }

  if (hasErrors) {
    console.error("\nMessage key parity validation FAILED.");
    process.exit(1);
  }

  console.log("\n=== All message keys match between en.json and no.json ===");
}

main();
