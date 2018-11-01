import React from "react";
import Button from "../Button/Button";
import * as Utils from "../../ToolbarConfig/utils";

const Slider = props => {
  const parentClassName = Utils.MergeClassName("Slider", props.parentClassName);
  const value = <span className={props.className} />;
  let startValue = 0;
  if (props.defaultValue) {
    startValue = props.defaultValue;
  }

  return (
    <div className={parentClassName}>
      <Button
        clicked={() =>
          props.ToolbarHandler({
            mainHandler: true,
            detailsWndComponent: props.settingsHandler,
            payloadDetailsComponent: props
          })
        }
      >
        {value}
      </Button>
    </div>
  );
};
export default React.memo(Slider);
