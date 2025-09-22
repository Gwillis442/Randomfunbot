const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('../config/config.json');
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
    Partials.Message,
    Partials.Reaction,
    Partials.User
  ]
});

client.once('clientReady', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

});

client.login(discordToken);

module.exports = { client };
