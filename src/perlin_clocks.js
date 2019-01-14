import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

tooloud.Perlin.setSeed("onion");

const settings = {
  dimensions: [800, 800],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    let h = 15;
    let v = Math.floor(h * (height / width));

    let nScale = 2;
    let rSpeed = 1 / (12 * 60 * 60);
    const lineLength = (width / h) * 0.5;
    const lineWidth = 3.0;

    let rx = width / h;
    let ry = height / v;

    const i = h * v;

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

      const n = math.clamp01(
        tooloud.Perlin.noise(
          (nScale * (1 + _x)) / h,
          (nScale * (1 + _y)) / v,
          0
        ) + 0.4,
        0,
        1
      );

      context.lineWidth = lineWidth;
      context.strokeStyle = `hsl(0,100%,0%)`;

      let pX = _x * rx + rx * 0.5;
      let pY = _y * ry + rx * 0.5;

      let bX = 2 * Math.PI * n;
      let bY = 2 * Math.PI * n;

      const hX = Math.cos(bX + frame * rSpeed * 1) * lineLength * 0.8;
      const hY = Math.sin(bY + frame * rSpeed * 1) * lineLength * 0.8;
      context.beginPath();
      context.moveTo(pX, pY);
      context.lineTo(pX + hX, pY + hY);
      context.stroke();

      const mX = Math.cos(bX + frame * rSpeed * 60) * lineLength;
      const mY = Math.sin(bY + frame * rSpeed * 60) * lineLength;
      context.beginPath();
      context.moveTo(pX, pY);
      context.lineTo(pX + mX, pY + mY);
      context.stroke();

      context.lineWidth = lineWidth * 0.5;

      const sX = Math.cos(bX + frame * rSpeed * 360) * lineLength;
      const sY = Math.sin(bY + frame * rSpeed * 360) * lineLength;
      context.beginPath();
      context.moveTo(pX, pY);
      context.lineTo(pX + sX, pY + sY);
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
