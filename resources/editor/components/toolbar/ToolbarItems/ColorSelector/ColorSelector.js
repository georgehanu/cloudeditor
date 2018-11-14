import React from "react";

import Button from "../Button/Button";

const ColorSelector = props => {
  return (
    <div className="ColorSelector">
      <Button
        clicked={() =>
          props.ToolbarHandler({
            mainHandler: true,
            detailsWndComponent: props.settingsHandler,
            payloadDetailsComponent: props
          })
        }
        spanClassName="ColorSelectorButton"
        spanStyleBackgroundColor={props.color}
      />
    </div>
  );
};

export default ColorSelector;
