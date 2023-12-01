/*
Delete User
When ran will delete a user from the database
Modified: 11/30/2023
*/
const { deleteUser } = require('../dbFunctions.js');
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

    rl.question('Enter the User ID: ', (userid) => {
  
                deleteUser(userid,db);

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