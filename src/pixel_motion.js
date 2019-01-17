import canvasSketch from "canvas-sketch";
import sketchImage from "./lib/sketchImage";

const settings = {
  dimensions: [800, 800],
  pixelated: true,
  animate: true,
  fps: 60
};

canvasSketch(async ({ update }) => {
  const image = await new sketchImage("assets/wine.svg");
  let x = 50;
  let y = 50;
  let i = x * y;
  image.scale(x, y, true);
  const pixels = image.data;

  return ({ context, width, height, time }) => {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    for (let counter = 0; counter < i; counter++) {
      const _x = counter % x;
      const _y = Math.floor(counter / y);
      const n = pixels.data[3 + counter * 4] / 255;

      context.fillStyle = `hsl(0,100%,${50 * Math.floor(n)}%)`;

      const pX = _x * (width / x) + x * 0.5 + (Math.cos(x + time) * 20.0 - 10);
      const pY = _y * (height / y) + y * 0.5 + (Math.cos(y + time) * 20.0 - 10);

      context.beginPath();
      context.arc(pX, pY, 5, 0, Math.PI * 2, true);
      context.fill();
    }
  };
}, settings);
