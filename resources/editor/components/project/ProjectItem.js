import React from "react";
import withTooltip from "../../hoc/withTooltip";

const ProjectItem = props => {
  const className = props.class + " icon ProjectItem ";
  return (
    <li {...props.tooltipData}>
      <div className={className} onClick={props.clicked} />
    </li>
  );
};

export default withTooltip(ProjectItem, "project");
