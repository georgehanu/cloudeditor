const React = require("react");
const { number } = require("prop-types");
const {
  Image,
  IText,
  Fabric,
  Group
} = require("../../../packages/core/react-fabric");
const { fabric } = require("../../../rewrites/fabric/fabric");
const { map } = require("ramda");
const ProjectUtils = require("../../../utils/ProjectUtils");

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
    debugger;
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
    if (args && args.selected && args.selected.length) {
      let selectedIds = [],
        type = args.target.type,
        centerPoint = args.target.getCenterPoint();
      selectedIds = map(obj => obj.id, args.selected);
      this.props.addObjectToSelectedHandler({
        selectedIds: selectedIds,
        type: type,
        centerPoint: centerPoint
      });

      let activeSelection = ProjectUtils.getEmptyObject({
        type: "activeSelection",
        left: Math.random() * 500,
        top: Math.random() * 500
      });
    }
  };
  onSelectedClearedHandler = args => {
    this.props.removeSelection();
  };
  onObjectMovedHandler = args => {
    if (args && args.target) {
      let transform = {
        id: args.target.id,
        props: {
          left: args.target.left,
          top: args.target.top
        }
      };
      this.props.afterObjectMovedHandler(transform);
    }
  };
  drawElements(objects) {
    let elements = Object.keys(objects).map(obKey => {
      const object = objects[obKey];
      if (object.parentId) {
        return null;
      }
      switch (object.type) {
        case "image":
          return <Image key={object.id} {...object} />;
        case "text":
          return <IText key={object.id} {...object} />;
        case "group":
          debugger;
          return (
            <Group key={object.id} {...object}>
              {this.drawElements(object._elements)}
            </Group>
          );
        case "activeSelection":
          //compute objects <Image .....
          return <activeSelection key={object.id} {...object} />;
        default:
          break;
      }
      return null;
    });

    const el1 = ProjectUtils.getEmptyObject({
      type: "image",
      width: Math.random() * 500,
      height: Math.random() * 500,
      left: Math.random() * 500,
      top: Math.random() * 500
    });
    const el2 = ProjectUtils.getEmptyObject({
      type: "image",
      width: Math.random() * 500,
      height: Math.random() * 500,
      left: Math.random() * 500,
      top: Math.random() * 500
    });
    return elements;
    return elements.concat(
      this.drawElements(
        {
          [el1.id]: el1,
          [el2.id]: el2
        },
        level + 1
      )
    );
    return elements;
  }
  render() {
    const { activePage: page } = this.props;
    const { objects } = page;

    let elements = this.drawElements(objects, 0);

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
              event_selection_updated={this.onSelectedCreatedHandler}
              event_selection_cleared={this.onSelectedClearedHandler}
              event_object_moved={this.onObjectMovedHandler}
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
