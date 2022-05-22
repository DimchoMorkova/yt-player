import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO user_sessions (session_id, left_id, right_id) VALUES (?, ?, ?)",
            ('init', 'init', 'init')
            )

connection.commit()
connection.close()