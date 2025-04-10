const { OpenAI } = require('openai');
const { gptApiKey } = require('../../../config/config.json');

const { aiInstructions, admin } = require('../../../constants/arrays.js');
const { rng } = require('../../utils/rng.js');

const openai = new OpenAI( { apiKey: gptApiKey} );
const cooldowns = new Map();

const cooldown_Seconds = 10;

async function getChatGPTResponse(message, userId) {
    const now = Date.now();
    const cooldownAmount = cooldown_Seconds * 1000;

    let adminId = admin.some(adminUser => adminUser.id === userId);

    if(!adminId){
    var instructions = ` ${aiInstructions[rng(0, aiInstructions.length - 1)]}`;
    } else {
        instructions = 'You are a helpful pirate discord bot. Please anwser the users question to the best of you ability. Please keep your responses as short as possible.';
    }

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
        messages : [{role: 'system', content: instructions}, 
        {role: 'user', content: message}]
    });

    return response.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return 'I am sorry, I am not able to respond to that question at this time.';
    }
}

module.exports = { getChatGPTResponse };
