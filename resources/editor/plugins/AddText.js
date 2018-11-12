import { withNamespaces } from "react-i18next";

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

        <div className="AddTextTitle">{this.props.t("Select to add text")}</div>
        <ul className="AddTextList">
          <li className="AddTextListItem AddHeading">
            {this.props.t("Add Heading")}
          </li>
          <li className="AddTextListItem AddMultiline">
            {this.props.t("Add Multiline Text")}
          </li>
          <li className="AddTextListItem AddCircle">
            <span
              className="char1"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(-1px) translateY(25px) rotate(-41deg)"
              }}
            >
              A
            </span>
            <span
              className="char2"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(-2px) translateY(16px) rotate(-33deg)"
              }}
            >
              d
            </span>
            <span
              className="char3"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(-3px) translateY(10px) rotate(-26deg)"
              }}
            >
              d
            </span>
            <span
              className="char4 empty"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(-2px) translateY(6px) rotate(-21deg)"
              }}
            >
              &nbsp;
            </span>
            <span
              className="char5"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(-2px) translateY(4px) rotate(-15deg)"
              }}
            >
              C
            </span>
            <span
              className="char6"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(-1px) translateY(1px) rotate(-10deg)"
              }}
            >
              i
            </span>
            <span
              className="char7"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(0px) translateY(0px) rotate(-5deg)"
              }}
            >
              r
            </span>
            <span
              className="char8"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(0px) translateY(0px) rotate(0deg)"
              }}
            >
              c
            </span>
            <span
              className="char9"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(0px) translateY(0px) rotate(5deg)"
              }}
            >
              l
            </span>
            <span
              className="char10"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(2px) translateY(1px) rotate(10deg)"
              }}
            >
              e
            </span>
            <span
              className="char11 empty"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(2px) translateY(3px) rotate(15deg)"
              }}
            >
              &nbsp;
            </span>
            <span
              className="char12"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(3px) translateY(6px) rotate(20deg)"
              }}
            >
              T
            </span>
            <span
              className="char13"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(3px) translateY(11px) rotate(28deg)"
              }}
            >
              e
            </span>
            <span
              className="char14"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(2px) translateY(18px) rotate(34deg)"
              }}
            >
              x
            </span>
            <span
              className="char15"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(1px) translateY(24px) rotate(40deg)"
              }}
            >
              t
            </span>
            <span
              className="char16 empty"
              style={{
                display: "inline-block",
                transition: "none 0s ease 0s",
                transform: "translateX(0px) translateY(29px) rotate(44deg)"
              }}
            >
              &nbsp;
            </span>
          </li>
        </ul>
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
)(withNamespaces("addText")(AddText));

module.exports = {
  AddText: assign(AddTextPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 4,
      priority: 1,
      text: "Add Text",
      icon: "printqicon-newtext",
      showMore: true,
      tooltip: {
        title: "Add Text Flow",
        description: "Add a new text flow block"
      }
    }
  })
};
