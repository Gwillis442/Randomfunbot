const { guildId } = require('../../config/config.json');  
const User = require('../../database/botDatabase.js') 


// Populate the database with users
async function populateDatabase(client) {
    const guild = client.guilds.cache.get(guildId);
    if(!guild){
        console.error('Guild not found');
        return;
    }

    const members = await guild.members.fetch();
    for (const [id, member] of members){
        const userExists = await User.findOne({userId: member.id});
        console.log(`Processing member: ${member.user.username}, ID: ${member.id}`); // Debug log
        if(!userExists) {
            await User.create({
                userId: member.id,
                username: member.user.username,
                nickname: member.nickname || null,
                joinedAt: member.joinedAt
            });
            console.log(`${member.user.username} added to database`);
        }
    }

}
module.exports = { populateDatabase };