const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('../config/config.json');
const { connectDB } = require('./connectDB.js');


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
  //connectDB();
  //populateDatabase(client);
  console.log(`Ready! Logged in as ${client.user.tag}`);

});

client.login(token);

module.exports = { client };
