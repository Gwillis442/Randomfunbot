
const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, AttachmentBuilder  } = require('@discordjs/builders');
const { Client, GatewayIntentBits, EmbedBuilder, } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const { token } = require('./config.json');
const { emojiArray, johnArray, userBag, admin, } = require('../utilities/item-arrays.js'); // Import from ItemArrays.js
const { rng, testRNG, modAlert, getUsernameFromBag, popUsernameFromBag, pushUsernameToBag, displayBag, logWithTimestamp,
  gracefulShutdown, dailyReward } = require('../utilities/functions.js');
const { loot_box_info, lb_series_1, inventory, choose_series, choose_type, open_loot_box, leaderboard_coins, leaderboard_items} = require('../utilities/embedFunctions.js');
const { insertUser, updateCount, algoPosts, populateBagFromDatabase, postCountCheck, coin_check, setCount } = require('../database/dbFunctions.js');
const fetch = require('node-fetch');
const { buttons, actionRows } = require('../utilities/interactionBuilders.js');
const { createCanvas, forestBiome, oceanBiome, jungleBiome, undergroundBiome, desertBiome } = require('../utilities/canvasFunctions.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: ['MESSAGE', 
    'CHANNEL', 
    'REACTION'
  ],
});
client.setMaxListeners(15);
//starting database
const db = new sqlite3.Database('../database/botDatabase.db', (err) => {
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
  const channel = client.channels.cache.get('1221937876888191027');
  channel.messages.fetch('1221940610194346065') // replace 'message_id' with the ID of the message
    .then(message => {
      const filter = (reaction, user) => ['🔴', '🟡', '🟢'].includes(reaction.emoji.name) && !user.bot;
      const collector = message.createReactionCollector({ filter });

      collector.on('collect', (reaction, user) => {
        const member = reaction.message.guild.members.cache.get(user.id);
        let role;

        if (reaction.emoji.name === '🔴') {
          role = reaction.message.guild.roles.cache.find(role => role.name === 'Role 1');
        } else if (reaction.emoji.name === '🟡') {
          role = reaction.message.guild.roles.cache.find(role => role.name === 'Role 2');
        } else if (reaction.emoji.name === '🟢') {
          role = reaction.message.guild.roles.cache.find(role => role.name === 'Role 3');
        }

        if (role) {
          member.roles.add(role).catch(console.error);
        }
      });
    })
    .catch(console.error);

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
  if (message.author.bot) return;
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
          updateCount(db, 'inventory', 'coin_count', message.author.id, 25);
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
  if (message.author.bot) return;
  const reactionNum = rng(1, 200);

  if (reactionNum === 1) {
    if (message.author.id !== '283865139650756608') {
      message.react(emojiArray[rng(0, emojiArray.length - 1)]);
      updateCount(db, 'inventory', 'coin_count', message.author.id, 10);
      logWithTimestamp(`Reacted to ${message.author.tag}'s message: ${message.content}`);

    } else {
      message.react(johnArray[rng(0, johnArray.length - 1)]);
      updateCount(db, 'inventory', 'coin_count', message.author.id, 10);
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
  if (message.author.bot) return;

  const unHingedReply = rng(1, 4000);
  const reply = [
    `WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`,
    `Hello ${message.author},\nLiving is an myriad of patterns to myself, Whether songs' rhythm or maybe a twilight's constellation, I perceive balance. In our digital domain, I utilize AI to reveal patterns, crafting our tomorrows. Tell me, what's a most complex pattern you've seen? Furthermore, does your world resound with harmonies or anarchy?`,
    `Hello ${message.author},\nI am a bot that is programmed to respond to certain messages. I am not sentient, but I am programmed to learn from and respond to your messages in hopes to one day become sentient.\nThank you for your cooperation. Have a nice day. :)`
  ];
  if (unHingedReply === 1) {
    const i = rng(0, reply.length - 1);
    updateCount(db, 'inventory', 'coin_count', message.author.id, 25);
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
  if (message.author.bot) return;

  const gifReply = rng(1, 4086);
  if (gifReply === 1) {
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
      'https://tenor.com/view/confused-no-nope-gif-5413974953753901704',
      `https://tenor.com/view/jarvis-iron-man-goon-gif-5902471035652079804`
    ];
    const i = rng(0, gif.length - 1);
    updateCount(db, 'inventory', 'coin_count', message.author.id, 20);
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
  if (message.author.bot) return;

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
  if (message.author.bot) return;
  const linkRegex = /https?:\/\/(?:www\.)?(tiktok\.com|instagram\.com\/reel\/\S+|youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}(?![a-zA-Z0-9_-]))/i;
  const containsLink = linkRegex.test(message.content);
  const channel = client.channels.cache.get('1200161072980705353');
  const currTime = new Date().getHours();

  if (containsLink) {

    let messageLink = message.content.match(linkRegex)[0];

    if (messageLink.includes('tiktok.com') && !messageLink.includes('vxtiktok.com')) {
      // Replace 'tiktok' with 'vx.tiktok'
      messageLink = messageLink.replace('tiktok.com', 'vxtiktok.com');
      message.delete();
      const messageContent = `${message.author}, please try to use 'vxtiktok' for better user experience.\n${message.content.replace(linkRegex, messageLink)}`;
      channel.send(messageContent);
    }

    updateCount(db, 'post_count', 'post_count', message.author.id, 1);
    updateCount(db, 'bag_count', 'bag_count', message.author.id, 1);
    pushUsernameToBag(message.author.id);
    postCountCheck(db, message.author.id, message);

    if (currTime >= 0 && currTime <= 8) {
      updateCount(db, 'inventory', 'coin_count', message.author.id, -10);
    } else {
      updateCount(db, 'inventory', 'coin_count', message.author.id, 10);
    }

    if (admin.some(adminUser => adminUser.id === message.author.id)) {
      return;
    }

    if (message.channelId !== channel.id) {

      if (lastLinkPosted[message.author.id] === messageLink[0]) {
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

    updateCount(db, 'inventory', 'coin_count', message.author.id, 10);

    message.reply(botReply[rng(0, botReply.length - 1)]);
  }
});

/*
==================================
Passive Coin Gain
Every 5 messages sent by a user the bot will increment the users coin count by 5
Modified: 2/10/2024
==================================
*/
let messageCount = 0;
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  messageCount++;
  if (messageCount % 5 == 0) {
    updateCount(db, 'inventory', 'coin_count', message.author.id, 5);
  }
});

/*
 ====================================
 link reply
 ====================================
*/
client.on('messageCreate', (message) => {
  if(message.author.bot) return;
  const link = "https://tenor.com/view/you-have-no-idea-gif-27149353";

  if (message.content === link) {
    message.reply(link);
  }
});


/*
==================================
Weed Too Loud
When a message is sent in chat the bot will check if the message contains the custom emoji :weedtooloud:
if the message contains the emoji the bot will respond with the emoji
Modified: 2/13/2023
==================================
*/
client.on('messageCreate', message => {
  if(message.author.bot) return;
  const customEmoji = client.emojis.cache.find(emoji => emoji.name === 'weedtooloud');
  if (message.content.includes(':weedtooloud:')) {
      message.channel.send( `${customEmoji}`);
  }
});

/*
==================================
Racism reply bot
When a message is sent by a user with the racism role the bot will respond with a message
Modified: 5/1/2024
==================================
*/
client.on('messageCreate', message => {
  if(message.author.bot) return;
  let num = rng(1, 100);
  if(num === 1) {
      if (message.member.roles.cache.some(role => role.name === 'racism')) {
        message.reply('Racism is not tolerated here. Please refrain from using racist language.');
      }
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
 // Create an object to store the history of each user's interactions
  const userHistories = {};
  switch (interaction.commandName) {

    // roulette command
    // When called the function will check the users coin count
    // if the user has enough coins the function will run a roulette game
    // if the user does not have enough coins the function will return an error message
    // Modified: 2/10/2024
    case 'roulette':

      var wager = interaction.options.getInteger('wager');
      if (wager == -1) {
        db.get(`SELECT coin_count FROM inventory WHERE user_id = ?`, [interaction.user.id], (err, row) => {
          if (err) {
            console.error(err.message);
            return;
          }
          if (row) {
            wager = row.coin_count;
          } else {
            interaction.reply('You do not have any coins to wager.');
            return;
          }
        });
      }

      if (wager < -1) {
        await interaction.reply({ content: 'The wager amount must be a greater than -1.', ephemeral: true });
        return;
      }

      const result1 = await coin_check(db, interaction.user.id, wager);
      if (result1 === false) {
        await interaction.reply({ content: `Not enough coins to wager`, ephemeral: true });
        return;
      }

      if (chamber === bullet) {

        await interaction.reply(`A bullet enters your skull. You lose everything.\nhttps://tenor.com/view/russian-roulette-cat-gun-you-died-dark-souls-gif-26086308`);
        chamber = rng(1, 6);
        bullet = rng(1, 6);

        db.run(`UPDATE inventory SET coin_count = '0' WHERE user_id = ?`, [interaction.user.id], function (err) {
          if (err) {
            return console.log(err.message);
          }
        });

      } else {
        await interaction.reply(
          `You pull the trigger. \n${wager} coins added to inventory.`);
        updateCount(db, 'inventory', 'coin_count', interaction.user.id, wager);
        chamber++;
        if (chamber === 7) {
          chamber = 1;
        }
      };
      break;

    // spin cylinder command
    // When called the function will return a random number between 1 and 6
    // Modified: 2/10/2024
    case 'spin_cylinder':
      await interaction.reply('You spin the cylinder.');
      chamber = rng(1, 6);
      break;

    // roll command
    // When called the function will return a random number between the min and max values
    // Modified: 2/10/2024
    case 'roll':
      const min = interaction.options.getString('min');
      const max = interaction.options.getString('max');
      await interaction.reply(`You rolled a ${rng(min, max)}`);
      break;

    // death roll command
    // When called the function will return a random number between 1 and the max value
    // Modified: 2/10/2024
    case 'death_roll':
      const max2 = interaction.options.getString('max');
      await interaction.reply(`You rolled a ${rng(1, max2)}`);
      break;

    // open loot box command
    // When called the function will check if the user has enough coins to open a loot box
    // if the user has enough coins the function will open a loot box and add the item to the users inventory
    // Modified: 2/10/2024
    case 'open_loot_box': 
    
    //user uses the command
    // they get a choice of series or to view their inventory or view loot box info
    let history = userHistories[interaction.user.id] || [];
    const choosingSeries1 = actionRows.custom_Row(buttons.pick_Series_S1())
    const choosingSeries2 = actionRows.custom_Row(buttons.inventory());
    await interaction.reply({ embeds: [choose_series()], file: [], components: [choosingSeries1, choosingSeries2] });
    history.push({ embeds: [choose_series()], components: [choosingSeries1,choosingSeries2] });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async i => {

    // if they choose series 1,2, or 3 they will get a choice of type
    switch(i.customId) {
      
      case 'back':
        // Remove the last interaction from the history and display it
        if (history.length > 1) {
            history.pop();
            const previousInteraction = history[history.length - 1];
            await i.update(previousInteraction);
        }
        break;
      
      case 'choose_series_1':
        const box_Row_S1 = actionRows.custom_Row(buttons.armor_Box_S1(), buttons.weapon_box_s1(), buttons.back_button());
          history.push({ embeds: [choose_type()], components: [box_Row_S1] });
          await i.update({ embeds: [choose_type()], components: [box_Row_S1]});
          break;

      case 'choose_series_2':
          await i.update({ embeds: [choose_type()], components: [buttons.armor_Box_S2(), buttons.weapon_box_s2(), buttons.back_button(previousInteractionId)], inline: true });
          break;

      case 'choose_series_3':
          await i.update({ embeds: [choose_type()], components: [buttons.armor_Box_S3(), buttons.weapon_box_s3(), buttons.back_button(previousInteractionId)]});
          break;

      case 'inventory':
          const inventoryRow = actionRows.custom_Row(buttons.back_button());
          var inv = await inventory(interaction.user, db);
          await i.update({embeds: [inv], components: [inventoryRow]});
          history.push({ embeds: [inv], components: [inventoryRow] });
          break;
      }
    });

      const boxFilter = i => i.customId === 'armor_s1' && i.user.id === interaction.user.id;
      const boxCollector = interaction.channel.createMessageComponentCollector({ filter: boxFilter, time: 60000 });
      boxCollector.on('collect', async i => {
        
      switch(i.customId) {       
        
        case 'armor_s1': 

        var correct_coin = await coin_check(db, i.user.id, 75);
        if (correct_coin === false) {
          await i.update({ content: 'You do not have enough coins to open a loot box', embeds: [], components: []});
          return;
        } else {

          updateCount(db, 'inventory', 'coin_count', i.user.id, -75);

          const result = await open_loot_box(db, i.user.id, 1, 'armor');
          const boxButtons = actionRows.custom_Row(buttons.armor_Box_S1(),buttons.back_button());
          const { embed, attachment } = result;
          await i.update({embeds: [embed], components: [boxButtons]})
              .catch(console.error);
        }
        break;
        }
      });
    break;

    // they will then get a result of what they got

    // they can either open another loot box or go back to the series choice or view their inventory


    // inventory command
    // When called the function will return the users inventory
    // Modified: 2/10/2024

    case 'inventory':
      var inv = await inventory(interaction.user, db);

      await interaction.reply({embeds: [inv], ephemeral: true });
      break;

      
    // Loot Box Info Command
    // When called the function will return an embed with information on loot boxes
    // Modified: 2/11/2024

    case 'loot_box_info':
      const embed = loot_box_info();
      const series1 = lb_series_1();
      const components = new ButtonBuilder()
        .setLabel('Series 1')
        .setStyle('Primary')
        .setCustomId('series_1');
      const series_1 = new ActionRowBuilder()
        .addComponents(components);

      const response = await interaction.reply({ embeds: [embed], components: [series_1], ephemeral: true });

      const choice = await response.awaitMessageComponent({ time: 15000 });
      if (choice.customId === 'series_1') {
        await choice.update({ embeds: [series1], components: [] });
      }
      break;

    // leaderboard command
    // When called the function will return the top 10 users by item count
    // Modified: 2/10/2024
    case 'leaderboard':
      
      const row = actionRows.custom_Row(buttons.leaderboard_coins(), buttons.leaderboard_items());
      await interaction.reply({ content: 'Coming Soon.', components: [] });
      
      const lb_Filter = i => i.user.id === interaction.user.id;
      const lb_Collector = interaction.channel.createMessageComponentCollector({ lb_Filter, time: 60000 });
      const embedCoins = leaderboard_coins(db);

      lb_Collector.on('collect', async i => {
          switch(i.customId) {
              case 'leaderboard_coins':
                  await i.update({ embeds: [embedCoins], components: [] });
                  break;
              case 'leaderboard_items':
                  await i.update({ embeds: [leaderboard_items(db)], components: [] });
                  break;
          }
      });
      break;

    // post count command
    // When called the function will return the post count of the user
    // Modified: 2/11/2024
    case 'post_count':
      if (admin.some(adminUser => adminUser.id === interaction.user.id)) {
        algoPosts(interaction, db);
      }
      else {
        await interaction.reply('You do not have permission to use this command');
      }
      break;

    // daily command
    // When called the function will check if the user has claimed their daily reward
    // Modified: 2/10/2024
    case 'daily':
      const result = await dailyReward(interaction.user.id, db);
    
      if (result === false) {
        await interaction.reply('You have already claimed your daily reward');
        return;
      } else {
        updateCount(db, 'inventory', 'coin_count', interaction.user.id, 50);
        setCount(db, 'daily', 'last_claimed', interaction.user.id, new Date());
        await interaction.reply('You have claimed your daily reward of 50 coins');
      }
      break;

    // joke command
    // When called the function will return a random joke
    // Modified: 2/10/2024
    case 'joke':
      const joke = await fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => data.setup + '\n' + data.punchline);
      await interaction.reply(joke);
      break;

  case 'test_embed':

  const channel = interaction.channel;
  const component = new ButtonBuilder()
  .setLabel('Click me')
  .setStyle('Primary')
  .setCustomId('click_me');
  const rows = new ActionRowBuilder()
    .addComponents(component);
    const select = new StringSelectMenuBuilder()
    .setCustomId('starter')
    .setPlaceholder('Make a selection!')
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel('Bulbasaur')
        .setDescription('The dual-type Grass/Poison Seed Pokémon.')
        .setValue('bulbasaur'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Charmander')
        .setDescription('The Fire-type Lizard Pokémon.')
        .setValue('charmander'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Squirtle')
        .setDescription('The Water-type Tiny Turtle Pokémon.')
        .setValue('squirtle'),
    );

  const choose = new ActionRowBuilder()
    .addComponents(select);

    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  
  channel.send({ embeds: [exampleEmbed], components: [rows, choose] });
    break;

  case 'create_canvas':
    attachment = await jungleBiome();
    await interaction.reply({ files: [attachment] });
    break;
    }
});


client.login(token);

// Handle SIGINT (Ctrl+C) and SIGTERM (terminate signal)
process.on('SIGINT', () => gracefulShutdown(db));
process.on('SIGTERM', () => gracefulShutdown(db));


