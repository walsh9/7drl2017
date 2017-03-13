import Terrain from './terrain';
import Entity from './entity';
import { randomInt } from './utils';

export default class MapBuilder {
  constructor(map) {
    this.map = map;
    this.terrain = map._terrain;
    this.terrain.fill(Terrain.create('ground'));
  }
  placePlayer(x, y) {
    let player = Entity.create('gigastomp', {x: x, y: y});
    this.map.addEntity(player);
    return player;
  }
  placeCreatures(n) {
    for (let i=0; i<n; i++) {
      let enemyName = ['tanks', 'maserTank'].random();
      let e = Entity.create(enemyName, {x: 0, y: 0});
      let pos = this.map.getRandomEmptyRoadTile(e.w, e.h);
      e.setPosition(pos.x, pos.y);
      this.map.addEntity(e);
    }    
  }
  placeEntity(e, x, y) {
    this.map.addEntity(Entity.create(e, {x, y}));
  }
  placePrefabs(prefabs, x, y, w, h) {
    let step = 4;
    while (y < h) {
      for (let retries = 10; retries > 0; retries--) {
        let p = prefabs[Object.keys(prefabs).random()];
        if (this.map.isClearTerrainAt(x, y, p.width, p.height)) {
          this.placePrefab(p, x, y);
          break;
        }
      }
      if (x > w) {
        x = 0;
        y += step;
      } else {
        x += step;
      }
    }
  }
  placePrefab(prefab, x0, y0) {
    for (let y = 0; y < prefab.height; y++) {
      for (let x = 0; x < prefab.width; x++) {
        this.terrain.set(x + x0, y + y0, Terrain.create(prefab.tiles[y][x]));
      }
    }
  }
}