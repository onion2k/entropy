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

    let noiseScale = 3;
    let vScale = 4;
    let h = 200;
    let v = Math.floor(h * (height / width));
    let lineWidth = 0.5;
    let overdraw = 180;

    let rx = width / h;
    let ry = height / v;

    const i = (h + overdraw / 2) * (v + overdraw / 2);
    context.lineWidth = lineWidth;
    context.strokeStyle = `rgb(64,64,64)`;
    context.beginPath();

    for (let x = 0; x < i; x++) {
      let _x = x % (h + overdraw / 2);
      let _y = Math.floor(x / (h + overdraw / 2));

      if (_x === 0) {
        context.stroke();
        context.beginPath();
      }

      const n = math.clamp01(
        tooloud.Perlin.noise(
          (noiseScale * (1 + _x)) / h,
          (noiseScale * (1 + _y)) / v,
          0
        ) + 0.4,
        0,
        1
      );

      const angle = n * (Math.PI * 2);

      if (x === 1) {
        console.log(
          (-1 * overdraw) / 2 + _x * rx + rx * 0.5 + Math.sin(angle) * vScale
        );
      }

      context.lineTo(
        (-1 * overdraw) / 2 + _x * rx + rx * 0.5 + Math.sin(angle) * vScale,
        (-1 * overdraw) / 2 + _y * ry + ry * 0.5 + Math.cos(angle) * vScale
      );
    }

    context.stroke();
  };
};

let sketchManager = canvasSketch(sketch, settings);

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
