const { fabric } = require("../../../../rewrites/fabric/fabric");
const logger = require("../../../../utils/LoggerUtils");
const { imageTypes, imageDefaults } = require("./types/image");
const FabricObject = require("./fabricObject");

class Image extends FabricObject {
  constructor(props) {
    super(props);
    this.setPropsToSkip({ loadedInstance: true });
    logger.info("new props", props);

    this.instance = new fabric.Image(props.loadedInstance, props);
    this.instance.isLoaded = true;
    this._applyProps(props);

    this._updatePicture();
    this._updatePlaceholder();
  }
  _updatePlaceholder() {
    this.instance._setViewBox({});
    if (
      this.instance.designerCallbacks &&
      this.instance.designerCallbacks.updateCropParams
    ) {
      this.instance.designerCallbacks.updateCropParams(this.instance.id, {
        cropX: this.instance.cropX,
        cropY: this.instance.cropY,
        cropWidth: this.instance.cropWidth,
        cropHeight: this.instance.cropHeight
      });
    }
  }
}

Image.propTypes = imageTypes;

Image.defaultProps = imageDefaults;

module.exports = Image;
