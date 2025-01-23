const { gptApiKey } = require('../../../config/config.json');
const { OpenAI } = require('openai');
const  path  = require('path');
const  fs = require('fs');
const fetch = require('node-fetch');

const openai = new OpenAI({apiKey: gptApiKey});

const assetDir = path.resolve(__dirname, './videoAssets');
const imagefile = path.resolve(assetDir, 'image.jpg');

async function generateImage(message, count) {
        try {
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: message,
                n: count,
                size: "1024x1024",
            });
        if(response && response.data && response.data.length > 0) {
            const imageURL = response.data[0].url;
            const imageResponse = await fetch(imageURL);
            const arrayBuffer = await imageResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            await fs.promises.writeFile(imagefile, buffer);
            return imagefile
        } else {
            throw new Error('No image data found');
        }
    } catch (error) {
            console.error(error);
            throw new Error('Failed to generate image');
    }
}

module.exports = { generateImage };