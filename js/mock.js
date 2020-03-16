'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  // Возвращает объект - маг
  var createWizard = function (names, surnames, coatColor, eyesColor) {
    var wizardName = window.util.getArrayRandElement(names);
    var wizardSurname = window.util.getArrayRandElement(surnames);
    var wizardCoatColor = window.util.getArrayRandElement(coatColor);
    var wizardEyesColor = window.util.getArrayRandElement(eyesColor);

    var Wizard = {
      name: wizardName + ' ' + wizardSurname,
      coatColor: wizardCoatColor,
      eyesColor: wizardEyesColor
    };

    return Wizard;
  };

  // Возрващает массив магов
  var createWizardsArray = function (quantity) {
    var wizzardsArray = [];

    for (var i = 0; i < quantity; i++) {
      var wizard = createWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLOR, WIZARD_EYE_COLOR);
      wizzardsArray.push(wizard);
    }

    return wizzardsArray;
  };

  window.mock = createWizardsArray;
})();
