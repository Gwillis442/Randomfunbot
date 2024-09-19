const { SlashCommandBuilder } = require('@discordjs/builders');
const { getChatGPTResponse } = require('../../gptResponseHandler/gptHandler.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask ChatGPT a question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask ChatGPT')
                .setRequired(true)),
    async execute(interaction) {
        try{
        const question = interaction.options.getString('question');
        await interaction.deferReply();
        const response = await getChatGPTResponse(question, interaction.user.id);
        await interaction.editReply(response);
        } catch (error) {
            console.error(error);
            await interaction.editReply('I cannot answer right now. Please try again later.');
        }
    },
};