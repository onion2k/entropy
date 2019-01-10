import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

tooloud.Perlin.setSeed("onion");

const settings = {
  title: "Perlin Lines",
  animate: true,
  dimensions: [800, 800],
  fps: 60,
  duration: 5,
  bleed: 25
};

const sketch = () => {
  return props => {
    const {
      context,
      exporting,
      bleed,
      width,
      height,
      trimWidth,
      trimHeight,
      playhead
    } = props;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    let noiseScale = 4;
    let vScale = 20;
    let h = 150;
    let v = Math.floor(h * (height / width));
    let lineWidth = 1.5;
    const t = Math.sin(playhead * Math.PI);

    let rx = width / h;
    let ry = height / v;

    const i = h * v;
    context.lineWidth = lineWidth;
    context.strokeStyle = `rgb(64,64,64)`;
    context.beginPath();

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

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

      context.lineTo(
        _x * rx + rx * 0.5 + Math.sin(angle * t) * vScale,
        _y * ry + ry * 0.5 + Math.cos(angle * t) * vScale
      );
    }

    context.stroke();

    if (!exporting && bleed > 0) {
      context.strokeStyle = "#444";
      context.lineWidth = 2;
      context.strokeRect(bleed, bleed, trimWidth, trimHeight);
    }
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
