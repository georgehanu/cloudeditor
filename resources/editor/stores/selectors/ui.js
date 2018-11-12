const uploadedImagesSelector = state =>
  (state && state.ui && state.ui.uploadedImages) || [];

const uploadedPdfsSelector = state =>
  (state && state.ui && state.ui.uploadedPdfs) || [];

module.exports = {
  uploadedImagesSelector,
  uploadedPdfsSelector
};
