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
db.all('SELECT user_id FROM users', [], (err, rows) => {
  if (err) {
    throw err;
  }

  // For each user ID, insert it and a default coin count into the 'inventory' table
  rows.forEach((row) => {
    db.run(`INSERT INTO inventory(user_id, coin_count) VALUES(?, ?)`, [row.user_id, 100], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  });
});