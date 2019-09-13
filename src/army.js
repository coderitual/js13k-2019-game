import spritesheet from '/lib/engine';
import shape from '/lib/engine';
import input from '/lib/engine';
import math from '/lib/engine';

const all = new Set();

const config = {
  range: 10,
  health: 30,
};

let time = 0;

function add({ x, y, count, playerId }) {
  all.add({
    x,
    y,
    count,
    playerId,
    range: config.range,
    health: config.health,
  });
}

function init() {
  spritesheet.define('soldier-red', 0, 24, 4, 5);
  spritesheet.define('soldier-blue', 8, 24, 4, 5);
  spritesheet.define('flag-red', 0, 32, 8, 8);
  spritesheet.define('flag-blue', 8, 32, 8, 8);
}

function spriteForPlayer(id, sprite) {
  return `${sprite}-${id === 0 ? 'red' : 'blue'}`;
}

function update(dt) {
  time += dt;
  for (let army of all) {
  }
}

function draw(ctx) {
  for (let army of all) {
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.03;
    ctx.beginPath();
    ctx.arc(army.x, army.y, army.range, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();

    // soldiers
    for (let i = 0; i < Math.ceil(army.health) / 10; i++) {
      const x = Math.round(Math.cos(((Math.PI * 2) / 3) * i) * 3) + army.x;
      const y = Math.round(Math.sin(((Math.PI * 2) / 3) * i) * 3) + army.y;

      spritesheet.draw(
        ctx,
        spriteForPlayer(army.playerId, 'soldier'),
        x - 2,
        y - 2
      );
    }
  }
}

export default { draw, update, add, init, all };
