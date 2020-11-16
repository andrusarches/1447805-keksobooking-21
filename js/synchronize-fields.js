'use strict';

window.synchronizeValues = function (element, newValue) {
  element.value = newValue;
};

window.synchronizeFields = function (changedField, dependentField, changedFieldValues, dependentFieldValues, syncFunc) {
  var changedFieldElementIndex = changedFieldValues.indexOf(changedField.value);
  var dependentFieldValue = dependentFieldValues[changedFieldElementIndex];
  syncFunc(dependentField, dependentFieldValue);
};
