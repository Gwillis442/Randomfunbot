const  path  = require('path');
const  fs = require('fs');
const fetch = require('node-fetch');
const { generateImage } = require('./imageGenHandler');   


const assetDir = path.resolve(__dirname, './videoAssets');

async function generateVideo(message) {
    const videoAssets = await fs.promises.readdir(assetDir);

    for(let i = 0; i < 5; i++){
        const prompt = message;
        const imageURL = await generateImage(prompt, 1);

        if(!imageURL){
            throw new Error('Failed to generate image');
        } else{
        const newImageFile = path.resolve(assetDir, `image${i}.jpg`);
        const imageResponse = await fetch(imageURL);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.promises.writeFile(newImageFile, buffer);
        }
    }

    return path.resolve(assetDir, 'image1.jpg');
}

module.exports = { generateVideo };