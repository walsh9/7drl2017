import Screen from '../screen';

export default class MainScreen extends Screen {
  constructor({display}) {
    super();
    this.display = display;
    this.ctx = this.display.overlay;
    this.canvas = this.ctx.canvas;
    this.actions = {
      space() {
        this.manager.closeCurrent();
      },
      close() {
        this.display.overlay.clear();
      },
      switchOut() {
        this.display.overlay.clear();
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
}