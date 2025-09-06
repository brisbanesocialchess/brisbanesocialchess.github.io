FROM node:22.18.0-bullseye

ENV GO_VERSION=1.24.5
ENV NODE_VERSION=22.18.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    bash \
    python3 \
    python3-pip \
    build-essential \
    ca-certificates \
    tar \
    xz-utils \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install pre-commit

RUN curl -LO https://mirrors.aliyun.com/golang/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

RUN go version && python3 --version && pip3 --version

RUN groupadd -r appuser && useradd -r -g appuser -d /app -s /bin/bash appuser

WORKDIR /app

RUN chown -R appuser:appuser /app

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pre-commit --version || exit 1

CMD ["pre-commit", "run", "--all-files"]