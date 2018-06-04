'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var LEFT_EDGE = 200;
var TOP_EDGE = 100;

var BAR_WEIGHT = 40;
var BAR_GAP = 50;
var MAX_BAR = 150;


// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция нахождения игрока с максимальным результатом
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  if (arr.length !== 0) {
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

// функция выбора случайного числа между заданными min & max
var randomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', LEFT_EDGE, 30);
  ctx.fillText('Список результатов:', LEFT_EDGE, 50);

  var maxTime = getMaxElement(times);
  var barHeight;
  var barColor;


  // цикл для прохождения по массиву с игроками
  for (var i = 0; i < names.length; i++) {

    // цвета прямоугольников
    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    } else {
      barColor = 'hsl(240, ' + randomNumber(0, 100) + '%, 50%)'; // rgba(0, 0, 255, 1)
    }


    // отрисовка прямоугольников в соответствии с очками игроков
    // winner (макс очки) -------> 150px (MAX_BAR)
    // игроки (times[i])  ------->  ?px
    barHeight = (Math.round(times[i]) * MAX_BAR) / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], LEFT_EDGE + BAR_GAP * i, TOP_EDGE - GAP * 2);
    ctx.fillStyle = barColor;
    ctx.fillRect(LEFT_EDGE + BAR_GAP * i, TOP_EDGE - GAP, BAR_WEIGHT, barHeight);
    ctx.fillText(Math.round(times[i]), LEFT_EDGE + BAR_GAP * i, TOP_EDGE + GAP + MAX_BAR);
  }
};
