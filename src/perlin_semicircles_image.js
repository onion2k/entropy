import canvasSketch from "../../canvas-sketch/dist/canvas-sketch.umd";
const math = require("canvas-sketch-util/math");
const tooloud = require("../node_modules/tooloud/dist/tooloud.min.js");

tooloud.Perlin.setSeed("onion");

const settings = {};

const sketch = ({ update }) => {
  if (!settings.image) {
    return;
  }

  const src = document.createElement("canvas");
  const h = 250;
  const noiseScale = 4;

  update({
    dimensions: "a4",
    pixelsPerInch: 600,
    units: "px"
  });

  return ({ context, width, height }) => {
    let v = Math.floor(h * (height / width));

    src.width = h;
    src.height = v;

    // This should scale and crop to the correct center portion in x or y
    const srcContext = src.getContext("2d");
    srcContext.drawImage(
      settings.image,
      0,
      0,
      settings.image.width,
      settings.image.height,
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
          (noiseScale * (1 + _x)) / h,
          (noiseScale * (1 + _y)) / v,
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
        rx * 0.5,
        n * Math.PI,
        n * Math.PI + Math.PI,
        false
      );
      context.fill();

      context.fillStyle = `rgb(${255 * n},${255 * n},${255 * n})`;
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5,
        _y * ry + ry * 0.5,
        rx * 0.5,
        n * Math.PI,
        n * Math.PI + Math.PI,
        true
      );
      context.fill();
    }
  };
};

let sketchManager = canvasSketch(sketch);

document.querySelector("body").addEventListener("dragover", e => {
  e.preventDefault();
});

document.querySelector("body").addEventListener("drop", e => {
  e.preventDefault();
  if (e.dataTransfer.files) {
    if (e.dataTransfer.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.dataTransfer.files[0]);
      reader.onloadend = function() {
        let img = document.createElement("img");
        img.src = reader.result;
        settings.image = img;
        sketchManager.then(s => {
          s.loadAndRun(sketch, settings);
        });
      };
    }
  }
});
