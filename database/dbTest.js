const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('./botDB.db');

db.serialize(() => {

    db.run(`
        INSERT OR IGNORE INTO users(userid, username, nickname) 
        VALUES('test', 'test', 'test')    
    `);

    db.all(`
        SELECT * FROM users
    `, [], (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(rows);
    });

})