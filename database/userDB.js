const { userBag } = require('../utilities/item-arrays');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/botDatabase.db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS post_count (
    user_id INTEGER PRIMARY KEY,
    post_count INTEGER,
    foreign key (user_id) REFERENCES user(user_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS coin_count (
    user_id INTEGER PRIMARY KEY,
    coin_count INTEGER,
    foreign key (user_id) REFERENCES user(user_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS bag_count (
    user_id INTEGER PRIMARY KEY,
    bag_count INTEGER,
    foreign key (user_id) REFERENCES user(user_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS item (
    item_id INTEGER PRIMARY KEY,
    item_name TEXT,
    item_description TEXT,
    item_rarity TEXT,
    item_value INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS user_item (
    user_id INTEGER,
    item_id INTEGER,
    foreign key (user_id) REFERENCES user(user_id),
    foreign key (item_id) REFERENCES item(item_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS loot_box (
    loot_box_id INTEGER PRIMARY KEY,
    loot_box_name TEXT,
    loot_box_description TEXT,
    loot_box_value INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS loot_box_item (
    loot_box_id INTEGER,
    item_id INTEGER,
    foreign key (loot_box_id) REFERENCES loot_box(loot_box_id),
    foreign key (item_id) REFERENCES item(item_id)
  )
`);

// Close the database connection
db.close();
