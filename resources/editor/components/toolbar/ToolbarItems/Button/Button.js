import React from "react";

import * as Utils from "../../ToolbarConfig/utils";
const randomColor = require("randomcolor");

const Button = props => {
  console.log("Button");
  console.log(props);
  let defaultClasses = ["ButtonIcon"];
  if (props.selected) {
    defaultClasses.push("ButtonSelected");
  }
  const className = Utils.MergeClassName(defaultClasses, props.className);
  const randomStyle = {
    color: randomColor()
  };
  return (
    <button
      type="button"
      className={className}
      style={randomStyle}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
