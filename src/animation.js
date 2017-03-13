import AnimationLibrary from './animation-library';

class Animation {
  constructor(animation, startTime, duration) {
    this.animation = animation;
    this.startTime = startTime;
    this.endTime = startTime + duration;
    this.promise = new Promise((resolve) => {
      this.finish = resolve;
    });
    return this;
  }
  render(t) {
    this.animation.call(this, t - this.startTime)
  }
  static create(name, ctx, map, startTime, duration, ...options) {
    let animation = AnimationLibrary[name](ctx, map, duration, ...options);
    return new Animation(animation, startTime, duration);
  }
}

export default Animation;