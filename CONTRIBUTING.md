<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Developer and Contributing Guide ✨](#developer-and-contributing-guide-)
  - [Getting Started: Your Development Environment](#getting-started-your-development-environment)
    - [1. Install Node.js](#1-install-nodejs)
    - [2. Set Up Python Environment](#2-set-up-python-environment)
    - [3. Set Up dprint for Code Formatting](#3-set-up-dprint-for-code-formatting)
    - [4. Set Up Pre-Commit Hooks](#4-set-up-pre-commit-hooks)
  - [Local Development Workflow](#local-development-workflow)
    - [Running the Main Site (Eleventy)](#running-the-main-site-eleventy)
    - [Building the Documentation (Sphinx)](#building-the-documentation-sphinx)
    - [Cloudflare Workers Development](#cloudflare-workers-development)
    - [Docker Development (Optional)](#docker-development-optional)
  - [How to Contribute](#how-to-contribute)
    - [Step 1: Create an Issue](#step-1-create-an-issue)
    - [Step 2: Fork and Clone the Repository](#step-2-fork-and-clone-the-repository)
    - [Step 3: Create a Branch](#step-3-create-a-branch)
    - [Step 4: Make Your Changes](#step-4-make-your-changes)
    - [Step 5: Run Pre-Submission Checks](#step-5-run-pre-submission-checks)
    - [Step 6: Commit and Push Your Changes](#step-6-commit-and-push-your-changes)
    - [Step 7: Create a Pull Request](#step-7-create-a-pull-request)
  - [Community Support](#community-support)
  - [Appendix: Tools and Platforms We Use](#appendix-tools-and-platforms-we-use)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Developer and Contributing Guide ✨

Welcome to Awesome Social Chess! We appreciate your interest in contributing and are excited to have you. This guide provides everything you need to set up your development environment, run the project locally, and submit your first contribution. All contributions are welcome! 💖

## Getting Started: Your Development Environment

Follow these steps to set up your machine for development.

### 1. Install Node.js

You need Node.js (version 20 LTS or higher). Download and install it from [nodejs.org](https://nodejs.org) if you don't have it already.

### 2. Set Up Python Environment

We use Python for various development scripts and tools.

**Install Python:** Make sure you have Python 3.12 or higher installed. You can check your version with `python --version`.

**(Recommended) Create a Virtual Environment:** This isolates project dependencies and keeps your global Python installation clean.

**Windows:**

```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS/Linux:**

```bash
python -m venv .venv
source .venv/bin/activate
```

**Install Dependencies:** Install all required Python packages for development and pre-commit checks.

```bash
python -m pip install -r requirements-dev.txt
```

**(Optional) Install Documentation Dependencies:** If you plan to work on the documentation, install the docs-related packages.

```bash
python -m pip install -r requirements-docs.txt
```

### 3. Set Up dprint for Code Formatting

We use dprint for consistent code formatting across JavaScript, TypeScript, JSON, and Markdown files.

**Linux/macOS:**

```bash
curl -fsSL https://dprint.dev/install.sh | sh
```

**Windows:** Download the installer from the [dprint releases page](https://github.com/dprint/dprint/releases) and ensure it's added to your system's PATH.

### 4. Set Up Pre-Commit Hooks

We use pre-commit to automatically run code quality checks before each commit. This helps catch issues like inconsistent line endings, trailing whitespace, and large files.

**Install the hooks:** Once Python dependencies are installed, run this command in the repository root to activate the hooks.

```bash
pre-commit install
```

**Verify installation:** You can run all checks manually on all files to ensure everything is working.

```bash
pre-commit run --all-files
```

Now, the checks will run automatically every time you commit!

## Local Development Workflow

Here's how to run the different parts of the project locally.

### Running the Main Site (Eleventy)

This project uses Eleventy (11ty) as the static site generator.

**To start the development server with live reload:** Any changes you make will automatically rebuild the site and reload your browser.

```bash
npm run start
```

**To build the static site for production:** This generates the final files in the output directory without starting a server.

```bash
npm run build
```

### Building the Documentation (Sphinx)

Run the following commands from the repository root to build the Sphinx documentation:

```bash
cd doc
make html
```

The generated HTML files will be in the `doc/build/html` folder.

### Cloudflare Workers Development

To work with the Cloudflare Workers site located in `packages/cfsite`:

**Start the development server:**

```bash
cd packages/cfsite
npx wrangler dev
```

**Run tests:**

```bash
cd packages/cfsite
npm run test
```

### Docker Development (Optional)

You can use Docker to run pre-commit checks in an isolated environment.

**Build the Docker image:**

```bash
docker build -t asc-precommit .
```

**Run checks inside the container:**

```bash
docker run --rm -v "$PWD":/app -w /app asc-precommit
```

## How to Contribute

Ready to make a change? Follow this process.

### Step 1: Create an Issue

If you find a bug or have an idea for a new feature, please create an issue first.

- Search existing issues to avoid duplicates.
- Provide a clear title and a detailed description. For bugs, include steps to reproduce.

### Step 2: Fork and Clone the Repository

1. Fork the repository on GitHub by clicking the "Fork" button.
2. Clone your fork to your local machine:

```bash
git clone https://github.com/your-username/brisbanesocialchess.github.io.git
cd brisbanesocialchess.github.io
```

### Step 3: Create a Branch

Create a new branch for your changes with a descriptive name.

```bash
git checkout -b your-descriptive-branch-name
```

### Step 4: Make Your Changes

Now, you can edit code, add features, or fix bugs.

### Step 5: Run Pre-Submission Checks

Before committing, ensure your changes meet our quality standards by running the following command:

**Run all pre-commit hooks:** This command runs dprint for formatting, linters (ESLint, markdownlint, yamllint), and other checks to ensure consistency.

```bash
pre-commit run --all-files
```

**Note:** The pre-commit hooks automatically run dprint for code formatting, so you don't need to run `dprint fmt` separately. If you want to format files manually before committing, you can run:

```bash
dprint fmt
```

### Step 6: Commit and Push Your Changes

Commit your changes with a clear, descriptive message.

```bash
git add .
git commit -m "feat: Add a cool new feature"
```

Push your branch to your forked repository.

```bash
git push origin your-descriptive-branch-name
```

### Step 7: Create a Pull Request

1. Go to your forked repository on GitHub.
2. Click the "Compare & pull request" button.
3. Write a clear title and description for your pull request. If it resolves an existing issue, link it using `Fixes #issue-number`.
4. Click "Create pull request" and wait for feedback from the maintainers.

## Community Support

If you need help or have questions, please:

- **Join Discussions:** Participate in ongoing discussions in the issues or project forums.
- **Contact Maintainers:** Reach out to project maintainers if you need direct assistance.

## Appendix: Tools and Platforms We Use

- **Cloudflare Workers:** A serverless platform for running our applications on Cloudflare's global network.
- **Cloudflare Wrangler:** The command-line tool for building and managing Cloudflare Workers.
- **GitHub Pages:** A static site hosting service where our project is deployed.
- **Lerna:** A tool for managing JavaScript projects with multiple packages (monorepos).
- **Read the Docs:** A platform for building, versioning, and hosting our technical documentation.
- **reStructuredText (RST):** The markup language used for our documentation.
- **Sphinx:** A powerful documentation generator that builds our docs from RST files.
- **Vitest:** A blazing-fast testing framework for our JavaScript and TypeScript code.
