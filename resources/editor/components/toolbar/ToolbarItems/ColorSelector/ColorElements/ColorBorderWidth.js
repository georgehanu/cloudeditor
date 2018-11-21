import React from "react";
const { debounce } = require("underscore");
const ColorBorderWidth = props => {
  return (
    <div className="ColorTabWidthContainer">
      <div className="ColorBorderWidthLeft">
        <span className={props.className} />
      </div>
      <div className="ColorBorderWidthRight">
        <input
          className="ColorBorderWidthSlider"
          type="range"
          defaultValue={props.defaultValue}
          min="0"
          max="10"
          step="0.1"
          onChange={event =>
            debounce(
              props.selectWidth({
                mainHandler: true,
                payloadMainHandler: {
                  type: props.type,
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

export default ColorBorderWidth;
