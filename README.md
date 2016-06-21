[jakecoppinger.com](http://www.jakecoppinger.com)
=================

A portfolio website for my code, mechatronics, film, and design projects. A static site built with [Gulp.js](http://www.gulpjs.com/) for automated Sass, JS and image optimisation (among other cool things), [Nunjucks](https://mozilla.github.io/nunjucks/) for templating and Markdown for body text.

# Setting up development environment

Make sure Node and NPM are installed
`
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
`

Install dependencies with NPM. This will take a while depending on your internet connection.

`npm install`

### Install bower

Make sure bower is installed
`sudo npm install -g bower`

You may need to install legacy node for Bower to work:
`sudo apt-get install nodejs-legacy`

Install Bower dependencies
`bower install`

### Install gulp

`sudo npm install --global gulp-cli`

## Ububtu
`
sudo apt-get install imagemagick graphicsmagick
`
## Mac OS X (using Homebrew):
`
brew install imagemagick
brew install graphicsmagick
`

## Development

Images are optimised separately to the main development server to optimise speed.
`
gulp images
`

Spin up [Browsersync.io](https://www.browsersync.io) and compile all the things.

`gulp serve
`

## Building

`
gulp build
`

# Author
Design and development by Jake Coppinger, 2016.
