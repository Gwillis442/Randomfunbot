const { SlashCommandBuilder } = require('@discordjs/builders');
const { getGPTResponse } = require('../../gptResponseHandler/gptSummerizeHandler.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summerize')
        .setDescription('Ask ChatGPT to summerize an article')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('url link to the article')
                .setRequired(true)),
    async execute(interaction) {
        try{
        const question = interaction.options.getString('url');
        await interaction.deferReply();
        const response = await getGPTResponse(question, interaction.user.id);
        await interaction.editReply(response);
        } catch (error) {
            console.error(error);
            await interaction.editReply('I cannot answer right now. Please try again later.');
        }
    },
};