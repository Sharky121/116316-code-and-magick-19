'use strict';

var ESC = 'Escape';
var ENTER = 'Enter';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

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

var Nodes = {
  similarList: document.querySelector('.setup-similar-list'),
  similarWizardTemplate: document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'),
  form: document.querySelector('.setup-wizard-form'),
  fireBall: document.querySelector('.setup-fireball-wrap'),
  userDialog: document.querySelector('.setup'),
  setupOpen: document.querySelector('.setup-open'),
  setupClose: document.querySelector('.setup-close')
};

// ДАННЫЕ ДЛЯ ОТРИСОВКИ
// Возвращает случайный элемент из массива
var getArrayRandElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

// Возвращает объект - маг
var mockWizard = function (names, surnames, coatColor, eyesColor) {
  var wizardName = getArrayRandElement(names);
  var wizardSurname = getArrayRandElement(surnames);
  var wizardCoatColor = getArrayRandElement(coatColor);
  var wizardEyesColor = getArrayRandElement(eyesColor);

  var Wizard = {
    name: wizardName + ' ' + wizardSurname,
    coatColor: wizardCoatColor,
    eyesColor: wizardEyesColor
  };

  return Wizard;
};

// Возрващает массив магов
var mockData = function (quantity) {
  var wizzardsArray = [];

  for (var i = 0; i < quantity; i++) {
    var wizard = mockWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLOR, WIZARD_EYE_COLOR);
    wizzardsArray.push(wizard);
  }

  return wizzardsArray;
};

// РИСУЕМ ЭЛЕМЕНТЫ
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

// Функция изменения цвета
var setColor = function (element) {
  var coatColor = getArrayRandElement(COAT_COLORS);
  var eyesColor = getArrayRandElement(EYES_COLORS);
  var fireballColor = getArrayRandElement(FIREBALL_COLORS);

  if (element.matches('.wizard-coat')) {
    element.style.fill = coatColor;
    Inputs.COAT_COLOR.value = coatColor;
  }

  if (element.matches('.wizard-eyes')) {
    element.style.fill = eyesColor;
    Inputs.EYES_COLOR.value = eyesColor;
  }

  if (element.matches('.setup-fireball')) {
    Nodes.fireBall.style.backgroundColor = fireballColor;
    Inputs.FIREBALL.value = fireballColor;
  }
};

var colorSetHandler = function (evt) {
  setColor(evt.target);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC) {
    closePopup();
  }
};

// Функция открытия окна попап
var openPopup = function () {
  Nodes.userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  Nodes.form.addEventListener('click', colorSetHandler);
};

// Функция закрытия окна попап
var closePopup = function () {
  Nodes.userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  Nodes.form.removeEventListener('click', colorSetHandler);
};

Nodes.setupOpen.addEventListener('click', function () {
  openPopup();
});

Nodes.setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER) {
    openPopup();
  }
});

Nodes.setupClose.addEventListener('click', function () {
  closePopup();
});

Nodes.setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER) {
    closePopup();
  }
});

// Создаём магов
var wizards = mockData(WIZARD_QUANTITY);
var wizardsElement = renderWizards(wizards);

Nodes.similarList.appendChild(wizardsElement);
document.querySelector('.setup-similar').classList.remove('hidden');
