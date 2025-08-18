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

# Alternatively, run the CLI directly against the repo root
npx markdown-link-check --config .markdown-link-check.json .
```

### What Gets Checked

The link checker scans all `.md` files in the repository, excluding:
- `node_modules/` directory
- `.git/` directory

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

The configuration lives in `.markdown-link-check.json`. For convenience, the current content is:

```json
{
  "ignorePatterns": [
    {"pattern": "^http://localhost"},
    {"pattern": "^https://localhost"},
    {"pattern": "^#%"},
    {"pattern": "^mailto:"}
  ],
  "replacementPatterns": [
    {
      "pattern": "^/",
      "replacement": "https://brisbanesocialchess.github.io/"
    }
  ],
  "httpHeaders": [
    {
      "urls": ["https://github.com"],
      "headers": {
        "Accept": "text/html",
        "User-Agent": "Mozilla/5.0"
      }
    }
  ],
  "aliveStatusCodes": [200, 206, 429],
  "timeout": "15s",
  "retryOn429": true,
  "retryCount": 3,
  "fallbackRetryDelay": "30s"
}
```

## Contributing

When adding new markdown files or links:

1. Run the link checker locally
2. Fix any broken links
3. Ensure relative links use the correct format
4. Test that anchor links point to existing headings 