
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const { token } = require('./config.json');
const { emojiArray, userBag, } = require('./item-arrays'); // Import from ItemArrays.js
const { rng, openLootBox, testRNG, modAlert, getUsernameFromBag, popUsernameFromBag, pushUsernameToBag, displayBag, logWithTimestamp } = require('./functions.js');
const { insertUser, updatePostCount, algoPosts, populateBagFromDatabase, updateBagCount } = require('./dbFunctions.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

let isBotReady = false;
client.on('ready', () => {
  logWithTimestamp(`Logged in as ${client.user.tag}`);
  if (!isBotReady) {
    //uncomment to test rng function
    //testRNG();
    const db = new sqlite3.Database('botDatabase.db');
    populateBagFromDatabase(db, (err) => {
      if (err) {
        console.error('Error populating bag:', err);
      } else {
        //displayBag();
        logWithTimestamp('Bag populated successfully');        
      }
      isBotReady = true;
    });
  }
  
});

// Set the username to target for message deletion
//const targetUsername = "kony911";


// var for both bullet and chamber fo roulette
var chamber = rng(1, 6);
var bullet = rng(1, 6);


/*
==================================
Message Deletion
Given a specific username (hardcoded) the bot will generate a random number between 1 and 150 
if number is 1 message will be deleted
If not the specific username the bot will instead will generate a random number between 1 and 200
if number is 1 message will be deleted
Modified: 11/13/2023
==================================
*/
/*
client.on('messageCreate', (message) => {
  const channel = client.channels.cache.get('1164650721514369135');
  
  // Check if the message author's username matches the target username
  if (message.author.username === targetUsername) {
    // Generate a random number between 1 and 250
    const singleTargetDelete = rng(1,250);
    
    // If the random number is 1, delete the message
    if (singleTargetDelete === 1) {
      message.delete()
      .then(deletedMessage => {
        logWithTimestamp(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);

        modAlert(client, message);
    
      })
      .catch(console.error);
    }
  } else { //delete for everyone else besides target
    const multiTargetDelete = rng(1,300);

     // If the random number is 1, delete the message
    if (multiTargetDelete === 1) {
      message.delete()
      .then(deletedMessage => {
      logWithTimestamp(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);      
    
      modAlert(client, message);

      });
    }
  }
});
*/

client.on('messageCreate', (message) => {
  const messageDelete = rng(1, 100);
  const db = new sqlite3.Database('botDatabase.db');

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
          updateBagCount(db, message.author.id, -1);
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


  const reactionNum = rng(1, 90);

  if (reactionNum === 1) {

    const reactionNum1 = rng(0, emojiArray.length);
    const customEmoji = [
      ['righty'],
      ['lefty'],
      ['pepegun'],
    ];
    const emoji = customEmoji[rng(0, 2)];
    //Server specific emojis
    emojiArray[0] = message.guild.emojis.cache.find(emoji => emoji.name === 'pepegun');
    message.react(emojiArray[reactionNum]);
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
    const i = rng(0, reply.length);
    message.channel.send(reply[i]);

  }
});

client.on('messageCreate', (message) => {

  const db = new sqlite3.Database('botDatabase.db');
  insertUser(db, message.author.id, message.author.username);

});

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
    updatePostCount(db, userId, incrementValue);
    updateBagCount(db, userId, incrementValue);
    db.close();
    pushUsernameToBag(userId);
  }
});
/*

client.on('messageCreate',(message) => {
  const channel = client.channels.cache.get('1164650721514369135');
  if(message.author.id === '198297361733255168'){
    const multiTargetDelete = 1;//rng(1,300);
     // If the random number is 1, delete the message
    if (multiTargetDelete === 1) {
      message.delete()
      .then(deletedMessage => {
      logWithTimestamp(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);      
        modAlert(client, message);

      });
    }
  }
});
*/

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

  if (commandName === 'roulette') { // Russian Roulette command 1/6 chance to be shot

    const memberVoiceChannel = interaction.member.voice.channel;
    logWithTimestamp(`${interaction.user.tag} played roulette`);
    if (chamber === bullet) {
      await interaction.member.voice.setChannel(null);
      await interaction.reply(`*Bang* ${interaction.user} was shot!`);
      //logWithTimestamp(`${interaction.username} what shot`);
      bullet = rng(1, 6);
      chamber = rng(1, 6);
      //logWithTimestamp('Reseting bullet and chamber');

    } else {
      await interaction.reply(`*click*`);

      chamber++;

      if (chamber === 7) {

        chamber = 1;

      }
      //logWithTimestamp(`Chamber = ${chamber}`);
      //logWithTimestamp(`Bullet = ${bullet}`);

    }

  } else if (commandName === 'spin_cylinder') {// command to reroll random numbers for bullet and chamber

    chamber = rng(1, 6);
    bullet = rng(1, 6);
    await interaction.reply(`${interaction.user} spun the cylinder.`);
    //logWithTimestamp(`Chamber = ${chamber}`);
    //logWithTimestamp(`Bullet = ${bullet}`);

  } else if (commandName === 'roll') { // allows you to roll a random number between 2 user inputs
    const min = options.getString('min');
    const max = options.getString('max');
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const result = rng(minNum, maxNum);
    await interaction.reply(`Random number between ${minNum} and ${maxNum}: ${result}`);

  } else if (commandName === 'death_roll') { //rolls a random number between 1 and user input until a 1 is rolled
    const max = options.getString('max');
    const maxNum = parseInt(max);
    const result = rng(1, maxNum);

    if (result === 1) {
      await interaction.reply(`${interaction.user} rolled a ${result} and lost`);

    } else {
      await interaction.reply(`${interaction.user} rolled a ${result}`);

    }

  } else if (commandName === 'open_loot_box') {
    var randomItem = openLootBox();

    const button = new ButtonBuilder().setCustomId('open_loot_box').setLabel('Open Another Loot Box').setStyle('Primary')
    const row = new ActionRowBuilder().addComponents(button);
    logWithTimestamp(`${interaction.username} opened a loot box`);
    await interaction.reply({
      content: `You got a **${randomItem.name}**!`,
      components: [row],
    });
  } else if (commandName === 'post_count') {
    const db = new sqlite3.Database('botDatabase.db');
    algoPosts(interaction, db);
  }
});



client.login(token);
