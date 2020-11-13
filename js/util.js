'use strict';

var generateRandomArrayItemNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomArrayItem = function (array) {
  return array[generateRandomArrayItemNumber(array)];
};

var shuffleArray = function (array) {
  var i = array.length;
  var j = 0;
  var temp;

  while (i--) {

    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

window.util = {
  generateRandomArrayItemNumber: generateRandomArrayItemNumber,
  getRandomArrayItem: getRandomArrayItem,
  shuffleArray: shuffleArray
};
