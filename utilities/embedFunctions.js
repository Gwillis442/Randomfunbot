const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('@discordjs/builders');
const { EmbedBuilder, } = require('discord.js');



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

function choose_loot_box() {
    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('choose_loot_box')
                .setPlaceholder('Choose a loot box')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Series 1')
                        .setValue('series_1')
                )
        );
    return row;
}

async function open_loot_box(db, user) {

    updateCount(db, 'inventory', 'coin_count', user.id, -50);
    const box = openLootBox('armor', 1);

    add_to_inventory(db, user.id, box.id, 1);
    await interaction.reply({
        content: `You opened a ${box.rarity}: ${box.name}!`,
        files: [{ attachment: `./assets/${box.type}/${box.image}`, name: (box.image) }]
    });
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Loot Box')
        .setDescription()
        .setTimestamp()

    return [embed];
}

    module.exports = {
        loot_box_info,
        lb_series_1,
        inventory,

    }