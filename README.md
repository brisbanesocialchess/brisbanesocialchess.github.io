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

- [Cloudflare Workers Development](#cloudflare-workers-development)
  - [Start Development Server](#start-development-server)
  - [Run Tests](#run-tests)
- [About Brisbane Social Chess](#about-brisbane-social-chess)
- [Getting Started / Building the Site](#getting-started--building-the-site)
- [Build the Docker image for running `pre-commit` easily](#build-the-docker-image-for-running-pre-commit-easily)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

[Lerna](https://lerna.js.org/) is a fast, modern build system for managing and publishing multiple JavaScript/TypeScript packages from the same repository.
Experiment with Lerna and bootup a local developer playground from the repository root with: `npx lerna run dev`.

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

Read below for instructions about the current static development site hosted on [GitHub Pages](https://pages.github.com/).

---

## About Brisbane Social Chess

Brisbane Social Chess is a community-focused website dedicated to chess enthusiasts in Brisbane.
Our goal is to provide news, events, resources, and a platform for social chess activities.

---

## Getting Started / Building the Site

To start a local development server with live reload, run:

```bash
cd docs
npx serve
```

---

## Build the Docker image for running `pre-commit` easily

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

© 2025 Brisbane Social Chess
