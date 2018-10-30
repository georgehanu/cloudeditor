const React = require("react");
const { connect } = require("react-redux");
const { createSelector } = require("reselect");
const assign = require("object-assign");
const Renderer = require("../components/Renderer/Html5");

const { activePageSelector } = require("../stores/selectors/project");

class Html5Renderer extends React.Component {
  render() {
    return (
      <div className="render-container">
        {<Renderer {...this.props.activePage} />}
      </div>
    );
  }
}

// let's export the plugin and a set of required reducers
const mapStateToProps = state => {
  return {
    activePage: activePageSelector(state)
  };
};

const Html5RendererPlugin = connect(mapStateToProps)(Html5Renderer);

module.exports = {
  Html5Renderer: assign(Html5RendererPlugin),
  reducers: {},
  epics: {}
};
