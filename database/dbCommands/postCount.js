/*
Post Count
When ran will display the number of posts each user has
Modified: 11/30/2023
*/
const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('../botDatabase.db', (err) => {
    if (!err) {
        console.log('Database opened successfully\n==============================');
    } else {
        console.error('Error opening database:', err);      
    }
});

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

db.all(linkQuery, [], (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(`links Posted as of 11-21-2023:\n-----------------------------`);
    rows.forEach((row) => {
        console.log(`${row.username}: ${row['Links Posted']}`);
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('==============================\nClosed the database connection.');
});
