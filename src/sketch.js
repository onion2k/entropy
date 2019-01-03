import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("../node_modules/tooloud/dist/tooloud.min.js");

tooloud.Perlin.setSeed("onion");

const settings = {
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

      let r = Math.floor(255 * n);
      let g = Math.floor(255 * n);
      let b = Math.floor(255 * n);

      //context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillStyle = `rgb(64,64,64)`;
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5,
        _y * ry + ry * 0.5,
        rx * 0.4,
        n * Math.PI,
        n * Math.PI + Math.PI,
        false
      );
      context.fill();

      // context.fillStyle = `rgb(${255 - r},${255 - g},${255 - b})`;
      context.fillStyle = `rgb(192,192,192)`;
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5,
        _y * ry + ry * 0.5,
        rx * 0.4,
        n * Math.PI,
        n * Math.PI + Math.PI,
        true
      );
      context.fill();
    }
  };
};

canvasSketch(sketch, settings);
