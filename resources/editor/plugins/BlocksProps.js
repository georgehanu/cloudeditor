import React from "react";
import { connect } from "react-redux";
import assign from "object-assign";
import { withNamespaces } from "react-i18next";
import BlockItem from "../components/blocksProps/BlockItem";

const {
  moveableSelector,
  resizableSelector,
  snapSelector,
  rotateSelector
} = require("../stores/selectors/ui");

const {
  setMoveable,
  setResizable,
  setSnap,
  setRotate
} = require("../stores/actions/ui");

const BlocksProps = props => {
  return (
    <div className="Blocks">
      <ul>
        <BlockItem
          class="printqicon-movable"
          tooltip={{
            title: "Enable/Disable",
            description: "Enable/Disable Move Blocks"
          }}
          selected={props.moveableSelector}
          clicked={props.setMoveable}
        />
        <BlockItem
          class="printqicon-rotatable"
          tooltip={{
            title: "Enable/Disable",
            description: "Enable/Disable Resize Blocks"
          }}
          selected={props.resizableSelector}
          clicked={props.setResizable}
        />
        <BlockItem
          class="printqicon-snap"
          tooltip={{
            title: "Enable/Disable",
            description: "Enable/Disable Snap Blocks"
          }}
          selected={props.snapSelector}
          clicked={props.setSnap}
        />
        <BlockItem
          class="printqicon-resizable"
          tooltip={{
            title: "Enable/Disable",
            description: "Enable/Disable Rotate Blocks"
          }}
          selected={props.rotateSelector}
          clicked={props.setRotate}
        />
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    moveableSelector: moveableSelector(state),
    resizableSelector: resizableSelector(state),
    snapSelector: snapSelector(state),
    rotateSelector: rotateSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMoveable: () => dispatch(setMoveable()),
    setResizable: () => dispatch(setResizable()),
    setSnap: () => dispatch(setSnap()),
    setRotate: () => dispatch(setRotate())
  };
};

const BlocksPropsPlugin = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces("blocksProps")(BlocksProps));

module.exports = {
  BlocksProps: assign(BlocksPropsPlugin, {
    disablePluginIf:
      "{store().getState().project.title==='Empty Project!!@!!@!@'}",
    SideBar: {
      position: 6,
      priority: 1,
      text: "Blocks",
      icon: "printqicon-blockoptions",
      showMore: true,
      showPaneBackground: false,
      paneBackgroundClass: "PaneBlocks"
    }
  }),
  reducers: { ui: require("../stores/reducers/ui") }
};
