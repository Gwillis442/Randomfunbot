const { userBag } = require('../utilities/item-arrays');

const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('./botDatabase.db', (err) => {
  if (err) {
      console.error('Error opening database:', err);
  } else {
      console.log('Database opened successfully');
  }
});
db.serialize(() => {
  // Step 1: Rename the old tables
  db.run(`ALTER TABLE users RENAME TO temp_users;`);
  db.run(`ALTER TABLE post_count RENAME TO temp_post_count;`);
  db.run(`ALTER TABLE coin_count RENAME TO temp_coin_count;`);
  db.run(`ALTER TABLE bag_count RENAME TO temp_bag_count;`);

  // Step 2: Create new tables with the correct structure
  db.run(`
    CREATE TABLE users (
      user_id TEXT PRIMARY KEY,
      username TEXT
    );
  `);
  db.run(`
    CREATE TABLE post_count (
      user_id TEXT PRIMARY KEY,
      post_count INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
  `);
  db.run(`
    CREATE TABLE coin_count (
      user_id TEXT PRIMARY KEY,
      coin_count INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
  `);
  db.run(`
    CREATE TABLE bag_count (
      user_id TEXT PRIMARY KEY,
      bag_count INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
  `);

  // Step 3: Copy the data from the old tables to the new ones
  db.run(`INSERT INTO users SELECT * FROM temp_users;`);
  db.run(`INSERT INTO post_count SELECT * FROM temp_post_count;`);
  db.run(`INSERT INTO coin_count SELECT * FROM temp_coin_count;`);
  db.run(`INSERT INTO bag_count SELECT * FROM temp_bag_count;`);


  // Step 4: Delete the old tables
  db.run(`DROP TABLE temp_users;`);
  db.run(`DROP TABLE temp_post_count;`);
  db.run(`DROP TABLE temp_coin_count;`);
  db.run(`DROP TABLE temp_bag_count;`);
});

db.close((err) => {
  if (err) {
      console.error(err.message);
      return;
  }
  console.log('==============================\nClosed the database connection.');
});
