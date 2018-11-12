import React from "react";
import withTooltip from "../../hoc/withTooltip";

const BlockItem = props => {
  const className =
    props.class +
    " icon BlockItem " +
    (props.selected ? "BlockItemSelected" : "");
  return (
    <li {...props.tooltipData}>
      <div className={className} />
    </li>
  );
};

export default withTooltip(BlockItem, "blockProps");
