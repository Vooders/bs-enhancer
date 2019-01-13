#! /usr/bin/env bash

echo "packaging App dependecies"
rm -rf dist
mkdir dist
cp -r css dist/css
cp -r icons dist/icons
cp -r config ts/config
cp manifest.json dist/manifest.json

browserify ts/start.js > dist/enhance.js