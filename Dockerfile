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
    /usr/local/go/bin/go version && node -v && npm -v && pre-commit --version

WORKDIR /app
COPY . .

RUN npm install && \
    npm run build && \
    npm cache clean --force

RUN groupadd -r appuser && useradd -m -r -g appuser -d /app -s /bin/bash appuser && \
    mkdir -p /app/.cache /tmp/appuser/.cache/pre-commit && \
    chown -R appuser:appuser /app /tmp/appuser

ENV PATH="/usr/local/go/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:${PATH}"
ENV GIT_TERMINAL_PROMPT=0
ENV HOME="/app"
ENV XDG_CONFIG_HOME="/app/.config"
ENV PRE_COMMIT_HOME="/app/.cache/pre-commit"

USER appuser

CMD ["bash", "-c", "git config --global --add safe.directory '*' && git config --global user.email 'ci@localhost' && git config --global user.name 'CI' && pre-commit run --all-files"]
