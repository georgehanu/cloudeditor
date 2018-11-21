import React, { Component } from "react";
import MenuHeader from "./MenuModalItems/MenuHeader";
import Input from "../LayoutItems/Input";
import Backdrop from "./Backdrop";
import { withNamespaces } from "react-i18next";

class SignInModal extends Component {
  state = {
    email: "",
    password: "",
    invalidMessage: null
  };

  onInputChange = event => {
    if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }
  };

  validateEmail = email => {
    let message = null;
    if (email.length === 0) {
      message = this.props.t("Please fill the email field");
    } else {
      if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null) {
        message = this.props.t("Invalid email field");
      }
    }
    this.setState({ invalidMessage: message });
    return message === null;
  };
  validatePassword = password => {
    let message = null;
    if (password.length === 0) {
      message = this.props.t("Please fill the password field");
    }
    this.setState({ invalidMessage: message });
    return message === null;
  };

  onSignInButton = () => {
    this.validateEmail(this.state.email) &&
      this.validatePassword(this.state.password);
  };

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className="SignInModal">
          <div className="SingInContainer">
            <MenuHeader
              modalClosed={this.props.modalClosed}
              title={this.props.t("Members Login")}
            />
            <div className="SignInFields">
              <Input
                label={this.props.t("Email")}
                onInputChange={this.onInputChange}
                text={this.state.email}
                name="email"
              />
              <Input
                label={this.props.t("Password")}
                type="password"
                onInputChange={this.onInputChange}
                text={this.state.password}
                name="password"
              />
            </div>
            <div className="InvalidForm">{this.state.invalidMessage}</div>
            <div className="SingInButton">
              <button onClick={this.onSignInButton}>
                {this.props.t("Log In")}
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withNamespaces("designAndGo")(SignInModal);
