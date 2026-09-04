// Fails CI if any locale file is missing a key that exists in the Spanish
// reference file (es.json). Spanish is the reference because the app launches
// in the Basque Country with Spanish as the region default — see LocaleService.
//
// This is deliberately a flat key-existence check, not a translation-quality
// check. It exists to catch "forgot to add the key to eu.json" before merge,
// not to validate translation accuracy.

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const localesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "locales",
);

const REFERENCE_LOCALE = "es.json";

function flattenKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flattenKeys(value, fullKey);
    }
    return [fullKey];
  });
}

function loadKeys(fileName) {
  const raw = readFileSync(path.join(localesDir, fileName), "utf-8");
  return new Set(flattenKeys(JSON.parse(raw)));
}

const referenceKeys = loadKeys(REFERENCE_LOCALE);
const localeFiles = readdirSync(localesDir).filter(
  (f) => f.endsWith(".json") && f !== REFERENCE_LOCALE,
);

let hasMissing = false;

for (const file of localeFiles) {
  const keys = loadKeys(file);
  const missing = [...referenceKeys].filter((k) => !keys.has(k));
  if (missing.length > 0) {
    hasMissing = true;
    console.error(`Missing keys in ${file}:\n  ${missing.join("\n  ")}`);
  }
}

if (hasMissing) {
  process.exit(1);
} else {
  console.log(`All locale files have every key present in ${REFERENCE_LOCALE}.`);
}
