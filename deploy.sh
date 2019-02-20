#!/usr/bin/env bash
# Automated builds and pushes to deployment repo
set -e

id="[Deploy Script]"

echo $id "Removing previous deploy build..."
rm -rf ~/repos/jakecoppinger.github.io/*
echo $id "Removing previous deploy build done."

echo $id "Copying new build..."
cp -r build/. ~/repos/jakecoppinger.github.io/
echo $id "Copying new build done."

pushd ~/repos/jakecoppinger.github.io/

echo $id "Adding and commiting new files to deply Git..."
git add -A
git commit -m "Automated build and commit @ $(date)"
echo $id "Adding and commiting new files to deply Git done."

echo $id "Pushing to master..."
git push -f origin master
echo $id "Master push done."

echo $id
echo $id "Deploy completed!"
