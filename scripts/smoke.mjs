import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:5173';
const checks = [
  ['/', 200, 'text/html'],
  ...['index', 'about', 'research', 'team', 'news-events', 'publications', 'get-involved', 'application-202526', 'contact'].map(page => [`/${page}.html`, 200, 'text/html']),
  ['/styles.css', 200, 'text/css'],
  ['/main.js', 200, 'text/javascript'],
  ['/assets/aau-official-logo.png', 200, 'image/png'],
  ['/missing-page', 404],
  ['/README.md', 404],
  ['/.git/config', 404],
  ['/%2e%2e/README.md', 404],
];
for (const [path, status, type] of checks) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, status, `${path}: unexpected status`);
  if (type) assert.ok(response.headers.get('content-type')?.startsWith(type), `${path}: wrong MIME type`);
  console.log(`PASS ${path}: ${response.status}${type ? ` (${type})` : ''}`);
}
const head = await fetch(base, { method: 'HEAD' });
assert.equal(head.status, 200);
assert.equal(await head.text(), '');
console.log('PASS HEAD /: 200, no body');
const post = await fetch(base, { method: 'POST' });
assert.equal(post.status, 405);
assert.equal(post.headers.get('allow'), 'GET, HEAD');
console.log('PASS POST /: 405, allowed methods advertised');
console.log('19 HTTP smoke checks passed. These are local delivery checks, not a production security audit.');
