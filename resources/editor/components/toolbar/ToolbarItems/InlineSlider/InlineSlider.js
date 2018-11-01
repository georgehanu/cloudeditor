import React from "react";

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
        defaultValue={startValue}
        onChange={event =>
          props.ToolbarHandler({
            mainHandler: true,
            payloadMainHandler: event.target.value
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
