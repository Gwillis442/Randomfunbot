/*
Bag Count
When ran will display the number of users in the bag
Modified: 11/30/2023
*/
const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('../botDatabase.db', (err) => {
    if (err) {
      console.error('Error opening database:', err);
    } else {
      console.log('Database opened successfully\n==============================');
    }
});
const bagQuery = `
  SELECT
    u.username,
    b.bag_count AS "bag count",
    SUM(b.bag_count) OVER () AS "total"
  FROM
    users u
  LEFT JOIN
    bag_count b ON u.user_id = b.user_id
  ORDER BY
    CAST(b.bag_count AS INTEGER) DESC;
`;
db.all(bagQuery, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Number in Bag:\n--------------`);
    rows.forEach((row) => {
      console.log(`${row.username}: ${row['bag count']}`);
    });
    console.log(`Total: ${rows[0]['total']}`); // Access the 'total' property of the first row
});
db.close((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('==============================\nClosed the database connection.');
});