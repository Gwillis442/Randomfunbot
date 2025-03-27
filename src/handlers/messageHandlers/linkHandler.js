// Description: This file contains the linkBot functionality.
const { client } = require('../../client.js');
const { linkChannelId } = require('../../../config/config.json');
const { updateUserLinks } = require('../../../database/databaseUtils/updateDB.js');
const { getGPTResponse } = require('../gptResponseHandler/gptSummarizeHandler.js')

// Link handler
/*
When a message is sent in chat a link is checked for and if it is a TikTok link it is replaced with a vxtiktok link.
If the message is in the link channel, the link is replaced and the message is sent.
If the message is not in the link channel, the message is deleted and the link is sent in the link channel.
*/

client.on('messageCreate', async (message) => {
  try {
    if (message.author.bot) return;
    const isLinkRegex = /https?:\/\/(?:www\.)?\S+/i;
    // Regex to match TikTok, Instagram Reel, and YouTube Shorts links
    //const linkRegex = /https?:\/\/(?:www\.)?(tiktok\.com|vxtiktok\.com\/t\/[a-zA-Z0-9_-]+|vxtiktok\.com|instagram\.com\/reel\/\S+|youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}(?![a-zA-Z0-9_-]))(\/\S*)?/i;
    const isShortContentRegex = /https?:\/\/(?:www\.)?(tiktok\.com|vxtiktok\.com\/t\/[a-zA-Z0-9_-]+|vxtiktok\.com|instagram\.com\/reel\/\S+|youtube\.com\/shorts\/[a-zA-Z0-9_-]{11}(?![a-zA-Z0-9_-])|x\.com\/\S+|twitter\.com\/\S+)(\/\S*)?/i;
    // Regex to match common links 
    const isCommonContentRegex = /https?:\/\/(?!www\.)?(?!.*\b(tiktok\.com|vxtiktok\.com|youtube\.com|youtu\.be|reddit\.com|steamcommunity\.com|instagram\.com|tenor\.com)\b)\S+/i;
    // Check if the message contains a link
    const containsLink = isLinkRegex.test(message.content);
    // Get the link channel
    const channelId = client.channels.cache.get(linkChannelId);

    if (containsLink) {
      const containsShortLink = isShortContentRegex.test(message.content);
      if (containsShortLink) {
        // Get the link from the message
        let messageLink = message.content.match(linkRegex)[0];
        // Check if the message is in the link channel
        if (message.channel.id == channelId) {

          if (messageLink.includes('tiktok.com') && !messageLink.includes('vxtiktok.com')) {
            // Replace 'tiktok' with 'vxtiktok'
            messageLink = messageLink.replace('tiktok', 'vxtiktok');
            message.delete();
            //Update database to relect the link count
            //updateUserLinks(message.author.id);
            // Send the message to the link channel with the replaced link
            const messageContent = `${message.author}, please try to use 'vxtiktok' for better user experience.\n**Your TikTok provided by our glorious leader Donald J. Trump**:tm:\n${message.content.replace(linkRegex, messageLink)}`;

            if (messageLink) {
              message.channel.send(messageContent);
            } else {
              console.error('Generated message link is null');
            }
          } else {
            //updateUserLinks(message.author.id);
          }


        } else {

          var messageContent;

          if (messageLink.includes('tiktok.com') && !messageLink.includes('vxtiktok.com')) {
            // Replace 'tiktok' with 'vxtiktok'
            messageLink = messageLink.replace('tiktok', 'vxtiktok');
            messageContent = `${message.author}, please try to use 'vxtiktok' for better user experience.\n${message.content.replace(linkRegex, messageLink)}`;
          } else {
            messageContent = `${message.author}, please post short and social media content links in <#${channelId.id}>.\n${message.content}`;
          }

          message.delete();
          // Send the message to the link channel
          channelId.send(messageContent);
          //Update database to relect the link count
          //updateUserLinks(message.author.id);
        }
      } else {
        try {
        const containsCommonLink = isCommonContentRegex.test(message.content);

        if(containsCommonLink){
          console.log(message.content);
          const summary = await getGPTResponse(message.content);
          if (summary && summary.trim().length > 0) {
            message.channel.send(summary);
          } else {
            console.error("Generated summary is empty or invalid.");
          }
        }
      } catch (error){
        console.log("Error summarizing article", error);
      }
  
    } 
    }
  } catch (error) {
    console.error("Error in link handler: ", error);
  }
});