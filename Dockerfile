FROM node:22.18.0-bookworm

ENV GO_VERSION=1.24.5
ENV NODE_VERSION=22.18.0
ENV PATH="/root/.local/bin:${PATH}"

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    bash \
    pipx \
    build-essential \
    ca-certificates \
    tar \
    xz-utils \
    libstdc++6 && \
    rm -rf /var/lib/apt/lists/* && \
    pipx install pre-commit

RUN curl -LO https://mirrors.aliyun.com/golang/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

RUN go version && pipx --version && node -v && npm -v

WORKDIR /app
COPY . .

RUN npm install

RUN npm run tailwindcss:build

RUN npm run build

CMD ["pre-commit", "run", "--all-files"]
