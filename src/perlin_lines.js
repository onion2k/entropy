import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

tooloud.Perlin.setSeed("onion");

const settings = {
  title: "Perlin Lines",
  dimensions: "a4",
  pixelsPerInch: 600,
  units: "mm"
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    let nScale = 4;
    let h = 100;
    let v = Math.floor(h * (height / width));

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

      context.lineWidth = 0.25;
      context.strokeStyle = `rgb(64,64,64)`;
      context.beginPath();

      const angle = n * (Math.PI * 2);

      context.moveTo(
        _x * rx + rx * 0.5 - Math.sin(angle) * 0.75,
        _y * ry + ry * 0.5 - Math.cos(angle) * 0.75
      );
      context.lineTo(
        _x * rx + rx * 0.5 + Math.sin(angle) * 0.75,
        _y * ry + ry * 0.5 + Math.cos(angle) * 0.75
      );
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
