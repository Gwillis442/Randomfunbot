/*
Edit Count
When called the function will update the count for a user in the database
Modified: 11/30/2023
*/
const { updateCount } = require('../dbFunctions.js');
const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//starting database
const db = new sqlite3.Database('../botDatabase.db', (err) => {
    if (!err) {
        console.log('Database opened successfully');
    } else {
        console.error('Error opening database:', err);      
    }
});
rl.question('Enter the table name: ', (tableName) => {
    rl.question('Enter the column name: ', (columnName) => {
        rl.question('Enter the user ID: ', (userId) => {
            rl.question('Enter the increment value: ', (incrementValue) => {
                // Convert the increment value to a number
                incrementValue = parseInt(incrementValue);

                // Call the updateCount function with the provided values
                updateCount(db, tableName, columnName, userId, incrementValue);

                // Close the readline interface and the database connection
                rl.close();
                db.close((err) => {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                    console.log('==============================\nClosed the database connection.');
                });
            });
        });
    });
});
