const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config/config.json');

var client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ]
});

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.login(token);

module.exports = { client };
