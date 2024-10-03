
import sqlite3

conn = sqlite3.connect('gameInfo.db')

cursor = conn.cursor()

cursor.executescript('''

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    coins INT DEFAULT 0,
    power_level INT DEFAULT 1,
    current_biome INT REFERENCES Biomes(biome_id)
);

CREATE TABLE Biomes (
    biome_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    resources TEXT,
);

CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    rarity VARCHAR(50),
    biome_id INT REFERENCES Biomes(biome_id)
);

CREATE TABLE Inventory (
    inventory_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    item_id INT REFERENCES Items(item_id),
    quantity INT DEFAULT 1
);

CREATE TABLE Lootboxes (
    lootbox_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    power_level_required INT,
    contents TEXT
);

CREATE TABLE Trades (
    trade_id SERIAL PRIMARY KEY,
    user_id_from INT REFERENCES Users(user_id),
    user_id_to INT REFERENCES Users(user_id),
    item_id INT REFERENCES Items(item_id),
    status VARCHAR(50) DEFAULT 'pending'
);

CREATE TABLE Guilds (
    guild_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    members TEXT
);

''')

conn.commit()
conn.close()