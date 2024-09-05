/*
==================================
Random Number Generator 
When called the function will roll random numbers between 2 passed to the function
@param {number} min - The minimum number to roll
@param {number} max - The maximum number to roll
@returns {number} - The random number rolled
Modified: 11/13/2023
==================================
*/
function rng(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }

  module.exports = {rng};