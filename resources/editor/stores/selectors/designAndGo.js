const dagLoadingSelector = state =>
  (state && state.designAndGo && state.designAndGo.loading) || false;

const dagErrorMessageSelector = state =>
  (state && state.designAndGo && state.designAndGo.errorMessage) || null;

const dagImagePathSelector = state =>
  (state && state.designAndGo && state.designAndGo.imagePath) || null;

const dagSliderDataSelector = state =>
  (state && state.designAndGo && state.designAndGo.sliderData) || [];

const dagActiveSliderSelector = state =>
  (state && state.designAndGo && state.designAndGo.activeSlider) || 0;

const dagShowUploadImageSelector = state =>
  (state &&
    state.designAndGo &&
    state.designAndGo.sliderData[state.designAndGo.activeSlider].upload) ||
  false;

const dagColorsSelector = state =>
  (state &&
    state.designAndGo &&
    state.designAndGo.sliderData[state.designAndGo.activeSlider].colors) ||
  false;

const dagActiveColorButtonSelector = state =>
  (state &&
    state.designAndGo &&
    state.designAndGo.sliderData[state.designAndGo.activeSlider]
      .activeColorButton) ||
  0;

module.exports = {
  dagLoadingSelector,
  dagErrorMessageSelector,
  dagImagePathSelector,
  dagSliderDataSelector,
  dagActiveSliderSelector,
  dagShowUploadImageSelector,
  dagColorsSelector,
  dagActiveColorButtonSelector
};
