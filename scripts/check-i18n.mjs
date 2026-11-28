import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HTML_PATH = join(ROOT, 'index.html');
const LOCALES = ['uk', 'en', 'pl', 'ru'];
const UKRAINIAN_LEAK_RE = /[єіїґЄІЇҐ]/;

function loadDictionary(html) {
  const match = html.match(/\/\/ I18N_DICTIONARY_START([\s\S]*?)\/\/ I18N_DICTIONARY_END/);
  if (!match) {
    throw new Error('Could not find I18N_DICTIONARY_START / I18N_DICTIONARY_END markers in index.html');
  }
  const block = match[1].trim().replace(/^const\s+I18N\s*=\s*/, '').replace(/;\s*$/, '');
  return new Function(`return (${block});`)();
}

function main() {
  const html = readFileSync(HTML_PATH, 'utf8');
  const dict = loadDictionary(html);
  const errors = [];

  // 1. Verify exact set of locales
  const actualLocales = Object.keys(dict);
  for (const loc of LOCALES) {
    if (!actualLocales.includes(loc)) errors.push(`Missing locale: ${loc}`);
  }
  for (const loc of actualLocales) {
    if (!LOCALES.includes(loc)) errors.push(`Unexpected locale: ${loc}`);
  }

  if (errors.length === 0) {
    // 2. Verify 100% key parity across all 4 locales and non-empty string values
    const baseKeys = new Set(Object.keys(dict.uk));
    for (const loc of LOCALES) {
      const keys = new Set(Object.keys(dict[loc]));
      for (const k of baseKeys) {
        if (!keys.has(k)) errors.push(`Missing key "${k}" in locale "${loc}"`);
      }
      for (const k of keys) {
        if (!baseKeys.has(k)) errors.push(`Extra key "${k}" in locale "${loc}" (missing in uk)`);
        const val = dict[loc][k];
        if (typeof val !== 'string' || val.trim().length === 0) {
          errors.push(`Empty or non-string value for "${k}" in locale "${loc}"`);
        }
      }
    }

    // 3. Verify every data-i18n* attribute in index.html exists in all 4 locales
    const attrRe = /data-i18n(?:-(?:html|title|aria-label|content|alt))?="([^"]+)"/g;
    const htmlKeys = new Set();
    for (const m of html.matchAll(attrRe)) {
      htmlKeys.add(m[1]);
    }
    for (const k of htmlKeys) {
      for (const loc of LOCALES) {
        if (!Object.prototype.hasOwnProperty.call(dict[loc], k)) {
          errors.push(`HTML attribute references missing key "${k}" in locale "${loc}"`);
        }
      }
    }

    // 4. Verify t('...') calls in inline script exist in all 4 locales
    const callRe = /\bt\(\s*['"]([^'"]+)['"]/g;
    for (const m of html.matchAll(callRe)) {
      const k = m[1];
      for (const loc of LOCALES) {
        if (!Object.prototype.hasOwnProperty.call(dict[loc], k)) {
          errors.push(`Script t('${k}') references missing key in locale "${loc}"`);
        }
      }
    }

    // 5. Verify zero Ukrainian Cyrillic leaks in en, pl, ru
    for (const loc of ['en', 'pl', 'ru']) {
      for (const [k, val] of Object.entries(dict[loc])) {
        const leak = val.match(UKRAINIAN_LEAK_RE);
        if (leak) {
          errors.push(`Ukrainian Cyrillic leak ("${leak[0]}") in ${loc}["${k}"]: ${val}`);
        }
      }
    }

    // 6. Verify hreflang alternates
    for (const hreflang of [...LOCALES, 'x-default']) {
      const re = new RegExp(`<link[^>]+rel="alternate"[^>]+hreflang="${hreflang}"`, 'i');
      if (!re.test(html)) {
        errors.push(`Missing <link rel="alternate" hreflang="${hreflang}"> in index.html`);
      }
    }

    if (errors.length === 0) {
      console.log(`i18n check passed: ${baseKeys.size} keys x ${LOCALES.length} locales, ${htmlKeys.size} HTML bindings, 0 leaks.`);
      return;
    }
  }

  console.error('i18n check FAILED:');
  for (const err of errors) console.error(` - ${err}`);
  process.exit(1);
}

main();
