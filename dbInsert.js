const sqlite3 = require('sqlite3').verbose();

function insertUser(db, userId, username) {
    // Check if the user already exists in the 'users' table
    db.get("SELECT user_id FROM users WHERE user_id = ?", [userId], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
  
      // If the user doesn't exist, insert them into the 'users' table
      if (!row) {
        db.run("INSERT INTO users (user_id, username) VALUES (?, ?)", [userId, username], function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`User ${username} added with ID ${this.lastID}`);
        });
  
        // Initialize post count for the user in the 'post_count' table
        db.run("INSERT INTO post_count (user_id, post_count) VALUES (?, 0)", [userId], function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Post count initialized for user ${username}`);
        });
  
        // Initialize coin count for the user in the 'coin_count' table
        db.run("INSERT INTO coin_count (user_id, coin_count) VALUES (?, 0)", [userId], function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Coin count initialized for user ${username}`);
        });
      }
    });
    db.close();
  }
  
  

module.exports = {
    insertUser,
  };
