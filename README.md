<div align="center">
  <img src="https://avatars.githubusercontent.com/u/61562340?s=400&v=4" alt="Brisbane Social Chess Logo" style="border-radius: 50%;">
  <h1>brisbanesocialchess.github.io</h1>

Welcome to the source code repository for the Brisbane Social Chess website.

</div>

- **Live site:** [https://www.brisbanesocialchess.org.au/](https://www.brisbanesocialchess.org.au/)
- **Current Development site:** [https://brisbanesocialchess.github.io/](https://brisbanesocialchess.github.io/)
- **Cloudflare Playground:** [https://cfsite.brisbanesocialchess.workers.dev/](https://cfsite.brisbanesocialchess.workers.dev/)

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

## Features

- Responsive and modern website
- Easy content management via Markdown files
- Static site generated using [Zola](https://www.getzola.org/) — a fast, Rust-powered static site generator similar to Jekyll

---

## Getting Started / Building the Site

### Install Zola

Download and install Zola from the [official releases page](https://github.com/getzola/zola/releases).

- For Windows: download the latest ZIP file containing the `.exe`
- For macOS/Linux: follow the installation instructions on [Zola’s docs](https://www.getzola.org/documentation/getting-started/installation/)

Verify installation by running:

```bash
zola -V
```

Expected output:

```plaintext
zola 0.20.0
```

---

### Preview Site Locally

To start a local development server with live reload, run:

```bash
zola serve
```

You should see output like:

```plaintext
Starting server at http://127.0.0.1:1111
Watching for changes in /path/to/site
```

Open your browser and visit:

```plaintext
http://127.0.0.1:1111
```

---

### Build Static HTML Files

When you are ready to generate the static site files for deployment:

```bash
zola build
```

The output will be in the `public/` directory, ready to be served or deployed.

---

### Customize Your Site

- Edit `config.toml` to update site metadata such as title and base URL
- Add or modify Markdown files in the `content/` directory to change site content
- Customize templates and static assets in `templates/` and `static/` folders as needed

---

© 2025 Brisbane Social Chess
