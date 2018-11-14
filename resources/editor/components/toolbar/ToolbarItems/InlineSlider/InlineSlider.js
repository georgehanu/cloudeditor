import React from "react";
const { debounce } = require("underscore");
import * as Utils from "../../ToolbarConfig/utils";

const InlineSlider = props => {
  const parentClassName = Utils.MergeClassName(
    "InlineSlider",
    props.parentClassName
  );
  let startValue = 0;
  if (props.defaultValue) {
    startValue = props.defaultValue;
  }

  return (
    <div className={parentClassName}>
      <input
        className=""
        type="range"
        value={startValue}
        onChange={event =>
          props.ToolbarHandler({
            mainHandler: true,
            payloadMainHandler: {
              value: event.target.value,
              type: props.type
            }
          })
        }
        min="0"
        max="100"
        step="1"
      />
    </div>
  );
};

export default InlineSlider;
