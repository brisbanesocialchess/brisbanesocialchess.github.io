#!/bin/bash
# Check if the branch is gh-pages
if [ "$CF_PAGES_BRANCH" == "gh-pages" ]; then
	echo "Skipping build for gh-pages branch."
	exit 0
fi

# Navigate to your actual worker subdirectory and build
cd packages/cfsite || exit
