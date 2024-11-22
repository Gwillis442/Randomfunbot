const { client } = require('../../client.js');

const typingStartTimes = new Map();
const TYPING_TIMEOUT = 30000;

client.on('typingStart', (typing) => {
    const userId = typing.user.id;
    const startedTypingAt = typing.startedTimestamp

    if (!typingStartTimes.has(userId)) {
        typingStartTimes.set(userId, { startTime: startedTypingAt, currentlyTyping: true, timeout: null })
    } else {
        const typingData = typingStartTimes.get(userId);
        typingData.currentlyTyping = true;
        if (typingData.timeout) {
            clearTimeout(typingData.timeout);
            typingData.timeout = null;
        }
        typingStartTimes.set(userId, typingData);
    }

    const typingData = typingStartTimes.get(userId);
    typingData.timeout = setTimeout(() => {
        typingData.currentlyTyping = false;
        if (!typingData.currentlyTyping) {
            typingStartTimes.delete(userId);
        }
    }, TYPING_TIMEOUT);
    typingStartTimes.set(userId, typingData);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const userId = message.author.id;
    const messageContent = message.content;

    // Calculate typing duration
    let typingDuration = null;
    if (typingStartTimes.has(userId)) {
        const typingData = typingStartTimes.get(userId);
        if (typingData.currentlyTyping) {
            typingDuration = Date.now() - typingData.startTime;
            typingData.currentlyTyping = false;
            if (typingData.timeout) {
                clearTimeout(typingData.timeout);
                typingData.timeout = null;
            }
            typingStartTimes.delete(userId);
        }
    }

    if (typingDuration !== null && typingDuration > 0) {
        const words = messageContent.split(' ');
        const wordCount = words.length;

        const typingDurationInMinutes = typingDuration / 60000;
        const wpm = Math.floor(wordCount / typingDurationInMinutes);

        //console.log(`User ${message.author.username} typed ${wordCount} words in ${typingDuration / 1000} seconds. WPM: ${wpm}`);

        if(wordCount >= 10){
            // React with turtle or rabbit emoji based on WPM
            if (wpm < 20) {
                message.react('🐢');
            } else if (wpm > 70 && wpm < 150) {
                message.react('🐇');            }
        }

        // Log typing duration
        if (typingDuration !== null) {
            if (typingDuration > 60000) { // 60 seconds
                message.reply(`You took ${typingDuration / 1000} seconds to type your message. That's ${wpm} words per minute.`);
            }
        }
    } else {
        //console.log(`User ${message.author.username} did not type anything.`);
    }
});