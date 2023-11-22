const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('botDatabase.db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS post_count (
    user_id INTEGER PRIMARY KEY,
    post_count INTEGER,
    foreign key (user_id) REFERENCES user(user_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS coin_count (
    user_id INTEGER PRIMARY KEY,
    coin_count INTEGER,
    foreign key (user_id) REFERENCES user(user_id)
  )
`);

db.run("DELETE FROM users WHERE user_id = 198297361733255168", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`User with ID 198297361733255168 deleted`);
});

  
// Close the database connection
db.close();
