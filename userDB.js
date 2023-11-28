const { userBag } = require('./item-arrays');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('botDatabase.db');
const query = `
  SELECT
    u.username,
    pc.post_count AS "Links Posted"
  FROM
    users u
  LEFT JOIN
    post_count pc ON u.user_id = pc.user_id
  ORDER BY
    pc.post_count DESC;
`;
const query1 = `
  SELECT
    u.username,
    b.bag_count AS "bag count"
  FROM
    users u
  LEFT JOIN
    bag_count b ON u.user_id = b.user_id
`;

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

db.run(`
  CREATE TABLE IF NOT EXISTS bag_count (
    user_id INTEGER PRIMARY KEY,
    bag_count INTEGER,
    foreign key (user_id) REFERENCES user(user_id)
  )
`);

/*
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
*/

db.all(query, [], (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }

  // Display the result
  console.log(`tiktok/reel/short links Posted as of 11-21-2023:`);
  rows.forEach((row) => {
    console.log(`${row.username}: ${row['Links Posted']}`);
  });
});

db.all(query1, [], (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log(`Number in Bag`);
  rows.forEach((row) => {
    console.log(`${row.username}: ${row['bag count']}`);
  });
});



/*
db.run("INSERT INTO bag_count (bag_count)SELECT post_cout FROM post_count;", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`bag_count populated`);
});
*/
/*
db.run("UPDATE post_count SET post_count = post_count + 1 WHERE user_id = 283865139650756608", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`post count updated for user with ID 283865139650756608`);
});
*/

// Close the database connection
db.close();
