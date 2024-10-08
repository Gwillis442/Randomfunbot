const { SlashCommandBuilder } = require('@discordjs/builders');
const { createBasicEmbed, createRichEmbed } = require('../../../utils/embedCreator');
const { buttonBuilder } = require('../../../utils/buttonCreator');
const { actionRowBuilder } = require('../../../utils/actionRowCreator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('Replies with a test embed!'),
    async execute(interaction) {
        const fields = [
            { name: 'Field 1', value: 'This is the first field.', inline: true },
            { name: 'Field 2', value: 'This is the second field.', inline: true },
            { name: 'Field 3', value: 'This is the third field.', inline: true },
        ];
        const button = buttonBuilder('Click Me!', 'Primary', false, 'exampleButton');

        const actionRow = actionRowBuilder([button]);

        const embed = createRichEmbed('Test Embed', 'This is a test embed!', fields);

        await interaction.reply({ content: 'Here is a test embed!', embeds: [embed], components: [actionRow] });
    },
};