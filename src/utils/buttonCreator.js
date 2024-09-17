const { ButtonBuilder } = require('discord.js');

function buttonBuilder(label, style, disabled, customId) {
    const button = new ButtonBuilder()
    .setLabel(label)
    .setStyle(style)
    .setDisabled(disabled)
    .setCustomId(customId);
    return button;
  }

module.exports = { buttonBuilder };
