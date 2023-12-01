
const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('../botDatabase.db', (err) => {
    if (err) {
      console.error('Error opening database:', err);
    } else {
      console.log('Database opened successfully');
    }
});
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
  db.close((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('==============================\nClosed the database connection.');
});