
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const {emojiArray, } = require('./item-arrays'); // Import from ItemArrays.js
const {rng, openLootBox, testRNG, modAlert} = require('./functions.js');
const {userDataArray,arraySize,searchArray,insertArray} = require('./userData.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    //uncomment to test rng function
    //testRNG();
  });

// Set the username to target for message deletion
const targetUsername = "kony911";


// var for both bullet and chamber fo roulette
var chamber = rng(1,6);
var bullet = rng(1,6);


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
        console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);

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
      console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);      
    
      modAlert(client, message);

      });
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


  const reactionNum = rng(1,85);

  if (reactionNum === 1){
    
    const reactionNum1 = rng(1,emojiArray.length);
    const customEmoji = [
      ['righty'],
      ['lefty'],
      ['pepegun'],
    ];
    const emoji = customEmoji[rng(0,2)];
    //Server specific emojis
    emojiArray[0] = message.guild.emojis.cache.find(emoji => emoji.name === 'pepegun');      
    message.react(emojiArray[reactionNum]);
    console.log(`Reacted to ${message.author.tag} message: ${message.content}`);

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
client.on('messageCreate', (message) =>{

    const unHingedReply = rng(1,2048);

    if(unHingedReply === 1){
      
      message.channel.send(`WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`)

    }

});

client.on('messageCreate', (message) =>{

  if(!searchArray(message.author.id)){
    console.log(`${insertArray(message.author.id)}`);
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
      console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);      
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

	if (commandName === 'roulette'){ // Russian Roulette command 1/6 chance to be shot

    const memberVoiceChannel = interaction.member.voice.channel;
    console.log(`${interaction.user.tag} played roulette`);
    if(chamber === bullet){
      await interaction.member.voice.setChannel(null);
      await interaction.reply(`*Bang* ${interaction.user} was shot!`);
      //console.log(`${interaction.username} what shot`);
      bullet = rng(1,6);
      chamber = rng(1,6);
      //console.log('Reseting bullet and chamber');

    } else {
      await interaction.reply(`*click*`);

      chamber++;

      if(chamber === 7){

        chamber = 1;

      }
      //console.log(`Chamber = ${chamber}`);
      //console.log(`Bullet = ${bullet}`);

    }

  } else if(commandName === 'spin_cylinder'){// command to reroll random numbers for bullet and chamber

      chamber = rng(1,6);
      bullet = rng(1,6);
      await interaction.reply(`${interaction.user} spun the cylinder.`);
      //console.log(`Chamber = ${chamber}`);
      //console.log(`Bullet = ${bullet}`);

  } else if(commandName === 'roll'){ // allows you to roll a random number between 2 user inputs
      const min = options.getString('min');
      const max = options.getString('max');
      const minNum = parseInt(min);
      const maxNum = parseInt(max);
      const result = rng(minNum, maxNum);
      await interaction.reply(`Random number between ${minNum} and ${maxNum}: ${result}`);

  } else if(commandName === 'death_roll'){ //rolls a random number between 1 and user input until a 1 is rolled
    const max = options.getString('max');
    const maxNum = parseInt(max);
    const result = rng(1,maxNum);

    if(result === 1){
      await interaction.reply(`${interaction.user} rolled a ${result} and lost`);

    } else{
      await interaction.reply(`${interaction.user} rolled a ${result}`);      

    }  

  } else if(commandName === 'open_loot_box'){
    var randomItem = openLootBox();

    const button = new ButtonBuilder().setCustomId('open_loot_box').setLabel('Open Another Loot Box').setStyle('Primary')
    const row = new ActionRowBuilder().addComponents(button);
    console.log(`${interaction.username} opened a loot box`);
    await interaction.reply({
      content: `You got a **${randomItem.name}**!`,  
      components: [row],    
    });    
  }
});



client.login(token);
