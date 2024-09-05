const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config/config.json');
const { populateDatabase } = require('./utils/populateDatabase.js');

var client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ]
});

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  try {
    populateDatabase(client);
  }
  catch (error) {
    console.error("Error in database population: ", error);
  }
});

client.login(token);

module.exports = { client };
