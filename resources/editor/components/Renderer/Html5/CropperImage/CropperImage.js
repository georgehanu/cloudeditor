const React = require("react");
const { merge } = require("ramda");
class CropperImage extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.wrapper = React.createRef();
    this.options = {
      leftImage: 0,
      topImage: 0,
      minPercent: 0,
      initialRestore: true,
      dragImageCoords: {},
      isDragging: false,
      dragMouseCoords: {},
      workingPercent: ""
    };
  }
  shouldComponentUpdate(prevProps, prevState) {
    if (prevProps.uniqueId != this.props.uniqueId)
      this.initializeDimensions(true);
    return false;
  }
  updateImage() {
    const { leftImage, topImage, widthImage } = this.options;
    const { parent } = this.props;
    const imageStyle = {
      position: "absolute",
      top: topImage,
      left: leftImage,
      width: widthImage
    };
    const targetWidth = parent.offsetWidth;
    const targetHeight = parent.offsetHeight;
    const styleWrapper = {
      overflow: "hidden",
      position: "relative",
      width: targetWidth,
      height: targetHeight
    };
    const image = this.el.current;
    const wrapper = this.wrapper.current;
    $(image).css(imageStyle);
    $(wrapper).css(styleWrapper);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    document.addEventListener("cropperUpdate", this.updateCrop.bind(this));
  }
  updateCrop() {
    this.options = merge(this.options, { initialRestore: false });
    this.initializeDimensions(false);
    this.options = merge(this.options, { initialRestore: true });
  }
  fillContainer(val, targetLength, containerLength, alternate_zoom) {
    // ensure that no gaps are between target's edges and container's edges
    if (alternate_zoom) {
      if (val > containerLength) val = containerLength - 5;
      if (val + targetLength < 0) val = -targetLength + 5;
    } else {
      if (val + targetLength < containerLength)
        val = containerLength - targetLength;
      if (val > 0) val = 0;
    }
    return val;
  }
  initializeDimensions(shouldUpdate) {
    const { initialRestore, focalX, focalY } = this.options;
    let { workingPercent, minPercent, focalPoint } = this.options;
    const { alternateZoom, parent } = this.props;
    const originalWidth = this.el.current.offsetWidth;
    const originalHeight = this.el.current.offsetHeight;
    const targetWidth = parent.offsetWidth;
    const targetHeight = parent.offsetHeight;
    let { cropX, cropY, cropH, cropW } = this.props;
    let widthRatio = 1;
    let heightRatio = 1;

    if (originalWidth > 0) {
      widthRatio = targetWidth / originalWidth;
      heightRatio = targetHeight / originalHeight;
      if (alternateZoom) {
        if (widthRatio >= heightRatio) {
          minPercent = heightRatio;
        } else {
          minPercent = widthRatio;
        }
      } else {
        if (widthRatio <= heightRatio) {
          minPercent = heightRatio;
        } else {
          minPercent = widthRatio;
        }
      }
    }
    if (!initialRestore || !cropW) {
      workingPercent = minPercent;
      let left = ((originalWidth / 2) * minPercent - targetWidth / 2) * -1;
      let top = ((originalHeight / 2) * minPercent - targetHeight / 2) * -1;
      let targetLength = originalWidth * workingPercent;
      let containerLength = targetWidth;
      left = this.fillContainer(
        left,
        targetLength,
        containerLength,
        alternateZoom
      );
      cropX = (left / minPercent) * -1;
      targetLength = originalHeight * workingPercent;
      containerLength = targetHeight;
      top = this.fillContainer(
        top,
        targetLength,
        containerLength,
        alternateZoom
      );
      cropY = (top / minPercent) * -1;
      cropW = targetWidth / minPercent;
      cropH = targetHeight / minPercent;
    }
    this.options = merge(
      { ...this.options },
      {
        minPercent,
        focalPoint,
        widthRatio,
        heightRatio,
        workingPercent,
        cropX,
        cropY,
        cropH,
        cropH
      }
    );
    this.setZoom(minPercent, shouldUpdate);
  }

  focusOnCenter() {
    const { workingPercent } = this.options;
    const { parent, alternateZoom } = this.props;
    const originalWidth = this.el.current.offsetWidth;
    const originalHeight = this.el.current.offsetHeight;
    const targetWidth = parent.offsetWidth;
    const targetHeight = parent.offsetHeight;
    const { cropX, cropY } = this.options;
    const width = originalWidth * workingPercent;
    const height = originalHeight * workingPercent;
    const leftImage = this.fillContainer(
      Math.round(cropX * workingPercent) * -1,
      width,
      targetWidth,
      alternateZoom
    );
    var topImage = this.fillContainer(
      Math.round(cropY * workingPercent) * -1,
      height,
      targetHeight,
      alternateZoom
    );
    this.options = merge({ ...this.options }, { topImage, leftImage });
    this.updateImage();
  }

  updateResult(shouldUpdate) {
    const image = this.el.current;
    const { workingPercent, minPercent } = this.options;
    const { parent } = this.props;
    const targetWidth = parent.offsetWidth;
    const targetHeight = parent.offsetHeight;
    let result = {};
    if (image) {
      result = {
        cropX: Math.floor((parseInt(image.style.left) / workingPercent) * -1),
        cropY: Math.floor((parseInt(image.style.top) / workingPercent) * -1),
        cropW: Math.round(targetWidth / workingPercent),
        cropH: Math.round(targetHeight / workingPercent)
      };
      this.options = merge({ ...this.options }, result);
      if (shouldUpdate) {
        this.props.onUpdateProps({
          id: this.props.id,
          props: result
        });
      }
    }

    // here we have to update the big state
    // base.options.onChange.call(base.image, base.result);
  }
  handleMouseDown(event) {
    event.preventDefault(); //some browsers do image dragging themselves
    let { isDragging, dragMouseCoords, dragImageCoords } = this.options;
    const image = this.el.current;
    isDragging = true;
    dragMouseCoords = {
      x: event.pageX || event.originalEvent.touches[0].pageX,
      y: event.pageY || event.originalEvent.touches[0].pageY
    };
    dragImageCoords = {
      x: parseInt(image.style.left),
      y: parseInt(image.style.top)
    };
    this.options = merge(
      { ...this.options },
      { isDragging, dragImageCoords, dragMouseCoords }
    );
  }

  handleMouseMove(event) {
    event.preventDefault();
    const { isDragging, dragImageCoords, dragMouseCoords } = this.options;
    const { active, parent, alternateZoom } = this.props;
    const targetWidth = parent.offsetWidth;
    const targetHeight = parent.offsetHeight;
    const image = this.el.current;
    if (isDragging && active) {
      const xDif =
        (event.pageX || event.originalEvent.touches[0].pageX) -
        dragMouseCoords.x;
      const yDif =
        (event.pageY || event.originalEvent.touches[0].pageY) -
        dragMouseCoords.y;
      const leftImage = this.fillContainer(
        dragImageCoords.x + xDif,
        image.width,
        targetWidth,
        alternateZoom
      );
      const topImage = this.fillContainer(
        dragImageCoords.y + yDif,
        image.height,
        targetHeight,
        alternateZoom
      );
      this.options = merge({ ...this.options }, { topImage, leftImage });
      this.updateImage();
      this.updateResult(false);
    }
  }
  handleMouseUp() {
    const isDragging = false;
    this.options = merge({ ...this.options }, { isDragging });
    this.updateResult(true);
  }
  setZoom(percent, shouldUpdate) {
    const originalWidth = this.el.current.offsetWidth;
    const widthImage = Math.ceil(originalWidth * percent);
    const workingPercent = percent;
    this.options = merge({ ...this.options }, { widthImage, workingPercent });
    this.updateImage();
    this.focusOnCenter();
    this.updateResult(shouldUpdate);
  }
  zoomIn() {
    const { minPercent, zoomSteps, workingPercent } = this.options;
    const zoomIncrement = (1.0 - minPercent) / (zoomSteps - 1);
    this.setZoom(workingPercent + zoomIncrement);
    return false;
  }
  zoomOut() {
    const { minPercent, zoomSteps, workingPercent } = this.options;
    var zoomIncrement = (1.0 - minPercent) / (zoomSteps - 1);
    this.setZoom(workingPercent - zoomIncrement);
    return false;
  }

  render() {
    const { parent } = this.props;

    const targetWidth = parent.offsetWidth;
    const targetHeight = parent.offsetHeight;
    const styleWrapper = {
      overflow: "hidden",
      position: "relative",
      width: targetWidth,
      height: targetHeight
    };
    return (
      <div ref={this.wrapper} className="jwc_frame" style={styleWrapper}>
        <img
          onLoad={() => {
            this.initializeDimensions(true);
          }}
          onMouseDown={e => this.handleMouseDown(e)}
          src={this.props.src}
          ref={this.el}
        />
      </div>
    );
  }
}
module.exports = CropperImage;
