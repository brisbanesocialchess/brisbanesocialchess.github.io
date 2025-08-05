FROM alpine:latest

ENV GO_VERSION=1.24.5
ENV NODE_VERSION=22.18.0

RUN apk add --no-cache \
    curl \
    git \
    bash \
    python3 \
    py3-pip \
    build-base \
    ca-certificates \
    tar \
    xz \
    libstdc++

RUN pip install pre-commit --break-system-packages

RUN curl -LO https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

RUN curl -LO https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz && \
    tar -xJf node-v${NODE_VERSION}-linux-x64.tar.xz -C /usr/local --strip-components=1 && \
    rm node-v${NODE_VERSION}-linux-x64.tar.xz

RUN node --version && npm --version && go version && python3 --version && pip --version

WORKDIR /app

CMD ["pre-commit", "run", "--all-files"]
