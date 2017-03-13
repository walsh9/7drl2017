export function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(ROT.RNG.getUniform() * (max - min + 1) + min);
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function animate(animation, durationInMs) {
  return new Promise((resolve) => {
    let fps = 1000/30
    let elapsed = 0;
    let ticks = 0;
    let timer = window.setInterval(() => {
      animation(ticks)
      ticks++;
      elapsed+=fps;
      if (elapsed > durationInMs) {
        window.clearInterval(timer);
        resolve();
      };
    }, fps)
  });
}

export function getNeighbors(x, y) {
    var tiles = [];
    // Generate all possible offsets
    for (var dX = -1; dX < 2; dX ++) {
        for (var dY = -1; dY < 2; dY++) {
            // Make sure it isn't the same tile
            if (dX == 0 && dY == 0) {
                continue;
            }
            tiles.push({x: x + dX, y: y + dY});
        }
    }
    return tiles.randomize();
};

export function getHorizontalNeighbors(x, y) {
    var tiles = [];
    tiles.push({x: x - 1, y: y});
    tiles.push({x: x + 1, y: y});
    return tiles.randomize();
};

export function getVerticalNeighbors(x, y) {
    var tiles = [];
    tiles.push({x: x, y: y - 1});
    tiles.push({x: x, y: y + 1});
    return tiles.randomize();
};

export function getCardinalNeighbors(x, y) {
    var tiles = [];
    tiles.push({x: x - 1, y: y});
    tiles.push({x: x + 1, y: y});
    tiles.push({x: x, y: y - 1});
    tiles.push({x: x, y: y + 1});
    return tiles.randomize();
};

export function taxicabDistance(x0, y0, x1, y1) {
  return Math.abs(x0 - x1) + Math.abs(y0 - y1);
};