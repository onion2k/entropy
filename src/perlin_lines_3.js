import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

tooloud.Perlin.setSeed("onion");
const colorPerlin = tooloud.Perlin.create("color");

const settings = {
  dimensions: [800, 800],
  animate: true,
  fps: 60
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    let nScale = 2;
    let rSpeed = 0.025;
    let rSpeed2 = 0.05;
    const lineLength = 16;
    const lineWidth = 2.0;
    let h = 50;
    let v = Math.floor(h * (height / width));

    let rx = width / h;
    let ry = height / v;

    const i = h * v;
    context.lineWidth = lineWidth;

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

      const a = n * Math.PI * 2;
      const sinAngle = Math.sin(a + frame * rSpeed) * lineLength;
      const cosAngle = Math.cos(a + frame * rSpeed) * lineLength;

      // const a2 = n * Math.PI * 2 * 2;
      const sinAngle2 = Math.sin(a + frame * rSpeed2 * n) * lineLength;
      const cosAngle2 = Math.cos(a + frame * rSpeed2 * n) * lineLength;

      context.beginPath();
      context.moveTo(_x * rx, _y * ry);

      let hue = 256 * n;
      context.strokeStyle = `hsl(${hue},100%,50%)`;

      context.lineTo(_x * rx + sinAngle, _y * ry + cosAngle);
      context.lineTo(
        _x * rx + sinAngle + sinAngle2,
        _y * ry + cosAngle + cosAngle2
      );
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
