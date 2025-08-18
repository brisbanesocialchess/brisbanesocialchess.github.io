# Link Checker Documentation

This document explains how the broken link checker works in the Brisbane Social Chess website.

## Overview

The project uses `markdown-link-check` to automatically detect broken links in markdown files. This helps maintain link integrity and provides a better user experience.

## Configuration

The link checker is configured via `.markdown-link-check.json`:

### Key Features

- **Relative Link Conversion**: Links starting with `/` are automatically converted to `https://brisbanesocialchess.github.io/`
- **Ignored Patterns**:
  - Localhost links (`http://localhost`, `https://localhost`)
  - URL-encoded anchor links (`#%...`)
  - Mailto links (`mailto:`)
  - Template syntax (links starting with `{{`)
- **Retry Logic**: Automatically retries on 429 (rate limit) responses
- **Timeout**: 15-second timeout for link checks
- **User-Agent**: Proper headers for GitHub links

## Usage

### Local Development

```bash
# Check all markdown files (cross-platform)
npm run check-links

# Check with verbose output (shows status codes)
npm run check-links-verbose

# Run the CLI directly on specific files
npx markdown-link-check --config .markdown-link-check.json README.md frontend/LINK_CHECKER.md
```

### What Gets Checked

The link checker automatically scans all `.md` files in the repository while excluding:

- `node_modules/` directories (including in packages)
- `.git/` directory
- Any subdirectories within excluded paths

The script uses a Node.js helper (`scripts/check-links.js`) to ensure cross-platform compatibility and proper directory exclusion.

### Link Types Handled

1. **External URLs**: Fully qualified URLs (e.g., `https://github.com`)
2. **Relative Links**: Links starting with `/` (converted to full URLs)
3. **File Links**: Links to other markdown files (e.g., `./README.md`)
4. **Anchor Links**: Internal page anchors (e.g., `#section-name`)
5. **Ignored Links**: Mailto, localhost, and encoded anchors

## GitHub Actions Integration

Two workflows are available:

### 1. Custom Workflow (`.github/workflows/link-check.yml`)

- Runs on pull requests that modify markdown files
- Uses the same configuration as local development
- Comments on PRs when broken links are found
- Provides detailed error information

### 2. Lychee Action (`.github/workflows/link-check-action.yml`)

- Alternative implementation using `lychee-action`
- Simpler setup but less customizable
- Also runs on markdown file changes

## Troubleshooting

### Common Issues

1. **404 Errors on Anchor Links**: Make sure the target heading exists in the file
2. **Rate Limiting**: The checker automatically retries on 429 responses
3. **Timeout Issues**: Increase timeout in configuration if needed

### False Positives

Some links may appear broken but are actually valid:

- **Mailto links**: Intentionally ignored
- **Encoded anchors**: Links with emojis in headings are ignored
- **Local development links**: Localhost URLs are ignored

## Best Practices

1. **Use Relative Links**: For internal pages, use `/page-name` format
2. **Test Locally**: Run `npm run check-links` before committing
3. **Fix Broken Links**: Address any broken links found by the checker
4. **Update Configuration**: Modify `.markdown-link-check.json` if needed

## Configuration Reference

The full configuration is available in `.markdown-link-check.json`. This file controls how the link checker operates, including which patterns to ignore, how to handle relative links, retry logic, and timeout settings.

Key configuration options:

- `ignorePatterns`: Patterns for links to skip (localhost, mailto, encoded anchors)
- `replacementPatterns`: Rules for converting relative links to absolute URLs
- `httpHeaders`: Custom headers for specific domains (like GitHub)
- `aliveStatusCodes`: HTTP status codes considered valid (200, 206, 429)
- `timeout`: How long to wait for responses (15s)
- `retryOn429`: Automatically retry on rate limit responses
- `retryCount`: Number of retry attempts (3)
- `fallbackRetryDelay`: Delay between retries (30s)

## Contributing

When adding new markdown files or links:

1. Run the link checker locally
2. Fix any broken links
3. Ensure relative links use the correct format
4. Test that anchor links point to existing headings
