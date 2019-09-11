import shape from '/lib/shape';
import * as math from '/lib/math';
import { getCollider } from '/lib/map';

const list = new Set();

function add({
  x,
  y,
  velocity = { x: 0, y: 0 },
  drag = 0.985,
  idleVelocityMagnitude = 3.5,
}) {
  const item = {
    x,
    y,
    drag,
    velocity,
    idleVelocityMagnitude,
  };

  list.add(item);
  return item;
}

function destroy(item) {
  list.delete(item);
}

function update(dt) {
  for (let item of list) {
    const { x, y, velocity, drag, idleVelocityMagnitude } = item;
    if (math.vecLength(velocity) < idleVelocityMagnitude) {
      // Destroy on idle
      destroy(item);
      return;
    }

    let nVelocity = {
      x: velocity.x * drag,
      y: velocity.y * drag,
    };

    let nx = x + nVelocity.x * dt;
    let ny = y + nVelocity.y * dt;

    const collider = getCollider(nx, ny, x, y, nVelocity);
    if (collider) {
      nVelocity = collider.velocity;

      nx = x + nVelocity.x * dt;
      ny = y + nVelocity.y * dt;
    }

    item.x = nx;
    item.y = ny;

    item.velocity = nVelocity;
  }
}

function draw(ctx) {
  ctx.fillStyle = '#ff0000';
  ctx.fillStyle = '#ffffff';

  for (let item of list) {
    const { x, y } = item;
    shape.drawCircle(ctx, x, y, 2);
  }
}

export default { draw, update, add };
