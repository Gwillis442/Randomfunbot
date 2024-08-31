const { userBag } = require('../utilities/item-arrays');

const sqlite3 = require('sqlite3').verbose();
//starting database
const db = new sqlite3.Database('./botDatabase.db', (err) => {
  if (err) {
      console.error('Error opening database:', err);
  } else {
      console.log('Database opened successfully');
  }
});

/*
db.run(`DELETE FROM inventory_items`, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) deleted: ${this.changes}`);
});



db.run(`UPDATE inventory SET coin_count = 100`, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);
});
*/
/*
let date = new Date();
date.setHours(date.getHours() - 25);

db.run(`UPDATE daily SET last_claimed = ?`, date, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);
});
*/
/*
let rowsToUpdate = [
  {id: 1, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/4/48/Cactus_armor.png'},
  {id: 2, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/e/ef/Wood_armor.png'},
  {id: 3, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/9b/Ebonwood_armor.png'},
  {id: 4, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/94/Shadewood_armor.png'},
  {id: 5, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/8/8d/Palm_Wood_armor.png'},
  {id: 6, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/6/69/Boreal_Wood_armor.png'},
  {id: 7, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/0/0d/Rich_Mahogany_armor.png'},
  {id: 8, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/2/24/Ash_Wood_armor.png'},
  {id: 9, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/d/d1/Tin_armor.png'},
  {id: 10, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/9d/Copper_armor.png'},
  {id: 11, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/2/24/Lead_armor.png'},
  {id: 12, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/6/67/Iron_armor.png'},
  {id: 13, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/90/Angler_armor.png'},
  {id: 14, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/3/37/Pumpkin_armor.png'},
  {id: 15, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/8/8b/Rain_armor.png'},
  {id: 16, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/3/30/Gold_armor.png'},
  {id: 17, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/8/8a/Silver_armor.png'},
  {id: 18, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/94/Platinum_armor.png'},
  {id: 19, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/4/4d/Tungsten_armor.png'},
  {id: 20, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/f/f1/Fossil_armor.png'},
  {id: 21, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/9/98/Pink_Snow_armor.png'},
  {id: 22, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/8/81/Snow_armor.png'},
  {id: 23, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/3/3d/Bee_armor.png'},
  {id: 24, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/7/73/Ninja_armor.png'},
  {id: 25, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/d/d4/Jungle_armor.png'},
  {id: 26, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/e/ea/Obsidian_armor.png'},
  {id: 27, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/a/a1/Crimson_armor.png'},
  {id: 28, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/c/c5/Shadow_armor.png'},
  {id: 29, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/d/d9/Meteor_armor.png'},
  {id: 30, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/d/d3/Necro_armor.png'},
  {id: 31, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/8/8a/Gladiator_armor.png'},
  {id: 32, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/c/c8/Ancient_Cobalt_armor.png'},
  {id: 33, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5a/Ancient_Shadow_armor.png'},
  {id: 34, value: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/7/7e/Molten_armor.png'},
];

rowsToUpdate.forEach(row => {
  db.run('UPDATE item SET item_link = ? WHERE item_id = ?', [row.value, row.id]);
});

*/

db.run(`UPDATE bag_count SET bag_count = 1 WHERE bag_count >= 0`, function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);
});