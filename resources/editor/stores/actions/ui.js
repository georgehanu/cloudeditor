const {
  ADD_IMAGE_TO_GALLERY,
  REMOVE_IMAGE_FROM_GALLERY,
  ADD_PDF_TO_GALLERY,
  REMOVE_PDF_FROM_GALLERY,
  SET_MOVEABLE,
  SET_RESIZABLE,
  SET_SNAP,
  SET_ROTATE
} = require("../actionTypes/ui");

const { createActions } = require("redux-actions");

const {
  addImageToGallery,
  removeImageFromGallery,
  addPdfToGallery,
  removePdfFromGallery,
  setMoveable,
  setResizable,
  setSnap,
  setRotate
} = createActions(
  ADD_IMAGE_TO_GALLERY,
  REMOVE_IMAGE_FROM_GALLERY,
  ADD_PDF_TO_GALLERY,
  REMOVE_PDF_FROM_GALLERY,
  SET_MOVEABLE,
  SET_RESIZABLE,
  SET_SNAP,
  SET_ROTATE
);

module.exports = {
  addImageToGallery,
  removeImageFromGallery,
  addPdfToGallery,
  removePdfFromGallery,
  setMoveable,
  setResizable,
  setSnap,
  setRotate
};
