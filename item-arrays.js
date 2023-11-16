
const lootBoxItems = [
    { name: 'Common Sword', rarity: 'common' },
    { name: 'Rare Shield', rarity: 'rare' },
    { name: 'Epic Potion', rarity: 'epic' },
    { name: 'Legendary Armor', rarity: 'legendary' },
  ];

const arraySize = 7;
const emojiArray = Array(arraySize).fill(null);
    emojiArray[0] = '👍';
    emojiArray[1] = '👎';
    emojiArray[2] = '🤡';
    emojiArray[3] = '❤️';
  
  module.exports = {
    lootBoxItems,
    emojiArray
  };