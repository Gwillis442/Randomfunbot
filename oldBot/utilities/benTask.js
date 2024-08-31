// Description: This file contains the task scheduler for the application.
const cron = require('node-cron');


 function benTask(Client, id, channel) {
    cron.schedule('0 0 * * 2', () => {
        Client.channels.cache.get(channel).send(`<@${id}> https://tenor.com/view/timboulder-futurama-bender-gif-5207467174174349818`);
    });
}

module.exports = {
    benTask
};