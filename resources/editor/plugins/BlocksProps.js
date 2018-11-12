import React from "react";
import { connect } from "react-redux";
import assign from "object-assign";
import { withNamespaces } from "react-i18next";
import BlockItem from "../components/blocksProps/BlockItem";

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
        />
        <BlockItem
          class="printqicon-rotatable"
          tooltip={{
            title: "Enable/Disable",
            description: "Enable/Disable Resize Blocks"
          }}
        />
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
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
      showMore: true
    }
  }),
  reducers: { ui: require("../stores/reducers/ui") }
};
