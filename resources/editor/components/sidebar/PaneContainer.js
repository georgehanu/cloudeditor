import React from "react";

const PaneContainer = props => {
  let transparent = "";
  let style = {};
  if (
    props.showPaneBackground !== undefined &&
    props.showPaneBackground === false
  ) {
    transparent = "PaneTransparent";
    style = { top: props.index * 60 + "px" };
  }

  const className =
    (props.paneBackgroundClass ? props.paneBackgroundClass : "") +
    " " +
    transparent +
    " PaneContainer " +
    (props.visible ? "PaneShow" : "PaneHidden");

  return (
    <div className={className} style={{ ...style }}>
      {props.children}
    </div>
  );
};

export default PaneContainer;
