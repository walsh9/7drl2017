import Animation from './animation';

export default class {
  constructor(ctx, map, fps=1000/30) {
    this.ctx = ctx;
    this.map = map;
    this.canvas = ctx.canvas;
    this.animations = [];
    this.ticks = 0;
    this.fps = fps;
    this.needsCleanup = false;
  }
  start() {
    this.timer = window.setInterval(() => {
      if (this.animations.length > 0) {
        this.canvas.width += 0;
      } else if (this.needsCleanup) {
        this.needsCleanup = false;
        this.canvas.width += 0;
      }
      this.animations.reduceRight((_, animation, index) => {
        animation.render(this.ticks);
        if (this.ticks > animation.endTime) {
          animation.finish();
          this.animations.splice(index, 1);
          if (this.animations.length === 0 && this.allDone) {
            this.allDone();
            this.promise = this.allDone = null;
          }
        }
      }, []);
      this.ticks++;
    }, this.fps);
  }
  add(animationName, duration, ...options) {
    this.needsCleanup = true;
    let animation = Animation.create(animationName, this.ctx, this.map, this.ticks, duration, ...options)
    this.animations.push(animation);
    return animation.promise;
  }
  wait() {
    if (this.animations.length === 0) {
      return Promise.resolve();
    } else {
      this.promise = this.promise || new Promise((resolve) => {
        this.allDone = resolve;
      });
      return this.promise;
    }
  }
}