#!/bin/bash

git commit -am "Commit changes"
git checkout -B gh-pages
git add -f build
git commit -am "Run build"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
