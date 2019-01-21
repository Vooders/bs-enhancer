#! /usr/bin/env bash

echo "packaging App dependecies"
rm -rf dist
mkdir dist
cp -r assets/* dist
cp -r config ts/config
