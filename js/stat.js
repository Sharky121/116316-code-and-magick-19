'use strict';

var cloud = {
  HEIGHT: 270,
  WIDTH: 420,
  x: 100,
  y: 10,
  COLOR: '#fff',
  GAP: 20
};

var text = {
  FONT: '16px PT Mono',
  FONT_GAP: 5,
  TEXT_HEIGHT: 15,
  BASELINE: 'hanging',
  COLOR: '#000'
};

var bar = {
  BAR_WIDTH: 40,
  BAR_STEP: 50,
  MAX_BAR_HEIGHT: 150,
  BAR_COLOR: 'rgba(255, 0, 0, 1)'
};

var shadow = {
  GAP: 10,
  COLOR: 'rgba(0, 0, 0, 0.7)'
};

// Стартовые координаты для отрисовки контента
var startX1 = cloud.x + cloud.GAP;
var startY1 = cloud.y + cloud.GAP;
var startY2 = cloud.HEIGHT - cloud.GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.WIDTH, cloud.HEIGHT);
};

var renderText = function (ctx, message, color, fontStyle, baseline, x, y) {
  ctx.fillStyle = color;
  ctx.font = fontStyle;
  ctx.textBaseline = baseline;

  ctx.fillText(message, x, y);
};

// Возвращает максимальный элемент
var getMaxElement = function (arr) {
  return Math.round(Math.max.apply(null, arr));
};

// Возвращает цвет
var getColor = function () {
  var max = 75;
  var min = 25;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return 'hsl(240, 100%,' + randomNumber + '%)';
};

var renderStatistics = function (ctx, names, times) {

  // Отрисовка облака
  renderCloud(ctx, cloud.x + shadow.GAP, cloud.y + shadow.GAP, shadow.COLOR);
  renderCloud(ctx, cloud.x, cloud.y, cloud.COLOR);

  // Отрисовка сообщения
  renderText(ctx, 'Ура вы победили!', text.COLOR, text.FONT, text.BASELINE, startX1, startY1);
  renderText(ctx, 'Список результатов:', text.COLOR, text.FONT, text.BASELINE, startX1, startY1 + text.TEXT_HEIGHT + text.FONT_GAP);

  // Высота блока с объявлением победителя
  var messageHeight = startY1 + text.TEXT_HEIGHT * 3;

  // Определяем максимальный элемент
  var maxTime = getMaxElement(times);

  // Перебор массива игроков и отрисовка графика с именем
  names.forEach(function (item, i) {
    var barHeight = Math.round((bar.MAX_BAR_HEIGHT * times[i]) / maxTime);
    var barY = messageHeight + (bar.MAX_BAR_HEIGHT - barHeight);
    var stepX = startX1 + (bar.BAR_WIDTH + bar.BAR_STEP) * i;
    var barColor = (names[i] === 'Вы') ? bar.BAR_COLOR : getColor();

    // Отрисовка кол-ва очков
    renderText(ctx, Math.round(times[i]), text.COLOR, text.FONT, text.BASELINE, stepX, barY);

    // Задаём цвет столбцов
    ctx.fillStyle = barColor;

    // Отрисовка столбцов
    ctx.fillRect(stepX, barY + text.TEXT_HEIGHT + text.FONT_GAP, bar.BAR_WIDTH, barHeight);

    // Отрисовка имён
    renderText(ctx, names[i], text.COLOR, text.FONT, text.BASELINE, stepX, startY2);
  });
};
