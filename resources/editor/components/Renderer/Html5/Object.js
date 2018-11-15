const React = require("react");

const randomColor = require("randomcolor");
const ImageBlock = require("./Image");
const TextBlock = require("./Text");
const { merge } = require("ramda");
const uuidv4 = require("uuid/v4");
const { connect } = require("react-redux");
const {
  addObjectIdToSelected,
  addObjectIdActionSelected,
  removeActionSelection,
  removeSelection
} = require("./../../../stores/actions/project");

require("./../../rewrites/draggable");
require("./../../rewrites/resizable");
require("./../../rewrites/rotatable");

class ObjectBlock extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.chilNode = React.createRef();
    this.blurSelectors = ["test", "index"];
    const element = this.el.current;
    this.state = {
      targetWidth: null,
      targetHeight: null,
      shouldUpdate: true
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.width != prevState.targetWidth ||
      (nextProps.height != prevState.targetHeight && nextProps.shouldUpdate)
    )
      return { targetWidth: nextProps.width, targetHeight: nextProps.height };
    return null;
  }
  componentDidUpdate() {
    if (!this.props.viewOnly) {
      var element = this.el.current;
      const active = this.props.active || false;
      this.updateDraggable(!active);
      $(element).data("rotateAngle", this.props.rotateAngle);
    }
  }

  componentDidMount() {
    if (!this.props.viewOnly) {
      const element = this.el.current;
      this.initObjectDraggable();
      this.initObjectResizable();
      this.initObjectRotatable();
      $(element).data("rotateAngle", this.props.rotateAngle);
    }
  }
  addSnapElements(ui, snapElements, handler) {
    if (this.props.ispSnap) {
      $(".drag_alignLines:visible").toggleClass("snaped", false);
      snapElements.forEach(element => {
        ui = merge(ui, {
          snapElement: $(element.item),
          snapping: element.snapping
        });
        if (element.snapping) {
          handler._trigger("snapped", event, ui);
        }
      });
    }
    return ui;
  }

  initObjectDraggable() {
    const element = this.el.current;
    const { movable } = this.props;
    // here we init draggable
    if (movable) {
      $(element).draggable({
        snap: ".drag_alignLines",
        snapMode: "customPrintq",
        snapTolerance: 10,
        helper: "original",
        start: (event, ui) => {
          const draggable = $(event.target).data("ui-draggable");
          ui = this.addSnapElements(ui, draggable.snapElements, draggable);
        },
        drag: (event, ui) => {
          const draggable = $(event.target).data("ui-draggable");
          ui = this.addSnapElements(ui, draggable.snapElements, draggable);
          const type = this.props;
        },
        stop: (event, ui) => {
          this.props.onUpdateProps({
            id: this.props.id,
            props: {
              top: ui.position.top / this.props.scale,
              left: ui.position.left / this.props.scale
            }
          });
          this.props.onStopActionHandler(this.props.id);
        },
        snapped: (event, ui) => {
          ui.snapElement.addClass("snaped");
        }
      });
    }
  }
  initObjectRotatable() {
    const element = this.el.current;
    const { rotatable } = this.props;
    if (rotatable) {
      let angle = -1 * parseFloat(this.props.rotateAngle);
      let radians = 0;
      if (angle) {
        radians = (angle * Math.PI) / 180;
      }
      $(element).rotatable({
        angle: radians,
        start: () => {},
        rotate: (event, ui) => {
          const element = $(event.target);
          const angle = (-1 * ((ui.angle.current * 180) / Math.PI)) % 360;
          element.data("rotateAngle", angle);
        },
        stop: (event, ui) => {
          const angle = (-1 * ((ui.angle.stop * 180) / Math.PI)) % 360;
          const element = $(event.target);
          this.props.onUpdateProps({
            id: this.props.id,
            props: {
              rotateAngle: angle
            }
          });
          element.data("rotateAngle", angle);
          this.props.onStopActionHandler(this.props.id);
        }
      });
    }
  }
  initObjectResizable() {
    const element = this.el.current;
    const { resizable } = this.props;
    if (resizable) {
      /**@todo @author Move this to a new function initObjectDraggable */
      $(element).resizable({
        handles: "n,s,e,w,ne,nw,se,sw",
        snap: ".drag_alignLines",
        start: (event, ui) => {
          var resizable = $(event.target).data("ui-resizable");
          ui = this.addSnapElements(ui, resizable.coords, resizable);
        },
        resize: (event, ui) => {
          var resizable = $(event.target).data("ui-resizable");
          const { type } = this.props;
          const childNode = $(this.chilNode.current.el.current);
          childNode.css({
            width: ui.size.width,
            "max-width": ui.size.width,
            height: ui.size.height
          });
          const resizeEvent = new Event("cropperUpdateMiddle");
          document.dispatchEvent(resizeEvent);

          ui = this.addSnapElements(ui, resizable.coords, resizable);
        },
        stop: (event, ui) => {
          this.props.onStopActionHandler(this.props.id);
          this.props.onUpdateProps({
            id: this.props.id,
            props: {
              width: ui.size.width / this.props.scale,
              height: ui.size.height / this.props.scale
            }
          });
        },
        snapped: (event, ui) => {
          ui.snapElement.addClass("snaped");
        }
      });
    }
  }
  onMouseDownHandler = event => {
    if (!this.props.viewOnly) {
      event.stopPropagation();
      this.props.onStartActionHandler(this.props.id);
    }
  };
  onMouseUpHandler = () => {
    if (!this.props.viewOnly) this.props.onStopActionHandler(this.props.id);
  };
  updateDraggable(status) {
    const el = $(this.el.current);
    const movable = this.props.movable || false;
    if (el.length && movable) {
      if (!status) {
        this.disableDraggable(el);
      } else {
        this.enableDraggable(el);
      }
    }
  }
  disableDraggable(el) {
    el.draggable("disable");
  }
  enableDraggable(el) {
    el.draggable("enable");
  }
  onClickHandler = event => {
    if (!this.props.viewOnly) this.props.onSetActiveBlockHandler(this.props.id);
  };
  render() {
    const { width, height, top, left, type, ...otherProps } = this.props;
    const style = {
      width: width,
      height: height,
      left: left,
      top: top,
      position: "absolute",
      backgroundColor: randomColor()
    };
    let element = null;

    switch (type) {
      case "image":
        element = (
          <ImageBlock ref={this.chilNode} {...this.state} {...this.props} />
        );
        break;
      case "text":
      case "textflow":
        element = <TextBlock ref={this.chilNode} {...this.props} />;
        break;
      default:
        break;
    }
    return (
      <div
        className={[
          "page-block",
          type,
          this.props.editable ? "editable" : ""
        ].join(" ")}
        style={style}
        ref={this.el}
        onClick={this.onClickHandler}
        onMouseDown={this.onMouseDownHandler}
        onMouseUp={this.onMouseUpHandler}
      >
        <div className={this.props.orientation}>{element}</div>
        <div className="blockOrder" />
        <u />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetActiveBlockHandler: payload =>
      dispatch(addObjectIdToSelected(payload)),
    onStartActionHandler: payload =>
      dispatch(addObjectIdActionSelected(payload)),
    onStopActionHandler: payload => dispatch(removeActionSelection(payload)),
    onRemoveActiveBlockHandler: payload => dispatch(removeSelection(payload))
  };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(ObjectBlock);
