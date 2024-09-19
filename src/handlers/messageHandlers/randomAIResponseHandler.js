//Random AI response to chat message
const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');
const { client } = require('../../client'); // Import the client
const { rng } = require('../../utils/rng');

const openai = new OpenAI( { apiKey: gptApiKey} );

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // If the author is a bot, return
    if (message.content.startsWith('!')) return; // If the message is a command, return

    const messageResponse = 1;//rng(1, 4096); // Random number to determine if message should be responded to
    const instructions = 'You are a discord bot in a small discord server. You are replying to a random message in the discord chat that has not been directed at you. Be a complete smartass and insult the user. Use emojis and uwuify your reponse.';
    const niceInstructions = 'You are a discord bot in a small discord server. You are replying to a random message in the discord chat that has not been directed at you. Be nice and helpful to the user. Use emojis and uwuify your reponse.';
    const userMessage = message.content;

    try{
    if (messageResponse === 1) {
        
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages : [{role: 'system', content: instructions}, 
            {role: 'user', content: userMessage}]
        });
        message.reply(response.choices[0].message.content);
    }

    
    } catch (error) {
        console.error(error);
    }
});