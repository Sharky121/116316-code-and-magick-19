'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;

var GAP = 20;
var SHADOW_GAP = 10;

var FONT_GAP = 5;
var TEXT_HEIGHT = 15;

var BAR_WIDTH = 40;
var BAR_STEP = 50;
var MAX_BAR_HEIGHT = 150;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function(ctx, text, x, y) {
  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = 'hanging';

  ctx.fillText(text, x, y);
}

var renderStatistics = function (ctx, names, times) {
  // Отрисовка облака
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Отрисовка сообщения
  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT + FONT_GAP);
  
  // Определяем максимальный элемент
  var maxTime = getMaxElement(times);

  // Перебор массива игроков и отрисовка графика с именем
  for (let i = 0; i < names.length; i++) {
    var messageHeight = CLOUD_Y + GAP + TEXT_HEIGHT*2 + TEXT_HEIGHT;
    var barHeight = Math.round((MAX_BAR_HEIGHT * times[i])/maxTime);
    var barY = messageHeight + (MAX_BAR_HEIGHT - barHeight);
    
    // Отрисовка кол-ва очков
    renderText(ctx, Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + BAR_STEP)*i, barY);
    
    var color = 'hsl(240, 100%,' + getRandomInRange(25, 75) + '%)';
    
    if (names[i] === 'Вы') {
      color = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = color;

    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + BAR_STEP)*i, barY + TEXT_HEIGHT + FONT_GAP, BAR_WIDTH, barHeight); 
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + BAR_STEP)*i, CLOUD_HEIGHT - TEXT_HEIGHT);
  }
}
