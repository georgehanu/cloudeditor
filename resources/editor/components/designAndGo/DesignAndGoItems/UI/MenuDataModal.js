import React, { Component } from "react";
import MenuHeader from "./MenuModalItems/MenuHeader";

import Backdrop from "./Backdrop";

class MenuDataModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className="MenuDataModal">
          <MenuHeader modalClosed={this.props.modalClosed} title="Edit Label" />
          <div className="MenuDataModalContainer">Menu</div>
        </div>
      </React.Fragment>
    );
  }
}

export default MenuDataModal;
