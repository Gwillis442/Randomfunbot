const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('./botDB.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database opened successfully');
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            userid TEXT PRIMARY KEY,
            username TEXT,
            nickname TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS typingStats(
            userid TEXT PRIMARY KEY,
            rabbits INTEGER,
            turtles INTEGER,
            FOREIGN KEY (userid) REFERENCES users(userid)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS linkStats(
            userid TEXT PRIMARY KEY,
            count INTEGER,
            FOREIGN KEY (userid) REFERENCES users(userid)
        )
    `);

})
