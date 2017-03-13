import Screen from '../screen';

export default class GameOverScreen extends Screen {
  constructor({player, display}) {
    super();
    this.display = display;
    this.ctx = this.display.overlay;
    this.canvas = this.ctx.canvas;
    this.actions = {
      space() {
        window.location.reload(false);
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
    this.ctx.fillText('G A M E   O V E R', 256, 180);
    this.ctx.font = '15px monospace';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Press [Space] to Restart', 256, 220);
  }
}