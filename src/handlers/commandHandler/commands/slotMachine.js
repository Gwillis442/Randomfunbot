const { SlashCommandBuilder } = require('@discordjs/builders');
const { rng } = require('../../../utils/rng.js');
const { createBasicEmbed, createRichEmbed } = require('../../../utils/embedCreator');

const fruits = [
    '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉',
    '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭',
    '🍍', '🥝', '🥥'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slotmachine')
        .setDescription('play slots')
        .addStringOption(option =>
            option.setName('bet')
                .setDescription('How much you want to bet')
                .setRequired(true)),
    async execute(interaction) {
        const bet = parseInt(interaction.options.getString('bet'));
        if(isNaN(bet)){
            interaction.reply({content: 'Not a valid bet.'});
            return;
        }
        await interaction.reply(`${fruits[rng(0, fruits.length - 1)]} | ${fruits[rng(0, fruits.length - 1)]} | ${fruits[rng(0, fruits.length - 1)]}`)
        let reel1;
        let reel2;
        let reel3;
        for (let i = 0; i < 3; i++) {
            reel1 = fruits[rng(0, fruits.length - 1)];
            reel2 = fruits[rng(0, fruits.length - 1)];
            reel3 = fruits[rng(0, fruits.length - 1)];
            await interaction.editReply(`${reel1} | ${reel2} | ${reel3}`);
        };

        // Stop first reel
        reel1 = fruits[rng(0, fruits.length - 1)]; // Final value for reel 1
        for (let i = 0; i < 2; i++) {
            reel2 = fruits[rng(0, fruits.length - 1)];
            reel3 = fruits[rng(0, fruits.length - 1)];
            await interaction.editReply(`${reel1} | ${reel2} | ${reel3}`);
        }

        // Stop second reel
        reel2 = fruits[rng(0, fruits.length - 1)]; // Final value for reel 2
        for (let i = 0; i < 2; i++) {
            reel3 = fruits[rng(0, fruits.length - 1)];
            await interaction.editReply(`${reel1} | ${reel2} | ${reel3}`);
        }

        // Stop third reel
        reel3 = fruits[rng(0, fruits.length - 1)]; // Final value for reel 3
        await interaction.editReply(`${reel1} | ${reel2} | ${reel3}`);

        let resultMessage;
        let color;
        let winnings;

        if (reel1 === reel2 && reel2 === reel3) {
            resultMessage = "🎰 JACKPOT! 🎰";
            winnings = bet * 2;
            color = 0x00FF00;
        } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
            resultMessage = "🎰 WINNER! 🎰";
            winnings = bet * 1.4;
            color = 0xFFFF00;
        } else {
            resultMessage = "🎰 Better luck next time! 🎰";
            winnings = 0 - bet;
            color = 0xFF0000;
        }

        const embed = createRichEmbed(resultMessage, `${reel1} | ${reel2} | ${reel3}`, color, {name: 'Winnings: ', value: `${winnings}`, inline: true});
        await interaction.editReply({content: '', embeds: [embed] });

    },
};