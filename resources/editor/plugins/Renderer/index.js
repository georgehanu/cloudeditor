const { connect } = require("react-redux");
const {
  createSelectorWithDependencies: createSelector,
  registerSelectors
} = require("reselect-tools");

const { rendererTypeSelector } = require("../../stores/selectors/renderer");
const { activePageSelector } = require("../../stores/selectors/project");

module.exports = renderType => {
  const components = require("./" + renderType + "/index");

  const renderTypeSelector1 = createSelector(
    [rendererTypeSelector],
    rendererType => {
      return { rendererType };
    }
  );

  const mapStateToProps = state => {
    return {
      type: renderTypeSelector1(state),
      activePage: activePageSelector(state)
    };
  };

  registerSelectors({ renderTypeSelector1, activePageSelector });

  const Renderer = connect(mapStateToProps)(components.Renderer);

  return {
    Renderer: Renderer
  };
};
