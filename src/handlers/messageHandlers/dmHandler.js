const { get } = require('http');
const { client } = require('../../client.js');
const { getDmResponse } = require('../../handlers/gptResponseHandler/dmResponseHandler.js');

const messageHistory = new Map();
const messageHistoryLimit = 10;

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;


    if (!message.guild) {
        const userId = message.author.id;
        const userMessage = message.content;

        // If the user is not in the map add them
        if (!messageHistory.has(userId)) {
            messageHistory.set(userId, []);
        }
        //add message to user history
        const userMessages = messageHistory.get(userId);
        userMessages.push(userMessage);

        //Limit the message history to previous 10 messages
        if (userMessages.lenth > messageHistoryLimit) {
            userMessage.shit(); //remove the oldest message
        }


        try {
            const userMessages = messageHistory.get(userId);
            const response = await getDmResponse(message.content, message.author.name, userMessages);
            message.author.send(response);
        } catch (error) {
            console.error(error);
            message.author.send('I am sorry, I am not able to respond to that question at this time.');
        }


    } else {
        return;
    }
});