'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var Url = {
    LOAD: 'https://js.dump.academy/code-and-magick/data',
    SAVE: 'https://js.dump.academy/code-and-magick'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var RESPONSE_TYPE = 'json';

  var sendRequest = function(method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;

    var onLoadData = function () {
      var error;

      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    };

    var onErrorData = function () {
      onError('Произошла ошибка соединения');
    };

    var onTimeoutData = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', onLoadData);
    xhr.addEventListener('error', onErrorData);
    xhr.addEventListener('timeout', onTimeoutData);

    xhr.open(method, url);
    xhr.send();
  };

  window.backend = {
    load: sendRequest.bind(undefined, Method.GET, Url.LOAD),
    save: sendRequest.bind(undefined, Method.POST, Url.SAVE)
  };
})();
