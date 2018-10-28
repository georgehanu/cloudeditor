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
  const { adjustment, activePage } = props;

  let parentDimension = editorContainer.getBoundingClientRect();
  parentDimension.width -= adjustment;
  parentDimension.height -= adjustment;

  let scale = Math.min(
    parentDimension.height / activePage.height,
    parentDimension.width / activePage.width
  );
  let pageWidth = activePage.width * scale,
    pageHeight = activePage.height * scale;

  const result = {
    isReadyComponent: true,
    width: parentDimension.width,
    height: parentDimension.height,
    canvasOffsetX: (parentDimension.width - pageWidth) / 2,
    canvasOffsetY: (parentDimension.height - pageHeight) / 2,
    canvasWorkingWidth: pageWidth,
    canvasWorkingHeight: pageHeight,
    scale: scale
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
    scale: 1
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
      scale: 1
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
    if (args && args.target) {
      switch (args.target.type) {
        case "activeSelection":
          let activeSelectionData = {
            id: args.target.id,
            props: {
              left: args.target.left,
              top: args.target.top,
              width: args.target.width,
              height: args.target.height
            },
            objectProps: map(obj => {
              return {
                id: obj.id,
                left: obj.left,
                top: obj.top
              };
            }, args.selected)
          };
          this.props.updateSelectionObjectsCoordsHandler(activeSelectionData);
          break;
        default:
          this.props.addObjectToSelectedHandler(args.target.id);
          break;
      }
    }
  };
  onSelectedClearedHandler = args => {
    if (args && args.deselected) {
      let selectionData = {
        objectProps: map(obj => {
          return { id: obj.id, left: obj.left, top: obj.top };
        }, args.deselected)
      };
      this.props.removeSelection(selectionData);
    }
  };
  performActionHandler = args => {
    debugger;
  };
  onObjectMovedHandler = args => {
    if (args && args.target) {
      switch (args.target.type) {
        case "activeSelection":
          let activeSelectionData = {
            id: args.target.id,
            props: args.target.getMainProps(),
            objectProps: []
          };
          this.props.updateSelectionObjectsCoordsHandler(activeSelectionData);
          break;
        default:
          this.props.updateObjectProps({
            id: args.target.id,
            props: args.target.getMainProps()
          });
          break;
      }
    }
  };
  onObjectPropChangedHandler = args => {
    if (args && args.target) {
      let objProps = args.target.getMainProps();
      switch (args.target.type) {
        case "activeSelection":
          this.props.updateActiveSelectionProps(objProps);
          break;
        default:
          this.props.updateObjectProps({
            id: args.target.id,
            props: objProps
          });
          break;
      }
    }
  };
  drawElements(objects) {
    let elements = Object.keys(objects).map(obKey => {
      const object = objects[obKey];
      if (object.parentId) {
        return null;
      }
      object.width *= this.state.scale;
      object.height *= this.state.scale;
      object.left += this.state.canvasOffsetX;
      object.top += this.state.canvasOffsetY;
      switch (object.type) {
        case "image":
          return <Image key={object.id} {...object} />;
        case "text":
          return <IText key={object.id} {...object} />;
        case "group":
          return (
            <Group key={object.id} {...object}>
              {this.drawElements(object._elements)}
            </Group>
          );
        default:
          break;
      }
      return null;
    });
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
              event_object_scaled={this.onObjectPropChangedHandler}
              event_object_rotated={this.onObjectPropChangedHandler}
              event_object_skewed={this.onObjectPropChangedHandler}
              canvasScale={this.state.canvasScale}
            >
              {elements}
            </Fabric>
          )}
        </div>

        <div style={{ position: "absolute", left: "200px", top: "0px" }} />
      </div>
    );
  }
}

FabricjsRenderer.propTypes = {
  adjustment: number
};

FabricjsRenderer.defaultProps = {
  adjustment: 60
};

module.exports = FabricjsRenderer;
