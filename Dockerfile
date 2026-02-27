FROM node:25.7-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY .pre-commit-config.yaml ./

RUN pip3 install --no-cache-dir pre-commit && git init . && pre-commit install-hooks

COPY . .

RUN npm install && \
    npm run build && \
    npm cache clean --force && \
    chown -R appuser:appuser /app

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pre-commit --version || exit 1
