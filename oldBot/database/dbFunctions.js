const { userBag } = require('../utilities/item-arrays.js');
const { logWithTimestamp, replyWithRetry, } = require('../utilities/functions.js');


const sqlite3 = require('sqlite3').verbose();

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
      // Initialize bag count for the user in the 'bag_count' table
      db.run("INSERT INTO bag_count (user_id, bag_count) VALUES (?, 0)", [userId], function (err) {
        if (err) {
          return console.error(err.message);
        }
        logWithTimestamp(`bag count initialized for user ${username}`);
        updateCount(db, 'bag_count', 'bag_count', userId, 1);
      });
      // Initialize coin count for the user in the 'inventory' table
      db.run("INSERT INTO inventory (user_id, coin_count) VALUES (?, 100)", [userId], function (err) {
        if (err) {
          return console.error(err.message);
        }
        logWithTimestamp(`Coin count initialized for user ${username}`);
      });
    }
  });
}

/*
==================================
Update Post Count
When called the function will update the a given column in a table for a user in the database
Modified: 11/30/2023
==================================
*/
function updateCount(db, tableName, columnName, userId, incrementValue) {
  // Prepare the SQL statement
  let sql = `UPDATE ${tableName} SET ${columnName} = ${columnName} + ? WHERE user_id = ?`;

  // Run the SQL statement with the provided parameters
  db.run(sql, [incrementValue, userId], function (err) {
    if (err) {
      return console.error(err.message);
    }
  });
}

/*
=================================
set Value
When called the function will set the value for a user in the database
Modified: 11/30/2023
*/
function setCount(db, tableName, columnName, userId, value) {
  // Prepare the SQL statement
  let sql = `UPDATE ${tableName} SET ${columnName} = ? WHERE user_id = ?`;

  // Run the SQL statement with the provided parameters
  db.run(sql, [value, userId], function (err) {
    if (err) {
      return console.error(err.message);
    }
  });
  console.log(`Set ${columnName} to ${value} for user ${userId}`);
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
Post Count Check
When called the function will check if the user has posted a set number of times
if the user has posted the set number of times the bot will react in various ways including emojis
and replying to the message with gifs
Modified: 11/30/2023
==================================
*/

  function postCountCheck(db, user_id, message) {
    const query = `
    SELECT user_id, post_count
    FROM post_count
    WHERE user_id = ?;
    `;
    db.get(query, [user_id], (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      if (row && Number(row.post_count) == 69) {
        message.reply(`WOW! ${message.author} this is your 69th sludge post!\nhttps://tenor.com/view/future-josh-hutcherson-tongue-out-gif-13846119`);
        message.react('👍');
        message.react('🔥');
        message.react('👌');
        message.react('😎');
        message.react('🍆');
        message.react('👀');
        message.react('👅');
        message.react('💦');
        message.react('🤤');
        message.react('🤙');
        message.react('🤏');

      }
      if(row && Number(row.post_count) == 100) {
        message.reply(`WOW! ${message.author} this is your 100th sludge post!\nSeek professional help.`);
      }
      if (row && Number(row.post_count) == 420) {
        message.reply(`WOW! ${message.author} this is your 420th sludge post!\nhttps://tenor.com/view/snoop-dogg-dance-moves-yes-gif-16124908`);
        message.react('👍');
        message.react('🔥');
        message.react('👌');
        message.react('😎');
        message.react('🍆');
        message.react('👀');
        message.react('👅');
        message.react('💦');
        message.react('🤤');
        message.react('🤙');
        message.react('🤏');
      }
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
  // Send an initial response
  replyWithRetry(interaction, ({ content: 'Processing...', fetchReply: true })).then(initialResponse => {
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

      // Edit the initial response with the result
      initialResponse.edit(`Links Posted as of 11-21-2023:\n${resultString}`);
    });
  });
}

/*
==================================
Delete User
When called the function will delete a user from the database
Modified: 11/30/2023
==================================
*/
function deleteUser(userid,db) {
  // Delete a user from all tables in the database
  console.log(`Deleting user with ID ${userid}`);

  db.run('BEGIN TRANSACTION');

  // Delete from 'users' table
  db.run(`DELETE FROM users WHERE user_id = ?`, [userid], (err) => {
      if (err) console.error('Error deleting from users table:', err.message);
      else console.log(`Deleted from users table for user ID ${userid}`);
  });

  // Delete from 'post_count' table
  db.run(`DELETE FROM post_count WHERE user_id = ?`, [userid], (err) => {
      if (err) console.error('Error deleting from post_count table:', err.message);
      else console.log(`Deleted from post_count table for user ID ${userid}`);
  });

  // Delete from 'bag_count' table
  db.run(`DELETE FROM bag_count WHERE user_id = ?`, [userid], (err) => {
      if (err) console.error('Error deleting from bag_count table:', err.message);
      else console.log(`Deleted from bag_count table for user ID ${userid}`);
  });

  // Commit the transaction
  db.run('COMMIT', (err) => {
      if (err) console.error('Error committing transaction:', err.message);
      else console.log(`User with ID ${userid} deleted from all tables.`);
  });
}

/*
==================================
Coin Check
When called the function will pull out the users coin count from the database
==================================
*/

function coin_check(db, user_id, cost) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT coin_count
    FROM inventory
    WHERE user_id = ?;
    `;
    db.get(query, [user_id], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      if (row && Number(row.coin_count) >= cost) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
/*
==================================
Add to Inventory
When called the function will add an item to the users inventory
==================================
*/
function add_to_inventory(db, user_id, item_id, item_count) {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT OR REPLACE INTO inventory_items (inventory_id, item_id, item_count)
    VALUES (
      (SELECT inventory_id FROM inventory WHERE user_id = ?),
      ?,
      COALESCE((SELECT item_count FROM inventory_items WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?) AND item_id = ?), 0) + ?
    );
    `;
    db.run(query, [user_id, item_id, user_id, item_id, item_count], function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(this.lastID);
    });
    logWithTimestamp(`Item ${item_id} added to inventory for user ${user_id}`);
  });
 
}

/*
==================================
inventory Check
When called the function will pull out the users inventory from the database
==================================
*/
function inventory_check(db, user_id) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT item_id, item_count
    FROM inventory_items
    WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?);
    `;
    db.all(query, [user_id], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(rows);
    });
  });
}

function highest_Coins(db) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT user_id, coin_count
    FROM inventory
    ORDER BY coin_count DESC;
    `;
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(rows);
    });
  });
}

function total_Items(db) {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT COUNT(*) FROM inventory_items;
    `;
    db.get(query, [], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(row);
    });
  });

}


// Export the functions

module.exports = {
  insertUser,
  updateCount,
  algoPosts,
  populateBagFromDatabase,
  deleteUser,
  postCountCheck,
  coin_check,
  inventory_check,
  add_to_inventory,
  highest_Coins,
  total_Items,
  setCount,
};
