
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const { token } = require('./config.json');
const { emojiArray, userBag, } = require('./item-arrays'); // Import from ItemArrays.js
const { rng, openLootBox, testRNG, modAlert, getUsernameFromBag, popUsernameFromBag, pushUsernameToBag, displayBag, logWithTimestamp,
       gracefulShutdown } = require('./functions.js');
const { insertUser, updateCount, algoPosts, populateBagFromDatabase} = require('./dbFunctions.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const db = new sqlite3.Database('botDatabase.db');
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

//Creating random chance to have bot respond with 1 of 8 emotes
client.on('messageCreate', (message) => {


  const reactionNum = rng(1, 150);

  if (reactionNum === 1) {

    const reactionNum1 = rng(0, emojiArray.length-1);
    const customEmoji = [
      ['righty'],
      ['lefty'],
      ['pepegun'],
    ];
    const emoji = customEmoji[rng(0, 2)];
    //Server specific emojis
    emojiArray[0] = message.guild.emojis.cache.find(emoji => emoji.name === 'pepegun');
    message.react(emojiArray[reactionNum1]);
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
  const db = new sqlite3.Database('botDatabase.db');
  const ignoredIds = ['1079857247208882257', '1172025509572530226']; // Specify the IDs to ignore

  if (ignoredIds.includes(message.author.id)) {
    return; // Ignore the specified IDs
  } else {
    insertUser(db, message.author.id, message.author.username);
   
  }
 
});

/*
==================================
Post Count
When a message is sent in chat the bot will check the database for the user 
if the user is found the bot will increment the users post count
Modified: 11/30/2023
==================================
*/
client.on('messageCreate', (message) => {
  // Check if the message is in the 'the-algo' channel

  // Check if the message contains a TikTok, Instagram Reel, or YouTube Short link
  const containsLink = /https?:\/\/(?:www\.)?(tiktok\.com|instagram\.com\/reel\/\S+|youtu\.be|youtube\.com\/shorts\/\S{11})/i.test(message.content);
  if (containsLink) {
    // Get the user ID from the message author
    const userId = message.author.id;

    // Call the function to update the post count (you might adjust the increment value)
    const incrementValue = 1; // You can adjust this value based on your requirements
    const db = new sqlite3.Database('botDatabase.db');
    updateCount(db,'post_count','post_count', userId, incrementValue);
    updateCount(db,'bag_count','bag_count', userId, incrementValue);
    pushUsernameToBag(userId);
  }
});

/*
==================================
Interaction builder
Holds logic for the user using a / command
Dependcies found in 'deploy-commands.js'
Modified: 11/13/2023
==================================
*/

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  switch (commandName) {
    case 'roulette': {
      const memberVoiceChannel = interaction.member.voice.channel;
      logWithTimestamp(`${interaction.user.tag} played roulette`);
      if (chamber === bullet) {
        await interaction.member.voice.setChannel(null);
        await interaction.reply(`*Bang* ${interaction.user} was shot!`);
        bullet = rng(1, 6);
        chamber = rng(1, 6);
      } else {
        await interaction.reply(`*click*`);
        chamber++;
        if (chamber === 7) {
          chamber = 1;
        }
      }
      break;
    }
    case 'spin_cylinder': {
      chamber = rng(1, 6);
      bullet = rng(1, 6);
      await interaction.reply(`${interaction.user} spun the cylinder.`);
      break;
    }
    case 'roll': {
      const min = options.getString('min');
      const max = options.getString('max');
      const minNum = parseInt(min);
      const maxNum = parseInt(max);
      const result = rng(minNum, maxNum);
      await interaction.reply(`Random number between ${minNum} and ${maxNum}: ${result}`);
      break;
    }
    case 'death_roll': {
      const max = options.getString('max');
      const maxNum = parseInt(max);
      const result = rng(1, maxNum);
      if (result === 1) {
        await interaction.reply(`${interaction.user} rolled a ${result} and lost`);
      } else {
        await interaction.reply(`${interaction.user} rolled a ${result}`);
      }
      break;
    }
    case 'open_loot_box': {
      var randomItem = openLootBox();
      const button = new ButtonBuilder()
        .setCustomId('open_loot_box')
        .setLabel('Open Another Loot Box')
        .setStyle('Primary')
        .setDisabled(false); // Enable the button

      const row = new ActionRowBuilder().addComponents(button);
      logWithTimestamp(`${interaction.username} opened a loot box`);
      await interaction.reply({
        content: `You got a **${randomItem.name}**!`,
        components: [row],
      });
    
      break;
    }
    case 'post_count': {
      algoPosts(interaction, db);
      db.close();
      break;
    }
    default:
      break;
  }
});

client.login(token);

// Handle SIGINT (Ctrl+C) and SIGTERM (terminate signal)
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);


