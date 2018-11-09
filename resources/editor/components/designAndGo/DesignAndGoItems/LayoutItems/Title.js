import React from "react";

import * as Utils from "../../DesignAndGoConfig/utils";

const Title = props => {
  const className = Utils.MergeClassName("TitleContainer", props.className);

  return (
    <div className={className}>
      <div className="Title" />
    </div>
  );
};

export default Title;
