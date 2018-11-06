import React, { Component } from "react";
const { fabric } = require("../../../../rewrites/fabric/fabric");
const { Graphics } = require("../../react-fabric");
const { forEach } = require("ramda");
class GraphicsLoad extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      instance: null,
      error: false,
      loaded: false
    };
  }

  loadShape(src) {
    if (!src) {
      throw new Error("Expected image src instead saw " + typeof src);
    }
    fabric.loadSVGFromURL(src, (objects, options) => {
      forEach(obj => {
        obj.isLoaded = 1;
      }, objects);

      let loadedObject = fabric.util.groupSVGElements(objects, options);

      this.setState({ loaded: true, instance: loadedObject });
    });
  }
  componentDidMount = () => {
    this.loadShape(this.props.src);
  };

  render() {
    let render = null;
    if (this.state.loaded)
      render = (
        <Graphics loadedInstance={this.state.instance} {...this.props} />
      );
    return render;
  }
}
module.exports = GraphicsLoad;
