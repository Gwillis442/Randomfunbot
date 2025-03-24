const { guildId } = require('../../config/config.json');   


// Populate the database with users
async function populateDatabase(client) {
    const guild = client.guilds.cache.get(guildId);
}
module.exports = { populateDatabase };