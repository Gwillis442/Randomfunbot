const { EmbedBuilder } = require('discord.js');

function createBasicEmbed(title, description) {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor('#0099ff');
}

function createRichEmbed(title, description, color, fields, footer) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);

    if (fields) {
        embed.addFields(fields);
    }

    if (footer) {
        embed.setFooter(footer);
    }

    return embed;
}

module.exports = {
    createBasicEmbed,
    createRichEmbed,
};