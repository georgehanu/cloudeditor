const { fabric } = require("fabric");
const logger = require("../../utils/LoggerUtils");

fabric.util.object.extend(fabric.StaticCanvas.prototype, {
  canvasContainer: "",
  canvasOffsetX: 0,
  canvasOffsetY: 0,
  canvasWorkingWidth: 0,
  canvasWorkingHeight: 0,
  canvasScale: 1,
  translucentOverlayOutside: "rgba(243,244,246,0.6)",
  setCanvasOffsetX: function(offsetX) {
    this.canvasOffsetX = offsetX;
  },
  getCanvasOffsetX: function() {
    return this.canvasOffsetX;
  },
  getCanvasOffsetY: function() {
    return this.canvasOffsetY;
  },
  setCanvasOffsetY: function(offsetY) {
    this.canvasOffsetY = offsetY;
  },
  setCanvasWorkingWidth: function(workingWidth) {
    this.canvasWorkingWidth = workingWidth;
  },
  getCanvasWorkingWidth: function() {
    return this.canvasWorkingWidth;
  },
  getCanvasWorkingHeight: function() {
    return this.canvasWorkingHeight;
  },
  setCanvasWorkingHeight: function(workingHeight) {
    this.canvasWorkingHeight = workingHeight;
  },
  _renderOverlay: function(ctx) {
    this.fire("before:overlay:render", {
      ctx: ctx,
      canvas: this
    });
  }
});
module.exports = { fabric };
