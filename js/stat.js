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

var getColor = function (arr) {
  var color;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'Вы') {
      color = 'rgba(255, 0, 0, 1)';
    }
  }

  return color;
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  
  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT + FONT_GAP);
  
  var maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    var barHeight = Math.round((MAX_BAR_HEIGHT * times[i])/maxTime);
    var barY = MAX_BAR_HEIGHT - barHeight;
    
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP)*i, 100 + barY - GAP );

    var color = 'hsl(240, 100%,' + getRandomInRange(25, 75) + '%)';
    
    if (names[i] === 'Вы') {
      color = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = color;

    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP)*i, 100 + barY, BAR_WIDTH, barHeight); 
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP)*i, 100 + barY + barHeight + FONT_GAP);
  }
}
