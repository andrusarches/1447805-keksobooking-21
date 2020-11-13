'use strict';

var PIN_WIDTH = 62;
var PIN_HEIGHT = 82;

var introduceActivePinPosition = function () {
  var mainMapPinActiveXPosition = parseInt(window.map.mainMapPin.style.left, 10) + PIN_WIDTH / 2;
  var mainMapPinActiveYPosition = parseInt(window.map.mainMapPin.style.top, 10) + PIN_HEIGHT;

  window.newAdForm.newAddressField.value = mainMapPinActiveXPosition + ', ' + mainMapPinActiveYPosition;
};

var onMouseDownPin = function (evt) {
  var X_POSITION_LIMITS = {
    min: -32,
    max: 1168
  };
  var Y_POSITION_LIMITS = {
    min: 130,
    max: 630
  };

  evt.preventDefault();

  window.startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: window.startCoordinates.x - moveEvt.clientX,
      y: window.startCoordinates.y - moveEvt.clientY
    };

    window.startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var coordinateX = window.map.mainMapPin.offsetLeft - shift.x;
    var coordinateY = window.map.mainMapPin.offsetTop - shift.y;

    if (coordinateX >= X_POSITION_LIMITS.min && coordinateX <= X_POSITION_LIMITS.max && coordinateY >= Y_POSITION_LIMITS.min && coordinateY <= Y_POSITION_LIMITS.max) {
      window.map.mainMapPin.style.top = coordinateY + 'px';
      window.map.mainMapPin.style.left = coordinateX + 'px';
    } else if (coordinateX < X_POSITION_LIMITS.min) {
      window.map.mainMapPin.style.top = coordinateY + 'px';
      window.map.mainMapPin.style.left = X_POSITION_LIMITS.min + 'px';
    } else if (coordinateX > X_POSITION_LIMITS.max) {
      window.map.mainMapPin.style.top = coordinateY + 'px';
      window.map.mainMapPin.style.left = X_POSITION_LIMITS.max + 'px';
    } else if (coordinateY < Y_POSITION_LIMITS.min) {
      window.map.mainMapPin.style.top = Y_POSITION_LIMITS.min + 'px';
      window.map.mainMapPin.style.left = coordinateX + 'px';
    } else if (coordinateY > Y_POSITION_LIMITS.max) {
      window.map.mainMapPin.style.top = Y_POSITION_LIMITS.max + 'px';
      window.map.mainMapPin.style.left = coordinateX + 'px';
    }

    introduceActivePinPosition();
  };

  var onMouseUp = function (upEvt) {
    if (!dragged) {
      introduceActivePinPosition();
    }
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

window.pin = {
  onMouseDownPin,
  introduceActivePinPosition
};
