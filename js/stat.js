'use strict';

var Cloud = {
  HEIGHT: 270,
  WIDTH: 420,
  x: 100,
  y: 10,
  COLOR: '#fff',
  GAP: 20
};

var TextProperty = {
  FONT: '16px PT Mono',
  FONT_GAP: 5,
  TEXT_HEIGHT: 15,
  BASELINE: 'hanging',
  COLOR: '#000'
};

var Bar = {
  BAR_WIDTH: 40,
  BAR_STEP: 50,
  MAX_BAR_HEIGHT: 150,
  BAR_COLOR: 'rgba(255, 0, 0, 1)'
};

var Shadow = {
  GAP: 10,
  COLOR: 'rgba(0, 0, 0, 0.7)'
};

// Стартовые координаты для отрисовки контента
var START_X1 = Cloud.x + Cloud.GAP;
var START_Y1 = Cloud.y + Cloud.GAP;
var START_Y2 = Cloud.HEIGHT - Cloud.GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
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
  renderCloud(ctx, Cloud.x + Shadow.GAP, Cloud.y + Shadow.GAP, Shadow.COLOR);
  renderCloud(ctx, Cloud.x, Cloud.y, Cloud.COLOR);

  // Отрисовка сообщения
  renderText(ctx, 'Ура вы победили!', TextProperty.COLOR, TextProperty.FONT, TextProperty.BASELINE, START_X1, START_Y1);
  renderText(ctx, 'Список результатов:', TextProperty.COLOR, TextProperty.FONT, TextProperty.BASELINE, START_X1, START_Y1 + TextProperty.TEXT_HEIGHT + TextProperty.FONT_GAP);

  // Высота блока с объявлением победителя
  var messageHeight = START_Y1 + TextProperty.TEXT_HEIGHT * 3;

  // Определяем максимальный элемент
  var maxTime = getMaxElement(times);

  // Перебор массива игроков и отрисовка графика с именем
  names.forEach(function (item, i) {
    var barHeight = Math.round((Bar.MAX_BAR_HEIGHT * times[i]) / maxTime);
    var barY = messageHeight + (Bar.MAX_BAR_HEIGHT - barHeight);
    var stepX = START_X1 + (Bar.BAR_WIDTH + Bar.BAR_STEP) * i;
    var barColor = (names[i] === 'Вы') ? Bar.BAR_COLOR : getColor();

    // Отрисовка кол-ва очков
    renderText(ctx, Math.round(times[i]), TextProperty.COLOR, TextProperty.FONT, TextProperty.BASELINE, stepX, barY);

    // Задаём цвет столбцов
    ctx.fillStyle = barColor;

    // Отрисовка столбцов
    ctx.fillRect(stepX, barY + TextProperty.TEXT_HEIGHT + TextProperty.FONT_GAP, Bar.BAR_WIDTH, barHeight);

    // Отрисовка имён
    renderText(ctx, names[i], TextProperty.COLOR, TextProperty.FONT, TextProperty.BASELINE, stepX, START_Y2);
  });
};
