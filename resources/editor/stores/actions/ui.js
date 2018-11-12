const {
  ADD_IMAGE_TO_GALLERY,
  REMOVE_IMAGE_FROM_GALLERY,
  ADD_PDF_TO_GALLERY,
  REMOVE_PDF_FROM_GALLERY
} = require("../actionTypes/ui");

const { createActions } = require("redux-actions");

const {
  addImageToGallery,
  removeImageFromGallery,
  addPdfToGallery,
  removePdfFromGallery
} = createActions(
  ADD_IMAGE_TO_GALLERY,
  REMOVE_IMAGE_FROM_GALLERY,
  ADD_PDF_TO_GALLERY,
  REMOVE_PDF_FROM_GALLERY
);

module.exports = {
  addImageToGallery,
  removeImageFromGallery,
  addPdfToGallery,
  removePdfFromGallery
};
