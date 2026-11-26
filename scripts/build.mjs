import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

// The production output is the same progressively enhanced HTML/CSS/JS.
// There is no runtime framework, dependency installation, or transpilation.
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
async function bytes(directory) {
  let total = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    total += entry.isDirectory() ? await bytes(path) : (await stat(path)).size;
  }
  return total;
}
console.log(`Built dist/ (${await bytes('dist')} uncompressed bytes).`);
