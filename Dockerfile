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
    rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir --break-system-packages pre-commit==4.5.1

RUN git config --global --add safe.directory "*"

RUN curl -LO https://mirrors.aliyun.com/golang/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

RUN go version && node -v && npm -v && pre-commit --version

RUN groupadd -r appuser && useradd -m -r -g appuser -d /app -s /bin/bash appuser

WORKDIR /app
COPY . .

RUN npm install && \
    npm run build && \
    npm cache clean --force && \
    chown -R appuser:appuser /app

RUN mkdir -p /tmp/appuser/.cache/pre-commit && chown -R appuser:appuser /tmp/appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pre-commit --version || exit 1

USER appuser

ENV PATH="/usr/local/bin:/usr/bin:/usr/local/go/bin:/usr/local/sbin:${PATH}"
ENV HOME="/tmp/appuser"
ENV PRE_COMMIT_HOME="/tmp/appuser/.cache/pre-commit"
ENV GIT_TERMINAL_PROMPT=0

ENTRYPOINT ["/bin/bash", "-c"]

CMD ["bash", "-c", "set -x && git config --global --add safe.directory '*' && git config --global user.email 'ci@localhost' && git config --global user.name 'CI' && git status && which git && pre-commit run --all-files"]
