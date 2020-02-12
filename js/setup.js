'use strict';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// ДАННЫЕ ДЛЯ ОТРИСОВКИ
// Возвращает случайный элемент из массива
var arrayRandElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

// Возвращает объект - маг
var createWizard = function (names, surnames, coatColor, eyesColor) {
  var wizardName = arrayRandElement(names);
  var wizardSurname = arrayRandElement(surnames);
  var wizardCoatColor = arrayRandElement(coatColor);
  var wizardEyesColor = arrayRandElement(eyesColor);

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

// Создаём магов
var wizards = createWizardsArray(WIZARD_QUANTITY);

// РИСУЕМ ЭЛЕМЕНТЫ
// Создаёт из шаблона DOM элемент - маг
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Возвращает фрагмент со всеми магами
var renderWizards = function (wizardsArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(renderWizard(wizardsArray[i]));
  }

  return fragment;
};

var wizardsElement = renderWizards(wizards);

similarList.appendChild(wizardsElement);
document.querySelector('.setup-similar').classList.remove('hidden');
