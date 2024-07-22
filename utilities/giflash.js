

async function gifLash(gameParticipants, channel) {

    await channel.send(`Giflash is starting with ${gameParticipants.length} players!`);

}

module.exports = {
    gifLash,
} 