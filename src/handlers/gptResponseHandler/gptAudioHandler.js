//After getting a request the GPTAudioHandler will call the GPTAudioService to get the audio response from the GPT-3 model. The GPTAudioHandler will then send the audio response back to the client.
const { gptApiKey } = require('../../../config/config.json');
const { OpenAI } = require('openai');
const  path  = require('path');
const  fs = require('fs');
const { get } = require('http');
require('dotenv').config();
const openai = new OpenAI( { apiKey: process.env.gptApiKey || gptApiKey} );

const tempDir = path.resolve(__dirname, '../../temp');
const speechFile = path.resolve(tempDir, 'reply.ogg');

async function getGPTAudioResponse(message) {
    try {
        const ogg = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'alloy',
            input: message
        });

        console.log('speechFile', speechFile);
        const buffer = Buffer.from(await ogg.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);   
        return speechFile;

    } catch (error) {
        console.error(error);
        return 'I am sorry, I am not able to respond at this time.';
    }

}

module.exports = { getGPTAudioResponse };