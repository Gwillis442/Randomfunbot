// Description: This file contains the linkBot functionality.
const { client } = require('../../client.js');
const { linkChannelId } = require('../../../config/config.json');
const { update_Database } = require('../../utils/updateDatabase.js');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database/messageCount.db', (err) => { 
  if (err) {
    console.error(err.message);
  } 
});

client.on('messageCreate', (message) => {
try{
  if (message.author.bot) return;
  
  const linkRegex = /https?:\/\/(?:www\.)?(tiktok\.com|vxtiktok\.com\/t\/[a-zA-Z0-9_-]+|vxtiktok\.com|instagram\.com\/reel\/\S+|youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}(?![a-zA-Z0-9_-]))(\/\S*)?/i;
  const containsLink = linkRegex.test(message.content);
  const channelId = client.channels.cache.get(linkChannelId);

  if (containsLink) {

    let messageLink = message.content.match(linkRegex)[0];

    if (message.channel.id == channelId) {

      if (messageLink.includes('tiktok.com') && !messageLink.includes('vxtiktok.com')) {
        // Replace 'tiktok' with 'vxtiktok'
        messageLink = messageLink.replace('tiktok', 'vxtiktok');
        message.delete();
        update_Database(db, 'post_count', 'link_count', 'link_count + 1');
        update_Database(db, 'bag', 'bag_count', 'bag_count + 1');
        const messageContent = `${message.author}, please try to use 'vxtiktok' for better user experience.\n${message.content.replace(linkRegex, messageLink)}`;

        if (messageLink) {
          message.channel.send(messageContent);
        } else {
          console.error('Generated message link is null');
        }
      }

    } else {

      var messageContent;

      if (messageLink.includes('tiktok.com') && !messageLink.includes('vxtiktok.com')) {
        // Replace 'tiktok' with 'vxtiktok'
        messageLink = messageLink.replace('tiktok', 'vxtiktok');
        messageContent = `${message.author}, please try to use 'vxtiktok' for better user experience.\n${message.content.replace(linkRegex, messageLink)}`;
      } else {
        messageContent = `${message.author}, please post short content links in <#${channelId.id}>.\n${message.content}`;
      }

      message.delete();
      channelId.send(messageContent);
      update_Database(db, 'post_count', 'link_count', 'link_count + 1');
      update_Database(db, 'bag', 'bag_count', 'bag_count + 1');

    }
  
  }
} catch (error) {
  console.error("Error in link handler: ", error);
  }
});