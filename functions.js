const {lootBoxItems,} = require('./item-arrays'); // Import from ItemArrays.js

/*
==================================
Random Number Generator 
When called the function will roll random numbers between 2 passed to the function
Modified: 11/13/2023
==================================
*/
function rng(min, max){
    return(Math.floor(Math.random() * (max - min + 1)) + min);  
    }

/*
==================================
Loot Box generator
allows for the opening of a 'lootbox' that gives the user a sense of pride and acomplishment
Modified: 11/14/2023
==================================
*/
function openLootBox(){
    var num = rng(1,100);
  
    if(num == 1){
    return(lootBoxItems[3][rng(0,3)]);
    }else if(num < 1 && num <= 20){
      return(lootBoxItems[2][rng(0,3)]);
    }else if(num > 20 && num <= 50){
      return(lootBoxItems[1][rng(0,3)]);
    }else{
      return(lootBoxItems[0][rng(0,3)]);
    }
  
  }

  function modAlert(client, message){
    const channel = client.channels.cache.get('1164650721514369135');

    if (channel) {
      const authorName = message.author.username; // Get the original message author's name
      const messageContent = `Deleted message from **${message.author.tag}**: "${message.content}"`;
      channel.send(messageContent);
    } else {
      console.error(`Channel with ID ${channelId} not found.`);
    }
  }

  /*
==================================
TestRNG
Function to test the RNG function
Modified: 11/14/2023
==================================
*/
function testRNG(){
    var x = 0;
    var y = 0;
   
    for(var i = 0; i < 100; i++){
      var num = rng(5,10);
      if(num > 10|| num < 5){
        y++;
      } else {
        x++;
      }
  }
  console.log(`Testing RNG`);
  console.log(`Success: ${x} Fail: ${y}`);
  console.log('Test End')
  
  }

module.exports = {
    openLootBox,
    rng,
    testRNG,
    modAlert,
};