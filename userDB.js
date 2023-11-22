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
/*
db.run("DELETE FROM users WHERE user_id = 198297361733255168", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`User with ID 198297361733255168 deleted`);
});
*/
db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
  if (err) {
    console.error(err.message);
    return;
  }

  // Loop through each table and fetch all rows
  tables.forEach((table) => {
    const tableName = table.name;
    console.log(`Table: ${tableName}`);

    // Fetch all rows from the current table
    db.all(`SELECT * FROM ${tableName};`, (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }

      // Display the rows for the current table
      rows.forEach((row) => {
        console.log(row);
      });

      console.log(); // Add a line break between tables for better readability
    });
  });
});

  
// Close the database connection
db.close();
