from flask import render_template, session, request, g
from os import listdir
from os.path import isfile, join, isdir

from urllib.parse import quote_plus, unquote_plus

def landing():
    return render_template('index.html')
