import React from "react";

//import "./ColorSelector.css"
import ColorHeader from "./ColorHeader";
import ColorTab from "./ColorTab";
import ColorBorderWidth from "./ColorBorderWidth";

import * as Utils from "../../../ToolbarConfig/utils";
import * as Types from "../../../ToolbarConfig/types";

class ColorSelector extends React.Component {
  state = {
    activeTab: null
  };

  selectTab = tabType => {
    this.setState({ activeTab: tabType });
  };

  render() {
    const elemClass = Utils.MergeClassName(
      "ShowColorSelection",
      this.props.poptextClassName
    );

    let elements = this.props.tabs;
    if (this.props.settingsPayload !== undefined) {
      elements = [];
      for (let index in this.props.tabs) {
        let item = this.props.tabs[index];
        let payloadElement =
          this.props.settingsPayload[item.type] === undefined
            ? {}
            : this.props.settingsPayload[item.type];
        elements.push({ ...item, ...payloadElement });
      }
    }

    const sortedElements = elements
      .filter(el => {
        return el.visible === undefined || el.visible;
      })
      .sort((a, b) => Utils.comparePosition(a, b));

    let activeTab = this.state.activeTab;
    if (this.state.activeTab === null) {
      if (this.props.activeTab !== undefined) {
        activeTab = this.props.activeTab;
      } else {
        activeTab = sortedElements[0].type;
      }
    }
    const index = sortedElements.findIndex(el => {
      return el.type === activeTab;
    });
    let data =
      "data" in sortedElements[index] ? sortedElements[index].data : [];

    let selectedIndex =
      sortedElements[index].type in this.props.itemData.selected
        ? this.props.itemData.selected[sortedElements[index].type]
        : null;

    let tab = (
      <ColorTab
        data={data}
        selectedIndex={selectedIndex}
        selectColor={this.props.ToolbarHandler}
        handler={this.props.handler}
        type={activeTab}
      />
    );
    if (sortedElements[index].baseType === Types.COLOR_TAB_WIDTH_CHOOSER) {
      tab = (
        <ColorBorderWidth
          {...sortedElements[index]}
          defaultValue={selectedIndex}
          selectWidth={this.props.ToolbarHandler}
          handler={this.props.handler}
          type={activeTab}
        />
      );
    }

    return (
      <div className="ColorSelector">
        <div className={elemClass}>
          <ColorHeader
            data={sortedElements}
            selectTab={this.selectTab}
            activeTab={activeTab}
          />
          {tab}
        </div>
      </div>
    );
  }
}

export default ColorSelector;
