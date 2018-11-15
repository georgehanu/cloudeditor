import React from "react";
import { withNamespaces } from "react-i18next";

const MenuLink = props => {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
      }}
    >
      {props.linkName}
    </a>
  );
};

export default withNamespaces("designAndGoMenu")(MenuLink);
