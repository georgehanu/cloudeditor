const { fabric } = require("../../../../rewrites/fabric/fabric");
const logger = require("../../../../utils/LoggerUtils");
const { graphicsTypes, graphicsDefaults } = require("./types/graphics");
const FabricObject = require("./fabricObject");

class Graphics extends FabricObject {
  constructor(props) {
    super(props);
    this.setPropsToSkip({
      _objects: true,
      loadedInstance: true
    });
    this.instance = new fabric.Graphics([props.loadedInstance]);

    this.props.isLoaded = 1;
    this._applyProps(this.props);
  }
}

Graphics.propTypes = graphicsTypes;

Graphics.defaultProps = graphicsDefaults;

module.exports = Graphics;
