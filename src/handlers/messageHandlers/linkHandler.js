// Description: This file contains the linkBot functionality.
const { client } = require('../../client.js');
const { linkChannelId } = require('../../../config/config.json');
const { update_Database } = require('../../utils/updateDatabase.js');
const sqlite3 = require('sqlite3').verbose();

//Connection to the Database
const db = new sqlite3.Database('../database/messageCount.db', (err) => { 
  if (err) {
    console.error(err.message);
  } 
});

// Link handler
/*
When a message is sent in chat a link is checked for and if it is a TikTok link it is replaced with a vxtiktok link.
If the message is in the link channel, the link is replaced and the message is sent.
If the message is not in the link channel, the message is deleted and the link is sent in the link channel.
*/

client.on('messageCreate', (message) => {
try{
  if (message.author.bot) return;
  // Regex to match TikTok, Instagram Reel, and YouTube Shorts links
  const linkRegex = /https?:\/\/(?:www\.)?(tiktok\.com|vxtiktok\.com\/t\/[a-zA-Z0-9_-]+|vxtiktok\.com|instagram\.com\/reel\/\S+|youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}(?![a-zA-Z0-9_-]))(\/\S*)?/i;
  // Check if the message contains a link
  const containsLink = linkRegex.test(message.content);
  // Get the link channel
  const channelId = client.channels.cache.get(linkChannelId);

  if (containsLink) {
    // Get the link from the message
    let messageLink = message.content.match(linkRegex)[0];
    // Check if the message is in the link channel
    if (message.channel.id == channelId) {

      if (messageLink.includes('tiktok.com') && !messageLink.includes('vxtiktok.com')) {
        // Replace 'tiktok' with 'vxtiktok'
        messageLink = messageLink.replace('tiktok', 'vxtiktok');
        message.delete();
        //Update database to relect the link count
        update_Database(db, 'post_count', 'link_count', 'link_count + 1', message.author.id);
        update_Database(db, 'bag', 'bag_count', 'bag_count + 1', message.author.id);
        // Send the message to the link channel with the replaced link
        const messageContent = `${message.author}, please try to use 'vxtiktok' for better user experience.\n${message.content.replace(linkRegex, messageLink)}`;

        if (messageLink) {
          message.channel.send(messageContent);
        } else {
          console.error('Generated message link is null');
        }
      } else {
        update_Database(db, 'post_count', 'link_count', 'link_count + 1', message.author.id);
        update_Database(db, 'bag', 'bag_count', 'bag_count + 1', message.author.id);
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
      // Send the message to the link channel
      channelId.send(messageContent);
      //Update database to relect the link count
      update_Database(db, 'post_count', 'link_count', 'link_count + 1', message.author.id);
      update_Database(db, 'bag', 'bag_count', 'bag_count + 1', message.author.id);

    }
  
  }
} catch (error) {
  console.error("Error in link handler: ", error);
  }
});