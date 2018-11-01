import React from "react";

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
          max="100"
          step="1"
          onChange={event =>
            props.selectWidth({
              mainHandler: true,
              payloadMainHandler: { [props.type]: event.target.value },
              keepDetailsWnd: true
            })
          }
        />
      </div>
    </div>
  );
};

export default ColorBorderWidth;
