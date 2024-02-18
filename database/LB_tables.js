const { token } = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('./botDatabase.db', (err) => {
  if (err) {
      console.error('Error opening database:', err);
  } else {
      console.log('Database opened successfully');
  }
});

db.serialize(() => {
db.run('DROP TABLE  IF EXISTS coin_count');

db.run(`
    CREATE TABLE IF NOT EXISTS inventory(
    inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    coin_count INTEGER,
    foreign key(user_id) references users(user_id)
  )`)

db.run(`
  CREATE TABLE IF NOT EXISTS series(
      series_num INTEGER PRIMARY KEY,
      series_name TEXT,
      series_desc TEXT
  )`)

db.run(`
  CREATE TABLE IF NOT EXISTS item(
    item_id INTEGER PRIMARY KEY,
    item_name TEXT,
    item_type TEXT,
    item_rarity TEXT,
    series_num INTEGER,
    foreign key(series_num) references series(series_num)
  )`)

  db.run(`
  CREATE TABLE IF NOT EXISTS inventory_items(
    inventory_id INTEGER,
    item_id INTEGER,
    item_count INTEGER,
    Primary Key(inventory_id, item_id),
    foreign key(inventory_id) references inventory(inventory_id),
    foreign key(item_id) references item(item_id)
  )`)

  db.run(
    `CREATE TABLE IF NOT EXISTS daily (
      user_id TEXT PRIMARY KEY,
      last_claimed datetime,
      streak INTEGER,
      total_claimed INTEGER,
      foreign key(user_id) references users(user_id)
    )`
  );

  });

  db.run(
    'Alter table item add column item_link TEXT'
  );

// close the database connection
db.close();