const React = require("react");
const { connect } = require("react-redux");
const { createSelector } = require("reselect");
const assign = require("object-assign");
const { activePageIdSelector } = require("../stores/selectors/project");
const { addObjectToPage } = require("../stores/actions/project");
const ProjectUtils = require("../utils/ProjectUtils");
const Renderer = require("../components/Renderer/Html5/Renderer");

class Html5Renderer extends React.Component {
  render() {
    return (
      <React.Fragment>
        {<Renderer page={this.props.activePage} />}
      </React.Fragment>
    );
  }
}

// let's export the plugin and a set of required reducers

const selector = createSelector([activePageIdSelector], pageId => {
  return {
    pageId
  };
});

const Html5RendererPlugin = connect(selector)(Html5Renderer);

module.exports = {
  Html5Renderer: assign(Html5RendererPlugin),
  reducers: {}
};
