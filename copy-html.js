import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const srcFolder = path.resolve('./_site');
const destFolder = path.resolve('./_build');

const files = globSync(`${srcFolder}/**/*.html`);
console.log('HTML files found:', files);

files.forEach(file => {
  const relativePath = path.relative(srcFolder, file);
  const destPath = path.join(destFolder, relativePath);

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(file, destPath);
});

console.log(`${files.length} HTML files copied to _build.`);
