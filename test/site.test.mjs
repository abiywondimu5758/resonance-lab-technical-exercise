import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
const pages = (await readdir('public')).filter(name => name.endsWith('.html'));
const documents = new Map(await Promise.all(pages.map(async name => [name, await readFile(`public/${name}`, 'utf8')])));
test('all nine redesigned pages have local navigation, valid destinations and one main heading', async () => {
 assert.equal(pages.length, 9);
 for (const [name, html] of documents) {
  assert.equal((html.match(/<h1\b/g)||[]).length, 1, name);
  assert.equal((html.match(/<main\b/g)||[]).length, 1, name);
  assert.doesNotMatch(html, /sites\.google\.com|forms\.gle|onclick=|<iframe|<script[^>]*https:/,name);
  assert.doesNotMatch(html, /[↗→]|title goes here|author name goes here|XXX XXX/,name);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`duplicate id: ${name}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
   const href=match[1];if(href.startsWith('mailto:')) continue;
   assert.ok(!/^https?:/.test(href),`${name}: external ${href}`);
   const [file,fragment]=href.split('#');
   const target=file||name;assert.ok((await stat(resolve('public',target))).isFile(),`${name}: missing ${target}`);
   if(fragment)assert.match(documents.get(target),new RegExp(`id="${fragment}"`),`${name}: missing ${href}`);
  }
 }
});
test('real team data stays present and all visual placeholders are disclosed', () => {
 const team=documents.get('team.html');
 for(const name of ['Dr. Fitsum Assamnew','Dr. Bisrat Derebssa','Dr. Beakal Gizachew','Dr. Henock Mulugeta','Dr. Elefelious Getachew','Lea Mehari'])assert.ok(team.includes(name),name);
 for(const [name,html] of documents)assert.match(html,/Image placeholder/,name);
 assert.match(documents.get('publications.html'),/rather than verified records/);
 assert.match(documents.get('application-202526.html'),/Previous cycle/);
});
