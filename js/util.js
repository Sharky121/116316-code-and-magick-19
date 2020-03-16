'use strict';

(function () {
  var ESC = 'Escape';
  var ENTER = 'Enter';

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER) {
      action();
    }
  };

  // Функция случайного числа с параметром диапазона
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Возвращает случайный элемент из массива
  var getArrayRandElement = function (arr) {
    var index = Math.floor(Math.random() * arr.length);

    return arr[index];
  };

  // Возвращает массив заданной длины со случайными неповторяющимися элементами
  var getRandomElements = function (array, amount) {
    return array.filter(getRandomInteger).slice(0, amount);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getArrayRandElement: getArrayRandElement,
    getRandomElements: getRandomElements
  };
})();
