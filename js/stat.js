'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MAX_HEIGHT = 150;
var Y_OFFSET = 140;
var COLUMN_GAP = 90;
var COLUMN_WIDTH = 40;
var BASE_LINE = 235;
var RESULT_TEXT = 230;
var NAME_TEXT = 250;

var renderCloud = function (ctx, x, y, width, heigth) {
  var offset = 10;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + heigth / 2);
  ctx.lineTo(x, y + heigth);
  ctx.lineTo(x + width / 2, y + heigth - offset);
  ctx.lineTo(x + width, y + heigth);
  ctx.lineTo(x + width - offset, y + heigth / 2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

var renderText = function (ctx, data, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillText(data, width, height);
};

window.renderStatistics = function (ctx, names, times) {

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#FFF';
  renderCloud(ctx, CLOUD_X, CLOUD_Y - GAP, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 3);

  var max = times[0];

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var step = MAX_HEIGHT / max;

  for (i = 0; i < times.length; i++) {
    var name = names[i];
    time = times[i];

    var HEIGHT = step * time;

    if (name === 'Вы') {
      ctx.fillStyle = '#ff0000';
    } else {
      ctx.fillStyle = ['rgb(0, 0,', ((Math.random() * 5) * 50).toFixed(0), ')'].join('');
    }
    ctx.fillRect((Y_OFFSET + COLUMN_GAP * i), (BASE_LINE - HEIGHT), COLUMN_WIDTH, HEIGHT);
    renderText(ctx, time.toFixed(0), (Y_OFFSET + COLUMN_GAP * i), (RESULT_TEXT - HEIGHT), '#000');
    renderText(ctx, name, (Y_OFFSET + COLUMN_GAP * i), NAME_TEXT, '#000');
  }
};
