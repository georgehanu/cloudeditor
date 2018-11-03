const React = require("react");

const randomColor = require("randomcolor");
const ImageBlock = require("./Image");
const TextBlock = require("./Text");
const { forEach } = require("ramda");
const { connect } = require("react-redux");
const {
  addObjectIdToSelected,
  removeSelection
} = require("./../../../stores/actions/project");

require("webpack-jquery-ui/draggable");
require("webpack-jquery-ui/resizable");

class ObjectBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.blurSelectors = ["test", "index"];
  }

  componentDidMount() {
    const element = this.el.current;
    const { movable, resizable, rotatable } = this.props;
    if (element) {
      if (movable) {
        $(element).draggable({
          snap: ".drag_alignLines",
          start: () => {},
          stop: (event, ui) => {
            this.props.onUpdateProps({
              id: this.props.id,
              props: {
                top: ui.position.top / this.props.scale,
                left: ui.position.left / this.props.scale
              }
            });
          }
        });
      }
      if (resizable) {
        $(element).resizable({
          stop: (event, ui) => {
            this.props.onUpdateProps({
              id: this.props.id,
              props: {
                width: ui.size.width / this.props.scale,
                height: ui.size.height / this.props.scale
              }
            });
          }
        });
      }
    }
  }

  updateDraggable(status) {
    let el = $(this.el.current);
    const { movable } = this.props;
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
  onClickHandler(event) {
    this.props.onSetActiveBlockHandler(this.props.id);
  }
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
        element = <ImageBlock {...this.props} />;
        break;
      case "text":
      case "textflow":
        element = <TextBlock {...this.props} />;
        break;
      default:
        break;
    }
    return (
      <div
        onClick={this.onClickHandler.bind(this)}
        className={[
          "page-block",
          type,
          this.props.active ? "edit" : "",
          this.props.editable ? "editable" : ""
        ].join(" ")}
        style={style}
        ref={this.el}
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
    onRemoveActiveBlockHandler: payload => dispatch(removeSelection(payload))
  };
};

module.exports = connect(
  null,
  mapDispatchToProps
)(ObjectBlock);
