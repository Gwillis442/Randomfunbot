// Gpt replies with a tts message
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getGPTAudioResponse } = require('../../gptResponseHandler/gptAudioHandler');
const { getChatGPTResponse } = require('../../gptResponseHandler/gptHandler');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tts_reply')
        .setDescription('Ask ChatGPT a question and get a tts response')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask ChatGPT')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        await interaction.deferReply();
        const response = await getChatGPTResponse(question, interaction.user.id);
        const ttsResponse = await getGPTAudioResponse(response);
        const attachment = ttsResponse;
        await interaction.editReply({ files: [attachment] });
    },
};