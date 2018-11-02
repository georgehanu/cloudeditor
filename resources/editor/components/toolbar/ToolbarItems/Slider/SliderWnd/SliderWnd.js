import React from "react";
const { debounce } = require("underscore");
import Button from "../../Button/Button";
import * as Utils from "../../../ToolbarConfig/utils";

const SliderWnd = props => {
  const parentClassName = Utils.MergeClassName("Slider", props.parentClassName);
  const popupIcon = (
    <span
      className={Utils.MergeClassName("SliderPopupIcon", props.className)}
    />
  );
  let startValue = 0;
  if (props.defaultValue) {
    startValue = props.defaultValue;
  }

  console.log("Slider");
  console.log(props);

  return (
    <div className={parentClassName}>
      <div className="SliderPopup">
        {popupIcon}
        <input
          className="SliderPopupSlider"
          type="range"
          defaultValue={startValue}
          min="0"
          max="100"
          step="1"
          onChange={event =>
            debounce(
              props.ToolbarHandler({
                mainHandler: true,
                payloadMainHandler: {
                  type: props.settingsHandler,
                  value: event.target.value
                },
                keepDetailsWnd: true
              })
            )
          }
        />
      </div>
    </div>
  );
};

export default SliderWnd;