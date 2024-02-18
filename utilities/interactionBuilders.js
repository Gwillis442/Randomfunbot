
const { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder  } = require('@discordjs/builders');
const { truncate } = require('fs');


function button_builder(label, sytle, disabled, customId) {
  const button = new ButtonBuilder()
  .setLabel(label)
  .setStyle(style)
  .setDisabled(disabled)
  .setCustomId('choose_series_2');
}

const buttons = {
    pick_Series_S1: () => {
        const box_series_1 = new ButtonBuilder()
            .setLabel('Series 1')
            .setStyle('Primary')
            .setCustomId('choose_series_1');

        return box_series_1;  // Return the ActionRow
    },

    info_Series_S1: () => {

      const info_Series_1 = new ButtonBuilder()
      .setLabel('Series 1')
      .setStyle('Primary')
      .setCustomId('info_series_1');

      return info_Series_1;  // Return the ActionRow
    },

    pick_Series_S2: () => {
        const box_series_2 = new ButtonBuilder()
            .setLabel('Series 2')
            .setStyle('Primary')
            .setDisabled(true)
            .setCustomId('choose_series_2');
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

    back_button: () => {
        const back = new ButtonBuilder()
        .setLabel('Back')
        .setStyle('Secondary')
        .setCustomId('back');


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

        return loot_box_info;  // Return the Button
    },

    leaderboard_coins: () => {

        const leaderboard_coins = new ButtonBuilder()
        .setLabel('Leaderboard Coins')
        .setStyle('Primary')
        .setCustomId('leaderboard_coins');

        return leaderboard_coins;  // Return the Button
        },

    leaderboard_items: () => {
        const leaderboard_items = new ButtonBuilder()
        .setLabel('Leaderboard Items')
        .setStyle('Primary')
        .setCustomId('leaderboard_items');

        return leaderboard_items;  // Return the Button
        },

      }

const actionRows = {

  custom_Row: (...buttons) => {
    
    return new ActionRowBuilder().addComponents(...buttons);
    
  },

  series_Row: () => {new ActionRowBuilder()
  .addComponents(buttons.pick_Series_S1(), buttons.pick_Series_S2(), buttons.pick_Series_S3());
  return series_Row;
  },

  boxes_Row: () => { new ActionRowBuilder()
  .addComponents(buttons.armor_Box_S1(), buttons.weapon_box_s1(), buttons.back_button());
  return boxes_Row;
  },

lootBoxInfoRow: () => { new ActionRowBuilder()
  .addComponents(buttons.loot_box_info(), buttons.inventory(), buttons.back_button());
  return lootBoxInfoRow;
},

armor_Box_S1_Row: () => { new ActionRowBuilder()
  .addComponents(buttons.armor_Box_S1(), buttons.back_button());
  return armor_Box_S1_Row;
},

inventory_Row: () => { new ActionRowBuilder()
  .addComponents(buttons.back_button());
  return inventory_Row;
},

}



module.exports = { 
    buttons,
    actionRows,
    button_builder,
 };