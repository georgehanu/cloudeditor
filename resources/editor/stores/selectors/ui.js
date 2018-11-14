const uploadedImagesSelector = state =>
  (state && state.ui && state.ui.uploadedImages) || [];

const uploadedPdfsSelector = state =>
  (state && state.ui && state.ui.uploadedPdfs) || [];

const moveableSelector = state =>
  (state && state.ui && state.ui.moveable) || false;
const resizableSelector = state =>
  (state && state.ui && state.ui.resizable) || false;
const snapSelector = state => (state && state.ui && state.ui.snap) || false;
const rotateSelector = state => (state && state.ui && state.ui.rotate) || false;

module.exports = {
  uploadedImagesSelector,
  uploadedPdfsSelector,
  moveableSelector,
  resizableSelector,
  snapSelector,
  rotateSelector
};
