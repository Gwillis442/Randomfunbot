const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');

const openai = new OpenAI( { apiKey: gptApiKey} );

async function getDmResponse(message, userId) {

    try{
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages : [{role: 'system', content: 'You are Discord bot. You are recieveing a direct message from a user. Please respond to the user in a helpful manner.'},     
        {role: 'user', content: message}]
    });

    return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return 'I am sorry, I am not able to respond to that question at this time.';
    }
}

module.exports = { getDmResponse };
