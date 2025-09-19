FROM ubuntu:24.04

ARG TARGETARCH

ENV GO_VERSION=1.24.5
ENV NODE_VERSION=22.18.0
ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    bash \
    build-essential \
    ca-certificates \
    tar \
    xz-utils \
    zlib1g-dev \
    libssl-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    libncurses5-dev \
    libncursesw5-dev \
    liblzma-dev \
    tk-dev \
    libffi-dev \
    libgdbm-dev \
    libnss3-dev \
    uuid-dev \
    libstdc++6 && \
    rm -rf /var/lib/apt/lists/*

RUN curl -LO https://mirrors.aliyun.com/golang/go${GO_VERSION}.linux-${TARGETARCH}.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-${TARGETARCH}.tar.gz && \
    rm go${GO_VERSION}.linux-${TARGETARCH}.tar.gz


RUN mkdir -p /app && \
    mkdir -p /home/appuser && \
    groupadd -r -g 1001 appuser && \
    useradd -r -u 1001 -g 1001 -d /home/appuser -s /bin/bash appuser && \
    chown -R appuser:appuser /home/appuser && \
    chown -R appuser:appuser /app

WORKDIR /app
USER appuser
ENV HOME=/home/appuser

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y \
    && . "$HOME/.cargo/env" \
    && rustup install stable \
    && rustup default stable

ENV PATH="$HOME/.cargo/bin:${PATH}"
RUN cargo install oxipng --locked

ENV PATH="/usr/local/go/bin:${PATH}"

RUN git clone https://github.com/pyenv/pyenv.git $HOME/.pyenv

ENV PYENV_ROOT="$HOME/.pyenv"
ENV PATH="$PYENV_ROOT/bin:$PYENV_ROOT/shims:${PATH}"

RUN pyenv install 3.11 && pyenv local 3.11 && pip install --no-cache-dir pre-commit==4.3.0 pylint==3.3.8 && \
    pyenv install 3.12 && pyenv local 3.12 && pip install --no-cache-dir pre-commit==4.3.0 pylint==3.3.8 && \
    pyenv install 3.13 && pyenv local 3.13 && pip install --no-cache-dir pre-commit==4.3.0 pylint==3.3.8

ENV NVM_DIR=$HOME/nvm

RUN mkdir $NVM_DIR && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN go version && pip --version && . $NVM_DIR/nvm.sh && node -v && npm -v

COPY --chown=appuser:appuser package.json package-lock.json ./
RUN . $NVM_DIR/nvm.sh && npm install
COPY --chown=appuser:appuser . .

RUN . $NVM_DIR/nvm.sh && \
    npm run tailwindcss:build && \
    npm run build && \
    chown -R appuser:appuser /app && \
    echo 'export NVM_DIR="$HOME/nvm"' >> /home/appuser/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/appuser/.bashrc

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["/bin/bash", "-c", ". $NVM_DIR/nvm.sh && pyenv local 3.13 && pre-commit --version"]


CMD ["/bin/bash", "-c", ". $NVM_DIR/nvm.sh && pyenv local 3.13 && pre-commit run --all-files"]
