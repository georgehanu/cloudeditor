import React from "react";

import * as Utils from "../../ToolbarConfig/utils";
import withTooltip from "../../../../hoc/withTooltip";

const Button = props => {
  let defaultClasses = ["ButtonIcon"];
  if (props.selected) {
    defaultClasses.push("ButtonSelected");
  }
  const className = Utils.MergeClassName(defaultClasses, props.className);
  return (
    <button
      type="button"
      className={className}
      onClick={props.clicked}
      {...props.tooltipData}
    >
      {props.children}
    </button>
  );
};

export default withTooltip(Button, "toolbar");
