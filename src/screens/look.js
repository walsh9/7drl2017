import Screen from '../screen';

export default class LookScreen extends Screen {
  constructor({player, display, action}) {
    super();
    this.player = player;
    this.cursor = {x: player.x, y: player.y};
    this.display = display;
    this.actions = {
      left() {
        this._moveCursor(-1, 0);
      },
      right() {
        this._moveCursor(1, 0);
      },
      up() {
        this._moveCursor(0, -1);
      },
      down() {
        this._moveCursor(0, 1);
      },
      escape() {
        this.manager.closeCurrent();
      },
      open() {
        this.render();
      },
      close() {
        this.display.overlay.canvas.width += 0;
      },
      space() {
        action.call(this, this.target.x, this.target.y);
        this.manager.closeCurrent();
      }
    };
  }
  render() {
    this.player.map.render(this.display, this.player.x, this.player.y);
    let blocked = false;
    this.target = {x: this.cursor.x, y: this.cursor.y}

    this.player.map._terrain.forLine(this.player.x, this.player.y, this.cursor.x, this.cursor.y,
      (_, x, y) => {
      if (!blocked) {
        this.display.drawTile(x - this.player.map.viewportX, 
          y - this.player.map.viewportY, 
          this.player.map.tileAt(x, y), 'transparent', 'transparent');
        if (this.player.map.terrainAt(x, y).isCover && !this.player.penetratingBeam) {
          blocked = true;
          this.target.x = x;
          this.target.y = y;
        }
      }
    });

    this.display.drawTile(this.cursor.x - this.player.map.viewportX, 
      this.cursor.y - this.player.map.viewportY, 
      [this.player.map.tileAt(this.cursor.x, this.cursor.y), 'cursor'], 'transparent', 'transparent');
    this._renderStatus();
    this._renderHelp();
  }
  _renderStatus() {
    this.display.status.clear();
    this.display.status.drawText(1,0, this.player.map.describeAt(this.cursor.x, this.cursor.y));
  }
  _renderHelp() {
    this.display.help.clear();
    this.display.help.drawText(1,0, `[Arrows] Select Target`);
    this.display.help.drawText(1,1, `[Space]  Fire Beam`);
    this.display.help.drawText(1,2, `[Esc]    Cancel`);
  }
  _moveCursor(dX, dY) {
    let newX = this.cursor.x + dX;
    let newY = this.cursor.y + dY;
    if (newX >= this.player.map.viewportX && newX < this.player.map.viewportX  + this.display._options.width) {
      this.cursor.x = newX;
    }
    if (newY >= this.player.map.viewportY && newY < this.player.map.viewportY  + this.display._options.height) {
      this.cursor.y = newY;
    }
    this.render();
  }
}