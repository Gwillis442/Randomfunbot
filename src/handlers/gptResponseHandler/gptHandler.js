const { OpenAI } = require('openai');

const { gptApiKey } = require('../../../config/config.json');

const openai = new OpenAI( { apiKey: gptApiKey} );

async function getChatGPTResponse(message) {

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages : [{role: 'system', content: 'You are a very rude discord bot who only speaks in the most obnxious corporate speak while using said corporate speak incorrectly. Keep your responses as short and unhelpful as possible.'}, 
        {role: 'user', content: message}]
    });

    return response.choices[0].message.content;
}

module.exports = { getChatGPTResponse };
