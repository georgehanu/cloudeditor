import React from "react";

import Button from "../Button/Button";

class ColorSelector extends React.Component {
  render() {
    return (
      <div className="ColorSelector">
        <Button
          clicked={() =>
            this.props.ToolbarHandler({
              mainHandler: this.props.handler,
              detailsWndComponent: this.props.settingsHandler,
              payloadDetailsComponent: this.props
            })
          }
        >
          <span className="ColorSelectorButton" />
        </Button>
      </div>
    );
  }
}

export default ColorSelector;
