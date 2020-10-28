'use strict';

(function () {
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'color: #fff; z-index: 100; margin: 0 auto; padding: 5px 0; top: 0; text-align: center; background-color: tomato; box-shadow: 0 0 5px 5px tomato;';
    node.style.position = 'sticky';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '25px';

    node.textContent = '× ' + errorMessage + ' ×';
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var deactivatePage = function () {
    window.map.fadeMap();
    window.map.disableMapFilters();
    window.newAdForm.disableNewAdForm();
    window.newAdForm.fillOutAddressInactive();
    window.newAdForm.lockNewAddressField();
  };

  var activatePage = function () {
    window.map.showMap();
    window.load(window.map.renderAdPins, errorHandler);
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
