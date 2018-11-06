import React from "react";

const SidebarButton = props => {
  let defaultClasses = ["SidebarButton"];
  if (props.selected) {
    defaultClasses.push("SidebarButtonSelected");
  }

  const className = defaultClasses.join(" ");

  let simpleButton = (
    <button type="button" onClick={props.clicked} className={className}>
      {props.children}
    </button>
  );

  return <React.Fragment>{simpleButton}</React.Fragment>;
};

export default SidebarButton;
