'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Создаёт из шаблона DOM элемент - маг
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Возвращает фрагмент со всеми магами
  var renderWizards = function (wizardsArray) {
    var fragment = document.createDocumentFragment();

    wizardsArray.forEach(function (element, index) {
      fragment.appendChild(renderWizard(wizardsArray[index]));
    });

    return fragment;
  };

  window.render = renderWizards;
})();
