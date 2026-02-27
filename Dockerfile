FROM node:25.7-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app && chown -R appuser:appuser /app

WORKDIR /app

COPY .pre-commit-config.yaml ./

# Create the venv
RUN python3 -m venv /opt/venv

# Force the venv to be the default for all future RUN and CMD steps
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install --no-cache-dir pre-commit && git init . && pre-commit install-hooks


RUN useradd --create-home appuser
USER appuser
COPY --chown=appuser:appuser . .

RUN npm install && \
    npm run build && \
    npm cache clean --force && \
    chown -R appuser:appuser /app

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pre-commit --version || exit 1
