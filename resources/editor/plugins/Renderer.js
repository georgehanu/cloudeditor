const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");
const { createSelector } = require("reselect");
const assign = require("object-assign");
const rendererActions = require("../stores/actions/renderer");
const { rendererTypeSelector } = require("../stores/selectors/renderer");
const { activePageIdSelector } = require("../stores/selectors/project");
const { addObjectToPage } = require("../stores/actions/project");
const ProjectUtils = require("../utils/ProjectUtils");

let plugins;
class Renderer extends React.Component {
  render() {
    this.updatePlugins(this.props);
    return (
      <React.Fragment>
        {<plugins.Renderer />}
        <button
          onClick={() =>
            this.props.addObjectToPageHandler(
              ProjectUtils.getEmptyObject({
                type: "image",
                width: Math.random() * 500,
                height: Math.random() * 500,
                left: Math.random() * 500,
                top: Math.random() * 500
              }),
              this.props.pageId
            )
          }
        >
          Add Image
        </button>
        <button
          onClick={() => this.props.changeTypeHandler("html5")}
          style={{ position: "absolute", left: "0px", top: "0px" }}
        >
          ChangeType html5
        </button>
        <button
          onClick={() => this.props.changeTypeHandler("fabricjs")}
          style={{ position: "absolute", left: "0px", top: "25px" }}
        >
          ChangeType fabricjs
        </button>
      </React.Fragment>
    );
  }

  updatePlugins = props => {
    return (plugins = require("./Renderer/index")(props.type));
  };
}

Renderer.propTypes = {
  type: PropTypes.string
};

Renderer.defaultProps = {
  type: "fabricjs"
};

// let's export the plugin and a set of required reducers

const selector = createSelector(
  [rendererTypeSelector, activePageIdSelector],
  (rendererType, pageId) => {
    return {
      type: rendererType,
      pageId
    };
  }
);

const mapDispatchToProps = dispatch => {
  return {
    changeTypeHandler: type =>
      dispatch(rendererActions.changeRendererType(type)),
    addObjectToPageHandler: (object, pageId) =>
      dispatch(addObjectToPage({ object, pageId }))
  };
};

const RendererPlugin = connect(
  selector,
  mapDispatchToProps
)(Renderer);

module.exports = {
  Renderer: assign(RendererPlugin),
  reducers: { renderer: require("../stores/reducers/renderer") }
};
