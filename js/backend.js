'use strict';

var DOWNLOAD_URL = 'https://21.javascript.pages.academy/keksobooking/data';
var TIMEOUT_IN_MS = 10000;
var UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking';
var REQUEST_STATUS_CODES = {
  success: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404
};

var initiateServerRequest = function (onSuccess, onError) {
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    var error;
    switch (xhr.status) {
      case REQUEST_STATUS_CODES.success:
        onSuccess(xhr.response);
        window.download.data = xhr.response;
        window.adFilter.enableAdFilterForm();
        break;
      case REQUEST_STATUS_CODES.badRequest:
        error = 'Неверный запрос';
        break;
      case REQUEST_STATUS_CODES.unauthorized:
        error = 'Пользователь не авторизован';
        break;
      case REQUEST_STATUS_CODES.notFound:
        error = 'Ничего не найдено';
        break;

      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

window.download = function (onSuccess, onError) {
  var xhr = initiateServerRequest(onSuccess, onError);
  xhr.open('GET', DOWNLOAD_URL);
  xhr.send();
};

window.upload = function (data, onSuccess, onError) {
  var xhr = initiateServerRequest(onSuccess, onError);
  xhr.open('POST', UPLOAD_URL);
  xhr.send(data);
};

var submitHandler = function (evt) {
  evt.preventDefault();
  window.upload(new FormData(window.newAdForm.newAdForm), window.templatesErrorSuccess.showSuccessMessage, window.templatesErrorSuccess.showErrorMessage);
};

window.newAdForm.newAdForm.addEventListener('submit', submitHandler);
