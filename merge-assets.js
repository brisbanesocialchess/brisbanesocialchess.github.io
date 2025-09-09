import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const deployDir = path.resolve('./_deploy/assets');
const cssDir = path.join(deployDir, 'styles');
const jsDir = path.join(deployDir, 'scripts');
const mergedCssFile = path.join(cssDir, 'bundle.css');
const mergedJsFile = path.join(jsDir, 'bundle.js');

// --- Merge CSS ---
const cssFiles = globSync(`${cssDir}/*.css`).filter(f => f !== mergedCssFile);

let mergedCss = '';
cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  mergedCss += content;
});

fs.writeFileSync(mergedCssFile, mergedCss, 'utf-8');
console.log(`✅ Merged ${cssFiles.length} CSS files into ${mergedCssFile}`);

// --- Merge JS ---
const jsFiles = globSync(`${jsDir}/*.js`).filter(f => f !== mergedJsFile);

let mergedJs = '';
jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  mergedJs += content;
});

fs.writeFileSync(mergedJsFile, mergedJs, 'utf-8');
console.log(`✅ Merged ${jsFiles.length} JS files into ${mergedJsFile}`);
