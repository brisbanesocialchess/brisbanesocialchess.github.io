import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { minify } from 'html-minifier-terser';

const srcFolder = path.resolve('./_site');
const destFolder = path.resolve('./_deploy');

const files = globSync(`${srcFolder}/**/*.html`);
console.log('HTML files found:', files);

async function copyAndMinify() {
  for (const file of files) {
    const relativePath = path.relative(srcFolder, file);
    const destPath = path.join(destFolder, relativePath);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    const content = fs.readFileSync(file, 'utf-8');

    const minified = await minify(content, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      useShortDoctype: true,
      minifyJS: true,
      minifyCSS: true,
    });

    fs.writeFileSync(destPath, minified, 'utf-8');
  }

  console.log(`${files.length} HTML files copied and minified to _deploy.`);
}

copyAndMinify();
