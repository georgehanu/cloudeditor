import React, { Component } from "react";

const { Textbox } = require("../../../react-fabric");
const { fabric } = require("fabric");
const { pushLoadedFont, isLoadedFont } = require("../../../../../globals");
class TextLoad extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loaded: false
    };
  }

  loadFonts() {
    let props = this.props;
    fabric.util.fontsLoaded(props, fontsLoaded => {
      for (let i = 0; i < fontsLoaded.length; i++) {
        pushLoadedFont(fontsLoaded[i]);
      }
      this.setState({ loaded: true });
    });
  }

  componentDidMount = () => {
    this.loadFonts();
  };
  componentDidUpdate = () => {
    //check if font is loaded
    if (!isLoadedFont(this.props.fontFamily) && this.state.loaded) {
      this.setState({ loaded: false });
      this.loadFonts();
    }
  };

  render() {
    let render = null;
    if (this.state.loaded) render = <Textbox {...this.props} />;

    return render;
  }
}
module.exports = TextLoad;
