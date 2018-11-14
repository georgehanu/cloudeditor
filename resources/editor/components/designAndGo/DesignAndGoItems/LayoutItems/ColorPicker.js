import React from "react";

import * as Utils from "../../DesignAndGoConfig/utils";
import { HuePicker } from "react-color";

const ColorButton = props => {
  const containerColorStyle = props.containerColor
    ? { backgroundColor: props.containerColor }
    : {};
  const containerBgColorStyle = props.containerBgColor
    ? { backgroundColor: props.containerBgColor }
    : {};

  return (
    <React.Fragment>
      <div className="ColorButton" style={{ ...containerColorStyle }}>
        <div className="ColorButtonBg" style={{ ...containerBgColorStyle }} />
      </div>
      {props.selected && (
        <div className="ColorPicker">
          <HuePicker
            onChangeComplete={props.handleColorChange}
            color={props.containerBgColor}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ColorButton;
