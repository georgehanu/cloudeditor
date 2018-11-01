const React = require("react");
const { number } = require("prop-types");
const { debounce } = require("underscore");
const { connect } = require("react-redux");
const uuidv4 = require("uuid/v4");
const {
  Image,
  IText,
  Textbox,
  Fabric,
  Group
} = require("../../../packages/core/react-fabric");
const { fabric } = require("../../../rewrites/fabric/fabric");
const { map } = require("ramda");
const ProjectUtils = require("../../../utils/ProjectUtils");
const projectActions = require("../../../stores/actions/project");
const rendererActions = require("../../../stores/actions/renderer");

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

class FabricjsRenderer extends React.PureComponent {
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
      scale: 1,
      events: [
        {
          id: uuidv4(),
          event_name: "before:overlay:render",
          callback: this.onBeforeOverlayHandler
        },
        {
          id: uuidv4(),
          event_name: "selection:created",
          callback: this.onSelectedCreatedHandler
        },
        {
          id: uuidv4(),
          event_name: "selection:updated",
          callback: this.onSelectedCreatedHandler
        },
        {
          id: uuidv4(),
          event_name: "selection:cleared",
          callback: this.onSelectedClearedHandler
        },
        {
          id: uuidv4(),
          event_name: "object:moved",
          callback: this.onObjectPropChangedHandler
        },
        {
          id: uuidv4(),
          event_name: "object:scaled",
          callback: this.onObjectPropChangedHandler
        },
        {
          id: uuidv4(),
          event_name: "object:rotated",
          callback: this.onObjectPropChangedHandler
        },
        {
          id: uuidv4(),
          event_name: "image:editing:exited",
          callback: this.onObjectPropChangedHandler
        }
      ]
    };
  }

  updatePageOffset = () => {
    const result = updatePageOffset(this.props, this.editorContainer.current);
    this.setState(result);
  };

  componentDidMount() {
    this.updatePageOffset();
    window.addEventListener("resize", debounce(this.updatePageOffset));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePageOffset);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
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
                left: (obj.left - this.state.canvasOffsetX) / this.state.scale,
                top: (obj.top - this.state.canvasOffsetY) / this.state.scale
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
          return {
            id: obj.id,
            left: (obj.left - this.state.canvasOffsetX) / this.state.scale,
            top: (obj.top - this.state.canvasOffsetY) / this.state.scale,
            angle: obj.angle
          };
        }, args.deselected)
      };
      this.props.removeSelection(selectionData);
    }
  };

  onObjectPropChangedHandler = args => {
    if (args && args.target) {
      if (args.target.type == "activeSelection") {
        let activeSelectionData = {
          id: args.target.id,
          props: args.target.getMainProps(),
          objectProps: []
        };
        this.props.updateSelectionObjectsCoordsHandler(activeSelectionData);
      } else {
        let objProps = args.target.getMainProps();
        objProps.left =
          (objProps.left - this.state.canvasOffsetX) / this.state.scale;
        objProps.top =
          (objProps.top - this.state.canvasOffsetY) / this.state.scale;
        objProps.width =
          (objProps.width / this.state.scale) * args.target.scaleX;
        objProps.height =
          (objProps.height / this.state.scale) * args.target.scaleY;
        objProps.scaleX = 1;
        objProps.scaleY = 1;
        this.props.updateObjectProps({
          id: args.target.id,
          props: objProps
        });
      }

      switch (args.target.type) {
        case "activeSelection":
          break;
        default:
          break;
      }
    }
  };
  designerCallbacks = () => {
    return {
      updateCropParams: this.props.updateCropParams
    };
  };
  drawElements(objects, needOffset) {
    let elements = Object.keys(objects).map(obKey => {
      const object = { ...objects[obKey] };

      if (object.parentId) {
        return null;
      }
      object.width *= this.state.scale;
      object.height *= this.state.scale;
      object.left = object.left * this.state.scale;
      object.top = object.top * this.state.scale;
      if (needOffset) {
        object.left += this.state.canvasOffsetX;
        object.top += this.state.canvasOffsetY;
      }

      switch (object.type) {
        case "image":
          return (
            <Image
              key={object.id}
              {...object}
              designerCallbacks={this.designerCallbacks}
            />
          );
        case "text":
          return <IText key={object.id} {...object} />;
        case "textbox":
          return <Textbox key={object.id} {...object} />;
        case "group":
          return (
            <Group key={object.id} {...object}>
              {this.drawElements(object._elements, false)}
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

    let elements = this.drawElements(objects, 1);

    let isReadyComponent = this.state.isReadyComponent;

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
              events={this.state.events}
              canvasReadyHandler={this.props.canvasReadyHandler}
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
  adjustment: number
};

FabricjsRenderer.defaultProps = {
  adjustment: 60
};

const mapDispatchToProps = dispatch => {
  return {
    updateCropParams: (id, props) =>
      dispatch(projectActions.updateCropParams({ id, props })),
    canvasReadyHandler: isReady =>
      dispatch(rendererActions.updateCanvasReady(isReady))
  };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(FabricjsRenderer);
//module.exports = FabricjsRenderer;
