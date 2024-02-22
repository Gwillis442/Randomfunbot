const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    createCanvas:
    async function createCanvas(biome, armor, width, height) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(biome);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	    const avatar = await Canvas.loadImage(armor);
        const weapon = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/6/63/Meowmere.png');

	    // If you don't care about the performance of HTTP requests, you can instead load the avatar using
	    // const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'jpg' }));

	    // Draw a shape onto the main canvas
        //ctx.drawImage(weapon, 228, 35, 50, 58); Mewomere
        ctx.drawImage(weapon, 228, 35, 50, 58);
	    ctx.drawImage(avatar, 220, 58, 20, 40);
        
        
        
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
        
        return attachment;
    }
    ,
    forestBiome:
        async function forestBiome() {
            const canvas = Canvas.createCanvas(464, 124);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/f/fb/BiomeBannerForest.png');
            const armor = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5a/Ancient_Shadow_armor.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(armor, 220, 67, 15, 30);



            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'forest-biome.png' });
            return attachment;
        }
    ,
    undergroundBiome:
        async function undergroundBiome() {
            const canvas = Canvas.createCanvas(464, 124);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/c/cb/BiomeBannerUnderground.png');
            const armor = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5a/Ancient_Shadow_armor.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(armor, 220, 32, 15, 30);
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'forest-biome.png' });
            return attachment;
        }
    ,
    desertBiome:
        async function desertBiome() {
            const canvas = Canvas.createCanvas(464, 124);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/e/e5/BiomeBannerDesert.png');
            const armor = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5a/Ancient_Shadow_armor.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(armor, 215, 46, 15, 30);
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'forest-biome.png' });
            return attachment;
        }
    ,
    oceanBiome:
        async function oceanBiome() {
            const canvas = Canvas.createCanvas(464, 124);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/c/c2/BiomeBannerOcean.png');
            const armor = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5a/Ancient_Shadow_armor.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(armor, 145, 27, 15, 30);
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'forest-biome.png' });
            return attachment;
            
        }
    ,
    jungleBiome:
        async function jungleBiome() {
            const canvas = Canvas.createCanvas(464, 124);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/7/7e/BiomeBannerJungle.png');
            const armor = await Canvas.loadImage('https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5a/Ancient_Shadow_armor.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(armor, 180, 76, 15, 30);
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'forest-biome.png' });
            return attachment;
        }
    ,
}   
