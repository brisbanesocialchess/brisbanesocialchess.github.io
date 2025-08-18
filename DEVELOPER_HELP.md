<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Developer Help: Running the Website Locally](#developer-help-running-the-website-locally)
  - [1. Install Node.js](#1-install-nodejs)
  - [2. Install Python Dependencies](#2-install-python-dependencies)
  - [3. Start the Development Server (with Watching)](#3-start-the-development-server-with-watching)
  - [4. Build the Site Once (Production Build)](#4-build-the-site-once-production-build)
  - [Before Submitting a Pull Request](#before-submitting-a-pull-request)
  - [Development Platforms](#development-platforms)
  - [Cloudflare Workers Development](#cloudflare-workers-development)
    - [Start Development Server](#start-development-server)
    - [Run Tests](#run-tests)
  - [Getting Started / Building the Site](#getting-started--building-the-site)
  - [Docker Development](#docker-development)
    - [Build the Docker image for running `pre-commit` easily](#build-the-docker-image-for-running-pre-commit-easily)
    - [Run the Docker container](#run-the-docker-container)
  - [Build the Documentation](#build-the-documentation)
  - [Pre-commit Setup](#pre-commit-setup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Developer Help: Running the Website Locally

Welcome! If you are new to this project, here is how to get started as a developer:

## 1. Install Node.js

You need [Node.js](https://nodejs.org/) (version 22 LTS or higher). Download and install it if you don't have it already.

## 2. Install Python Dependencies

Install the Python packages from the requirements file:

```bash
pip install -r requirements.txt
```

This will install the required Python tools including pre-commit and pytest.

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

**Note:** If you don't have pre-commit installed, install it from the requirements file as mentioned in the prerequisites section.

These checks ensure your code follows the project's style guidelines and passes all automated tests.

## Development Platforms

[Cloudflare Workers](https://developers.cloudflare.com/workers/) is a serverless platform for building, deploying, and scaling apps across Cloudflare's global network with a single command — no infrastructure to manage, no complex configuration.

[Lerna](https://lerna.js.org/) is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.

[Vitest](https://vitest.dev/) is a blazing-fast, next-generation testing framework designed for modern JavaScript and TypeScript projects, built on top of Vite. It's known for its speed and developer experience, offering instant feedback and seamless integration with Vite's features like hot module replacement (HMR). Vitest is inspired by Jest and aims to provide a familiar yet enhanced testing experience.

[Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line tool designed to help developers build and manage applications on the Cloudflare developer platform, particularly for Cloudflare Workers. It streamlines the process of deploying, testing, and configuring Workers, as well as interacting with other Cloudflare developer products.

[GitHub Pages](https://pages.github.com/) is a static site hosting service offered by GitHub, enabling users to host websites directly from their GitHub repositories. It is designed for publishing static content, meaning it primarily handles HTML, CSS, and JavaScript files, and does not support server-side languages like PHP or Python for dynamic content generation.

[Read the Docs](https://about.readthedocs.com/) is a Continuous Documentation Deployment platform designed to simplify the process of building, versioning, and hosting technical documentation, particularly for software projects. It operates on the principle of "docs as code," integrating with version control systems like Git (GitHub, GitLab, Bitbucket) to automatically build and update documentation whenever changes are committed to the repository.

[Sphinx](https://www.sphinx-doc.org/en/master/) is a powerful and widely-used documentation generator written in Python. It is particularly popular within the Python community and is considered the de facto standard for documenting Python projects.

[reStructuredText (RST)](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html) is a lightweight markup language designed for creating easy-to-read and easy-to-write plaintext documents that can be automatically converted to various output formats, such as HTML, LaTeX (and thus PDF), and more. It is a key component of the Docutils project and is widely used in the Python community for writing technical documentation, including Python's official documentation and documentation for many Python libraries.

## Cloudflare Workers Development

To work with the Cloudflare Workers site in the `packages/cfsite` directory:

### Start Development Server

```bash
cd packages/cfsite
npx wrangler dev
```

### Run Tests

```bash
cd packages/cfsite
npm run test
```

## Getting Started / Building the Site

To start a local development server with live reload, run:

```bash
cd docs
npx serve
```

## Docker Development

### Build the Docker image for running `pre-commit` easily

```bash
docker build -t my-go-precommit .
```

Or without cache:

```bash
docker build --no-cache -t my-go-precommit .
```

### Run the Docker container

```bash
docker run --rm -v "$PWD":/app -w /app my-go-precommit
```

Or if you want to run and keep the container and go into bash:

```bash
docker run -it -v "$PWD":/app -w /app my-go-precommit bash
```

## Build the Documentation

Run the following commands from the repo root to create the Sphinx documentation with Make:

```shell
cd doc
make html
```

The generated HTML site will be in the `doc/build/html` folder.
You can open the HTML files with your web browser.

## Pre-commit Setup

**Note:** If you don't have pre-commit installed, install it from the requirements file as mentioned in the prerequisites section.

After installation, set up pre-commit hooks:

```bash
pre-commit install
```

This will ensure code quality checks run automatically before each commit.
