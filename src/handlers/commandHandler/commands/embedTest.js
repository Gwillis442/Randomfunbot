const { SlashCommandBuilder } = require('@discordjs/builders');
const { createBasicEmbed } = require('../../../utils/embedCreator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('Replies with a test embed!'),
    async execute(interaction) {
        await interaction.reply({ content: 'Here is a test embed!', embeds: [createBasicEmbed('Test Embed', 'This is a test embed!')] });
    },
};