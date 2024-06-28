const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');

const db = new sqlite3.Database('../database/botDatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Monthly Task Connected to database.');
});

function bagReset() {
    const query = 'UPDATE users SET bag_count = 1 WHERE bag_count >= 0';
    db.run(query, function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Bag Reset');
    });
}

function monthlyTask() {
    cron.schedule('0 0 1 * *', () => {
        bagReset();
    });
}


module.exports = {
    monthlyTask
    };