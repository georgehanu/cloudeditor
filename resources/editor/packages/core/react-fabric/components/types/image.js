const { shape, oneOf, string, number, object } = require("prop-types");
const { objectTypes, objectDefaults } = require("./object");
const { merge } = require("ramda");

const imageTypes = shape(
  merge(objectTypes, {
    cacheKey: string,
    cropX: number,
    cropY: number,
    crossOrigin: oneOf(["", "anonymous", "use-credentials"]),
    minimumScaleTrigger: number,
    cropWidth: number,
    cropHeight: number,
    originalWidth: number,
    originalHeight: number,
    resizeTimes: number,
    workingPercent: number,
    leftSlider: number,
    unitResizeX: number,
    unitResizeY: number,
    isEditing: number,
    _lastScaleX: number,
    _lastScaleY: number,
    _savedProps: object,
    editable: number,
    fitMethod: string,
    canvasX: number,
    canvasY: number,
    canvasW: number,
    canvasH: number
  })
);

const imageDefaults = merge(objectDefaults, {
  cacheKey: "",
  cropX: 0,
  cropY: 0,
  type: "image",
  crossOrigin: "",
  minimumScaleTrigger: 0.5,
  cropWidth: 0,
  cropHeight: 0,
  originalWidth: 0,
  originalHeight: 0,
  resizeTimes: 5,
  workingPercent: 1,
  leftSlider: 0,
  unitResizeX: 0,
  unitResizeY: 0,
  isEditing: 0,
  _lastScaleX: 1,
  _lastScaleY: 1,
  _savedProps: {},
  editable: 1,
  fitMethod: "cover",
  canvasX: 0,
  canvasY: 0,
  canvasW: 0,
  canvasH: 0
});

module.exports = { imageTypes, imageDefaults };
