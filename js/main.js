'use strict';

(function () {
  var deactivatePage = function () {
    window.map.fadeMap();
    window.map.disableMapFilters();
    window.newAdForm.disableNewAdForm();
    window.newAdForm.fillOutAddressInactive();
    window.newAdForm.lockNewAddressField();
  };

  var activatePage = function () {
    window.map.showMap();
    window.map.renderRandomAdPins();
    window.map.enableMapFilters();
    window.newAdForm.enableNewAdForm();
    window.newAdForm.fillOutAddressActive();
    window.newAdForm.matchRoomNumberWithCapacity();
  };

  deactivatePage();

  window.map.mainMapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.map.map.classList.contains('map--faded')) {
      activatePage();
    }
  });

  window.map.mainMapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      activatePage();
    }
  });
})();
