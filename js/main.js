'use strict';

var ENTER_KEY_CODE = 13;

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
  window.download(window.map.renderAdPins, window.templatesErrorSuccess.errorPopupHandler);
  window.newAdForm.enableNewAdForm();
  window.pin.introduceActivePinPosition();
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
