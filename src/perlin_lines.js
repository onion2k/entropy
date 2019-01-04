import canvasSketch from "canvas-sketch";
const math = require("canvas-sketch-util/math");
const tooloud = require("tooloud/dist/tooloud.min");

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
    const lineLength = 0.5;
    context.lineWidth = 0.25;
    context.strokeStyle = `rgb(64,64,64)`;

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
      context.moveTo(
        _x * rx + rx * 0.5 - Math.sin(angle) * lineLength,
        _y * ry + ry * 0.5 - Math.cos(angle) * lineLength
      );

      context.lineTo(
        _x * rx + rx * 0.5 + Math.sin(angle) * lineLength,
        _y * ry + ry * 0.5 + Math.cos(angle) * lineLength
      );
      context.stroke();
    }

    context.fillStyle = `rgb(255,255,255)`;
    context.fillRect(width * 0.5 - 40, height - 2 - 5.5, 80, 7.5);

    context.fillStyle = `rgb(0,0,0)`;
    context.font = "5px Verdana";
    context.textAlign = "center";
    context.fillText("Hello world", width * 0.5, height - 2);
  };
};

canvasSketch(sketch, settings);
