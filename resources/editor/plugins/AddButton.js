const React = require("react");
const { connect } = require("react-redux");
const assign = require("object-assign");
const { addObjectToPage } = require("../stores/actions/project");
const { changeTheme } = require("../stores/actions/theme");
const ProjectUtils = require("../utils/ProjectUtils");

const emptyImage = () =>
  ProjectUtils.getEmptyObject({
    type: "image",
    width: Math.random() * 500,
    height: Math.random() * 500,
    left: Math.random() * 500,
    top: Math.random() * 500
  });
const emptyText = () =>
  ProjectUtils.getEmptyObject({
    type: "textbox",
    left: Math.random() * 500,
    top: Math.random() * 500,
    fontSize: 15,
    width: 200,
    height: 400,
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
  });

class AddButton extends React.Component {
  render() {
    const { activePage: pageId } = this.props;
    return (
      <div>
        <div>Current Theme = {this.props.theme}</div>
        <button
          onClick={() =>
            this.props.addObjectToPageHandler(emptyImage(), pageId)
          }
        >
          Add Image
        </button>
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

const AddButtonPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddButton);

module.exports = {
  AddButton: assign(AddButtonPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 1,
      priority: 1
    }
  }),
  reducers: { addButton: require("../stores/reducers/addButton") },
  epics: require("../stores/epics/addButton")
};
