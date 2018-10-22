const { connect } = require("react-redux");
const {
  createSelectorWithDependencies: createSelector,
  registerSelectors
} = require("reselect-tools");

const { rendererTypeSelector } = require("../../stores/selectors/renderer");
const { activePageSelector } = require("../../stores/selectors/project");
const { selectedObjectSelector } = require("../../stores/selectors/project");
const { addObjectIdToSelected } = require("../../stores/actions/project");
const { removeSelection } = require("../../stores/actions/project");

module.exports = renderType => {
  const components = require("./" + renderType + "/index");

  const renderTypeSelector1 = createSelector(
    [rendererTypeSelector],
    rendererType => {
      rendererType;
    }
  );

  const mapStateToProps = state => {
    return {
      type: renderTypeSelector1(state),
      activePage: activePageSelector(state),
      activeObjects: selectedObjectSelector(state)
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      addObjectToSelectedHandler: objectId =>
        dispatch(addObjectIdToSelected(objectId)),
      removeSelection: args => dispatch(removeSelection())
    };
  };

  registerSelectors({
    renderTypeSelector1,
    activePageSelector,
    selectedObjectSelector
  });

  const Renderer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(components.Renderer);

  return {
    Renderer: Renderer
  };
};
