'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var Inputs = {
    COAT_COLOR: document.querySelector('input[name="coat-color"]'),
    EYES_COLOR: document.querySelector('input[name="eyes-color"]'),
    FIREBALL: document.querySelector('input[name="fireball-color"]')
  };

  var fireBall = document.querySelector('.setup-fireball-wrap');

  // Функция изменения цвета
  var changeColor = function (element) {
    var coatColor = window.util.getArrayRandElement(COAT_COLORS);
    var eyesColor = window.util.getArrayRandElement(EYES_COLORS);
    var fireballColor = window.util.getArrayRandElement(FIREBALL_COLORS);

    if (element.matches('.wizard-coat')) {
      element.style.fill = coatColor;
      Inputs.COAT_COLOR.value = coatColor;
    }

    if (element.matches('.wizard-eyes')) {
      element.style.fill = eyesColor;
      Inputs.EYES_COLOR.value = eyesColor;
    }

    if (element.matches('.setup-fireball')) {
      fireBall.style.backgroundColor = fireballColor;
      Inputs.FIREBALL.value = fireballColor;
    }
  };

  var onWizardChangeColor = function (evt) {
    changeColor(evt.target);
  };

  window.colorize = onWizardChangeColor;
})();
