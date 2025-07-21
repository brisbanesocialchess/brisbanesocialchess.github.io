.PHONY: check c checkinstall ci checkupdate cu install i

check c: checkinstall
	pre-commit run --all-files

checkinstall ci: install
	pre-commit install

checkupdate cu: checkinstall
	pre-commit autoupdate

install i:
	pip install -r requirements.txt
