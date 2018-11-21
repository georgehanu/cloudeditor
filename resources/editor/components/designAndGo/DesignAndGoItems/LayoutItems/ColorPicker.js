import React from "react";
import { HuePicker } from "react-color";

const ColorButton = props => {
  const className = "ColorButton" + (props.active ? " ColorButtonActive" : "");

  const containerBgColorStyle = props.containerBgColor
    ? { backgroundColor: props.containerBgColor }
    : {};

  return (
    <React.Fragment>
      <div className={className} onClick={props.clicked}>
        <div className="ColorButtonBg" style={{ ...containerBgColorStyle }} />
      </div>
      {props.active && (
        <div className="ColorPicker">
          <HuePicker
            onChangeComplete={color => props.handleColorChange(color)}
            color={props.containerBgColor}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ColorButton;
