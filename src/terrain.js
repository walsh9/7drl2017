import TerrainLibrary from './terrain-library';

export default class Terrain {
  constructor(properties) {
    this.tile = properties.tiles.random();
    let defaults = {
      description: '', 
    }
    Object.assign(this, defaults, properties);
  }
  getTile() {
    return this.tile;
  }
  static create(name, options) {
    return new Terrain(Object.assign({name}, options, TerrainLibrary[name]));
  }
  static getTileFor(name) {
    return TerrainLibrary[name].tiles.random();
  }
}