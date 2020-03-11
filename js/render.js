'use strict';

(function () {
  var Nodes = {
    similarWizardTemplate: document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'),
  };

  // Создаёт из шаблона DOM элемент - маг
  var renderWizard = function (wizard) {
    var wizardElement = Nodes.similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

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
