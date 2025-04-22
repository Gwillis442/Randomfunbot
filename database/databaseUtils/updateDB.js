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

function updateRabbits(id){
    const updateRabbits = db.prepare(`UPDATE typingStats SET rabbits = rabbits + 1 WHERE userid = ?`);
    return new Promise((resolve, reject) => {
        updateRabbits.run(id, function (rabbitErr){
            if(rabbitErr){
                db.run('ROLLBACK');
                updateRabbits.finalize;
                return reject(rabbitErr);
            } else {
                return resolve();
            }
        });
    });
}