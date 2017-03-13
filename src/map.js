import Array2d from './array2d';
import Terrain from './terrain';
import ChooseScreen from './screens/choose';
import powerUps from './power-ups';
import { randomInt, clamp, getCardinalNeighbors, getNeighbors } from './utils';

export default class Map {
  constructor({width, height, display}) {
    this.width = width;
    this.height = height;
    this.display = display;
    this._terrain = new Array2d(width, height);
    this._entities = {};
    this._scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this._scheduler);
  }

  render(display=this.display, centerX=this.player.x, centerY=this.player.y) {
    let displayWidth = display._options.width;
    let displayHeight = display._options.height;

    this.viewportX = clamp(centerX - displayWidth/2, 0, this.width - displayWidth);
    this.viewportY = clamp(centerY - displayHeight/2, 0, this.height - displayHeight);
    let i = 0;
    display._context.fillStyle = "#000000";
    display._context.fillRect(0,0,display._context.canvas.width,display._context.canvas.height);
    this._terrain.forRect(this.viewportX, this.viewportY, displayWidth, displayHeight, (terrainHere, x, y) => {
      let entityHere = this.entityAt(x, y);
      if (entityHere) {
        entityHere.render(display, this.viewportX, this.viewportY);
      } else if(terrainHere) {
        display.drawTile(i % displayWidth, Math.floor(i/displayHeight), terrainHere.getTile(), terrainHere.fg, terrainHere.bg);
      }
      i++;
    })
  }
  entityAt(x, y) {
    return this._entities[x + ',' + y];
  }
  terrainAt(x, y) {
    return this._terrain.get(x, y) || Terrain.create('nullTerrain');
  }
  setTerrain(x, y, newTerrain) {
    this._terrain.set(x, y, newTerrain);
  }
  tileAt(x, y) {
    let terrainHere = this.terrainAt(x, y);
    let entityHere = this.entityAt(x, y);
    if (entityHere) {
      let relativeX = x - entityHere.x;
      let relativeY = y - entityHere.y;
      return entityHere.tiles[relativeY][relativeX];
    } else if(terrainHere) {
      return terrainHere.getTile();
    }
  }
  describeAt(x, y) {
    let terrainHere = this.terrainAt(x, y);
    let entityHere = this.entityAt(x, y);
    if (entityHere) {
      return entityHere.description;
    } else if (terrainHere) {
      return terrainHere.description;
    }
    return '';
  }
  updateEntityPosition(entity, oldTiles) {
    // Delete the old key if it is the same entity
    // and we have old positions.
    if (oldTiles) {
      oldTiles.forEach(([oldX, oldY])=>{
        let oldKey = oldX + ',' + oldY;
        if (this._entities[oldKey] == entity) {
          delete this._entities[oldKey];
        }
      });
    }
    entity.getTiles().forEach(([x,y]) => { 
      // Make sure the entity's position is within bounds
      if (x < 0 || x >= this._width ||
          y < 0 || y >= this._height) {
        throw new Error("Entity's position is out of bounds.");
      }
      // stomp entities
      let entityHere = this.entityAt(x, y);
      if (entityHere && entityHere !== entity) {
        entityHere.die();
      }
      // Sanity check to make sure there is no entity at the new position.
      let key = x + ',' + y;
      if (this._entities[key]) {
        throw new Error('Tried to add an entity at an occupied position.');
      }
      // Add the entity to the table of entities
      this._entities[key] = entity;
      if (this.player) {
        this.render();
      }
      // stomp terrain
      let terrainHere = this.terrainAt(x, y);
      if (entity.stomps && terrainHere.stompable) {
        this.destroyTerrainAt(x, y, entity);
      }
    });
  }
  addEntity(entity) {
    // Update the entity's map
    entity.map = this;
    // Update the map with the entity's position
    this.updateEntityPosition(entity);
    // If the entity is the player, set the player.
    if (entity.isPlayer) {
      this.player = entity;
    }
    if (entity.act) {
       this._scheduler.add(entity, true);
    } 
  }
  getRandomUnoccupiedPosition(w=1,h=1) {
    let retries = 100;
    while(true && retries-- > 0) {
      let x = randomInt(this._terrain.width - 1);
      let y = randomInt(this._terrain.height - 1);
      let unoccupied = (0)
      if (this.unoccupiedAt(x, y, w, h)) {
        return {x, y}
      }
    }
  }
  getRandomEmptyRoadTile() {
    let retries = 100;
    while(true && retries-- > 0) {
      let x = randomInt(this._terrain.width - 1);
      let y = randomInt(this._terrain.height - 1);
      if (this.unoccupiedAt(x, y) && this.terrainAt(x, y).drivable) {
        return {x, y}
      }
    }
  }
  unoccupiedAt(x0, y0, w=1, h=1) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let entityHere = this.entityAt(x0 + x, y0 + y);
        let terrainHere = this.terrainAt(x0 + x, y0 + y);
        if (entityHere || !terrainHere || !terrainHere.walkable) {
          return false;
        }
      }  
    }
    return true;
  }
  isClearTerrainAt(x0, y0, w=1, h=1) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (this.isOOB(x0 + x, y0 + y) || !this.isEmptyTile(x0 + x, y0 + y)) {
          return false;
        }
      }  
    }
    return true;
  }
  isEmptyTile(x, y) {
    return this.terrainAt(x, y).tile === 'ground' || this.terrainAt(x, y).tile === 'road' || this.terrainAt(x, y).tile === 'sand';
  }
  isOOB(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
  }
  traversableBy(x0, y0, entity) {
    if (entity.description === 'Meka') {
      debugger
    }
    for (let y = 0; y < entity.h; y++) {
      for (let x = 0; x < entity.w; x++) {
        let entityHere = this.entityAt(x0 + x, y0 + y);
        let terrainHere = this.terrainAt(x0 + x, y0 + y);
        let entityBlocking = entityHere && entityHere !== entity && !entityHere.isPlayer;
        let canStomp = entityHere && (entityHere !== entity && entity.stomps && entityHere.stompable);
        if (entityBlocking && !canStomp || !entity.canTraverse(terrainHere)) {
          return false;
        }
      }  
    }
    return true;
  }
  removeEntity(entity) {
    // Remove the entity from the map
    entity.getTiles().forEach(([x,y]) => { 
      let key = x + ',' + y;
      if (this._entities[key] == entity) {
        delete this._entities[key];
      }
    });
    // If the entity is an actor, remove them from the scheduler
    if (entity.act) {
      this._scheduler.remove(entity);
    }
    // If the entity is the player, update the player field.
    if (entity.isPlayer) {
      this.player = undefined;
    }
  }
  smashAt(x0, y0, smasher) {
    for (let y = 0; y < smasher.h; y++) {
      for (let x = 0; x < smasher.w; x++) {
        let entityHere = this.entityAt(x0 + x, y0 + y);
        if (entityHere && entityHere.smashable) {
          entityHere.takeDamage(smasher.smashDamage);
        }
        let terrainHere = this.terrainAt(x0 + x, y0 + y);
        if (terrainHere && terrainHere.smashable) {
          this.destroyTerrainAt(x0 + x, y0 + y);
        }
      }  
    }
    return true;
  }
  blastAt(x, y, blaster) {

  }
  getPowerUp(terrain) {
    setTimeout(() => {
      let powers = [];
      if (terrain === 'Giant Peach') {
        powers = powerUps.peachPowers;
      } else {
        powers = powerUps.melonPowers;
      }
      this.player.map.animationManager.wait().then(() => {
        this.screenManager.open(new ChooseScreen({
          player: this.player, 
          display: this.display, 
          question: 'Delicious! Choose a Power-up!',
          answers: powers.map(p => `${p.name}\n${p.description}`),
          action: (id) => powers[id].bestow(this.player),
        }));  
      });
    });
  }
  destroyTerrainAt(x, y) {
    let terrainHere = this.terrainAt(x, y);
    let entityHere = this.entityAt(x, y);
    if (terrainHere.isPowerUp && entityHere && entityHere.isPlayer) {
      this.getPowerUp(terrainHere.description);    
    }
    if (terrainHere.electrified) {
      if (entityHere) {
        this.animationManager.add('electrocute', 6, entityHere);
        entityHere.takeDamage(terrainHere.elecDamage);
        entityHere.energy = Math.min(entityHere.maxEnergy, entityHere.energy + terrainHere.elecDamage * 2);
      }
    }
    if (terrainHere.explodes) {
      let damagedEntities = [];
      this.animationManager.add('explode', 10, x, y);
      Object.assign(terrainHere, Terrain.create(terrainHere.destroysTo));
      this.render();
      if (entityHere) {
        entityHere.takeDamage(terrainHere.explodeDamage);
        damagedEntities.push(entityHere);
      }
      setTimeout(() => {
        getNeighbors(x, y).forEach(({x,y}) => {
          let neighborEntity = this.entityAt(x, y);
          // don't damage same entity twice with same explosion;
          if (neighborEntity && !damagedEntities.includes(neighborEntity)) {
            neighborEntity.takeDamage(terrainHere.explodeDamage);
            damagedEntities.push(neighborEntity);
          }
          this.destroyTerrainAt(x, y);
        });
      }, 100);
    }
    if (terrainHere.collapses) {
      getCardinalNeighbors(x, y).forEach(({x, y}) => {
        let neighborEntity = this.entityAt(x, y);
        if (neighborEntity && neighborEntity.stompable) {
          neighborEntity.die();
        }
        let neighborTerrain = this.terrainAt(x, y);
        if (neighborTerrain.drivable) {
          let collapsed = Object.assign(Terrain.create(terrainHere.name), Terrain.create(terrainHere.destroysTo));
          this.setTerrain(x, y, collapsed);
        }
      });
    }
    if (terrainHere.destroysTo) {
      Object.assign(terrainHere, Terrain.create(terrainHere.destroysTo));
    }
    if (this.player) {
      this.render();
    }
  }
}