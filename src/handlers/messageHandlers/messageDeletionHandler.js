const { client } = require('../../client.js');
const { rng } = require('../../utils/rng.js');
const { emojiArray, johnArray, userBag } = require('../../../constants/arrays.js');



/*
When a message is sent in chat a userId is chosen randomly in a defined array and if it matches the message.sender
their message will be deleted.
*/
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

/*
When the client is ready, the bag is populated with the user IDs based on the counts in the bag_count table.
The bag is an array that is used to randomly select users to delete messages from.
*/
client.once('ready', () => {
  // Query to get the user IDs and counts from the bag table

});
