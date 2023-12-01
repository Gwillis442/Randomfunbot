const { lootBoxItems, userBag } = require('./item-arrays'); // Import from ItemArrays.js

/*
==================================
Random Number Generator 
When called the function will roll random numbers between 2 passed to the function
Modified: 11/13/2023
==================================
*/
function rng(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

/*
==================================
Loot Box generator
allows for the opening of a 'lootbox' that gives the user a sense of pride and acomplishment
Modified: 11/14/2023
==================================
*/
function openLootBox() {
  var num = rng(1, 100);

  if (num == 1) {
    return (lootBoxItems[3][rng(0, 3)]);
  } else if (num < 1 && num <= 20) {
    return (lootBoxItems[2][rng(0, 3)]);
  } else if (num > 20 && num <= 50) {
    return (lootBoxItems[1][rng(0, 3)]);
  } else {
    return (lootBoxItems[0][rng(0, 3)]);
  }

}

/*
==================================
Mod Alert
When called the function will send a message to the mod channel
Modified: 11/14/2023
==================================
*/
function modAlert(client, message) {
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
Bag Functions
When called the function will add remove or retrieve a user from the bag
Modified: 11/28/2023
==================================
*/
function getUsernameFromBag(index) {
  // Check if the index is within valid bounds
  if (index >= 0 && index < userBag.length) {
    return userBag[index];
  } else {
    console.error('Invalid index:', index);
    return null; // You might want to handle this case differently based on your requirements
  }
}

function popUsernameFromBag(index) {
  // Check if the index is within valid bounds
  if (index >= 0 && index < userBag.length) {
    // Remove and return the username at the specified index
    return userBag.splice(index, 1)[0];
  } else {
    console.error('Invalid index:', index);
    return null; // You might want to handle this case differently based on your requirements
  }
}

function pushUsernameToBag(userid) {
  userBag.push(userid);
  logWithTimestamp(`${userid} placed in bag`);
}

/*
==================================
Display Bag
When called the function will display the contents of the bag
Modified: 11/28/2023
==================================
*/
function displayBag() {
  // Create an object to store counts for each user
  const userCounts = {};

  // Count occurrences of each user ID in userBag
  userBag.forEach((userId) => {
    userCounts[userId] = (userCounts[userId] || 0) + 1;
  });

  // Display counts for each user
  Object.entries(userCounts).forEach(([userId, count]) => {
    console.log(`${userId}: ${count}`);
  });
}

/*
==================================
Log With Timestamp
When called the function will log the message with a timestamp
Modified: 11/28/2023
*/
function logWithTimestamp(message) {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${message}`);
}

/*
==================================
TestRNG
Function to test the RNG function
Modified: 11/14/2023
==================================
*/
function testRNG() {
  var x = 0;
  var y = 0;

  for (var i = 0; i < 100; i++) {
    var num = rng(5, 10);
    if (num > 10 || num < 5) {
      y++;
    } else {
      x++;
    }
  }
  console.log(`Testing RNG`);
  console.log(`Success: ${x} Fail: ${y}`);
  console.log('Test End')

}

function gracefulShutdown() {
  // Close the database connection
  db.close();

  // Exit the process
  process.exit();
}

module.exports = {
  openLootBox,
  rng,
  testRNG,
  modAlert,
  popUsernameFromBag,
  getUsernameFromBag,
  pushUsernameToBag,
  displayBag,
  logWithTimestamp,
  gracefulShutdown,

};