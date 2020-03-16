'use strict';

var WIZARD_QUANTITY = 4;

var Nodes = {
  similarList: document.querySelector('.setup-similar-list'),
  form: document.querySelector('.setup-wizard-form'),
  userDialog: document.querySelector('.setup')
};

var renderErrorElement = function (textElement) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = textElement;
  document.body.insertAdjacentElement('afterbegin', node);
};

var onWizardsLoad = function (wizards) {
  var randomWizards = window.util.getRandomElements(wizards, WIZARD_QUANTITY);
  var wizardsElement = window.render(randomWizards, WIZARD_QUANTITY);

  Nodes.similarList.appendChild(wizardsElement);
};

var onWizardsError = function (errorMessage) {
  renderErrorElement(errorMessage);
};

var onFormError = function (errorMessage) {
  renderErrorElement(errorMessage);
};

var onFormSave = function () {
  Nodes.userDialog.classList.add('hidden');
};

var onFormSubmit = function (evt) {
  window.backend.save('https://js.dump.academy/code-and-magick', new FormData(Nodes.form), onFormSave, onFormError);

  evt.preventDefault();
};

window.backend.load('https://js.dump.academy/code-and-magick/data', onWizardsLoad, onWizardsError);
Nodes.form.addEventListener('submit', onFormSubmit);
document.querySelector('.setup-similar').classList.remove('hidden');

