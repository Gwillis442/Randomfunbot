const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('../config/config.json');
const { populateDatabase } = require('./utils/populateDatabase.js');

var client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping
  ],
  partials: [
    Partials.Channel,
    Partials.Message
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
