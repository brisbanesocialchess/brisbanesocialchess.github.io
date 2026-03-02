FROM node:22.18.0-bookworm

ENV GO_VERSION=1.24.5
ENV NODE_VERSION=22.18.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    bash \
    python3-pip \
    python3.11-venv \
    build-essential \
    ca-certificates \
    tar \
    xz-utils \
    libstdc++6 && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir --break-system-packages pre-commit==4.5.1 && \
    git config --global --add safe.directory "*"

RUN curl -LO https://mirrors.aliyun.com/golang/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz && \
    go version && node -v && npm -v && pre-commit --version

WORKDIR /app
COPY . .

RUN npm install && \
    npm run build && \
    npm cache clean --force

RUN mkdir -p /tmp/appuser/.cache/pre-commit

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pre-commit --version || exit 1

# USER appuser

ENV PATH="/usr/local/bin:/usr/bin:/usr/local/go/bin:/usr/local/sbin:${PATH}"
ENV GIT_TERMINAL_PROMPT=0

CMD ["pre-commit", "run", "--all-files"]
