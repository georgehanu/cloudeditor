import React from "react";
const assign = require("object-assign");
const { connect } = require("react-redux");
const {
  selectedObjectToolbarSelector
} = require("../stores/selectors/toolbar");

import ToolbarArea from "../components/toolbar/ToolbarItems/ToolbarArea/ToolbarArea";
import SettingsWnd from "../components/toolbar/ToolbarItems/SettingsWnd/SettingsWnd";

//import "../themes/default/toolbar/Toolbar.css"
import "../themes/default/toolbar/styles/editor_icons.css";
import "../themes/default/toolbar/styles/otp.css";
import "../themes/default/toolbar/styles/default.css";

import * as Types from "../components/toolbar/ToolbarConfig/types";
import * as Utils from "../components/toolbar/ToolbarConfig/utils";

import ImageToolbar from "../components/toolbar/ToolbarTypes/image";
import TextToolbar from "../components/toolbar/ToolbarTypes/text";

class Toolbar extends React.Component {
  state = {
    showDetailsWnd: false,
    mainHandler: null,
    detailsWndComponent: null,
    payloadDetailsComponent: null,
    activeToolbar: null
  };

  CallMainHandler = (mainHandler, payload) => {
    if (mainHandler !== undefined) {
      if (payload !== undefined) {
        mainHandler(payload);
      } else {
        mainHandler();
      }
    }
  };

  ToolbarHandler = ToolbarPayload => {
    // intercept the handler from child elements and if necessary send it to the outside
    if (this.state.showDetailsWnd === false) {
      if (
        ToolbarPayload.detailsWndComponent !== undefined &&
        ToolbarPayload.detailsWndComponent !== null
      ) {
        this.setState({
          showDetailsWnd: true,
          mainHandler: ToolbarPayload.mainHandler,
          detailsWndComponent: ToolbarPayload.detailsWndComponent,
          payloadDetailsComponent: ToolbarPayload.payloadDetailsComponent
        });
      } else {
        this.CallMainHandler(
          ToolbarPayload.mainHandler,
          ToolbarPayload.payloadMainHandler
        );
      }
    } else {
      if (
        ToolbarPayload.keepDetailsWnd !== undefined &&
        ToolbarPayload.keepDetailsWnd
      ) {
        // case for slider
        this.CallMainHandler(
          ToolbarPayload.mainHandler,
          ToolbarPayload.payloadMainHandler
        );
      } else {
        if (
          ToolbarPayload.detailsWndComponent === undefined ||
          ToolbarPayload.detailsWndComponent === null
        ) {
          this.setState({
            showDetailsWnd: false,
            detailsWndComponent: null,
            mainHandler: null,
            payloadDetailsComponent: null
          });
          this.CallMainHandler(
            ToolbarPayload.mainHandler,
            ToolbarPayload.payloadMainHandler
          );
        } else {
          if (
            ToolbarPayload.detailsWndComponent ===
            this.state.detailsWndComponent
          ) {
            if (ToolbarPayload.keepDetailsWnd !== undefined) {
              // case for slider
              this.CallMainHandler(
                ToolbarPayload.mainHandler,
                ToolbarPayload.payloadMainHandler
              );
            } else {
              this.setState({
                showDetailsWnd: false,
                detailsWndComponent: null,
                mainHandler: null,
                payloadDetailsComponent: null
              });
            }
          } else {
            this.setState({
              showDetailsWnd: true,
              detailsWndComponent: ToolbarPayload.detailsWndComponent,
              mainHandler: ToolbarPayload.mainHandler,
              payloadDetailsComponent: ToolbarPayload.payloadDetailsComponent
            });
          }
        }
      }
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activeToolbar !== prevState.activeToolbar) {
      return {
        showDetailsWnd: false,
        mainHandler: null,
        detailsWndComponent: null,
        payloadDetailsComponent: null,
        activeToolbar: nextProps.activeToolbar
      };
    }
    return prevState;
  }

  render() {
    console.log("Toolbar");
    console.log(this.props.activeToolbar);
    console.log("Toolbar End");
    let toolbarData = null;
    if (this.props.activeToolbar === null) {
      return null;
    }

    const activeItem = this.props.activeToolbar;
    let attributes = {};
    if (activeItem.type === "image") {
      toolbarData = ImageToolbar;
      attributes = Utils.LoadImageSettings(activeItem);
    } else if (activeItem.type === "text") {
      toolbarData = TextToolbar;
      attributes = Utils.LoadTextSettings(activeItem);
    }
    if (toolbarData === null) return null;

    let containerStyle = { top: activeItem.top, left: activeItem.left };
    const topAreaGroups = Utils.filterBasedOnLocation(
      toolbarData.groups,
      Types.Position.TOP
    );
    const otherAreaGroups = Utils.filterBasedOnLocation(
      toolbarData.groups,
      Types.Position.OTHER
    );
    const bottomAreaGroups = Utils.filterBasedOnLocation(
      toolbarData.groups,
      Types.Position.BOTTOM
    );

    let itemData = {};

    if (
      this.state.showDetailsWnd &&
      this.state.detailsWndComponent !== undefined
    ) {
      if (this.state.detailsWndComponent in attributes) {
        itemData = { ...attributes[this.state.detailsWndComponent] };
      }
    }

    return (
      <div className="ToolbarContainer" style={containerStyle}>
        <div className="Toolbar" style={toolbarData.style}>
          <div className="ToolbarTop ">
            {topAreaGroups.length > 0 && (
              <ToolbarArea
                className="ToolbarAreaTop"
                groups={topAreaGroups}
                ToolbarHandler={this.ToolbarHandler}
              />
            )}
            {otherAreaGroups.length > 0 && (
              <ToolbarArea
                className="ToolbarAreaOther"
                groups={otherAreaGroups}
                ToolbarHandler={this.ToolbarHandler}
              />
            )}
          </div>
          {bottomAreaGroups.length > 0 && (
            <div className="ToolbarBottom">
              <ToolbarArea
                className="ToolbarAreaBottom"
                groups={bottomAreaGroups}
                ToolbarHandler={this.ToolbarHandler}
              />
            </div>
          )}
        </div>
        {this.state.showDetailsWnd && (
          <SettingsWnd
            item={this.state.detailsWndComponent}
            handler={this.state.mainHandler}
            payload={this.state.payloadDetailsComponent}
            ToolbarHandler={this.ToolbarHandler}
            itemData={itemData}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeToolbar: selectedObjectToolbarSelector(state)
  };
};

const ToolbarPlugin = connect(
  mapStateToProps,
  null
)(Toolbar);

//export default Toolbar;
module.exports = {
  Toolbar: assign(ToolbarPlugin),
  reducers: {}
};
