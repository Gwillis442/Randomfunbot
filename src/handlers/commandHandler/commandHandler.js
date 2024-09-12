const { client } = require('../../client');
const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
//console.log(`Reading command files from folder: ${commandsPath}`); // Debugging statement
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		//console.log(`Processing command file: ${filePath}`); // Debugging statement
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			//console.log(`Loaded command: ${command.data.name}`); // Debugging statement
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});