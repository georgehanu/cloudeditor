const { fabric } = require("../../../../rewrites/fabric/fabric");
const logger = require("../../../../utils/LoggerUtils");
const { imageTypes, imageDefaults } = require("./types/image");
const FabricObject = require("./fabricObject");

class Image extends FabricObject {
  constructor(props) {
    super(props);
    logger.info("new props", props);
    const tmpImage = new window.Image();
    tmpImage.src = props.src;

    this.instance = new fabric.Image(tmpImage, props);
    this._applyProps(props);

    tmpImage.onload = () => {
      logger.info("tmpImage loaded");
      this._updatePicture();
      this._updatePlaceholder();
    };
  }
  _updatePlaceholder() {
    this.instance._setViewBox({});
  }
}

Image.propTypes = imageTypes;

Image.defaultProps = imageDefaults;

module.exports = Image;
