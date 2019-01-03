import canvasSketch from "canvas-sketch";
const tooloud = require("../node_modules/tooloud/dist/tooloud.min.js");

tooloud.Perlin.setSeed(Math.floor(Math.random() * 10000));

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  units: "mm"
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f5f2e4";
    context.fillRect(0, 0, width, height);

    let h = 6 * 10;
    let v = 6 * (10 * (height / width));

    let rx = width / h;
    let ry = height / v;

    const i = h * v;

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

      const n = tooloud.Perlin.noise((5 * _x) / h, (5 * _y) / v, 0);

      const r = Math.floor(255 * n);
      const g = Math.floor(255 * n);
      const b = Math.floor(255 * n);

      context.fillStyle = `rgb(${r},${g},${b})`;
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5,
        _y * ry + ry * 0.5,
        rx * 0.5,
        0,
        Math.PI * 2,
        false
      );

      context.fill();
    }
  };
};

canvasSketch(sketch, settings);
