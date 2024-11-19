const { client } = require('../../client.js');

const typingStartTimes = new Map();
const TYPING_TIMEOUT = 30000;

client.on('typingStart', (typing) => {
    const userId = typing.user.id;
    const startedTypingAt = typing.startedTimestamp
    
    if(!typingStartTimes.has(userId)){
        typingStartTimes.set(userId, {startTime: startedTypingAt, currentlyTyping: true, timeout: null})
    } else {
        const typingData = typingStartTimes.get(userId);
        typingData.currentlyTyping = true;
        if(typingData.timeout){
            clearTimeout(typingData.timeout);
            typingData.timeout = null;
        }
        typingStartTimes.set(userId, typingData);
    }
    
    const typingData = typingStartTimes.get(userId);
    typingData.timeout = setTimeout(() => {
        typingData.currentlyTyping = false;
        if(!typingData.currentlyTyping){
            typingStartTimes.delete(userId);
        }
    }, TYPING_TIMEOUT);
    typingStartTimes.set(userId, typingData);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const userId = message.author.id;

    // Calculate typing duration
    let typingDuration = null;
    if (typingStartTimes.has(userId)) {
        const typingData = typingStartTimes.get(userId);
        if(typingData.currentlyTyping){
            typingDuration = Date.now() - typingData.startTime;
            typingData.currentlyTyping = false;
            if(typingData.timeout){
                clearTimeout(typingData.timeout);
                typingData.timeout = null;
            }
            typingStartTimes.delete(userId);
        }
    }

    // Log typing duration
    if (typingDuration !== null) {
        if (typingDuration > 5000) {
            message.reply(`You took ${typingDuration / 1000} seconds to type your message.`);
        }
    }
});