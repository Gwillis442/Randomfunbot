const { ActionRowBuilder } = require('discord.js');


function actionRowBuilder(components) {
    const actionRow = new ActionRowBuilder()
    .addComponents(components);
    return actionRow;
  }

module.exports = { actionRowBuilder };