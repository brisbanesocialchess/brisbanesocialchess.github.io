# brisbanesocialchess.github.io

What is brisbanesocialchess? ...

**Deploy URL:** https://www.brisbanesocialchess.org.au/

## Features

- ....
- Site generator: Zola (Similar to Jekyll but powered by Rust)

## Building

- Learning more about Zola
- Installing Zola (https://github.com/getzola/zola/releases for windows to download latest zip(that includes .exe file)) (read more at https://www.getzola.org/documentation/getting-started/installation/ to install Zola in your machine by package manager in Linux or OSX etc)
- Confirm zola installed and is accesiable in your terminal/shell:

```bash
$ zola -V
zola 0.20.0
```

### Run a local server to preview

```bash
zola serve
```

You should see something like:

```
Starting server at http://127.0.0.1:1111
Watching for changes in /path/to/my-first-site
```

Open your browser and visit:

```
http://127.0.0.1:1111
```

### Build your site to static HTML

Once happy, stop the server (Ctrl+C) and run:

```
zola build
```

### Customize config

Edit `config.toml` and other `.md` files to set your site title, base URL, content, etc.

Copyright, 2025 ...
