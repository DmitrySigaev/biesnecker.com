#!/usr/bin/env bash

jekyll build
cd _site
s3cmd sync --recursive . s3://biesnecker.com/ --delete-removed --cf-invalidate --cf-invalidate-default-index
cd ..
