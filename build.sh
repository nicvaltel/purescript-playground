#!/bin/bash

cd $1
spago build
spago bundle-app --main Main --to front/scripts/app.js
cd ..
