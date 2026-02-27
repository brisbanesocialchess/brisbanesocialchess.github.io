# Use a specific version to ensure reproducibility
FROM node:23.7-bookworm

# 1. Create user first so we can reference it
RUN useradd --create-home appuser

# 2. Install dependencies and clean up in one layer
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 3. Setup Virtual Environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install pre-commit globally in the venv
RUN pip install --no-cache-dir pre-commit

WORKDIR /app

# 4. Copy config files first to leverage build cache
COPY --chown=appuser:appuser .pre-commit-config.yaml package*.json ./

# 5. Switch to user before installing app deps
USER appuser

# Install Node dependencies
RUN npm install && npm cache clean --force

# 6. Copy the rest of the source
COPY --chown=appuser:appuser . .

# Initialize git (required for pre-commit hooks) and build
RUN git init . && \
    pre-commit install-hooks && \
    npm run build

# Adjusted Healthcheck to check if the app (assuming port 3000) is alive
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1
