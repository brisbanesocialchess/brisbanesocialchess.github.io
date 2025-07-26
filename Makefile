PYTHON ?= python3
PIP := $(PYTHON) -m pip
PRECOMMIT ?= pre-commit

.PHONY: install i check c checkinstall ci checkupdate cu help
.DEFAULT_GOAL := help

install i: ## Install Python dependencies from requirements.txt
	$(PIP) install -r requirements.txt

check c: ## Run pre-commit checks on all files
	$(PRECOMMIT) run --all-files

checkinstall ci: ## Install pre-commit hooks
	$(PRECOMMIT) install

checkupdate cu: ## Update pre-commit hooks to the latest version
	$(PRECOMMIT) autoupdate

help: ## Display this help message
	@echo "Usage: make <target>"
	@echo
	@echo "Available targets:"
	@grep -E '^[a-z ]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
