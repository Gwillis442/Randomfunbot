const { SlashCommandBuilder } = require('@discordjs/builders');
const { createBasicEmbed, createRichEmbed } = require('../../../utils/embedCreator');
const { buttonBuilder } = require('../../../utils/buttonCreator');
const { actionRowBuilder } = require('../../../utils/actionRowCreator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedtest2')
        .setDescription('Replies with a test embed!'),
    async execute(interaction) {
        const embed = createBasicEmbed('Test Embed', 'This is a test embed!');
        const button = buttonBuilder('Click Me!', 'Primary', false, 'exampleButton2');
        const actionRow = actionRowBuilder([button]);

        await interaction.reply({ content: 'Here is a test embed!', embeds: [embed], components: [actionRow] });
    },
};