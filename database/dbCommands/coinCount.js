/*
Coin Count
When ran will display the number of coins each user has
Modified: 11/30/2023
*/
const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('../botDatabase.db', (err) => {
  if (!err) {
      console.log('Database opened successfully');
  } else {
      console.error('Error opening database:', err);      
  }
});
const coinQuery = `
  SELECT
    u.username,
    c.coin_count AS "Coin Count"
  FROM
    users u
  LEFT JOIN
    coin_count c ON u.user_id = c.user_id
  ORDER BY
    CAST(c.coin_count AS INTEGER) DESC;
`;
db.all(coinQuery, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`==============\nNumber in Bag:\n==============`);
    rows.forEach((row) => {
      console.log(`${row.username}: ${row['Coin Count']}`);
    });
  });
  db.close((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('==============================\nClosed the database connection.');
});