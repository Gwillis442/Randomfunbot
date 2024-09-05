
import sqlite3

conn = sqlite3.connect('database.db')

cursor = conn.cursor()

cursor.executescript('''
CREATE TABLE  users (
    user_id varchar(50) PRIMARY KEY,
    user_name varchar(50)
);

CREATE TABLE post_count (
    user_id varchar(50) PRIMARY KEY,
    link_count integer,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

Create TABLE bag (
    user_id varchar(50) PRIMARY KEY,
    bag_count integer,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

''')

conn.commit()
conn.close()