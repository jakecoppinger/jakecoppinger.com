#!/usr/bin/env python3
from app import app
import os

app.secret_key = os.urandom(12)
app.run(host='0.0.0.0',debug=True)