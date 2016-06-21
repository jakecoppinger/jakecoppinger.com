# **[departing.io](http://www.departing.io)** is a web application designed to answer one question, and answer it well:
# *“when will the next bus come?”* 




[**Departing.io**](http://www.departing.io) - A web app for real time bus ACTION bus arrivals in Canberra, Australia. I developed this web app through year 12 as part of my media studies, and later released it as open source under the GPL license.

## [github.com/jakecoppinger/departing.io](https://github.com/jakecoppinger/departing.io)


Try it on your smartphone at [departing.io](http://www.departing.io)!

Philosophy
----------
While the software for planning trips is well established (such as Google Maps) I found it was still a chore to find when the next bus would arrive. The LED screens at major bus stations are helpful but they may only show 5 buses at a time - which may not include the one you are looking for. I created Designless.io for the sole purpose of finding when the next bus on a route will depart from a given stop.

The use case
------------
1. Open the web app from the home screen of your smartphone
2. Type the first few letters of the bus stop you are at and select from the menu
3. If there is more than one route departing select the desired bus route
4. See how many minutes and seconds until the bus arrives in real time

Technical details
-----------------

To run an instance of the web app you will need to apply for an [ACTION NXTBUS API key](https://www.action.act.gov.au/rider_Info/apps/nxtbus-data-feed-registration-form). You will receive the key in an email along with some documentation. To keep your key private the app receives the key as the environment variable **NXTBUS\_API\_KEY** (described in the Running App section)

This web app uses:

- Python Tornado as a non-blocking web server
- Processing to visualise the information, translated into JavaScript and shown on an HTML5 Canvas
- Heroku for hosting
- npm for managing Gulp dependencies and installing bower (`package.json`)
- Bower for managing front end dependencies (`bower.json`)
- Gulp used to compile SCSS, lint JavaScript and minify (`gulpfile.js`)

Development prerequisites
-------------------------
On Mac OSX, first install Homebrew:
`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### Install Node
Mac:

`brew update`

`brew install -g node`

Ubuntu:

`sudo apt-get update`

`sudo apt-get install nodejs`

### Install Pip (Python package manager)

As per https://pip.pypa.io/en/latest/installing.html

`wget https://bootstrap.pypa.io/get-pip.py`

`sudo python get-pip.py`

Installing dependencies
---------------

1. Clone repository
`git clone https://github.com/jakecoppinger/departing.io.git`
`cd departing.io`

2. Install Node dependencies
`npm install`

3. Install Bower dependencies
`bower install`
(you must do this after installing Node dependencies as that will install Bower)

4. Python dependencies
`sudo pip install -r requirements.txt`

Running app
-----------

### Export ACTION NXTBUS API key

Where APIKEY is your key:

`export NXTBUS_API_KEY=APIKEY`

You can add this line to your `~/.bashrc` file to skip this step in future.

### Lint JavaScript and build SCSS files
`gulp`

### Start server 

`python main.py --host=HOST`

Where HOST is IP address or domain. For testing on local machine, use `localhost`, for testing on local network (including smartphones) use local IP address (`ifconfig`)