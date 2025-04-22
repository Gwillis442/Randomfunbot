const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../botDB.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database at:', dbPath);
    }
});

function insertUser(id, username, nickname) {
    return new Promise((resolve, reject) => {

        const insertUserQuery = db.prepare(`
                INSERT OR IGNORE INTO users(userid, username, nickname)
                VALUES (?, ?, ?)    
            `);
        const insertTypingQuery = db.prepare(`
                INSERT OR IGNORE INTO typingStats(userid, rabbits, turtles)
                VALUES (?, 0, 0)
            `);
        const insertLinkQuery = db.prepare(`
                INSERT OR IGNORE INTO linkStats(userid, count)
                VALUES (?,0)    
            `);

        insertUserQuery.run(id, username, nickname, function (userErr) {
            if (userErr) {
                db.run('ROLLBACK');
                insertUserQuery.finalize();
                insertTypingQuery.finalize();
                insertLinkQuery.finalize();
                return reject(userErr);
            }
        });

        insertTypingQuery.run(id, function (typingErr) {
            if (typingErr) {
                db.run('ROLLBACK');
                insertUserQuery.finalize();
                insertTypingQuery.finalize();
                insertLinkQuery.finalize();
                return reject(typingErr);
            }
        });

        insertLinkQuery.run(id, function (linkErr) {
            if (linkErr) {
                db.run('ROLLBACK');
                insertUserQuery.finalize();
                insertLinkQuery.finalize();
                insertTypingQuery.finalize();
                return reject(linkErr);
            }
        });

        // Close the connection when done
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed');
            }
        });
    });


}

module.exports = {
    insertUser,
}


