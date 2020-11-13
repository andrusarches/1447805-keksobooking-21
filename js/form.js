'use strict';

(function () {
  var newAdForm = document.querySelector('.ad-form');
  var newAddressField = newAdForm.querySelector('#address');
  var newAdFieldsets = newAdForm.querySelectorAll('.ad-form-header, .ad-form__element');
  var newPriceField = newAdForm.querySelector('#price');
  var newHousingTypeField = newAdForm.querySelector('#type');
  var newCheckInField = newAdForm.querySelector('#timein');
  var newCheckOutField = newAdForm.querySelector('#timeout');
  var newRoomNumberField = newAdForm.querySelector('#room_number');
  var newCapacityField = newAdForm.querySelector('#capacity');
  var INACTIVE_PIN_HEIGHT = 62;
  var INACTIVE_PIN_WIDTH = 62;
  var mainMapPinInactiveXPosition = parseInt(window.map.mainMapPin.style.left, 10) + INACTIVE_PIN_WIDTH / 2;
  var mainMapPinInactiveYPosition = parseInt(window.map.mainMapPin.style.top, 10) + INACTIVE_PIN_HEIGHT / 2;

  var fillOutAddressInactive = function () {
    newAddressField.value = mainMapPinInactiveXPosition + ', ' + mainMapPinInactiveYPosition;
  };

  var disableNewAdForm = function () {
    for (var i = 0; i < newAdFieldsets.length; i++) {
      newAdFieldsets[i].disabled = true;
    }
    newAdForm.classList.add('ad-form--disabled');
  };

  var enableNewAdForm = function () {
    for (var i = 0; i < newAdFieldsets.length; i++) {
      newAdFieldsets[i].disabled = false;
    }
    newAdForm.classList.remove('ad-form--disabled');
  };

  var matchPriceRangeWithHousingType = function () {
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

  var matchRoomNumberWithCapacity = function () {
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
        newCapacityField.setCustomValidity('Не для гостей!');
      }
    }
  };

  var resetFormButton = newAdForm.querySelector('.ad-form__reset');

  var resetNewAdForm = function () {
    newAdForm.reset();
  };

  var onClickResetForm = function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
    window.newAdForm.resetFormButton.removeEventListener('click', onClickResetForm);
  };

  newAdForm.addEventListener('change', matchRoomNumberWithCapacity);

  var checkCheckInAndCheckOut = function () {
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

  window.newAdForm = {
    fillOutAddressInactive,
    disableNewAdForm,
    enableNewAdForm,
    matchRoomNumberWithCapacity,
    newAddressField,
    newAdForm,
    resetNewAdForm,
    resetFormButton,
    onClickResetForm
  };
})();
