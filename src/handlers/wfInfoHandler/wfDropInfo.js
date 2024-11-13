const { SlashCommandBuilder } = require('@discordjs/builders');
const { createBasicEmbed, createRichEmbed } = require('../../utils/embedCreator');
const { buttonBuilder } = require('../../utils/buttonCreator');
const { actionRowBuilder } = require('../../utils/actionRowCreator');
const { getWarframeDropInfo } = require('./getWFDropInfo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dropinfo')
        .setDescription('Drop information for a specific item or warframe')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('The item or warframe to search for')
                .setRequired(true)),
    async execute(interaction) {
       

        const item = interaction.options.getString('item');
        await interaction.deferReply();
        
        console.log('Item: ', item);
    try {
        let { dropLocation, dropRotation, dropInfo } = await getWarframeDropInfo(item);
        if(!dropRotation){
            dropRotation = 'N/A';
        }
        console.log('Drop Location: ', dropLocation);
        console.log('Drop Rotation: ', dropRotation);
        console.log('Drop Information : ', dropInfo);
        
        if (!dropInfo || dropInfo.length === 0) {
            await interaction.editReply({ dropInfo: 'No drop information found for the specified item.', ephemeral: true });
            return;
        }
        
        const fields = dropInfo.map((drop) => {
            return {
                name: drop.item,
                value: `Location: ${dropLocation}\nDrop Rate: ${drop.dropRate}\n${drop.dropRotation}`,
                inline: false,
            };
        });

        console.log('Fields:', fields); // Debugging statement

        const embed = createRichEmbed(`Drop Information for ${item}`, `Drop Location\nDrop Rate\nDrop Rotation`, fields);

        await interaction.editReply({embeds: [embed]});
    } catch (err) {
        console.log(err);
        await interaction.editReply({ dropInfo: 'An error occurred while fetching drop information.', ephemeral: true });
    }
    }
};