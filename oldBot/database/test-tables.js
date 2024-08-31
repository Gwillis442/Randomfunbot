const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./botDatabase.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database opened successfully');
    }
  });

// Fetch all rows from the 'users' table
db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Rows from the "users" table:');
    rows.forEach((row) => {
      console.log(row);
    });
  });
  
  // Fetch all rows from the 'inventory' table
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Rows from the "inventory" table:');
    rows.forEach((row) => {
      console.log(row);
    });
  });
  
  // Fetch all rows from the 'item' table
  db.all('SELECT * FROM item', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Rows from the "item" table:');
    rows.forEach((row) => {
      console.log(row);
    });
  });
  
  // Fetch all rows from the 'series' table
  db.all('SELECT * FROM series', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Rows from the "series" table:');
    rows.forEach((row) => {
      console.log(row);
    });
  });