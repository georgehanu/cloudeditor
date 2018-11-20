const dagLoadingSelector = state =>
  (state && state.designAndGo && state.designAndGo.loading) || false;

const dagErrorMessageSelector = state =>
  (state && state.designAndGo && state.designAndGo.errorMessage) || null;

const dagImagePathSelector = state =>
  (state && state.designAndGo && state.designAndGo.imagePath) || null;

module.exports = {
  dagLoadingSelector,
  dagErrorMessageSelector,
  dagImagePathSelector
};
