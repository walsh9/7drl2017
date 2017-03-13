import EntityLibrary from './entity-library';
import Terrain from './terrain';
import EndScreen from './screens/end';

export default class Entity {
  constructor(properties) {
    this.map = null;
    this._x = properties.x;
    delete properties.x;
    this._y = properties.y;
    delete properties.y;
    this.tiles = properties.tiles;
    let defaults = {
      description: '', 
      speed: 1000,
    }; 
    Object.assign(this, defaults, properties);
  }
  get x() { 
    return this._x;
  }
  get y() {
    return this._y;
  }
  get w() {
    return this.tiles[0].length
  }
  get h() {
    return this.tiles.length
  }
  getSpeed() {
    return this.speed;
  }
  getTiles() {
    let tiles = [];
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        tiles.push([this.x + x, this.y + y]);
      }
    }
    return tiles;
  }
  act() {
    if (this.energyRegenRate) {
      this.energy = Math.min(this.maxEnergy, this.energy + this.energyRegenRate);
    }
    if (this.healthRegenRate) {
      this.health = Math.min(this.maxHealth, this.health + this.healthRegenRate);
    }

    return this[this.ai]();
  }
  render(display, viewportX, viewportY) {
    display = this.map.display;
    viewportX = this.map.viewportX;
    viewportY = this.map.viewportY;
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        let terrainHere = this.map.terrainAt(this.x + x, this.y + y);
        if (terrainHere.swimmable && y + 1 === this.h) {
          display.drawTile(this.x - viewportX + x, this.y - viewportY + y, this.tiles[y][x], terrainHere.fg, terrainHere.bg);
        } else {
          display.drawTile(this.x - viewportX + x, this.y - viewportY + y, this.tiles[y][x], this.fgOverride || this.fg, this.bg);
        }
      }
    }
  }
  setPosition(x, y) {
    var oldTiles = this.getTiles();
    this._x = x;
    this._y = y;
    if (this.map) {
      this.map.updateEntityPosition(this, oldTiles);
    }
  }
  canTraverse(terrain) {
    return this.stomps && terrain.stompable ||
           this.drives && terrain.drivable  ||
           this.swims  && terrain.swimmable
  }
  tryMove(x, y) {
    if (this.map.traversableBy(x, y, this)) {
      this.setPosition(x, y);
      return true;
    } else if (this.smashes) {
      this.map.smashAt(x, y, this);
      return false;
    }
  }
  takeDamage(amount) {
    if (this.health);
    this.health -= amount;
    if (this.health <= 0 && !this.isPlayer) {
      this.die();
    }
  }
  die() {
    if (this.becomes) {
      this.getTiles().forEach(([x, y]) => {
        this.map.setTerrain(x, y, Terrain.create(this.becomes));
      })
    }
    this.map.removeEntity(this);
    this.map.render();
    if (this.isBoss) {
      return this.map.animationManager.wait().then(() => {
        this.map.screenManager.open(new EndScreen({display: this.map.display}));
      });
    }
  }
  randomWalk() {
    let x = this._x;
    let y = this._y;
    let dirs = [[x+1,y],[x-1,y],[x,y+1],[x,y-1]].randomize();
    while (dirs.length > 0) {
      let pos = dirs.pop();
      if (this.tryMove(...pos)) {
        return;
      }
    }
  }
  sleep() {
    if (this.map.player.x - 10 < this.x) {
      this.ai = 'huntAndShoot';
    }
  }
  huntAndShoot() {
    let player = this.map.player;
    let target = this.canShoot(player);
    if (target) {
      return this.shoot(player, ...target);
    } else {
      return this.hunt();
    }
  }
  canShoot(target) {
    return target.getTiles().randomize().find(([x, y]) => {
      let lineOfFire = [];
      this.map._terrain.forLine(this.x + this.tiles.length - 1, this.y, x, y, (terrain, x, y) => {
        lineOfFire.push(terrain);
      });
      let inRange = this.range >= (lineOfFire.length - 2)
      let unobstructed = !lineOfFire.some(terrain => terrain.isCover);
      return inRange && unobstructed;
    });
  }
  hunt() {
    let player = this.map.player;
    let astar = new ROT.Path.AStar(player.x, player.y, (x, y) => {
      return this.map.traversableBy(x, y, this);
    }, {topology: 4});
    let path = [];
    astar.compute(this.x, this.y, (x, y) => {
      path.push([x, y]);
    });
    if (path.length > 1) {
      return this.tryMove(...path[1]);
    }
  }
  shoot(target, x=target.x, y=target.y) {
    this.map.animationManager.add(this.shootAnimation, 3, this.x + this.tiles.length - 1, this.y, x, y, 5).then(() => {
      target.takeDamage(this.attack);
    });
    return this.map.animationManager.wait();
  }
  waitForPlayerAction() {
    this._waitingForAction = true;
    this.map.engine.lock();
    this.map.render();
  }
  static create(name, options) {
    return new Entity(Object.assign({}, options, EntityLibrary[name]));
  }
}