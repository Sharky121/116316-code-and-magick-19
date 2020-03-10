'use strict';

(function () {
  var ESC = 'Escape';
  var ENTER = 'Enter';

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
