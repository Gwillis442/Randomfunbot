const { client } = require('../../client');
const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

client.buttons = new Collection();
const buttonPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonPath).filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
    const filePath = path.join(buttonPath, file);
    const button = require(path.join(buttonPath, file));
    if ('customId' in button && 'execute' in button) {
        client.buttons.set(button.customId, button.execute);
    } else {
        console.error(`[WARNING] The button handler at ${filePath} is missing a required "customId" or "execute" property.`);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.isButton()) {
        const buttonHanlder = client.buttons.get(interaction.customId);
        if (!buttonHanlder) return;
        try {
            buttonHanlder(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.customId}`);
            console.error(error);
        }
    }
});