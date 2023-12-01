const { userBag } = require('./item-arrays');
const { logWithTimestamp } = require('./functions.js');

const sqlite3 = require('sqlite3').verbose();
//Database Built 11/21/2023
const db = new sqlite3.Database('botDatabase.db');

/*
==================================
Insert User
When called the function will insert a new user into the database
Modified: 11/30/2023
==================================
*/
function insertUser(db, userId, username) {
      // Check if the user already exists in the 'users' table
  db.get("SELECT user_id FROM users WHERE user_id = ?", [userId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    // If the user doesn't exist, insert them into the 'users' table
    if (!row) {
      db.run("INSERT INTO users (user_id, username) VALUES (?, ?)", [userId, username], function (err) {
        if (err) {
          return console.error(err.message);
        }
        logWithTimestamp(`User ${username} added with ID ${this.lastID}`);
      });
      // Initialize post count for the user in the 'post_count' table
      db.run("INSERT INTO post_count (user_id, post_count) VALUES (?, 0)", [userId], function (err) {
        if (err) {
          return console.error(err.message);
        }
        logWithTimestamp(`Post count initialized for user ${username}`);
      });
      // Initialize coin count for the user in the 'coin_count' table
      db.run("INSERT INTO coin_count (user_id, coin_count) VALUES (?, 0)", [userId], function (err) {
        if (err) {
          return console.error(err.message);
        }
        logWithTimestamp(`Coin count initialized for user ${username}`);
      });
      // Initialize bag count for the user in the 'bag_count' table
      db.run("INSERT INTO bag_count (user_id, bag_count) VALUES (?, 0)", [userId], function (err) {
        if (err) {
          return console.error(err.message);
        }
        logWithTimestamp(`bag count initialized for user ${username}`);
      });
    }
  });
  db.close();
}

/*
==================================
Update Post Count
When called the function will update the post count for a user in the database
Modified: 11/30/2023
==================================
*/
function updatePostCount(db, userId, incrementValue) {
  // Update the post_count for the user in the 'post_count' table
  db.run("UPDATE post_count SET post_count = post_count + ? WHERE user_id = ?", [incrementValue, userId], function (err) {
    if (err) {
      return console.error(err.message);
    }
    logWithTimestamp(`Post count updated for user with ID ${userId}`);
  });
}

/*
==================================
Update Bag Count
When called the function will update the bag count for a user in the database
Modified: 11/30/2023
==================================
*/
function updateBagCount(db, userId, incrementValue) {
  // Update the post_count for the user in the 'bag_count' table  
  db.run("UPDATE bag_count SET bag_count = bag_count + ?, Where userid = ?", [incrementValue, userId], function (err) {
    if (err) {
      return console.error(err.message);
    }
    logWithTimestamp(`bag count updated for user with ID ${userId}`);
  });
}

/*
==================================
Populate Bag From Database
When called the function will populate the bag array with users from the database
Modified: 11/30/2023
==================================
*/
function populateBagFromDatabase(db, callback) {
  const query = `
      SELECT user_id, bag_count
      FROM bag_count;
    `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return callback(err);
    }
    // Populate the bag based on the counts in bag_count table
    rows.forEach((row) => {
      const userId = row.user_id;
      const count = row.bag_count;

      for (let i = 0; i < count; i++) {
        userBag.push(userId);
      }    
    });
       // Callback to indicate completion
       callback(null);
  });
}

/*
==================================
Print post count
When called the function will print the post count for all users in the database
Modified: 11/30/2023
==================================
*/
function algoPosts(interaction, db) {
  const query = `
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

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }

    // Format the result as a string
    const resultString = rows.map(row => `${row.username}: ${row['Links Posted']}`).join('\n');

    // Reply to the interaction with the result
    interaction.reply(`Links Posted as of 11-21-2023:\n${resultString}`);
  });
}


module.exports = {
  insertUser,
  updatePostCount,
  algoPosts,
  updateBagCount,
  populateBagFromDatabase,
};
