from distutils.log import debug
from urllib import request
from flask import Flask, render_template, session
from app import app
from __future__ import unicode_literals
from apiclient.discovery import build
from flask_session import Session
import sqlite3
import json
import sys
from datetime import timedelta
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv("flaskenv.env")


if __name__ == "__main__":   
    app = Flask(__name__)
    CORS(app, origins=["http://127.0.0.1:5000/"])
    
    
    app.run(debug=True)
    app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=5)
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True

    Session(app)


@app.route('/session', methods=['POST'])
def session():

    
    return render_template("home.html")


@app.route("/")#, methods=["POST", "GET"])
def index():
    return render_template("home.html")

