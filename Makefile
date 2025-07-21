PYTHON ?= python3
PIP := $(PYTHON) -m pip

.PHONY: install i check c checkinstall ci checkupdate cu help
.DEFAULT_GOAL := help

install i: ## Install python dependencies from requirements.txt
	$(PIP) install -r requirements.txt

check c: ## Run pre-commit checks on all files
	pre-commit run --all-files

checkinstall ci: ## Install pre-commit hooks
	pre-commit install

checkupdate cu: ## Update pre-commit hooks to the latest version
	pre-commit autoupdate

help: ## Display this help message
	@echo "Usage: make <target>"
	@echo
	@echo "Available targets:"
	@grep -E '^[^:]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
