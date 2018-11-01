import React from "react";

import * as Utils from "../../ToolbarConfig/utils";
import * as Types from "../../ToolbarConfig/types";
import { Config } from "../../ToolbarConfig/config";

import Button from "../Button/Button";
import Poptext from "../Poptext/Poptext";
import Slider from "../Slider/Slider";
import Incremental from "../Incremental/Incremental";
import ColorSelector from "../ColorSelector/ColorSelector";
import InlineSlider from "../InlineSlider/InlineSlider";
import SimpleIcon from "../SimpleIcon/SimpleIcon";

const Group = props => {
  const className = Utils.MergeClassName("GroupArea", props.className);
  /* Merge the props with the data from Config */
  const data = props.items.map(el => {
    return { ...Config[el.type], ...el };
  });

  const items = data.map((item, idx) => {
    if (item.baseType === Types.BUTTON) {
      return (
        <Button
          key={idx}
          className={item.parentClassName}
          selected={item.selected}
          clicked={() =>
            item.settingsHandler === undefined
              ? props.ToolbarHandler({
                  mainHandler: item.handler,
                  payloadMainHandler: item.type
                })
              : props.ToolbarHandler({
                  mainHandler: item.handler,
                  detailsWndComponent: item.settingsHandler,
                  payloadDetailsComponent: item.settingsPayload
                })
          }
        >
          <span className={item.className} />
        </Button>
      );
    } else if (
      item.baseType === Types.POPTEXT_VALUE ||
      item.baseType === Types.POPTEXT_ICON
    )
      return (
        <Poptext {...item} key={idx} ToolbarHandler={props.ToolbarHandler} />
      );
    else if (item.baseType === Types.SLIDER)
      return (
        <Slider {...item} key={idx} ToolbarHandler={props.ToolbarHandler} />
      );
    else if (item.baseType === Types.INCREMENTAL)
      return <Incremental {...item} key={idx} />;
    else if (item.baseType === Types.COLOR)
      return (
        <ColorSelector
          {...item}
          key={idx}
          ToolbarHandler={props.ToolbarHandler}
        />
      );
    else if (item.baseType === Types.SLIDER_INLINE)
      return (
        <InlineSlider
          {...item}
          key={idx}
          ToolbarHandler={props.ToolbarHandler}
        />
      );
    else if (item.baseType === Types.SIMPLE_ICON)
      return <SimpleIcon {...item} key={idx} />;
  });

  return <div className={className}>{items}</div>;
};

export default Group;
