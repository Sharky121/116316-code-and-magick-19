'use strict';

(function () {
  // Возвращает случайный элемент из массива
  var getArrayRandElement = function (arr) {
    var index = Math.floor(Math.random() * arr.length);

    return arr[index];
  };

  window.helper = {
    getArrayRandElement: getArrayRandElement
  };
})();
