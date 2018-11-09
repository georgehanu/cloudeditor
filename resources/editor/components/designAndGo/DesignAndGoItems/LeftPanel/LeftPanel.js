import React from "react";
import Fields from "../LayoutItems/Fields";
import Title from "../LayoutItems/Title";
import Description from "../LayoutItems/Description";

const LeftPanel = props => {
  return (
    <div className="LeftPanel">
      <div className="LeftPaneHorizontal">
        <div className="LeftPaneHorizontalStyled">
          <Title {...props.data.title} />
          <Description items={props.data.description} />
          <Fields items={props.data.items} />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
