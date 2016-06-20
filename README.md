JakeCoppinger.com
=================

**In active development**

## Setting up
Install dependencies with NPM. This will take a while depending on your internet connection.

`npm install `
`bower install`

### Ububtu
`
apt-get install imagemagick
apt-get install graphicsmagick
`
### Mac OS X (using Homebrew):
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
