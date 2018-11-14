const { shape, number } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const imageTypes = shape(
  merge(objectTypes, {
    type: "image",
    fitMethod: "cover",
    cropX: number,
    cropY: number,
    cropW: number,
    cropH: number,
    ratio: number,
    brightness: number,
    contrast: number,
    leftSlider: number,
    imageWidth: number,
    imageHeight: number
  })
);

const imageDefaults = merge(objectDefaults, {
  type: "image",
  fitMethod: "cover",
  cropX: 0,
  cropY: 0,
  cropW: 0,
  cropH: 0,
  ratio: 0,
  brightness: 0,
  contrast: 0,
  leftSlider: 0,
  imageWidth: 0,
  imageHeight: 0
});

module.exports = { imageTypes, imageDefaults };
