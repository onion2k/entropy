import canvasSketch from "canvas-sketch";
const loadAsset = require("load-asset");

const settings = {
  dimensions: [800, 800],
  pixelated: true,
  animate: false,
  fps: 60
};

class imageSketch {
  constructor() {
    this.img = null;
    this._img = null;
    this._width = null;
    this._height = null;
  }
  async load(url) {
    this.img = await loadAsset({ url: url, type: "image" });
    this._img = this.img;
    this._width = this.img.width;
    this._height = this.img.height;
  }
  get width() {
    if (this.img === null) return false;
    return this.img.width;
  }
  get height() {
    if (this.img === null) return false;
    return this.img.height;
  }
  scale(x, y, maintainAspectRatio) {
    let pixelCanvas = document.createElement("canvas");

    let _x = x;
    let _y =
      maintainAspectRatio === true
        ? Math.floor(x * (this.height / this.width))
        : y;

    pixelCanvas.width = _x;
    pixelCanvas.height = _y;

    const pixelCanvasContext = pixelCanvas.getContext("2d");
    pixelCanvasContext.imageSmoothingEnabled = false;
    pixelCanvasContext.drawImage(
      this._img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      0,
      pixelCanvas.width,
      pixelCanvas.height
    );

    this.img = pixelCanvas;
  }
}

canvasSketch(async ({ update }) => {
  const image = new imageSketch();
  await image.load("assets/wine.svg");

  return ({ context, width, height, time }) => {
    image.scale(50, 50, true);

    try {
      context.imageSmoothingEnabled = false;
      context.drawImage(
        image.img,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        width,
        height
      );
    } catch (e) {
      console.log(e);
    }
  };
}, settings);
