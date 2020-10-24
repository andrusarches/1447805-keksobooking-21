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
let mainMapPin = document.querySelector('.map__pin--main');
let newAdForm = document.querySelector('.ad-form');
let newAddressField = newAdForm.querySelector('#address');
let mainMapPinInactiveXPosition = parseInt(mainMapPin.style.left, 10) + 32;
let mainMapPinInactiveYPosition = parseInt(mainMapPin.style.top, 10) + 32;
let mainMapPinActiveXPosition = parseInt(mainMapPin.style.left, 10) + 32;
let mainMapPinActiveYPosition = parseInt(mainMapPin.style.top, 10) + 65;
let newPriceField = newAdForm.querySelector('#price');
let newHousingTypeField = newAdForm.querySelector('#type');
let newCheckInField = newAdForm.querySelector('#timein');
let newCheckOutField = newAdForm.querySelector('#timeout');
let newRoomNumberField = newAdForm.querySelector('#room_number');
let newCapacityField = newAdForm.querySelector('#capacity');

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

let showMap = function () {
  map.classList.remove('map--faded');
};

let fadeMap = function () {
  map.classList.add('map--faded');
};

let newAdFieldsets = document.querySelectorAll('.ad-form-header, .ad-form__element');

let disableNewAdForm = function () {
  for (let i = 0; i < newAdFieldsets.length; i++) {
    newAdFieldsets[i].disabled = true;
  }
  newAdForm.classList.add('ad-form--disabled');
};

let enableNewAdForm = function () {
  for (let i = 0; i < newAdFieldsets.length; i++) {
    newAdFieldsets[i].disabled = false;
  }
  newAdForm.classList.remove('ad-form--disabled');
};

let mapFilters = document.querySelectorAll('.map__filter, .map__features');

let disableMapFilters = function () {
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = true;
  }
};

let enableMapFilters = function () {
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = false;
  }
};

let lockNewAddressField = function () {
  newAddressField.disabled = true;
};

let fillOutAddressInactive = function () {
  newAddressField.value = mainMapPinInactiveXPosition + ', ' + mainMapPinInactiveYPosition;
};

let fillOutAddressActive = function () {
  newAddressField.value = mainMapPinActiveXPosition + ', ' + mainMapPinActiveYPosition;
};

let matchPriceRangeWithHousingType = function () {
  if (newHousingTypeField.value === 'bungalow') {
    newPriceField.min = 0;
    newPriceField.placeholder = '0';
  } else if (newHousingTypeField.value === 'flat') {
    newPriceField.min = 1000;
    newPriceField.placeholder = '1000';
  } else if (newHousingTypeField.value === 'house') {
    newPriceField.min = 5000;
    newPriceField.placeholder = '5000';
  } else if (newHousingTypeField.value === 'palace') {
    newPriceField.min = 10000;
    newPriceField.placeholder = '10000';
  }
};

newHousingTypeField.addEventListener('input', matchPriceRangeWithHousingType);

let matchRoomNumberWithCapacity = function () {
  if (newRoomNumberField.value === '1') {
    if (newCapacityField.value === '1') {
      newCapacityField.setCustomValidity('');
    } else {
      newCapacityField.setCustomValidity('В однокомнатном помещении может расположиться один гость.');
    }
  } else if (newRoomNumberField.value === '2') {
    if (newCapacityField.value === '1' || newCapacityField.value === '2') {
      newCapacityField.setCustomValidity('');
    } else {
      newCapacityField.setCustomValidity('Двухкомнатное помещение доступно для 1-го или 2-ух гостей.');
    }
  } else if (newRoomNumberField.value === '3') {
    if (newCapacityField.value === '1' || newCapacityField.value === '2' || newCapacityField.value === '3') {
      newCapacityField.setCustomValidity('');
    } else {
      newCapacityField.setCustomValidity('Трёхкомнатное помещение доступно для 1-го, 2-ух или 3-ёх гостей.');
    }
  } else if (newRoomNumberField.value === '100') {
    if (newCapacityField.value === '0') {
      newCapacityField.setCustomValidity('');
    } else {
      newCapacityField.setCustomValidity('Дворец - не для гостей!');
    }
  }
};

newAdForm.addEventListener('change', matchRoomNumberWithCapacity);

let checkCheckInAndCheckOut = function () {
  if (parseInt(newCheckInField.value, 10) === 12) {
    newCheckOutField.querySelector('#timeout12').disabled = false;
    newCheckOutField.querySelector('#timeout13').disabled = true;
    newCheckOutField.querySelector('#timeout14').disabled = true;
  } else if (parseInt(newCheckInField.value, 10) === 13) {
    newCheckOutField.querySelector('#timeout12').disabled = false;
    newCheckOutField.querySelector('#timeout13').disabled = false;
    newCheckOutField.querySelector('#timeout14').disabled = true;
  } else if (parseInt(newCheckInField.value, 10) === 14) {
    newCheckOutField.querySelector('#timeout12').disabled = false;
    newCheckOutField.querySelector('#timeout13').disabled = false;
    newCheckOutField.querySelector('#timeout14').disabled = false;
  }
};

newCheckInField.addEventListener('change', checkCheckInAndCheckOut);

let deactivatePage = function () {
  fadeMap();
  disableMapFilters();
  disableNewAdForm();
  fillOutAddressInactive();
  lockNewAddressField();
};

let activatePage = function () {
  showMap();
  enableMapFilters();
  enableNewAdForm();
  fillOutAddressActive();
  matchRoomNumberWithCapacity();
};

deactivatePage();

mainMapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0 && map.classList.contains('map--faded')) {
    activatePage();
  }
});

mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activatePage();
  }
});

var fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(randomizedAds[i]));
}

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
