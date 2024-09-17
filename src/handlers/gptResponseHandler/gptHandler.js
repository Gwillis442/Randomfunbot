const { OpenAI } = require('openai');

const { gptApiKey } = require('../../../config/config.json');

const openai = new OpenAI( { apiKey: gptApiKey} );
const cooldowns = new Map();

const cooldown_Seconds = 10;

async function getChatGPTResponse(message, userId) {
    const now = Date.now();
    const cooldownAmount = cooldown_Seconds * 1000;

    if (cooldowns.has(userId)) {
        const expirationTime = cooldowns.get(userId) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`chatgpt\` command.`;
        }
    }

    cooldowns.set(userId, now);

    try{
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages : [{role: 'system', content: 'You are a discord bot in a small discord server. Anwser questions and respond to the best of your ability. But "uwuify your responses and end every response with "-desu".' ,}, 
        {role: 'user', content: message}]
    });

    return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return 'I am sorry, I am not able to respond to that question at this time.';
    }
}

module.exports = { getChatGPTResponse };
