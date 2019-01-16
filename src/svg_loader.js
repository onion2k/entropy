import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");
const loadAsset = require("load-asset");

tooloud.Perlin.setSeed("onion");

const settings = {
  dimensions: [800, 800],
  pixelated: true,
  animate: false,
  fps: 60
};

canvasSketch(async ({ update }) => {
  const image = await loadAsset({ url: "assets/wine.svg", type: "image" });

  return ({ context, width, height, time }) => {
    let pixelCanvas = document.createElement("canvas");
    pixelCanvas.style.imageRendering = "pixelated";

    let h = 50;
    let v = Math.floor(h * (height / width));

    pixelCanvas.width = h;
    pixelCanvas.height = v;

    const pixelCanvasContext = pixelCanvas.getContext("2d");
    pixelCanvasContext.imageSmoothingEnabled = false;
    pixelCanvasContext.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      pixelCanvas.width,
      pixelCanvas.height
    );

    try {
      context.imageSmoothingEnabled = false;
      context.drawImage(
        pixelCanvas,
        0,
        0,
        pixelCanvas.width,
        pixelCanvas.height,
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
