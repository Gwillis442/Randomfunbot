const sqlite3 = require('sqlite3').verbose();
const { client } = require('../../client.js');
const { rng } = require('../../utils/rng.js');
const { emojiArray, johnArray, userBag } = require('../../../constants/arrays.js');

const db = new sqlite3.Database('../database/messageCount.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the message/link count database.');
  }
});



client.on('messageCreate', (message) => {

  if (message.author.bot) return;

  try {
    const messageDelete = rng(1, 200); // Random number to determine if message should be deleted

    if (messageDelete === 1) {

      const bagPull = rng(0, (userBag.length - 1));

      const bagId = userBag[bagPull]; // Get the correct ID from the bag

      if (bagId === message.author.id) { // If ID matches author, delete message
        message.delete();
        userBag.splice(bagPull, 1); // Remove user from bag

      } else { //If ID does not match author react to the message

        if (message.author.id !== '283865139650756608') { // If author is not John, react with random emoji
          message.react(emojiArray[rng(0, emojiArray.length - 1)]);

        } else { // If author is John, react with random John emoji
          message.react(johnArray[rng(0, johnArray.length - 1)]);
        }
      }
    }
  } catch (error) {
    console.error("Error in message deletion handler: ", error);
  }
});


client.once('ready', () => {

  const query = `
  SELECT user_id, bag_count
  FROM bag;
`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    // Populate the bag based on the counts in bag_count table
    rows.forEach((row) => {
      const userId = row.user_id;
      const count = row.bag_count;

      for (let i = 0; i < count; i++) {
        userBag.push(userId);
      }
    });

    console.log('Bag has been populated.');
    console.log(`${ userBag.length } users in the bag.`);
    
  });


});
