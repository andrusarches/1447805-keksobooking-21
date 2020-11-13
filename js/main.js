'use strict';

(function () {
  var ENTER_KEY_CODE = 13;

  var errorHandler = function (errorMessage) {
    var newErrorElement = document.createElement('div');
    newErrorElement.style = 'color: #fff; z-index: 100; margin: 0 auto; padding: 5px 0; top: 0; text-align: center; background-color: tomato; box-shadow: 0 0 5px 5px tomato;';
    newErrorElement.style.position = 'sticky';
    newErrorElement.style.left = 0;
    newErrorElement.style.right = 0;
    newErrorElement.style.fontSize = '25px';
    newErrorElement.textContent = '× ' + errorMessage + ' ×';
    document.body.insertAdjacentElement('afterbegin', newErrorElement);
  };

  var deactivatePage = function () {
    window.map.fadeMap();
    window.adFilter.disableAdFilterForm();
    window.newAdForm.disableNewAdForm();
    window.adFilter.resetAdFilter();
    window.newAdForm.resetNewAdForm();
    window.newAdForm.fillOutAddressInactive();
    window.card.removeAdCard();
    window.map.removeRenderedAdPins();
    window.addEventListener('keydown', onEnterActivateMap);
  };

  var activatePage = function () {
    window.map.showMap();
    window.load(window.map.renderAdPins, errorHandler);
    window.newAdForm.enableNewAdForm();
    window.pin.introduceActivePinPosition();
    window.newAdForm.matchRoomNumberWithCapacity();
    window.newAdForm.resetFormButton.addEventListener('click', window.newAdForm.onClickResetForm);
  };

  deactivatePage();

  var onClickMainPinActivate = function (evt) {
    evt.preventDefault();
    if (evt.button === 0 && window.map.mapElement.classList.contains('map--faded')) {
      activatePage();
      window.removeEventListener('keydown', onEnterActivateMap);
      window.map.mainMapPin.removeEventListener('mousedown', onClickMainPinActivate);
    }
  };

  var onEnterActivateMap = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEY_CODE && window.map.mapElement.classList.contains('map--faded')) {
      activatePage();
      window.removeEventListener('keydown', onEnterActivateMap);
      window.map.mainMapPin.removeEventListener('mousedown', function () {
        onClickMainPinActivate();
      });
    }
  };

  window.map.mainMapPin.addEventListener('mousedown', function (evt) {
    onClickMainPinActivate(evt);
    window.pin.onMouseDownPin(evt);
  });

  window.addEventListener('keydown', onEnterActivateMap);

  window.main = {
    deactivatePage
  };
})();
