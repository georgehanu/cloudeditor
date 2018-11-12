import React from "react";

import Group from "../Group/Group";

import * as Utils from "../../ToolbarConfig/utils";

const ToolbarArea = props => {
  const className = Utils.MergeClassName("ToolbarArea", props.className);
  const groups = props.groups.map((item, idx) => {
    return (
      <Group
        key={idx}
        items={item.items}
        className={item.className}
        ToolbarHandler={props.ToolbarHandler}
      />
    );
  });

  return <div className={className}>{groups}</div>;
};

export default ToolbarArea;
