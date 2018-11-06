const React = require("react");
const { connect } = require("react-redux");
const assign = require("object-assign");
const { addObjectToPage } = require("../stores/actions/project");
const ProjectUtils = require("../utils/ProjectUtils");

const emptyText = () =>
  ProjectUtils.getEmptyObject({
    type: "text",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500
  });

class AddText extends React.Component {
  render() {
    const { activePage: pageId } = this.props;
    return (
      <div>
        <button
          onClick={() => this.props.addObjectToPageHandler(emptyText(), pageId)}
        >
          Add Text
        </button>
      </div>
    );
  }
}

// let's export the plugin and a set of required reducers

const mapStateToProps = state => {
  return {
    title: state.addButton.title,
    theme: state.theme.theme,
    activePage: state.project.activePage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addObjectToPageHandler: (object, pageId) =>
      dispatch(addObjectToPage({ object, pageId }))
  };
};

const AddTextPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddText);

module.exports = {
  AddText: assign(AddTextPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 3,
      priority: 1,
      text: "Add Text",
      icon: "printqicon-newtext",
      showMore: true,
      tooltip: "Tooltip"
    }
  })
};
