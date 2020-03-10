'use strict';

var WIZARD_QUANTITY = 4;
var similarList = document.querySelector('.setup-similar-list');

// Создаём mock- данные для магов
var mocks = window.mock(WIZARD_QUANTITY);

// Рисуем магов
var wizardsElement = window.render(mocks);

similarList.appendChild(wizardsElement);
document.querySelector('.setup-similar').classList.remove('hidden');
