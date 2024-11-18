//testing getting replies from GPT

const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');

const openai = new OpenAI( {apiKey: gptApiKey } );

async function getDmReponse() {
    const message = "What is the capital of the United States?";

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages : [{role: 'system', content: 'You are a helpful assistant.'}, {role: 'user', content: message}]
        });
    
    console.log(response.choices[0].message);
}

getDmReponse();