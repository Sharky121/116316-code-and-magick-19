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

  // Возвращает случайный элемент из массива
  var getArrayRandElement = function (arr) {
    var index = Math.floor(Math.random() * arr.length);

    return arr[index];
  };

  // Возвращает массив заданной длины со случайными неповторяющимися элементами
  var getRandomElements = function (array, amount) {
    var newArray = [];

    while (newArray.length < amount) {
      var randomEl = window.util.getArrayRandElement(array);

      if (newArray.indexOf(randomEl) === -1) {
        newArray.push(randomEl);
      }
    }

    return newArray;
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getArrayRandElement: getArrayRandElement,
    getRandomElements: getRandomElements
  };
})();
