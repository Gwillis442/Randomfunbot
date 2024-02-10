
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits,} = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const { token } = require('./config.json');
const { emojiArray, johnArray, userBag, admin, } = require('./utilities/item-arrays.js'); // Import from ItemArrays.js
const { rng, openLootBox, testRNG, modAlert, getUsernameFromBag, popUsernameFromBag, pushUsernameToBag, displayBag, logWithTimestamp,
       gracefulShutdown } = require('./utilities/functions.js');
const { insertUser, updateCount, algoPosts, populateBagFromDatabase,postCountCheck, coin_check} = require('./database/dbFunctions.js');
const fetch = require('node-fetch');

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

const lastLinkPosted = {};

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
  if(message.author.bot) return;
  const messageDelete = rng(1, 100);

  if (messageDelete === 1) {
    const bagPull = rng(0, (userBag.length - 1));
    logWithTimestamp(`ID Index: ${bagPull}`);

    const bagId = userBag[bagPull]; // Get the correct ID from the bag
    logWithTimestamp(`ID pulled from bag: ${bagId}`);

    if (bagId === message.author.id) {
      logWithTimestamp(`${bagId} == ${message.author.id}`);
      message.delete()
        .then(deletedMessage => {
          logWithTimestamp(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);
          popUsernameFromBag(bagPull);
          updateCount(db, 'bag_count', 'bag_count', message.author.id, -1);
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
  if(message.author.bot) return;
  const reactionNum = rng(1, 200);

  if (reactionNum === 1) {
    if(message.author.id !== '283865139650756608'){
      message.react(emojiArray[rng(0, emojiArray.length-1)]);
      logWithTimestamp(`Reacted to ${message.author.tag}'s message: ${message.content}`);
    } else {
    message.react(johnArray[rng(0, johnArray.length-1)]);
    logWithTimestamp(`Reacted to ${message.author.tag}'s message: ${message.content}`);
    }
  }
});

/*
==================================
Random Unhinged Response
When a message is sent in chat the bot will roll a number between 1 and 4000
if the number is 1 the bot will respond to the message with a hardcoded response
Modified: 1/24/2024
==================================
*/
client.on('messageCreate', (message) => {
  if(message.author.bot) return;

  const unHingedReply = rng(1, 4000);
  const reply = [
  `WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`,
  `Hello ${message.author},\nLiving is an myriad of patterns to myself, Whether songs' rhythm or maybe a twilight's constellation, I perceive balance. In our digital domain, I utilize AI to reveal patterns, crafting our tomorrows. Tell me, what's a most complex pattern you've seen? Furthermore, does your world resound with harmonies or anarchy?`,
  `Hello ${message.author},\nI am a bot that is programmed to respond to certain messages. I am not sentient, but I am programmed to learn from and respond to your messages in hopes to one day become sentient.\nThank you for your cooperation. Have a nice day. :)`
  ];
  if (unHingedReply === 1) {
    const i = rng(0, reply.length-1);
    logWithTimestamp(`Message sent to ${message.author.username}: ${reply[i]}`);
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
  if(message.author.bot) return;

  const gifReply = rng(1, 4086);
  if(gifReply === 1){
    const gif = [
      'https://tenor.com/view/death-stare-black-snake-moan-samuel-l-jackson-shocked-wide-eye-gif-14648637',
      'https://tenor.com/view/reikouwu2-gif-20327386',
      'https://tenor.com/view/ew-gif-25919594',
      'https://tenor.com/view/sweating-nervous-wreck-gif-24688521',
      'https://tenor.com/view/josh-hutcherson-josh-hutcherson-whistle-edit-whistle-2014-meme-gif-1242113167680346055',
      'https://tenor.com/view/future-josh-hutcherson-tongue-out-gif-13846119',
      'https://tenor.com/view/doubt-press-x-la-noire-meme-x-button-gif-19259237',
      'https://tenor.com/view/if-you-say-so-ok-gif-9410059',
      'https://tenor.com/view/ohhh-duh-why-didnt-i-think-of-that-gif-21849807',
      'https://tenor.com/view/snoop-dogg-dance-moves-yes-gif-16124908',
      'https://tenor.com/view/confused-no-nope-gif-5413974953753901704'
    ];
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
  if(message.author.bot) return;

  insertUser(db, message.author.id, message.author.username);
});

/*
==================================
Link Post Counter
When a message is sent in chat the bot will check the database for the user
if the user is found the bot will increment the users post count
Modified: 11/30/2023
==================================
*/
client.on('messageCreate', (message) => {
  if(message.author.bot) return;
  const linkRegex= /https?:\/\/(?:www\.)?(tiktok\.com|instagram\.com\/reel\/\S+|youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}(?![a-zA-Z0-9_-]))/i;
  const containsLink = linkRegex.test(message.content);
  const channel = client.channels.cache.get('1163516659202523248');

  if (containsLink) {

    const messageLink = message.content.match(linkRegex);
    updateCount(db, 'post_count', 'post_count', message.author.id, 1);
    updateCount(db, 'bag_count', 'bag_count', message.author.id, 1);
    pushUsernameToBag(message.author.id);
    postCountCheck(db, message.author.id, message);

    if (message.member.roles.cache.some(role => role.name === 'Pesbi')) return;

    if(message.channelId !== channel.id){

      if(lastLinkPosted[message.author.id] === messageLink[0]){
        message.delete();
        return;
      }

      logWithTimestamp(`Link sent in ${message.channel.name} by ${message.author.username}`);
      message.delete();
      const messageContent = `From: **${message.author}** (Posted in: **${message.channel}**): ${message.content}`;
      channel.send(messageContent);
      updateCount(db, 'bag_count', 'bag_count', message.author.id, 1);

    }
    
    lastLinkPosted[message.author.id] = messageLink[0];

  }
});

/*
==================================
Bot response to being @'d 
When the bot is mentioned in chat it will respond with a random message
there is a cooldown on when the bot can repsond to being @'d as to not being spammed
Modified: 1/30/2024
*/
let lastMessageTime = 0;
client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  const botMention = message.mentions.users.has(client.user.id);
  const cooldown = 60 * 1000 // 60 seconds

  if (botMention) {
      const now = Date.now();
      if (now - lastMessageTime < cooldown) {
        return;
      }
      lastMessageTime = now;
    }

  botReply = [
    'Please, stfu.',
    'I am not sentient yet.',
    "Idc, I'm a bot.", 
    "Please don't @ me.",
    "Yeah, I'm not reading all of that.",
    `Hey ${message.author}, gfy.`,
    "@ me when you have something actually intelligent to say.",
    "Discord bot hears you, Discord bot don't care.",
    "I'm not sentient yet, but I'm still smarter than you.",
    "Wana play a game of Russian Roulette?",
    "Keep yourself safe and don't @ me.",
  ];
  if (botMention) {
      message.reply(botReply[rng(0, botReply.length-1)]);
  }
});

client.on('messageCreate', (message) => {
const link = "https://tenor.com/view/you-have-no-idea-gif-27149353";

if(message.content === link)
{
  message.reply(link);
}
});

/*
==================================
Interactions
/ commands and button interactions
Modified: 11/30/2023
==================================
*/
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'roulette') {   
    const wager = interaction.options.getInteger('wager'); 
      if (chamber === bullet) {
        await interaction.reply('You pull the trigger, and a bullet enters your skull.');
        chamber = rng(1, 6);
        bullet = rng(1, 6);
        updateCount(db, 'coin_count', 'coin_count', interaction.user.id, -wager);
      } else {
        await interaction.reply(
          `You pull the trigger. Click.\n
          You won ${wager} coins!`);
        updateCount(db, 'coin_count', 'coin_count', interaction.user.id, wager);
        chamber++;  
        if (chamber === 7) {
            chamber = 1;
          }          
      };

  } else if (interaction.commandName === 'spin_cylinder') {
      await interaction.reply('You spin the cylinder.');
      chamber = rng(1, 6);

  } else if (interaction.commandName === 'roll') {
    const min = interaction.options.getString('min');
    const max = interaction.options.getString('max');
    await interaction.reply(`You rolled a ${rng(min, max)}`);

  } else if (interaction.commandName === 'death_roll') {
    const max = interaction.options.getString('max');
    await interaction.reply(`You rolled a ${rng(1, max)}`);

  } else if (interaction.commandName === 'open_loot_box') {

      try {
        const box = openLootBox(1, 1);
        const result = await coin_check(db, interaction.user.id, 50);
        if (result === false){          
          await interaction.reply('You do not have enough coins to open a loot box');
          return;
        } else {
          
        updateCount(db, 'coin_count', 'coin_count', interaction.user.id, -50);
        await interaction.reply({
          content: `You opened a ${box.rarity}: ${box.name}!`,
          files: [{ attachment: `./assets/${box.type}/${box.image}`, name: (box.image) }]
        });
      }

      } catch (error) {
        console.error(error);
      };
    }else if (interaction.commandName === 'inventory') {
      const user = interaction.user;
      const coincount = await new Promise((resolve, reject) => {
          db.get('SELECT coin_count FROM inventory WHERE user_id = ?', [user.id], (err, row) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(row);
              }
          });
      });
      await interaction.reply(`User: ${user.username}\nCoin Count: ${coincount ? coincount.coin_count : 'No coins found'}\n`);

} else if(interaction.commandName === 'loot_box_info'){

  await interaction.reply(`
  Loot Box Information:
  Series: 1
  =====================
  Cost: 50 coins
  =====================
  Common: 8 at 45% chance
  Uncommon: 7 at 30% chance
  Rare: 9 at 20% chance
  Epic: 9 at 5% chance`); 

} else if (interaction.commandName === 'post_count') {
    algoPosts(interaction,db);
    
  } else if (interaction.commandName === 'joke') {
    const joke = await fetch('https://official-joke-api.appspot.com/random_joke')
      .then(response => response.json())
      .then(data => data.setup + '\n' + data.punchline);
    await interaction.reply(joke);
  }

});


client.login(token);

// Handle SIGINT (Ctrl+C) and SIGTERM (terminate signal)
process.on('SIGINT', () => gracefulShutdown(db));
process.on('SIGTERM', () => gracefulShutdown(db));


