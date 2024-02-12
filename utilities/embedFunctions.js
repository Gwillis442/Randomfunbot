const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder,} = require('@discordjs/builders');
const { EmbedBuilder,  AttachmentBuilder  } = require('discord.js');
const { openLootBox  } = require('./functions.js');
const { add_to_inventory, updateCount } = require('../database/dbFunctions.js');



function loot_box_info() {
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Loot Box Information')
        .setDescription('Loot boxes are seperated by series(1, 2, 3, etc.)\n and by type(Armor, Weapon, etc.)')
        .setTimestamp()
    return embed;
}

function lb_series_1() {
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Series 1 Loot Box Information')
        .setDescription('Series 1 loot boxes are the first series of loot boxes to be released.')
        .addFields(
            { name: 'Loot Box Type', value: 'Armor' },
            { name: 'Loot Box Rarity', value: 'Common: 8 at 45%\nUncommon: 7 at 30%\nRare: 9 at 20%\nEpic: 9 at 5%' })
        .setTimestamp()
    return embed;
}

async function inventory(user, db) {

    const coins = await new Promise((resolve, reject) => {
        db.get('SELECT coin_count FROM inventory WHERE user_id = ?', [user.id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });

    const items = await new Promise((resolve, reject) => {

        db.all(`
        SELECT item.item_name, inventory_items.item_count
        FROM inventory_items
        INNER JOIN item ON inventory_items.item_id = item.item_id
        WHERE inventory_items.inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?)
      `, [user.id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    let itemsText = items.map(item => `${item.item_name}: ${item.item_count}`).join('\n');
    if (itemsText === '') {
        itemsText = 'No items found';
    }

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Inventory')
        .setDescription(`Here is your inventory ${user.username}!`)
        .addFields(
            { name: 'Coins', value: `${coins.coin_count}` },
            { name: 'Inventory Items', value: `${itemsText}` }
        )
        .setTimestamp();
    return embed;
    }

function choose_series() {
    embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Choose a Loot Box')
    .setDescription('Choose a series of loot box to open')
    return embed;
}

function choose_type() {
    embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Choose a Loot Box')
        .setDescription('Choose a type of loot box to open')
        return embed;

}

async function open_loot_box(db, user,series, choice) {
    
    updateCount(db, 'inventory', 'coin_count', user.id, -50);
    const box = openLootBox(choice, series);

    add_to_inventory(db, user.id, box.id, 1);

    const attachment = new AttachmentBuilder(`./assets/${box.type}/${box.image}`)

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Loot Box Opened')
        .setDescription(`You have opened a ${box.rarity} ${box.type} loot box!`)
        .setThumbnail(`attachment://${box.image}`)
        .addFields(
            { name: 'Item Name', value: `${box.name}` },
            { name: 'Item Rarity', value: `${box.rarity}` }
        )
        .setTimestamp()  

        return embed;
}

    module.exports = {
        loot_box_info,
        lb_series_1,
        inventory,
        choose_series,
        choose_type,
        open_loot_box

    }