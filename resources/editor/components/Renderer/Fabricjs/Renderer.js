const React = require("react");
const { Image, IText, Fabric } = require("../../../packages/core/react-fabric");

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
  }
  componentDidMount() {
    const adjustment = 60;
    let designerMaxWidth = 1400,
      designerMaxHeight = 800,
      newW = 0,
      newH = 0,
      offsetX,
      offsetY;
    var parentDimmension = this.editorContainer.getBoundingClientRect();

    parentDimmension.height =
      parentDimmension.height > designerMaxHeight
        ? designerMaxHeight
        : parentDimmension.height - adjustment;
    parentDimmension.width =
      parentDimmension.width > designerMaxWidth
        ? designerMaxWidth
        : parentDimmension.widtht - adjustment;

    let containerRatio = parentDimmension.width / parentDimmension.height,
      productRatio = this.props.activePage.width / this.props.activePage.height;

    if (containerRatio >= productRatio) {
      newW = (parentDimmension.height - adjustment) * productRatio;
      newH = parentDimmension.height - adjustment;
    } else {
      newW = parentDimmension.width - adjustment;
      newH = (parentDimmension.width - adjustment) / productRatio;
    }
    offsetX = (parentDimmension.width - newW) / 2;
    offsetY = (parentDimmension.height - newH) / 2;

    this.setState({
      isReadyComponent: true,
      width: parentDimmension.width,
      height: parentDimmension.height,
      canvasOffsetX: offsetX,
      canvasOffsetY: offsetY,
      canvasWorkingWidth: newW,
      canvasWorkingHeight: newH,
      canvasScale: newW / this.props.activePage.width
    });
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
          ref={editorContainer => {
            this.editorContainer = editorContainer;
          }}
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

module.exports = FabricjsRenderer;
