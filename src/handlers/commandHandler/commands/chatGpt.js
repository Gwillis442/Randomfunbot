const { SlashCommandBuilder } = require('@discordjs/builders');
const { getChatGPTResponse } = require('../../gptResponseHandler/gptHandler.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chatgpt')
        .setDescription('Ask ChatGPT a question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask ChatGPT')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        await interaction.deferReply();
        const response = await getChatGPTResponse(question);
        await interaction.editReply(response);
    },
};