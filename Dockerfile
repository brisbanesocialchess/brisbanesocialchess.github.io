FROM node:25.7-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN python3 -m venv .venv && source .venv/bin/activate

COPY .pre-commit-config.yaml ./

RUN pip install --no-cache-dir pre-commit && git init . && pre-commit install-hooks

COPY . .

RUN npm install && \
    npm run build && \
    npm cache clean --force && \
    chown -R appuser:appuser /app

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pre-commit --version || exit 1
