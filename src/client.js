const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('../config/config.json');
const {populateDatabase} = require('./utils/populateDatabase.js');
require('dotenv').config();

const discordToken = process.env.token || token;

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

client.once('clientReady', () => {
  //connectDB();
  //populateDatabase(client);
  console.log(`Ready! Logged in as ${client.user.tag}`);

});

client.login(discordToken);

module.exports = { client };
