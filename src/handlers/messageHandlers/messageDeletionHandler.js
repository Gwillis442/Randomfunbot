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
    const messageDelete = rng(1, 100); // Random number to determine if message should be deleted

    if (messageDelete === 1) {
        let id = parseInt(message.author.id);
        let altId = id * (new Date().getSeconds() + new Date().getMilliseconds()/1000);
        altId = altId % (rng(100, 500));
        
        if(Math.floor(altId) === 1){
          message.delete();
          console.log(`Message from: ${message.author.username} deleted.`)
        }else if (message.author.id !== '283865139650756608') { // If author is not John, react with random emoji
          message.react(emojiArray[rng(0, emojiArray.length - 1)]);

        } else { // If author is John, react with random John emoji
          message.react(johnArray[rng(0, johnArray.length - 1)]);
        }
      }
    } catch (error) {
    console.error("Error in message deletion handler: ", error);
  }
});

