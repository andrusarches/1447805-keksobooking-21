'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelectorAll('.map__filter, .map__features');
  var mapPins = document.querySelector('.map__pins');

  var fadeMap = function () {
    map.classList.add('map--faded');
  };

  var showMap = function () {
    map.classList.remove('map--faded');
  };

  var disableMapFilters = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = true;
    }
  };

  var enableMapFilters = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].disabled = false;
    }
  };

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

  var renderAdPins = function (adData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adData.length; i++) {
      if (adData[i].offer) {
        fragment.appendChild(renderPin(adData[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.map = {
    map: map,
    mainMapPin: mainMapPin,
    fadeMap: fadeMap,
    showMap: showMap,
    disableMapFilters: disableMapFilters,
    enableMapFilters: enableMapFilters,
    renderAdPins: renderAdPins
  };
})();
