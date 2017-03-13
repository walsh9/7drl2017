import { animate } from './utils.js';

export default {
  beam(ctx, map, duration, x0, y0, x1, y1, width=12, color='white') {
    return t => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width * Math.sin(t/duration * Math.PI);
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
  explode(ctx, map, duration, x0, y0, radius = 48, color='orange') {
    return t => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        (x0 - map.viewportX) * 32 + 16, 
        (y0 - map.viewportY) * 32 + 16, 
        Math.max(0, radius * Math.sin(t/duration * Math.PI)),
        0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    };
  },
  shots(ctx, map, duration, x0, y0, x1, y1) {
    return t => {
      ctx.fillStyle = 'white';
      let x = (((x0 + (x1-x0) * t/duration) - map.viewportX) * 32 + 16);
      let y = (((y0 + (y1-y0) * t/duration) - map.viewportY) * 32 + 16);
      ctx.fillRect(x + 10, y + 10, 3, 3);
      ctx.fillRect(x + 10, y - 10, 3, 3);
      ctx.fillRect(x - 10, y + 10, 3, 3);
      ctx.fillRect(x - 10, y - 10, 3, 3);
   };
  },
  electrocute(ctx, map, duration, entity) {
    return t => {
      entity.fgOverride = t % 2 == 0 ? 'yellow' : undefined;
      map.render();
    }
  }
}