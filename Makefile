# ==============================================================================
# Makefile for Python Project Development
# ==============================================================================

# --- Configuration Variables ---
# Define Python executable and package manager for portability.
# Users can override these via environment variables or make arguments (e.g., make PYTHON=python3.10).
PYTHON ?= python3
PIP := $(PYTHON) -m pip

# Define the virtual environment directory.
# This makes it easy to manage and activate the environment consistently.
VENV_DIR ?= .venv

# Define the pre-commit executable.
PRECOMMIT ?= pre-commit

# Define the requirements file.
REQUIREMENTS_FILE ?= requirements.txt

# --- Phony Targets ---
# .PHONY declares targets that do not correspond to actual files.
# This prevents issues if a file with the same name as a target exists.
.PHONY: all setup install clean check format lint test docs help

# Default target when `make` is run without arguments.
.DEFAULT_GOAL := help

# ==============================================================================
# Core Development Targets
# ==============================================================================

all: setup check test ## Run all common development checks (setup, check, test)

setup: $(VENV_DIR) install checkinstall ## Set up the development environment (create venv, install deps, install hooks)

$(VENV_DIR): ## Create a Python virtual environment if it doesn't exist
	@echo "Creating virtual environment at $(VENV_DIR)..."
	@$(PYTHON) -m venv $(VENV_DIR)
	@echo "Virtual environment created. Activate with 'source $(VENV_DIR)/bin/activate'."

install: $(VENV_DIR) ## Install Python dependencies from requirements.txt into the virtual environment
	@echo "Installing Python dependencies from $(REQUIREMENTS_FILE)..."
	@. $(VENV_DIR)/bin/activate && $(PIP) install -r $(REQUIREMENTS_FILE)
	@echo "Dependencies installed."

clean: ## Clean up build artifacts, cache files, and the virtual environment
	@echo "Cleaning up..."
	@rm -rf $(VENV_DIR)
	@find . -name '__pycache__' -exec rm -rf {} +
	@find . -name '*.pyc' -exec rm -f {} +
	@find . -name '*.pytest_cache' -exec rm -rf {} +
	@find . -name '*.egg-info' -exec rm -rf {} +
	@rm -f .coverage
	@echo "Clean up complete."

# ==============================================================================
# Quality Assurance & Testing Targets
# ==============================================================================

check: checkinstall ## Run pre-commit checks on all files (linting, formatting, etc.)
	@echo "Running pre-commit checks..."
	@$(PRECOMMIT) run --all-files
	@echo "Pre-commit checks complete."

checkinstall: ## Install pre-commit hooks into the Git repository
	@echo "Installing pre-commit hooks..."
	@$(PRECOMMIT) install
	@echo "Pre-commit hooks installed."

checkupdate: ## Update pre-commit hooks to their latest versions
	@echo "Updating pre-commit hooks..."
	@$(PRECOMMIT) autoupdate
	@echo "Pre-commit hooks updated."

format: ## Automatically format code using configured pre-commit tools (e.g., Black, isort)
	@echo "Formatting code with pre-commit hooks..."
	@$(PRECOMMIT) run --all-files --hook-stage manual format || true
	@echo "Code formatting attempted. Please check for changes."

lint: ## Run linting checks on the codebase (e.g., Flake8, Pylint)
	@echo "Running linting checks..."
	@. $(VENV_DIR)/bin/activate && $(PYTHON) -m flake8 .
	@echo "Linting checks complete."

test: ## Run unit and integration tests
	@echo "Running tests..."
	@. $(VENV_DIR)/bin/activate && $(PYTHON) -m pytest
	@echo "Tests complete."

# ==============================================================================
# Documentation Targets (Example - adjust for your doc tool)
# ==============================================================================

docs: ## Build project documentation (e.g., Sphinx)
	@echo "Building documentation..."
	# Example: If using Sphinx, you might have:
	# @source $(VENV_DIR)/bin/activate && sphinx-build docs/source docs/build
	@echo "Documentation build command placeholder. Configure for your doc tool (e.g., Sphinx)."

# ==============================================================================
# Help Target
# ==============================================================================

help: ## Display this help message
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-25s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Configuration variables can be overridden, e.g.:"
	@echo "  make PYTHON=python3.10 install"
	@echo "  make VENV_DIR=/opt/my_project/venv install"
	@echo ""
