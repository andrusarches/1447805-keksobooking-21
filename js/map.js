'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mainMapPin = mapElement.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var MAX_PIN_NUMBER = 5;

  var fadeMap = function () {
    mapElement.classList.add('map--faded');
  };

  var showMap = function () {
    mapElement.classList.remove('map--faded');
  };

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (arrayElement) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.style = "left: " + arrayElement.location.x + "px; top: " + arrayElement.location.y + "px;";
    mapPin.querySelector('img').src = arrayElement.author.avatar;
    mapPin.querySelector('img').alt = arrayElement.offer.title;
    mapPin.addEventListener('click', function () {
      window.card.showAdCard(arrayElement);
    });
    return mapPin;
  };

  var removeRenderedAdPins = function () {
    var renderedAdPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < renderedAdPins.length; i++) {
      renderedAdPins[i].remove();
    }
  };

  var renderAdPins = function (adData) {
    window.card.removeAdCard();
    removeRenderedAdPins();
    var filteredAdData = [];
    filteredAdData = adData.filter(function (el) {
      return window.adFilter.filterAdData(el);
    });
    var slicedFilteredAdData = filteredAdData.slice(0, MAX_PIN_NUMBER);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slicedFilteredAdData.length; i++) {
      if (slicedFilteredAdData [i].offer.length !== 0) {
        fragment.appendChild(renderPin(slicedFilteredAdData[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.map = {
    mapElement,
    mainMapPin,
    fadeMap,
    showMap,
    renderAdPins,
    removeRenderedAdPins
  };
})();
