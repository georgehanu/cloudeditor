import React from "react";

import ColorButton from "./ColorButton";
import ColorPicker from "./ColorPicker";

const ColorButtonGroup = props => {
  const items = props.colors.map((el, index) => {
    if (el.colorPicker === undefined || el.colorPicker === false)
      return <ColorButton key={index} {...el} />;
    else
      return (
        <ColorPicker
          key={index}
          {...el}
          handleColorChange={props.handleColorChange}
        />
      );
  });
  return (
    <div className={props.class}>
      <label className="InputLabelContainer">
        <span>{props.label}</span>
        <div className="ColorButtonContainer">{items}</div>
      </label>
    </div>
  );
};

export default ColorButtonGroup;
