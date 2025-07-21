.PHONY: install i check c checkinstall ci checkupdate cu

install i:
	pip install -r requirements.txt

check c: checkinstall
	pre-commit run --all-files

checkinstall ci: install
	pre-commit install

checkupdate cu: install
	pre-commit autoupdate
