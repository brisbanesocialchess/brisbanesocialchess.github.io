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

// Build command
const cmd = `npx markdown-link-check --config .markdown-link-check.json ${verboseFlag} ${markdownFiles.join(' ')}`;

console.log(`Checking ${markdownFiles.length} markdown files...`);
if (verbose) {
  console.log('Files to check:', markdownFiles);
}

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('✅ Link check completed successfully!');
} catch (error) {
  console.error('❌ Link check failed!');
  process.exit(1);
}
