import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUNDLE, SOURCES, buildBundle, parseTokens } from '../scripts/build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
const dark = parseTokens(':root');
const lightOverrides = parseTokens('[data-theme="light"]');
const light = new Map([...dark, ...lightOverrides]);

test('bundle is up to date', () => {
  assert.equal(read(BUNDLE), buildBundle(), `${BUNDLE} is stale: run npm run build`);
});

test('every var(--*) used by the layers is defined in tokens.css', () => {
  for (const file of SOURCES) {
    for (const [, name] of read(file).matchAll(/var\((--[a-z0-9-]+)/g)) {
      assert.ok(dark.has(name), `${file} uses undefined token ${name}`);
    }
  }
});

test('the light theme only overrides existing tokens', () => {
  for (const name of lightOverrides.keys()) assert.ok(dark.has(name), `light theme adds unknown token ${name}`);
});

test('colours live only in tokens.css', () => {
  for (const file of SOURCES.filter((f) => f !== 'tokens.css')) {
    const hits = read(file).replace(/\/\*[\s\S]*?\*\//g, '').match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g);
    assert.equal(hits, null, `${file} has literal colours: ${hits}`);
  }
});

// WCAG 2.x relative luminance contrast.
function luminance(hex) {
  let n = hex.replace('#', '');
  if (n.length === 3) n = [...n].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}
export function contrast(theme, fg, bg) {
  const [a, b] = [luminance(theme.get(fg)), luminance(theme.get(bg))].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// [theme name, foreground, background, minimum ratio]
export const PAIRS = [
  ['dark', '--text', '--bg', 7],
  ['dark', '--text2', '--card', 7],
  ['dark', '--text-muted', '--bg', 4.5],
  ['dark', '--on-green', '--green', 7],
  ['dark', '--on-yellow', '--yellow', 7],
  ['dark', '--on-cyan', '--cyan', 7],
  ['dark', '--on-red', '--red', 4.5],
  ['dark', '--ok-text', '--bg', 7],
  ['dark', '--warn-text', '--bg', 7],
  ['dark', '--danger-text', '--bg', 7],
  ['dark', '--info-text', '--bg', 7],
  ['light', '--text', '--bg', 7],
  ['light', '--text2', '--card', 7],
  ['light', '--text-muted', '--surface', 4.5],
  ['light', '--on-green', '--green', 7],
  ['light', '--ok-text', '--surface', 4.5],
  ['light', '--warn-text', '--surface', 4.5],
  ['light', '--danger-text', '--surface', 4.5],
  ['light', '--info-text', '--surface', 4.5],
];
const THEMES = { dark, light };

test('documented text pairs meet their WCAG level', () => {
  for (const [theme, fg, bg, min] of PAIRS) {
    const ratio = contrast(THEMES[theme], fg, bg);
    assert.ok(ratio >= min, `${theme}: ${fg} on ${bg} = ${ratio.toFixed(2)} < ${min}`);
  }
});

test('README contrast table matches the tokens', () => {
  const readme = read('README.md');
  for (const [theme, fg, bg] of PAIRS) {
    const row = readme.split('\n').find((l) => l.includes(`| ${theme} |`) && l.includes(`\`${fg}\``) && l.includes(`\`${bg}\``));
    assert.ok(row, `README has no ${theme} contrast row for ${fg} on ${bg}`);
    assert.ok(row.includes(`${contrast(THEMES[theme], fg, bg).toFixed(2)}:1`), `README ratio for ${theme} ${fg} on ${bg} is outdated`);
  }
});
