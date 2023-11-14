
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    //GatewayIntentBits.MessageComponents,
  ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    //testRNG();
  });

// Set the username to target for message deletion
const targetUsername = "kony911";

// Creating Array filled with reaction emojis
const arraySize = 7;
const emojiArray = Array(arraySize).fill(null);
    emojiArray[0] = '👍';
    emojiArray[1] = '👎';
    emojiArray[2] = '🤡';
    emojiArray[3] = '❤️';

// var for both bullet and chamber fo roulette
var chamber = rng(1,6);
var bullet = rng(1,6);


/*
==================================
Single Target Deletion
Given a specific username (hardcoded) the bot will generate a random number between 1 and 150 
if number is 1 bot will delete the message 
Modified: 11/13/2023
==================================
*/

client.on('messageCreate', (message) => {
  
  // Check if the message author's username matches the target username
  if (message.author.username === targetUsername) {
    // Generate a random number between 1 and 100
    const singleTargetDelete = rng(1,150);

    // If the random number is 1, delete the message
    if (singleTargetDelete === 1) {
      message.delete()
      .then(deletedMessage => {
        console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);
        // Send a DM to the message author
        //message.channel.send(`Your message was deleted ${message.author}`);
    
      })
      .catch(console.error);
    }
  }
});

/*
==================================
Multiple Target Deletion
Given any other username besides target (hardcoded) 
the bot will generate a random number between 1 and 200 
if number is 1 bot will delete the message 
Modified: 11/13/2023
==================================
*/
//If message author's username does not match target
client.on('messageCreate', (message) =>{
  if(message.author.username !== targetUsername){
    const multiTargetDelete = rng(1,200);

     // If the random number is 1, delete the message
    if (multiTargetDelete === 1) {
      message.delete()
      .then(deletedMessage => {
      console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);

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
Modified: 11/13/2023
==================================
*/

//Creating random chance to have bot respond with 1 of 8 emotes
client.on('messageCreate', (message) => { 


  const reactionNum = rng(1,100);

  if (reactionNum === 1){

    const reactionNum1 = rng(1,arraySize);
    
    //Server specific emojis
    emojiArray[4] = message.guild.emojis.cache.find(emoji => emoji.name === 'righty');
    emojiArray[5] = message.guild.emojis.cache.find(emoji => emoji.name === 'lefty');
    emojiArray[6] = message.guild.emojis.cache.find(emoji => emoji.name === 'pepegun');
      
    message.react(emojiArray[reactionNum1]);

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

    const unHingedReply = Math.floor(Math.random() * 2048) + 1;

    if(unHingedReply === 1){
      
      message.channel.send(`WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`)

    }

});

/*
==================================
Spin Cylinder
When called the function will reroll the random numbers between 1 and 6 for chamber and bullet
Modified: 11/13/2023
==================================
*/

function spinCylinder(){

  chamber = rng(1,6);
  bullet = rng(1,6);

}

/*
==================================
Random Number Generator 
When called the function will roll random numbers between 2 passed to the function
Modified: 11/13/2023
==================================
*/
function rng(min, max){

return(Math.floor(Math.random() * (max - min + 1)) + min);

}

/*
==================================
Interaction builder
Holds logic for the user using a / command
Dependcies found in deploy-commands.js
Modified: 11/13/2023
==================================
*/

client.on('interactionCreate', async interaction => {  
  if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

	if (commandName === 'roulette'){ // Russian Roulette command 1/6 chance to be shot

    const memberVoiceChannel = interaction.member.voice.channel;

    if(chamber === bullet){

      await interaction.member.voice.setChannel(null);
      await interaction.reply(`*Bang* ${interaction.user} was shot!`);
      //console.log(`${interaction.username} what shot`);

      spinCylinder();
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

  } else if(commandName === 'spincylinder'){// command to reroll random numbers for bullet and chamber

    spinCylinder();
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


  } else if(commandName === 'deathroll'){ //rolls a random number between 1 and user input until a 1 is rolled

    const max = options.getString('max');
    const maxNum = parseInt(max);   

    const result = rng(1,maxNum);

    if(result === 1){

      await interaction.reply(`${interaction.user} rolled a ${result} and lost`);

    } else{

      await interaction.reply(`${interaction.user} rolled a ${result}`);      

    }  

  }

});


function testRNG(){
  var x = 0;
  var y = 0;
 
  for(var i; i < 100; i++){
    var num = rng(50,200);
    if(num > 200 || num < 50){
      y++;
    } else {
      x++;
    }
}
console.log('test End')
console.log(`Success: ${x} Fail: ${y}`);
}

client.login('MTE3MjAyNTUwOTU3MjUzMDIyNg.GfpzbC.br3NYgOxg8ZigxMszICvzkX73l_KjNpjXO4CHk');
