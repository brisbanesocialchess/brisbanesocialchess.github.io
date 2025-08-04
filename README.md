<div align="center">
  <img src="https://avatars.githubusercontent.com/u/61562340?s=400&v=4" alt="Brisbane Social Chess Logo" style="border-radius: 50%;">
  <h1>brisbanesocialchess.github.io</h1>

Welcome to the source code repository for the Brisbane Social Chess website.

</div>

- **Live site:** [https://www.brisbanesocialchess.org.au/](https://www.brisbanesocialchess.org.au/)
- **Current Development site:** [https://brisbanesocialchess.github.io/](https://brisbanesocialchess.github.io/)
- **Cloudflare Playground:** [https://cfsite.brisbanesocialchess.workers.dev/](https://cfsite.brisbanesocialchess.workers.dev/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Cloudflare Workers Development](#cloudflare-workers-development)
  - [Start Development Server](#start-development-server)
  - [Run Tests](#run-tests)
- [About Brisbane Social Chess](#about-brisbane-social-chess)
- [Getting Started / Building the Site](#getting-started--building-the-site)

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

© 2025 Brisbane Social Chess
