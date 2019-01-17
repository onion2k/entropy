const loadAsset = require("load-asset");

export default class sketchImage {
  constructor(url) {
    this.img = null;
    this._img = null;
    this._width = null;
    this._height = null;
    if (url) {
      return (async () => {
        await this.load(url);
        return this;
      })();
    } else {
      return this;
    }
  }
  async load(url) {
    this.img = await loadAsset({ url: url, type: "image" });
    this._img = this.img;
    this._width = this.img.width;
    this._height = this.img.height;
    return this;
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
