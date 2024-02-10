const { guildId, token } = require('./config.json');
const sqlite3 = require('sqlite3').verbose();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.login(token);
//starting database
const db = new sqlite3.Database('./botDatabase.db', (err) => {
  if (err) {
      console.error('Error opening database:', err);
  } else {
      console.log('Database opened successfully');
  }
});

// Fetch all user IDs from the 'users' table
db.all('SELECT user_id FROM users', [], (err, rows) => {
  if (err) {
    throw err;
  }

  // For each user ID, insert it and a default coin count into the 'inventory' table
  rows.forEach((row) => {
    db.run(`INSERT INTO inventory(user_id, coin_count) VALUES(?, ?)`, [row.user_id, 100], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  });
});

// Insert the item data into the 'item' table
db.run(`
  INSERT INTO item(item_id, item_name, item_type, item_rarity, series_num)
  VALUES
  (1,'Cactus Armor', 'armor', 'common', 1),
  (2, 'Wood Armor', 'armor', 'common', 1),
  (3, 'Ebonwood Armor', 'armor', 'common', 1),
  (4, 'Shadewood Armor', 'armor', 'common', 1),
  (5,'Palm Wood Armor', 'armor', 'common', 1),
  (6,'Boreal Wood Armor', 'armor', 'common', 1),
  (7,'Rich Mahogany Armor', 'armor', 'common', 1),
  (8, 'Ash Wood Armor', 'armor', 'common', 1),
  (9,'Tin Armor', 'armor', 'uncommon', 1),
  (10,'Copper Armor', 'armor', 'uncommon', 1),
  (11, 'Lead Armor', 'armor', 'uncommon', 1),
  (12, 'Iron Armor', 'armor', 'uncommon', 1),
  (13, 'Angler Armor', 'armor', 'uncommon', 1),
  (14, 'Pumpkin Armor', 'armor', 'uncommon', 1),
  (15, 'Raincoat Armor', 'armor', 'uncommon', 1),
  (16, 'Gold Armor', 'armor', 'rare', 1),
  (17, 'Silver Armor', 'armor', 'rare', 1),
  (18, 'Platinum Armor', 'armor', 'rare', 1),
  (19, 'Tungsten Armor', 'armor', 'rare', 1),
  (20, 'Fossil Armor', 'armor', 'rare', 1),
  (21, 'Pink Snow Armor', 'armor', 'rare', 1),
  (22, 'Snow Armor', 'armor', 'rare', 1),
  (23, 'Bee Armor', 'armor', 'rare', 1),
  (24, 'Ninja Armor', 'armor', 'rare', 1),
  (25, 'Jungle Armor', 'armor', 'epic', 1),
  (26, 'Obsidian Armor', 'armor', 'epic', 1),
  (27, 'Crimson Armor', 'armor', 'epic', 1),
  (28, 'Shadow Armor', 'armor', 'epic', 1),
  (29, 'Meteor Armor', 'armor', 'epic', 1),
  (30, 'Necro Armor', 'armor', 'epic', 1),
  (31, 'Gladiator Armor', 'armor', 'epic', 1),
  (32, 'Ancient Shadow Armor', 'armor', 'epic', 1),
  (33, 'Ancient Cobalt Armor', 'armor', 'epic', 1),
  (34, 'Molten Armor', 'armor', 'legendary', 1)`,
   function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`rows have been inserted with rowid ${this.lastID}`);
});

// Insert the series data into the 'series' table
db.run(`
  INSERT INTO series(series_num, series_name, series_desc)
  VALUES(1, 'Pre_Hardmode Terraria', 'Things from the game Terraria before hardmode')`)

