const React = require("react");
const { number } = require("prop-types");
const { Image, IText, Fabric } = require("../../../packages/core/react-fabric");
const { fabric } = require("../../../rewrites/fabric/fabric");

const updatePageOffset = (props, editorContainer) => {
  const { designerMaxWidth, designerMaxHeight, adjustment, activePage } = props;

  let newW = 0,
    newH = 0,
    offsetX = 0,
    offsetY = 0;

  const parentDimension = editorContainer.getBoundingClientRect();

  parentDimension.height =
    parentDimension.height > designerMaxHeight
      ? designerMaxHeight
      : parentDimension.height - adjustment;
  parentDimension.width =
    parentDimension.width > designerMaxWidth
      ? designerMaxWidth
      : parentDimension.width - adjustment;

  let containerRatio = parentDimension.width / parentDimension.height,
    productRatio = activePage.width / activePage.height;

  if (containerRatio >= productRatio) {
    newW = (parentDimension.height - adjustment) * productRatio;
    newH = parentDimension.height - adjustment;
  } else {
    newW = parentDimension.width - adjustment;
    newH = (parentDimension.width - adjustment) / productRatio;
  }
  offsetX = (parentDimension.width - newW) / 2;
  offsetY = (parentDimension.height - newH) / 2;

  const result = {
    isReadyComponent: true,
    width: parentDimension.width,
    height: parentDimension.height,
    canvasOffsetX: offsetX,
    canvasOffsetY: offsetY,
    canvasWorkingWidth: newW,
    canvasWorkingHeight: newH,
    canvasScale: newW / activePage.width
  };
  return result;
};

class FabricjsRenderer extends React.Component {
  state = {
    editorContainer: null,
    isReadyComponent: false,
    width: 0,
    height: 0,
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasWorkingWidth: 0,
    canvasWorkingHeight: 0,
    canvasScale: 1
  };
  constructor(props) {
    super(props);

    this.editorContainer = React.createRef();
    this.state = {
      isReadyComponent: false,
      width: 0,
      height: 0,
      canvasOffsetX: 0,
      canvasOffsetY: 0,
      canvasWorkingWidth: 0,
      canvasWorkingHeight: 0,
      canvasScale: 1
    };
  }

  updatePageOffset = () => {
    const result = updatePageOffset(this.props, this.editorContainer.current);
    this.setState(result);
  };

  componentDidMount() {
    this.updatePageOffset();
    window.addEventListener("resize", this.updatePageOffset);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePageOffset);
  }

  onBeforeOverlayHandler = params => {
    if (params.canvas.interactive) {
      var lowPoint = fabric.util.transformPoint(
          new fabric.Point(
            params.canvas.getCanvasOffsetX(),
            params.canvas.getCanvasOffsetY()
          ),
          params.canvas.viewportTransform
        ),
        upPoint = fabric.util.transformPoint(
          new fabric.Point(
            params.canvas.getCanvasWorkingWidth(),
            params.canvas.getCanvasWorkingHeight()
          ),
          params.canvas.viewportTransform,
          1
        ),
        n = params.canvas.getWidth(),
        r = params.canvas.getHeight();

      params.ctx.fillStyle = params.canvas.translucentOverlayOutside;
      params.ctx.beginPath();
      params.ctx.rect(0, 0, n, r);

      params.ctx.rect(lowPoint.x, lowPoint.y, upPoint.x, upPoint.y);
      params.ctx.fill("evenodd");
      params.ctx.closePath();
    }
  };
  onSelectedCreatedHandler = args => {
    if (args && args.selected) {
      this.props.addObjectToSelectedHandler(args.target.id);
      //console.log(this.props);
      //const { activePage: page } = this.props;
      // debugger;
      // this.setState({ ...this.state, activeObject: args.selected });
    }
  };
  onClearedCreatedHandler = args => {
    // this.setState({ ...this.state, activeObject: null });
  };
  render() {
    const { activePage: page } = this.props;
    const { objects } = page;
    let elements = Object.keys(objects).map(obKey => {
      const object = objects[obKey];
      switch (object.type) {
        case "image":
          return (
            <Image
              key={object.id}
              {...object}
              onMoving={this.onMovingHandler}
            />
          );
        case "text":
          return (
            <IText
              key={object.id}
              {...object}
              onMoving={this.onMovingHandler}
            />
          );
        default:
          break;
      }
      return null;
    });
    let isReadyComponent = this.state.isReadyComponent;
    console.log("--------------------------------------------------");
    return (
      <div className="fabric_container">
        <div
          style={{ background: "#F3F4F6", height: "100%" }}
          className="canvasContainer"
          ref={this.editorContainer}
        >
          {isReadyComponent && (
            <Fabric
              width={this.state.width}
              height={this.state.height}
              canvasOffsetX={this.state.canvasOffsetX}
              canvasOffsetY={this.state.canvasOffsetY}
              canvasWorkingWidth={this.state.canvasWorkingWidth}
              canvasWorkingHeight={this.state.canvasWorkingHeight}
              event_before_overlay_render={this.onBeforeOverlayHandler}
              event_selection_created={this.onSelectedCreatedHandler}
              // event_selection_updated={this.onSelectedCreatedHandler}
              //  event_selection_cleared={this.onClearedCreatedHandler}
              canvasScale={this.state.canvasScale}
            >
              {elements}
            </Fabric>
          )}
        </div>
      </div>
    );
  }
}

FabricjsRenderer.propTypes = {
  designerMaxWidth: number,
  designerMaxHeight: number,
  adjustment: number
};

FabricjsRenderer.defaultProps = {
  designerMaxWidth: 1400,
  designerMaxHeight: 800,
  adjustment: 60
};

module.exports = FabricjsRenderer;
