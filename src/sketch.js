import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: "a4",
  pixelsPerInch: 300,
  units: "mm"
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f5f2e4";
    context.fillRect(0, 0, width, height);

    let h = 10;
    let v = 16;

    let rx = width / h;
    let ry = height / v;

    const i = h * v;

    for (let x = 0; x < i; x++) {
      let _x = x % h;
      let _y = Math.floor(x / h);

      context.strokeStyle = "black";
      context.beginPath();
      context.arc(
        _x * rx + rx * 0.5,
        _y * ry + ry * 0.5,
        rx * 0.75,
        rx * 0.75,
        0,
        Math.PI * 2,
        false
      );

      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
