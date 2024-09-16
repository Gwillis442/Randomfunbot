
module.exports = {
    customId: 'exampleButton',
    async execute(interaction) {
        const command = interaction.client.commands.get('embedtest2');
        if (!command) {
            console.error(`No command matching embedtest2 was found.`);
            return;
        } 
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`Error executing embedtest2`);
            console.error(error);
        }
    },
};