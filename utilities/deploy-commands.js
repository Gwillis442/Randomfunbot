
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../src/config.json');

const commands = [
    new SlashCommandBuilder().setName('roulette').setDescription('Win Coins! or lose it all...')
			.addIntegerOption(option => option.setName('wager').setDescription('Amount of currency to wager').setRequired(true)),
	new SlashCommandBuilder().setName('spin_cylinder').setDescription('Spin the cylinder'),
	new SlashCommandBuilder().setName('roll').setDescription('Get a random number')
			.addStringOption(option => option.setName('min').setDescription('Minimum value').setRequired(true))
			.addStringOption(option => option.setName('max').setDescription('Maximum value').setRequired(true)),
	new SlashCommandBuilder().setName('death_roll').setDescription('Get a random number')
			.addStringOption(option => option.setName('max').setDescription('Max Value').setRequired(true)),
	new SlashCommandBuilder().setName('open_loot_box').setDescription('Open a loot box'),
	new SlashCommandBuilder().setName('loot_box_info').setDescription('Information on loot boxes'),
	new SlashCommandBuilder().setName('inventory').setDescription('Check your inventory'),
	new SlashCommandBuilder().setName('leaderboard').setDescription('Check the leaderboard for coins'),
	new SlashCommandBuilder().setName('daily').setDescription('Claim your daily coins'),
	new SlashCommandBuilder().setName('post_count').setDescription('List post count'),
	new SlashCommandBuilder().setName('joke').setDescription('Get a random joke'),
	new SlashCommandBuilder().setName('coin_flip').setDescription('Flip a coin'),
	new SlashCommandBuilder().setName('test_embed').setDescription('Test embeds'),
]

	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
