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

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  // Функция открытия окна попап
  var openPopup = function () {
    Nodes.userDialog.classList.remove('hidden');
    Nodes.userDialog.removeAttribute('style');
    document.addEventListener('keydown', onPopupEscPress);
    Nodes.form.addEventListener('click', window.colorize);
  };

  // Функция закрытия окна попап
  var closePopup = function () {
    Nodes.userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    Nodes.form.removeEventListener('click', window.colorize);
  };

  Nodes.setupOpen.addEventListener('click', function () {
    openPopup();
  });

  Nodes.setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  Nodes.setupClose.addEventListener('click', function () {
    closePopup();
  });

  Nodes.setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // Перетаскивание окна
  Nodes.dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

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
  });
})();

