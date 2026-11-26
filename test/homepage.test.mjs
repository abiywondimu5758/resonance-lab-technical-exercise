import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const html = await readFile('public/index.html', 'utf8');
const css = await readFile('public/styles.css', 'utf8');
const inventory = JSON.parse(await readFile('docs/evidence/source-inventory.json', 'utf8'));
const attributes = name => [...html.matchAll(new RegExp(`\\b${name}="([^"]*)"`, 'g'))].map(match => match[1]);
const ids = attributes('id');
const normalize = text => text.toLowerCase().replace(/&amp;|&/g, 'and').replace(/\s+/g, ' ').trim();

// Source-level regression checks, not a browser renderer or HTML validator.
// Manual browser checks and their limits are documented in docs/VERIFICATION.md.
test('page has language, metadata, landmarks, and an ordered heading outline', () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta\b[^>]*name="viewport"/);
  assert.match(html, /<meta\b(?=[^>]*name="description")(?=[^>]*content="[^"]+")[^>]*>/);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /class="skip-link" href="#main"/);
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
  assert.equal(levels[0], 1);
  levels.forEach((level, index) => {
    if (index) assert.ok(level <= levels[index - 1] + 1, `Heading level skips before heading ${index + 1}`);
  });
});

test('fragment links and ARIA references resolve to unique document IDs', () => {
  assert.equal(ids.length, new Set(ids).size, 'Duplicate ID');
  for (const href of attributes('href').filter(href => href.startsWith('#') && href !== '#')) {
    assert.ok(ids.includes(href.slice(1)), `Missing fragment ${href}`);
  }
  for (const name of ['aria-labelledby', 'aria-controls']) {
    for (const value of attributes(name)) {
      for (const id of value.split(/\s+/)) assert.ok(ids.includes(id), `Missing ${name} ID ${id}`);
    }
  }
});

test('runtime dependencies are local files and the static source stays below 250 KB', async () => {
  const runtime = [...attributes('src'), ...attributes('href').filter(href => /\.(css|svg)$/.test(href))];
  for (const dependency of runtime) {
    assert.ok(!/^(https?:)?\/\//.test(dependency), `External runtime dependency: ${dependency}`);
    assert.ok((await stat(resolve('public', dependency))).isFile(), `Missing asset ${dependency}`);
  }
  assert.doesNotMatch(css, /@import|url\(\s*['"]?https?:/i);
  async function bytes(directory) {
    let total = 0;
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      total += entry.isDirectory() ? await bytes(path) : (await stat(path)).size;
    }
    return total;
  }
  assert.ok(await bytes('public') < 250_000);
});

test('outbound links use only the public lab email', () => {
  const source = 'https://sites.google.com/aait.edu.et/resonance-lab';
  const allowed = new Set([
    source, ...['about', 'research', 'team', 'publications', 'news-events', 'get-involved',
      'get-involved/application-202526', 'contact'].map(path => `${source}/home/${path}`),
    'mailto:resonance@aau.edu.et',
  ]);
  for (const href of attributes('href').filter(href => /^(https?:|mailto:)/.test(href))) {
    assert.ok(allowed.has(href), `Unverified destination: ${href}`);
  }
});

test('all four source research themes are retained without template publication content', () => {
  const sourceThemes = inventory.pages.home.embeds[1].headings
    .filter(heading => heading.level === 'h5').map(heading => normalize(heading.text));
  assert.equal(sourceThemes.length, 4);
  const prototypeHeadings = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)]
    .map(match => normalize(match[1].replace(/<span[^>]*>[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '')));
  for (const theme of sourceThemes) assert.ok(prototypeHeadings.includes(theme), `Missing source theme: ${theme}`);
  assert.doesNotMatch(html, /title goes here|author name goes here|XXX XXX|lorem ipsum/i);
  assert.doesNotMatch(html, /<iframe\b/);
});

test('historical recruitment dates are explicit and no open-call claim is introduced', () => {
  assert.match(html, /Previous cycle/);
  assert.match(html, /datetime="2025-07-28"/);
  assert.match(html, /datetime="2025-08-11"/);
  assert.match(html, /application-202526\.html/);
  assert.doesNotMatch(html, /applications (?:are )?(?:now )?open|apply now/i);
});

function luminance(hex) {
  const channels = hex.replace('#', '').match(/../g).map(channel => parseInt(channel, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}
const token = name => css.match(new RegExp(`--${name}:\\s*(#[a-f0-9]{6})`, 'i'))[1];

test('documented text-color pairs meet 4.5:1 and focus colors meet 3:1', t => {
  const pairs = [
    ['body / paper', token('ink'), token('paper'), 4.5],
    ['muted / paper', token('muted'), token('paper'), 4.5],
    ['muted / white', token('muted'), '#ffffff', 4.5],
    ['muted / sage', token('muted'), token('sage'), 4.5],
    ['links / sage', token('forest'), token('sage'), 4.5],
    ['links / paper', token('forest'), token('paper'), 4.5],
    ['white / primary button', '#ffffff', token('forest'), 4.5],
    ['white / button hover', '#ffffff', '#285447', 4.5],
    ['focus / paper', token('accent'), token('paper'), 3],
    ['focus / sage', token('accent'), token('sage'), 3],
    ['focus / white', token('accent'), '#ffffff', 3],
  ];
  for (const [label, foreground, background, minimum] of pairs) {
    const ratio = contrast(foreground, background);
    t.diagnostic(`${label}: ${ratio.toFixed(2)}:1`);
    assert.ok(ratio >= minimum, `${label} is ${ratio.toFixed(2)}:1; needs ${minimum}:1`);
  }
});
