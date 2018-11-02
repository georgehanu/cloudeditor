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
      >
        <span
          className="ColorSelectorButton"
          style={{ backgroundColor: props.color }}
        />
      </Button>
    </div>
  );
};

export default ColorSelector;
