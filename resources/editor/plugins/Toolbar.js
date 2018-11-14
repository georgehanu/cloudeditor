import React from "react";
const assign = require("object-assign");
const { connect } = require("react-redux");
const {
  selectedObjectToolbarSelector,
  selectedObjectLayerSelector,
  selectedPageDimmensionsSelector,
  uiPageOffsetSelector
} = require("../stores/selectors/toolbar");

const { setObjectFromToolbar } = require("../stores/actions/toolbar");

const randomColor = require("randomcolor");

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
    mainHandler: false,
    detailsWndComponent: null,
    payloadDetailsComponent: null,
    activeToolbar: null
  };

  CallMainHandler = (mainHandler, payload, props) => {
    if (mainHandler !== undefined && mainHandler) {
      const mainPayload = Utils.CreatePayload(
        this.state.activeToolbar,
        payload
      );
      if (mainPayload !== null) props.setObjectFromToolbar(mainPayload);
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
          ToolbarPayload.payloadMainHandler,
          this.props
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
          ToolbarPayload.payloadMainHandler,
          this.props
        );
      } else {
        if (
          ToolbarPayload.detailsWndComponent === undefined ||
          ToolbarPayload.detailsWndComponent === null
        ) {
          this.setState({
            showDetailsWnd: false,
            detailsWndComponent: null,
            mainHandler: false,
            payloadDetailsComponent: null
          });
          this.CallMainHandler(
            ToolbarPayload.mainHandler,
            ToolbarPayload.payloadMainHandler,
            this.props
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
                ToolbarPayload.payloadMainHandler,
                this.props
              );
            } else {
              this.setState({
                showDetailsWnd: false,
                detailsWndComponent: null,
                mainHandler: false,
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
    if (nextProps.activeToolbar === null || prevState.activeToolbar === null) {
      return {
        showDetailsWnd: false,
        mainHandler: null,
        detailsWndComponent: null,
        payloadDetailsComponent: null,
        activeToolbar: nextProps.activeToolbar
      };
    }
    if (nextProps.activeToolbar.id === prevState.activeToolbar.id) {
      return {
        showDetailsWnd: prevState.showDetailsWnd,
        mainHandler: prevState.mainHandler,
        detailsWndComponent: prevState.detailsWndComponent,
        payloadDetailsComponent: prevState.payloadDetailsComponent,
        activeToolbar: nextProps.activeToolbar
      };
    } else {
      return {
        showDetailsWnd: false,
        mainHandler: null,
        detailsWndComponent: null,
        payloadDetailsComponent: null,
        activeToolbar: nextProps.activeToolbar
      };
    }
  }

  render() {
    console.log("Toolbar");
    console.log(this.props);
    console.log("Toolbar End");
    let toolbarData = null;
    if (this.props.activeToolbar === null) {
      return null;
    }

    const activeItem = this.props.activeToolbar;
    const uiPageOffset = this.props.uiPageOffset;

    let attributes = {};
    if (activeItem.type === "image") {
      toolbarData = Utils.LoadImageSettings(
        ImageToolbar,
        activeItem,
        this.props.activeLayer,
        {
          pageDimmensions: this.props.pageDimmensions,
          uiPageOffset: this.props.uiPageOffset
        }
      );
      attributes = Utils.LoadImageAdditionalInfo(activeItem);
    } else if (activeItem.type === "text" || activeItem.type === "textbox") {
      toolbarData = Utils.LoadTextSettings(
        TextToolbar,
        activeItem,
        this.props.activeLayer
      );
      attributes = Utils.LoadTextAdditionalInfo(activeItem);
    }
    if (toolbarData === null) return null;

    let containerStyle = Utils.calculateToolBarPosition(
      activeItem,
      uiPageOffset
    );
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

    /*const randomStyle = {
      backgroundColor: randomColor()
    };*/

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
    activeToolbar: selectedObjectToolbarSelector(state),
    activeLayer: selectedObjectLayerSelector(state),
    pageDimmensions: selectedPageDimmensionsSelector(state),
    uiPageOffset: uiPageOffsetSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setObjectFromToolbar: payload => dispatch(setObjectFromToolbar(payload))
  };
};

const ToolbarPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

module.exports = {
  Toolbar: assign(ToolbarPlugin),
  epics: require("../stores/epics/toolbar")
};
