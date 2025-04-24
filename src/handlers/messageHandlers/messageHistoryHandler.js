//stores a message history for a specific channel
//stores the last 100 messages
const { client } = require('../../client.js');
const { mainChannelId } = require('../../../config/config.json');

const messageHistory = new Map();

function addMessageToHistory(message, username) {

    //if the message history is full, remove the oldest message
    if (messageHistory.size >= 500) {
        messageHistory.delete(messageHistory.keys().next().value);
    }

    //add the message to the history
    messageHistory.set(message.id, {
        username: username,
        content: message.content,
        timestamp: message.createdTimestamp
    });

}

//get the message history for the channel
function getMessageHistory() {
    return messageHistory;
}

client.on('messageCreate', message => {
    if(message.author.bot) return;
    if (mainChannelId != message.channelId) return;
    addMessageToHistory(message, message.author.username);
});

