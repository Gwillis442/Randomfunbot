
const lootBoxItems = [

  commonItems = [
    { name: 'Common Sword' },
    { name: 'Common Shield' },
    { name: 'Common Potion' },
    { name: 'Common Armor' },
  ],

  rareItems = [
    { name: 'Rare Shield' },
    { name: 'Rare Sword' },
    { name: 'Rare Potion' },
    { name: 'Rare Armor' },
  ],

  epicItems = [
    { name: 'Epic Potion' },
    { name: 'Epic Shield' },
    { name: 'Epic Sword' },
    { name: 'Epic Armor' },
  ],

  legendaryItems = [
    { name: 'Legendary Armor' },
    { name: 'Legendary Shield' },
    { name: 'Legendary Sword' },
    { name: 'Legendary Potion' },
  ],

];

let userBag = [];

const arraySize = 5;
const emojiArray = Array(arraySize).fill(null);
emojiArray[0] = '🤔';
emojiArray[1] = '👍';
emojiArray[2] = '👎';
emojiArray[3] = '🤡';
emojiArray[4] = '❤️';



module.exports = {
  lootBoxItems,
  emojiArray,
  userBag
};