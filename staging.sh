#!/usr/bin/env bash
# Automated builds and pushes to deployment repo
set -e
# Any subsequent(*) commands which fail will cause the shell script to exit immediately

id="[Staging Script]"

#echo $id "Update build dependencies..."
#npm install
#bower install
#echo $id "Build dependencies updated."

#echo $id "Building..."
#gulp build
#echo $id "Build done."

echo $id "Removing previous staged build..."
rm -rf ../staging_jakecoppinger.com/*

echo $id "Copying new build..."
cp -r dist/. ../staging_jakecoppinger.com/

echo $id "Removing CNAME to remove GitHub conflict..."
rm ../staging_jakecoppinger.com/CNAME

pushd ../staging_jakecoppinger.com/

echo $id "Adding and commiting new files to staging Git..."
git add -A
git commit -m "Automated build and commit @ $(date)"

echo $id "Pushing to staging master..."
git push -f origin master

echo $id
echo $id "Staging completed!"
echo $id "View at https://jakecoppinger.com/staging_jakecoppinger.com/"
