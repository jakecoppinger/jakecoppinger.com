#!/usr/bin/env bash

# A setup script for bare Ubuntu systems

# Stop script if command fails
set -e

sudo apt-get update
sudo apt-get -y  upgrade

# Install node
sudo apt-get -y install nodejs

# The nodejs-legacy package installs a node symlink that is needed by many modules to build and run correctly
sudo apt-get install nodejs-legacy

# Install npm
sudo apt-get -y install npm

# Install Gulp with npm
sudo npm install --global gulp-cli

# Install npm-check-updates with npm - helps upgrade dependencies using `ncu`
sudo npm install --global npm-check-updates

# Install Bower with npm
sudo npm install -g bower

# Install image resizing utilities
sudo apt-get install -y imagemagick graphicsmagick 

# Install Bower components
bower install

# Install npm components
npm install

echo "Setup done."
