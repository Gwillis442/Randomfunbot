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


db.run(`DELETE FROM inventory_items`, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) deleted: ${this.changes}`);
});



db.run(`UPDATE inventory SET coin_count = 100`, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);
});

/*
let date = new Date();
date.setHours(date.getHours() - 25);

db.run(`UPDATE daily SET last_claimed = ?`, date, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);
});
*/