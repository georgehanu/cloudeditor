import React from "react";

import * as Utils from "../../ToolbarConfig/utils";
import withTooltip from "../../../../hoc/withTooltip";
import { onlyUpdateForKeys } from "recompose";

const randomColor = require("randomcolor");

const enhance = onlyUpdateForKeys([
  "selected",
  "className",
  "spanClassName",
  "spanStyleBackgroundColor",
  "spanText"
]);

const Button = enhance(props => {
  let defaultClasses = ["ButtonIcon"];
  if (props.selected) {
    defaultClasses.push("ButtonSelected");
  }
  const className = Utils.MergeClassName(defaultClasses, props.className);
  const spanStyleBackgroundColor = props.spanStyleBackgroundColor
    ? { backgroundColor: props.spanStyleBackgroundColor }
    : {};
  const spanText = props.spanText ? props.spanText : "";
  const spanContent = props.spanClassName ? (
    <span
      className={props.spanClassName}
      style={{ ...spanStyleBackgroundColor }}
    >
      {spanText}
    </span>
  ) : spanText !== "" ? (
    <span>{spanText}</span>
  ) : (
    ""
  );
  const dropDown = props.dropDown ? <span className={props.dropDown} /> : null;

  return (
    <button
      type="button"
      className={className}
      onClick={props.clicked}
      {...props.tooltipData}
      style={{ backgroundColor: randomColor() }}
    >
      {dropDown}
      {spanContent}
    </button>
  );
});

export default withTooltip(Button, "toolbar");
