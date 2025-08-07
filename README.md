<div align="center">
  <img src="https://avatars.githubusercontent.com/u/61562340?s=400&v=4" alt="Brisbane Social Chess Logo" style="border-radius: 50%;">
  <h1>brisbanesocialchess.github.io</h1>

Welcome to the source code repository for the Brisbane Social Chess website.

</div>

[![CodeQL Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Fcodeql.yml?label=codeql)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/codeql.yml)
[![Dprint Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Fdprint.yml?label=dprint)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/dprint.yml)
[![First Interaction Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Ffirst-interaction.yml?label=first-interaction)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/first-interaction.yml)
[![Git Clone Matrix Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Fgit-clone-matrix.yml?label=git-clone-matrix)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/git-clone-matrix.yml)
[![Labeler Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Flabeler.yml?label=labeler)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/labeler.yml)
[![Lerna Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Flerna.yml?label=lerna)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/lerna.yml)
[![Ls-lint Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Fls-lint.yml?label=ls-lint)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/ls-lint.yml)
[![Pre-commit Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Fpre-commit.yml?label=pre-commit)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/pre-commit.yml)
[![Wrangler Workflow Status](https://img.shields.io/github/actions/workflow/status/brisbanesocialchess/brisbanesocialchess.github.io/.github%2Fworkflows%2Fwrangler.yml?label=wrangler)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/wrangler.yml)

[![Build and Deploy Eleventy site](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/deploy-eleventy-site.yml/badge.svg)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/deploy-eleventy-site.yml)
[![CI - Build Eleventy on PR](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/deploy-eleventy-site-on-pr.yml/badge.svg)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/actions/workflows/deploy-eleventy-site-on-pr.yml)

[![View the project board](https://img.shields.io/badge/view_the_project_board-purple)](https://github.com/orgs/brisbanesocialchess/projects/1/)
[![GitHub License](https://img.shields.io/github/license/brisbanesocialchess/brisbanesocialchess.github.io)](LICENSE)
[![Discord](https://img.shields.io/discord/1299539471964049448?label=Discord)](https://discord.com/invite/JWBKhQmzvD)
[![GitHub Pages](https://img.shields.io/website?url=https%3A%2F%2Fbrisbanesocialchess.github.io&label=github-pages)](https://brisbanesocialchess.github.io)
[![Read the Docs](https://img.shields.io/website?url=https%3A%2F%2Fbrisbanesocialchess.readthedocs.io%2Fen%2Flatest%2F&label=read-the-docs)](https://brisbanesocialchess.readthedocs.io/en/latest/)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/w/brisbanesocialchess/brisbanesocialchess.github.io)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/graphs/commit-activity)
[![GitHub Issues marked as good first issue](https://img.shields.io/github/issues/brisbanesocialchess/brisbanesocialchess.github.io/good%20first%20issue?color=%237057ff)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22)

- **Live site:** [https://www.brisbanesocialchess.org.au/](https://www.brisbanesocialchess.org.au/)
- **Current Development site:** [https://brisbanesocialchess.github.io/](https://brisbanesocialchess.github.io/)
- **Cloudflare Playground:** [https://cfsite.brisbanesocialchess.workers.dev/](https://cfsite.brisbanesocialchess.workers.dev/)
- **Read the Docs:** [https://brisbanesocialchess.readthedocs.io/en/latest/](https://brisbanesocialchess.readthedocs.io/en/latest/)
- [CONTRIBUTING Guide](CONTRIBUTING.md)

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [About Brisbane Social Chess](#about-brisbane-social-chess)
- [Quick Start](#quick-start)
  - [Cloudflare Workers Development](#cloudflare-workers-development)
    - [Start Development Server](#start-development-server)
    - [Run Tests](#run-tests)
  - [Getting Started / Building the Site](#getting-started--building-the-site)
  - [Build the Docker image for running `pre-commit` easily](#build-the-docker-image-for-running-pre-commit-easily)
  - [Build the Documentation](#build-the-documentation)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

## About Brisbane Social Chess

Brisbane Social Chess is a not-for-profit organization in Queensland that promotes the game of chess through social gatherings and community engagement.
We organize regular meetups where people can play chess in a relaxed and friendly environment.
We are registered in Queensland and have a dedicated team of organizers.

---

## Quick Start

[Cloudflare Workers](https://developers.cloudflare.com/workers/) is a serverless platform for building, deploying, and scaling apps across Cloudflare's global network `↗` with a single command — no infrastructure to manage, no complex configuration.

[Lerna](https://lerna.js.org/) is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.
Experiment with Lerna and bootup a local developer playground from the repository root with: `npx lerna run dev`.

[Vitest](https://vitest.dev/) is a blazing-fast, next-generation testing framework designed for modern JavaScript and TypeScript projects, built on top of Vite. It's known for its speed and developer experience, offering instant feedback and seamless integration with Vite's features like hot module replacement (HMR). Vitest is inspired by Jest and aims to provide a familiar yet enhanced testing experience.

[Cloudflare Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line tool designed to help developers build and manage applications on the Cloudflare developer platform, particularly for Cloudflare Workers. It streamlines the process of deploying, testing, and configuring Workers, as well as interacting with other Cloudflare developer products.

[GitHub Pages](https://pages.github.com/) is a static site hosting service offered by GitHub, enabling users to host websites directly from their GitHub repositories. It is designed for publishing static content, meaning it primarily handles HTML, CSS, and JavaScript files, and does not support server-side languages like PHP or Python for dynamic content generation.

[Read the Docs](https://about.readthedocs.com/) is a Continuous Documentation Deployment platform designed to simplify the process of building, versioning, and hosting technical documentation, particularly for software projects. It operates on the principle of "docs as code," integrating with version control systems like Git (GitHub, GitLab, Bitbucket) to automatically build and update documentation whenever changes are committed to the repository.

[Sphinx](https://www.sphinx-doc.org/en/master/) is a powerful and widely-used documentation generator written in Python. It is particularly popular within the Python community and is considered the de facto standard for documenting Python projects.

[reStructuredText (RST)](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html) is a lightweight markup language designed for creating easy-to-read and easy-to-write plaintext documents that can be automatically converted to various output formats, such as HTML, LaTeX (and thus PDF), and more. It is a key component of the Docutils project and is widely used in the Python community for writing technical documentation, including Python's official documentation and documentation for many Python libraries.

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

Read below for instructions about the current static development site hosted on [GitHub Pages](https://pages.github.com/).

---

### Getting Started / Building the Site

To start a local development server with live reload, run:

```bash
cd docs
npx serve
```

---

### Build the Docker image for running `pre-commit` easily

```bash
docker build -t my-go-precommit .
or
docker build --no-cache -t my-go-precommit .
```

And then:

```bash
docker run --rm -v "$PWD":/app -w /app my-go-precommit
```

Or if you want to run and keep the container and go into bash:

```bash
docker run -it -v "$PWD":/app -w /app my-go-precommit bash
```

---

### Build the Documentation

Run the following commands from the repo root to create the Sphinx documentation with Make:

```shell
cd doc
make html
```

The generated HTML site will be in the `doc/build/html` folder.
You can open the HTML files with your web browser.

---

## Contributors

[![Contributors](https://contrib.rocks/image?repo=brisbanesocialchess/brisbanesocialchess.github.io)](https://github.com/brisbanesocialchess/brisbanesocialchess.github.io/graphs/contributors)

---

© 2025 Brisbane Social Chess
