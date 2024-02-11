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

// Fetch all user IDs from the 'users' table
db.all(`SELECT user_id FROM users`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    db.run(
      `INSERT INTO daily (user_id, last_claimed, streak, total_claimed)
       VALUES (?, ?, ?, ?)`,
      [row.user_id, new Date(), 0, 0],
      function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`Row(s) inserted: ${this.changes}`);
      }
    );
  });
});