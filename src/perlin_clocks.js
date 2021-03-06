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
  const image = await loadAsset("assets/wine.svg");

  return ({ context, width, height, time }) => {
    let canvas = document.createElement("canvas");
    canvas.style.imageRendering = "pixelated";

    let h = 25;
    let v = Math.floor(h * (height / width));
    let noiseScale = 2;
    const lineLength = (width / h) * 0.5;
    const lineWidth = 3.0;

    const i = h * v;

    canvas.width = h;
    canvas.height = v;
    const canvasContext = canvas.getContext("2d");
    canvasContext.imageSmoothingEnabled = false;
    canvasContext.drawImage(image, 0, 0, image.width, image.height, 0, 0, h, v);

    // Extract bitmap pixel data
    const pixels = canvasContext.getImageData(0, 0, h, v);

    try {
      context.imageSmoothingEnabled = false;
      context.drawImage(canvas, 0, 0, h, v, 0, 0, width, height);
    } catch (e) {
      console.log(e);
    }

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / v);

      const n = pixels.data[Math.floor(_x + _y * v) * 4] / 255;

      context.lineWidth = lineWidth;
      context.strokeStyle = `hsl(0,100%,0%)`;
      context.fillStyle = `hsl(0,0%,${50 * (1 - Math.floor(n))}%)`;

      let pX = _x * h + h * 0.5;
      let pY = _y * v + v * 0.5;

      context.beginPath();
      context.arc(pX, pY, 6, 0, Math.PI * 2, true);
      context.fill();

      // let bX = 2 * Math.PI * n;
      // let bY = 2 * Math.PI * n;

      // let timeRads = time * 60 * 0.0174533 * n;

      // const hX = Math.cos(bX + timeRads / 360) * lineLength * 0.8;
      // const hY = Math.sin(bY + timeRads / 360) * lineLength * 0.8;
      // context.beginPath();
      // context.moveTo(pX, pY);
      // context.lineTo(pX + hX, pY + hY);
      // context.stroke();

      // const mX = Math.cos(bX + timeRads / 60) * lineLength;
      // const mY = Math.sin(bY + timeRads / 60) * lineLength;
      // context.beginPath();
      // context.moveTo(pX, pY);
      // context.lineTo(pX + mX, pY + mY);
      // context.stroke();

      // context.lineWidth = lineWidth * 0.5;
      // context.strokeStyle = `hsl(0,100%,50%)`;
      // context.fillStyle = `hsl(0,100%,50%)`;

      // const sXo = pX - Math.cos(bX + timeRads) * (lineLength * 0.3);
      // const sYo = pY - Math.sin(bX + timeRads) * (lineLength * 0.3);
      // const sX = pX + Math.cos(bX + timeRads) * lineLength;
      // const sY = pY + Math.sin(bY + timeRads) * lineLength;
      // context.beginPath();
      // context.moveTo(sXo, sYo);
      // context.lineTo(sX, sY);
      // context.stroke();
      // context.beginPath();
      // context.arc(sX, sY, 3, 0, Math.PI * 2, true);
      // context.fill();
    }
  };
}, settings);
