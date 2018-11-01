const { connect } = require("react-redux");
const {
  createSelectorWithDependencies: createSelector,
  registerSelectors
} = require("reselect-tools");

const { rendererTypeSelector } = require("../../stores/selectors/renderer");
const {
  activePageSelector,
  activeSelectionSelector,
  selectedObjectSelector
} = require("../../stores/selectors/project");
const { addObjectIdToSelected } = require("../../stores/actions/project");

const {
  removeSelection,
  updateObjectProps
} = require("../../stores/actions/project");
const {
  updateSelectionObjectsCoords
} = require("../../stores/actions/project");

module.exports = renderType => {
  const components = require("./" + renderType + "/index");

  const renderTypeSelector = createSelector(
    [rendererTypeSelector],
    rendererType => {
      return { rendererType };
    }
  );

  const mapStateToProps = state => {
    return {
      type: renderTypeSelector(state),
      activePage: activePageSelector(state),
      activeObjects: selectedObjectSelector(state),
      activeSelection: activeSelectionSelector(state)
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      addObjectToSelectedHandler: id => dispatch(addObjectIdToSelected(id)),
      removeSelection: args => dispatch(removeSelection(args)),
      updateObjectProps: args => dispatch(updateObjectProps(args)),
      updateSelectionObjectsCoordsHandler: props =>
        dispatch(updateSelectionObjectsCoords(props))
    };
  };

  registerSelectors({
    renderTypeSelector,
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
