import React from "react";

import * as Utils from "../../ToolbarConfig/utils";
import { Config } from "../../ToolbarConfig/config";
import * as Types from "../../ToolbarConfig/types";

import SliderWnd from "../Slider/SliderWnd/SliderWnd";
import ColorSelectorWnd from "../ColorSelector/ColorElements/ColorSelectorWnd";
import SpecialEffectsWnd from "../SpecialEffectsWnd/SpecialEffectsWnd";
import ChangeShapeWnd from "../ChangeShapeWnd/ChangeShapeWnd";

const SettingsWnd = props => {
  /* Merge the props with the data from Config */
  const item = { ...props.payload, ...Config[props.item] }; // second should be config
  let itemData = null;

  if (item.baseType === Types.COLOR_SELECTOR_WND)
    itemData = (
      <ColorSelectorWnd
        {...item}
        ToolbarHandler={props.ToolbarHandler}
        handler={props.handler}
        itemData={props.itemData}
      />
    );
  else if (item.baseType === Types.SLIDER_WND)
    itemData = (
      <SliderWnd
        {...item}
        ToolbarHandler={props.ToolbarHandler}
        handler={props.handler}
        {...props.itemData}
      />
    );
  else if (item.baseType === Types.SPECIAL_EFFECTS_WND)
    itemData = (
      <SpecialEffectsWnd
        {...item}
        ToolbarHandler={props.ToolbarHandler}
        handler={props.handler}
        itemData={props.itemData}
      />
    );
  else if (item.baseType === Types.CHANGE_SHAPE_WND)
    itemData = (
      <ChangeShapeWnd
        {...item}
        ToolbarHandler={props.ToolbarHandler}
        handler={props.handler}
        {...props.itemData}
      />
    );

  return <div className="SettingsWnd">{itemData}</div>;
};

export default SettingsWnd;
