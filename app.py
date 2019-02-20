import os
from flask import Flask, g, session, request, send_from_directory
from flask_misaka import Misaka
from flask_scss import Scss

from routes import *


app = Flask(__name__, static_url_path='')
Misaka(app)
app.debug = True
Scss(app, static_dir='static/css', asset_dir='assets/scss')

@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

app.add_url_rule("/","landing", landing, methods=['GET'])

def before_request():
    app.jinja_env.cache = {}

app.before_request(before_request)