const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder,} = require('@discordjs/builders');
const { EmbedBuilder,  AttachmentBuilder  } = require('discord.js');
const { openLootBox  } = require('./functions.js');
const { add_to_inventory, updateCount, total_Items, highest_Coins, } = require('../database/dbFunctions.js');
const res = require('express/lib/response.js');



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

    const total_items = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) FROM inventory_items WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?)', [user.id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });

    const item_common = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) FROM inventory_items WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?) AND item_id IN (SELECT item_id FROM item WHERE item_rarity = "common")', [user.id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });

    const item_uncommon = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) FROM inventory_items WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?) AND item_id IN (SELECT item_id FROM item WHERE item_rarity = "uncommon")', [user.id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
         });
     });

     const item_rare = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) FROM inventory_items WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?) AND item_id IN (SELECT item_id FROM item WHERE item_rarity = "rare")', [user.id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
         });
     });

     const item_epic = await new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) FROM inventory_items WHERE inventory_id = (SELECT inventory_id FROM inventory WHERE user_id = ?) AND item_id IN (SELECT item_id FROM item WHERE item_rarity = "epic")', [user.id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
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
        .setTitle(`Inventory of ${user.username}` )
        .setFields(
            { name: 'Coins:', value: `${coins.coin_count}`},
            { name: 'Total Items:', value: `${total_items['COUNT(*)']} / 34`},
            { name: 'Commons', value: `${item_common['COUNT(*)']} / 8`, inline: true},
            { name: 'Uncommons', value: `${item_uncommon['COUNT(*)']} / 7`, inline: true},
            { name: '\u200B', value: '\u200B' },
            { name: 'Rares', value: `${item_rare['COUNT(*)']} / 9`, inline: true},
            { name: 'Epics', value: `${item_epic['COUNT(*)']} / 9`, inline: true}
        )
        .setFooter(
            { text: `Items in Inventory:\n${itemsText}\n` }
        )
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
    
    const box = openLootBox(choice, series);
    
    add_to_inventory(db, user, box.id, 1);

    const attachment = new AttachmentBuilder(`../assets/${box.type}/${box.image}`, 'loot_box.png')

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Loot Box')
        .setDescription(`You have opened a loot box!`)
        .setImage('attachment://loot_box.png')
        .addFields(
            { name: 'Item Name', value: `${box.name}` },
            { name: 'Item Rarity', value: `${box.rarity}` }
        )
        .setTimestamp()  

        return {embed, attachment};

}

async function leaderboard_coins(db) {
   
    const coins = await new Promise((resolve, reject) => {
    db.all('SELECT user_id, coin_count FROM inventory ORDER BY coin_count DESC LIMIT 10', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    });
});

    let most_coins = coins.map(coin => `${coin.user_id}: ${coin.coin_count}`).join('\n');
    if (most_coins === '') {
        most_coins = 'No coins found';
    }

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Leaderboard Coins')
        .setDescription('Top 10 users with the most coins')
        .setFooter({text: `${most_coins}`})
        .setTimestamp()
        return embed;        
        
}

async function leaderboard_items(db) {
    var fields = total_Items(db);
    let resolvedFields = await fields;

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Leaderboard Items')
        .setDescription('Top 10 users with the most items')
        .setFooter({text: `${resolvedFields}`})
        .setTimestamp()

        return embed;
}


    module.exports = {
        loot_box_info,
        lb_series_1,
        inventory,
        choose_series,
        choose_type,
        open_loot_box,
        leaderboard_coins,
        leaderboard_items,

    }