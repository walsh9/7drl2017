/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen() {
    _classCallCheck(this, Screen);

    this.actions = {};
  }

  _createClass(Screen, [{
    key: "render",
    value: function render() {}
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Screen;
}();

exports.default = Screen;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _terrainLibrary = __webpack_require__(15);

var _terrainLibrary2 = _interopRequireDefault(_terrainLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Terrain = function () {
  function Terrain(properties) {
    _classCallCheck(this, Terrain);

    this.tile = properties.tiles.random();
    var defaults = {
      description: ''
    };
    Object.assign(this, defaults, properties);
  }

  _createClass(Terrain, [{
    key: 'getTile',
    value: function getTile() {
      return this.tile;
    }
  }], [{
    key: 'create',
    value: function create(name, options) {
      return new Terrain(Object.assign({ name: name }, options, _terrainLibrary2.default[name]));
    }
  }, {
    key: 'getTileFor',
    value: function getTileFor(name) {
      return _terrainLibrary2.default[name].tiles.random();
    }
  }]);

  return Terrain;
}();

exports.default = Terrain;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomInt = randomInt;
exports.clamp = clamp;
exports.animate = animate;
exports.getNeighbors = getNeighbors;
exports.getHorizontalNeighbors = getHorizontalNeighbors;
exports.getVerticalNeighbors = getVerticalNeighbors;
exports.getCardinalNeighbors = getCardinalNeighbors;
exports.taxicabDistance = taxicabDistance;
function randomInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(ROT.RNG.getUniform() * (max - min + 1) + min);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function animate(animation, durationInMs) {
  return new Promise(function (resolve) {
    var fps = 1000 / 30;
    var elapsed = 0;
    var ticks = 0;
    var timer = window.setInterval(function () {
      animation(ticks);
      ticks++;
      elapsed += fps;
      if (elapsed > durationInMs) {
        window.clearInterval(timer);
        resolve();
      };
    }, fps);
  });
}

function getNeighbors(x, y) {
  var tiles = [];
  // Generate all possible offsets
  for (var dX = -1; dX < 2; dX++) {
    for (var dY = -1; dY < 2; dY++) {
      // Make sure it isn't the same tile
      if (dX == 0 && dY == 0) {
        continue;
      }
      tiles.push({ x: x + dX, y: y + dY });
    }
  }
  return tiles.randomize();
};

function getHorizontalNeighbors(x, y) {
  var tiles = [];
  tiles.push({ x: x - 1, y: y });
  tiles.push({ x: x + 1, y: y });
  return tiles.randomize();
};

function getVerticalNeighbors(x, y) {
  var tiles = [];
  tiles.push({ x: x, y: y - 1 });
  tiles.push({ x: x, y: y + 1 });
  return tiles.randomize();
};

function getCardinalNeighbors(x, y) {
  var tiles = [];
  tiles.push({ x: x - 1, y: y });
  tiles.push({ x: x + 1, y: y });
  tiles.push({ x: x, y: y - 1 });
  tiles.push({ x: x, y: y + 1 });
  return tiles.randomize();
};

function taxicabDistance(x0, y0, x1, y1) {
  return Math.abs(x0 - x1) + Math.abs(y0 - y1);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _array2d = __webpack_require__(8);

var _array2d2 = _interopRequireDefault(_array2d);

var _terrain = __webpack_require__(1);

var _terrain2 = _interopRequireDefault(_terrain);

var _choose = __webpack_require__(24);

var _choose2 = _interopRequireDefault(_choose);

var _powerUps = __webpack_require__(25);

var _powerUps2 = _interopRequireDefault(_powerUps);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
  function Map(_ref) {
    var width = _ref.width,
        height = _ref.height,
        display = _ref.display;

    _classCallCheck(this, Map);

    this.width = width;
    this.height = height;
    this.display = display;
    this._terrain = new _array2d2.default(width, height);
    this._entities = {};
    this._scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this._scheduler);
  }

  _createClass(Map, [{
    key: 'render',
    value: function render() {
      var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.display;

      var _this = this;

      var centerX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.player.x;
      var centerY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.player.y;

      var displayWidth = display._options.width;
      var displayHeight = display._options.height;

      this.viewportX = (0, _utils.clamp)(centerX - displayWidth / 2, 0, this.width - displayWidth);
      this.viewportY = (0, _utils.clamp)(centerY - displayHeight / 2, 0, this.height - displayHeight);
      var i = 0;
      display._context.fillStyle = "#000000";
      display._context.fillRect(0, 0, display._context.canvas.width, display._context.canvas.height);
      this._terrain.forRect(this.viewportX, this.viewportY, displayWidth, displayHeight, function (terrainHere, x, y) {
        var entityHere = _this.entityAt(x, y);
        if (entityHere) {
          entityHere.render(display, _this.viewportX, _this.viewportY);
        } else if (terrainHere) {
          display.drawTile(i % displayWidth, Math.floor(i / displayHeight), terrainHere.getTile(), terrainHere.fg, terrainHere.bg);
        }
        i++;
      });
    }
  }, {
    key: 'entityAt',
    value: function entityAt(x, y) {
      return this._entities[x + ',' + y];
    }
  }, {
    key: 'terrainAt',
    value: function terrainAt(x, y) {
      return this._terrain.get(x, y) || _terrain2.default.create('nullTerrain');
    }
  }, {
    key: 'setTerrain',
    value: function setTerrain(x, y, newTerrain) {
      this._terrain.set(x, y, newTerrain);
    }
  }, {
    key: 'tileAt',
    value: function tileAt(x, y) {
      var terrainHere = this.terrainAt(x, y);
      var entityHere = this.entityAt(x, y);
      if (entityHere) {
        var relativeX = x - entityHere.x;
        var relativeY = y - entityHere.y;
        return entityHere.tiles[relativeY][relativeX];
      } else if (terrainHere) {
        return terrainHere.getTile();
      }
    }
  }, {
    key: 'describeAt',
    value: function describeAt(x, y) {
      var terrainHere = this.terrainAt(x, y);
      var entityHere = this.entityAt(x, y);
      if (entityHere) {
        return entityHere.description;
      } else if (terrainHere) {
        return terrainHere.description;
      }
      return '';
    }
  }, {
    key: 'updateEntityPosition',
    value: function updateEntityPosition(entity, oldTiles) {
      var _this2 = this;

      // Delete the old key if it is the same entity
      // and we have old positions.
      if (oldTiles) {
        oldTiles.forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              oldX = _ref3[0],
              oldY = _ref3[1];

          var oldKey = oldX + ',' + oldY;
          if (_this2._entities[oldKey] == entity) {
            delete _this2._entities[oldKey];
          }
        });
      }
      entity.getTiles().forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            x = _ref5[0],
            y = _ref5[1];

        // Make sure the entity's position is within bounds
        if (x < 0 || x >= _this2._width || y < 0 || y >= _this2._height) {
          throw new Error("Entity's position is out of bounds.");
        }
        // stomp entities
        var entityHere = _this2.entityAt(x, y);
        if (entityHere && entityHere !== entity) {
          entityHere.die();
        }
        // Sanity check to make sure there is no entity at the new position.
        var key = x + ',' + y;
        if (_this2._entities[key]) {
          throw new Error('Tried to add an entity at an occupied position.');
        }
        // Add the entity to the table of entities
        _this2._entities[key] = entity;
        if (_this2.player) {
          _this2.render();
        }
        // stomp terrain
        var terrainHere = _this2.terrainAt(x, y);
        if (entity.stomps && terrainHere.stompable) {
          _this2.destroyTerrainAt(x, y, entity);
        }
      });
    }
  }, {
    key: 'addEntity',
    value: function addEntity(entity) {
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
  }, {
    key: 'getRandomUnoccupiedPosition',
    value: function getRandomUnoccupiedPosition() {
      var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var retries = 100;
      while (true && retries-- > 0) {
        var x = (0, _utils.randomInt)(this._terrain.width - 1);
        var y = (0, _utils.randomInt)(this._terrain.height - 1);
        var unoccupied = 0;
        if (this.unoccupiedAt(x, y, w, h)) {
          return { x: x, y: y };
        }
      }
    }
  }, {
    key: 'getRandomEmptyRoadTile',
    value: function getRandomEmptyRoadTile() {
      var retries = 100;
      while (true && retries-- > 0) {
        var x = (0, _utils.randomInt)(this._terrain.width - 1);
        var y = (0, _utils.randomInt)(this._terrain.height - 1);
        if (this.unoccupiedAt(x, y) && this.terrainAt(x, y).drivable) {
          return { x: x, y: y };
        }
      }
    }
  }, {
    key: 'unoccupiedAt',
    value: function unoccupiedAt(x0, y0) {
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          var entityHere = this.entityAt(x0 + x, y0 + y);
          var terrainHere = this.terrainAt(x0 + x, y0 + y);
          if (entityHere || !terrainHere || !terrainHere.walkable) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'isClearTerrainAt',
    value: function isClearTerrainAt(x0, y0) {
      var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          if (this.isOOB(x0 + x, y0 + y) || !this.isEmptyTile(x0 + x, y0 + y)) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'isEmptyTile',
    value: function isEmptyTile(x, y) {
      return this.terrainAt(x, y).tile === 'ground' || this.terrainAt(x, y).tile === 'road' || this.terrainAt(x, y).tile === 'sand';
    }
  }, {
    key: 'isOOB',
    value: function isOOB(x, y) {
      return x < 0 || x >= this.width || y < 0 || y >= this.height;
    }
  }, {
    key: 'traversableBy',
    value: function traversableBy(x0, y0, entity) {
      if (entity.description === 'Meka') {
        debugger;
      }
      for (var y = 0; y < entity.h; y++) {
        for (var x = 0; x < entity.w; x++) {
          var entityHere = this.entityAt(x0 + x, y0 + y);
          var terrainHere = this.terrainAt(x0 + x, y0 + y);
          var entityBlocking = entityHere && entityHere !== entity && !entityHere.isPlayer;
          var canStomp = entityHere && entityHere !== entity && entity.stomps && entityHere.stompable;
          if (entityBlocking && !canStomp || !entity.canTraverse(terrainHere)) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: 'removeEntity',
    value: function removeEntity(entity) {
      var _this3 = this;

      // Remove the entity from the map
      entity.getTiles().forEach(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            x = _ref7[0],
            y = _ref7[1];

        var key = x + ',' + y;
        if (_this3._entities[key] == entity) {
          delete _this3._entities[key];
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
  }, {
    key: 'smashAt',
    value: function smashAt(x0, y0, smasher) {
      for (var y = 0; y < smasher.h; y++) {
        for (var x = 0; x < smasher.w; x++) {
          var entityHere = this.entityAt(x0 + x, y0 + y);
          if (entityHere && entityHere.smashable) {
            entityHere.takeDamage(smasher.smashDamage);
          }
          var terrainHere = this.terrainAt(x0 + x, y0 + y);
          if (terrainHere && terrainHere.smashable) {
            this.destroyTerrainAt(x0 + x, y0 + y);
          }
        }
      }
      return true;
    }
  }, {
    key: 'blastAt',
    value: function blastAt(x, y, blaster) {}
  }, {
    key: 'getPowerUp',
    value: function getPowerUp(terrain) {
      var _this4 = this;

      setTimeout(function () {
        var powers = [];
        if (terrain === 'Giant Peach') {
          powers = _powerUps2.default.peachPowers;
        } else {
          powers = _powerUps2.default.melonPowers;
        }
        _this4.player.map.animationManager.wait().then(function () {
          _this4.screenManager.open(new _choose2.default({
            player: _this4.player,
            display: _this4.display,
            question: 'Delicious! Choose a Power-up!',
            answers: powers.map(function (p) {
              return p.name + '\n' + p.description;
            }),
            action: function action(id) {
              return powers[id].bestow(_this4.player);
            }
          }));
        });
      });
    }
  }, {
    key: 'destroyTerrainAt',
    value: function destroyTerrainAt(x, y) {
      var _this5 = this;

      var terrainHere = this.terrainAt(x, y);
      var entityHere = this.entityAt(x, y);
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
        var damagedEntities = [];
        this.animationManager.add('explode', 10, x, y);
        Object.assign(terrainHere, _terrain2.default.create(terrainHere.destroysTo));
        this.render();
        if (entityHere) {
          entityHere.takeDamage(terrainHere.explodeDamage);
          damagedEntities.push(entityHere);
        }
        setTimeout(function () {
          (0, _utils.getNeighbors)(x, y).forEach(function (_ref8) {
            var x = _ref8.x,
                y = _ref8.y;

            var neighborEntity = _this5.entityAt(x, y);
            // don't damage same entity twice with same explosion;
            if (neighborEntity && !damagedEntities.includes(neighborEntity)) {
              neighborEntity.takeDamage(terrainHere.explodeDamage);
              damagedEntities.push(neighborEntity);
            }
            _this5.destroyTerrainAt(x, y);
          });
        }, 100);
      }
      if (terrainHere.collapses) {
        (0, _utils.getCardinalNeighbors)(x, y).forEach(function (_ref9) {
          var x = _ref9.x,
              y = _ref9.y;

          var neighborEntity = _this5.entityAt(x, y);
          if (neighborEntity && neighborEntity.stompable) {
            neighborEntity.die();
          }
          var neighborTerrain = _this5.terrainAt(x, y);
          if (neighborTerrain.drivable) {
            var collapsed = Object.assign(_terrain2.default.create(terrainHere.name), _terrain2.default.create(terrainHere.destroysTo));
            _this5.setTerrain(x, y, collapsed);
          }
        });
      }
      if (terrainHere.destroysTo) {
        Object.assign(terrainHere, _terrain2.default.create(terrainHere.destroysTo));
      }
      if (this.player) {
        this.render();
      }
    }
  }]);

  return Map;
}();

exports.default = Map;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.loadImage = loadImage;
exports.loadPrefabs = loadPrefabs;
exports.loadTileMap = loadTileMap;
function loadImage(fileName) {
  return new Promise(function (resolve) {
    var image = document.createElement("img");
    image.onload = function (_) {
      return resolve(image);
    };
    image.src = fileName;
  });
}

function loadPrefabs(filename) {
  var terrainMatcher = /^TERRAIN: (\S+) = (\w+)/;
  var nameMatcher = /^NAME: (\w+)/;
  var weightMatcher = /^WEIGHT: (\d+)/;
  return new Promise(function (resolve) {
    fetch(filename).then(function (response) {
      var tiles = {};
      var prefabs = {};
      response.text().then(function (text) {
        var lines = text.split('\n');
        var currentName = 'garbage';
        prefabs[currentName] = { name: currentName, weight: 0, tiles: [] };
        while (lines.length > 0) {
          var line = lines.shift();
          if (terrainMatcher.test(line)) {
            var _line$match = line.match(terrainMatcher),
                _line$match2 = _slicedToArray(_line$match, 3),
                _ = _line$match2[0],
                char = _line$match2[1],
                terrain = _line$match2[2];

            tiles[char] = terrain;
          } else if (nameMatcher.test(line)) {
            var _line$match3 = line.match(nameMatcher),
                _line$match4 = _slicedToArray(_line$match3, 2),
                _2 = _line$match4[0],
                name = _line$match4[1];

            prefabs[name] = { name: name, weight: 0, tiles: [] };
            currentName = name;
          } else if (weightMatcher.test(line)) {
            var _line$match5 = line.match(weightMatcher),
                _line$match6 = _slicedToArray(_line$match5, 2),
                _3 = _line$match6[0],
                weight = _line$match6[1];

            prefabs[currentName].weight = weight;
          } else if (line.trim() === 'MAP') {
            while (lines.length > 0 && line.trim() !== 'ENDMAP') {
              var _line = lines.shift();
              if (_line.trim() !== 'ENDMAP') {
                prefabs[currentName].tiles.push(_line.split('').map(function (char) {
                  return tiles[char];
                }));
              } else {
                prefabs[currentName].width = prefabs[currentName].tiles[0].length;
                prefabs[currentName].height = prefabs[currentName].tiles.length;
                break;
              }
            }
          }
        }
        delete prefabs.garbage;
        resolve(prefabs);
      });
    });
  });
}

function loadTileMap(filename, tileWidth, tileHeight) {
  var tileMapMatcher = /^(\w+)\s+(\d+)\s+(\d+)/;
  return new Promise(function (resolve) {
    fetch(filename).then(function (response) {
      var char = 32;
      var nextChar = function nextChar() {
        return String.fromCharCode(char++);
      };
      var tiles = {};
      var tileMap = {};
      response.text().then(function (text) {
        var lines = text.split('\n');
        while (lines.length > 0) {
          var line = lines.shift();
          if (tileMapMatcher.test(line)) {
            var _line$match7 = line.match(tileMapMatcher),
                _line$match8 = _slicedToArray(_line$match7, 4),
                _ = _line$match8[0],
                name = _line$match8[1],
                x = _line$match8[2],
                y = _line$match8[3];

            tiles[name] = nextChar();
            tileMap[tiles[name]] = [x * tileWidth, y * tileHeight];
          }
        }
        resolve({ tileMap: tileMap, tiles: tiles });
      });
    });
  });
}

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

var _look = __webpack_require__(10);

var _look2 = _interopRequireDefault(_look);

var _terrain = __webpack_require__(1);

var _terrain2 = _interopRequireDefault(_terrain);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainScreen = function (_Screen) {
  _inherits(MainScreen, _Screen);

  function MainScreen(_ref) {
    var player = _ref.player,
        display = _ref.display;

    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.player = player;
    _this.display = display;
    _this.actions = {
      left: function left() {
        if (!this.player._waitingForAction) {
          return;
        }
        this._movePlayer(-1, 0);
        this._endTurn();
      },
      right: function right() {
        if (!this.player._waitingForAction) {
          return;
        }
        this._movePlayer(1, 0);
        this._endTurn();
      },
      up: function up() {
        if (!this.player._waitingForAction) {
          return;
        }
        this._movePlayer(0, -1);
        this._endTurn();
      },
      down: function down() {
        if (!this.player._waitingForAction) {
          return;
        }
        this._movePlayer(0, 1);
        this._endTurn();
      },
      space: function space() {
        if (!this.player._waitingForAction) {
          return;
        }
        this._movePlayer(0, 0);
        this._endTurn();
      },
      f: function f() {
        if (player.energy < 5) {
          return;
        }
        if (!this.player._waitingForAction) {
          return;
        }
        var self = this;
        var action = function action(x1, y1) {
          var _this2 = this;

          this.player._waitingForAction = false;
          this.player.map.animationManager.add('beam', 15, this.player.x, this.player.y, x1, y1).then(function () {
            _this2.player.map.display.overlay.clear();
            _this2.player.energy -= 6;
            if (_this2.player.penetratingBeam) {
              _this2.player.map._terrain.forLine(_this2.player.x, _this2.player.y, x1, y1, function (_, x, y) {
                var targetEntity = _this2.player.map.entityAt(x, y);
                if (targetEntity && targetEntity !== _this2.player) {
                  targetEntity.takeDamage(6);
                }
                _this2.player.map.destroyTerrainAt(x, y, _this2.player);
              });
            } else {
              var targetEntity = _this2.player.map.entityAt(x1, y1);
              if (targetEntity) {
                targetEntity.takeDamage(5);
              }
              _this2.player.map.destroyTerrainAt(x1, y1, _this2.player);
            }
          });
          this.player.map.animationManager.wait().then(function () {
            _this2.player._waitingForAction = true;
            self._endTurn();
          });
        };
        this.manager.open(new _look2.default({ player: this.player, display: this.display, action: action }));
      },
      g: function g() {
        var _this3 = this;

        if (!this.player.gigaWave || this.player.energy < 10) {
          return;
        }
        if (!this.player._waitingForAction) {
          return;
        }
        this.player._waitingForAction = false;
        this.player.energy -= 10;
        this.player.map.animationManager.add('explode', 18, this.player.x + 0.5, this.player.y + 0.5, 160, 'white').then(function () {
          var tiles = _this3.player.getTiles();
          tiles.slice(0).forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                x0 = _ref3[0],
                y0 = _ref3[1];

            (0, _utils.getNeighbors)(x0, y0).forEach(function (_ref4) {
              var x = _ref4.x,
                  y = _ref4.y;

              if (!tiles.some(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    x1 = _ref6[0],
                    y1 = _ref6[1];

                return x1 === x && y1 === y;
              })) {
                tiles.push([x, y]);
              }
            });
          });
          tiles.slice(0).forEach(function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                x0 = _ref8[0],
                y0 = _ref8[1];

            (0, _utils.getCardinalNeighbors)(x0, y0).forEach(function (_ref9) {
              var x = _ref9.x,
                  y = _ref9.y;

              if (!tiles.some(function (_ref10) {
                var _ref11 = _slicedToArray(_ref10, 2),
                    x1 = _ref11[0],
                    y1 = _ref11[1];

                return x1 === x && y1 === y;
              })) {
                tiles.push([x, y]);
              }
            });
          });
          tiles.slice(0).forEach(function (_ref12) {
            var _ref13 = _slicedToArray(_ref12, 2),
                x0 = _ref13[0],
                y0 = _ref13[1];

            (0, _utils.getCardinalNeighbors)(x0, y0).forEach(function (_ref14) {
              var x = _ref14.x,
                  y = _ref14.y;

              if (!tiles.some(function (_ref15) {
                var _ref16 = _slicedToArray(_ref15, 2),
                    x1 = _ref16[0],
                    y1 = _ref16[1];

                return x1 === x && y1 === y;
              })) {
                tiles.push([x, y]);
              }
            });
          });
          tiles.slice(0).forEach(function (_ref17) {
            var _ref18 = _slicedToArray(_ref17, 2),
                x0 = _ref18[0],
                y0 = _ref18[1];

            (0, _utils.getCardinalNeighbors)(x0, y0).forEach(function (_ref19) {
              var x = _ref19.x,
                  y = _ref19.y;

              if (!tiles.some(function (_ref20) {
                var _ref21 = _slicedToArray(_ref20, 2),
                    x1 = _ref21[0],
                    y1 = _ref21[1];

                return x1 === x && y1 === y;
              })) {
                tiles.push([x, y]);
              }
            });
          });
          tiles.forEach(function (_ref22) {
            var _ref23 = _slicedToArray(_ref22, 2),
                x = _ref23[0],
                y = _ref23[1];

            var targetEntity = _this3.player.map.entityAt(x, y);
            if (targetEntity && targetEntity !== _this3.player) {
              targetEntity.takeDamage(8);
            }
            _this3.player.map.destroyTerrainAt(x, y, _this3.player);
          });
          _this3.player._waitingForAction = true;
          _this3._endTurn();
        });
      },
      open: function open() {
        this.render();
      },
      switchIn: function switchIn() {
        this.render();
      }
    };
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'render',
    value: function render() {
      this.player.map.render(this.display, this.player.x, this.player.y);
      this._renderStatus();
      this._renderHelp();
    }
  }, {
    key: '_renderStatus',
    value: function _renderStatus() {
      var p = this.player;
      this.display.status.clear();
      this.display.status.drawText(1, 0, 'HEALTH: ' + Math.ceil(p.health) + '/' + p.maxHealth);
      this.display.status.drawText(1, 1, 'ENERGY: ' + Math.floor(p.energy) + '/' + p.maxEnergy);
    }
  }, {
    key: '_renderHelp',
    value: function _renderHelp() {
      this.display.help.clear();
      this.display.help.drawText(1, 0, '[Arrows] Stomp around');
      this.display.help.drawText(1, 1, '[Space]  Wait a turn');
      this.display.help.drawText(1, 2, '[F]      Energy Beam (5)');
      if (this.player.gigaWave) {
        this.display.help.drawText(30, 0, '[G] Giga Wave (10)');
      }
    }
  }, {
    key: '_movePlayer',
    value: function _movePlayer(dX, dY) {
      var newX = this.player.x + dX;
      var newY = this.player.y + dY;
      // Try to move to the new cell
      this.player.tryMove(newX, newY, this.player.map);
      this._endTurn();
    }
  }, {
    key: '_endTurn',
    value: function _endTurn() {
      var _this4 = this;

      //this.player._waitingForAction = false;
      if (this.player._waitingForAction) {
        this.player._waitingForAction = false;
        this.player.map.animationManager.wait().then(function () {
          if (_this4.player.health <= 0) {
            _this4.manager.closeCurrent();
          } else {
            _this4.player.map.engine.unlock();
            _this4.render();
          }
        });
      };
    }
  }]);

  return MainScreen;
}(_screen2.default);

exports.default = MainScreen;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(w, h) {
    _classCallCheck(this, _class);

    this.width = w;
    this.height = h;
    this._array = [];
    this.fill(undefined);
  }

  _createClass(_class, [{
    key: "get",
    value: function get(x, y) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return undefined;
      }
      return this._array[x + y * this.width];
    }
  }, {
    key: "set",
    value: function set(x, y, val) {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        throw new RangeError('Index out of bounds');
      } else {
        this._array[x + y * this.width] = val;
        return this;
      }
    }
  }, {
    key: "setArray",
    value: function setArray(array) {
      this._array = array.slice(0);
    }
  }, {
    key: "forEach",
    value: function forEach(callback, thisArg) {
      for (var i = 0; i < this._array.length; i++) {
        var x = i % this.width;
        var y = Math.floor(i / this.width);
        callback.call(thisArg, this._array[i], x, y, this.width, this.height);
      }
      return undefined;
    }
  }, {
    key: "forRect",
    value: function forRect(x0, y0, w, h, callback, thisArg) {
      var x1 = x0 + w;
      var y1 = y0 + h;
      for (var y = y0; y < y1; y++) {
        for (var x = x0; x < x1; x++) {
          this.do(x, y, callback, thisArg);
        }
      }
    }
  }, {
    key: "map",
    value: function map(callback, thisArg) {
      var mappedArray = this.clone();
      this.forEach(function (value, x, y, w, h) {
        var newValue = callback.call(thisArg, value, x, y, w, h);
        mappedArray.set(x, y, newValue);
      });
      return mappedArray;
    }
  }, {
    key: "slice2d",
    value: function slice2d(x0, y0, x1, y1) {
      var arraySlice = [];
      x1 = x1 || this.width;
      y1 = y1 || this.height;
      for (var y = y0; y < y1; y++) {
        for (var x = x0; x < x1; x++) {
          arraySlice.push(this.get(x, y));
        }
      }
      var sliced = new Array2d(x1 - x0, y1 - y0);
      sliced.setArray(arraySlice);
      return sliced;
    }
  }, {
    key: "clone",
    value: function clone() {
      return this.slice2d(0, 0);
    }
  }, {
    key: "do",
    value: function _do(x, y, callback, thisArg) {
      callback.call(thisArg, this._array[x + y * this.width], x, y, this.width, this.height);
      return this;
    }
  }, {
    key: "forLine",
    value: function forLine(x0, y0, x1, y1, callback, thisArg) {
      var deltaX = Math.abs(x1 - x0);
      var deltaY = -Math.abs(y1 - y0);
      var signX = x0 < x1 ? 1 : -1;
      var signY = y0 < y1 ? 1 : -1;
      var err = deltaX + deltaY;
      var e2 = void 0;
      this.do(x0, y0, callback, thisArg);
      while (!(x0 == x1 && y0 == y1)) {
        e2 = Math.floor(err * 2);
        if (e2 >= deltaY) {
          err += deltaY;
          x0 += signX;
        }
        if (e2 <= deltaX) {
          err += deltaX;
          y0 += signY;
        }
        this.do(x0, y0, callback, thisArg);
      }
    }
  }, {
    key: "forEllipse",
    value: function forEllipse(x0, y0, x1, y1, callback, thisArg) {
      // x0 = 2 * x0 - x1;
      // y0 = 2 * y0 - y1;
      y0--;
      y1--;
      var plot4EllipsePoints = function plot4EllipsePoints(x, y) {
        this.do(x0 + x, y0 + y, callback, thisArg);
        this.do(x0 - x, y0 + y, callback, thisArg);
        this.do(x0 - x, y0 - y, callback, thisArg);
        this.do(x0 + x, y0 - y, callback, thisArg);
      };
      var a = Math.abs(x1 - x0);
      var b = Math.abs(y1 - y0);
      var b1 = b % 2;
      var dx = 4 * (1 - a) * b * b;
      var dy = 4 * (b1 + 1) * a * a;
      var err = dx + dy + b1 * a * a;
      var e2 = void 0;
      if (x0 > x1) {
        x0 = x1;
        x1 += a;
      }
      if (y0 > y1) {
        y0 = y1;
      }
      y0 += Math.round((b + 1) / 2);
      y1 = y0 - b1;
      a = a * 8 * a;
      b1 = 8 * b * b;
      do {
        this.do(x1, y0, callback, thisArg);
        this.do(x0, y0, callback, thisArg);
        this.do(x0, y1, callback, thisArg);
        this.do(x1, y1, callback, thisArg);
        e2 = 2 * err;
        if (e2 <= dy) {
          y0++;
          y1--;
          err += dy += a;
        }
        if (e2 >= dx || 2 * err > dy) {
          x0++;
          x1--;
          err += dx += b1;
        }
      } while (x0 <= x1);
      while (y0 - y1 < b) {
        this.do(x0 - 1, y0, callback, thisArg);
        this.do(x1 + 1, y0++, callback, thisArg);
        this.do(x0 - 1, y1, callback, thisArg);
        this.do(x1 + 1, y1--, callback, thisArg);
      }
    }
  }, {
    key: "fill",
    value: function fill(value) {
      var w = this.width;
      var h = this.height;
      for (var i = 0; i < w * h; i++) {
        this._array[i] = value;
      }
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      var w = this.width;
      var h = this.height;
      var s = "[ \n";
      for (var y = 0; y < h; y++) {
        s = s + "  [" + this._array.slice(y * w, y * w + w).join(",") + "]\n";
      }
      s = s + "]";
      return s;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entityLibrary = __webpack_require__(13);

var _entityLibrary2 = _interopRequireDefault(_entityLibrary);

var _terrain = __webpack_require__(1);

var _terrain2 = _interopRequireDefault(_terrain);

var _end = __webpack_require__(26);

var _end2 = _interopRequireDefault(_end);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(properties) {
    _classCallCheck(this, Entity);

    this.map = null;
    this._x = properties.x;
    delete properties.x;
    this._y = properties.y;
    delete properties.y;
    this.tiles = properties.tiles;
    var defaults = {
      description: '',
      speed: 1000
    };
    Object.assign(this, defaults, properties);
  }

  _createClass(Entity, [{
    key: 'getSpeed',
    value: function getSpeed() {
      return this.speed;
    }
  }, {
    key: 'getTiles',
    value: function getTiles() {
      var tiles = [];
      for (var y = 0; y < this.tiles.length; y++) {
        for (var x = 0; x < this.tiles[y].length; x++) {
          tiles.push([this.x + x, this.y + y]);
        }
      }
      return tiles;
    }
  }, {
    key: 'act',
    value: function act() {
      if (this.energyRegenRate) {
        this.energy = Math.min(this.maxEnergy, this.energy + this.energyRegenRate);
      }
      if (this.healthRegenRate) {
        this.health = Math.min(this.maxHealth, this.health + this.healthRegenRate);
      }

      return this[this.ai]();
    }
  }, {
    key: 'render',
    value: function render(display, viewportX, viewportY) {
      display = this.map.display;
      viewportX = this.map.viewportX;
      viewportY = this.map.viewportY;
      for (var y = 0; y < this.h; y++) {
        for (var x = 0; x < this.w; x++) {
          var terrainHere = this.map.terrainAt(this.x + x, this.y + y);
          if (terrainHere.swimmable && y + 1 === this.h) {
            display.drawTile(this.x - viewportX + x, this.y - viewportY + y, this.tiles[y][x], terrainHere.fg, terrainHere.bg);
          } else {
            display.drawTile(this.x - viewportX + x, this.y - viewportY + y, this.tiles[y][x], this.fgOverride || this.fg, this.bg);
          }
        }
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      var oldTiles = this.getTiles();
      this._x = x;
      this._y = y;
      if (this.map) {
        this.map.updateEntityPosition(this, oldTiles);
      }
    }
  }, {
    key: 'canTraverse',
    value: function canTraverse(terrain) {
      return this.stomps && terrain.stompable || this.drives && terrain.drivable || this.swims && terrain.swimmable;
    }
  }, {
    key: 'tryMove',
    value: function tryMove(x, y) {
      if (this.map.traversableBy(x, y, this)) {
        this.setPosition(x, y);
        return true;
      } else if (this.smashes) {
        this.map.smashAt(x, y, this);
        return false;
      }
    }
  }, {
    key: 'takeDamage',
    value: function takeDamage(amount) {
      if (this.health) ;
      this.health -= amount;
      if (this.health <= 0 && !this.isPlayer) {
        this.die();
      }
    }
  }, {
    key: 'die',
    value: function die() {
      var _this = this;

      if (this.becomes) {
        this.getTiles().forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              x = _ref2[0],
              y = _ref2[1];

          _this.map.setTerrain(x, y, _terrain2.default.create(_this.becomes));
        });
      }
      this.map.removeEntity(this);
      this.map.render();
      if (this.isBoss) {
        return this.map.animationManager.wait().then(function () {
          _this.map.screenManager.open(new _end2.default({ display: _this.map.display }));
        });
      }
    }
  }, {
    key: 'randomWalk',
    value: function randomWalk() {
      var x = this._x;
      var y = this._y;
      var dirs = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].randomize();
      while (dirs.length > 0) {
        var pos = dirs.pop();
        if (this.tryMove.apply(this, _toConsumableArray(pos))) {
          return;
        }
      }
    }
  }, {
    key: 'sleep',
    value: function sleep() {
      if (this.map.player.x - 10 < this.x) {
        this.ai = 'huntAndShoot';
      }
    }
  }, {
    key: 'huntAndShoot',
    value: function huntAndShoot() {
      var player = this.map.player;
      var target = this.canShoot(player);
      if (target) {
        return this.shoot.apply(this, [player].concat(_toConsumableArray(target)));
      } else {
        return this.hunt();
      }
    }
  }, {
    key: 'canShoot',
    value: function canShoot(target) {
      var _this2 = this;

      return target.getTiles().randomize().find(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        var lineOfFire = [];
        _this2.map._terrain.forLine(_this2.x + _this2.tiles.length - 1, _this2.y, x, y, function (terrain, x, y) {
          lineOfFire.push(terrain);
        });
        var inRange = _this2.range >= lineOfFire.length - 2;
        var unobstructed = !lineOfFire.some(function (terrain) {
          return terrain.isCover;
        });
        return inRange && unobstructed;
      });
    }
  }, {
    key: 'hunt',
    value: function hunt() {
      var _this3 = this;

      var player = this.map.player;
      var astar = new ROT.Path.AStar(player.x, player.y, function (x, y) {
        return _this3.map.traversableBy(x, y, _this3);
      }, { topology: 4 });
      var path = [];
      astar.compute(this.x, this.y, function (x, y) {
        path.push([x, y]);
      });
      if (path.length > 1) {
        return this.tryMove.apply(this, _toConsumableArray(path[1]));
      }
    }
  }, {
    key: 'shoot',
    value: function shoot(target) {
      var _this4 = this;

      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : target.x;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : target.y;

      this.map.animationManager.add(this.shootAnimation, 3, this.x + this.tiles.length - 1, this.y, x, y, 5).then(function () {
        target.takeDamage(_this4.attack);
      });
      return this.map.animationManager.wait();
    }
  }, {
    key: 'waitForPlayerAction',
    value: function waitForPlayerAction() {
      this._waitingForAction = true;
      this.map.engine.lock();
      this.map.render();
    }
  }, {
    key: 'x',
    get: function get() {
      return this._x;
    }
  }, {
    key: 'y',
    get: function get() {
      return this._y;
    }
  }, {
    key: 'w',
    get: function get() {
      return this.tiles[0].length;
    }
  }, {
    key: 'h',
    get: function get() {
      return this.tiles.length;
    }
  }], [{
    key: 'create',
    value: function create(name, options) {
      return new Entity(Object.assign({}, options, _entityLibrary2.default[name]));
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LookScreen = function (_Screen) {
  _inherits(LookScreen, _Screen);

  function LookScreen(_ref) {
    var player = _ref.player,
        display = _ref.display,
        action = _ref.action;

    _classCallCheck(this, LookScreen);

    var _this = _possibleConstructorReturn(this, (LookScreen.__proto__ || Object.getPrototypeOf(LookScreen)).call(this));

    _this.player = player;
    _this.cursor = { x: player.x, y: player.y };
    _this.display = display;
    _this.actions = {
      left: function left() {
        this._moveCursor(-1, 0);
      },
      right: function right() {
        this._moveCursor(1, 0);
      },
      up: function up() {
        this._moveCursor(0, -1);
      },
      down: function down() {
        this._moveCursor(0, 1);
      },
      escape: function escape() {
        this.manager.closeCurrent();
      },
      open: function open() {
        this.render();
      },
      close: function close() {
        this.display.overlay.canvas.width += 0;
      },
      space: function space() {
        action.call(this, this.target.x, this.target.y);
        this.manager.closeCurrent();
      }
    };
    return _this;
  }

  _createClass(LookScreen, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.player.map.render(this.display, this.player.x, this.player.y);
      var blocked = false;
      this.target = { x: this.cursor.x, y: this.cursor.y };

      this.player.map._terrain.forLine(this.player.x, this.player.y, this.cursor.x, this.cursor.y, function (_, x, y) {
        if (!blocked) {
          _this2.display.drawTile(x - _this2.player.map.viewportX, y - _this2.player.map.viewportY, _this2.player.map.tileAt(x, y), 'transparent', 'transparent');
          if (_this2.player.map.terrainAt(x, y).isCover && !_this2.player.penetratingBeam) {
            blocked = true;
            _this2.target.x = x;
            _this2.target.y = y;
          }
        }
      });

      this.display.drawTile(this.cursor.x - this.player.map.viewportX, this.cursor.y - this.player.map.viewportY, [this.player.map.tileAt(this.cursor.x, this.cursor.y), 'cursor'], 'transparent', 'transparent');
      this._renderStatus();
      this._renderHelp();
    }
  }, {
    key: '_renderStatus',
    value: function _renderStatus() {
      this.display.status.clear();
      this.display.status.drawText(1, 0, this.player.map.describeAt(this.cursor.x, this.cursor.y));
    }
  }, {
    key: '_renderHelp',
    value: function _renderHelp() {
      this.display.help.clear();
      this.display.help.drawText(1, 0, '[Arrows] Select Target');
      this.display.help.drawText(1, 1, '[Space]  Fire Beam');
      this.display.help.drawText(1, 2, '[Esc]    Cancel');
    }
  }, {
    key: '_moveCursor',
    value: function _moveCursor(dX, dY) {
      var newX = this.cursor.x + dX;
      var newY = this.cursor.y + dY;
      if (newX >= this.player.map.viewportX && newX < this.player.map.viewportX + this.display._options.width) {
        this.cursor.x = newX;
      }
      if (newY >= this.player.map.viewportY && newY < this.player.map.viewportY + this.display._options.height) {
        this.cursor.y = newY;
      }
      this.render();
    }
  }]);

  return LookScreen;
}(_screen2.default);

exports.default = LookScreen;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*jshint global ROT*/


var _map = __webpack_require__(3);

var _map2 = _interopRequireDefault(_map);

var _mapBuilder = __webpack_require__(20);

var _mapBuilder2 = _interopRequireDefault(_mapBuilder);

var _screenManager = __webpack_require__(19);

var _screenManager2 = _interopRequireDefault(_screenManager);

var _animationManager = __webpack_require__(17);

var _animationManager2 = _interopRequireDefault(_animationManager);

var _gameOver = __webpack_require__(23);

var _gameOver2 = _interopRequireDefault(_gameOver);

var _main = __webpack_require__(7);

var _main2 = _interopRequireDefault(_main);

var _title = __webpack_require__(22);

var _title2 = _interopRequireDefault(_title);

var _utils = __webpack_require__(2);

var _preload = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise.all([(0, _preload.loadImage)('assets/i/tiles.png'), (0, _preload.loadTileMap)('assets/data/tilemap.txt', 32, 32), (0, _preload.loadPrefabs)('assets/data/prefabs.txt'), (0, _preload.loadPrefabs)('assets/data/starts.txt'), (0, _preload.loadPrefabs)('assets/data/set-pieces.txt')]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 5),
      tileSet = _ref2[0],
      _ref2$ = _ref2[1],
      tileMap = _ref2$.tileMap,
      tiles = _ref2$.tiles,
      prefabs = _ref2[2],
      starts = _ref2[3],
      setPieces = _ref2[4];

  var displayOptions = {
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
  ROT.Display.prototype.drawTile = function (x, y, char, fg, bg) {
    if (char.map) {
      char = char.map(function (c) {
        return tiles[c];
      });
    } else {
      char = tiles[char];
    }
    display.draw(x, y, char, fg, bg);
  };
  var display = new ROT.Display(displayOptions);
  var mainCanvas = document.querySelector('canvas.main.under');
  var displayNode = display.getContainer();
  displayNode.classList = mainCanvas.classList;
  mainCanvas.parentNode.replaceChild(displayNode, mainCanvas);
  var map = new _map2.default({ width: 200, height: 25, display: display });

  var overlayCanvas = document.querySelector('canvas.main.over');
  display.overlay = overlayCanvas.getContext('2d');
  display.overlay.clear = function () {
    return display.overlay.canvas.width += 0;
  };

  map.animationManager = new _animationManager2.default(display.overlay, map);
  map.animationManager.start();

  var mapBuilder = new _mapBuilder2.default(map);
  var player = mapBuilder.placePlayer(196, 12);
  mapBuilder.placePrefab(setPieces.giantPeach, 172, (0, _utils.randomInt)(1, 4) * 4);
  mapBuilder.placePrefab(setPieces.giantWatermelon, 120, (0, _utils.randomInt)(1, 4) * 4);
  mapBuilder.placePrefab(setPieces.BGDock, 80, 8);
  mapBuilder.placeEntity('betterGigastomp', 84, 12);
  mapBuilder.placePrefab(starts[Object.keys(starts).random()], 180, 0);
  mapBuilder.placePrefabs(prefabs, 0, 0, 175, 25);
  mapBuilder.placeCreatures(32);
  map.render(display, player.x, player.y);

  var status = new ROT.Display({ width: 51, height: 4 });
  display.status = status;
  document.querySelector('.wrapper').insertBefore(display.status.getContainer(), document.querySelector('.wrapper').firstChild);

  var help = new ROT.Display({ width: 51, height: 4 });
  display.help = help;
  document.querySelector('.wrapper').appendChild(display.help.getContainer());

  var screenManager = new _screenManager2.default();
  screenManager.open(new _gameOver2.default({ player: player, display: display }));
  screenManager.open(new _main2.default({ player: player, display: display }));
  screenManager.open(new _title2.default({ display: display }));
  map.screenManager = screenManager;
  map.engine.start();

  window.setInterval(function (_) {
    return screenManager.renderCurrent();
  }, 1000 / 33);

  document.addEventListener('keydown', function (e) {
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

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  gigastomp: {
    tiles: [['monster_0_s_a', 'monster_0_s_b'], ['monster_0_s_c', 'monster_0_s_d']],
    isPlayer: true,
    health: 40,
    maxHealth: 40,
    healthRegenRate: 0.5,
    energy: 20,
    maxEnergy: 20,
    energyRegenRate: 0.5,
    ai: 'waitForPlayerAction',
    description: "It's you. Rarrr",
    stomps: true,
    smashes: true,
    smashDamage: 12,
    swims: true,
    fg: '#FF77A8'
  },
  tanks: {
    tiles: [['tanks_0']],
    ai: 'huntAndShoot',
    description: "Tanks",
    drives: true,
    range: 3,
    shootAnimation: 'shots',
    health: 1,
    attack: 1,
    becomes: 'tankDust',
    stompable: true,
    fg: '#C2C3C7'
  },
  maserTank: {
    tiles: [['maser_tank_0']],
    ai: 'huntAndShoot',
    description: "Experimental MASER Tank",
    drives: true,
    range: 3,
    shootAnimation: 'beam',
    health: 1,
    attack: 2,
    becomes: 'tankDust',
    stompable: true,
    fg: '#C2C3C7'
  },
  betterGigastomp: {
    tiles: [['meka_a', 'meka_b'], ['meka_c', 'meka_d']],
    ai: 'sleep',
    description: "Model BG01 - Codename: Better-Gigastomp",
    stomps: true,
    smashes: true,
    smashDamage: 5,
    shootAnimation: 'beam',
    health: 40,
    range: 4,
    attack: 4,
    becomes: 'scrap',
    isBoss: true,
    fg: '#C2C3C7'
  }
};

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  nullTerrain: {
    tiles: ['null']
  },
  ground: {
    tiles: ['ground'],
    walkable: true,
    stompable: true
  },
  sand: {
    description: 'Sand',
    tiles: ['sand'],
    fg: '#FFEC27',
    walkable: true,
    drivable: true,
    stompable: true
  },
  tankDust: {
    description: 'Tank dust',
    tiles: ['dust'],
    walkable: true,
    drivable: true,
    stompable: true
  },
  road: {
    description: 'A road',
    tiles: ['road'],
    walkable: true,
    drivable: true,
    stompable: true
  },
  water: {
    description: 'Water',
    tiles: ['water'],
    fg: '#29ADFF',
    bg: '#1D2B53',
    walkable: true,
    swimmable: true
  },
  houses: {
    description: 'Houses',
    tiles: ['houses_0', 'houses_1'],
    fg: '#FFCCAA',
    walkable: true,
    stompable: true,
    destroysTo: 'rubble'
  },
  shortBldg: {
    description: 'Buildings',
    tiles: ['short_bldg_0', 'short_bldg_1'],
    fg: '#FFF1E8',
    walkable: true,
    stompable: true,
    destroysTo: 'rubble'
  },
  tallBldg: {
    description: 'Towers',
    tiles: ['tall_bldg_0', 'tall_bldg_1', 'tall_bldg_2', 'tall_bldg_3'],
    fg: '#29ADFF',
    walkable: true,
    isCover: true,
    collapses: true,
    smashable: true,
    destroysTo: 'rubble'
  },
  chemBldg: {
    description: 'Refinery',
    tiles: ['chem_bldg_0', 'chem_bldg_1'],
    fg: '#FFA300',
    walkable: true,
    stompable: true,
    explodes: true,
    explodeDamage: 3,
    destroysTo: 'rubble'
  },
  rubble: {
    description: 'Rubble',
    tiles: ['rubble_0', 'rubble_1', 'rubble_2'],
    walkable: true,
    stompable: true,
    drivable: false,
    explodes: false,
    collapses: false,
    isPowerUp: false,
    isCover: false,
    electrified: false,
    destroysTo: null
  },
  scrap: {
    description: 'Scrap Pile',
    tiles: ['rubble_0', 'rubble_1', 'rubble_2'],
    walkable: true,
    stompable: true,
    drivable: false,
    explodes: false,
    collapses: false,
    isPowerUp: false,
    isCover: false,
    electrified: false,
    destroysTo: null
  },
  debris: {
    description: 'Natural debris',
    tiles: ['debris_0'],
    walkable: true,
    stompable: true,
    drivable: false,
    explodes: false,
    collapses: false,
    isPowerUp: false,
    isCover: false,
    electrified: false,
    destroysTo: null
  },
  coolingTower: {
    description: 'Nuclear plant',
    tiles: ['cooling_tower_0'],
    fg: '#FFEC27',
    walkable: true,
    stompable: true,
    destroysTo: 'rubble'
  },
  powerline: {
    description: 'High-voltage lines',
    tiles: ['powerline_0'],
    fg: '#FFEC27',
    walkable: true,
    stompable: true,
    electrified: true,
    elecDamage: 2,
    destroysTo: 'rubble'
  },
  park: {
    description: 'Trees',
    tiles: ['park_0', 'park_1'],
    fg: '#00E436',
    walkable: true,
    stompable: true,
    destroysTo: 'debris'
  },
  giantMelon: {
    description: 'Giant Melon',
    tiles: ['giant_melon'],
    fg: '#FFA300',
    walkable: true,
    stompable: true,
    isPowerUp: true,
    destroysTo: 'debris'
  },
  giantPeach: {
    description: 'Giant Peach',
    tiles: ['giant_peach'],
    fg: '#FFCCAA',
    walkable: true,
    stompable: true,
    isPowerUp: true,
    destroysTo: 'debris'
  },
  giantWatermelon: {
    description: 'Giant Watermelon',
    tiles: ['giant_watermelon'],
    fg: '#00E436',
    walkable: true,
    stompable: true,
    isPowerUp: true,
    destroysTo: 'debris'
  }
};

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animation = __webpack_require__(18);

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(ctx, map) {
    var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 / 30;

    _classCallCheck(this, _class);

    this.ctx = ctx;
    this.map = map;
    this.canvas = ctx.canvas;
    this.animations = [];
    this.ticks = 0;
    this.fps = fps;
    this.needsCleanup = false;
  }

  _createClass(_class, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.timer = window.setInterval(function () {
        if (_this.animations.length > 0) {
          _this.canvas.width += 0;
        } else if (_this.needsCleanup) {
          _this.needsCleanup = false;
          _this.canvas.width += 0;
        }
        _this.animations.reduceRight(function (_, animation, index) {
          animation.render(_this.ticks);
          if (_this.ticks > animation.endTime) {
            animation.finish();
            _this.animations.splice(index, 1);
            if (_this.animations.length === 0 && _this.allDone) {
              _this.allDone();
              _this.promise = _this.allDone = null;
            }
          }
        }, []);
        _this.ticks++;
      }, this.fps);
    }
  }, {
    key: 'add',
    value: function add(animationName, duration) {
      this.needsCleanup = true;

      for (var _len = arguments.length, options = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        options[_key - 2] = arguments[_key];
      }

      var animation = _animation2.default.create.apply(_animation2.default, [animationName, this.ctx, this.map, this.ticks, duration].concat(options));
      this.animations.push(animation);
      return animation.promise;
    }
  }, {
    key: 'wait',
    value: function wait() {
      var _this2 = this;

      if (this.animations.length === 0) {
        return Promise.resolve();
      } else {
        this.promise = this.promise || new Promise(function (resolve) {
          _this2.allDone = resolve;
        });
        return this.promise;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animationLibrary = __webpack_require__(21);

var _animationLibrary2 = _interopRequireDefault(_animationLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
  function Animation(animation, startTime, duration) {
    var _this = this;

    _classCallCheck(this, Animation);

    this.animation = animation;
    this.startTime = startTime;
    this.endTime = startTime + duration;
    this.promise = new Promise(function (resolve) {
      _this.finish = resolve;
    });
    return this;
  }

  _createClass(Animation, [{
    key: 'render',
    value: function render(t) {
      this.animation.call(this, t - this.startTime);
    }
  }], [{
    key: 'create',
    value: function create(name, ctx, map, startTime, duration) {
      for (var _len = arguments.length, options = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
        options[_key - 5] = arguments[_key];
      }

      var animation = _animationLibrary2.default[name].apply(_animationLibrary2.default, [ctx, map, duration].concat(options));
      return new Animation(animation, startTime, duration);
    }
  }]);

  return Animation;
}();

exports.default = Animation;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenManager = function () {
  function ScreenManager() {
    _classCallCheck(this, ScreenManager);

    this.screenStack = [];
  }

  _createClass(ScreenManager, [{
    key: 'getCurrent',
    value: function getCurrent() {
      if (this.screenStack.length > 0) {
        return this.screenStack.slice(-1)[0];
      } else {
        return new _screen2.default();
      }
    }
  }, {
    key: 'renderCurrent',
    value: function renderCurrent(display) {
      this.getCurrent().render(display);
    }
  }, {
    key: 'updateCurrent',
    value: function updateCurrent(time) {
      this.getCurrent().update(time);
    }
  }, {
    key: 'sendCurrent',
    value: function sendCurrent(eventName) {
      var currentScreen = this.getCurrent();
      if (typeof currentScreen.actions[eventName] === 'function') {
        var _currentScreen$action;

        for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          options[_key - 1] = arguments[_key];
        }

        (_currentScreen$action = currentScreen.actions[eventName]).apply.apply(_currentScreen$action, [currentScreen].concat(options));
      }
    }
  }, {
    key: 'closeCurrent',
    value: function closeCurrent() {
      this.sendCurrent('close');
      this.screenStack.pop();
      this.sendCurrent('switchIn');
    }
  }, {
    key: 'open',
    value: function open(screen) {
      this.sendCurrent('switchOut');
      screen.manager = this;
      this.screenStack.push(screen);
      this.sendCurrent('open');
    }
  }, {
    key: 'insert',
    value: function insert(screen, n) {
      screen.manager = this;
      if (this.screenStack.length <= n) {
        this.sendCurrent('switchOut');
        this.screenStack.push(screen);
        this.sendCurrent('open');
      } else {
        this.screenStack.splice(n, 0, screen);
      }
    }
  }]);

  return ScreenManager;
}();

exports.default = ScreenManager;
;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _terrain = __webpack_require__(1);

var _terrain2 = _interopRequireDefault(_terrain);

var _entity = __webpack_require__(9);

var _entity2 = _interopRequireDefault(_entity);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapBuilder = function () {
  function MapBuilder(map) {
    _classCallCheck(this, MapBuilder);

    this.map = map;
    this.terrain = map._terrain;
    this.terrain.fill(_terrain2.default.create('ground'));
  }

  _createClass(MapBuilder, [{
    key: 'placePlayer',
    value: function placePlayer(x, y) {
      var player = _entity2.default.create('gigastomp', { x: x, y: y });
      this.map.addEntity(player);
      return player;
    }
  }, {
    key: 'placeCreatures',
    value: function placeCreatures(n) {
      for (var i = 0; i < n; i++) {
        var enemyName = ['tanks', 'maserTank'].random();
        var e = _entity2.default.create(enemyName, { x: 0, y: 0 });
        var pos = this.map.getRandomEmptyRoadTile(e.w, e.h);
        e.setPosition(pos.x, pos.y);
        this.map.addEntity(e);
      }
    }
  }, {
    key: 'placeEntity',
    value: function placeEntity(e, x, y) {
      this.map.addEntity(_entity2.default.create(e, { x: x, y: y }));
    }
  }, {
    key: 'placePrefabs',
    value: function placePrefabs(prefabs, x, y, w, h) {
      var step = 4;
      while (y < h) {
        for (var retries = 10; retries > 0; retries--) {
          var p = prefabs[Object.keys(prefabs).random()];
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
  }, {
    key: 'placePrefab',
    value: function placePrefab(prefab, x0, y0) {
      for (var y = 0; y < prefab.height; y++) {
        for (var x = 0; x < prefab.width; x++) {
          this.terrain.set(x + x0, y + y0, _terrain2.default.create(prefab.tiles[y][x]));
        }
      }
    }
  }]);

  return MapBuilder;
}();

exports.default = MapBuilder;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(2);

exports.default = {
  beam: function beam(ctx, map, duration, x0, y0, x1, y1) {
    var width = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 12;
    var color = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'white';

    return function (t) {
      ctx.strokeStyle = color;
      ctx.lineWidth = width * Math.sin(t / duration * Math.PI);
      // ctx.shadowBlur = width/2;
      // ctx.shadowColor = color;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo((x0 - map.viewportX) * 32 + 16, (y0 - map.viewportY) * 32 + 16);
      ctx.lineTo((x1 - map.viewportX) * 32 + 16, (y1 - map.viewportY) * 32 + 16);
      ctx.stroke();
      ctx.closePath();
    };
  },
  explode: function explode(ctx, map, duration, x0, y0) {
    var radius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 48;
    var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'orange';

    return function (t) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc((x0 - map.viewportX) * 32 + 16, (y0 - map.viewportY) * 32 + 16, Math.max(0, radius * Math.sin(t / duration * Math.PI)), 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    };
  },
  shots: function shots(ctx, map, duration, x0, y0, x1, y1) {
    return function (t) {
      ctx.fillStyle = 'white';
      var x = (x0 + (x1 - x0) * t / duration - map.viewportX) * 32 + 16;
      var y = (y0 + (y1 - y0) * t / duration - map.viewportY) * 32 + 16;
      ctx.fillRect(x + 10, y + 10, 3, 3);
      ctx.fillRect(x + 10, y - 10, 3, 3);
      ctx.fillRect(x - 10, y + 10, 3, 3);
      ctx.fillRect(x - 10, y - 10, 3, 3);
    };
  },
  electrocute: function electrocute(ctx, map, duration, entity) {
    return function (t) {
      entity.fgOverride = t % 2 == 0 ? 'yellow' : undefined;
      map.render();
    };
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainScreen = function (_Screen) {
  _inherits(MainScreen, _Screen);

  function MainScreen(_ref) {
    var display = _ref.display;

    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.display = display;
    _this.ctx = _this.display.overlay;
    _this.canvas = _this.ctx.canvas;
    _this.actions = {
      space: function space() {
        this.manager.closeCurrent();
      },
      close: function close() {
        this.display.overlay.clear();
      },
      switchOut: function switchOut() {
        this.display.overlay.clear();
      },
      open: function open() {
        this.render();
      },
      switchIn: function switchIn() {
        this.render();
      }
    };
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'render',
    value: function render() {
      this.display.status.clear();
      this.display.help.clear();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.textAlign = 'center';
      this.ctx.font = '26px monospace';
      this.ctx.fillStyle = '#FF77A8';
      this.ctx.fillText('G I G A S T O M P', 256, 160);
      this.ctx.font = '15px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Press [Space] to Start', 256, 300);
    }
  }]);

  return MainScreen;
}(_screen2.default);

exports.default = MainScreen;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOverScreen = function (_Screen) {
  _inherits(GameOverScreen, _Screen);

  function GameOverScreen(_ref) {
    var player = _ref.player,
        display = _ref.display;

    _classCallCheck(this, GameOverScreen);

    var _this = _possibleConstructorReturn(this, (GameOverScreen.__proto__ || Object.getPrototypeOf(GameOverScreen)).call(this));

    _this.display = display;
    _this.ctx = _this.display.overlay;
    _this.canvas = _this.ctx.canvas;
    _this.actions = {
      space: function space() {
        window.location.reload(false);
      },
      open: function open() {
        this.render();
      },
      switchIn: function switchIn() {
        this.render();
      }
    };
    return _this;
  }

  _createClass(GameOverScreen, [{
    key: 'render',
    value: function render() {
      this.display.status.clear();
      this.display.help.clear();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.textAlign = 'center';

      this.ctx.font = '26px monospace';
      this.ctx.fillStyle = '#FF77A8';
      this.ctx.fillText('G A M E   O V E R', 256, 180);
      this.ctx.font = '15px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Press [Space] to Restart', 256, 220);
    }
  }]);

  return GameOverScreen;
}(_screen2.default);

exports.default = GameOverScreen;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChooseScreen = function (_Screen) {
  _inherits(ChooseScreen, _Screen);

  function ChooseScreen(_ref) {
    var player = _ref.player,
        display = _ref.display,
        question = _ref.question,
        answers = _ref.answers,
        action = _ref.action;

    _classCallCheck(this, ChooseScreen);

    var _this = _possibleConstructorReturn(this, (ChooseScreen.__proto__ || Object.getPrototypeOf(ChooseScreen)).call(this));

    _this.player = player;
    _this.display = display;
    _this.ctx = _this.display.overlay;
    _this.canvas = _this.ctx.canvas;
    _this.currentAnswer = 0;
    _this.question = question;
    _this.answers = answers;
    _this.selectAction = action;
    _this.actions = {
      up: function up() {
        this.currentAnswer = (this.currentAnswer - 1).mod(this.answers.length);
      },
      down: function down() {
        this.currentAnswer = (this.currentAnswer + 1).mod(this.answers.length);
      },
      space: function space() {
        this.selectAction(this.currentAnswer);
        this.manager.closeCurrent();
      },
      enter: function enter() {
        this.selectAction(this.currentAnswer);
        this.manager.closeCurrent();
      },
      close: function close() {
        this.display.overlay.clear();
      },
      switchOut: function switchOut() {
        this.display.overlay.clear();
      },
      open: function open() {
        this.render();
      },
      switchIn: function switchIn() {
        this.render();
      }
    };
    return _this;
  }

  _createClass(ChooseScreen, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.display.status.clear();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.textAlign = 'center';
      this.ctx.font = '15px monospace';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(this.question, 256, 100);
      this.ctx.textAlign = 'left';
      this.answers.forEach(function (answer, index) {
        var answerLines = answer.split('\n');
        if (answerLines[0]) {
          _this2.ctx.fillText(answerLines[0], 70, 140 + 60 * index);
        }
        if (answerLines[1]) {
          _this2.ctx.fillText(answerLines[1], 70, 140 + 60 * index + 20);
        }

        if (_this2.currentAnswer === index) {
          _this2.ctx.fillText('>', 50, 140 + 60 * index);
        }
      });
      this._renderHelp();
    }
  }, {
    key: '_renderHelp',
    value: function _renderHelp() {
      this.display.help.clear();
      this.display.help.drawText(1, 0, '[Up/Down]  Select');
      this.display.help.drawText(1, 1, '[Space]    Confirm Selection');
    }
  }]);

  return ChooseScreen;
}(_screen2.default);

exports.default = ChooseScreen;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  peachPowers: [{
    name: 'Penetrating Beam',
    description: "Your energy beam cuts through everything.",
    bestow: function bestow(entity) {
      entity.penetratingBeam = true;
    }
  }, {
    name: 'Giga Wave',
    description: 'Unleash a devastating shockwave.',
    bestow: function bestow(entity) {
      entity.gigaWave = true;
    }
  }],
  melonPowers: [{
    name: 'More Power',
    description: 'Energy Boost',
    bestow: function bestow(entity) {
      entity.maxEnergy += 10;
      entity.energy = entity.maxEnergy;
    }
  }, {
    name: 'More Life',
    description: 'Health Boost',
    bestow: function bestow(entity) {
      entity.maxHealth += 20;
      entity.health = entity.maxHealth;
    }
  }]
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screen = __webpack_require__(0);

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndScreen = function (_Screen) {
  _inherits(EndScreen, _Screen);

  function EndScreen(_ref) {
    var display = _ref.display;

    _classCallCheck(this, EndScreen);

    var _this = _possibleConstructorReturn(this, (EndScreen.__proto__ || Object.getPrototypeOf(EndScreen)).call(this));

    _this.display = display;
    _this.ctx = _this.display.overlay;
    _this.canvas = _this.ctx.canvas;
    _this.actions = {
      close: function close() {
        this.display.overlay.clear();
      },
      switchOut: function switchOut() {
        this.display.overlay.clear();
      },
      open: function open() {
        this.render();
      },
      switchIn: function switchIn() {
        this.render();
      }
    };
    return _this;
  }

  _createClass(EndScreen, [{
    key: 'render',
    value: function render() {
      this.display.status.clear();
      this.display.help.clear();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.textAlign = 'center';
      this.ctx.font = '26px monospace';
      this.ctx.fillStyle = '#FF77A8';
      this.ctx.fillText('T O   B E   C O N T I N U E D', 256, 180);
    }
  }]);

  return EndScreen;
}(_screen2.default);

exports.default = EndScreen;

/***/ })
/******/ ]);