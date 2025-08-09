<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Developer Help: Running the Website Locally](#developer-help-running-the-website-locally)
  - [1. Install Node.js](#1-install-nodejs)
  - [2. Install Project Dependencies](#2-install-project-dependencies)
  - [3. Start the Development Server (with Watching)](#3-start-the-development-server-with-watching)
  - [4. Build the Site Once (Production Build)](#4-build-the-site-once-production-build)
  - [Before Submitting a Pull Request](#before-submitting-a-pull-request)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Developer Help: Running the Website Locally

Welcome! If you are new to this project, here is how to get started as a developer:

## 1. Install Node.js

You need [Node.js](https://nodejs.org/) (version 16 or higher). Download and install it if you don't have it already.

## 2. Install Project Dependencies

In your terminal, run:

```bash
npm install
```

This will install all required packages.

## 3. Start the Development Server (with Watching)

To develop and see your changes live, run:

```bash
npm run start
```

This starts a local server and enables "watching mode"—any changes you make will automatically rebuild and reload the site in your browser.

## 4. Build the Site Once (Production Build)

To generate the static site files for deployment, run:

```bash
npm run build
```

This runs Eleventy once and outputs the final static website. No server or watching is started.

---

**Summary:**

- Use `npm run start` for development (with live reload and watching for changes).
- Use `npm run build` for a one-time build (no watching, for production or deployment).

This project uses [Eleventy (11ty)](https://www.11ty.dev/) as the static site generator. For more details, see the [README.md](README.md#local-development) or the [Eleventy documentation](https://www.11ty.dev/docs/).

## Before Submitting a Pull Request

Before submitting a pull request, make sure to run these commands to fix any formatting or linting issues:

```bash
# Fix formatting issues
npm run format
npx dprint fmt --allow-no-files

# Run all pre-commit checks
python -m pre_commit run --all-files

# Or run specific hooks only (examples):
python -m pre_commit run prettier        # Run only prettier formatting
python -m pre_commit run eslint          # Run only ESLint checks
python -m pre_commit run markdownlint    # Run only Markdown linting
python -m pre_commit run yamllint        # Run only YAML linting
```

**Note:** If you don't have pre-commit installed, install it first:

```bash
pip install pre-commit
```

These checks ensure your code follows the project's style guidelines and passes all automated tests.
