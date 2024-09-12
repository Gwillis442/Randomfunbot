const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../../../config/config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
console.log(`Reading command folders from: ${commandsPath}`); // Debugging statement
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	// Grab all the command files from the commands directory you created earlier
	const filePath = path.join(commandsPath, file);
	console.log(`Processing command file: ${filePath}`); // Debugging statement
	const command = require(filePath);
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment;
		if (command.data && command.data.toJSON) {
			commands.push(command.data.toJSON());
			console.log(`Loaded command: ${command.data.name}`); // Debugging statement
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();