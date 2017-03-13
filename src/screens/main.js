import Screen from '../screen';
import LookScreen from './look';
import Terrain from '../terrain';
import { getNeighbors, getCardinalNeighbors } from '../utils';

export default class MainScreen extends Screen {
  constructor({player, display}) {
    super();
    this.player = player;
    this.display = display;
    this.actions = {
      left() {
        if (!this.player._waitingForAction) { return; }
        this._movePlayer(-1, 0);
        this._endTurn();
      },
      right() {
        if (!this.player._waitingForAction) { return; }
        this._movePlayer(1, 0);
        this._endTurn();
      },
      up() {
        if (!this.player._waitingForAction) { return; }
          this._movePlayer(0, -1);
          this._endTurn();
      },
      down() {
        if (!this.player._waitingForAction) { return; }
        this._movePlayer(0, 1);
        this._endTurn();
      },
      space() {
        if (!this.player._waitingForAction) { return; }
        this._movePlayer(0, 0);
        this._endTurn();
      },
      f() {
        if (player.energy < 5) { return; }
        if (!this.player._waitingForAction) { return; }
        let self = this;
        let action = function(x1, y1) {
          this.player._waitingForAction = false;
          this.player.map.animationManager.add('beam', 15, this.player.x, this.player.y, x1, y1).then(() => {
            this.player.map.display.overlay.clear();
            this.player.energy -= (6);
            if (this.player.penetratingBeam) {
              this.player.map._terrain.forLine(this.player.x, this.player.y, x1, y1, (_, x, y) => {
                let targetEntity = this.player.map.entityAt(x, y);
                if (targetEntity && targetEntity !== this.player) {
                  targetEntity.takeDamage(6);
                }
                this.player.map.destroyTerrainAt(x, y, this.player);
              });
            } else {
              let targetEntity = this.player.map.entityAt(x1, y1);
              if (targetEntity) {
                targetEntity.takeDamage(5);
              }
              this.player.map.destroyTerrainAt(x1, y1, this.player);
            }
          });
          this.player.map.animationManager.wait().then(() => {
            this.player._waitingForAction = true;
            self._endTurn();
          });
        };
        this.manager.open(new LookScreen({player: this.player, display: this.display, action}));
      },
      g() {
        if (!this.player.gigaWave || this.player.energy < 10) { return; }
        if (!this.player._waitingForAction) { return; }
        this.player._waitingForAction = false;
        this.player.energy -= 10
        this.player.map.animationManager.add('explode', 18, this.player.x + 0.5, this.player.y + 0.5, 160, 'white').then(() => {
          let tiles = this.player.getTiles();
          tiles.slice(0).forEach(([x0, y0]) => {
            getNeighbors(x0, y0).forEach(({x, y}) => {
              if (!tiles.some(([x1, y1]) => x1 === x && y1 === y)) {
                tiles.push([x, y]);
              }
            })
          });
          tiles.slice(0).forEach(([x0, y0]) => {
            getCardinalNeighbors(x0, y0).forEach(({x, y}) => {
              if (!tiles.some(([x1, y1]) => x1 === x && y1 === y)) {
                tiles.push([x, y]);
              }
            })
          });
          tiles.slice(0).forEach(([x0, y0]) => {
            getCardinalNeighbors(x0, y0).forEach(({x, y}) => {
              if (!tiles.some(([x1, y1]) => x1 === x && y1 === y)) {
                tiles.push([x, y]);
              }
            })
          });
          tiles.slice(0).forEach(([x0, y0]) => {
            getCardinalNeighbors(x0, y0).forEach(({x, y}) => {
              if (!tiles.some(([x1, y1]) => x1 === x && y1 === y)) {
                tiles.push([x, y]);
              }
            })
          });
          tiles.forEach(([x, y]) => {
            let targetEntity = this.player.map.entityAt(x, y);
            if (targetEntity && targetEntity !== this.player) {
              targetEntity.takeDamage(8);
            }
            this.player.map.destroyTerrainAt(x, y, this.player);
          });
          this.player._waitingForAction = true;
          this._endTurn()
        });
      },
      open() {
        this.render();
      },
      switchIn() {
        this.render();
      }
    };
  }
  render() {
    this.player.map.render(this.display, this.player.x, this.player.y);
    this._renderStatus();
    this._renderHelp();
  }
  _renderStatus() {
    let p = this.player;
    this.display.status.clear();
    this.display.status.drawText(1,0, `HEALTH: ${Math.ceil(p.health)}/${p.maxHealth}`);
    this.display.status.drawText(1,1, `ENERGY: ${Math.floor(p.energy)}/${p.maxEnergy}`);    
  }
  _renderHelp() {
    this.display.help.clear();
    this.display.help.drawText(1,0, `[Arrows] Stomp around`);
    this.display.help.drawText(1,1, `[Space]  Wait a turn`);
    this.display.help.drawText(1,2, `[F]      Energy Beam (5)`);
    if (this.player.gigaWave) {
      this.display.help.drawText(30, 0, `[G] Giga Wave (10)`);
    }
  }
  _movePlayer(dX, dY) {
    let newX = this.player.x + dX;
    let newY = this.player.y + dY;
    // Try to move to the new cell
    this.player.tryMove(newX, newY, this.player.map);
    this._endTurn()
  }
  _endTurn() {
    //this.player._waitingForAction = false;
    if (this.player._waitingForAction) {
      this.player._waitingForAction = false;
      this.player.map.animationManager.wait().then(() => {
        if (this.player.health <= 0) {
          this.manager.closeCurrent();
        } else {
          this.player.map.engine.unlock();
          this.render();
        }
      });
    };
  }
}