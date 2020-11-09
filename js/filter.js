'use strict';

(function () {
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

    return (filterType.value === 'any' || filterType.value === arrayElement.offer.type)
      && (filterPrice.value === 'any' || filterPrice.value === determinePriceRange(arrayElement.offer.price))
      && (filterRooms.value === 'any' || parseInt(filterRooms.value, 10) === arrayElement.offer.rooms)
      && (filterGuests.value === 'any' || parseInt(filterGuests.value, 10) === arrayElement.offer.guests);
  };

  var disableAdFilterForm = function () {
    for (var k = 0; k < filterElements.length; k++) {
      filterElements[k].disabled = true;
    }
  };

  var enableAdFilterForm = function () {
    for (var k = 0; k < filterElements.length; k++) {
      filterElements[k].disabled = false;
    }
    adFilterForm.addEventListener('change', function () {

      window.map.renderAdPins(window.load.data);
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
})();
