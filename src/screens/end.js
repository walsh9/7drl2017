import Screen from '../screen';

export default class EndScreen extends Screen {
  constructor({display}) {
    super();
    this.display = display;
    this.ctx = this.display.overlay;
    this.canvas = this.ctx.canvas;
    this.actions = {
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
    this.ctx.fillText('T O   B E   C O N T I N U E D', 256, 180);
  }
}