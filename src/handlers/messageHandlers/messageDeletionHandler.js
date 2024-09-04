const sqlite3 = require('sqlite3').verbose();
const { client } = require('../../client.js');

const db = new sqlite3.Database('./db/messageBot.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the messageBot database.');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const messageDelete = math.random(1, 200); // Random number to determine if message should be deleted
  
    if (messageDelete === 1) {

      const bagPull = math.random(0, (userBag.length - 1));
  
      const bagId = userBag[bagPull]; // Get the correct ID from the bag
  
      if (bagId === message.author.id) { // If ID matches author, delete message
        message.delete()

      } else { //If ID does not match author react to the message
  
        if (message.author.id !== '283865139650756608') { // If author is not John, react with random emoji
          message.react(emojiArray[rng(0, emojiArray.length - 1)]);
    
        } else { // If author is John, react with random John emoji
          message.react(johnArray[rng(0, johnArray.length - 1)]);
        }
      } 
    }
  });