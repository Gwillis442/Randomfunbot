const { guildId } = require('../../config/config.json');  
const { insertUser } = require('../../database/databaseUtils/insertDB.js'); 


// Populate the database with users
async function populateDatabase(client) {
    const guild = client.guilds.cache.get(guildId);
    if(!guild){
        console.error('Guild not found');
        return;
    }

    const members = await guild.members.fetch();
    for (const [id, member] of members){
            insertUser(member.user.id, member.user.username, member.user.nickname);
            console.log(`${member.user.username} added to database`);
        }

    }

module.exports = { populateDatabase };