const { userBag } = require('./item-arrays');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('botDatabase.db');
const linkQuery = `
  SELECT
    u.username,
    pc.post_count AS "Links Posted"
  FROM
    users u
  LEFT JOIN
    post_count pc ON u.user_id = pc.user_id
  ORDER BY
    CAST(pc.post_count AS INTEGER) DESC;
`;
const bagQuery = `
  SELECT
    u.username,
    b.bag_count AS "bag count"
  FROM
    users u
  LEFT JOIN
    bag_count b ON u.user_id = b.user_id
  ORDER BY
    CAST(b.bag_count AS INTEGER) DESC;
`;

db.all(linkQuery, [], (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }
  // Log the raw result
  //console.log("Raw result:", rows);
  // Display the result
  console.log(`==============================\nlinks Posted as of 11-21-2023:\n==============================`);
  rows.forEach((row) => {
    console.log(`${row.username}: ${row['Links Posted']}`);
  });
});

db.all(bagQuery, [], (err, rows) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log(`==============\nNumber in Bag:\n==============`);
  rows.forEach((row) => {
    console.log(`${row.username}: ${row['bag count']}`);
  });
});

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

db.run(`
  CREATE TABLE IF NOT EXISTS item (
    item_id INTEGER PRIMARY KEY,
    item_name TEXT,
    item_description TEXT,
    item_rarity TEXT,
    item_value INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS user_item (
    user_id INTEGER,
    item_id INTEGER,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (item_id) REFERENCES item(item_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS loot_box (
    loot_box_id INTEGER PRIMARY KEY,
    loot_box_name TEXT,
    loot_box_description TEXT,
    loot_box_value INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS loot_box_item (
    loot_box_id INTEGER,
    item_id INTEGER,
    foreign key (loot_box_id) REFERENCES loot_box(loot_box_id),
    foreign key (item_id) REFERENCES item(item_id)
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
/*
const userIdToDelete = '1172025509572530226';

console.log(`Deleting user with ID ${userIdToDelete}`);

db.run('BEGIN TRANSACTION');

// Delete from 'users' table
db.run(`DELETE FROM users WHERE user_id = ?`, [userIdToDelete], (err) => {
  if (err) console.error('Error deleting from users table:', err.message);
  else console.log(`Deleted from users table for user ID ${userIdToDelete}`);
});

// Delete from 'post_count' table
db.run(`DELETE FROM post_count WHERE user_id = ?`, [userIdToDelete], (err) => {
  if (err) console.error('Error deleting from post_count table:', err.message);
  else console.log(`Deleted from post_count table for user ID ${userIdToDelete}`);
});

// Delete from 'coin_count' table
db.run(`DELETE FROM coin_count WHERE user_id = ?`, [userIdToDelete], (err) => {
  if (err) console.error('Error deleting from coin_count table:', err.message);
  else console.log(`Deleted from coin_count table for user ID ${userIdToDelete}`);
});

// Delete from 'bag_count' table
db.run(`DELETE FROM bag_count WHERE user_id = ?`, [userIdToDelete], (err) => {
  if (err) console.error('Error deleting from bag_count table:', err.message);
  else console.log(`Deleted from bag_count table for user ID ${userIdToDelete}`);
});

// Commit the transaction
db.run('COMMIT', (err) => {
  if (err) console.error('Error committing transaction:', err.message);
  else console.log(`User with ID ${userIdToDelete} deleted from all tables.`);
});
*/

/*
db.run("INSERT INTO bag_count (bag_count)SELECT post_cout FROM post_count;", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`bag_count populated`);
});
*/
/*
db.run("UPDATE bag_count SET bag_count = bag_count + 1 WHERE user_id = 283865139650756608", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`bag count updated for user with ID 283865139650756608`);
});

db.run("UPDATE post_count SET post_count = post_count + 1 WHERE user_id = 283865139650756608", function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`post count updated for user with ID 283865139650756608`);
});
*/

// Close the database connection
db.close();
