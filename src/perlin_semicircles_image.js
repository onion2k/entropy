import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("../node_modules/tooloud/dist/tooloud.min.js");
const load = require("load-asset");
// const img = require("./images/lights.jpg");

tooloud.Perlin.setSeed("onion");

const settings = {
  dimensions: "a4",
  pixelsPerInch: 600,
  units: "px"
};

const sketch = async ({ update }) => {
  const img = await load("assets/lights.jpg");

  let src = document.createElement("canvas");

  update({
    dimensions: [img.width, img.height]
  });

  return ({ context, width, height }) => {
    let nScale = 4;
    let h = 200;
    let v = Math.floor(h * (height / width));

    src.width = Math.floor((width / img.width) * h);
    src.height = Math.floor((height / img.height) * v);
    const srcContext = src.getContext("2d");
    srcContext.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      src.width,
      src.height
    );

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

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

      const srcPixel = srcContext.getImageData(_x, _y, 1, 1).data;

      let r = srcPixel[0];
      let g = srcPixel[1];
      let b = srcPixel[2];

      context.fillStyle = `rgb(${r},${g},${b})`;
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

      context.fillStyle = `rgb(${r * 0.8},${g * 0.8},${b * 0.8})`;
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