import Screen from './screen';

export default class ScreenManager {
  constructor() {
    this.screenStack = [];
  }
  getCurrent() {
    if (this.screenStack.length > 0) {
      return this.screenStack.slice(-1)[0];
    } else {
      return new Screen();
    }
  }
  renderCurrent(display) {
    this.getCurrent().render(display);
  }
  updateCurrent(time) {
    this.getCurrent().update(time);
  }
  sendCurrent(eventName, ...options) {
    var currentScreen = this.getCurrent();
    if (typeof currentScreen.actions[eventName] === 'function') {
      currentScreen.actions[eventName].apply(currentScreen, ...options);
    }
  }
  closeCurrent() {
    this.sendCurrent('close');
    this.screenStack.pop();
    this.sendCurrent('switchIn');
  }
  open(screen) {
    this.sendCurrent('switchOut');
    screen.manager = this;
    this.screenStack.push(screen);
    this.sendCurrent('open');
  }
  insert(screen, n) {
    screen.manager = this;
    if (this.screenStack.length <= n) {
      this.sendCurrent('switchOut');
      this.screenStack.push(screen);
      this.sendCurrent('open');
    } else {
      this.screenStack.splice(n, 0, screen);
    }
  }
};