const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  units: "mm"
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f5f2e4";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "black";
    context.beginPath();
    context.arc(
      width * 0.5,
      height * 0.5,
      width * 0.25,
      height * 0.25,
      0,
      Math.PI * 2,
      false
    );
    context.stroke();
  };
};

canvasSketch(sketch, settings);
