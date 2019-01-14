import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

tooloud.Perlin.setSeed("onion");

const settings = {
  dimensions: [800, 800],
  animate: true,
  fps: 60
};

const sketch = () => {
  return ({ context, width, height, time }) => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    let h = 12;
    let v = Math.floor(h * (height / width));

    let nScale = 2;
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

      let timeRads = time * 360 * 0.0174533;

      const hX = Math.cos(bX + timeRads / 360) * lineLength * 0.8;
      const hY = Math.sin(bY + timeRads / 360) * lineLength * 0.8;
      context.beginPath();
      context.moveTo(pX, pY);
      context.lineTo(pX + hX, pY + hY);
      context.stroke();

      const mX = Math.cos(bX + timeRads / 60) * lineLength;
      const mY = Math.sin(bY + timeRads / 60) * lineLength;
      context.beginPath();
      context.moveTo(pX, pY);
      context.lineTo(pX + mX, pY + mY);
      context.stroke();

      context.lineWidth = lineWidth * 0.5;

      const sX = Math.cos(bX + timeRads) * lineLength;
      const sY = Math.sin(bY + timeRads) * lineLength;
      context.beginPath();
      context.moveTo(pX, pY);
      context.lineTo(pX + sX, pY + sY);
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
