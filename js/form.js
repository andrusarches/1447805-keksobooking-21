'use strict';

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
var MIN_PRICE_BY_TYPE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var CHECK_IN_OPTIONS = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECK_OUT_OPTIONS = [
  '12:00',
  '13:00',
  '14:00'
];
var ROOM_NUMBER = [
  '1',
  '2',
  '3',
  '100'
];
var ROOM_CAPACITY = [
  '1',
  '2',
  '3',
  '0'
];

var fillOutAddressInactive = function () {
  newAddressField.value = mainMapPinInactiveXPosition + ', ' + mainMapPinInactiveYPosition;
};

var matchPriceRangeWithHousingType = function () {
  if (newHousingTypeField.value === 'bungalow') {
    newPriceField.min = MIN_PRICE_BY_TYPE.bungalow;
    newPriceField.placeholder = MIN_PRICE_BY_TYPE.bungalow;
  } else if (newHousingTypeField.value === 'flat') {
    newPriceField.min = MIN_PRICE_BY_TYPE.flat;
    newPriceField.placeholder = MIN_PRICE_BY_TYPE.flat;
  } else if (newHousingTypeField.value === 'house') {
    newPriceField.min = MIN_PRICE_BY_TYPE.house;
    newPriceField.placeholder = MIN_PRICE_BY_TYPE.house;
  } else if (newHousingTypeField.value === 'palace') {
    newPriceField.min = MIN_PRICE_BY_TYPE.palace;
    newPriceField.placeholder = MIN_PRICE_BY_TYPE.palace;
  }
};

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

var synchronizeRoomCapacity = function () {
  window.synchronizeFields(newRoomNumberField, newCapacityField, ROOM_NUMBER, ROOM_CAPACITY, window.synchronizeValues);
};

var synchronizeCheckInTime = function () {
  window.synchronizeFields(newCheckInField, newCheckOutField, CHECK_IN_OPTIONS, CHECK_OUT_OPTIONS, window.synchronizeValues);
};

var synchronizeCheckOutTime = function () {
  window.synchronizeFields(newCheckOutField, newCheckInField, CHECK_OUT_OPTIONS, CHECK_IN_OPTIONS, window.synchronizeValues);
};

var disableNewAdForm = function () {
  for (var i = 0; i < newAdFieldsets.length; i++) {
    newAdFieldsets[i].disabled = true;
  }
  newAdForm.classList.add('ad-form--disabled');
  newHousingTypeField.removeEventListener('input', matchPriceRangeWithHousingType);
  newAdForm.removeEventListener('change', matchRoomNumberWithCapacity);
  newRoomNumberField.removeEventListener('change', synchronizeRoomCapacity);
  newCheckInField.removeEventListener('change', synchronizeCheckInTime);
  newCheckOutField.removeEventListener('change', synchronizeCheckOutTime);
};

var enableNewAdForm = function () {
  for (var i = 0; i < newAdFieldsets.length; i++) {
    newAdFieldsets[i].disabled = false;
  }
  newAdForm.classList.remove('ad-form--disabled');
  newHousingTypeField.addEventListener('input', matchPriceRangeWithHousingType);
  newAdForm.addEventListener('change', matchRoomNumberWithCapacity);
  newRoomNumberField.addEventListener('change', synchronizeRoomCapacity);
  newCheckInField.addEventListener('change', synchronizeCheckInTime);
  newCheckOutField.addEventListener('change', synchronizeCheckOutTime);
};

var resetFormButton = newAdForm.querySelector('.ad-form__reset');

var resetNewAdForm = function () {
  newAdForm.reset();
  matchPriceRangeWithHousingType();
  matchRoomNumberWithCapacity();
  synchronizeRoomCapacity();
  synchronizeCheckInTime();
};

var onClickResetForm = function (evt) {
  evt.preventDefault();
  window.main.deactivatePage();
  window.newAdForm.resetFormButton.removeEventListener('click', onClickResetForm);
};

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
