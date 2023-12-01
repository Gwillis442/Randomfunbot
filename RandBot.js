
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const { token } = require('./config.json');
const { emojiArray, userBag, } = require('./utilities/item-arrays.js'); // Import from ItemArrays.js
const { rng, openLootBox, testRNG, modAlert, getUsernameFromBag, popUsernameFromBag, pushUsernameToBag, displayBag, logWithTimestamp,
       gracefulShutdown } = require('./utilities/functions.js');
const { insertUser, updateCount, algoPosts, populateBagFromDatabase} = require('./database/dbFunctions.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

//starting database
const db = new sqlite3.Database('./database/botDatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database opened successfully');
  }
});

/*
==================================
Client Ready
When the bot is ready it will log to the console
Modified: 11/30/2023
==================================
*/
client.on('ready', () => {
  logWithTimestamp(`Logged in as ${client.user.tag}`);
    //uncomment to test rng function
    //testRNG();
    populateBagFromDatabase(db, (err) => {
      if (err) {
        console.error('Error populating bag:', err);
      } else {        
        logWithTimestamp('Bag populated successfully');
        //uncomment to display bag contents
        //displayBag();
      }     
    });   
  
});

// var for both bullet and chamber for roulette
var chamber = rng(1, 6);
var bullet = rng(1, 6);

/*
==================================
Message Deletion
The bot will generate a random number between 1 and 100
if number is 1 an ID will be pulled from the bag
if the ID pulled from the bag matches the author of the message the message will be deleted
Modified: 11/30/2023
==================================
*/
client.on('messageCreate', (message) => {
  const messageDelete = rng(1, 100);

  if (messageDelete === 1) {
    const bagPull = rng(0, (userBag.length - 1));
    logWithTimestamp(`ID Index: ${bagPull}`);

    const bagId = getUsernameFromBag(bagPull);
    logWithTimestamp(`ID pulled from bag: ${bagId}`);

    if (bagId === message.author.Id) {
      logWithTimestamp(`${bagID} == ${message.author.id}`);
      message.delete()
        .then(deletedMessage => {
          logWithTimestamp(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);
          popUsernameFromBag(bagPull);
          updateCount(db, message.author.id, -1);
          modAlert(client, message);
        })
        .catch(error => {
          console.error('Error deleting message:', error);
        });
    } else {
      logWithTimestamp(`${bagId} != ${message.author.id}:${message.author.username}`);
    }

  }
});

/*
==================================
Random Reaction
When a message is sent in chat the bot will roll a number between 1 and 100
if the number is 1 it will then roll a number between 1 and 8
dependent on that number the bot will react to the message with the corrosponding emoji
Modified: 11/16/2023
==================================
*/
client.on('messageCreate', (message) => {
  const reactionNum = rng(1, 150);

  if (reactionNum === 1) {
    message.react(emojiArray[rng(0, emojiArray.length-1)]);
    logWithTimestamp(`Reacted to ${message.author.tag} message: ${message.content}`);
  }
});

/*
==================================
Random Unhinged Response
When a message is sent in chat the bot will roll a number between 1 and 2048
if the number is 1 the bot will respond to the message with a hardcoded response
Modified: 11/13/2023
==================================
*/
client.on('messageCreate', (message) => {
  const unHingedReply = rng(1, 2048);
  const reply = [];
  reply[0] = `WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`;
  reply[1] = `Hello ${message.author},\nLiving is an myriad of patterns to myself, Whether songs' rhythm or maybe a twilight's constellation, I perceive balance. In our digital domain, I utilize AI to reveal patterns, crafting our tomorrows. Tell me, what's a most complex pattern you've seen? Furthermore, does your world resound with harmonies or anarchy?`;
  if (unHingedReply === 1) {
    const i = rng(0, reply.length-1);
    logWithTimestamp(`Message sent to ${message.author}`);
    message.channel.send(reply[i]);

  }
});

/*
==================================
Random Gif Response
When a message is sent in chat the bot will roll a number between 1 and 4086
if the number is 1 the bot will respond to the message with a hardcoded gif
Modified: 11/30/2023
==================================
*/
client.on('messageCreate', (message) => {
    const gifReply = rng(1, 4086);
    if(gifReply === 1){
      const gif = [];
      gif[0] = 'https://tenor.com/view/death-stare-black-snake-moan-samuel-l-jackson-shocked-wide-eye-gif-14648637';
      gif[1] = 'https://tenor.com/view/reikouwu2-gif-20327386';
      gif[2] = 'https://tenor.com/view/ew-gif-25919594';
      gif[3] = 'https://tenor.com/view/sweating-nervous-wreck-gif-24688521';
      gif[4] = 'https://tenor.com/view/josh-hutcherson-josh-hutcherson-whistle-edit-whistle-2014-meme-gif-1242113167680346055';
      gif[5] = 'https://tenor.com/view/future-josh-hutcherson-tongue-out-gif-13846119';
      gif[6] = 'https://tenor.com/view/doubt-press-x-la-noire-meme-x-button-gif-19259237';
      gif[7] = 'https://tenor.com/view/if-you-say-so-ok-gif-9410059';
      gif[8] = 'https://tenor.com/view/ohhh-duh-why-didnt-i-think-of-that-gif-21849807';
      gif[9] = 'https://tenor.com/view/snoop-dogg-dance-moves-yes-gif-16124908';
      const i = rng(0, gif.length-1);
      message.reply(`${gif[i]}`);
    }  
});

/*
==================================
Inserting into database
When a message is sent in chat the bot will check the database for the user
if the user is not found the bot will insert the user into the database
Modified: 11/30/2023
==================================
*/
client.on('messageCreate', (message) => {
  const ignoredIds = ['1079857247208882257', '1172025509572530226']; // Specify the IDs to ignore

  if (ignoredIds.includes(message.author.id)) {
    return; // Ignore the specified IDs
  }
  // Add your code here
  insertUser(db, message.author.id, message.author.username);
});

client.login(token);

// Handle SIGINT (Ctrl+C) and SIGTERM (terminate signal)
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);


