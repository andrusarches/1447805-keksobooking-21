'use strict';

var mainElement = document.querySelector('main');
var ESC_KEY_CODE = 27;

var showSuccessMessage = function () {
  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var newSuccessMessage = successMessageTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  var successMessageFragment = fragment.appendChild(newSuccessMessage);
  mainElement.appendChild(successMessageFragment);
  var successMessage = document.querySelector('.success');

  var onClickRemoveSuccessMessage = function (evt) {
    evt.preventDefault();
    successMessage.remove();
    window.main.deactivatePage();
    document.removeEventListener('keydown', onEscRemoveSuccessMessage);
    window.removeEventListener('click', onClickRemoveSuccessMessage);
  };

  var onEscRemoveSuccessMessage = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ESC_KEY_CODE) {
      successMessage.remove();
      window.main.deactivatePage();
      window.removeEventListener('click', onClickRemoveSuccessMessage);
      document.removeEventListener('keydown', onEscRemoveSuccessMessage);
    }
  };

  document.addEventListener('keydown', onEscRemoveSuccessMessage);
  window.addEventListener('click', onClickRemoveSuccessMessage);
};

var showErrorMessage = function () {
  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var newErrorMessage = errorMessageTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  var errorMessageFragment = fragment.appendChild(newErrorMessage);
  mainElement.appendChild(errorMessageFragment);
  var errorMessage = document.querySelector('.error');

  var onEscRemoveErrorMessage = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ESC_KEY_CODE) {
      errorMessageButton.removeEventListener('click', onClickErrorMessageButton);
      errorMessage.remove();
      window.removeEventListener('click', onClickRemoveErrorMessage);
      document.removeEventListener('keydown', onEscRemoveErrorMessage);
    }
  };

  var onClickRemoveErrorMessage = function (evt) {
    evt.preventDefault();
    errorMessageButton.removeEventListener('click', onClickErrorMessageButton);
    errorMessage.remove();
    document.removeEventListener('keydown', onEscRemoveErrorMessage);
    window.removeEventListener('click', onClickRemoveErrorMessage);
  };

  var errorMessageButton = errorMessage.querySelector('.error__button');
  var onClickErrorMessageButton = function (evt) {
    evt.preventDefault();
    errorMessageButton.removeEventListener('click', onClickErrorMessageButton);
    errorMessage.remove();
    document.removeEventListener('keydown', onEscRemoveErrorMessage);
    window.removeEventListener('click', onClickRemoveErrorMessage);
  };

  document.addEventListener('keydown', onEscRemoveErrorMessage);
  window.addEventListener('click', onClickRemoveErrorMessage);
  errorMessageButton.addEventListener('click', onClickErrorMessageButton);
};


var errorPopupHandler = function (errorMessage) {
  var newErrorElement = document.createElement('div');
  newErrorElement.style = 'color: #fff; z-index: 100; margin: 0 auto; padding: 5px 0; top: 0; text-align: center; background-color: tomato; box-shadow: 0 0 5px 5px tomato;';
  newErrorElement.style.position = 'sticky';
  newErrorElement.style.left = 0;
  newErrorElement.style.right = 0;
  newErrorElement.style.fontSize = '25px';
  newErrorElement.textContent = '× ' + errorMessage + ' ×';
  document.body.insertAdjacentElement('afterbegin', newErrorElement);
};

window.templatesErrorSuccess = {
  showSuccessMessage,
  showErrorMessage,
  errorPopupHandler
};
