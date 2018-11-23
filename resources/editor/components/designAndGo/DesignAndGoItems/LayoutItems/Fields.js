import React from "react";
import Input from "./Input";
import Text from "./Text";

import * as Types from "../../DesignAndGoConfig/types";

const Fields = props => {
  const items = props.items.map((el, index) => {
    if (el.type === Types.INPUT) {
      return <Input key={index} {...el} />;
    } else if (el.type === Types.TEXT) {
      return <Text key={index} {...el} />;
    }
  });
  return <div className="FieldsContainer">{items}</div>;
};

export default Fields;