'use strict';
(function () {
  var Nodes = {
    setup: document.querySelector('.setup'),
    dialogHandle: document.querySelector('.upload'),
    userDialog: document.querySelector('.setup'),
    form: document.querySelector('.setup-wizard-form'),
    setupOpen: document.querySelector('.setup-open'),
    setupClose: document.querySelector('.setup-close')
  };

  // Функция открытия окна попап
  var onPopupOpen = function () {
    Nodes.userDialog.classList.remove('hidden');
    Nodes.userDialog.removeAttribute('style');

    document.addEventListener('keydown', onPopupEscPress);
    Nodes.form.addEventListener('click', onWizardColorize);
    Nodes.dialogHandle.addEventListener('mousedown', onSetupDialogMove);
    Nodes.setupClose.addEventListener('click', onPopupClose);
    Nodes.setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  };

  // Функция закрытия окна попап
  var onPopupClose = function () {
    Nodes.userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    Nodes.setupOpen.removeEventListener('click', onPopupClose);
    Nodes.setupOpen.removeEventListener('click', onSetupCloseEnterPress);
    Nodes.form.removeEventListener('click', onWizardColorize);
    Nodes.dialogHandle.removeEventListener('mousedown', onSetupDialogMove);
  };

  // Функция закрытия окна попап по клавише Esc
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, onPopupClose);
  };

  // Функция закрытия окна попап по клавише Enter
  var onSetupCloseEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onPopupOpen);
  };

  // Функция открытия окна попап по клавише Enter
  var onSetupOpenEnterPress = function (evt) {
    window.util.isEnterEvent(evt, onPopupOpen);
  };

  // Функция перетаскивания окна
  var onSetupDialogMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    // Функция перемещения мышки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      Nodes.setup.style.top = (Nodes.setup.offsetTop - shift.y) + 'px';
      Nodes.setup.style.left = (Nodes.setup.offsetLeft - shift.x) + 'px';
    };

    // Функция отпускания кнопки мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          Nodes.dialogHandle.removeEventListener('click', onClickPreventDefault);
        };

        Nodes.dialogHandle.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Функция раскрашивания мага
  var onWizardColorize = function (evt) {
    window.colorize(evt);
  };

  // Добавляем слушатели событий
  Nodes.setupOpen.addEventListener('click', onPopupOpen);

  Nodes.setupOpen.addEventListener('keydown', onSetupOpenEnterPress);
})();

