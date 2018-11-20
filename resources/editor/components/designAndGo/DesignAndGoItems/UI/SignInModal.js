import React, { Component } from "react";
import MenuHeader from "./MenuModalItems/MenuHeader";
import Input from "../LayoutItems/Input";
import Backdrop from "./Backdrop";
import { withNamespaces } from "react-i18next";

class SignInModal extends Component {
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className="SignInModal">
          <div className="SingInContainer">
            <MenuHeader
              modalClosed={this.props.modalClosed}
              title="Members Login"
            />
            <div className="SignInFields">
              <Input label="Email" />
              <Input label="Password" />
            </div>
            <div className="SingInButton">
              <button>{this.props.t("Log In")}</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withNamespaces("designAndGo")(SignInModal);
