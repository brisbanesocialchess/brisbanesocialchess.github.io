# Contributing & Developer Guide ✨

Welcome to Awesome Social Chess! We appreciate your interest in contributing. All contributions are welcome! 💖

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating an Issue](#creating-an-issue)
3. [How to Contribute](#how-to-contribute)
4. [Development Setup](#development-setup)
5. [Running the Site Locally](#running-the-site-locally)
6. [Before Submitting a Pull Request](#before-submitting-a-pull-request)
7. [Development Platforms](#development-platforms)
8. [Advanced Development](#advanced-development)
9. [Community Support](#community-support)

---

## Getting Started

Before you begin:

**Familiarize Yourself:** Take a moment to read through the existing issues and pull requests to understand current discussions.

---

## Creating an Issue

If you encounter a bug or have a feature request, please create an issue:

- **Search Existing Issues:** Check if the issue already exists to avoid duplicates.
- **Open a New Issue:**
  - Use a descriptive title.
  - Clearly describe the problem or feature request.
  - Provide steps to reproduce the issue, if applicable.
  - Include screenshots or code snippets, if helpful.

---

## How to Contribute

We welcome contributions in the form of bugfixes, new features, documentation improvements, and more.

### 1. Fork the Repository 🔗

Click the "Fork" button at the top right corner of the repository page to create a copy of the repository on your GitHub account.

### 2. Clone Your Fork 📥

Clone the forked repository to your local machine:

```bash
git clone https://github.com/your-username/brisbanesocialchess.github.io.git
```

### 3. Create a Branch 🌿

```bash
cd brisbanesocialchess.github.io
git checkout -b add-new-feature
```

### 4. Make Changes ✏️

Make necessary improvements, such as fixing bugs, enhancing documentation, or adding new features.

---

## Development Setup

Before committing, please make sure you have set up the development environment correctly and your code follows our formatting standards.

We use:

- **Python** for various development tools and scripts
- **dprint** for consistent code formatting
- **pre-commit** for checking end-of-file and line endings (LF/CRLF)
- **Node.js** for building and running the site
- **Eleventy (11ty)** as the static site generator

### Prerequisites

#### Install Node.js

You need Node.js (version 22 LTS or higher). Download and install it if you don't have it already.

#### Setting Up Python Environment 🐍

1. Make sure you have **Python 3.13** installed. You can check your Python version with:

```bash
python --version
```

2. **(Recommended)** Create and activate a virtual environment to isolate dependencies:

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

This helps keep your global Python installation clean and avoids dependency conflicts.

3. Install the required Python packages:

```bash
python -m pip install -r requirements-dev.txt
```

This will install all the necessary Python dependencies for development, including **pre-commit** and **pytest**.

4. **(Optional)** If you're working on documentation, install additional doc-related packages:

```bash
python -m pip install -r requirements-docs.txt
```

### Setting Up dprint 🔧

**Windows:**

- Download and install dprint from the [dprint releases](https://github.com/dprint/dprint/releases)
- Run the installer and make sure dprint is in your system PATH

**Linux/macOS:**

- Install via cURL:

```bash
curl -fsSL https://dprint.dev/install.sh | sh
```

**Using dprint:**

To check code without changing files:

```bash
dprint check --allow-no-files
```

To autoformat code:

```bash
dprint fmt --allow-no-files
```

Our configuration is already in the repository: `dprint.json`

### Setting Up pre-commit 🧪

We use **pre-commit** to maintain code quality by automatically checking for common issues before each commit. This includes:

- Ensuring files end with a newline
- Maintaining consistent line endings (LF/CRLF)
- Checking for large files
- Validating Python syntax

Follow these steps to set up pre-commit:

1. Install pre-commit (after installing Python packages):

```bash
python -m pip install pre-commit
```

2. Install the pre-commit hooks for this project:

```bash
pre-commit install
```

This will activate automatic checks before each commit.

3. Verify the installation by running all checks manually:

```bash
pre-commit run --all-files
```

**Common pre-commit commands:**

- `pre-commit run` - Run hooks on staged files
- `pre-commit run --all-files` - Run hooks on all files
- `pre-commit uninstall` - Remove pre-commit hooks
- `pre-commit autoupdate` - Update hooks to the latest version

For more information and troubleshooting, visit the [pre-commit documentation](https://pre-commit.com/).

---

## Running the Site Locally

Welcome! If you are new to this project, here is how to get started as a developer:

### Start the Development Server (with Watching)

To develop and see your changes live, run:

```bash
npm run start
```

This starts a local server and enables "watching mode"—any changes you make will automatically rebuild and reload the site in your browser.

### Build the Site Once (Production Build)

To generate the static site files for deployment, run:

```bash
npm run build
```

This runs Eleventy once and outputs the final static site. No server or watching is started.

**Summary:**

- Use `npm run start` for development (with live reload and watching for changes).
- Use `npm run build` for a one-time build (no watching, for production or deployment).

This project uses **Eleventy (11ty)** as the static site generator. For more details, see the README.md or the [Eleventy documentation](https://www.11ty.dev/).

### Alternative: Serve the Docs Folder

To start a local development server with live reload for the docs, run:

```bash
cd docs
npx serve
```

---

## Before Submitting a Pull Request

Before submitting a pull request, make sure to run these commands to fix any formatting or linting issues:

```bash
# Fix formatting issues
npm run format
npx dprint fmt --allow-no-files

# Run all pre-commit checks
python -m pre_commit run --all-files

# Or run specific hooks only (examples):
python -m pre_commit run prettier --all-files        # Run only prettier formatting
python -m pre_commit run eslint --all-files          # Run only ESLint checks
python -m pre_commit run markdownlint --all-files    # Run only Markdown linting
python -m pre_commit run yamllint --all-files        # Run only YAML linting
```

**Note:** If you don't have pre-commit installed, install it from the requirements file as mentioned in the prerequisites section.

These checks ensure your code follows the project's style guidelines and passes all automated tests.

### Commit Changes 📝

Use meaningful and clear commit messages that describe the purpose of your changes. This helps maintain a clean and understandable project history.

Example of staging and committing changes:

```bash
git add .
git commit -m "Add feature: description of feature"
```

### Push Changes ⬆️

Push your local branch to your remote fork. Replace `your-branch-name` with the name of your current branch.

```bash
git push origin add-new-feature
```

This makes your changes available for review and merging via a Pull Request.

### Create a Pull Request 🔄

1. Go to your forked repository on GitHub.
2. Click the "Compare & pull request" button near the top of the page.
3. Make sure your changes look correct and you are merging into the right branch.
4. Write a clear and simple title describing your changes.
5. Add a short description explaining what you changed and why. If it fixes an issue, mention it like this: `Fixes #issue-number`.
6. Click "Create pull request" to submit your contribution.
7. Watch for feedback on your Pull Request and respond to any comments.

---

## Development Platforms

### Cloudflare Workers

**Cloudflare Wrangler** is a command-line tool designed to help developers build and manage applications on the Cloudflare developer platform, particularly for Cloudflare Workers. It streamlines the process of deploying, testing, and configuring Workers, as well as interacting with other Cloudflare developer products.

**Cloudflare Workers** is a serverless platform for building, deploying, and scaling apps across Cloudflare's global network with a single command - no infrastructure to manage, no complex configuration.

### GitHub Pages

**GitHub Pages** is a static site hosting service offered by GitHub, enabling users to host sites directly from their GitHub repositories. It is designed for publishing static content, meaning it primarily handles HTML, CSS, and JavaScript files, and does not support server-side languages like PHP or Python for dynamic content generation.

### Lerna

**Lerna** is a tool for optimizing the workflow around managing multi-package repositories (monorepos).

### Read the Docs

**Read the Docs** is a Continuous Documentation Deployment platform designed to simplify the process of building, versioning, and hosting technical documentation, particularly for software projects. It operates on the principle of "docs as code," integrating with version control systems like Git (GitHub, GitLab, Bitbucket) to automatically build and update documentation whenever changes are committed to the repository.

### reStructuredText (RST)

**reStructuredText (RST)** is a lightweight markup language designed for creating easy-to-read and easy-to-write plaintext documents that can be automatically converted to various output formats, such as HTML, LaTeX (and thus PDF), and more. It is a key component of the Docutils project and is widely used in the Python community for writing technical documentation, including Python's official documentation and documentation for many Python libraries.

### Sphinx

**Sphinx** is a powerful and widely-used documentation generator written in Python. It is particularly popular within the Python community and is considered the de facto standard for documenting Python projects.

### Vitest

**Vitest** is a blazing-fast, next-generation testing framework designed for modern JavaScript and TypeScript projects, built on top of Vite. It's known for its speed and developer experience, offering instant feedback and seamless integration with Vite's features like hot module replacement (HMR). Vitest is inspired by Jest and aims to provide a familiar yet enhanced testing experience.

---

## Advanced Development

### Cloudflare Workers Development

To work with the Cloudflare Workers site in the `packages/cfsite` directory:

#### Start Development Server

```bash
cd packages/cfsite
npx wrangler dev
```

#### Run Tests

```bash
cd packages/cfsite
npm run test
```

### Docker Development

#### Build the Docker image for running pre-commit easily

```bash
docker build -t my-go-precommit .
```

Or without cache:

```bash
docker build --no-cache -t my-go-precommit .
```

#### Run the Docker container

```bash
docker run --rm -v "$PWD":/app -w /app my-go-precommit
```

Or if you want to run and keep the container and go into Bash:

```bash
docker run -it -v "$PWD":/app -w /app my-go-precommit bash
```

### Build the Documentation

Run the following commands from the repository root to create the Sphinx documentation with Make:

```bash
cd doc
make html
```

The generated HTML site will be in the `doc/build/html` folder. You can open the HTML files with your web browser.

---

## Community Support

If you need help or have questions:

- **Join Discussions:** Participate in ongoing discussions with the community.
- **Contact Maintainers:** Reach out to project maintainers if you need direct assistance.