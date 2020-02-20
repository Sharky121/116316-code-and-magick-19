'use strict';

var ESC = 'Escape';
var ENTER = 'Enter';

var WIZARD_QUANTITY = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var form = document.querySelector('.setup-wizard-form');
var fireBall = form.querySelector('.setup-fireball-wrap');

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
  COAT_COLOR: form.querySelector('input[name="coat-color"]'),
  EYES_COLOR: form.querySelector('input[name="eyes-color"]'),
  FIREBALL: form.querySelector('input[name="fireball-color"]')
};

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

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

// Функция изменения цвета
var changeColor = function (element) {
  var coatColor = arrayRandElement(COAT_COLORS);
  var eyesColor = arrayRandElement(EYES_COLORS);
  var fireballColor = arrayRandElement(FIREBALL_COLORS);

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

var colorChangeHandler = function (evt) {
  changeColor(evt.target);
};

var wizardsElement = renderWizards(wizards);

similarList.appendChild(wizardsElement);
document.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC) {
    closePopup();
  }
};

// Функция открытия окна попап
var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
  form.addEventListener('click', colorChangeHandler);
};

// Функция закрытия окна попап
var closePopup = function () {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  form.removeEventListener('click', colorChangeHandler);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER) {
    closePopup();
  }
});
