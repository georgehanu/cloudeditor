import React from "react";

import * as Utils from "../../DesignAndGoConfig/utils";

const ColorButton = props => {
  const containerColorStyle = props.containerColor
    ? { backgroundColor: props.containerColor }
    : {};
  const containerBgColorStyle = props.containerBgColor
    ? { backgroundColor: props.containerBgColor }
    : {};
  const color1Style = props.color1 ? { backgroundColor: props.color1 } : {};
  const color2Style = props.color2 ? { backgroundColor: props.color2 } : {};

  return (
    <div className="ColorButton" style={{ ...containerColorStyle }}>
      <div className="ColorButtonBg" style={{ ...containerBgColorStyle }}>
        <div className="ColorButton1" style={{ ...color1Style }} />
        <div className="ColorButton2" style={{ ...color2Style }} />
      </div>
    </div>
  );
};

export default ColorButton;
