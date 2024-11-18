const { get } = require('http');
const { client } = require('../../client.js');
const { getDmResponse } = require('../../handlers/gptResponseHandler/dmResponseHandler.js');


client.on('messageCreate', async(message) => {
    if (message.author.bot) return;

    if(!message.guild) {
        try{
            const response = await getDmResponse(message.content, message.author.id);
            message.author.send(response);
        } catch (error) {
            console.error(error);
            message.author.send('I am sorry, I am not able to respond to that question at this time.');
        }
       

    } else {
        return;
    }
});