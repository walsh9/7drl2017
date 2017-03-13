import Screen from '../screen';

export default class ChooseScreen extends Screen {
  constructor({player, display, question, answers, action}) {
    super();
    this.player = player;
    this.display = display;
    this.ctx = this.display.overlay;
    this.canvas = this.ctx.canvas;
    this.currentAnswer = 0;
    this.question = question;
    this.answers = answers;
    this.selectAction = action;
    this.actions = {
      up() {
        this.currentAnswer = (this.currentAnswer - 1).mod(this.answers.length);
      },
      down() {
        this.currentAnswer = (this.currentAnswer + 1).mod(this.answers.length);
      },
      space() {
        this.selectAction(this.currentAnswer);
        this.manager.closeCurrent();
      },
      enter() {
        this.selectAction(this.currentAnswer);
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
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.textAlign = 'center';
    this.ctx.font = '15px monospace';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.question, 256, 100);
    this.ctx.textAlign = 'left';
    this.answers.forEach((answer, index) => {
      let answerLines = answer.split('\n');
      if (answerLines[0]) {this.ctx.fillText(answerLines[0], 70, 140 + 60 * index);}
      if (answerLines[1]) {this.ctx.fillText(answerLines[1], 70, 140 + 60 * index + 20);}

      if (this.currentAnswer === index) {
        this.ctx.fillText('>', 50, 140 + 60 * index);        
      }
    })
    this._renderHelp();
  }
  _renderHelp() {
    this.display.help.clear();
    this.display.help.drawText(1,0, `[Up/Down]  Select`);
    this.display.help.drawText(1,1, `[Space]    Confirm Selection`);
  }
}