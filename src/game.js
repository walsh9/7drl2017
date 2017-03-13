/*jshint global ROT*/
import Map from './map';
import MapBuilder from './map-builder';
import ScreenManager from './screen-manager';
import AnimationManager from './animation-manager';
import GameOverScreen from './screens/game-over';
import MainScreen from './screens/main';
import TitleScreen from './screens/title';
import { randomInt } from './utils';

import { loadImage, loadTileMap, loadPrefabs } from './preload';

Promise.all([
  loadImage('assets/i/tiles.png'),
  loadTileMap('assets/data/tilemap.txt', 32, 32),
  loadPrefabs('assets/data/prefabs.txt'),
  loadPrefabs('assets/data/starts.txt'),
  loadPrefabs('assets/data/set-pieces.txt'),
])
.then(function([tileSet, {tileMap, tiles}, prefabs, starts, setPieces]) {
  let displayOptions = {
    layout: "tile",
    bg: 'black',
    tileWidth: 32,
    tileHeight: 32,
    tileSet: tileSet,
    tileMap: tileMap,
    width: 16,
    height: 16,
    tileColorize: true
  };
  ROT.Display.prototype.drawTile = function(x, y, char, fg, bg) {
    if (char.map) {
      char = char.map(c => tiles[c]);
    } else {
      char = tiles[char];
    }
    display.draw(x, y, char, fg, bg);
  }
  let display = new ROT.Display(displayOptions);
  let mainCanvas = document.querySelector('canvas.main.under');
  let displayNode = display.getContainer();
  displayNode.classList = mainCanvas.classList;
  mainCanvas.parentNode.replaceChild(displayNode, mainCanvas);
  let map = new Map({width: 200, height: 25, display});

  let overlayCanvas = document.querySelector('canvas.main.over');
  display.overlay = overlayCanvas.getContext('2d');
  display.overlay.clear = () => display.overlay.canvas.width += 0;

  map.animationManager = new AnimationManager(display.overlay, map);
  map.animationManager.start();

  let mapBuilder = new MapBuilder(map);
  let player = mapBuilder.placePlayer(196, 12);
  mapBuilder.placePrefab(setPieces.giantPeach, 172, randomInt(1, 4) * 4);
  mapBuilder.placePrefab(setPieces.giantWatermelon, 120, randomInt(1, 4) * 4);
  mapBuilder.placePrefab(setPieces.BGDock, 80, 8);
  mapBuilder.placeEntity('betterGigastomp', 84, 12);
  mapBuilder.placePrefab(starts[Object.keys(starts).random()], 180, 0);
  mapBuilder.placePrefabs(prefabs, 0, 0, 175, 25);
  mapBuilder.placeCreatures(32);
  map.render(display, player.x, player.y);

  let status = new ROT.Display({width: 51, height: 4});
  display.status = status;
  document.querySelector('.wrapper').insertBefore(display.status.getContainer(), document.querySelector('.wrapper').firstChild);

  let help = new ROT.Display({width: 51, height: 4});
  display.help = help;
  document.querySelector('.wrapper').appendChild(display.help.getContainer());

  let screenManager = new ScreenManager();
  screenManager.open(new GameOverScreen({player, display}));
  screenManager.open(new MainScreen({player, display}));
  screenManager.open(new TitleScreen({display}));
  map.screenManager = screenManager;
  map.engine.start();

  window.setInterval(_ => screenManager.renderCurrent(), 1000/33)

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === ROT.VK_LEFT) {
      screenManager.sendCurrent('left');
    } else if (e.keyCode === ROT.VK_RIGHT) {
      screenManager.sendCurrent('right');
    } else if (e.keyCode === ROT.VK_UP) {
      screenManager.sendCurrent('up');
    } else if (e.keyCode === ROT.VK_DOWN) {
      screenManager.sendCurrent('down');
    } else if (e.keyCode === ROT.VK_SPACE) {
      screenManager.sendCurrent('space');      
    } else if (e.keyCode === ROT.VK_RETURN) {
      screenManager.sendCurrent('return');      
    } else if (e.keyCode === ROT.VK_ESCAPE) {
      screenManager.sendCurrent('escape');            
    } else if (e.keyCode === ROT.VK_F) {
      screenManager.sendCurrent('f');            
    } else if (e.keyCode === ROT.VK_G) {
      screenManager.sendCurrent('g');            
    }
  });
});


