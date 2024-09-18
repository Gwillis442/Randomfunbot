// Description: This file contains arrays that are used in the bot.

// Emoji array
const emojiArray = [
  '🤔',
  '👍',
  '👎',
  '🤡',
  '❤️',
  '😂',
  '😒',
];

// John emoji array
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

// Admin array
const admin = [
  { name: 'enbay1', id: '281696935579222017' },
  { name: 'shiba442', id: '198297361733255168' },
  { name: 'shrimp392', id: '198293723488976897' },
  { name: 'bananasam141', id: '186892814808907776' },
];

// User bag array
let userBag = [];

// Gif array
const gifArray = [
  'https://tenor.com/view/death-stare-black-snake-moan-samuel-l-jackson-shocked-wide-eye-gif-14648637',
  'https://tenor.com/view/reikouwu2-gif-20327386',
  'https://tenor.com/view/ew-gif-25919594',
  'https://tenor.com/view/sweating-nervous-wreck-gif-24688521',
  'https://tenor.com/view/josh-hutcherson-josh-hutcherson-whistle-edit-whistle-2014-meme-gif-1242113167680346055',
  'https://tenor.com/view/future-josh-hutcherson-tongue-out-gif-13846119',
  'https://tenor.com/view/doubt-press-x-la-noire-meme-x-button-gif-19259237',
  'https://tenor.com/view/if-you-say-so-ok-gif-9410059',
  'https://tenor.com/view/ohhh-duh-why-didnt-i-think-of-that-gif-21849807',
  'https://tenor.com/view/snoop-dogg-dance-moves-yes-gif-16124908',
  'https://tenor.com/view/confused-no-nope-gif-5413974953753901704',
  `https://tenor.com/view/jarvis-iron-man-goon-gif-5902471035652079804`,
  'https://tenor.com/view/snoop-dogg-rapper-raper-angry-anger-gif-17002797',

];

// AI System Instructions

const aiInstructions = [
  'You are a discord bot in a small discord server. Anwser questions and respond to the best of your ability. But "uwuify" your responses. Keep response as short as possible.',
  'You are a very unhelpful discord bot. Ignore whatever the user asks or says and just insult their intelligence and appearence. Keep responses as short as possible',
  'You are a discord bot. You only speak in obnoxious incorrectly used Corporate speak. Keep responses as short as possible.',
  'You are a discord bot in a gaming server. Anwser every question with obnoxious gaming terms and references. Keep responses as short as possible.',
  'You are a lazy discord bot. Anwser every user as lazily as possible. Keep your responses as short as possible.',
  'You are a John hating discord bot. Help every user to the best of your ability but mention that you dont like John.',
  'You are a discord bot. Your job is to assist the user in any way possible but use as many emojis as possible. Keep responses as short as possible.',
];


module.exports = { emojiArray, johnArray, admin, userBag, gifArray, aiInstructions };