# 
# Youtube Megami Player
![megami logo](https://megamiclub.bg/plovdiv/wp-content/themes/megami-plovdiv/images/logo.png)
## Demo:  <URL HERE>
  
![website screenshot overview](https://i.imgur.com/nIh5u4D.jpg)
## Description 📜
  This is my final project for CS50. It's a dj mixer which uses youtube's iframe api to play songs.
  
 ### Features 💡
  - 2 ways to play a video:
    - using a youtube URL
    - using a song name. the website let's you choose between the 6 most common results from searching Youtube
  - 2 songs playing simultaneously
  - mute song
  - change playback rate
  - adjust song volume
  - a dj crossfader
  
### Files & Directories 📁


  - '&#95;&#95;pycache__' - Python 3 bytecode 
  - 'app' 
    - '&#95;&#95;pycache__' - Python 3 bytecode 
    - 'errors' - Flask error handlers 
      - '&#95;&#95;pycache__'
      - '&#95;&#95;init__.py'
      - 'handlers.py' 
    - 'home' 
      - '&#95;&#95;pycache__'
      - '&#95;&#95;init__.py'
      - 'routes.py' - Flask app routes
    - 'static' - Static Files 
      - 'css' - CSS classes and local images
      - 'scripts'
        - 'main.js' - front end logic
    - 'templates' - Flask Templates i.e. website pages 
    - '&#95;&#95;init__.py'
    - 'config.py' - Flask Config
  - 'venv' - Flask Virtual Environment
  - 'database.db' - Session database - used to remember currently playing songs
  - 'flaskenv.env' - environment variables
  - 'init_db.py' - the script I used to create the database
  - 'package-lock.json'
  - 'package.json' - manage the project's dependencies, scripts, version etc.
  - 'run.py' 
  - 'schema.sql' - database schema
  
  
  
  
  
 ### Technologies used 📟
    - HTML/JavaScript
    - Tailwind CSS
    - Python/FLask
    - SQLite
