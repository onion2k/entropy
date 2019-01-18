import canvasSketch from "canvas-sketch";
import sketchImage from "./lib/sketchImage";

const settings = {
  dimensions: [800, 800],
  pixelated: true,
  animate: true,
  fps: 60
};

function inout(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

canvasSketch(async ({ update }) => {
  const image = await new sketchImage("assets/wine.svg");
  let x = 50;
  let y = 50;
  let i = x * y;
  image.scale(x, y, true);
  const pixels = image.data;

  return ({ context, width, height, time, frame }) => {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    for (let counter = 0; counter < i; counter++) {
      const _x = counter % x;
      const _y = Math.floor(counter / y);
      const n = pixels.data[3 + counter * 4] / 255;

      context.fillStyle = `hsl(0,100%,${50 * Math.floor(n)}%)`;

      // console.log(time, time / x);

      const pX = _x * (width / (x + 0.5)) + x * 0.25;
      const pY = _y * (height / (y + 0.5)) + y * 0.25;

      context.beginPath();
      context.arc(
        pX,
        pY,
        5 +
          Math.sin(frame / 18 + _x * 0.1) * 2 +
          Math.cos(frame / 18 + _y * 0.1) * 2,
        0,
        Math.PI * 2,
        true
      );
      context.fill();
    }
  };
}, settings);
