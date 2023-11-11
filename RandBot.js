
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
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

client.on('messageCreate', (message) => {
  
  // Check if the message author's username matches the target username
  if (message.author.username === targetUsername) {
    // Generate a random number between 1 and 100
    const singleTargetDelete = Math.floor(Math.random() * 150) + 1;

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

//creating random chance for user to have message deleted
//If message author's username does not match target
client.on('messageCreate', (message) =>{
  if(message.author.username !== targetUsername){
    const multiTargetDelete = Math.floor(Math.random() * 200) + 1;

     // If the random number is 1, delete the message
    if (multiTargetDelete === 1) {
      message.delete()
      .then(deletedMessage => {
      console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);

      });
    }
  }
});



//Creating random chance to have bot respond with 1 of 8 emotes
client.on('messageCreate', (message) => { 


  const reactionNum = Math.floor(Math.random() * 100) + 1;

  if (reactionNum === 1){

    const reactionNum1 = Math.floor(Math.random() * arraySize);
    
    emojiArray[4] = message.guild.emojis.cache.find(emoji => emoji.name === 'righty');
    emojiArray[5] = message.guild.emojis.cache.find(emoji => emoji.name === 'lefty');
    emojiArray[6] = message.guild.emojis.cache.find(emoji => emoji.name === 'pepegun');
      
    message.react(emojiArray[reactionNum1]);

      }
    
  });

 

//Creating random chance to have bot respond to a person with a message
client.on('messageCreate', (message) =>{

    const unHingedReply = Math.floor(Math.random() * 2048) + 1;

    if(unHingedReply === 1){
      
      message.channel.send(`WARNING WARNING, ${message.author} IS REQUIRED TO ATTEND A MANDATORY PEBIS INSPECTION, NON COMPLIANCE WILL RESULT IN TERMINATION, PLEASE HEAD TO THE PEBIS EXTENDER ROOM IMMEDIATELY`)

    }

});



client.on('interactionCreate', async interaction => {
	
  
  if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {

		await interaction.reply('Pong!');

	} else if (commandName === 'server') {

		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);

	} else if (commandName === 'user') {

		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);

	} else if (commandName === 'roulette'){ // Russian Roulette command 1/6 chance to be shot

    const roulette = Math.floor(Math.random() * 6) + 1;
    const memberVoiceChannel = interaction.member.voice.channel;
    if(roulette === 1){

      await interaction.reply(`Bang! ${interaction.user} was shot.`);
      await interaction.member.voice.setChannel(null);

    } else {

      await interaction.reply('*click*');

    }

  }

});

client.login('MTE3MjAyNTUwOTU3MjUzMDIyNg.GfpzbC.br3NYgOxg8ZigxMszICvzkX73l_KjNpjXO4CHk');
