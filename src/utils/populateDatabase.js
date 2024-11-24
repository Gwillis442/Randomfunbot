const { guildId } = require('../../config/config.json');   
const sqlite3 = require('sqlite3').verbose();

//Connection to the Database
const db = new sqlite3.Database('../../database/messageCount.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

// Populate the database with users
async function populateDatabase(client) {
    const guild = client.guilds.cache.get(guildId);
        if (!guild) {
            console.error('Guild not found');
        }
    const members = await guild.members.fetch();

    members.forEach((member) => {
        const insertUser = `
            INSERT or IGNORE INTO users(user_id, user_name)
            VALUES(?, ?);
            `;
        const insertPostCount = `
            INSERT or IGNORE INTO post_count(user_id, link_count)
            VALUES(?, 0);
            `;
        const insertBag = `
            INSERT or IGNORE INTO bag(user_id, bag_count)
            VALUES(?, 0);
            `;

        db.run(insertUser, [member.id, member.user.username], (err) => {
            if (err) {
                console.error(err.message);
            }
        });

        db.run(insertPostCount, [member.id], (err) => {
            if (err) {
                console.error(err.message);
            }
        });
        
        db.run(insertBag, [member.id], (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
}

module.exports = { populateDatabase };