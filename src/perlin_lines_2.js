import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

tooloud.Perlin.setSeed("onion");
const colorPerlin = tooloud.Perlin.create("color");

const settings = {
  dimensions: [800, 800],
  animate: true,
  totalFrames: 251,
  fps: 60
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);

    let nScale = 2;
    let h = 80;
    let v = Math.floor(h * (height / width));

    let rx = width / h;
    let ry = height / v;

    let rSpeed = 0.025;

    const i = h * v;
    const lineLength = 50;
    context.lineWidth = 0.8;

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

      const angle = n * Math.PI * 2;

      context.beginPath();
      context.moveTo(_x * rx, _y * ry);

      let hue = 256 * n;
      context.strokeStyle = `hsl(${hue},100%,50%)`;

      context.lineTo(
        _x * rx + Math.sin(angle + frame * rSpeed) * lineLength,
        _y * ry + Math.cos(angle + frame * rSpeed) * lineLength
      );
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
