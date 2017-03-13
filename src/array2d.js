export default class {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this._array = [];
    this.fill(undefined);
  }
  get(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return undefined;
    }
    return this._array[x + y * this.width];
  }
  set(x, y, val) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
        throw new RangeError('Index out of bounds');
    } else {
        this._array[x + y * this.width] = val;
        return this;
    }
  }
  setArray(array) {
    this._array = array.slice(0);
  }
  forEach(callback, thisArg) {
    for(let i = 0; i < this._array.length; i++) {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      callback.call(thisArg, this._array[i], x, y, this.width, this.height);
    }
    return undefined;
  }
  forRect(x0, y0, w, h, callback, thisArg) {
    let x1 = x0 + w;
    let y1 = y0 + h;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        this.do(x, y, callback, thisArg);
      }
    }
  }
  map(callback, thisArg) {
    let mappedArray = this.clone();
    this.forEach(function (value, x, y, w, h) {
      let newValue = callback.call(thisArg, value, x, y, w, h);
      mappedArray.set(x, y, newValue);
    });
    return mappedArray;
  }
  slice2d(x0, y0, x1, y1) {
    let arraySlice = [];
    x1 = x1 || this.width;
    y1 = y1 || this.height;
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        arraySlice.push(this.get(x, y));
      }
    }
    let sliced = new Array2d(x1 - x0, y1 - y0);
    sliced.setArray(arraySlice);
    return sliced;
  }
  clone() {
    return this.slice2d(0, 0);
  }
  do(x, y, callback, thisArg) {
    callback.call(thisArg, this._array[x + y * this.width], x, y, this.width, this.height);
    return this;
  }
  forLine(x0, y0, x1, y1, callback, thisArg) {
    let deltaX = Math.abs(x1 - x0);
    let deltaY = -Math.abs(y1 - y0);
    let signX = x0 < x1 ? 1 : -1;
    let signY = y0 < y1 ? 1 : -1;
    let err = deltaX + deltaY;
    let e2;
    this.do(x0, y0, callback, thisArg);
    while (!(x0 == x1 && y0 == y1)) {
      e2 = Math.floor(err * 2);
      if (e2 >= deltaY) {
        err += deltaY;
        x0 += signX;
      }
      if (e2 <= deltaX) {
        err += deltaX;
        y0 += signY;
      }
      this.do(x0, y0, callback, thisArg);
    }
  }
  forEllipse(x0, y0, x1, y1, callback, thisArg) {
    // x0 = 2 * x0 - x1;
    // y0 = 2 * y0 - y1;
    y0--;
    y1--;
    let plot4EllipsePoints = function (x, y) {
        this.do(x0 + x, y0 + y,  callback, thisArg);
        this.do(x0 - x, y0 + y,  callback, thisArg);
        this.do(x0 - x, y0 - y,  callback, thisArg);
        this.do(x0 + x, y0 - y,  callback, thisArg);
    };
    let a = Math.abs(x1 - x0);
    let b = Math.abs(y1 - y0);
    let b1 = b % 2;
    let dx = 4 * (1 - a) * b * b;
    let dy = 4 * (b1 + 1) * a * a;
    let err = dx + dy + b1 * a * a;
    let e2;
    if (x0 > x1) {
        x0 = x1;
        x1 += a;
    }
    if (y0 > y1) {
        y0 = y1;
    }
    y0 += Math.round((b + 1) / 2);
    y1 = y0 - b1;
    a = a * 8 * a;
    b1 = 8 * b * b;
    do {
        this.do(x1, y0,  callback, thisArg);
        this.do(x0, y0,  callback, thisArg);
        this.do(x0, y1,  callback, thisArg);
        this.do(x1, y1,  callback, thisArg);
        e2 = 2 * err;
        if (e2 <= dy) {
            y0++;
            y1--;
            err += dy += a;
        }
        if (e2 >= dx || 2 * err > dy) {
            x0++;
            x1--;
            err += dx += b1;
        }
    } while (x0 <= x1);
    while (y0 - y1 < b) {
        this.do(x0 - 1, y0,  callback, thisArg);
        this.do(x1 + 1, y0++,  callback, thisArg);
        this.do(x0 - 1, y1,  callback, thisArg);
        this.do(x1 + 1, y1--,  callback, thisArg);
    }    
  }
  fill(value) {
    let w = this.width;
    let h = this.height;
    for (let i = 0; i < w * h; i++) {
      this._array[i] = value;
    }
    return this;
  }
  toString() {
    let w = this.width;
    let h = this.height;
    let s = "[ \n";
    for (let y = 0; y < h; y++) {
      s = s + "  [" + this._array.slice(y * w, y * w + w)
        .join(",") + "]\n";
    }
    s = s + "]";
    return s;
  }
}