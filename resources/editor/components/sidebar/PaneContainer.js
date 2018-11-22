import React from "react";

const PaneContainer = props => {
  const className =
    "PaneContainer " + (props.visible ? "PaneShow" : "PaneHidden");
  return <div className={className}>{props.children}</div>;
};

export default PaneContainer;
