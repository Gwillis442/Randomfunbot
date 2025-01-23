const { gptApiKey } = require('../../../config/config.json');
const { OpenAI } = require('openai');
const  path  = require('path');
const  fs = require('fs');
const fetch = require('node-fetch');

const openai = new OpenAI({apiKey: gptApiKey});

const assetDir = path.resolve(__dirname, './videoAssets');
const imagefile = path.resolve(assetDir, 'tempImage.jpg');

async function generateImage(message, count) {
        try {
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: message,
                n: count,
                size: "1024x1024",
            });
        return response.data[0].url;

    } catch (error) {
            console.error(error);
            throw new Error('Failed to generate image');
    }
}

module.exports = { generateImage };