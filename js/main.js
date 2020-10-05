'use strict';

var randomizedAds = [];
var TITLES = ['Объявление 1', 'Объявление 2', 'Объявление 3', 'Объявление 4', 'Объявление 5', 'Объявление 6', 'Объявление 7', 'Объявление 8'];
var ADRESSES = ['600, 300', '300, 200', '100, 250', '450, 300', '350, 350', '400, 250', '250, 300'];
var PRICES = [1000, 2500, 6000, 10000, 9000];
var TYPES = ['palace', 'flat', 'house', 'bungalow'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 5, 10];
var CHECKIN = ['12:00', '13.00', '14.00'];
var CHECKOUT = ['12:00', '13.00', '14.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Отличное место!', 'Замечательный вид из окна!', 'Хорошее место! ', 'Отличные условия!', 'Удобное расположение!', 'Просторно и удобно', 'Все необходимые удобства!', 'Рукой подать до главных достопримечательностей!'];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

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

var getRandomFeatures = function () {
  var shuffledFeatures = shuffleArray(FEATURES);
  var j = Math.floor(Math.random() * 6 + 1);
  var randomFeatures = [];
  for (var i = 0; i < j; i++) {
    randomFeatures.push(shuffledFeatures[i]);
  }
  return randomFeatures;
};

var getRandomPhotos = function () {
  var j = Math.floor(Math.random() * 3 + 1);
  var shuffledPhotos = shuffleArray(PHOTOS);
  var randomPhotos = [];
  for (var z = 0; z < j; z++) {
    randomPhotos.push(shuffledPhotos[z]);
  }
  return randomPhotos;
};

var randomTitleArray = shuffleArray(TITLES);
var randomImageArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8]);

var getRandomXPosition = function () {
  return Math.floor(Math.random() * (1150 - 50) + 50);
};

var getRandomYPosition = function () {
  return Math.floor(Math.random() * (630 - 130)) + 130;
};

var generateRandomAds = function () {
  for (var i = 0; i < 8; i++) {
    randomizedAds.push({
      "author": {
        "avatar": "img/avatars/user0" + randomImageArray[i] + ".png"
      },
      "offer": {
        "title": randomTitleArray[i],
        "address": getRandomArrayItem(ADRESSES),
        "price": getRandomArrayItem(PRICES),
        "type": getRandomArrayItem(TYPES),
        "rooms": getRandomArrayItem(ROOMS),
        "guests": getRandomArrayItem(GUESTS),
        "checkin": getRandomArrayItem(CHECKIN),
        "checkout": getRandomArrayItem(CHECKOUT),
        "features": getRandomFeatures(),
        "description": getRandomArrayItem(DESCRIPTIONS),
        "photos": getRandomPhotos()
      },
      "location": {
        "x": getRandomXPosition(),
        "y": getRandomYPosition()
      }
    });
  }
  return randomizedAds;
};

generateRandomAds();

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (arrayElement) {
  var mapPin = mapPinTemplate.cloneNode(true);

  mapPin.style = "left: " + arrayElement.location.x + "px; top: " + arrayElement.location.y + "px;";
  mapPin.querySelector('img').src = arrayElement.author.avatar;
  mapPin.querySelector('img').alt = arrayElement.offer.title;
  return mapPin;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(randomizedAds[i]));
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
