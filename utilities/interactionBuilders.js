
const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder  } = require('@discordjs/builders');
const { truncate } = require('fs');



const buttons = {
    pick_Series_S1: () => {
        const box_series_1 = new ButtonBuilder()
            .setLabel('Series 1')
            .setStyle('Primary')
            .setCustomId('choose_series_1');


        return box_series_1;  // Return the ActionRow
    },

    armor_Box_S1: () => {

        const box_armor_s1 = new ButtonBuilder()
        .setLabel('Armor 75c')
        .setStyle('Primary')
        .setCustomId('armor_s1');


        return box_armor_s1  // Return the ActionRow
    },

    weapon_box_s1: () => {
        const box_weapon_s1 = new ButtonBuilder()
        .setLabel('Weapon 100c')
        .setStyle('Primary')
        .setDisabled(true)
        .setCustomId('weapon_s1');

        return box_weapon_s1;  // Return the ActionRow
    },

    back_button: (previous) => {
        const back = new ButtonBuilder()
        .setLabel('Back')
        .setStyle('Secondary')
        .setCustomId(`${previous}`);


        return back;  // Return the ActionRow
    },

    inventory: () => {
        const inventory = new ButtonBuilder()
        .setLabel('Inventory')
        .setStyle('Primary')
        .setCustomId('inventory');

        return inventory;  // Return the ActionRow
    },

    open_loot_box: () => {
        const open_loot_box = new ButtonBuilder()
        .setLabel('Open Loot Box')
        .setStyle('Primary')
        .setCustomId('open_loot_box');

        return open_loot_box;  // Return the ActionRow
    },

    loot_box_info: () => {
        const loot_box_info = new ButtonBuilder()
        .setLabel('Loot Box Info')
        .setStyle('Primary')
        .setCustomId('loot_box_info');

        return loot_box_info;  // Return the ActionRow
    },
}

module.exports = { 
    buttons,
 };