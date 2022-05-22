from asyncio.windows_events import NULL
from smtplib import SMTPResponseException
from flask import Blueprint, render_template, request, Flask
from random import randint
import json
import sqlite3
from youtubesearchpython import VideosSearch


home = Blueprint('home', __name__)


# connect to database
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@home.route('/home')

@home.route('/', methods=['GET', 'POST'])

def homepage():
    conn = get_db_connection() # connect to database
    cur = conn.cursor() # create a cursor, to execute sql commands on the database
    
    # what we insert into the database   
    insert = (request.remote_addr, "es0XrAIDCsU", "sBw4iyzXQko")
    
    # execute sql command to query initial values for every user
    # skip if the user already has these
    cur.execute("INSERT OR IGNORE INTO user_sessions(session_id, left_id, right_id) VALUES (?, ?, ?);", insert )

    # sql command to select last video ids of the user
    # user is identified by his IP address
    cur.execute("SELECT left_id, right_id FROM user_sessions WHERE session_id = ?", (request.remote_addr,))
    
    # fetch all rows from the selection
    session = cur.fetchall()
    
    conn.commit(); # commit all changes, close connection
    
        

    
    
    # pass these video ids to our home template, which loads them into the iframe player
    return render_template('home.html', title='Home', session = session[0])


@home.route('/about')
def about():
    return render_template('about.html', title='About')


@home.route('/session', methods=['POST'])
def session():
    conn = get_db_connection() # connect to database
    
    output = request.get_json() # get json input from front end
    
    sessionInfo = json.loads(output)  # convert json to normal string
    
    cur = conn.cursor() # create a cursor, to execute sql commands on the database
    
    print(sessionInfo)
    
    
    if sessionInfo['left_id'] != None:
        insert = ( sessionInfo['left_id'], request.remote_addr,)
        cur.execute("UPDATE user_sessions SET left_id = ? WHERE session_id=? ;", insert ) 
    elif sessionInfo['right_id'] != None:
        insert = ( sessionInfo['right_id'], request.remote_addr,)
        cur.execute("UPDATE user_sessions SET right_id = ? WHERE session_id=? ;", insert ) 
    else: 
        # what we insert into the database    
        insert = ( sessionInfo['left_id'], sessionInfo['right_id'], request.remote_addr,)
        
        # execute sql command to update the database
        cur.execute("UPDATE user_sessions SET left_id = ?, right_id = ? WHERE session_id=? ;", insert ) 
    
    conn.commit(); # commit all changes, close connection
    return render_template("home.html")