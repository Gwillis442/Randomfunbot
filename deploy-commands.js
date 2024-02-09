
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('roulette').setDescription('Play Russian Roulette solo or with others'),
	new SlashCommandBuilder().setName('spin_cylinder').setDescription('Spin the cylinder'),
	new SlashCommandBuilder().setName('roll').setDescription('Get a random number')
			.addStringOption(option => option.setName('min').setDescription('Minimum value').setRequired(true))
			.addStringOption(option => option.setName('max').setDescription('Maximum value').setRequired(true)),
	new SlashCommandBuilder().setName('death_roll').setDescription('Get a random number')
			.addStringOption(option => option.setName('max').setDescription('Max Value').setRequired(true)),
	new SlashCommandBuilder().setName('open_loot_box').setDescription('Open a loot box'),
	new SlashCommandBuilder().setName('loot_box_info').setDescription('Information on loot boxes'),
	new SlashCommandBuilder().setName('check_currency').setDescription('Check your currency'),
	new SlashCommandBuilder().setName('post_count').setDescription('List post count'),
	new SlashCommandBuilder().setName('joke').setDescription('Get a random joke'),
]

	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
