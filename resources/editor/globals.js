export var canvas = null;
export var loadedFonts = [];
export function setCanvas(fabricCanvas) {
  canvas = fabricCanvas;
}
export function pushLoadedFont(font) {
  if (loadedFonts.indexOf(font) == -1) {
    loadedFonts.push(font);
  }
}
export function isLoadedFont(font) {
  if (loadedFonts.indexOf(font) == -1) {
    return false;
  }
  return true;
}

export function getCanvas() {
  return canvas;
}
