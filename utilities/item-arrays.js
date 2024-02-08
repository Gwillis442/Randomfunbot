
const lootBoxItems = [

  commonItems = [
    { name: 'Common Sword', image: 'common_sword1.png' },
    { name: 'Common Shield' },
    { name: 'Common Potion' },
    { name: 'Common Armor' },
  ],

  rareItems = [
    { name: 'Rare Shield' },
    { name: 'Rare Sword', image: 'rare_sword1.png'},
    { name: 'Rare Potion' },
    { name: 'Rare Armor' },
  ],

  epicItems = [
    { name: 'Epic Potion' },
    { name: 'Epic Shield', image: 'epic_shield1.png'},
    { name: 'Epic Sword' },
    { name: 'Epic Armor' },
  ],

  legendaryItems = [
    { name: 'Legendary Armor' },
    { name: 'Legendary Shield' },
    { name: 'Legendary Sword', image: 'legendary_sword1.png'},
    { name: 'Legendary Potion' },
  ],

];

let userBag = [];


const emojiArray = [
'🤔',
'👍',
'👎',
'🤡',
'❤️',
'😂',
'😒',
];

const johnArray = [
'👎',
'🤡',
'😒',
'💩',
'🙄',
'😑',
'😶‍🌫️',
'🤑',
'🤢',
'🤮',
'🥸',
'👺',
'👹',
'🐀',
'🦨',
'🐄',
'🐖',
'🐓',
'🤓',
];

const admin = [
  {name: 'enbay1', id: '281696935579222017'},
  {name: 'shiba442', id: '198297361733255168'},
  {name: 'shrimp392', id: '198293723488976897'},
  {name: 'bananasam141', id: '186892814808907776'},
];



module.exports = {
  lootBoxItems,
  emojiArray,
  johnArray,
  userBag,
  admin,
};