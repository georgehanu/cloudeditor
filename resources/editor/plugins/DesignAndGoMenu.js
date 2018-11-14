import React from "react";
import { withNamespaces } from "react-i18next";
import MenuModal from "../components/designAndGoMenu/MenuModal";
import MenuDataModal from "../components/designAndGoMenu/MenuDataModal";
const assign = require("object-assign");

class DesignAndGoMenu extends React.Component {
  state = {
    menuOpened: false,
    dataOpened: false
  };

  onMenuCloseHandler = () => {
    this.setState({ menuOpened: false, dataOpened: false });
  };
  onMenuOpenHandler = () => {
    this.setState({ menuOpened: true });
  };
  onDataOpenHandler = () => {
    this.setState({ dataOpened: true });
  };

  render() {
    return (
      <div className="DesignAndGoMenu">
        {this.state.menuOpened && (
          <MenuModal
            show={this.state.menuOpened}
            modalClosed={this.onMenuCloseHandler}
          />
        )}
        {this.state.dataOpened && (
          <MenuDataModal
            show={this.state.dataOpened}
            modalClosed={this.onMenuCloseHandler}
          />
        )}
        <div className="MenuButtonContainer">
          <a className="MenuButton" onClick={this.onMenuOpenHandler}>
            {this.props.t("MENU")}
          </a>
        </div>
        <div className="EditButtonContainer">
          <a className="EditButton" onClick={this.onDataOpenHandler}>
            {this.props.t("Edit label")}
          </a>
        </div>
      </div>
    );
  }
}

const DesignAndGoMenuPlugin = withNamespaces("designAndGoMenu")(
  DesignAndGoMenu
);

module.exports = {
  DesignAndGoMenu: assign(DesignAndGoMenuPlugin)
};
