import React from "react";
import withTooltip from "../../hoc/withTooltip";

const BlockItem = props => {
  const className = props.class + " icon BlockItem ";
  return (
    <li {...props.tooltipData}>
      <div className={className} onClick={props.clicked}>
        {props.selected && <span className="icon printqicon-ok" />}
      </div>
    </li>
  );
};

export default withTooltip(BlockItem, "blockProps");
