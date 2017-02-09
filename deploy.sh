#!/usr/bin/env bash
# Automated builds and pushes to deployment repo
set -e
# Any subsequent(*) commands which fail will cause the shell script to exit immediately

id="[Deploy Script]"

#echo $id "Update build dependencies..."
#npm install
#bower install
#echo $id "Build dependencies updated."

#echo $id "Building..."
#gulp build
#echo $id "Build done."

echo $id "Removing previous build..."
rm -rf ../jakecoppinger.github.io/*
echo $id "Removing previous build done."

echo $id "Copying new build..."
cp -r dist/. ../jakecoppinger.github.io/
echo $id "Copying new build done."

pushd ../jakecoppinger.github.io/

echo $id "Adding and commiting new files to Git..."
git add -A
git commit -m "Automated build and commit @ $(date)"
echo $id "Adding and commiting new files to Git done."

echo $id "Pushing to master..."
git push -f origin master
echo $id "Master push done."

echo $id
echo $id "Deploy completed!"
