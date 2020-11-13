'use strict';

var UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking';
var statusCode = {
  ok: 300
};
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


window.upload = function (data, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === statusCode.ok) {
      onSuccess();
    } else {
      onError();
    }
  });

  xhr.open('POST', UPLOAD_URL);
  xhr.send(data);
};

var submitHandler = function (evt) {
  evt.preventDefault();
  window.upload(new FormData(window.newAdForm.newAdForm), showSuccessMessage, showErrorMessage);
};
window.newAdForm.newAdForm.addEventListener('submit', submitHandler);
