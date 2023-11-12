
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('roulette').setDescription('Play Russian Roulette solo or with others'),
	new SlashCommandBuilder().setName('spinchamber').setDescription('Spin the chamber'),
	new SlashCommandBuilder().setName('roll').setDescription('Get a random number')
			.addStringOption(option => option.setName('min').setDescription('Minimum value').setRequired(true))
			.addStringOption(option => option.setName('max').setDescription('Maximum value').setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
