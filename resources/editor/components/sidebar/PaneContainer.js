import React from "react";

const PaneContainer = props => {
  const transparent =
    props.showPaneBackground === undefined || props.showPaneBackground
      ? ""
      : " PaneTransparent ";

  const style =
    transparent === " PaneTransparent " ? { top: props.index * 60 + "px" } : {};
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
