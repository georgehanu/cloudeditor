const permissionsSelector = state =>
  (state && state.renderer && state.renderer.type) || "html5";

module.exports = {
  permissionsSelector
};
