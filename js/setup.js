'use strict';

var userDialog= document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES  = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];


var arrayRandElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

var generateWizard = function (names, surnames, coatColor, eyesColor) {
  var wizardName = arrayRandElement(names);
  var wizardSurname = arrayRandElement(surnames);
  var wizardCoatColor = arrayRandElement(coatColor);
  var wizardEyesColor = arrayRandElement(eyesColor);

  var wizard = {
    name: wizardName + ' ' + wizardSurname,
    coatColor: wizardCoatColor,
    eyesColor: wizardEyesColor
  };

  return wizard;
};

var createWizard = function () {
  var wizzardsArray = [];

  for (var i = 0; i < 4; i++) {
    var wizard = generateWizard(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLOR, WIZARD_EYE_COLOR);
    wizzardsArray.push(wizard);
  }

  return wizzardsArray;
};

var wizards = createWizard();
console.log(wizards);

document.querySelector('.setup-similar').classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var el = similarWizardTemplate.cloneNode(true);

console.log(el);

var el1 = el.document.querySelector('.setup-similar-label');

console.log(el1);

similarList.appendChild(el);
console.log(el);
