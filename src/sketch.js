import canvasSketch from "canvas-sketch";
const tooloud = require("../node_modules/tooloud/dist/tooloud.min.js");

tooloud.Perlin.setSeed("womble");

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  units: "mm"
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f5f2e4";
    context.fillRect(0, 0, width, height);

    let nScale = 3;
    let h = 50;
    let v = Math.floor(h * (height / width));

    let rx = width / h;
    let ry = height / v;

    const i = h * v;

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

      const n = tooloud.Perlin.noise(
        (nScale * (1 + _x)) / h,
        (nScale * (1 + _y)) / v,
        0
      );

      let r = Math.floor(255 * n);
      let g = Math.floor(255 * n);
      let b = Math.floor(255 * n);

      context.strokeStyle = `rgb(${r},${g},${b})`;
      context.lineWidth = 3 * Math.abs(n);
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5,
        _y * ry + ry * 0.5,
        rx * 0.5,
        n * Math.PI,
        n * Math.PI + Math.PI,
        false
      );

      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
