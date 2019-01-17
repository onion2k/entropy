import canvasSketch from "canvas-sketch";
import sketchImage from "./sketchImage";

const settings = {
  dimensions: [800, 800],
  pixelated: true,
  animate: false,
  fps: 60
};

canvasSketch(async ({ update }) => {
  const image = await new sketchImage("assets/wine.svg");

  return ({ context, width, height, time }) => {
    image.scale(50, 50, true);

    try {
      context.imageSmoothingEnabled = false;
      context.drawImage(
        image.img,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        width,
        height
      );
    } catch (e) {
      console.log(e);
    }
  };
}, settings);
