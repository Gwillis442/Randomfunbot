//tracks and store previous messages to allow for use by the bot
const { client } = require('../../client.js');

const messageHistory = [];

function storeMessage(message, author) {
    try{
    messageHistory.push({content: message, author: author});

    if (messageHistory.length > 100) {
        messageHistory.shift();
    }
    } catch (error) {
    console.error(error);
    }
}

function getMessageHistory() {
    return messageHistory.map( entry => `${entry.author}: ${entry.content}`);
}

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    storeMessage(message.content, message.author.username);
});

module.exports = { getMessageHistory };