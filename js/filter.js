'use strict';

var adFilterForm = document.querySelector('.map__filters');
var filterElements = Array.from(adFilterForm.children);
var filterType = adFilterForm.querySelector('#housing-type');
var filterPrice = adFilterForm.querySelector('#housing-price');
var filterRooms = adFilterForm.querySelector('#housing-rooms');
var filterGuests = adFilterForm.querySelector('#housing-guests');
var featuresFieldset = adFilterForm.querySelector('#housing-features');
var features = featuresFieldset.querySelectorAll('input[type="checkbox"]');

var MIN_PRICE_TRESHOLD = 10000;
var MAX_PRICE_TRESHOLD = 50000;

var determinePriceRange = function (price) {
  if (price < MIN_PRICE_TRESHOLD) {
    return 'low';
  } else if (price > MAX_PRICE_TRESHOLD) {
    return 'high';
  }
  return 'middle';
};

var filterAdData = function (arrayElement) {
  for (var i in features) {
    if (features.hasOwnProperty(i)) {
      var feature = features[i];
      if (feature.checked && !arrayElement.offer.features.includes(feature.value)) {
        return false;
      }
    }
  }

  return ((filterType.value === 'any' || filterType.value === arrayElement.offer.type)
    && (filterPrice.value === 'any' || filterPrice.value === determinePriceRange(arrayElement.offer.price))
    && (filterRooms.value === 'any' || parseInt(filterRooms.value, 10) === arrayElement.offer.rooms)
    && (filterGuests.value === 'any' || parseInt(filterGuests.value, 10) === arrayElement.offer.guests));
};

var disableAdFilterForm = function () {
  for (var k = 0; k < filterElements.length; k++) {
    filterElements[k].disabled = true;
  }
};

var enableAdFilterForm = function () {
  var executePinRendering = function () {
    window.map.renderAdPins(window.download.data);
  };

  for (var k = 0; k < filterElements.length; k++) {
    filterElements[k].disabled = false;
  }
  adFilterForm.addEventListener('change', function () {
    window.debounce(executePinRendering);
  });
};

var resetAdFilter = function () {
  adFilterForm.reset();
};

window.adFilter = {
  resetAdFilter,
  disableAdFilterForm,
  enableAdFilterForm,
  filterAdData
};
