
module.exports = {
    customId: 'exampleButton2',
    async execute(interaction) {
        const command = interaction.client.commands.get('embedtest');
        if (!command) {
            console.error(`No command matching embedtest2 was found.`);
            return;
        } 
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`Error executing embedtest`);
            console.error(error);
        }
    },
};