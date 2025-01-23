// Gpt replies with a tts message
const { SlashCommandBuilder } = require('@discordjs/builders');
const { generateImage } = require('../../shortHandler/imageGenHandler');
const { generateVideo } = require('../../shortHandler/videoGeneratorHandler');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('short')
        .setDescription('Generate a short form video from a text prompt')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt to generate the video from')
                .setRequired(true)),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        await interaction.deferReply();
        const short = await generateVideo(prompt, 1);
        const attachment = short;
        await interaction.editReply({ files: [attachment] });
    },
};