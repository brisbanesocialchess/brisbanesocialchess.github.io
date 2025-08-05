FROM alpine:latest

ENV GO_VERSION=1.24.5

RUN apk add --no-cache \
    curl \
    git \
    bash \
    python3 \
    py3-pip \
    build-base \
    ca-certificates \
    tar

RUN pip install pre-commit --break-system-packages

RUN curl -LO https://dl.google.com/go/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz && \
    rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /app

# COPY . .

CMD [ "pre-commit", "run", "--all-files" ]
