
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

// Set the username to target for message deletion
const targetUsername = "kony911";

client.on('messageCreate', (message) => {
  
  // Check if the message author's username matches the target username
  if (message.author.username === targetUsername) {
    // Generate a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 150) + 1;

    // If the random number is 1, delete the message
    if (randomNumber === 1) {
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
    const randomNumber3 = Math.floor(Math.random() * 200) + 1;

     // If the random number is 1, delete the message
    if (randomNumber3 === 1) {
      message.delete()
      .then(deletedMessage => {
      console.log(`Deleted message from ${deletedMessage.author.tag}: ${deletedMessage.content}`);

      });
    }
  }
});

//Creating random chance to have bot respond with 1 of 2 emotes
client.on('messageCreate', (message) => {
  
  const randomNumber1 = Math.floor(Math.random() * 100) + 1;

  if (randomNumber1 === 1){

      message.react('👍');

  } else if(randomNumber1 === 3){

      message.react('👎');

  }    
});  

//Creating random chance to have bot respond to a person with a message
client.on('messageCreate', (message) =>{

    const randomNumber2 = Math.floor(Math.random() * 2048) + 1;

    if(randomNumber2 === 1){
      
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
	} else if (commandName === 'echo') {
    userProvidedInput = options.getString('input');
    await interaction.reply(`You provided: ${userProvidedInput}`);3
  } else if(commandName === 'settarget'){
      const newUsername = options.getString('newUsername');
      targetUsername = newUsername;
      await interaction.reply(`Target username updated to ${newUsername}`);
  }

});

client.login('MTE3MjAyNTUwOTU3MjUzMDIyNg.Gbg__A.kmQAj7zl07nvB9pUCzUSRhXQ2jW088XNFzcUxw');
