
import sqlite3

conn = sqlite3.connect('database.db')

cursor = conn.cursor()

cursor.executescript('''
CREATE TABLE  users (
    user_id varchar(50) PRIMARY KEY,
    user_name varchar(50),
);

CREATE TABLE post_count (
    user_id varchar(50) PRIMARY KEY,
    post_count integer
);

Create TABLE bag (
    user_id varchar(50) PRIMARY KEY,
    bag_count integer
);

''')

conn.commit()
conn.close()