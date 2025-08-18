#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to recursively find markdown files
function findMarkdownFiles(dir, excludePaths = []) {
  let results = [];
  
  if (excludePaths.some(excludePath => dir.includes(excludePath))) {
    return results;
  }
  
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat && stat.isDirectory()) {
        // Skip excluded directories
        if (!excludePaths.some(excludePath => filePath.includes(excludePath))) {
          results = results.concat(findMarkdownFiles(filePath, excludePaths));
        }
      } else if (file.endsWith('.md')) {
        results.push(filePath);
      }
    });
  } catch (err) {
    // Skip directories we can't read
  }
  
  return results;
}

// Find all markdown files, excluding node_modules and .git
const excludePaths = ['node_modules', '.git'];
const markdownFiles = findMarkdownFiles('.', excludePaths);

if (markdownFiles.length === 0) {
  console.log('No markdown files found.');
  process.exit(0);
}

// Check if verbose flag is passed
const verbose = process.argv.includes('--verbose');
const verboseFlag = verbose ? '--verbose' : '';

// Validate paths and run markdown-link-check for each file without using a shell
const { execFileSync } = require('child_process');

function isSafePath(p) {
  // reject null bytes or multiline input
  if (typeof p !== 'string' || p.includes('\u0000') || /[\n\r]/.test(p)) return false;
  const resolved = path.resolve(p);
  const cwd = path.resolve(process.cwd());
  // Ensure path is inside the repository working directory
  if (!resolved.startsWith(cwd)) return false;
  return true;
}

console.log(`Checking ${markdownFiles.length} markdown files...`);
if (verbose) console.log('Files to check:', markdownFiles);

let hadError = false;
for (const file of markdownFiles) {
  if (!isSafePath(file)) {
    console.error('Skipping unsafe path:', file);
    hadError = true;
    continue;
  }

  const args = ['markdown-link-check', '--config', '.markdown-link-check.json'];
  if (verbose) args.push('--verbose');
  args.push(file);

  try {
    // execFileSync avoids a shell and passes args directly to the program
    execFileSync('npx', args, { stdio: 'inherit' });
  } catch (err) {
    // Keep going to check other files but remember we had an error
    hadError = true;
  }
}

if (hadError) {
  console.error('❌ Link check failed!');
  process.exit(1);
} else {
  console.log('✅ Link check completed successfully!');
}
