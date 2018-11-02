import React from "react";

import * as Utils from "../../../ToolbarConfig/utils";

const SpecialEffectsItem = props => {
  const className = Utils.MergeClassName(
    "SpecialEffectsImageBg",
    props.className
  );
  return (
    <React.Fragment>
      <div className="SpecialEffectsImageContainer">
        <img className={className} src={props.image} />
        <div className="SpecialEffectsActions">
          <span
            className="SpecialEffectsOK pic select icon printqicon-ok"
            onClick={() =>
              props.ToolbarHandler({
                mainHandler: true,
                payloadMainHandler: props.className
              })
            }
          />
        </div>
      </div>
      <span className="SpecialEffectsImageText">{props.text}</span>
    </React.Fragment>
  );
};

export default SpecialEffectsItem;
